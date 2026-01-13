import { careerMilestones } from '../data/career'
import './Timeline.css'

function Timeline() {
  return (
    <section className="timeline-section" id="werdegang">
      <h2 className="section-title">Beruflicher Werdegang</h2>
      
      <div className="timeline">
        {careerMilestones.map((milestone, index) => (
          <div 
            key={`${milestone.year}-${index}`}
            className={`timeline-item timeline-item--${milestone.type}`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="timeline-marker">
              <span className="timeline-year">{milestone.year}</span>
              <div className="timeline-dot" />
            </div>
            
            <div className="timeline-content">
              <h3 className="timeline-title">{milestone.title}</h3>
              <p className="timeline-description">{milestone.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Timeline
