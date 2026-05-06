import Link from "next/link"
import { ArrowRight, Megaphone } from "lucide-react"
import { portalConfig } from "@/lib/portal-config"

export function AnnouncementCard() {
  const a = portalConfig.landing.announcement
  return (
    <section
      aria-labelledby="announcement-heading"
      className="mx-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:mx-6 sm:p-6"
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-gold text-brand-gold-foreground ring-1 ring-brand-gold"
            aria-hidden="true"
          >
            <Megaphone className="h-6 w-6" />
          </div>
          <div>
            <h2
              id="announcement-heading"
              className="font-display text-base font-bold text-foreground sm:text-lg"
            >
              {a.eyebrow}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {a.body}
            </p>
          </div>
        </div>
        <Link
          href={a.ctaHref}
          className="inline-flex items-center gap-2 rounded-md bg-brand-dark px-4 py-2 text-sm font-semibold text-brand-dark-foreground transition-colors hover:bg-brand-dark/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {a.ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
