"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { colleges, portalConfig } from "@/lib/portal-config"
import type { CollegeOption } from "@/lib/portal-types"
import Image from "next/image"

export function CollegeSelectionTab() {
  const cfg = portalConfig.shift.select
  const router = useRouter()
  const [filter, setFilter] = useState("")

  const filteredColleges = useMemo<CollegeOption[]>(() => {
    const query = filter.trim().toLowerCase()
    if (!query) return colleges
    return colleges.filter((college) => {
      const haystack = [
        college.name,
        college.code,
        college.description,
        ...college.keywords,
      ]
        .join(" ")
        .toLowerCase()
      return haystack.includes(query)
    })
  }, [filter])

  const handleSelect = (collegeId: string) => {
    router.push(`/shift-enrollment/college/${collegeId}`)
  }

  return (
    <div
      role="tabpanel"
      id="panel-select"
      aria-labelledby="tab-select"
      className="space-y-5 px-4 py-6 sm:px-6"
    >
      <header>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold-strong">
          {cfg.eyebrow}
        </p>
        <h3 className="mt-1 font-display text-xl font-bold text-foreground sm:text-2xl">
          {cfg.heading}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Click a college to view its shifting requirements and available programs.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative flex w-full items-center sm:max-w-md">
          <span className="sr-only">Filter colleges</span>
          <Search
            className="pointer-events-none absolute left-3 h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            placeholder={cfg.filterPlaceholder}
            className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </label>
        <p className="text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filteredColleges.length}
          </span>{" "}
          of {colleges.length} colleges
        </p>
      </div>

      {filteredColleges.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          {cfg.noResults}
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredColleges.map((college) => {
            return (
              <li key={college.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(college.id)}
                  className={cn(
                    "group relative flex h-full w-full flex-col gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    "border-border hover:border-brand-dark/40 hover:shadow-md",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    {college.icon ? (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md overflow-hidden bg-muted">
                        <Image
                          src={college.icon}
                          alt={`${college.name} icon`}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <span
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-foreground"
                        aria-hidden="true"
                      >
                        <Building2 className="h-5 w-5" />
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-gold-strong">
                      {college.code}
                    </p>
                    <p className="mt-1 font-display text-base font-bold leading-tight text-foreground">
                      {college.name}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {college.description}
                    </p>
                  </div>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
