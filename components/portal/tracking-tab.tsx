"use client"

import { Fragment, useState } from "react"
import { ChevronDown, FileText, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { StatusBadge } from "./status-badge"
import type { TrackedDocument } from "@/lib/portal-types"

interface TrackingTabProps {
  id: string
  eyebrow: string
  heading: string
  blurb: string
  documents: TrackedDocument[]
}

const REQUIRED_IDS = new Set<string>(["DOC-1001", "STD-2001"])

export function TrackingTab({
  id,
  eyebrow,
  heading,
  blurb,
  documents,
}: TrackingTabProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const toggle = (docId: string) =>
    setExpandedId((prev) => (prev === docId ? null : docId))

  return (
    <div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      className="space-y-5 px-4 py-6 sm:px-6"
    >
      <header>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold-strong">
          {eyebrow}
        </p>
        <h3 className="mt-1 font-display text-xl font-bold text-foreground sm:text-2xl">
          {heading}
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {blurb}
        </p>
      </header>

      <section aria-labelledby={`${id}-attachments-title`}>
        <h4
          id={`${id}-attachments-title`}
          className="mb-3 font-display text-lg font-bold text-foreground"
        >
          Attachments
        </h4>
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead className="bg-muted text-left text-xs font-bold uppercase tracking-wide text-foreground">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Document
                </th>
                <th
                  scope="col"
                  className="hidden w-48 px-4 py-3 sm:table-cell"
                >
                  Date Submitted
                </th>
                <th scope="col" className="w-44 px-4 py-3">
                  Activity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {documents.map((doc) => {
                const isOpen = expandedId === doc.id
                const hasRemarks = doc.remarks.length > 0
                const isRequired = REQUIRED_IDS.has(doc.id)
                return (
                  <Fragment key={doc.id}>
                    <tr
                      className={cn(
                        "transition-colors",
                        isOpen ? "bg-muted/40" : "hover:bg-muted/30",
                      )}
                    >
                      <td className="px-4 py-3.5">
                        <div className="flex items-start gap-3">
                          <FileText
                            className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
                            aria-hidden="true"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground">
                              {doc.title}
                              {isRequired && (
                                <span className="ml-2 text-xs font-bold text-destructive">
                                  [Required]
                                </span>
                              )}
                            </p>
                            <p className="mt-0.5 text-xs text-muted-foreground sm:hidden">
                              Submitted {doc.submittedAt}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="hidden whitespace-nowrap px-4 py-3.5 text-sm text-muted-foreground sm:table-cell">
                        {doc.submittedAt}
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-between gap-2">
                          <StatusBadge status={doc.status} />
                          <button
                            type="button"
                            onClick={() => toggle(doc.id)}
                            aria-expanded={isOpen}
                            aria-controls={`remarks-${doc.id}`}
                            aria-label={
                              hasRemarks
                                ? `${isOpen ? "Hide" : "Show"} ${doc.remarks.length} remark${doc.remarks.length > 1 ? "s" : ""} for ${doc.title}`
                                : `${isOpen ? "Hide" : "Show"} details for ${doc.title}`
                            }
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <ChevronDown
                              className={cn(
                                "h-3.5 w-3.5 transition-transform",
                                isOpen ? "rotate-180" : "rotate-0",
                              )}
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr>
                        <td
                          colSpan={3}
                          id={`remarks-${doc.id}`}
                          className="border-t border-border bg-muted/30 px-4 py-4"
                        >
                          <div className="flex items-center gap-2">
                            <MessageSquare
                              className="h-3.5 w-3.5 text-muted-foreground"
                              aria-hidden="true"
                            />
                            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground">
                              Remarks
                            </p>
                          </div>
                          {hasRemarks ? (
                            <ol className="mt-3 flex flex-col gap-2">
                              {doc.remarks.map((remark, idx) => (
                                <li
                                  key={`${doc.id}-${idx}`}
                                  className="rounded-md border border-border bg-card p-3"
                                >
                                  <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
                                    <span className="font-bold text-foreground">
                                      {remark.author}
                                    </span>
                                    <span className="text-muted-foreground">
                                      {remark.date}
                                    </span>
                                  </div>
                                  <p className="mt-1.5 text-sm leading-relaxed text-foreground">
                                    &ldquo;{remark.body}&rdquo;
                                  </p>
                                </li>
                              ))}
                            </ol>
                          ) : (
                            <p className="mt-2 text-sm text-muted-foreground">
                              No administrator remarks have been recorded for this document.
                            </p>
                          )}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
