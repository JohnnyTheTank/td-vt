import { useState, useEffect, useMemo } from 'react'
import { projects } from '../data/projects'
import './LogoMarquee.css'

// List of logos that actually exist in public/logos/
const EXISTING_LOGOS = new Set([
  '1-1', 'adac', 'adevents', 'alix-partner', 'allianz', 'amazon', 'amd', 'arri',
  'arthrex', 'atoss', 'audi', 'auditoire', 'bain-company', 'bayernwerk', 'baywa',
  'bcg', 'berylls-group', 'bms', 'bmw', 'bnp-paribas', 'br', 'brodos', 'comdeluxe',
  'commerzbank', 'constantin', 'constantin-entertainment', 'constantin-medien',
  'copidus', 'csu', 'daimler', 'dazn', 'db-regio', 'die-bayerische', 'diversign',
  'dodge', 'dosb', 'e-p-films', 'ergo', 'euronics', 'eurosport', 'extes', 'fc-bayern',
  'festo', 'filmfactory', 'fireholding', 'fischwillwurm', 'fortesnickel', 'fujitsu',
  'funke-medien', 'gds', 'geberit', 'gevas', 'grass-valley', 'hbo', 'heinze',
  'here-to-now', 'hrs', 'hse24', 'ibm', 'infineon', 'infosys', 'ing-diba', 'intel',
  'interhyp', 'iq-incoming', 'joke-event', 'kfer', 'knorr-bremse', 'kontron', 'lego',
  'lexus', 'lg', 'lotto-bayern', 'lufthansa', 'man', 'maserati', 'mazda', 'mbw',
  'megaherz', 'meisterwerk', 'microsoft', 'mobilight', 'netflix', 'ocsial', 'osram',
  'paramount', 'paulaner', 'piure', 'pool-group', 'pro7', 'pure-perfection', 'rational',
  'rckenwind', 'red-bull', 'redseven', 'ricoh', 'robe', 'roland-berger', 'rolls-royce',
  'schlagmann-poroton', 'schramm', 'scout24', 'seo-entertainment', 'servus-tv', 'sky',
  'sport-1', 'sport1', 'sportscheck', 'stahlgruber', 'still', 'studio-prague', 'swm',
  'team-seefried', 'telekom', 'thinxpool', 'thule', 'tipico', 'trendhouse', 'trilux',
  'uni-credit', 'vba-event', 'vista-event', 'vodafone', 'vogelsnger', 'vollblut',
  'volvo-trucks', 'vw', 'w-v', 'zdf', 'zdf-neo'
])

// Convert client name to logo filename (same logic as ProjectList.tsx)
function clientToFilename(client: string): string {
  return client
    .toLowerCase()
    .replace(/[&+]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

interface LogoItem {
  client: string
  filename: string
  path: string
  eventCount: number
  yearMin: number
  yearMax: number
}

function LogoMarquee() {
  const [shuffledLogos, setShuffledLogos] = useState<LogoItem[]>([])
  
  // Extract unique clients that have existing logos with event stats
  const validLogos = useMemo(() => {
    const uniqueClients = [...new Set(projects.map(p => p.client))]
    return uniqueClients
      .map(client => {
        const filename = clientToFilename(client)
        const clientProjects = projects.filter(p => p.client === client)
        const years = clientProjects.map(p => p.year)
        return {
          client,
          filename,
          path: `/logos/${filename}.webp`,
          eventCount: clientProjects.length,
          yearMin: Math.min(...years),
          yearMax: Math.max(...years)
        }
      })
      .filter(logo => EXISTING_LOGOS.has(logo.filename))
  }, [])

  // Shuffle logos on mount
  useEffect(() => {
    setShuffledLogos(shuffleArray(validLogos))
  }, [validLogos])

  // Don't render until we have logos
  if (shuffledLogos.length === 0) return null

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...shuffledLogos, ...shuffledLogos]

  return (
    <div className="logo-marquee-container no-print">
      <div className="logo-marquee-track">
        {duplicatedLogos.map((logo, index) => {
          const yearText = logo.yearMin === logo.yearMax 
            ? `in ${logo.yearMin}` 
            : `zwischen ${logo.yearMin} und ${logo.yearMax}`
          const projektText = logo.eventCount === 1 ? 'Projekt' : 'Projekte'
          const tooltip = `${logo.eventCount} ${projektText} für ${logo.client} ${yearText}`
          
          return (
            <div 
              key={`${logo.filename}-${index}`} 
              className="logo-marquee-item"
              data-tooltip={tooltip}
            >
              <img 
                src={logo.path} 
                alt={logo.client}
                loading="lazy"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LogoMarquee
