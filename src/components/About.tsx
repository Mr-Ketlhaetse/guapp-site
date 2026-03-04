import { motion, useReducedMotion } from 'framer-motion'

const cards = [
  {
    label: 'Mission',
    headline: 'Build what matters.',
    body: 'To craft exceptional digital products — mobile, web, and AI-powered — that solve real problems, move fast, and hold up over time. We partner closely with founders and teams to turn ambitious ideas into polished software.',
  },
  {
    label: 'Vision',
    headline: 'Great ideas deserve great software.',
    body: 'A world where every compelling idea has the technical execution to match. We exist to close the gap between vision and product — making high-quality, thoughtfully designed software accessible to builders of all sizes.',
  },
]

export default function About() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduce ? 0 : 0.6 }}
          className="mb-16"
        >
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-white">
            About GuApp
          </h2>
          <p className="text-steel mt-4 text-lg leading-relaxed">
            GuApp is a software studio specialising in mobile, web, and AI-driven applications. We work with startups and growing businesses to design, build, and ship products that are fast, reliable, and built to scale — without the overhead of a large agency.
          </p>
        </motion.div>

        {/* Mission & Vision cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: shouldReduce ? 0 : 0.5,
                delay: shouldReduce ? 0 : i * 0.15,
              }}
              className="bg-white/5 backdrop-blur-md border border-white/10 hover:border-green rounded-2xl p-8 transition-colors duration-300"
            >
              <span className="text-green font-heading font-bold text-sm uppercase tracking-widest">
                {card.label}
              </span>
              <h3 className="font-heading font-extrabold text-white text-2xl mt-3 mb-4">
                {card.headline}
              </h3>
              <p className="text-steel text-base leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
