"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ListChecks, Upload, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { PortalShell } from "@/components/portal/portal-shell"
import { PortalBreadcrumb } from "@/components/portal/portal-breadcrumb"
import { SectionHeader } from "@/components/portal/section-header"
import { colleges, portalConfig } from "@/lib/portal-config"
import type { Program } from "@/lib/portal-types"

interface PreliminaryRequirementsDialogProps {
  program: Program | null
  onClose: () => void
  onSuccess: (programName: string) => void
}

function PreliminaryRequirementsDialog({
  program,
  onClose,
  onSuccess,
}: PreliminaryRequirementsDialogProps) {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | null>>({})

  const handleFileChange = (reqIndex: number, file: File | null) => {
    setUploadedFiles((prev) => ({ ...prev, [reqIndex]: file }))
  }

  const handleSubmit = () => {
    if (!program) return
    // Handle submission logic here
    onSuccess(program.name)
  }

  if (!program) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-lg border border-border bg-card shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-border px-6 py-4">
          <h3 className="font-display text-xl font-bold text-foreground">
            Preliminary Requirements
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {program.name} ({program.code})
          </p>
        </div>

        <div className="px-6 py-5">
          <section aria-labelledby="attachments-title">
            <h4
              id="attachments-title"
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
                  {program.preliminaryRequirements.map((req, idx) => {
                    const uploadedFile = uploadedFiles[idx]
                    return (
                      <tr key={idx} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3.5">
                          <div className="min-w-0">
                            <p className="font-semibold text-foreground">
                              {req}
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
                              onChange={(e) => handleFileChange(idx, e.target.files?.[0] || null)}
                              aria-label={`Upload file for ${req}`}
                            />
                          </label>
                        </td>
                        <td className="hidden whitespace-nowrap px-4 py-3.5 text-sm text-muted-foreground sm:table-cell">
                          {uploadedFile ? new Date().toLocaleDateString('en-US', { 
                            day: '2-digit', 
                            month: 'short', 
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          }).toUpperCase() : '--'}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="border-t border-border px-6 py-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-brand-dark px-4 py-2 text-sm font-semibold text-brand-dark-foreground transition-colors hover:bg-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  )
}

interface SuccessMessageDialogProps {
  programName: string
  onClose: () => void
}

function SuccessMessageDialog({ programName, onClose }: SuccessMessageDialogProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg border border-border bg-card shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-status-received/20">
            <CheckCircle2 className="h-8 w-8 text-status-received" aria-hidden="true" />
          </div>
          <h3 className="mt-4 font-display text-xl font-bold text-foreground">
            Application Submitted Successfully!
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Your application for <span className="font-semibold text-foreground">{programName}</span> has been submitted. 
            You will receive updates on your application status via email.
          </p>
        </div>
        <div className="border-t border-border px-6 py-4 flex justify-center">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-brand-dark px-6 py-2 text-sm font-semibold text-brand-dark-foreground transition-colors hover:bg-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CollegeDetailPage({
  params,
}: {
  params: Promise<{ collegeId: string }>
}) {
  const resolvedParams = use(params)
  const router = useRouter()
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [submittedProgramName, setSubmittedProgramName] = useState("")

  const college = colleges.find((c) => c.id === resolvedParams.collegeId)

  if (!college) {
    return (
      <PortalShell variant="sidebar">
        <div className="px-4 py-6 sm:px-6">
          <p className="text-center text-muted-foreground">College not found</p>
          <div className="mt-4 text-center">
            <Link
              href="/shift-enrollment#select"
              className="text-brand-blue hover:underline"
            >
              Back to College Selection
            </Link>
          </div>
        </div>
      </PortalShell>
    )
  }

  return (
    <PortalShell variant="sidebar">
      <PortalBreadcrumb
        items={[
          { label: "Online Services", href: "/" },
          { label: portalConfig.shift.title, href: "/shift-enrollment#select" },
          { label: college.name },
        ]}
      />

      <div className="px-4 py-6 sm:px-6 space-y-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.push("/shift-enrollment#select")}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-blue hover:text-brand-blue/80"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Colleges
          </button>
        </div>

        <SectionHeader
          eyebrow={college.code}
          title={college.name}
          description={college.description}
        />

        {/* Shifting Requirements Section */}
        <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
          <header className="flex items-center gap-2">
            <ListChecks
              className="h-4 w-4 text-brand-gold-strong"
              aria-hidden="true"
            />
            <h4 className="font-display text-base font-bold text-foreground">
              Shifting Requirements
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

        {/* Programs Section */}
        <section>
          <h3 className="mb-3 font-display text-lg font-bold text-foreground">
            Programs Offered
          </h3>
          {college.programs && college.programs.length > 0 ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {college.programs.map((program) => (
                <li key={program.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedProgram(program)}
                    className="group flex h-full w-full flex-col gap-2 rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:border-brand-dark/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand-gold-strong">
                      {program.code}
                    </p>
                    <p className="font-display text-base font-bold leading-tight text-foreground">
                      {program.name}
                    </p>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {program.description}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
              No programs available for this college
            </div>
          )}
        </section>
      </div>

      {selectedProgram && (
        <PreliminaryRequirementsDialog
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
          onSuccess={(programName) => {
            setSubmittedProgramName(programName)
            setShowSuccessMessage(true)
            setSelectedProgram(null)
          }}
        />
      )}

      {showSuccessMessage && (
        <SuccessMessageDialog
          programName={submittedProgramName}
          onClose={() => setShowSuccessMessage(false)}
        />
      )}
    </PortalShell>
  )
}
