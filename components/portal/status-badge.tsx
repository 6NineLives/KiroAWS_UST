import { CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { DocumentStatus } from "@/lib/portal-types"

interface StatusBadgeProps {
  status: DocumentStatus
  className?: string
}

const STATUS_MAP: Record<
  DocumentStatus,
  { label: string; tone: string; Icon: typeof CheckCircle2 }
> = {
  received: {
    label: "Received",
    tone: "bg-status-received/15 text-status-received border-status-received/30",
    Icon: CheckCircle2,
  },
  pending: {
    label: "Pending",
    tone: "bg-status-pending/15 text-status-pending border-status-pending/30",
    Icon: Clock,
  },
  incomplete: {
    label: "Incomplete",
    tone: "bg-status-incomplete/15 text-status-incomplete border-status-incomplete/30",
    Icon: AlertCircle,
  },
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const { label, tone, Icon } = STATUS_MAP[status]
  return (
    <span
      role="status"
      aria-label={`Document status: ${label}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
        tone,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </span>
  )
}
