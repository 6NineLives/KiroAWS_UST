# UST-OSA Enrollment Portal

A high-fidelity, modular enrollment portal built with Next.js, TypeScript, and Tailwind CSS. This portal provides dual-category enrollment management for SWIS (Student Welfare and Intervention Services) and Shift Enrollment programs.

## Features

### Core Functionality

- **Dual-Category Portal System**
  - SWIS Enrollment (Deficiencies, Downloadable Forms, Document Tracking)
  - Shift Enrollment (College Selection, Requirements, Document Tracking)

- **Deep-Linking Support**
  - URL-based tab navigation using query parameters
  - Bookmarkable views for specific sections
  - Browser back/forward navigation support

- **State Management**
  - LocalStorage persistence for college selection
  - Client-side state management with React hooks
  - Form state preservation across sessions

- **Document Management**
  - Real-time status tracking (Pending, Received, Incomplete, Approved)
  - Expandable admin remarks with timestamps
  - PDF download functionality with force-download

- **Interactive College Selection**
  - Keyword-based filtering across college names, codes, and descriptions
  - Selectable card interface with visual feedback
  - Persistent selection storage

### Technical Standards

- **Accessibility (WCAG 2.1 AA)**
  - Semantic HTML structure
  - ARIA labels and roles
  - Keyboard navigation support
  - Focus management
  - Color contrast compliance
  - Screen reader optimization

- **Performance Optimization**
  - Server-side rendering with Next.js App Router
  - Code splitting and lazy loading
  - Optimized bundle size
  - Fast First Contentful Paint (FCP < 1.5s target)

- **Configuration-Driven**
  - Centralized configuration in `config/portal.config.ts`
  - Easy content updates without code changes
  - Type-safe configuration with TypeScript

## Project Structure

```
enrollment-portal/
├── app/                          # Next.js App Router pages
│   ├── enrollment/
│   │   ├── swis/                # SWIS enrollment page
│   │   └── shift/               # Shift enrollment page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── AnnouncementBanner.tsx
│   ├── CollegeCard.tsx
│   ├── CollegeSelection.tsx
│   ├── DeficienciesList.tsx
│   ├── DocumentTable.tsx
│   ├── DownloadableFormsList.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── ServiceCard.tsx
│   ├── Sidebar.tsx
│   ├── StatusBadge.tsx
│   ├── TabNavigation.tsx
│   └── UserWelcome.tsx
├── config/                       # Configuration files
│   └── portal.config.ts         # Centralized portal configuration
├── hooks/                        # Custom React hooks
│   ├── useDeepLink.ts           # Deep-linking functionality
│   └── useLocalStorage.ts       # LocalStorage management
├── types/                        # TypeScript type definitions
│   └── index.ts
└── public/                       # Static assets
    ├── images/                   # Image placeholders
    └── forms/                    # PDF forms
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd enrollment-portal
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm run start
```

## Configuration

All portal content is managed through `config/portal.config.ts`. This includes:

- Site information and branding
- Navigation labels
- Landing page content
- Enrollment categories and tabs
- College listings
- Form definitions
- Status configurations
- Color scheme

### Example Configuration Update

```typescript
// config/portal.config.ts
export const portalConfig = {
  site: {
    name: "UST-OSA Online Services",
    // ... other settings
  },
  swis: {
    forms: {
      documents: [
        {
          id: "new-form",
          name: "New Form Name",
          description: "Form description",
          fileUrl: "/forms/new-form.pdf"
        }
      ]
    }
  }
};
```

## Deep-Linking

The portal supports deep-linking for direct access to specific tabs:

- SWIS Deficiencies: `/enrollment/swis?tab=deficiencies`
- SWIS Forms: `/enrollment/swis?tab=forms`
- SWIS Tracking: `/enrollment/swis?tab=tracking`
- Shift College Selection: `/enrollment/shift?tab=college-selection`
- Shift Requirements: `/enrollment/shift?tab=requirements`
- Shift Tracking: `/enrollment/shift?tab=tracking`

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Readers**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators with high contrast
- **Color Contrast**: WCAG AA compliant color combinations
- **Alternative Text**: Descriptive labels for all icons and images

### Testing Accessibility

```bash
# Run Lighthouse audit
npm run build
npx lighthouse http://localhost:3000 --view

# Manual testing checklist:
# - Tab through all interactive elements
# - Test with screen reader (NVDA, JAWS, VoiceOver)
# - Verify color contrast ratios
# - Test keyboard-only navigation
```

## Performance Optimization

- **Code Splitting**: Automatic route-based code splitting
- **Image Optimization**: Next.js Image component (when images are added)
- **CSS Optimization**: Tailwind CSS purging in production
- **Bundle Analysis**: Use `@next/bundle-analyzer` for optimization

### Performance Testing

```bash
# Lighthouse performance audit
npm run build
npm run start
npx lighthouse http://localhost:3000 --only-categories=performance --view
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code structure and naming conventions
2. Maintain TypeScript type safety
3. Ensure accessibility compliance
4. Test across different browsers
5. Update configuration instead of hardcoding values

## License

Copyright © 2021 University of Santo Tomas - Office for Student Affairs

## Support

For technical support or questions, contact UST-OICT.
