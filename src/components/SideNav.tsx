import { useState, useEffect } from 'react'
import './SideNav.css'

interface NavItem {
  id: string
  label: string
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Start' },
  { id: 'schwerpunkte', label: 'Schwerpunkte' },
  { id: 'werdegang', label: 'Werdegang' },
  { id: 'projekte', label: 'Projekte' },
]

function SideNav() {
  const [activeSection, setActiveSection] = useState<string>('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    // Show nav after scrolling past header, track home section
    const handleScroll = () => {
      const scrollY = window.scrollY
      const headerHeight = window.innerHeight * 0.5
      setIsVisible(scrollY > headerHeight)
      
      // Set home as active when near top
      if (scrollY < headerHeight) {
        setActiveSection('home')
      }
      
      // Set projekte as active when at bottom of page
      const isAtBottom = window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50
      if (isAtBottom) {
        setActiveSection('projekte')
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`side-nav ${isVisible ? 'side-nav--visible' : ''}`}>
      <div className="side-nav-track" />
      <ul className="side-nav-list">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              className={`side-nav-item ${activeSection === item.id ? 'side-nav-item--active' : ''}`}
              onClick={() => scrollToSection(item.id)}
              aria-label={`Zu ${item.label} springen`}
            >
              <span className="side-nav-dot" />
              <span className="side-nav-label">{item.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SideNav
