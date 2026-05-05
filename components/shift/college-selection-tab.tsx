"use client"

import { useMemo, useState } from "react"
import {
  Building2,
  Check,
  CheckCircle2,
  ListChecks,
  Search,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { colleges, portalConfig } from "@/lib/portal-config"
import { usePersistentState } from "@/hooks/use-persistent-state"
import type { CollegeOption } from "@/lib/portal-types"

const STORAGE_KEY = "shift-enrollment:selected-college"

export function CollegeSelectionTab() {
  const cfg = portalConfig.shift.select
  const [filter, setFilter] = useState("")
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null)
  const {
    value: selectedId,
    setValue: setSelectedId,
    reset: resetSelected,
    isHydrated,
  } = usePersistentState<string | null>(STORAGE_KEY, null)

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

  const selectedCollege = useMemo(
    () => colleges.find((c) => c.id === selectedId) ?? null,
    [selectedId],
  )

  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? prev : id))
    setSubmittedMessage(null)
  }

  const handleClear = () => {
    resetSelected()
    setSubmittedMessage(null)
  }

  const handleSubmit = () => {
    if (!selectedCollege) return
    setSubmittedMessage(cfg.submittedToast)
    resetSelected()
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
          {cfg.blurb}
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

      {submittedMessage && (
        <div
          role="status"
          className="flex items-start gap-2 rounded-md border border-status-received/40 bg-status-received/10 px-4 py-3 text-sm text-status-received"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>{submittedMessage}</p>
        </div>
      )}

      {isHydrated && selectedCollege && (
        <SelectedCollegeBanner
          college={selectedCollege}
          selectedLabel={cfg.selectedLabel}
          clearLabel={cfg.clearLabel}
          submitLabel={cfg.submitLabel}
          onClear={handleClear}
          onSubmit={handleSubmit}
        />
      )}

      {filteredColleges.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          {cfg.noResults}
        </div>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredColleges.map((college) => {
            const isSelected = college.id === selectedId
            return (
              <li key={college.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(college.id)}
                  aria-pressed={isSelected}
                  className={cn(
                    "group relative flex h-full w-full flex-col gap-3 rounded-xl border bg-card p-4 text-left shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isSelected
                      ? "border-brand-gold-strong ring-2 ring-brand-gold/60"
                      : "border-border hover:border-brand-dark/40 hover:shadow-md",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-md",
                        isSelected
                          ? "bg-brand-gold/30 text-brand-gold-foreground"
                          : "bg-muted text-foreground",
                      )}
                      aria-hidden="true"
                    >
                      <Building2 className="h-5 w-5" />
                    </span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-brand-gold px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide text-brand-gold-foreground">
                        <Check className="h-3 w-3" aria-hidden="true" />
                        Selected
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

      {isHydrated && selectedCollege && (
        <RequirementsPanel
          college={selectedCollege}
          heading={cfg.requirementsHeading}
        />
      )}
    </div>
  )
}

function SelectedCollegeBanner({
  college,
  selectedLabel,
  clearLabel,
  submitLabel,
  onClear,
  onSubmit,
}: {
  college: CollegeOption
  selectedLabel: string
  clearLabel: string
  submitLabel: string
  onClear: () => void
  onSubmit: () => void
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-brand-gold/50 bg-brand-gold/10 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold-strong">
          {selectedLabel}
        </p>
        <p className="mt-1 font-display text-base font-bold text-foreground">
          {college.name}{" "}
          <span className="font-mono text-xs font-semibold text-muted-foreground">
            ({college.code})
          </span>
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          {clearLabel}
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex items-center gap-1.5 rounded-md bg-brand-dark px-3 py-2 text-xs font-bold text-brand-dark-foreground transition-colors hover:bg-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          {submitLabel}
        </button>
      </div>
    </div>
  )
}

function RequirementsPanel({
  college,
  heading,
}: {
  college: CollegeOption
  heading: string
}) {
  return (
    <section
      aria-label={`Requirements for ${college.name}`}
      className="rounded-xl border border-border bg-card p-5 shadow-sm"
    >
      <header className="flex items-center gap-2">
        <ListChecks
          className="h-4 w-4 text-brand-gold-strong"
          aria-hidden="true"
        />
        <h4 className="font-display text-base font-bold text-foreground">
          {heading} &middot;{" "}
          <span className="text-brand-gold-strong">{college.name}</span>
        </h4>
      </header>
      <ol className="mt-4 flex flex-col gap-2">
        {college.requirements.map((req, idx) => (
          <li
            key={`${college.id}-req-${idx}`}
            className="flex items-start gap-3 text-sm leading-relaxed"
          >
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/30 font-mono text-[11px] font-bold text-brand-gold-foreground"
              aria-hidden="true"
            >
              {idx + 1}
            </span>
            <span className="text-foreground">{req}</span>
          </li>
        ))}
      </ol>
    </section>
  )
}
