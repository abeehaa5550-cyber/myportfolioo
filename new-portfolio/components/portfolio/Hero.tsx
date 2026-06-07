import { useEffect, useRef, useState } from "react";
import { HeroShards } from "@/components/three/HeroShards";

const LINES = [
  "> Building intelligent systems...",
  "> Orchestrating AI agents...",
  "> Securing backend architecture...",
];

function useTypedLoop() {
  const [text, setText] = useState("");
  const [li, setLi] = useState(0);
  useEffect(() => {
    const target = LINES[li];
    let i = 0;
    const reset = window.setTimeout(() => setText(""), 0);
    const typer = setInterval(() => {
      i++;
      setText(target.slice(0, i));
      if (i >= target.length) {
        clearInterval(typer);
        setTimeout(() => setLi((p) => (p + 1) % LINES.length), 1800);
      }
    }, 40);
    return () => {
      window.clearTimeout(reset);
      clearInterval(typer);
    };
  }, [li]);
  return text;
}

export function Hero() {
  const typed = useTypedLoop();
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      const x = ((event.clientX / window.innerWidth) - 0.5) * 30;
      const y = ((event.clientY / window.innerHeight) - 0.5) * 30;
      nameRef.current?.style.setProperty("transform", `translate3d(${x}px, ${y}px, 0)`);
    };
    const handleLeave = () => nameRef.current?.style.setProperty("transform", "translate3d(0, 0, 0)");

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <section id="top" className="relative min-h-[88vh] overflow-hidden pt-24">
      <div className="grid-bg absolute inset-0 z-0" />
      <HeroShards />
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-4 md:px-12">
        <div className="text-mono mb-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
          <span className="rounded-md border border-border px-2 py-1">SYS.STATUS</span>
          <span className="flex items-center gap-2 text-[#2E7D64]">
            <span className="relative inline-flex h-2 w-2">
              <span className="pulse-dot absolute inset-0 rounded-full bg-[#2E7D64]" />
              <span className="absolute inset-0 rounded-full bg-[#2E7D64]" />
            </span>
            ONLINE
          </span>
          <span className="text-border">|</span>
          <span className="text-foreground/80">N8N ACTIVE</span>
          <span className="text-border">|</span>
          <span className="text-foreground/80">AI CORE READY</span>
        </div>

        <div className="text-mono mb-4 text-[11px] uppercase tracking-[0.3em] text-[#2E7D64]">
          BACKEND / AI AUTOMATION / SYSTEMS
        </div>

        <h1 ref={nameRef} className="hero-parallax-name text-display tracking-tight" style={{ fontSize: "clamp(44px, 8vw, 72px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16, color: "#FFFFFF" }}>
          <span className="block">Abeeha</span>
          <span className="glitch block text-[#2E7D64]" data-text="Aamir.">Aamir.</span>
        </h1>

        <p className="mt-4 max-w-2xl text-display" style={{ fontSize: "20px", fontWeight: 600, letterSpacing: "0.5px", color: "#2E7D64", marginBottom: 24 }}>
          AI Automation Engineer & Backend Systems Architect
        </p>

        <p className="max-w-[600px]" style={{ fontSize: "16px", fontWeight: 400, lineHeight: 1.5, color: "#B0B0B0" }}>
          Building intelligent, scalable Python & Django systems powered by AI orchestration and automation.
        </p>

        <div className="mt-8 h-7 text-mono text-sm text-[#2E7D64]">
          <span className="caret">{typed}</span>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#systems"
            data-cursor="hover"
            className="btn-neon text-mono group relative overflow-hidden rounded-lg border border-[#2E7D64] bg-[#2E7D64] px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-black"
          >
            View My Work →
          </a>
          <a
            href="#contact"
            data-cursor="hover"
            className="btn-neon text-mono rounded-lg border border-foreground/30 bg-transparent px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-foreground"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}
