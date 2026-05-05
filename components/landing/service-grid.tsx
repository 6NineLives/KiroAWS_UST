import Link from "next/link"
import {
  ArrowRight,
  GraduationCap,
  ListChecks,
  Shuffle,
} from "lucide-react"
import { portalConfig } from "@/lib/portal-config"

const ICONS = {
  swis: GraduationCap,
  shift: Shuffle,
} as const

export function ServiceGrid() {
  return (
    <section
      aria-labelledby="services-heading"
      className="px-4 pb-8 pt-4 sm:px-6"
    >
      <h2
        id="services-heading"
        className="mb-3 font-display text-base font-bold text-foreground"
      >
        {portalConfig.landing.sectionLabel}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {portalConfig.landing.services.map((service) => {
          const Icon = ICONS[service.id as keyof typeof ICONS] ?? ListChecks
          return (
            <article
              key={service.id}
              className="flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md focus-within:ring-2 focus-within:ring-ring"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-brand-gold/20 text-brand-gold-foreground ring-1 ring-brand-gold/40"
                  aria-hidden="true"
                >
                  <Icon className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <Link
                    href={service.href}
                    className="font-display text-base font-bold text-foreground hover:text-brand-blue focus-visible:outline-none focus-visible:underline"
                  >
                    {service.title}
                  </Link>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </div>
              <ul className="mt-4 flex flex-col gap-1">
                {service.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue transition-colors hover:text-brand-blue/80"
                    >
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}
