"use client"

import { UserRound } from "lucide-react"
import { useEffect, useState } from "react"
import { portalConfig } from "@/lib/portal-config"

function formatDate(date: Date) {
  const d = String(date.getDate()).padStart(2, "0")
  const m = String(date.getMonth() + 1).padStart(2, "0")
  const y = date.getFullYear()
  const hh = String(date.getHours()).padStart(2, "0")
  const mm = String(date.getMinutes()).padStart(2, "0")
  return `${d}/${m}/${y} ${hh}:${mm}`
}

export function WelcomeBanner() {
  const [now, setNow] = useState<string>("")

  useEffect(() => {
    setNow(formatDate(new Date()))
    const id = window.setInterval(() => setNow(formatDate(new Date())), 60_000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section
      aria-labelledby="welcome-heading"
      className="flex flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6"
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gold/30 text-brand-gold-foreground ring-2 ring-brand-gold/40"
          aria-hidden="true"
        >
          <UserRound className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">
            {portalConfig.landing.welcomeLabel}
          </p>
          <h1
            id="welcome-heading"
            className="font-display text-base font-bold tracking-tight text-foreground sm:text-lg"
          >
            {portalConfig.user.fullName}
          </h1>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        {portalConfig.landing.todayLabel}{" "}
        <span className="font-semibold text-foreground" suppressHydrationWarning>
          {now || "--/--/---- --:--"}
        </span>
      </p>
    </section>
  )
}
