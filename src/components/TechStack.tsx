import { motion, useReducedMotion } from 'framer-motion'

const techItems = [
  'React',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Kotlin',
  'openAI',
  'Python',
  'Docker',
]

export default function TechStack() {
  const shouldReduce = useReducedMotion()

  return (
    <section id="tech" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduce ? 0 : 0.6 }}
          className="mb-12"
        >
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-white">
            The Tools We Trust
          </h2>
          <p className="text-steel mt-3 text-lg">
            Battle-tested technologies that power production-grade products.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-4">
          {techItems.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: shouldReduce ? 0 : 0.4,
                delay: shouldReduce ? 0 : i * 0.07,
              }}
              className="px-5 py-2.5 rounded-lg border border-white/10 text-steel font-medium text-sm hover:border-white/20 hover:text-white transition-colors"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
