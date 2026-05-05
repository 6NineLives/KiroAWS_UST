"use client"

import { useCallback, useEffect, useState } from "react"

/**
 * Synchronizes a tab identifier with the URL hash for deep-linking and
 * bookmarking. Falls back to the provided default when no hash is present.
 */
export function useTabHash(allowed: readonly string[], fallback: string) {
  const isAllowed = useCallback(
    (value: string | null | undefined): value is string => {
      return !!value && (allowed as readonly string[]).includes(value)
    },
    [allowed],
  )

  const [activeTab, setActiveTab] = useState<string>(fallback)

  useEffect(() => {
    if (typeof window === "undefined") return

    const readHash = () => {
      const hash = window.location.hash.replace("#", "")
      setActiveTab(isAllowed(hash) ? hash : fallback)
    }

    readHash()
    window.addEventListener("hashchange", readHash)
    return () => window.removeEventListener("hashchange", readHash)
  }, [fallback, isAllowed])

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
