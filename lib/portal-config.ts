/**
 * Centralized configuration for the entire enrollment portal.
 * All copy, navigation, and seed data flow from here so the UI can be
 * relocalized or rebranded without touching component logic.
 */

import type {
  CollegeOption,
  DeficiencyRecord,
  DownloadableForm,
  TrackedDocument,
  PortalCategory,
} from "./portal-types"

export const portalConfig = {
  brand: {
    short: "UST-OICT",
    full: "Office of Information and Communications Technology",
    serviceName: "Online Services",
    logoLabel: "UST-OICT Online Services",
  },
  user: {
    fullName: "LACANLALE, SHANLEY CLARENCE ROQUE",
    studentNumber: "2023188565",
    program: "BS Information Technology",
    avatarLabel: "Student Avatar",
  },
  landing: {
    welcomeLabel: "Welcome",
    todayLabel: "Today is",
    announcement: {
      eyebrow: "Latest Updates and Announcements",
      body: "Read the latest announcements from the Office of Information and Communications Technology (OICT).",
      ctaLabel: "Go Here",
      ctaHref: "#announcements",
    },
    sectionLabel: "What would you like to access?",
    services: [
      {
        id: "swis",
        title: "SWIS Enrollment",
        description:
          "Track deficiencies, download required forms, and monitor submitted documents for SWIS enrollment.",
        href: "/swis-enrollment",
        links: [
          { label: "View Deficiencies", href: "/swis-enrollment#deficiencies" },
          { label: "Downloadable Forms", href: "/swis-enrollment#forms" },
          { label: "Document Tracking", href: "/swis-enrollment#tracking" },
        ],
      },
      {
        id: "shift",
        title: "Shift Enrollment",
        description:
          "Browse colleges, review shifting requirements, and submit your application to a new program.",
        href: "/shift-enrollment",
        links: [
          { label: "Select College", href: "/shift-enrollment#select" },
          { label: "Downloadable Forms", href: "/shift-enrollment#forms" },
          { label: "Document Tracking", href: "/shift-enrollment#tracking" },
        ],
      },
    ],
  },
  sidebar: {
    sectionLabel: "ONLINE SERVICES",
    items: [
      {
        id: "swis",
        label: "SWIS Enrollment",
        href: "/swis-enrollment",
        children: [
          { label: "Deficiencies", href: "/swis-enrollment#deficiencies" },
          { label: "Downloadable Forms", href: "/swis-enrollment#forms" },
          { label: "Document Tracking", href: "/swis-enrollment#tracking" },
        ],
      },
      {
        id: "shift",
        label: "Shift Enrollment",
        href: "/shift-enrollment",
        children: [
          { label: "Select College", href: "/shift-enrollment#select" },
          { label: "Downloadable Forms", href: "/shift-enrollment#forms" },
          { label: "Document Tracking", href: "/shift-enrollment#tracking" },
        ],
      },
    ],
  },
  swis: {
    title: "SWIS Enrollment",
    subtitle: "Subject Without Independent Schedule (SWIS) Enrollment Center",
    tabs: [
      { id: "deficiencies", label: "Deficiencies" },
      { id: "forms", label: "Downloadable Forms" },
      { id: "tracking", label: "Document Tracking" },
    ],
    deficiencies: {
      eyebrow: "Academic Standing",
      heading: "Subjects Requiring Re-enrollment",
      blurb:
        "Below is the consolidated list of subjects you have failed, dropped, or were not credited for. Coordinate with your faculty secretary before applying for SWIS to confirm class availability.",
      emptyMessage: "No deficiencies found on your record. Please proceed with regular enrollment.",
    },
    forms: {
      eyebrow: "Downloads",
      heading: "Forms Required for SWIS Enrollment",
      blurb:
        "Download, accomplish, and re-upload the following forms during your SWIS application. PDFs will open in a new tab.",
    },
    tracking: {
      eyebrow: "Submissions",
      heading: "Document Tracking and Status",
      blurb:
        "Real-time status of every document you have submitted to the office. Expand a row to view administrator remarks.",
    },
  },
  shift: {
    title: "Shift Enrollment",
    subtitle: "Apply to shift to another college within the University",
    tabs: [
      { id: "select", label: "Select College" },
      { id: "forms", label: "Downloadable Forms" },
      { id: "tracking", label: "Document Tracking" },
    ],
    select: {
      eyebrow: "College Directory",
      heading: "Choose the College You Wish to Shift Into",
      blurb:
        "Filter by keyword to narrow the list. Click a tile to view its specific shifting requirements. Your selection persists locally until your application is submitted.",
      filterPlaceholder: "Filter colleges by name, code, or keyword...",
      selectedLabel: "Currently Selected",
      clearLabel: "Clear Selection",
      submitLabel: "Submit Shift Application",
      requirementsHeading: "Shifting Requirements",
      noResults: "No colleges match your filter.",
      submittedToast: "Shift application submitted. Your selection has been cleared.",
    },
    forms: {
      eyebrow: "Downloads",
      heading: "Forms Required for Shift Enrollment",
      blurb:
        "These forms are required when applying to shift between colleges. PDFs will open in a new tab.",
    },
    tracking: {
      eyebrow: "Submissions",
      heading: "Shift Application Status",
      blurb:
        "Track every document submitted in support of your shift application and any feedback from the receiving college.",
    },
  },
  placeholders: {
    avatar: "/student-avatar-placeholder.jpg",
    serviceCardImage: "/generic-service-icon.jpg",
    announcementImage: "/announcement-megaphone-illustration.jpg",
    documentIcon: "/pdf-document-icon.jpg",
  },
  footer: {
    copyright:
      "University Enrollment Services. Powered by UST-OICT Santo Tomas e-Service Providers. All rights reserved.",
    designedBy: "Design by Bootstrapious and UST-OICT STePS",
  },
} as const

