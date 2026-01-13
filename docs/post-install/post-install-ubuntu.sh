#!/bin/bash

# Define variables
SSH_USER="ubuntu"
SSH_HOST="td-vt.de"
APP_NAME="cv"
FOLDER_NAME="cv"
URL="td-vt.de"
APP_PORT="5173"

# Exit on error
set -e

# Function to log messages
log() {
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $1"
}

# Function to handle errors
handle_error() {
    log "ERROR: $1"
    exit 1
}

# Update system
log "Updating system..."
apt update || handle_error "Failed to update package list"
apt upgrade -y || handle_error "Failed to upgrade packages"

# Install essential tools and dependencies
log "Installing essential tools and dependencies..."
apt install -y \
    curl \
    git \
    build-essential \
    sudo \
    ufw \
    ca-certificates \
    gnupg \
    lsb-release \
    software-properties-common \
    python3 \
    python3-pip \
    htop \
    net-tools \
    vim ||
    handle_error "Failed to install essential packages"

# Install Node.js 24x
log "Installing Node.js 24.x..."
curl -fsSL https://deb.nodesource.com/setup_24.x | bash - || handle_error "Failed to setup Node.js repository"
apt install -y nodejs || handle_error "Failed to install Node.js"

# Install Yarn
log "Installing Yarn..."
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null || handle_error "Failed to add Yarn GPG key"
echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list || handle_error "Failed to add Yarn repository"
apt update || handle_error "Failed to update package list"
apt install -y yarn || handle_error "Failed to install Yarn"

# Install Docker
log "Installing Docker..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor --yes -o /usr/share/keyrings/docker-archive-keyring.gpg || handle_error "Failed to add Docker GPG key"
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list >/dev/null || handle_error "Failed to add Docker repository"
apt update || handle_error "Failed to update package list"
apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin || handle_error "Failed to install Docker packages"

# Install PM2
log "Installing PM2..."
npm install -g pm2 || handle_error "Failed to install PM2"

# Install restic
log "Installing Restic..."
apt install -y restic || handle_error "Failed to install Restic"

# Install Nginx
log "Installing Nginx..."
apt install -y nginx || handle_error "Failed to install Nginx"

# Create or verify user
log "Creating ${SSH_USER} user..."
if ! id -u ${SSH_USER} >/dev/null 2>&1; then
    useradd -m -s /bin/bash ${SSH_USER} || handle_error "Failed to create ${SSH_USER} user"
    usermod -aG sudo ${SSH_USER} || handle_error "Failed to add ${SSH_USER} to sudo group"

    # Configure passwordless sudo for ${SSH_USER} user
    echo "${SSH_USER} ALL=(ALL) NOPASSWD:ALL" | tee /etc/sudoers.d/${SSH_USER} || handle_error "Failed to configure sudo access"
    chmod 440 /etc/sudoers.d/${SSH_USER} || handle_error "Failed to set sudoers file permissions"
else
    log "User ${SSH_USER} already exists"
    # Ensure passwordless sudo is configured even if user exists
    if ! grep -q "${SSH_USER} ALL=(ALL) NOPASSWD:ALL" /etc/sudoers.d/${SSH_USER} 2>/dev/null; then
        echo "${SSH_USER} ALL=(ALL) NOPASSWD:ALL" | tee /etc/sudoers.d/${SSH_USER} || handle_error "Failed to configure sudo access"
        chmod 440 /etc/sudoers.d/${SSH_USER} || handle_error "Failed to set sudoers file permissions"
    fi
fi

# Set up SSH directory and placeholder for authorized keys
log "Setting up SSH configuration..."
mkdir -p /home/${SSH_USER}/.ssh || handle_error "Failed to create .ssh directory"
chmod 700 /home/${SSH_USER}/.ssh || handle_error "Failed to set .ssh directory permissions"

touch /home/${SSH_USER}/.ssh/authorized_keys || handle_error "Failed to create authorized_keys file"
chmod 600 /home/${SSH_USER}/.ssh/authorized_keys || handle_error "Failed to set authorized_keys permissions"

# Add known SSH keys
cat >>/home/${SSH_USER}/.ssh/authorized_keys <<'EOL'
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIMDJt+uDHu+b1kKMd6IKjaRSUZoQ7VVzsu1qLz4q5Xk7 jonathan hetzner
EOL

# Configure Docker permissions
log "Configuring Docker permissions..."
usermod -aG docker ${SSH_USER} || handle_error "Failed to add ${SSH_USER} to docker group"
# Restart Docker daemon to apply group changes
systemctl restart docker || handle_error "Failed to restart Docker daemon"

# Configure Nginx
log "Configuring Nginx..."
rm -f /etc/nginx/sites-enabled/default || handle_error "Failed to remove default Nginx site"
mkdir -p /etc/nginx/sites-available/${FOLDER_NAME} || handle_error "Failed to create Nginx configuration directory"

# Create robots.txt
log "Creating robots.txt..."
mkdir -p /home/${SSH_USER}/public || handle_error "Failed to create public directory"
cat >/home/${SSH_USER}/public/robots.txt <<'EOL'
User-agent: *
Disallow: /
EOL

# Create basic Nginx configuration
log "Creating Nginx configuration..."
mkdir -p /var/log/nginx || handle_error "Failed to create Nginx log directory"

