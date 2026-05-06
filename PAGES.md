# Portal Pages Reference

Complete list of all available pages in the UST-OICT Online Services Portal.

## Public Pages

### Landing Page
- **URL**: `/`
- **Description**: Main landing page with service cards and announcements
- **Features**: 
  - Welcome banner with user info and current date/time
  - Announcement section
  - Service cards (SWIS Enrollment, Shift Enrollment)
  - Quick navigation to all services with hash-based routing
  - Responsive grid layout

## SWIS Enrollment

### SWIS Enrollment Portal
- **URL**: `/swis-enrollment`
- **Hash Parameters**: `#deficiencies`, `#forms`, `#tracking`
- **Description**: SWIS (Subject Without Independent Schedule) enrollment management
- **Features**:
  - Tab navigation with hash-based routing
  - Persistent sidebar navigation
  - Breadcrumb navigation
  - Deep-linking support

#### Tab: Deficiencies
- **URL**: `/swis-enrollment#deficiencies`
- **Description**: View failed subjects and deficiencies
- **Features**:
  - Summary statistics (Total Subjects, Total Units, Status)
  - Desktop table view with all subject details
  - Mobile card view for responsive design
  - Subject information: code, title, units, term, professor, grade, reason, next offering
  - Standard gray text styling (no conditional coloring)

#### Tab: Downloadable Forms
- **URL**: `/swis-enrollment#forms`
- **Description**: Download SWIS enrollment forms
- **Features**:
  - Table of downloadable PDF forms
  - Form descriptions
  - Neutral gray document icons
  - One-click download functionality
  - Format column showing file type

#### Tab: Document Tracking
- **URL**: `/swis-enrollment#tracking`
- **Description**: Track submitted documents and application status
- **Features**:
  - Attachments table with upload functionality
  - Columns: Document Requirements, Accepted File Type/s, Attach File, Date Submitted
  - File upload buttons for each document
  - Unified Remarks section (below attachments)
  - Unified Status section (below remarks)
  - Plain text status indicators (no emojis): SUBMITTED, FOR OSA REVIEW, APPROVED SCHOLARSHIP

## Shift Enrollment

### Shift Enrollment Portal
- **URL**: `/shift-enrollment`
- **Hash Parameters**: `#select`, `#forms`, `#tracking`
- **Description**: Shift enrollment management for changing colleges
- **Features**:
  - Tab navigation with hash-based routing
  - Persistent sidebar navigation
  - Breadcrumb navigation
  - Deep-linking support

#### Tab: Select College
- **URL**: `/shift-enrollment#select`
- **Description**: Browse and select target college for shifting
- **Features**:
  - Filterable college grid (search by name, code, keywords)
  - College cards with icons (from `/public/colleges/`)
  - College information: code, name, description
  - Click to navigate to college detail page
  - Responsive grid layout (1-3 columns)
  - No state persistence (removed "Currently Selected" banner)

### College Detail Page
- **URL**: `/shift-enrollment/college/[collegeId]`
- **Description**: View college details, requirements, and programs
- **Features**:
  - Back button to college selection
  - Breadcrumb navigation
  - College header with code, name, and description
  - **Shifting Requirements section** (top of page)
    - Numbered list of requirements
    - College-specific criteria
  - **Programs Offered section** (below requirements)
    - Grid of program cards
    - Program information: code, name, description
    - Click to open Preliminary Requirements popup

#### Preliminary Requirements Popup
- **Trigger**: Click on any program card
- **Description**: Submit application for specific program
- **Features**:
  - Modal dialog with program name and code
  - Attachments table (same format as Document Tracking)
  - Columns: Document Requirements, Accepted File Type/s, Attach File, Date Submitted
  - File upload functionality for each requirement
  - Cancel and Submit Application buttons
  - Success message dialog after submission

#### Success Message Dialog
- **Trigger**: After submitting application
- **Description**: Confirmation of successful submission
- **Features**:
  - Green checkmark icon
  - Success message with program name
  - Email notification mention
  - Close button

#### Tab: Downloadable Forms
- **URL**: `/shift-enrollment#forms`
- **Description**: Download shift enrollment forms
- **Features**:
  - Same as SWIS forms tab
  - Shift-specific forms
  - Neutral gray document icons

#### Tab: Document Tracking
- **URL**: `/shift-enrollment#tracking`
- **Description**: Track shift enrollment documents
- **Features**:
  - Same structure as SWIS document tracking
  - Attachments table with upload functionality
  - Unified Remarks and Status sections
  - Plain text status indicators (no emojis)

## Navigation Structure

```
Landing Page (/)
├── SWIS Enrollment (/swis-enrollment)
│   ├── Deficiencies (#deficiencies)
│   ├── Downloadable Forms (#forms)
│   └── Document Tracking (#tracking)
└── Shift Enrollment (/shift-enrollment)
    ├── Select College (#select)
    │   └── College Detail (/shift-enrollment/college/[collegeId])
    │       └── Preliminary Requirements Popup (modal)
    │           └── Success Message Dialog (modal)
    ├── Downloadable Forms (#forms)
    └── Document Tracking (#tracking)
```

## Deep-Linking Examples

### Hash-Based Navigation
```
http://localhost:3000/swis-enrollment#deficiencies
http://localhost:3000/swis-enrollment#forms
http://localhost:3000/swis-enrollment#tracking
http://localhost:3000/shift-enrollment#select
http://localhost:3000/shift-enrollment#forms
http://localhost:3000/shift-enrollment#tracking
```

