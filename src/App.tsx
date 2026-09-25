import { useEffect, useState } from 'react'
import './App.css'
import { Assistant } from './components/Assistant'
import { Contact } from './components/Contact'
import { Header } from './components/Header'
import { PageLoader } from './components/PageLoader'
import { About, Footer, Hero, Projects, Skills } from './components/Sections'
import { navLinks } from './data/portfolio'
import { useActiveSection, useReveal, useTheme } from './hooks/usePortfolioEffects'

const sectionIds = navLinks.map((link) => link.id)

function App() {
  const [isPageLoading, setIsPageLoading] = useState(true)
  const [theme, setTheme] = useTheme()
  const activeSection = useActiveSection(sectionIds, !isPageLoading)
  useReveal(!isPageLoading)

  useEffect(() => {
    const loaderTimer = window.setTimeout(() => setIsPageLoading(false), 1200)
    return () => window.clearTimeout(loaderTimer)
  }, [])

  if (isPageLoading) return <PageLoader />

  return (
    <div className="page-shell">
      <div className="backdrop" aria-hidden="true" />
      <Header theme={theme} onThemeChange={setTheme} activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Assistant />
    </div>
  )
}

export default App
