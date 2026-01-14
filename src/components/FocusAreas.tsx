import { focusAreas } from '../data/career'
import type { FocusArea } from '../types'
import './FocusAreas.css'

const areaIcons: Record<FocusArea['icon'], JSX.Element> = {
  projektleitung: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20V10"/>
      <path d="M18 20V4"/>
      <path d="M6 20v-4"/>
    </svg>
  ),
  video: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <path d="M8 21h8"/>
      <path d="M12 17v4"/>
    </svg>
  ),
  netzwerk: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="2" width="6" height="6" rx="1"/>
      <rect x="16" y="16" width="6" height="6" rx="1"/>
      <rect x="2" y="16" width="6" height="6" rx="1"/>
      <path d="M5 16v-4h14v4"/>
      <path d="M12 12V8"/>
    </svg>
  ),
  software: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  )
}

function FocusAreas() {
  return (
    <section className="focus-section" id="schwerpunkte">
      <div className="focus-header">
        <h2 className="section-title focus-title">Aktuelle Schwerpunkte</h2>
        
      </div>
      
      <div className="focus-grid">
        {focusAreas.map((area, index) => (
          <article 
            key={area.id} 
            className="focus-card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="focus-card-header">
              <div className="focus-card-icon">
                {areaIcons[area.icon]}
              </div>
              <h3 className="focus-card-title">{area.title}</h3>
            </div>
            
            <p className="focus-card-description">{area.description}</p>
            
            <div className="focus-card-tags">
              {area.tags.map(tag => (
                <span key={tag} className="focus-tag">{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FocusAreas
