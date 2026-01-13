import { useState, useMemo } from 'react'
import { projects, projectYears, categoryLabels } from '../data/projects'
import type { ProjectCategory } from '../types'
import './ProjectList.css'

function ProjectList() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all')
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>('all')

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchTerm === '' || 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesYear = selectedYear === 'all' || project.year === selectedYear
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
      
      return matchesSearch && matchesYear && matchesCategory
    })
  }, [searchTerm, selectedYear, selectedCategory])

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
        
        <div className="filter-group">
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
          
          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as ProjectCategory | 'all')}
          >
            <option value="all">Alle Kategorien</option>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
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
                <div key={project.id} className={`project-card project-card--${project.category}`}>
                  <div className="project-period">{project.period}</div>
                  <div className="project-name">{project.name}</div>
                  <div className="project-client">{project.client}</div>
                  <span className="project-category-badge">
                    {categoryLabels[project.category]}
                  </span>
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
                setSelectedCategory('all')
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
              <th>Kategorie</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.period}</td>
                <td>{project.name}</td>
                <td>{project.client}</td>
                <td>{categoryLabels[project.category]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ProjectList
