import { Download, FileText } from "lucide-react"
import type { DownloadableForm } from "@/lib/portal-types"

interface FormsTabProps {
  id: string
  eyebrow: string
  heading: string
  blurb: string
  forms: DownloadableForm[]
}

export function FormsTab({ id, eyebrow, heading, blurb, forms }: FormsTabProps) {
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

      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted text-left text-xs font-bold uppercase tracking-wide text-foreground">
            <tr>
              <th scope="col" className="px-4 py-3">
                Document
              </th>
              <th
                scope="col"
                className="hidden w-40 px-4 py-3 sm:table-cell"
              >
                Format
              </th>
              <th
                scope="col"
                className="w-28 px-4 py-3 text-right"
              >
                Download
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {forms.map((form) => (
              <tr key={form.id} className="hover:bg-muted/40">
                <td className="px-4 py-3.5">
                  <div className="flex items-start gap-3">
                    <FileText
                      className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-semibold text-foreground">
                        {form.title}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                        <span className="font-semibold uppercase tracking-wide">
                          Description:
                        </span>{" "}
                        {form.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="hidden px-4 py-3.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground sm:table-cell">
                  PDF Document
                </td>
                <td className="px-4 py-3.5 text-right">
                  <a
                    href={form.href}
                    download={form.fileName}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download ${form.title} as PDF`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-brand-dark text-brand-dark-foreground shadow-sm transition-colors hover:bg-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
