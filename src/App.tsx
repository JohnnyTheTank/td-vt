import Header from './components/Header'
import Timeline from './components/Timeline'
import Skills from './components/Skills'
import ProjectList from './components/ProjectList'

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Timeline />
        <Skills />
        <ProjectList />
      </main>
    </div>
  )
}

export default App
