/**
 * Pure-JS confetti burst — no external library.
 * Spawns canvas-based particles that fall and fade out, then removes the canvas.
 */
export function useConfetti() {
  function launch() {
    const canvas = document.createElement('canvas')
    canvas.style.cssText =
      'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;'
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const COLORS = ['#6C63FF', '#FF6584', '#43D7A0', '#FFD166', '#EF476F', '#06D6A0', '#F97316']
    const PARTICLE_COUNT = 160

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.4 - canvas.height * 0.1,
      w: Math.random() * 10 + 5,
      h: Math.random() * 5 + 3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 4 + 2,
      vr: (Math.random() - 0.5) * 0.2,
      alpha: 1,
    }))

    let animId
    const startTime = performance.now()
    const DURATION = 2800

    function draw(now) {
      const elapsed = now - startTime
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.12
        p.rotation += p.vr
        p.alpha = Math.max(0, 1 - elapsed / DURATION)

        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      }

      if (elapsed < DURATION) {
        animId = requestAnimationFrame(draw)
      } else {
        cancelAnimationFrame(animId)
        canvas.remove()
      }
    }

    animId = requestAnimationFrame(draw)
  }

  return { launch }
}
