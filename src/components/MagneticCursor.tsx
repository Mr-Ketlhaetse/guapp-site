import { useEffect, useRef } from 'react'
import { motion, useSpring, useReducedMotion } from 'framer-motion'
import { useMousePosition } from '../hooks/useMousePosition'

export default function MagneticCursor() {
  const { x, y } = useMousePosition()
  const shouldReduce = useReducedMotion()

  const springConfig = shouldReduce
    ? { stiffness: 10000, damping: 1000 }
    : { stiffness: 150, damping: 20 }

  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const sizeRef = useRef(12)
  const opacityRef = useRef(0.5)

  const motionSize = useSpring(12, springConfig)
  const motionOpacity = useSpring(0.5, springConfig)

  useEffect(() => {
    const magneticEls = document.querySelectorAll<HTMLElement>(
      'a, button, [data-magnetic]'
    )

    function onEnter(el: HTMLElement) {
      return () => {
        motionSize.set(40)
        motionOpacity.set(0.3)
        sizeRef.current = 40
        opacityRef.current = 0.3

        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        springX.set(centerX - 20)
        springY.set(centerY - 20)
      }
    }

    function onLeave() {
      motionSize.set(12)
      motionOpacity.set(0.5)
      sizeRef.current = 12
      opacityRef.current = 0.5
    }

    const handlers: Array<{ el: HTMLElement; enter: () => void; leave: () => void }> = []

    magneticEls.forEach((el) => {
      const enter = onEnter(el)
      const leave = onLeave
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
  }, [motionSize, motionOpacity, springX, springY])

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        x: springX,
        y: springY,
        width: motionSize,
        height: motionSize,
        borderRadius: '50%',
        backgroundColor: '#2ECC71',
        opacity: motionOpacity,
        pointerEvents: 'none',
        zIndex: 9999,
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  )
}
