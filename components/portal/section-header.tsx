interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="border-b border-border bg-brand-dark px-4 py-4 text-brand-dark-foreground sm:px-6">
      <div className="flex flex-col gap-1">
        {eyebrow && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-gold">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-lg font-semibold leading-tight sm:text-xl">
          {title}
        </h2>
        {description && (
          <p className="max-w-3xl text-sm leading-relaxed text-brand-dark-foreground/75">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}
