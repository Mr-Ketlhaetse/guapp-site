import { motion, useReducedMotion } from 'framer-motion'

function MobileIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="10" y="4" width="12" height="24" rx="2" stroke="#2ECC71" strokeWidth="1.5" />
      <line x1="10" y1="9" x2="22" y2="9" stroke="#2ECC71" strokeWidth="1.5" />
      <line x1="10" y1="23" x2="22" y2="23" stroke="#2ECC71" strokeWidth="1.5" />
      <circle cx="16" cy="26" r="1.5" fill="#2ECC71" />
      <circle cx="10" cy="4" r="1.5" fill="#2ECC71" />
      <circle cx="22" cy="4" r="1.5" fill="#2ECC71" />
    </svg>
  )
}

function WebIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect x="4" y="6" width="24" height="18" rx="2" stroke="#2ECC71" strokeWidth="1.5" />
      <line x1="4" y1="11" x2="28" y2="11" stroke="#2ECC71" strokeWidth="1.5" />
      <line x1="10" y1="28" x2="22" y2="28" stroke="#2ECC71" strokeWidth="1.5" />
      <line x1="16" y1="24" x2="16" y2="28" stroke="#2ECC71" strokeWidth="1.5" />
      <circle cx="7" cy="8.5" r="1.5" fill="#2ECC71" />
      <circle cx="11.5" cy="8.5" r="1.5" fill="#2ECC71" />
    </svg>
  )
}

function AIIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="5" stroke="#2ECC71" strokeWidth="1.5" />
      <line x1="16" y1="4" x2="16" y2="11" stroke="#2ECC71" strokeWidth="1.5" />
      <line x1="16" y1="21" x2="16" y2="28" stroke="#2ECC71" strokeWidth="1.5" />
      <line x1="4" y1="16" x2="11" y2="16" stroke="#2ECC71" strokeWidth="1.5" />
      <line x1="21" y1="16" x2="28" y2="16" stroke="#2ECC71" strokeWidth="1.5" />
      <circle cx="16" cy="4" r="1.5" fill="#2ECC71" />
      <circle cx="16" cy="28" r="1.5" fill="#2ECC71" />
      <circle cx="4" cy="16" r="1.5" fill="#2ECC71" />
      <circle cx="28" cy="16" r="1.5" fill="#2ECC71" />
    </svg>
  )
}

function DesignIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M8 24 L16 6 L24 24" stroke="#2ECC71" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="10.5" y1="18" x2="21.5" y2="18" stroke="#2ECC71" strokeWidth="1.5" />
      <circle cx="16" cy="6" r="1.5" fill="#2ECC71" />
      <circle cx="8" cy="24" r="1.5" fill="#2ECC71" />
      <circle cx="24" cy="24" r="1.5" fill="#2ECC71" />
    </svg>
  )
}

const capabilities = [
  {
    icon: <MobileIcon />,
    title: 'Mobile Dev',
    description:
      'Native iOS and Android apps built with Swift, Kotlin, and React Native — performant, polished, and platform-native.',
  },
  {
    icon: <WebIcon />,
    title: 'Web Platforms',
    description:
      'Full-stack web applications from landing pages to complex SaaS dashboards, built for scale and speed.',
  },
  {
    icon: <AIIcon />,
    title: 'AI Integration',
    description:
      'Embedding intelligence into your product — LLM-powered features, automation pipelines, and custom ML workflows.',
  },
  {
    icon: <DesignIcon />,
    title: 'UI/UX Design',
    description:
      'Design systems and interfaces that feel effortless. We turn complex flows into clear, delightful experiences.',
  },
]

export default function Capabilities() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="capabilities" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduce ? 0 : 0.6 }}
          className="mb-16"
        >
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-white">
            What We Build
          </h2>
          <p className="text-steel mt-3 text-lg">Our core areas of expertise.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: shouldReduce ? 0 : 0.5,
                delay: shouldReduce ? 0 : i * 0.1,
              }}
              className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-green rounded-2xl p-6 transition-colors duration-300"
            >
              <div className="mb-4">{cap.icon}</div>
              <h3 className="font-heading font-bold text-white text-lg mb-2">
                {cap.title}
              </h3>
              <p className="text-steel text-sm leading-relaxed">{cap.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
