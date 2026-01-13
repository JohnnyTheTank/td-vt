import { useState, useMemo } from 'react'
import { projects, projectYears } from '../data/projects'
import './ProjectList.css'

// Convert client name to logo path
function getLogoPath(client: string): string {
  const normalized = client
    .toLowerCase()
    .replace(/[&+]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
  return `/logos/${normalized}.png`
}

// Get initials for placeholder
function getInitials(client: string): string {
  return client
    .split(/[\s&]+/)
    .map(word => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function ProjectList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all')
  const [failedLogos, setFailedLogos] = useState<Set<string>>(new Set())

  const handleLogoError = (client: string) => {
    setFailedLogos(prev => new Set(prev).add(client))
  }

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchTerm === '' || 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesYear = selectedYear === 'all' || project.year === selectedYear
      
      return matchesSearch && matchesYear
    })
  }, [searchTerm, selectedYear])

  const projectsByYear = useMemo(() => {
    const grouped: Record<number, typeof projects> = {}
    filteredProjects.forEach(project => {
      if (!grouped[project.year]) {
        grouped[project.year] = []
      }
      grouped[project.year].push(project)
    })
    return Object.entries(grouped)
      .sort(([a], [b]) => Number(b) - Number(a))
  }, [filteredProjects])

  return (
    <section className="projects-section" id="projekte">
      <h2 className="section-title">Projektübersicht</h2>
      
      {/* Filters - Hidden in print */}
      <div className="project-filters no-print">
        <div className="search-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Projekt oder Kunde suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="search-clear" 
              onClick={() => setSearchTerm('')}
              aria-label="Suche löschen"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          )}
        </div>
        
        <select
          className="filter-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
        >
          <option value="all">Alle Jahre</option>
          {projectYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      
      {/* Results count */}
      <div className="results-info no-print">
        <span>{filteredProjects.length} von {projects.length} Projekten</span>
      </div>
      
      {/* Project Grid - Screen View */}
      <div className="projects-grid no-print">
        {projectsByYear.map(([year, yearProjects]) => (
          <div key={year} className="year-group">
            <h3 className="year-heading">{year}</h3>
            <div className="year-projects">
              {yearProjects.map(project => (
                <div key={project.id} className="project-card">
                  <div className="project-logo">
                    {failedLogos.has(project.client) ? (
                      <div className="logo-placeholder">
                        {getInitials(project.client)}
                      </div>
                    ) : (
                      <img 
                        src={getLogoPath(project.client)} 
                        alt={`${project.client} Logo`}
                        onError={() => handleLogoError(project.client)}
                      />
                    )}
                  </div>
                  <div className="project-content">
                    <div className="project-period">{project.period}</div>
                    <div className="project-name">{project.name}</div>
                    <div className="project-client">{project.client}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {filteredProjects.length === 0 && (
          <div className="no-results">
            <p>Keine Projekte gefunden.</p>
            <button 
              className="reset-filters"
              onClick={() => {
                setSearchTerm('')
                setSelectedYear('all')
              }}
            >
              Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
      
      {/* Project Table - Print View */}
      <div className="print-only page-break-before">
        <h2 className="print-section-title">Projektliste</h2>
        <table className="project-table">
          <thead>
            <tr>
              <th>Zeitraum</th>
              <th>Projekt</th>
              <th>Kunde</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.period}</td>
                <td>{project.name}</td>
                <td>{project.client}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ProjectList
