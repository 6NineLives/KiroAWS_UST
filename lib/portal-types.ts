export type PortalCategory = "swis" | "shift"

export type DocumentStatus = "pending" | "received" | "incomplete"

export interface DeficiencyRecord {
  id: string
  code: string
  title: string
  units: number
  term: string
  professor: string
  grade: string
  reason: "Failed" | "Incomplete" | "Withdrawn" | "Dropped"
  nextOffering: string
}

export interface DownloadableForm {
  id: string
  title: string
  description: string
  fileName: string
  href: string
}

export interface TrackingRemark {
  date: string
  author: string
  body: string
}

export interface TrackedDocument {
  id: string
  title: string
  submittedAt: string
  status: DocumentStatus
  remarks: TrackingRemark[]
}

export interface CollegeOption {
  id: string
  code: string
  name: string
  keywords: string[]
  description: string
  requirements: string[]
}
