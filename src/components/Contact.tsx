import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const projectTypes = [
  'Mobile App (iOS/Android)',
  'Web Platform / SaaS',
  'AI Integration',
  'UI/UX Design',
  'Other',
]

interface FormData {
  name: string
  email: string
  projectType: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = 'Name is required.'
  if (!data.email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = 'Enter a valid email address.'
  if (!data.message.trim()) errors.message = 'Message is required.'
  return errors
}

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeelbqga'

export default function Contact() {
  const shouldReduce = useReducedMotion()
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    projectType: projectTypes[0],
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    setSubmitError(null)
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setSubmitError((data as { error?: string }).error ?? 'Submission failed. Please try again.')
      }
    } catch {
      setSubmitError('Network error. Please check your connection and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-steel focus:outline-none focus:ring-2 focus:ring-green transition-shadow text-sm'

  const errorClass = 'text-red-400 text-xs mt-1'

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 overflow-x-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left: Headline + value props */}
        <motion.div
          initial={{ opacity: 0, x: shouldReduce ? 0 : -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduce ? 0 : 0.6 }}
          className="min-w-0"
        >
          <h2 className="font-heading font-extrabold text-4xl md:text-5xl text-white mb-6">
            Start a Project
          </h2>
          <p className="text-steel text-lg leading-relaxed mb-8">
            Got an idea? Let's talk. We'll help you scope it, plan it, and ship it.
          </p>
          <ul className="space-y-4">
            {[
              'Transparent pricing, no surprises',
              'Dedicated team, not freelancers',
              'Agile delivery with weekly updates',
              'Long-term partnership mindset',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-steel text-sm">
                <span className="mt-0.5 w-5 h-5 rounded-full border border-green text-green flex items-center justify-center text-xs flex-shrink-0">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: shouldReduce ? 0 : 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduce ? 0 : 0.6 }}
          className="min-w-0"
        >
          {submitted ? (
            <div className="rounded-2xl bg-white/5 border border-white/10 p-10 text-center">
              <div className="w-12 h-12 rounded-full bg-green/20 flex items-center justify-center mx-auto mb-4">
                <span className="text-green text-xl">✓</span>
              </div>
              <h3 className="font-heading font-bold text-white text-xl mb-2">
                Message sent!
              </h3>
              <p className="text-steel text-sm">
                Thanks for reaching out. We'll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.name && <p className={errorClass}>{errors.name}</p>}
              </div>

              <div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.email && <p className={errorClass}>{errors.email}</p>}
              </div>

              <div>
                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {projectTypes.map((pt) => (
                    <option key={pt} value={pt} className="bg-dark">
                      {pt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={handleChange}
                  className={inputClass + ' resize-none'}
                />
                {errors.message && <p className={errorClass}>{errors.message}</p>}
              </div>

              {submitError && (
                <p className="text-red-400 text-sm">{submitError}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-8 py-3.5 rounded-lg bg-green text-dark font-heading font-semibold hover:brightness-110 transition-all nav-cta disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>
      </div>

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
    </section>
  )
}
