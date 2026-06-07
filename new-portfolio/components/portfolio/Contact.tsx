import WorkingForm from "../WorkingForm";
import { SectionHeader } from "./SectionHeader";

const FIELDS = [
  { id: "EMAIL", value: "abeehaaamirr@gmail.com", href: "mailto:abeehaaamirr@gmail.com" },
  { id: "PHONE", value: "03298891430", href: "tel:+923298891430" },
  { id: "LOCATION", value: "Bahawalpur, Punjab, Pakistan", href: null },
];

export function Contact() {
  return (
    <section id="contact" className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-12">
      <SectionHeader index="08" title="Contact" subtitle="Initialize Signal" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-start">
        <div className="card-neon rounded-2xl border border-[#1A3B32] bg-[#0A0A0A] p-8">
          <div className="text-mono mb-6 text-[11px] uppercase tracking-[0.25em] text-[#2E7D64]">
            {'// channels'}
          </div>
          <ul className="space-y-5">
            {FIELDS.map((field) => (
              <li key={field.id} className="flex flex-col gap-1 border-b border-border/60 pb-4">
                <span className="text-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{field.id}</span>
                {field.href ? (
                  <a href={field.href} data-cursor="hover" className="link-neon text-display text-lg font-medium text-foreground transition-colors hover:text-[#2E7D64]">
                    {field.value}
                  </a>
                ) : (
                  <span className="text-display text-lg font-medium">{field.value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
        <WorkingForm />
      </div>
    </section>
  );
}
