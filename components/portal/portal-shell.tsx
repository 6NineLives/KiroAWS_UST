"use client"

import { useState, type ReactNode } from "react"
import { Menu } from "lucide-react"
import { PortalHeader } from "./portal-header"
import { PortalSidebar } from "./portal-sidebar"
import { PortalFooter } from "./portal-footer"
import { portalConfig } from "@/lib/portal-config"

type PortalVariant = "header" | "sidebar"

interface PortalShellProps {
  children: ReactNode
  /**
   * "header" — landing/dashboard layout: top nav only, no sidebar.
   * "sidebar" — inner enrollment layout: persistent sidebar on desktop,
   * with a compact mobile-only trigger inside the main content.
   */
  variant?: PortalVariant
}

export function PortalShell({ children, variant = "header" }: PortalShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (variant === "header") {
    return (
      <div className="flex min-h-screen w-full flex-col bg-background">
        <PortalHeader />
        <main className="flex-1">{children}</main>
        <PortalFooter />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full bg-background">
      <PortalSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-card px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
            aria-label="Open navigation"
            aria-expanded={sidebarOpen}
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="font-display text-sm font-bold text-foreground">
            {portalConfig.brand.short}{" "}
            <span className="font-medium text-muted-foreground">
              {portalConfig.brand.serviceName}
            </span>
          </span>
        </div>
        <main className="flex-1">{children}</main>
        <PortalFooter />
      </div>
    </div>
  )
}
