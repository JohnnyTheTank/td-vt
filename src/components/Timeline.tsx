import { careerMilestones } from '../data/career'
import './Timeline.css'

function Timeline() {
  // Reverse to show newest first
  const reversedMilestones = [...careerMilestones].reverse()
  
  return (
    <section className="timeline-section" id="werdegang">
      <h2 className="section-title">Beruflicher Werdegang</h2>
      
      <div className="timeline">
        {reversedMilestones.map((milestone, index) => {
          const isLatest = index === 0
          const yearDisplay = isLatest ? `Von ${milestone.year}` : milestone.year
          
          return (
            <div 
              key={`${milestone.year}-${index}`}
              className={`timeline-item timeline-item--${milestone.type}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="timeline-marker">
                <span className="timeline-year">{yearDisplay}</span>
                <div className="timeline-dot" />
              </div>
              
              <div className="timeline-content">
                <h3 className="timeline-title">{milestone.title}</h3>
                <p className="timeline-description">{milestone.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Timeline
