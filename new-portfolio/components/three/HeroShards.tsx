import { useEffect, useRef } from "react";

// Soft "plexus" network: drifting nodes connected by thin lines when close.
// Right-side cluster, bottle-green only, smooth and atmospheric.
export function HeroShards() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;

    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      tone: number; // 0..1 hue/brightness variation
      phase: number;
    };
    let nodes: Node[] = [];
    let linkDist = 140;

    function build() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.floor(w * dpr);
      canvas!.height = Math.floor(h * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = w < 768;
      const count = isMobile ? 28 : 55;
      linkDist = isMobile ? 110 : 140;


      nodes = [];
      for (let i = 0; i < count; i++) {
        // bias toward right half but cover more area to avoid gaps
        const bias = Math.pow(Math.random(), 0.85);
        const x = w * (0.32 + bias * 0.78);
        const y = h * Math.random();
        const speed = 0.025 + Math.random() * 0.05;
        const ang = Math.random() * Math.PI * 2;
        nodes.push({
          x,
          y,
          vx: Math.cos(ang) * speed,
          vy: Math.sin(ang) * speed,
          r: 0.9 + Math.random() * 1.4,
          tone: Math.random(),
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function edgeAlpha(x: number) {
      // fade in from left, full on right
      return Math.min(1, Math.max(0, (x - w * 0.28) / (w * 0.22)));
    }


    function draw(tMs: number) {
      const t = tMs / 1000;
      ctx!.clearRect(0, 0, w, h);

      // soft right-side glow
      const grad = ctx!.createRadialGradient(w * 0.78, h * 0.5, 0, w * 0.78, h * 0.5, w * 0.7);
      grad.addColorStop(0, "rgba(46, 125, 100, 0.08)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx!.fillStyle = grad;
      ctx!.fillRect(0, 0, w, h);

      // update positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        // gentle swirl
        n.vx += Math.sin(t * 0.12 + n.phase) * 0.0005;
        n.vy += Math.cos(t * 0.1 + n.phase) * 0.0005;
        // soft bounds (wrap on right, reflect on top/bottom)
        if (n.x < w * 0.28) n.x = w * 1.08;
        if (n.x > w * 1.1) n.x = w * 0.28;
        if (n.y < -10) { n.y = -10; n.vy = Math.abs(n.vy); }
        if (n.y > h + 10) { n.y = h + 10; n.vy = -Math.abs(n.vy); }
        // velocity damping to keep things slow
        const sp = Math.hypot(n.vx, n.vy);
        const max = 0.1;
        if (sp > max) { n.vx *= max / sp; n.vy *= max / sp; }
      }

      // lines — soft and mild
      ctx!.lineWidth = 0.85;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ea = edgeAlpha(a.x);
        if (ea <= 0) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > linkDist * linkDist) continue;
          const d = Math.sqrt(d2);
          const eb = edgeAlpha(b.x);
          const closeness = 1 - d / linkDist;
          const alpha = closeness * 0.45 * Math.min(ea, eb);
          if (alpha <= 0.01) continue;
          ctx!.strokeStyle = `rgba(90, 190, 165, ${alpha})`;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      // nodes — dim teal, no bright white hotspot
      for (const n of nodes) {
        const ea = edgeAlpha(n.x);
        if (ea <= 0) continue;
        const flicker = 0.75 + 0.15 * Math.sin(t * (0.5 + n.tone * 0.4) + n.phase);
        const a = ea * flicker;

        // halo
        const g = ctx!.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        g.addColorStop(0, `rgba(60, 170, 145, ${0.18 * a})`);
        g.addColorStop(1, "rgba(60, 170, 145, 0)");
        ctx!.fillStyle = g;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx!.fill();

        // core (teal, not white)
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(110, 200, 175, ${0.55 * a})`;
        ctx!.fill();
      }


      raf = requestAnimationFrame(draw);
    }

    build();
    raf = requestAnimationFrame(draw);
    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{
        filter: "blur(0.4px)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, transparent 22%, #000 55%, #000 100%)",
        maskImage:
          "linear-gradient(90deg, transparent 0%, transparent 22%, #000 55%, #000 100%)",
      }}
    />
  );
}
