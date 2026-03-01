import { useMousePosition } from '../hooks/useMousePosition'

function GuAppLogoLarge({ size = 80 }: { size?: number }) {
  const r1 = size * 0.38
  const r2 = size * 0.22
  const cx = size / 2
  const cy = size / 2

  const terminals = [
    { x: cx + r1, y: cy },
    { x: cx - r1, y: cy },
    { x: cx + r2, y: cy },
    { x: cx - r2, y: cy },
  ]

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
      <path
        d={`M ${cx - r1} ${cy} A ${r1} ${r1} 0 0 1 ${cx + r1} ${cy}`}
        stroke="#2ECC71"
        strokeWidth="2.5"
        fill="none"
      />
      <path
        d={`M ${cx - r2} ${cy} A ${r2} ${r2} 0 0 1 ${cx + r2} ${cy}`}
        stroke="#2ECC71"
        strokeWidth="2.5"
        fill="none"
      />
      {terminals.map((t, i) => (
        <circle key={i} cx={t.x} cy={t.y} r="3" fill="#2ECC71" />
      ))}
    </svg>
  )
}

function TiltLogo() {
  const { x, y } = useMousePosition()
  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0

  const rotateX = Math.max(-15, Math.min(15, ((y - centerY) / centerY) * -15))
  const rotateY = Math.max(-15, Math.min(15, ((x - centerX) / centerX) * 15))

  return (
    <div
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
        display: 'inline-block',
      }}
    >
      <GuAppLogoLarge size={80} />
    </div>
  )
}

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Process', href: '#process' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'GitHub', href: '#' },
  { label: 'Twitter / X', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Dribbble', href: '#' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo + tagline */}
        <div className="flex flex-col items-start gap-4">
          <TiltLogo />
          <span className="font-heading font-bold text-white text-xl">GuApp</span>
          <p className="text-steel text-sm leading-relaxed max-w-xs">
            Globally Unique Apps. We build products that stand apart.
          </p>
        </div>

        {/* Nav links */}
        <div>
          <h4 className="font-heading font-semibold text-white text-sm tracking-widest uppercase mb-4">
            Navigation
          </h4>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-steel text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social links */}
        <div>
          <h4 className="font-heading font-semibold text-white text-sm tracking-widest uppercase mb-4">
            Follow Us
          </h4>
          <ul className="space-y-3">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-steel text-sm hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-steel text-xs">
        © {new Date().getFullYear()} GuApp. All rights reserved.
      </div>
    </footer>
  )
}
