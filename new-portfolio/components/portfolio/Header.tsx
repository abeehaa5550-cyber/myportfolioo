import { useEffect, useState } from "react";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Systems", href: "#systems" },
  { label: "Arsenal", href: "#arsenal" },
  { label: "Log", href: "#log" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    h(); window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/60 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="group flex items-center gap-2" data-cursor="hover">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-[#2E7D64] text-mono text-sm font-bold text-[#2E7D64]">
            AA
          </div>
          <span className="hidden text-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground md:inline">
            v.2026.01
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              data-cursor="hover"
              className="text-mono text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-[#2E7D64]"
            >
              <span className="text-[#2E7D64]">/</span>{n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          data-cursor="hover"
          className="text-mono group flex items-center gap-2 rounded-2xl border border-[#2E7D64]/60 bg-[#2E7D64]/10 px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-foreground transition-all hover:bg-[#2E7D64]/25"
        >
          <span className="relative inline-block h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-[#2E7D64]" />
            <span className="absolute inset-0 rounded-full bg-[#2E7D64] pulse-dot" />
          </span>
          Online
        </a>
      </div>
    </header>
  );
}