export const swisDeficiencies: DeficiencyRecord[] = [
  {
    id: "DEF-001",
    code: "CSC 0103",
    title: "Data Structures and Algorithms",
    units: 3,
    term: "A.Y. 2024-2025, 1st Term",
    professor: "Dr. R. Cabanlit",
    grade: "5.00",
    reason: "Failed",
    nextOffering: "A.Y. 2025-2026, 1st Term",
  },
  {
    id: "DEF-002",
    code: "MATH 0024",
    title: "Discrete Mathematics",
    units: 3,
    term: "A.Y. 2024-2025, 1st Term",
    professor: "Prof. M. Santos",
    grade: "INC",
    reason: "Incomplete",
    nextOffering: "A.Y. 2025-2026, 1st Term",
  },
  {
    id: "DEF-003",
    code: "ENG 0013",
    title: "Purposive Communication",
    units: 3,
    term: "A.Y. 2023-2024, 2nd Term",
    professor: "Prof. L. Reyes",
    grade: "WP",
    reason: "Withdrawn",
    nextOffering: "A.Y. 2025-2026, 2nd Term",
  },
  {
    id: "DEF-004",
    code: "PHY 0021",
    title: "General Physics 1",
    units: 4,
    term: "A.Y. 2024-2025, 1st Term",
    professor: "Dr. A. Villanueva",
    grade: "5.00",
    reason: "Failed",
    nextOffering: "A.Y. 2025-2026, 1st Term",
  },
]

export const swisForms: DownloadableForm[] = [
  {
    id: "swis-policy",
    title: "SWIS Enrollment Data Privacy Notice",
    description: "Mandatory disclosure of how your personal data will be processed.",
    fileName: "swis-data-privacy-notice.pdf",
    href: "/forms/swis-data-privacy-notice.pdf",
  },
  {
    id: "swis-application",
    title: "SWIS Application Form",
    description: "Primary application form. Print, sign, and re-upload after completion.",
    fileName: "swis-application-form.pdf",
    href: "/forms/swis-application-form.pdf",
  },
  {
    id: "swis-petition",
    title: "Petition for Special Class",
    description: "Submit if the deficient subject has no regular class offering for the term.",
    fileName: "swis-petition-class.pdf",
    href: "/forms/swis-petition-class.pdf",
  },
  {
    id: "swis-overload",
    title: "Overload / Underload Request",
    description: "Required when SWIS units exceed your regular allowable load.",
    fileName: "swis-overload-request.pdf",
    href: "/forms/swis-overload-request.pdf",
  },
  {
    id: "swis-undertaking",
    title: "Undertaking Form",
    description: "Acknowledgement of academic policies governing SWIS subjects.",
    fileName: "swis-undertaking.pdf",
    href: "/forms/swis-undertaking.pdf",
  },
  {
    id: "swis-coordinator",
    title: "Faculty Coordinator Endorsement",
    description: "To be filled out and signed by your program coordinator.",
    fileName: "swis-faculty-endorsement.pdf",
    href: "/forms/swis-faculty-endorsement.pdf",
  },
]

