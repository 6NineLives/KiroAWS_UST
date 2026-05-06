"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { type MouseEvent } from "react"
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
  const pathname = usePathname()

  /**
   * Handle hash navigation properly. If clicking a link that goes to a different
   * page with a hash, let Next.js handle it normally. If clicking a hash link
   * for the current page, manually update the hash and trigger hashchange event.
   */
  const handleHashClick =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      const [path, hash] = href.split("#")
      if (!hash) return
      const samePage = path === pathname
      if (!samePage) return
      event.preventDefault()
      const next = `${window.location.pathname}${window.location.search}#${hash}`
      window.history.replaceState(null, "", next)
      window.dispatchEvent(new HashChangeEvent("hashchange"))
    }
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
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-brand-gold text-brand-gold-foreground ring-1 ring-brand-gold"
                  aria-hidden="true"
                >
                  <Icon className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <Link
                    href={service.href}
                    onClick={handleHashClick(service.href)}
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
                      onClick={handleHashClick(link.href)}
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
