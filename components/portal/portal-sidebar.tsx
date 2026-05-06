"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useState, type MouseEvent } from "react"
import { Home, UserRound, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { portalConfig } from "@/lib/portal-config"

interface PortalSidebarProps {
  open: boolean
  onClose: () => void
}

/**
 * Resolve which sidebar section corresponds to the current route.
 * Falls back to `null` when the user is on a page without a matching
 * category (e.g. the dashboard, even though we don't render the sidebar
 * there today — this keeps the component robust against future reuse).
 */
function useActiveCategory(pathname: string) {
  return useMemo(() => {
    return (
      portalConfig.sidebar.items.find((item) =>
        pathname.startsWith(item.href),
      ) ?? null
    )
  }, [pathname])
}

export function PortalSidebar({ open, onClose }: PortalSidebarProps) {
  const pathname = usePathname()
  const activeCategory = useActiveCategory(pathname)
  const [activeHash, setActiveHash] = useState<string>("")

  useEffect(() => {
    const sync = () => setActiveHash(window.location.hash.replace("#", ""))
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [])

  /**
   * Same-page hash links should update state instantly without re-running
   * Next.js routing. We intercept the click, replace the hash via the
   * History API, and manually fire a hashchange event so the page's
   * `useTabHash` listener reacts in the same tick.
   */
  const handleHashClick =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      const [path, hash] = href.split("#")
      if (!hash) return
      const samePage = path === pathname || path === ""
      if (!samePage) return
      event.preventDefault()
      const next = `${window.location.pathname}${window.location.search}#${hash}`
      window.history.replaceState(null, "", next)
      window.dispatchEvent(new HashChangeEvent("hashchange"))
      onClose()
    }

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-30 bg-black/50 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <aside
        aria-label="Portal navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-brand-dark text-brand-dark-foreground shadow-xl transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-end p-2 lg:hidden">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-md p-2 text-brand-dark-foreground/80 hover:bg-white/10"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="bg-brand-gold px-6 py-6 text-brand-gold-foreground">
          <div className="flex flex-col items-center text-center">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold-foreground/10 ring-2 ring-brand-gold-foreground/20"
              aria-label={portalConfig.user.avatarLabel}
            >
              <UserRound className="h-8 w-8" aria-hidden="true" />
            </div>
            <p className="mt-3 font-display text-sm font-bold leading-tight tracking-wide">
              {portalConfig.user.fullName}
            </p>
            <p className="mt-1 text-xs font-medium opacity-80">
              {portalConfig.user.studentNumber}
            </p>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4" aria-label="Online services">
          <Link
            href="/"
            onClick={(e) => {
              // Force a full page reload when navigating to dashboard
              // This ensures hash state is properly reset for subsequent navigation
              e.preventDefault()
              window.location.href = "/"
            }}
            className={cn(
              "flex items-center gap-3 px-6 py-2.5 text-sm font-medium transition-colors",
              pathname === "/"
                ? "bg-brand-gold/15 text-brand-gold"
                : "text-brand-dark-foreground/85 hover:bg-white/5 hover:text-white",
            )}
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Dashboard
          </Link>

          {activeCategory ? (
            <div className="mt-4">
              <p className="px-6 text-xs font-bold tracking-[0.18em] text-brand-dark-foreground/70">
                {portalConfig.sidebar.sectionLabel}
              </p>
              <p className="mt-3 px-6 text-sm font-semibold uppercase tracking-wide text-brand-gold">
                {activeCategory.label}
              </p>
              <ul
                id={`nav-${activeCategory.id}`}
                className="mt-2 flex flex-col"
              >
                {activeCategory.children.map((child) => {
                  const childHash = child.href.split("#")[1]
                  const isCurrent = activeHash === childHash
                  return (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={handleHashClick(child.href)}
                        aria-current={isCurrent ? "page" : undefined}
                        className={cn(
                          "block border-l-2 px-6 py-2 text-sm transition-colors",
                          isCurrent
                            ? "border-brand-gold bg-brand-gold/15 text-brand-gold"
                            : "border-transparent text-brand-dark-foreground/80 hover:bg-white/5 hover:text-white",
                        )}
                      >
                        {child.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ) : null}
        </nav>

        <div className="border-t border-white/10 px-6 py-4 text-[11px] leading-relaxed text-brand-dark-foreground/60">
          {portalConfig.brand.full}
        </div>
      </aside>
    </>
  )
}