export const swisTrackedDocuments: TrackedDocument[] = [
  {
    id: "DOC-1001",
    title: "SWIS Application Form",
    submittedAt: "29-JUL-2025 12:07 PM",
    status: "received",
    remarks: [
      {
        date: "30-JUL-2025 09:11 AM",
        author: "OICT Records",
        body: "Received and forwarded to the program chair for evaluation.",
      },
    ],
  },
  {
    id: "DOC-1002",
    title: "Petition for Special Class",
    submittedAt: "29-JUL-2025 12:07 PM",
    status: "pending",
    remarks: [
      {
        date: "01-AUG-2025 03:15 PM",
        author: "Program Chair",
        body: "Awaiting confirmation of section availability before signing.",
      },
    ],
  },
  {
    id: "DOC-1003",
    title: "Faculty Coordinator Endorsement",
    submittedAt: "29-JUL-2025 12:07 PM",
    status: "incomplete",
    remarks: [
      {
        date: "02-AUG-2025 10:42 AM",
        author: "OICT Records",
        body: "Signature on page 2 is missing. Please re-upload a complete copy.",
      },
    ],
  },
  {
    id: "DOC-1004",
    title: "Undertaking Form",
    submittedAt: "29-JUL-2025 12:07 PM",
    status: "received",
    remarks: [],
  },
]

export const shiftForms: DownloadableForm[] = [
  {
    id: "shift-data-privacy",
    title: "Shift Enrollment Data Privacy Notice",
    description: "Required acknowledgement before processing your shifting application.",
    fileName: "shift-data-privacy-notice.pdf",
    href: "/forms/shift-data-privacy-notice.pdf",
  },
  {
    id: "shift-application",
    title: "Shift Application Form",
    description: "Primary form indicating your current and target program.",
    fileName: "shift-application-form.pdf",
    href: "/forms/shift-application-form.pdf",
  },
  {
    id: "shift-recommendation",
    title: "Recommendation Letter Template",
    description: "Optional but encouraged for competitive programs.",
    fileName: "shift-recommendation-letter.pdf",
    href: "/forms/shift-recommendation-letter.pdf",
  },
  {
    id: "shift-clearance",
    title: "College Clearance Form",
    description: "Issued by your current college upon settling all dues and accountabilities.",
    fileName: "shift-clearance-form.pdf",
    href: "/forms/shift-clearance-form.pdf",
  },
  {
    id: "shift-essay",
    title: "Letter of Intent Template",
    description: "Outline your motivation, goals, and academic readiness for the new program.",
    fileName: "shift-letter-of-intent.pdf",
    href: "/forms/shift-letter-of-intent.pdf",
  },
]

export const shiftTrackedDocuments: TrackedDocument[] = [
  {
    id: "STD-2001",
    title: "Shift Application Form",
    submittedAt: "12-FEB-2026 09:34 AM",
    status: "received",
    remarks: [
      {
        date: "13-FEB-2026 11:00 AM",
        author: "Receiving College",
        body: "Application logged. Awaiting interview schedule.",
      },
    ],
  },
  {
    id: "STD-2002",
    title: "Letter of Intent",
    submittedAt: "12-FEB-2026 09:34 AM",
    status: "pending",
    remarks: [],
  },
  {
    id: "STD-2003",
    title: "College Clearance Form",
    submittedAt: "12-FEB-2026 09:34 AM",
    status: "incomplete",
    remarks: [
      {
        date: "14-FEB-2026 02:18 PM",
        author: "Office of the Registrar",
        body: "Library clearance signature is missing. Please secure and re-upload.",
      },
    ],
  },
]

