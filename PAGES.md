# Portal Pages Reference

Complete list of all available pages in the UST-OSA Enrollment Portal.

## Public Pages

### Landing Page
- **URL**: `/`
- **Description**: Main landing page with service cards and announcements
- **Features**: 
  - Welcome banner with user info
  - Announcement section
  - Service cards (Scholarship, Formation)
  - Quick navigation to all services

### Announcements
- **URL**: `/announcements`
- **Description**: Latest updates and announcements from OSA
- **Features**:
  - Categorized announcements
  - Important notices highlighted
  - Date-sorted content
  - Read more functionality

## Scholarship Application

### Apply New Scholarship
- **URL**: `/scholarship/apply`
- **Description**: Scholarship application form
- **Features**:
  - Application form interface
  - Important notes section
  - Document requirements reminder
  - Sidebar navigation

### View Scholarship
- **URL**: `/scholarship/view`
- **Description**: View current scholarship status and information
- **Features**:
  - Scholarship details display
  - Status badge
  - Contact information
  - Approval notifications
  - Sidebar navigation

### Downloadable Forms (Scholarship)
- **URL**: `/scholarship/forms`
- **Description**: Download scholarship-related forms
- **Features**:
  - List of downloadable PDF forms
  - Form descriptions
  - One-click download
  - Sidebar navigation

## Formation Program

### Formation Programs
- **URL**: `/formation`
- **Description**: View and register for formation programs
- **Features**:
  - Program listings
  - Schedule and venue information
  - Slot availability
  - Registration buttons
  - Program requirements
  - Sidebar navigation

## SWIS Enrollment

### SWIS Enrollment Portal
- **URL**: `/enrollment/swis`
- **Query Parameters**: `?tab=deficiencies|forms|tracking`
- **Description**: SWIS enrollment management
- **Features**:
  - Tab navigation (Deficiencies, Forms, Tracking)
  - Deep-linking support
  - Sidebar navigation between SWIS and Shift

#### Tab: Deficiencies
- **URL**: `/enrollment/swis?tab=deficiencies`
- **Description**: View failed subjects and deficiencies
- **Features**:
  - Table of deficiencies
  - Subject details
  - Status tracking
  - Action required column

#### Tab: Downloadable Forms
- **URL**: `/enrollment/swis?tab=forms`
- **Description**: Download SWIS enrollment forms
- **Features**:
  - PDF form downloads
  - Form descriptions
  - Force download functionality

#### Tab: Document Tracking
- **URL**: `/enrollment/swis?tab=tracking`
- **Description**: Track submitted documents
- **Features**:
  - Document status badges
  - Expandable admin remarks
  - Submission dates
  - Status updates

## Shift Enrollment

### Shift Enrollment Portal
- **URL**: `/enrollment/shift`
- **Query Parameters**: `?tab=college-selection|requirements|tracking`
- **Description**: Shift enrollment management
- **Features**:
  - Tab navigation (College Selection, Requirements, Tracking)
  - Deep-linking support
  - Sidebar navigation between SWIS and Shift

#### Tab: College Selection
- **URL**: `/enrollment/shift?tab=college-selection`
- **Description**: Select target college for shifting
- **Features**:
  - Filterable college cards
  - Keyword search
  - College descriptions
  - Selection persistence (localStorage)
  - Selected college indicator

#### Tab: Requirements
- **URL**: `/enrollment/shift?tab=requirements`
- **Description**: View requirements for selected college
- **Features**:
  - College-specific requirements
  - Required field indicators
  - Requirement descriptions
  - Empty state when no college selected

#### Tab: Document Tracking
- **URL**: `/enrollment/shift?tab=tracking`
- **Description**: Track shift enrollment documents
- **Features**:
  - Same as SWIS document tracking
  - Document status badges
  - Admin remarks

## Navigation Structure

```
Landing Page (/)
├── Announcements (/announcements)
├── Scholarship Application
│   ├── Apply (/scholarship/apply)
│   ├── View (/scholarship/view)
│   └── Forms (/scholarship/forms)
├── Formation Program (/formation)
├── SWIS Enrollment (/enrollment/swis)
│   ├── Deficiencies (?tab=deficiencies)
│   ├── Forms (?tab=forms)
│   └── Tracking (?tab=tracking)
└── Shift Enrollment (/enrollment/shift)
    ├── College Selection (?tab=college-selection)
    ├── Requirements (?tab=requirements)
    └── Tracking (?tab=tracking)
```

## Deep-Linking Examples

### Direct Tab Access
```
http://localhost:3000/enrollment/swis?tab=deficiencies
http://localhost:3000/enrollment/swis?tab=forms
http://localhost:3000/enrollment/swis?tab=tracking
http://localhost:3000/enrollment/shift?tab=college-selection
http://localhost:3000/enrollment/shift?tab=requirements
http://localhost:3000/enrollment/shift?tab=tracking
```

### Bookmarkable URLs
All URLs with query parameters can be bookmarked and shared. The portal will automatically navigate to the correct tab.

## Sidebar Navigation

### Scholarship Pages
- Apply New Scholarship
- View Scholarship
- Downloadable Forms

### Formation Page
- Formation Program (single section)

### SWIS/Shift Pages
- SWIS Enrollment
- Shift Enrollment

## Page Features Summary

| Page | Sidebar | Tabs | Deep-Link | LocalStorage |
|------|---------|------|-----------|--------------|
| Landing | No | No | No | No |
| Announcements | No | No | No | No |
| Scholarship Apply | Yes | No | No | No |
| Scholarship View | Yes | No | No | No |
| Scholarship Forms | Yes | No | No | No |
| Formation | Yes | No | No | No |
| SWIS Enrollment | Yes | Yes | Yes | No |
| Shift Enrollment | Yes | Yes | Yes | Yes |

## Common Elements

All pages include:
- **Header**: Site branding and navigation
- **Footer**: University information and credits

Pages with user context include:
- **UserWelcome**: User greeting and date/time

Pages with sidebar navigation include:
- **Sidebar**: User profile and section navigation

## Testing Checklist

For each page, verify:
- [ ] Page loads without errors
- [ ] Header displays correctly
- [ ] Footer displays correctly
- [ ] Sidebar navigation works (if applicable)
- [ ] Tab navigation works (if applicable)
- [ ] Deep-linking works (if applicable)
- [ ] All links are functional
- [ ] Responsive on mobile
- [ ] Keyboard navigation works
- [ ] No console errors

## Future Pages

Potential pages for future development:
- User Profile Settings
- Document Upload Interface
- Payment/Billing Information
- Academic Records
- Grade Viewing
- Schedule Management
- Admin Dashboard
- Reports and Analytics

## Page Status

| Page | Status | Notes |
|------|--------|-------|
| Landing | ✅ Complete | Fully functional |
| Announcements | ✅ Complete | Mock data |
| Scholarship Apply | ✅ Complete | Form placeholder |
| Scholarship View | ✅ Complete | Mock data |
| Scholarship Forms | ✅ Complete | Uses config |
| Formation | ✅ Complete | Mock data |
| SWIS Enrollment | ✅ Complete | All tabs functional |
| Shift Enrollment | ✅ Complete | All tabs functional |

## Notes

- All pages use mock data and are ready for backend integration
- PDF forms need to be added to `public/forms/` directory
- User authentication not yet implemented
- All pages are statically generated for optimal performance
