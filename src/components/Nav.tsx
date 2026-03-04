import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import logoUrl from '../assets/guapp_favicon.png'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Work', id: 'work' },
  { label: 'Capabilities', id: 'capabilities' },
  { label: 'Process', id: 'process' },
  { label: 'Tech Stack', id: 'tech' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const shouldReduce = useReducedMotion()

  const menuVariants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: shouldReduce ? 0 : -10 },
  }

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md border-b border-white/5 bg-dark/80">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3"
        >
          <img src={logoUrl} alt="GuApp logo" className="w-10 h-10 object-contain" />
          <span className="font-heading font-bold text-white text-xl tracking-wide">
            GuApp
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.id)}
              className="text-steel hover:text-white transition-colors text-sm font-medium"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="px-5 py-2 rounded-lg bg-green text-dark font-semibold text-sm nav-cta"
            style={{ boxShadow: shouldReduce ? 'none' : undefined }}
          >
            Start a Project
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/5 bg-dark/95 px-6 py-4 flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => { scrollTo(link.id); setMenuOpen(false) }}
                className="text-steel hover:text-white transition-colors text-sm font-medium py-2 text-left"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { scrollTo('contact'); setMenuOpen(false) }}
              className="px-5 py-2 rounded-lg bg-green text-dark font-semibold text-sm text-center"
            >
              Start a Project
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          .nav-cta {
            animation: pulse-glow 2.5s ease-in-out infinite;
          }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(46, 204, 113, 0.4); }
          50% { box-shadow: 0 0 12px 4px rgba(46, 204, 113, 0.25); }
        }
      `}</style>
    </nav>
  )
}
