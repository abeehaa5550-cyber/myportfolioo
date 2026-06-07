import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const ITEMS = [
  { href: "https://www.linkedin.com/in/abeeha-aamir-7a700530b", label: "LinkedIn", Icon: FaLinkedinIn },
  { href: "https://github.com/abeehaa5550-cyber", label: "GitHub", Icon: FaGithub },
];

export function SocialRail() {
  return (
    <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-4 md:flex">
      {ITEMS.map(({ href, label, Icon }, i) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          aria-label={label}
          data-cursor="hover"
          style={{ animation: `social-in 0.5s ease-out ${i * 0.08}s both` }}
          className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-[#1A3B32] bg-[#111111]/80 text-[#2E7D64] backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-[#1A3B32] hover:text-white hover:shadow-[0_0_16px_#2E7D64]"
        >
          <Icon size={20} strokeWidth={1.8} />
        </a>
      ))}
      <style>{`@keyframes social-in { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }`}</style>
    </div>
  );
}
