import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const projects = [
  { name: 'Aether Finance', category: 'Mobile App', gradient: 'from-slate-800 to-slate-900' },
  { name: 'Orbital CMS', category: 'Web Platform', gradient: 'from-zinc-800 to-zinc-900' },
  { name: 'Nexus AI', category: 'AI Integration', gradient: 'from-neutral-800 to-neutral-900' },
  { name: 'Prism Design', category: 'UI/UX Design', gradient: 'from-stone-800 to-stone-900' },
  { name: 'Velocity Flow', category: 'Web Platform', gradient: 'from-gray-800 to-gray-900' },
]

export default function WorkShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-60%'])

  return (
    <section id="work" ref={sectionRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-white">
            Our Work
          </h2>
          <p className="text-steel mt-3 text-lg">Products we've brought to life.</p>
        </div>

        <div className="relative overflow-visible">
          <motion.div
            style={{ x }}
            className="flex gap-8 pl-6 md:pl-24"
          >
            {projects.map((project) => (
              <div
                key={project.name}
                className="flex-shrink-0 w-80 h-[440px] rounded-2xl border border-white/10 hover:border-green transition-all duration-300 hover:shadow-[0_0_24px_rgba(46,204,113,0.2)] group overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #111820, #0d1318)' }}
              >
                {/* Mockup placeholder */}
                <div
                  className={`m-5 h-52 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
                >
                  <div className="w-12 h-12 rounded-full border-2 border-white/10 group-hover:border-green/30 transition-colors" />
                </div>

                <div className="px-5 pb-5">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium border border-green/30 text-green mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-white">
                    {project.name}
                  </h3>
                  <p className="text-steel text-sm mt-2 leading-relaxed">
                    A next-generation product built with precision and purpose.
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
