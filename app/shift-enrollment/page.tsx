"use client"

import { PortalShell } from "@/components/portal/portal-shell"
import { PortalBreadcrumb } from "@/components/portal/portal-breadcrumb"
import { SectionHeader } from "@/components/portal/section-header"
import { TabsNav } from "@/components/portal/tabs-nav"
import { CollegeSelectionTab } from "@/components/shift/college-selection-tab"
import { FormsTab } from "@/components/portal/forms-tab"
import { TrackingTab } from "@/components/portal/tracking-tab"
import { useTabHash } from "@/hooks/use-tab-hash"
import {
  portalConfig,
  shiftForms,
  shiftTrackedDocuments,
} from "@/lib/portal-config"

const TAB_IDS = portalConfig.shift.tabs.map((t) => t.id) as readonly string[]

export default function ShiftEnrollmentPage() {
  const [activeTab, setActiveTab] = useTabHash(TAB_IDS, TAB_IDS[0]!)

  return (
    <PortalShell variant="sidebar">
      <PortalBreadcrumb
        items={[
          { label: "Online Services", href: "/" },
          { label: portalConfig.shift.title },
        ]}
      />
      <SectionHeader
        eyebrow="Enrollment Center"
        title={portalConfig.shift.title}
        description={portalConfig.shift.subtitle}
      />
      <TabsNav
        tabs={portalConfig.shift.tabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        ariaLabel="Shift Enrollment sections"
      />
      {activeTab === "select" && <CollegeSelectionTab />}
      {activeTab === "forms" && (
        <FormsTab
          id="forms"
          eyebrow={portalConfig.shift.forms.eyebrow}
          heading={portalConfig.shift.forms.heading}
          blurb={portalConfig.shift.forms.blurb}
          forms={shiftForms}
        />
      )}
      {activeTab === "tracking" && (
        <TrackingTab
          id="tracking"
          eyebrow={portalConfig.shift.tracking.eyebrow}
          heading={portalConfig.shift.tracking.heading}
          blurb={portalConfig.shift.tracking.blurb}
          documents={shiftTrackedDocuments}
        />
      )}
    </PortalShell>
  )
}
