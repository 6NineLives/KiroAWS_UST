"use client"

import { useCallback, useEffect, useState } from "react"

/**
 * Persists a piece of state in localStorage. Keeps SSR-safe by deferring reads
 * until after hydration.
 */
export function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const stored = window.localStorage.getItem(key)
      if (stored !== null) {
        setValue(JSON.parse(stored) as T)
      }
    } catch (error) {
      console.log("[v0] usePersistentState read failed:", error)
    } finally {
      setIsHydrated(true)
    }
  }, [key])

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (prev: T) => T)(prev) : next
        try {
          if (typeof window !== "undefined") {
            window.localStorage.setItem(key, JSON.stringify(resolved))
          }
        } catch (error) {
          console.log("[v0] usePersistentState write failed:", error)
        }
        return resolved
      })
    },
    [key],
  )

  const reset = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.log("[v0] usePersistentState clear failed:", error)
    }
    setValue(initialValue)
  }, [key, initialValue])

  return { value, setValue: update, reset, isHydrated }
}
