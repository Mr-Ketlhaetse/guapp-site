import { motion, useReducedMotion } from 'framer-motion'
import NetworkCanvas from './NetworkCanvas'

const headlineWords = ['Globally', 'Unique', 'Apps,', 'Built', 'for', 'Impact.']

export default function Hero() {
  const shouldReduce = useReducedMotion()

  const wordVariant = {
    hidden: { y: shouldReduce ? 0 : 40, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: shouldReduce ? 0 : i * 0.05,
        duration: shouldReduce ? 0 : 0.5,
        ease: 'easeOut' as const,
      },
    }),
  }

  const subVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: shouldReduce ? 0 : headlineWords.length * 0.05 + 0.3,
        duration: shouldReduce ? 0 : 0.6,
      },
    },
  }

  const ctaVariant = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduce ? 0 : headlineWords.length * 0.05 + 0.7,
        duration: shouldReduce ? 0 : 0.5,
      },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <NetworkCanvas />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark/80 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Headline */}
        <h1 className="font-heading font-extrabold text-5xl md:text-7xl text-white leading-tight mb-6">
          {headlineWords.map((word, i) => (
            <motion.span
              key={word + i}
              custom={i}
              variants={wordVariant}
              initial="hidden"
              animate="visible"
              className="inline-block mr-4"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Sub-headline */}
        <motion.p
          variants={subVariant}
          initial="hidden"
          animate="visible"
          className="text-steel text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          We craft mobile and web products that don't just ship — they stand out.
          From concept to launch, your idea becomes something the world hasn't seen before.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={ctaVariant}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#work"
            className="px-8 py-3.5 rounded-lg bg-green text-dark font-heading font-semibold hover:brightness-110 transition-all"
          >
            See Our Work
          </a>
          <a
            href="#capabilities"
            className="px-8 py-3.5 rounded-lg border border-white/20 text-white font-heading font-semibold hover:border-green hover:text-green transition-all"
          >
            View Capabilities
          </a>
        </motion.div>
      </div>
    </section>
  )
}
