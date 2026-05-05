# Testing Guide

This document outlines testing procedures and best practices for the UST-OSA Enrollment Portal.

## Testing Strategy

### 1. Manual Testing
- User interface testing
- Cross-browser compatibility
- Accessibility testing
- Mobile responsiveness

### 2. Automated Testing (Future)
- Unit tests
- Integration tests
- End-to-end tests

### 3. Performance Testing
- Lighthouse audits
- Bundle size analysis
- Load time measurements

## Manual Testing Checklist

### Landing Page

- [ ] Page loads without errors
- [ ] Header displays correctly
- [ ] User welcome section shows current date/time
- [ ] Announcement banner is visible
- [ ] Service cards display with correct icons
- [ ] All links navigate to correct pages
- [ ] Footer displays with correct information
- [ ] Responsive on mobile devices

### SWIS Enrollment

#### Deficiencies Tab
- [ ] Tab navigation works
- [ ] Deep-link URL works: `/enrollment/swis?tab=deficiencies`
- [ ] Table displays deficiency data
- [ ] Empty state shows when no deficiencies
- [ ] Status badges display correct colors
- [ ] All columns are readable
- [ ] Responsive table on mobile

#### Downloadable Forms Tab
- [ ] Tab navigation works
- [ ] Deep-link URL works: `/enrollment/swis?tab=forms`
- [ ] All forms are listed
- [ ] Download buttons work
- [ ] PDFs open in new tab
- [ ] Download attribute forces download
- [ ] Empty state shows when no forms

#### Document Tracking Tab
- [ ] Tab navigation works
- [ ] Deep-link URL works: `/enrollment/swis?tab=tracking`
- [ ] Documents table displays
- [ ] Status badges show correct status
- [ ] "View Remarks" button expands remarks
- [ ] Remarks collapse when clicked again
- [ ] Multiple remarks display correctly
- [ ] Empty state shows when no documents

### Shift Enrollment

#### College Selection Tab
- [ ] Tab navigation works
- [ ] Deep-link URL works: `/enrollment/shift?tab=college-selection`
- [ ] All colleges display in grid
- [ ] Search bar filters colleges
- [ ] Search works for college name
- [ ] Search works for college code
- [ ] Search works for keywords
- [ ] Clear search button works
- [ ] Results count updates correctly
- [ ] College card selection works
- [ ] Selected state persists in localStorage
- [ ] Selected college info banner shows
- [ ] Empty state shows when no results

#### Requirements Tab
- [ ] Tab navigation works
- [ ] Deep-link URL works: `/enrollment/shift?tab=requirements`
- [ ] Shows message when no college selected
- [ ] Displays requirements for selected college
- [ ] College info banner shows
- [ ] Required fields marked with asterisk
- [ ] Empty state shows when no requirements

#### Document Tracking Tab
- [ ] Tab navigation works
- [ ] Deep-link URL works: `/enrollment/shift?tab=tracking`
- [ ] Same functionality as SWIS tracking

### Cross-Browser Testing

Test in the following browsers:

#### Desktop
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

#### Mobile
- [ ] Chrome Mobile (Android)
- [ ] Safari (iOS)
- [ ] Samsung Internet

### Responsive Design Testing

Test at the following breakpoints:

- [ ] Mobile: 375px (iPhone SE)
- [ ] Mobile: 414px (iPhone Pro Max)
- [ ] Tablet: 768px (iPad)
- [ ] Tablet: 1024px (iPad Pro)
- [ ] Desktop: 1280px
- [ ] Desktop: 1920px (Full HD)
- [ ] Desktop: 2560px (2K)

### Accessibility Testing

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Shift+Tab navigates backward
- [ ] Enter/Space activates buttons
- [ ] Focus indicators are visible
- [ ] No keyboard traps
- [ ] Logical tab order

#### Screen Reader Testing

**NVDA (Windows)**
- [ ] All headings announced
- [ ] Links have meaningful text
- [ ] Buttons have clear labels
- [ ] Form inputs have labels
- [ ] Status changes announced
- [ ] Tables navigable

**VoiceOver (macOS)**
- [ ] Rotor navigation works
- [ ] Landmarks identified
- [ ] Dynamic content announced
- [ ] Images have alt text

#### Color Contrast
- [ ] Body text meets AA standard
- [ ] Link text meets AA standard
- [ ] Button text meets AA standard
- [ ] Status badges meet AA standard

### Performance Testing

#### Lighthouse Audit

Run Lighthouse for each page:

```bash
npm run build
npm run start
npx lighthouse http://localhost:3000 --view
npx lighthouse http://localhost:3000/enrollment/swis --view
npx lighthouse http://localhost:3000/enrollment/shift --view
```

Target scores:
- [ ] Performance: ≥ 90
- [ ] Accessibility: ≥ 95
- [ ] Best Practices: ≥ 95
- [ ] SEO: ≥ 90

#### Core Web Vitals

- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

#### Bundle Size

```bash
npm run build
```

Check output for:
- [ ] Total bundle size < 500KB
- [ ] First Load JS < 200KB
- [ ] No duplicate dependencies

### Functionality Testing

