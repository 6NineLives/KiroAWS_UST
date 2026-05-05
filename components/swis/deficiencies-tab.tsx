import { AlertTriangle, BookOpen, Calendar, GraduationCap, User } from "lucide-react"
import { portalConfig, swisDeficiencies } from "@/lib/portal-config"
import type { DeficiencyRecord } from "@/lib/portal-types"

const REASON_TONE: Record<DeficiencyRecord["reason"], string> = {
  Failed: "bg-status-incomplete/15 text-status-incomplete border-status-incomplete/30",
  Incomplete: "bg-status-pending/15 text-status-pending border-status-pending/30",
  Withdrawn: "bg-muted text-muted-foreground border-border",
  Dropped: "bg-muted text-muted-foreground border-border",
}

export function DeficienciesTab() {
  const cfg = portalConfig.swis.deficiencies
  const totalUnits = swisDeficiencies.reduce((sum, item) => sum + item.units, 0)

  return (
    <div
      role="tabpanel"
      id="panel-deficiencies"
      aria-labelledby="tab-deficiencies"
      className="space-y-6 px-4 py-6 sm:px-6"
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

      <div className="grid gap-3 sm:grid-cols-3">
        <SummaryStat
          icon={BookOpen}
          label="Total Subjects"
          value={swisDeficiencies.length.toString()}
        />
        <SummaryStat
          icon={GraduationCap}
          label="Total Units"
          value={totalUnits.toString()}
        />
        <SummaryStat
          icon={AlertTriangle}
          label="Status"
          value={swisDeficiencies.length > 0 ? "Action Required" : "Clear"}
          tone="incomplete"
        />
      </div>

      {swisDeficiencies.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-card p-10 text-center text-sm text-muted-foreground">
          {cfg.emptyMessage}
        </div>
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-lg border border-border bg-card lg:block">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs font-bold uppercase tracking-wide text-foreground">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Subject Code
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Units
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Term Failed
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Professor
                  </th>
                  <th scope="col" className="px-4 py-3 text-center">
                    Grade
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Reason
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Next Offering
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {swisDeficiencies.map((row) => (
                  <tr key={row.id} className="hover:bg-muted/30">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-foreground">
                      {row.code}
                    </td>
                    <td className="px-4 py-3 text-foreground">{row.title}</td>
                    <td className="px-4 py-3 text-center text-foreground">
                      {row.units}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{row.term}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.professor}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold">
                      {row.grade}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-semibold ${REASON_TONE[row.reason]}`}
                      >
                        {row.reason}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {row.nextOffering}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="grid gap-3 lg:hidden">
            {swisDeficiencies.map((row) => (
              <li
                key={row.id}
                className="rounded-lg border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs font-bold text-foreground">
                      {row.code}
                    </p>
                    <p className="mt-1 font-semibold text-foreground">
                      {row.title}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-semibold ${REASON_TONE[row.reason]}`}
                  >
                    {row.reason}
                  </span>
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                  <Field icon={GraduationCap} label="Units" value={String(row.units)} />
                  <Field icon={AlertTriangle} label="Grade" value={row.grade} />
                  <Field icon={Calendar} label="Term" value={row.term} />
                  <Field icon={User} label="Professor" value={row.professor} />
                </dl>
                <p className="mt-3 border-t border-border pt-2 text-xs text-muted-foreground">
                  Next offering:{" "}
                  <span className="font-semibold text-foreground">
                    {row.nextOffering}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

function SummaryStat({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof BookOpen
  label: string
  value: string
  tone?: "incomplete"
}) {
  const toneClass =
    tone === "incomplete"
      ? "text-status-incomplete"
      : "text-foreground"
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <Icon className={`h-4 w-4 ${toneClass}`} aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      </div>
      <p className={`mt-2 font-display text-2xl font-bold ${toneClass}`}>
        {value}
      </p>
    </div>
  )
}

function Field({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-1.5">
      <Icon className="mt-0.5 h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
      <div>
        <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {label}
        </dt>
        <dd className="font-medium text-foreground">{value}</dd>
      </div>
    </div>
  )
}
