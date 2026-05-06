"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname } from "next/navigation"

/**
 * Synchronizes a tab identifier with the URL hash for deep-linking and
 * bookmarking. Falls back to the provided default when no hash is present.
 */
export function useTabHash(allowed: readonly string[], fallback: string) {
  const pathname = usePathname()
  
  const isAllowed = useCallback(
    (value: string | null | undefined): value is string => {
      return !!value && (allowed as readonly string[]).includes(value)
    },
    [allowed],
  )

  // Read initial hash immediately
  const getInitialTab = () => {
    if (typeof window === "undefined") return fallback
    const hash = window.location.hash.replace("#", "")
    return isAllowed(hash) ? hash : fallback
  }

  const [activeTab, setActiveTab] = useState<string>(getInitialTab)

  useEffect(() => {
    if (typeof window === "undefined") return

    const readHash = () => {
      const hash = window.location.hash.replace("#", "")
      setActiveTab(isAllowed(hash) ? hash : fallback)
    }

    // Read hash on mount and whenever pathname changes (Next.js navigation)
    readHash()
    
    window.addEventListener("hashchange", readHash)
    return () => window.removeEventListener("hashchange", readHash)
  }, [fallback, isAllowed, pathname])

  const updateTab = useCallback(
    (next: string) => {
      if (!isAllowed(next)) return
      setActiveTab(next)
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href)
        url.hash = next
        window.history.replaceState(null, "", url.toString())
      }
    },
    [isAllowed],
  )

  return [activeTab, updateTab] as const
}
