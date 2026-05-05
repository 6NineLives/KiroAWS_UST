import { PortalShell } from "@/components/portal/portal-shell"
import { WelcomeBanner } from "@/components/landing/welcome-banner"
import { AnnouncementCard } from "@/components/landing/announcement-card"
import { ServiceGrid } from "@/components/landing/service-grid"

export default function HomePage() {
  return (
    <PortalShell>
      <WelcomeBanner />
      <AnnouncementCard />
      <ServiceGrid />
    </PortalShell>
  )
}
