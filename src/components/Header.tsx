import { personalInfo } from '../data/career'
import { projects } from '../data/projects'
import './Header.css'

function Header() {
  const projectCount = projects.length
  const yearSpan = Math.max(...projects.map(p => p.year)) - Math.min(...projects.map(p => p.year)) + 1
  const clientCount = new Set(projects.map(p => p.client)).size

  return (
    <header className="header">
      <div className="header-bg">
        <div className="header-gradient" />
        <div className="header-pattern" />
      </div>
      
      <div className="header-content">
        <div className="portrait-container">
          <div className="portrait-frame">
            <img 
              src={personalInfo.portrait} 
              alt={personalInfo.name}
              className="portrait"
            />
          </div>
          <div className="portrait-accent" />
        </div>
        
        <div className="header-text">
          <h1 className="name">{personalInfo.name}</h1>
          <p className="title">{personalInfo.title}</p>
          
          <div className="contact-links">
            <a href={`tel:${personalInfo.phone}`} className="contact-link">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>{personalInfo.phone}</span>
            </a>
            <a href={`mailto:${personalInfo.email}`} className="contact-link">
              <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>{personalInfo.email}</span>
            </a>
          </div>
          
          <div className="stats">
            <div className="stat">
              <span className="stat-value">{projectCount}+</span>
              <span className="stat-label">Projekte</span>
            </div>
            <div className="stat">
              <span className="stat-value">{yearSpan}</span>
              <span className="stat-label">Jahre Erfahrung</span>
            </div>
            <div className="stat">
              <span className="stat-value">{clientCount}+</span>
              <span className="stat-label">Kunden</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator no-print">
        <span>Mehr erfahren</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </div>
    </header>
  )
}

export default Header
