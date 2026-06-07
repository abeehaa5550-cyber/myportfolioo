interface Props { index: string; title: string; subtitle?: string; }
export function SectionHeader({ index, title, subtitle }: Props) {
  return (
    <div className="mb-12 flex flex-col gap-3 border-b border-border pb-6">
      <div className="text-mono flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#2E7D64]">
        <span>[{index}]</span>
        <span className="h-px w-12 bg-[#2E7D64]/60" />
        <span className="text-muted-foreground">{subtitle}</span>
      </div>
      <h2 className="text-display text-xl font-medium uppercase tracking-tight sm:text-2xl lg:text-[28px]" style={{ lineHeight: 1.3, letterSpacing: "-0.01em" }}>{title}</h2>
    </div>
  );
}
