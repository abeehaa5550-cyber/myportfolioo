import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Mail } from "lucide-react";

const NAVIGATION = [
  ["Home", "#top"],
  ["About", "#about"],
  ["Skills", "#arsenal"],
  ["Experience", "#log"],
  ["Projects", "#systems"],
  ["Education", "#education"],
  ["Contact", "#contact"],
];

const SOCIAL = [
  ["LinkedIn", "https://www.linkedin.com/in/abeeha-aamir-7a700530b", FaLinkedinIn],
  ["GitHub", "https://github.com/abeehaa5550-cyber", FaGithub],
  ["Email", "mailto:abeehaaamirr@gmail.com", Mail],
] as const;

export function Footer() {
  return (
    <footer className="technical-footer relative z-10">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-12">
        <div className="grid gap-12 sm:grid-cols-2">
          <div>
            <p className="footer-heading">Navigation</p>
            <nav className="footer-link-grid">
              {NAVIGATION.map(([label, href]) => (
                <a key={href} href={href} data-cursor="hover" className="footer-link">
                  <span>↗</span>{label}
                </a>
              ))}
            </nav>
          </div>
          <div>
            <p className="footer-heading">Social Connect</p>
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map(([label, href, Icon]) => (
                <a key={href} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" aria-label={label} data-cursor="hover" className="footer-social-icon">
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>DESIGNED &amp; BUILT BY ABEEHA AAMIR</span>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span>2026 ALL RIGHTS RESERVED</span>
            <span>BUILD: 2026.06.V3</span>
            <span className="text-[#3D9B82]">LATENCY: 12MS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
