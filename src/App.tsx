import { useState, useEffect } from 'react'
import Header from './components/Header'
import Timeline from './components/Timeline'
import Skills from './components/Skills'
import ProjectList from './components/ProjectList'
import Footer from './components/Footer'
import LegalPage from './components/LegalPage'

type Page = 'home' | 'datenschutz' | 'impressum'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

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
        <Footer onNavigate={navigate} />
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <main>
        <Timeline />
        <Skills />
        <ProjectList />
      </main>
      <Footer onNavigate={navigate} />
    </div>
  )
}

export default App
