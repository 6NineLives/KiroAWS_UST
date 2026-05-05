"use client"

import Link from "next/link"
import { Home, LogOut } from "lucide-react"
import { portalConfig } from "@/lib/portal-config"

export function PortalHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between bg-brand-dark px-4 text-brand-dark-foreground sm:px-6">
      <Link href="/" className="flex items-baseline gap-2">
        <span className="font-display text-lg font-bold tracking-tight text-brand-gold">
          {portalConfig.brand.short}
        </span>
        <span className="text-sm font-medium text-brand-dark-foreground/85 sm:text-base">
          {portalConfig.brand.serviceName}
        </span>
      </Link>
      <nav className="flex items-center gap-1" aria-label="Account actions">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-brand-dark-foreground/85 transition-colors hover:bg-white/10 hover:text-white"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only sm:not-sr-only">Home</span>
        </Link>
        <button
          type="button"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-brand-dark-foreground/85 transition-colors hover:bg-white/10 hover:text-white"
        >
          <span className="sr-only sm:not-sr-only">Logout</span>
          <LogOut className="h-4 w-4" aria-hidden="true" />
        </button>
      </nav>
    </header>
  )
}
