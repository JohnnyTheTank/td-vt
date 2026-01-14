#!/usr/bin/env node

/**
 * Logo Fetcher Script
 * 
 * This script automatically fetches client logos for the CV website.
 * It extracts client names from the projects data, resolves their domains,
 * and downloads logos to the public/logos directory.
 * 
 * Usage: node scripts/fetch-logos.js
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT_DIR = path.join(__dirname, '..')
const LOGOS_DIR = path.join(ROOT_DIR, 'public', 'logos')

// Manual domain overrides for known clients (especially German/local ones)
const DOMAIN_OVERRIDES = {
  // TV Channels
  'Sport 1': 'sport1.de',
  'Sport1': 'sport1.de',
  'RTL2': 'rtl2.de',
  'BR': 'br.de',
  'ZDF': 'zdf.de',
  'ZDF Neo': 'zdf.de',
  'Sky': 'sky.de',
  'Sat1': 'sat1.de',
  'Pro7': 'prosieben.de',
  'Eurosport': 'eurosport.de',
  'Servus TV': 'servustv.com',
  'DAZN': 'dazn.com',
  
  // Automotive
  'BMW': 'bmw.de',
  'Audi': 'audi.de',
  'VW': 'volkswagen.de',
  'Daimler': 'daimler.com',
  'MAN': 'man.eu',
  'Mazda': 'mazda.de',
  'Maserati': 'maserati.com',
  'Volvo Trucks': 'volvotrucks.de',
  'Lexus': 'lexus.de',
  'Dodge': 'dodge.com',
  'Ford': 'ford.de',
  'Rolls Royce': 'rolls-roycemotorcars.com',
  'Lamborghini': 'lamborghini.com',
  'Renault': 'renault.de',
  'SEAT': 'seat.de',
  'Byton': 'byton.com',
  
  // Insurance & Finance
  'Allianz': 'allianz.de',
  'Uni Credit': 'unicredit.de',
  'ING DIBA': 'ing.de',
  'Commerzbank': 'commerzbank.de',
  'BNP Paribas': 'bnpparibas.de',
  'Interhyp': 'interhyp.de',
  'Ergo': 'ergo.de',
  
  // Tech
  'Microsoft': 'microsoft.com',
  'Amazon': 'amazon.de',
  'Intel': 'intel.de',
  'IBM': 'ibm.com',
  'AMD': 'amd.com',
  'Fujitsu': 'fujitsu.com',
  'Telekom': 'telekom.de',
  'Vodafone': 'vodafone.de',
  '1&1': '1und1.de',
  'Telefonica': 'telefonica.de',
  'LG': 'lg.com',
  'Samsung': 'samsung.de',
  'NetApp': 'netapp.com',
  'Infineon': 'infineon.com',
  'Kontron': 'kontron.com',
  'Atoss': 'atoss.com',
  'Scout24': 'scout24.de',
  'infosys': 'infosys.com',
  'Ricoh': 'ricoh.de',
  'ABB': 'abb.com',
  
  // Media & Entertainment
  'Constantin Medien': 'constantin.film',
  'Constantin': 'constantin.film',
  'Constantin Entertainment': 'constantin-entertainment.de',
  'Plazamedia': 'plazamedia.de',
  'RedSeven': 'redseven.de',
  'Megaherz': 'megaherz.tv',
  'Mingamedia': 'mingamedia.de',
  'HBO': 'hbo.com',
  'Netflix': 'netflix.com',
  'Paramount+': 'paramountplus.com',
  'ARRI': 'arri.com',
  'Red Bull': 'redbull.com',
  'FC Bayern': 'fcbayern.com',
  'LEGO': 'lego.com',
  'Disney': 'disney.de',
  
  // Consulting
  'BCG': 'bcg.com',
  'bain & Company': 'bain.com',
  'Roland Berger': 'rolandberger.com',
  'Accenture': 'accenture.com',
  'Berylls Group': 'berylls.com',
  'Alix & Partner': 'alixpartners.com',
  
  // Industrial
  'Osram': 'osram.de',
  'Knorr Bremse': 'knorrbremse.com',
  'Bosch': 'bosch.de',
  'Siemens': 'siemens.de',
  'Festo': 'festo.com',
  'STILL': 'still.de',
  'Geberit': 'geberit.de',
  'Trilux': 'trilux.com',
  'BayWa': 'baywa.de',
  'Paulaner': 'paulaner.de',
  'Schlagmann Poroton': 'schlagmann.de',
  'Thule': 'thule.com',
  'Arthrex': 'arthrex.de',
  'Rational': 'rational-online.com',
  
  // Other Companies
  'HSE24': 'hse24.de',
  'Lufthansa': 'lufthansa.com',
  'ADAC': 'adac.de',
  'DB Regio': 'bahn.de',
  'Lotto Bayern': 'lotto-bayern.de',
  'SWM': 'swm.de',
  'Tipico': 'tipico.de',
  'DOSB': 'dosb.de',
  'CSU': 'csu.de',
  'die Bayerische': 'diebayerische.de',
  'bayernwerk': 'bayernwerk.de',
  'Sportscheck': 'sportscheck.com',
  'XXXLutz': 'xxxlutz.de',
  'Euronics': 'euronics.de',
  'Brodos': 'brodos.de',
  'BMS': 'bms.com',
  'Robe': 'robe.cz',
  'W&V': 'wuv.de',
  'Grass Valley': 'grassvalley.com',
}

// Convert client name to the filename format used in ProjectList.tsx
function clientToFilename(client) {
  return client
    .toLowerCase()
    .replace(/[&+]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Extract unique clients from projects.ts
function extractClients() {
  const projectsPath = path.join(ROOT_DIR, 'src', 'data', 'projects.ts')
  const content = fs.readFileSync(projectsPath, 'utf-8')
  
  // Extract client names using regex
  const clientRegex = /client:\s*["']([^"']+)["']/g
  const clients = new Set()
  let match
  
  while ((match = clientRegex.exec(content)) !== null) {
    clients.add(match[1])
  }
  
  return Array.from(clients).sort()
}

// Fetch domain from Clearbit Autocomplete API
async function fetchDomainFromClearbit(clientName) {
  try {
    const encodedName = encodeURIComponent(clientName)
    const response = await fetch(
      `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodedName}`
    )
    
    if (!response.ok) return null
    
    const results = await response.json()
    if (results && results.length > 0 && results[0].domain) {
      return results[0].domain
    }
  } catch (error) {
    console.error(`  Error fetching domain for ${clientName}:`, error.message)
  }
  return null
}

// Download logo from unavatar.io
async function downloadLogo(domain, outputPath) {
  try {
    const response = await fetch(`https://unavatar.io/${domain}?fallback=false`)
    
    if (!response.ok) {
      return false
    }
    
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.startsWith('image/')) {
      return false
    }
    
    const buffer = await response.arrayBuffer()
    fs.writeFileSync(outputPath, Buffer.from(buffer))
    return true
  } catch (error) {
    return false
  }
}

// Main execution
async function main() {
  console.log('🔍 Extracting clients from projects.ts...\n')
  
  const clients = extractClients()
  console.log(`Found ${clients.length} unique clients\n`)
  
  // Ensure logos directory exists
  if (!fs.existsSync(LOGOS_DIR)) {
    fs.mkdirSync(LOGOS_DIR, { recursive: true })
  }
  
  const results = {
    success: [],
    skipped: [],
    failed: []
  }
  
  for (const client of clients) {
    const filename = clientToFilename(client)
    const outputPath = path.join(LOGOS_DIR, `${filename}.png`)
    
    // Skip if logo already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⏭️  ${client} - already exists`)
      results.skipped.push(client)
      continue
    }
    
    // Try to resolve domain
    let domain = DOMAIN_OVERRIDES[client]
    
    if (!domain) {
      console.log(`🔎 ${client} - searching for domain...`)
      domain = await fetchDomainFromClearbit(client)
    }
    
    if (!domain) {
      console.log(`❌ ${client} - no domain found`)
      results.failed.push(client)
      continue
    }
    
    // Download logo
    console.log(`⬇️  ${client} - downloading from ${domain}...`)
    const success = await downloadLogo(domain, outputPath)
    
    if (success) {
      console.log(`✅ ${client} - saved as ${filename}.png`)
      results.success.push(client)
    } else {
      console.log(`❌ ${client} - download failed`)
      results.failed.push(client)
    }
    
    // Rate limiting - wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 200))
  }
  
  // Summary
  console.log('\n' + '='.repeat(50))
  console.log('SUMMARY')
  console.log('='.repeat(50))
  console.log(`✅ Downloaded: ${results.success.length}`)
  console.log(`⏭️  Skipped (already exist): ${results.skipped.length}`)
  console.log(`❌ Failed: ${results.failed.length}`)
  
  if (results.failed.length > 0) {
    console.log('\nFailed clients (need manual logos):')
    results.failed.forEach(c => console.log(`  - ${c}`))
  }
}

main().catch(console.error)