export const colleges: CollegeOption[] = [
  {
    id: "cics",
    code: "CICS",
    name: "College of Information and Computing Sciences",
    keywords: ["computer", "information", "technology", "data", "stem", "computing"],
    description:
      "Programs in Computer Science, Information Technology, and Information Systems with industry-driven specializations.",
    requirements: [
      "Cumulative weighted average of at least 2.50 from all previous terms",
      "Letter of intent addressed to the CICS Dean",
      "Recommendation from your current program chair",
      "Clearance from current college and library",
      "Interview with the Department Chair of the receiving program",
    ],
  },
  {
    id: "ccs",
    code: "CCS",
    name: "College of Commerce and Business Administration",
    keywords: ["business", "commerce", "accounting", "finance", "management", "marketing"],
    description:
      "Business administration majors covering Accounting, Finance, Management, Marketing, and Entrepreneurship.",
    requirements: [
      "Cumulative weighted average of at least 2.25",
      "Completion of basic Mathematics requirements",
      "Recommendation letter from current adviser",
      "Personal interview with the Assistant Dean for Academics",
    ],
  },
  {
    id: "engr",
    code: "ENGR",
    name: "College of Engineering",
    keywords: ["engineering", "civil", "mechanical", "electrical", "chemical", "stem"],
    description:
      "Programs in Civil, Mechanical, Electrical, Chemical, Industrial, and Computer Engineering.",
    requirements: [
      "Cumulative weighted average of at least 2.50 with no failing grade",
      "Pass the Engineering Shifting Examination",
      "Recommendation from current program chair",
      "Completion of pre-calculus and physics prerequisites",
    ],
  },
  {
    id: "arch",
    code: "ARCH",
    name: "College of Architecture",
    keywords: ["architecture", "design", "drafting", "spatial", "creative"],
    description:
      "Five-year program in Architecture with strong emphasis on design studios and heritage conservation.",
    requirements: [
      "Submission of a portfolio of 5 freehand sketches",
      "Interview with the Architecture Admissions Panel",
      "Cumulative weighted average of at least 2.50",
      "Letter of intent and personal statement",
    ],
  },
  {
    id: "fine-arts",
    code: "CFAD",
    name: "College of Fine Arts and Design",
    keywords: ["arts", "design", "advertising", "interior", "industrial", "creative"],
    description:
      "Programs in Advertising Arts, Painting, Interior Design, Industrial Design, and Visual Communication.",
    requirements: [
      "Portfolio review with the CFAD Admissions Committee",
      "On-site studio examination",
      "Letter of intent",
      "Cumulative weighted average of at least 2.25",
    ],
  },
  {
    id: "education",
    code: "EDUC",
    name: "College of Education",
    keywords: ["education", "teaching", "elementary", "secondary", "humanities"],
    description:
      "Teacher-preparation programs with majors spanning early childhood through secondary education.",
    requirements: [
      "Cumulative weighted average of at least 2.50",
      "Pass the Teacher Education Aptitude Test",
      "Recommendation letter from current program chair",
      "Personal interview with the Education Admissions Committee",
    ],
  },
  {
    id: "nursing",
    code: "CON",
    name: "College of Nursing",
    keywords: ["nursing", "health", "medical", "clinical", "care"],
    description:
      "Bachelor of Science in Nursing with strong clinical exposure across affiliated tertiary hospitals.",
    requirements: [
      "Cumulative weighted average of at least 2.00",
      "Pass the Nursing Aptitude Test",
      "Medical and physical fitness certification",
      "Interview with the Nursing Admissions Panel",
    ],
  },
  {
    id: "law",
    code: "LAW",
    name: "Faculty of Civil Law",
    keywords: ["law", "legal", "civil", "graduate", "juris"],
    description:
      "Juris Doctor program preparing students for the Philippine Bar with a strong civil law tradition.",
    requirements: [
      "Bachelor's degree from any recognized program",
      "Pass the Law Aptitude and Admissions Test",
      "Personal statement and letter of intent",
      "Interview with the Law Admissions Committee",
    ],
  },
  {
    id: "music",
    code: "MUS",
    name: "Conservatory of Music",
    keywords: ["music", "composition", "performance", "voice", "instrument"],
    description:
      "Programs in Performance, Composition, Music Education, and Music Technology.",
    requirements: [
      "Audition with the Conservatory faculty",
      "Theory and ear-training entrance exam",
      "Cumulative weighted average of at least 2.25",
      "Letter of intent",
    ],
  },
  {
    id: "tourism",
    code: "CTHM",
    name: "College of Tourism and Hospitality Management",
    keywords: ["tourism", "hospitality", "hotel", "travel", "events"],
    description:
      "Programs in Tourism Management, Hospitality Management, and Travel Operations.",
    requirements: [
      "Cumulative weighted average of at least 2.25",
      "Personality and grooming interview",
      "Letter of intent",
      "Recommendation from your current program chair",
    ],
  },
]

export const portalCategories: { id: PortalCategory; label: string; href: string }[] = [
  { id: "swis", label: "SWIS Enrollment", href: "/swis-enrollment" },
  { id: "shift", label: "Shift Enrollment", href: "/shift-enrollment" },
]
