import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'Deep dive into your goals, users, and constraints. We map out what matters before writing a single line.',
  },
  {
    number: '02',
    title: 'Design',
    description:
      'Wireframes, prototypes, and a design system that reflects your brand and guides every interface decision.',
  },
  {
    number: '03',
    title: 'Build',
    description:
      'Engineering with quality gates at every step. Clean architecture, tested code, continuous delivery.',
  },
  {
    number: '04',
    title: 'Launch & Grow',
    description:
      'Ship it. Then iterate fast based on real user data. We stay on as your long-term product partner.',
  },
]

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'end 20%'],
  })

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="process" ref={sectionRef} className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduce ? 0 : 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-white">
            How We Work
          </h2>
          <p className="text-steel mt-3 text-lg">A process built for clarity and speed.</p>
        </motion.div>

        <div className="relative">
          {/* Background track */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

          {/* Animated fill line */}
          <motion.div
            className="absolute left-6 top-0 w-px bg-green origin-top"
            style={{ scaleY: shouldReduce ? 1 : scaleY, height: '100%' }}
          />

          <div className="space-y-16">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex items-start gap-8 pl-16">
                {/* Step node */}
                <motion.div
                  initial={{ backgroundColor: '#B0B3B8' }}
                  whileInView={{ backgroundColor: '#2ECC71' }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: shouldReduce ? 0 : 0.4, delay: shouldReduce ? 0 : i * 0.1 }}
                  className="absolute left-3.5 top-1 w-5 h-5 rounded-full border-2 border-dark flex-shrink-0 -translate-x-1/2"
                />

                {/* Label */}
                <motion.div
                  initial={{ opacity: 0, x: shouldReduce ? 0 : -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: shouldReduce ? 0 : 0.5,
                    delay: shouldReduce ? 0 : i * 0.1,
                  }}
                >
                  <span className="font-heading font-bold text-green text-sm tracking-widest">
                    {step.number}
                  </span>
                  <h3 className="font-heading font-bold text-white text-xl mt-1 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-steel text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