#### Deep-Linking
- [ ] Direct URL access works for all tabs
- [ ] Browser back button works
- [ ] Browser forward button works
- [ ] Bookmarked URLs work
- [ ] Shared URLs work

#### LocalStorage
- [ ] College selection persists
- [ ] Selection survives page refresh
- [ ] Selection clears on deselection
- [ ] Works in private/incognito mode

#### Form Downloads
- [ ] PDF opens in new tab
- [ ] Download attribute works
- [ ] Multiple downloads work
- [ ] Works in all browsers

### Error Handling

- [ ] 404 page displays for invalid routes
- [ ] Error boundaries catch component errors
- [ ] Network errors handled gracefully
- [ ] Empty states display correctly

## Testing Tools

### Browser DevTools

**Chrome DevTools**
- Elements: Inspect HTML/CSS
- Console: Check for errors
- Network: Monitor requests
- Lighthouse: Performance audit
- Accessibility: Check contrast

**Firefox DevTools**
- Similar to Chrome
- Accessibility Inspector

### Extensions

**Chrome/Edge**
- axe DevTools
- WAVE Evaluation Tool
- Lighthouse
- React Developer Tools

**Firefox**
- axe DevTools
- WAVE Evaluation Tool

### Online Tools

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)

## Test Data

### Mock Deficiencies

```typescript
const mockDeficiencies = [
  {
    id: '1',
    subjectCode: 'MATH101',
    subjectName: 'College Algebra',
    term: '1st Term',
    year: 'A.Y. 2024-2025',
    grade: '5.0',
    status: 'pending',
    actionRequired: 'Re-enrollment required'
  }
];
```

### Mock Documents

```typescript
const mockDocuments = [
  {
    id: '1',
    name: 'Academic Grades',
    dateSubmitted: '29-JUL-2024 12:07 PM',
    status: 'incomplete',
    remarks: [
      {
        id: '1',
        date: '04-SEP-2024 03:17 PM',
        message: 'Please upload required documents.',
        author: 'Admin'
      }
    ]
  }
];
```

## Bug Reporting Template

When reporting bugs, include:

```markdown
### Bug Description
[Clear description of the issue]

### Steps to Reproduce
1. Go to [page]
2. Click on [element]
3. Observe [behavior]

### Expected Behavior
[What should happen]

### Actual Behavior
[What actually happens]

### Environment
- Browser: [Chrome 120]
- OS: [Windows 11]
- Screen Size: [1920x1080]
- Device: [Desktop/Mobile]

### Screenshots
[Attach screenshots if applicable]

### Console Errors
[Copy any console errors]

### Severity
- [ ] Critical (blocks core functionality)
- [ ] High (major feature broken)
- [ ] Medium (minor feature issue)
- [ ] Low (cosmetic issue)
```

## Regression Testing

After any code changes, test:

1. **Core Functionality**
   - Navigation between pages
   - Tab switching
   - Deep-linking
   - LocalStorage persistence

2. **Critical Paths**
   - Landing → SWIS → All tabs
   - Landing → Shift → College selection → Requirements
   - Document tracking in both categories

3. **Edge Cases**
   - Empty states
   - Long text content
   - Many items in lists
   - Slow network conditions

## Performance Regression

Monitor these metrics after changes:

```bash
# Before changes
npm run build
# Note bundle sizes

# After changes
npm run build
# Compare bundle sizes

# Should not increase by more than 10%
```

## Continuous Testing

### Pre-Commit
- Run linter
- Check TypeScript errors
- Verify build succeeds

### Pre-Deployment
- Full manual testing checklist
- Lighthouse audit
- Accessibility scan
- Cross-browser testing

### Post-Deployment
- Smoke test all pages
- Verify deep-links work
- Check analytics (if enabled)
- Monitor error logs

## Future Testing Enhancements

### Unit Testing (Jest + React Testing Library)

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

Example test:

```typescript
import { render, screen } from '@testing-library/react';
import StatusBadge from '@/components/StatusBadge';

describe('StatusBadge', () => {
  it('renders pending status correctly', () => {
    render(<StatusBadge status="pending" />);
    expect(screen.getByText('Pending')).toBeInTheDocument();
  });
});
```

### E2E Testing (Playwright)

```bash
npm install --save-dev @playwright/test
```

Example test:

```typescript
import { test, expect } from '@playwright/test';

test('navigate to SWIS deficiencies', async ({ page }) => {
  await page.goto('/enrollment/swis?tab=deficiencies');
  await expect(page.locator('h2')).toContainText('Failed Subjects');
});
```

### Visual Regression Testing (Percy/Chromatic)

Capture screenshots and compare across deployments.

## Testing Schedule

### Daily (Development)
- Manual testing of changed features
- Console error checks
- Responsive design verification

### Weekly
- Full manual testing checklist
- Cross-browser testing
- Accessibility scan

### Monthly
- Performance audit
- Dependency updates
- Security audit

### Quarterly
- Comprehensive accessibility audit
- Full regression testing
- User acceptance testing

## Resources

- [Next.js Testing Documentation](https://nextjs.org/docs/testing)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Web.dev Testing Guide](https://web.dev/testing/)
- [WCAG Testing Techniques](https://www.w3.org/WAI/test-evaluate/)
