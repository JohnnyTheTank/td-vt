import { useState, useEffect } from 'react'
import Header from './components/Header'
import Timeline from './components/Timeline'
import FocusAreas from './components/FocusAreas'
import ProjectList from './components/ProjectList'
import Footer from './components/Footer'
import LegalPage from './components/LegalPage'
import SideNav from './components/SideNav'

type Page = 'home' | 'datenschutz' | 'impressum'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  
  // Check if we're on the CV page based on pathname
  const pathname = window.location.pathname
  const isCvPage = pathname.startsWith('/cv')

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1)
      if (hash === 'datenschutz' || hash === 'impressum') {
        setCurrentPage(hash)
      } else {
        setCurrentPage('home')
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = (page: Page) => {
    if (page === 'home') {
      window.location.hash = ''
      history.pushState('', document.title, window.location.pathname)
    } else {
      window.location.hash = page
    }
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  if (currentPage === 'datenschutz' || currentPage === 'impressum') {
    return (
      <div className="app">
        <LegalPage type={currentPage} onBack={() => navigate('home')} />
        <Footer 
          onNavigate={navigate}
          email={!isCvPage ? "info@td-vt.de" : undefined}
          phone={!isCvPage ? "+49 8131 310415" : undefined}
        />
      </div>
    )
  }

  // Landing Page: nur Header + Footer
  if (!isCvPage) {
    return (
      <div className="app app--landing">
        <Header 
          title="Veranstaltungstechnik" 
          showScrollButton={false} 
          isLanding 
          email="info@td-vt.de"
          phone="+49 8131 310415"
          showPortrait={false}
        />
        <Footer 
          onNavigate={navigate} 
          email="info@td-vt.de"
          phone="+49 8131 310415"
        />
      </div>
    )
  }

  // CV Page: voller Inhalt
  return (
    <div className="app">
      <Header />
      <main>
        <FocusAreas />
        <Timeline />
        <ProjectList />
      </main>
      <Footer onNavigate={navigate} />
      <SideNav />
    </div>
  )
}

export default App