### Dynamic Routes
```
http://localhost:3000/shift-enrollment/college/cics
http://localhost:3000/shift-enrollment/college/engr
http://localhost:3000/shift-enrollment/college/nursing
```

### Bookmarkable URLs
All URLs with hash parameters can be bookmarked and shared. The portal will automatically navigate to the correct tab using the `useTabHash` hook.

## Sidebar Navigation

### SWIS/Shift Pages
- Dashboard (Home)
- SWIS Enrollment
  - Deficiencies
  - Downloadable Forms
  - Document Tracking
- Shift Enrollment
  - Select College
  - Downloadable Forms
  - Document Tracking

## Page Features Summary

| Page | Sidebar | Tabs | Hash-Link | File Upload | Modal |
|------|---------|------|-----------|-------------|-------|
| Landing | No | No | No | No | No |
| SWIS Enrollment | Yes | Yes | Yes | Yes | No |
| Shift Enrollment | Yes | Yes | Yes | Yes | No |
| College Detail | Yes | No | No | No | Yes |

## Common Elements

All pages include:
- **Header**: Site branding (UST-OICT), logout button
- **Footer**: Empty (content removed as per requirements)

Pages with sidebar navigation include:
- **Sidebar**: User profile card, navigation menu, college branding

Pages with enrollment context include:
- **Breadcrumb**: Navigation path
- **Section Header**: Page title and description
- **Tabs Navigation**: Tab switcher with active state

## Data Structure

### College Icons
- **Location**: `public/colleges/`
- **Formats**: `.jpg`, `.png`
- **Files**:
  - cics.jpg, ccs.jpg, engr.jpg, arch.jpg, cfad.jpg
  - law.jpg, tourism.jpg
  - educ.png, music.png, nursing.png

### College Data
Each college includes:
- Basic info: id, code, name, description, keywords
- Icon path
- Shifting requirements (array of strings)
- Programs (array of Program objects)

### Program Data
Each program includes:
- Basic info: id, code, name, description
- Preliminary requirements (array of strings)

## Technical Implementation

### Routing
- **Hash-based routing**: Uses `useTabHash` hook for tab navigation
- **Dynamic routes**: Next.js App Router with `[collegeId]` parameter
- **Client-side navigation**: Next.js Link component and useRouter

### State Management
- **Tab state**: Synced with URL hash
- **File uploads**: Local component state
- **Modal state**: Local component state (no global state)

### Styling
- **Design system**: Tailwind CSS with custom color tokens
- **Brand colors**: 
  - brand-gold: Yellow accent color
  - brand-dark: Dark header/sidebar background
  - brand-blue: Link and active state color
- **Status colors**: 
  - status-received: Green for approved/received
  - status-pending: Yellow for pending review
  - status-incomplete: Red for incomplete/rejected

## Testing Checklist

For each page, verify:
- [ ] Page loads without errors
- [ ] Header displays correctly (no Home button)
- [ ] Footer is empty (no text content)
- [ ] Sidebar navigation works
- [ ] Tab navigation works with hash routing
- [ ] Hash changes update active tab
- [ ] Back/forward browser buttons work
- [ ] Deep-linking works from landing page
- [ ] College icons display correctly
- [ ] File upload buttons work
- [ ] Modal dialogs open and close
- [ ] Success message appears after submission
- [ ] No emoji rendering in status indicators
- [ ] Responsive on mobile
- [ ] Keyboard navigation works
- [ ] No console errors

## Recent Updates

### UI/UX Changes
- ✅ Removed Home button from header
- ✅ Removed footer text content
- ✅ Updated landing page icon colors to match brand-gold
- ✅ Removed conditional coloring from deficiencies (all gray text)
- ✅ Changed document icons from red to neutral gray
- ✅ Removed emojis from all status indicators

### Shift Enrollment Redesign
- ✅ College selection now navigates to detail page (no state persistence)
- ✅ Removed "Currently Selected" banner
- ✅ Added college detail page with requirements at top
- ✅ Added programs list below requirements
- ✅ Preliminary requirements popup matches document tracking layout
- ✅ Added success message dialog after submission

### Document Tracking Redesign
- ✅ New table schema: Document Requirements, Accepted File Type/s, Attach File, Date Submitted
- ✅ Unified Remarks section (below all documents)
- ✅ Unified Status section (below remarks)
- ✅ Removed per-document expand/collapse
- ✅ Plain text status indicators only

## Future Enhancements

Potential features for future development:
- Backend API integration for real data
- User authentication and authorization
- Real file upload to server
- Email notifications
- Application status tracking
- Admin dashboard for reviewing applications
- PDF generation for submitted applications
- Payment integration
- Academic records integration

## Page Status

| Page | Status | Notes |
|------|--------|-------|
| Landing | ✅ Complete | Hash-based routing to tabs |
| SWIS Deficiencies | ✅ Complete | Standard gray styling |
| SWIS Forms | ✅ Complete | Neutral icons |
| SWIS Tracking | ✅ Complete | Unified remarks/status |
| Shift Selection | ✅ Complete | Navigation-based |
| College Detail | ✅ Complete | Requirements + programs |
| Preliminary Req | ✅ Complete | Upload + submit |
| Shift Forms | ✅ Complete | Neutral icons |
| Shift Tracking | ✅ Complete | Unified remarks/status |

## Notes

- All pages use mock data and are ready for backend integration
- PDF forms need to be added to `public/forms/` directory
- College icons are in `public/colleges/` directory
- User authentication not yet implemented
- File uploads are client-side only (not sent to server)
- All pages use Next.js App Router with client components
- Hash-based routing provides better UX for tab navigation
- Status indicators use plain text only (accessibility improvement)
