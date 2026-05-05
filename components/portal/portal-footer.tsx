import { portalConfig } from "@/lib/portal-config"

export function PortalFooter() {
  return (
    <footer className="border-t border-border bg-card px-4 py-4 text-xs sm:px-6">
      <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
        <p className="text-brand-gold">{portalConfig.footer.copyright}</p>
        <p className="text-brand-gold">{portalConfig.footer.designedBy}</p>
      </div>
    </footer>
  )
}
