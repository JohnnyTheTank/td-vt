import { useState, useMemo } from 'react'
import { projects } from '../data/projects'
import { assetUrl } from '../utils/assetUrl'
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
  return assetUrl(`/logos/${normalized}.webp`)
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
  const [failedLogos, setFailedLogos] = useState<Set<string>>(new Set())

  const handleLogoError = (client: string) => {
    setFailedLogos(prev => new Set(prev).add(client))
  }

  const projectsByYear = useMemo(() => {
    const grouped: Record<number, typeof projects> = {}
    projects.forEach(project => {
      if (!grouped[project.year]) {
        grouped[project.year] = []
      }
      grouped[project.year].push(project)
    })
    return Object.entries(grouped)
      .sort(([a], [b]) => Number(b) - Number(a))
  }, [])

  return (
    <section className="projects-section" id="projekte">
      <h2 className="section-title">Projektübersicht</h2>
      
      
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
