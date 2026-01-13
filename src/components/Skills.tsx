import { skills } from '../data/career'
import type { SkillCategory } from '../types'
import './Skills.css'

const categoryIcons: Record<SkillCategory, JSX.Element> = {
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
  licht: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>
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

const categoryLabels: Record<SkillCategory, string> = {
  projektleitung: 'Projektleitung',
  video: 'Video & Medientechnik',
  licht: 'Lichttechnik',
  netzwerk: 'Netzwerk',
  software: 'Software & CAD'
}

function Skills() {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<SkillCategory, typeof skills>)

  return (
    <section className="skills-section" id="qualifikationen">
      <h2 className="section-title">Qualifikationen</h2>
      
      <div className="skills-grid">
        {Object.entries(skillsByCategory).map(([category, categorySkills], index) => (
          <div 
            key={category} 
            className="skill-category"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="skill-category-header">
              <div className="skill-category-icon">
                {categoryIcons[category as SkillCategory]}
              </div>
              <h3 className="skill-category-title">
                {categoryLabels[category as SkillCategory]}
              </h3>
            </div>
            
            <div className="skill-items">
              {categorySkills.map(skill => (
                <div key={skill.name} className="skill-item">
                  <span className="skill-name">{skill.name}</span>
                  {skill.tools && skill.tools.length > 0 && (
                    <div className="skill-tools">
                      {skill.tools.map(tool => (
                        <span key={tool} className="skill-tool">{tool}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