cat >/etc/nginx/sites-available/${FOLDER_NAME}/default <<EOL
server {
    server_name ${URL};

    server_tokens off;

    access_log  /var/log/nginx/${FOLDER_NAME}.access.log combined;
    error_log /var/log/nginx/${FOLDER_NAME}.error.log warn;

    client_max_body_size 1536M;
    client_body_timeout 5200s;

    # Prevent search engines from indexing
    location = /robots.txt {
        alias /home/${SSH_USER}/public/robots.txt;
        access_log off;
        log_not_found off;
    }

    location / {
        proxy_pass http://localhost:${APP_PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_read_timeout 1300s;
    }
}
EOL

# Enable the site
ln -sf /etc/nginx/sites-available/${FOLDER_NAME}/default /etc/nginx/sites-enabled/ || handle_error "Failed to enable Nginx site"

# Test Nginx configuration
log "Testing Nginx configuration..."
sudo nginx -t || handle_error "Nginx configuration test failed"

# Start/restart Nginx service
log "Starting Nginx service..."
systemctl restart nginx || handle_error "Failed to restart Nginx"
systemctl enable nginx || handle_error "Failed to enable Nginx"

# Set up basic security (before SSL to ensure ports are open)
log "Configuring firewall..."
ufw allow 22 || handle_error "Failed to allow SSH port"
ufw allow 80 || handle_error "Failed to allow HTTP port"
ufw allow 443 || handle_error "Failed to allow HTTPS port"
ufw --force enable || handle_error "Failed to enable firewall"

# Verify Nginx is running and accessible
log "Verifying Nginx is running..."
systemctl is-active --quiet nginx || handle_error "Nginx is not running"

# Install and configure Let's Encrypt SSL
log "Installing Let's Encrypt..."
apt install -y certbot || handle_error "Failed to install certbot"
apt install -y python3-certbot-nginx || handle_error "Failed to install python3-certbot-nginx"

# Wait a moment for services to be fully ready
sleep 5

# Create temporary lightweight server for SSL verification
log "Starting temporary server on port ${APP_PORT} for SSL verification..."
mkdir -p /tmp/temp-server || handle_error "Failed to create temporary server directory"
cat >/tmp/temp-server/index.html <<'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Server Setup in Progress</title>
</head>
<body>
    <h1>Server Setup in Progress</h1>
    <p>SSL verification temporary page</p>
</body>
</html>
EOF

# Start temporary Python HTTP server in background
cd /tmp/temp-server
python3 -m http.server ${APP_PORT} >/dev/null 2>&1 &
TEMP_SERVER_PID=$!

# Wait for temporary server to start
sleep 3

# Verify temporary server is running
if ! curl -s http://localhost:${APP_PORT} >/dev/null; then
    handle_error "Failed to start temporary server on port ${APP_PORT}"
fi

log "Temporary server started successfully on port ${APP_PORT}"

log "Setting up SSL certificate for ${URL}..."
certbot --nginx -d ${URL} --non-interactive -v --agree-tos --email jonathan.hornung@gmail.com || handle_error "Failed to setup SSL certificate"

log "Verifying SSL certificate..."
certbot certificates || handle_error "Failed to verify SSL certificates"

# Clean up temporary server
log "Cleaning up temporary server..."
kill ${TEMP_SERVER_PID} 2>/dev/null || true
rm -rf /tmp/temp-server || true
log "Temporary server cleaned up"

# Set up automatic updates
log "Configuring automatic updates..."
cat >/etc/apt/apt.conf.d/20auto-upgrades <<'EOL'
APT::Periodic::Update-Package-Lists "1";
APT::Periodic::Unattended-Upgrade "1";
EOL

# Set up cronjob for restic backup with absolute path
log "Setting up backup cronjob..."
# Switch to ubuntu user to set up their crontab
su - ${SSH_USER} -c "
    (crontab -l 2>/dev/null | grep -v \"yarn restic-backup\"
    echo \"0 2 * * * cd /home/${SSH_USER}/${FOLDER_NAME} && /usr/bin/yarn restic-backup &>/dev/null\") | crontab -
" || handle_error "Failed to set up backup cronjob"

# Create a README with setup instructions
log "Creating README..."
cat >/home/${SSH_USER}/README.md <<"EOL"
# Server Setup Instructions

## Initial Setup
1. Create project-specific deployment directory
2. Set up project-specific environment variables
3. Configure project-specific Docker settings
4. Set up GitHub Actions secrets
5. Update Nginx configuration with your domain
6. Add your SSH public keys to /home/${SSH_USER}/.ssh/authorized_keys

## Security
- Firewall is enabled with basic rules
- SSH access is restricted to key-based authentication
- System updates are automatic
- Basic security headers are configured
- Search engine indexing is disabled

## Backup
- Restic is installed for backup management
- Daily backup is scheduled at 2:00 AM
- Configure backup repository and schedule in project settings
EOL

# Set proper permissions
log "Setting permissions..."
chown -R ${SSH_USER}:${SSH_USER} /home/${SSH_USER} || handle_error "Failed to set home directory permissions"

log "Installation completed successfully!"
log "now we are able to login with ssh ${SSH_USER}@${SSH_HOST}"
