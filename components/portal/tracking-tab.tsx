"use client"

import { useState } from "react"
import { Upload } from "lucide-react"
import type { TrackedDocument } from "@/lib/portal-types"

interface TrackingTabProps {
  id: string
  eyebrow: string
  heading: string
  blurb: string
  documents: TrackedDocument[]
}

export function TrackingTab({
  id,
  eyebrow,
  heading,
  blurb,
  documents,
}: TrackingTabProps) {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({})

  const handleFileChange = (docId: string, file: File | null) => {
    setUploadedFiles((prev) => ({ ...prev, [docId]: file }))
  }

  // Collect all remarks from all documents for the unified remarks section
  const allRemarks = documents.flatMap(doc => 
    doc.remarks.map(remark => ({
      ...remark,
      documentTitle: doc.title
    }))
  ).sort((a, b) => {
    // Sort by date (most recent first)
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  // Collect all status entries from all documents
  const allStatuses = documents.map(doc => ({
    date: doc.submittedAt,
    status: doc.status,
    documentTitle: doc.title
  })).sort((a, b) => {
    // Sort by date (most recent first)
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

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
                  Document Requirements
                </th>
                <th
                  scope="col"
                  className="hidden w-48 px-4 py-3 sm:table-cell"
                >
                  Accepted File Type/s
                </th>
                <th scope="col" className="w-44 px-4 py-3">
                  Attach File
                </th>
                <th
                  scope="col"
                  className="hidden w-48 px-4 py-3 sm:table-cell"
                >
                  Date Submitted
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {documents.map((doc) => {
                const uploadedFile = uploadedFiles[doc.id]
                return (
                  <tr key={doc.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3.5">
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground">
                          {doc.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground sm:hidden">
                          Accepted: PDF, DOCX, JPG
                        </p>
                      </div>
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-3.5 text-xs text-muted-foreground sm:table-cell">
                      PDF, DOCX, JPG
                    </td>
                    <td className="px-4 py-3.5">
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted focus-within:ring-2 focus-within:ring-ring">
                        <Upload className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="max-w-[120px] truncate">
                          {uploadedFile ? uploadedFile.name : "Choose File"}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.docx,.jpg,.jpeg"
                          className="sr-only"
                          onChange={(e) => handleFileChange(doc.id, e.target.files?.[0] || null)}
                          aria-label={`Upload file for ${doc.title}`}
                        />
                      </label>
                    </td>
                    <td className="hidden whitespace-nowrap px-4 py-3.5 text-sm text-muted-foreground sm:table-cell">
                      {doc.submittedAt}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Unified Remarks Section */}
      <section aria-labelledby={`${id}-remarks-title`}>
        <h4
          id={`${id}-remarks-title`}
          className="mb-3 font-display text-lg font-bold text-brand-blue"
        >
          Remarks
        </h4>
        <div className="rounded-md border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-foreground">
                  Date
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-foreground">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allRemarks.length > 0 ? (
                allRemarks.map((remark, idx) => (
                  <tr key={idx} className="hover:bg-muted/30">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground align-top">
                      {remark.date}
                    </td>
                    <td className="px-4 py-3 text-xs text-foreground">
                      {remark.body}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-4 py-4 text-center text-xs text-muted-foreground">
                    {documents.length > 0 
                      ? `Please upload ${documents[0]?.title || "required documents"}`
                      : "No remarks available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Unified Status Section */}
      <section aria-labelledby={`${id}-status-title`}>
        <h4
          id={`${id}-status-title`}
          className="mb-3 font-display text-lg font-bold text-brand-blue"
        >
          Status
        </h4>
        <div className="rounded-md border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-foreground">
                  Date
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {allStatuses.length > 0 ? (
                allStatuses.map((statusEntry, idx) => (
                  <tr key={idx} className="hover:bg-muted/30">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground align-top">
                      {statusEntry.date}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      <StatusIndicator status={statusEntry.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-4 py-4 text-center text-xs text-muted-foreground">
                    No status updates available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function StatusIndicator({ status }: { status: string }) {
  const statusConfig = {
    received: { text: "SUBMITTED", color: "text-foreground" },
    pending: { text: "FOR OSA REVIEW", color: "text-status-pending" },
    incomplete: { text: "APPROVED SCHOLARSHIP", color: "text-status-received" },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.received

  return (
    <span className={`inline-flex items-center font-semibold ${config.color}`}>
      {config.text}
    </span>
  )
}
