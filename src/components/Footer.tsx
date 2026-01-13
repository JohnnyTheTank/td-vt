import './Footer.css'

interface FooterProps {
  onNavigate: (page: 'home' | 'datenschutz' | 'impressum') => void
}

function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="footer no-print">
      <div className="footer-content">
        <div className="footer-links">
          <button onClick={() => onNavigate('impressum')} className="footer-link">
            Impressum
          </button>
          <span className="footer-divider">|</span>
          <button onClick={() => onNavigate('datenschutz')} className="footer-link">
            Datenschutz
          </button>
        </div>
        <p className="footer-copyright">
          © {new Date().getFullYear()} Tobias Daschner
        </p>
      </div>
    </footer>
  )
}

export default Footer
