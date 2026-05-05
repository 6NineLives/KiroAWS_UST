"use client"

import { PortalShell } from "@/components/portal/portal-shell"
import { PortalBreadcrumb } from "@/components/portal/portal-breadcrumb"
import { SectionHeader } from "@/components/portal/section-header"
import { DeficienciesTab } from "@/components/swis/deficiencies-tab"
import { FormsTab } from "@/components/portal/forms-tab"
import { TrackingTab } from "@/components/portal/tracking-tab"
import { useTabHash } from "@/hooks/use-tab-hash"
import {
  portalConfig,
  swisForms,
  swisTrackedDocuments,
} from "@/lib/portal-config"

const TAB_IDS = portalConfig.swis.tabs.map((t) => t.id) as readonly string[]

export default function SwisEnrollmentPage() {
  const [activeTab, setActiveTab] = useTabHash(TAB_IDS, TAB_IDS[0]!)

  return (
    <PortalShell variant="sidebar">
      <PortalBreadcrumb
        items={[
          { label: "Online Services", href: "/" },
          { label: portalConfig.swis.title },
        ]}
      />
      <SectionHeader
        eyebrow="Enrollment Center"
        title={portalConfig.swis.title}
        description={portalConfig.swis.subtitle}
      />
      {activeTab === "deficiencies" && <DeficienciesTab />}
      {activeTab === "forms" && (
        <FormsTab
          id="forms"
          eyebrow={portalConfig.swis.forms.eyebrow}
          heading={portalConfig.swis.forms.heading}
          blurb={portalConfig.swis.forms.blurb}
          forms={swisForms}
        />
      )}
      {activeTab === "tracking" && (
        <TrackingTab
          id="tracking"
          eyebrow={portalConfig.swis.tracking.eyebrow}
          heading={portalConfig.swis.tracking.heading}
          blurb={portalConfig.swis.tracking.blurb}
          documents={swisTrackedDocuments}
        />
      )}
    </PortalShell>
  )
}
