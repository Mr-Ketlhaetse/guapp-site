import { HashRouter, Routes, Route } from 'react-router-dom'
import { useLenis } from './hooks/useLenis'
import MagneticCursor from './components/MagneticCursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
// import WorkShowcase from './components/WorkShowcase'
import Capabilities from './components/Capabilities'
import ProcessTimeline from './components/ProcessTimeline'
import TechStack from './components/TechStack'
import Contact from './components/Contact'
import Footer from './components/Footer'

function HomePage() {
  return (
    <>
      <Nav />
      <Hero />
      {/* <WorkShowcase /> */}
      <Capabilities />
      <ProcessTimeline />
      <TechStack />
      <Contact />
      <Footer />
    </>
  )
}

export default function App() {
  useLenis()
  return (
    <HashRouter>
      <MagneticCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </HashRouter>
  )
}
