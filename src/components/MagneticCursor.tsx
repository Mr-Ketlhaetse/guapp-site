import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export default function MagneticCursor() {
  const shouldReduce = useReducedMotion()

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const cursorSize = useMotionValue(12)
  const cursorOpacity = useMotionValue(0.5)

  const springConfig = shouldReduce
    ? { stiffness: 10000, damping: 1000 }
    : { stiffness: 150, damping: 20 }

  const springX = useSpring(mouseX, springConfig)
  const springY = useSpring(mouseY, springConfig)
  const springSize = useSpring(cursorSize, springConfig)
  const springOpacity = useSpring(cursorOpacity, { stiffness: 200, damping: 25 })

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    const magneticEls = document.querySelectorAll<HTMLElement>('a, button, [data-magnetic]')
    const handlers: Array<{ el: HTMLElement; enter: () => void; leave: () => void }> = []

    magneticEls.forEach((el) => {
      const enter = () => {
        cursorSize.set(40)
        cursorOpacity.set(0.3)
        const rect = el.getBoundingClientRect()
        mouseX.set(rect.left + rect.width / 2)
        mouseY.set(rect.top + rect.height / 2)
      }
      const leave = () => {
        cursorSize.set(12)
        cursorOpacity.set(0.5)
      }
      el.addEventListener('mouseenter', enter)
      el.addEventListener('mouseleave', leave)
      handlers.push({ el, enter, leave })
    })

    return () => {
      handlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener('mouseenter', enter)
        el.removeEventListener('mouseleave', leave)
      })
    }
  }, [cursorSize, cursorOpacity, mouseX, mouseY])

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        width: springSize,
        height: springSize,
        borderRadius: '50%',
        backgroundColor: '#2ECC71',
        opacity: springOpacity,
        pointerEvents: 'none',
        zIndex: 9999,
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  )
}
