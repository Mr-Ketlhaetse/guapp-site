import { useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

function createNodes(count: number, width: number, height: number): Node[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
  }))
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  nodes: Node[],
  width: number,
  height: number
) {
  ctx.clearRect(0, 0, width, height)

  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 120) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(176,179,184,0.15)'
        ctx.lineWidth = 1
        ctx.moveTo(nodes[i].x, nodes[i].y)
        ctx.lineTo(nodes[j].x, nodes[j].y)
        ctx.stroke()
      }
    }
  }

  for (const node of nodes) {
    ctx.beginPath()
    ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(46,204,113,0.4)'
    ctx.fill()
  }
}

export default function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = canvas.offsetWidth
    let height = canvas.offsetHeight
    canvas.width = width
    canvas.height = height

    const nodes = createNodes(60, width, height)

    if (shouldReduce) {
      drawFrame(ctx, nodes, width, height)
      return
    }

    let rafId: number

    function tick() {
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
      }
      drawFrame(ctx!, nodes, width, height)
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    const observer = new ResizeObserver(() => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width
      canvas.height = height
    })
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [shouldReduce])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
