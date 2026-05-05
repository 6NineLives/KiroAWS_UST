# Accessibility Compliance Guide

This document outlines the accessibility features and compliance measures implemented in the UST-OSA Enrollment Portal.

## WCAG 2.1 AA Compliance

The portal is designed to meet Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards.

## Implemented Features

### 1. Semantic HTML

- Proper heading hierarchy (h1 → h2 → h3)
- Semantic elements (`<nav>`, `<main>`, `<aside>`, `<header>`, `<footer>`)
- Meaningful link text
- Form labels associated with inputs

### 2. Keyboard Navigation

All interactive elements are keyboard accessible:

- **Tab**: Navigate forward through interactive elements
- **Shift + Tab**: Navigate backward
- **Enter/Space**: Activate buttons and links
- **Arrow Keys**: Navigate within tab groups (where applicable)
- **Escape**: Close modals and expandable sections

#### Keyboard Navigation Testing Checklist

- [ ] All buttons are reachable via Tab
- [ ] All links are reachable via Tab
- [ ] All form inputs are reachable via Tab
- [ ] Tab order follows logical reading order
- [ ] Focus indicators are clearly visible
- [ ] No keyboard traps exist

### 3. Focus Management

- Visible focus indicators with high contrast (2px solid yellow outline)
- Focus outline offset for better visibility
- Logical tab order following visual layout
- Focus restoration after modal/dialog close

```css
/* Focus styles in globals.css */
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid #FDB913;
  outline-offset: 2px;
}
```

### 4. ARIA Labels and Roles

#### Navigation

```tsx
<nav role="navigation" aria-label="Main navigation">
  {/* Navigation items */}
</nav>
```

#### Tabs

```tsx
<button
  role="tab"
  aria-selected={isActive}
  aria-controls="panel-id"
>
  Tab Label
</button>
```

#### Status Indicators

```tsx
<span role="status" aria-label="Status: Pending">
  Pending
</span>
```

#### Expandable Sections

```tsx
<button
  aria-expanded={isExpanded}
  aria-controls="content-id"
>
  Toggle
</button>
```

### 5. Color Contrast

All text meets WCAG AA contrast requirements:

| Element | Foreground | Background | Ratio | Standard |
|---------|-----------|------------|-------|----------|
| Body text | #111827 | #FFFFFF | 16.1:1 | AAA |
| Links | #1E40AF | #FFFFFF | 8.6:1 | AAA |
| Buttons (primary) | #000000 | #FDB913 | 10.4:1 | AAA |
| Status badges | Various | Various | ≥4.5:1 | AA |

#### Testing Color Contrast

Use tools like:
- Chrome DevTools Lighthouse
- WebAIM Contrast Checker
- axe DevTools browser extension

### 6. Alternative Text

All non-decorative images and icons include:
- Descriptive `aria-label` attributes
- `aria-hidden="true"` for decorative elements
- Meaningful alt text for informative images

```tsx
{/* Decorative icon */}
<svg aria-hidden="true">
  {/* SVG content */}
</svg>

{/* Informative icon */}
<svg aria-label="Download document">
  {/* SVG content */}
</svg>
```

### 7. Form Accessibility

- Labels associated with inputs via `htmlFor`/`id`
- Required fields indicated with `required` attribute
- Error messages linked via `aria-describedby`
- Placeholder text not used as sole label

```tsx
<label htmlFor="search-input">
  Search colleges
</label>
<input
  id="search-input"
  type="text"
  aria-label="Search colleges by name or keyword"
  placeholder="Search..."
/>
```

### 8. Screen Reader Support

#### Announcements

Dynamic content changes are announced:

```tsx
<div role="status" aria-live="polite">
  {statusMessage}
</div>
```

#### Skip Links

Skip navigation links for screen reader users:

```tsx
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

### 9. Responsive Design

- Mobile-friendly layouts
- Touch targets ≥44x44 pixels
- Readable text without horizontal scrolling
- Zoom support up to 200%

### 10. Motion and Animation

- Respects `prefers-reduced-motion` media query
- No auto-playing animations
- Smooth scroll can be disabled

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Testing Procedures

### Automated Testing

1. **Lighthouse Audit**
   ```bash
   npm run build
   npm run start
   npx lighthouse http://localhost:3000 --view
   ```

2. **axe DevTools**
   - Install browser extension
   - Run scan on each page
   - Address all violations

3. **WAVE Tool**
   - Visit https://wave.webaim.org/
   - Enter page URL
   - Review errors and warnings

### Manual Testing

#### Keyboard Navigation Test

1. Disconnect mouse
2. Use only keyboard to:
   - Navigate all pages
   - Activate all buttons
   - Fill all forms
   - Open/close expandable sections
3. Verify focus is always visible
4. Ensure no keyboard traps

#### Screen Reader Test

**NVDA (Windows - Free)**
1. Download from https://www.nvaccess.org/
2. Navigate portal with NVDA active
3. Verify all content is announced
4. Check heading navigation (H key)
5. Test landmark navigation (D key)

**JAWS (Windows - Commercial)**
1. Use JAWS with Internet Explorer/Edge
2. Test all interactive elements
3. Verify form labels are read
4. Check table navigation

**VoiceOver (macOS - Built-in)**
1. Enable: Cmd + F5
2. Navigate with VO + Arrow keys
3. Test rotor navigation (VO + U)
4. Verify all content is accessible

#### Color Contrast Test

1. Use browser DevTools
2. Inspect text elements
3. Check contrast ratio in Accessibility panel
4. Verify all ratios meet AA standards

#### Zoom Test

1. Zoom to 200% (Ctrl/Cmd + +)
2. Verify all content is readable
3. Check for horizontal scrolling
4. Ensure no content is cut off

### Browser Testing

Test in:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Assistive Technology Testing

Test with:
- Screen readers (NVDA, JAWS, VoiceOver)
- Screen magnifiers
- Voice control software
- Keyboard-only navigation

## Known Limitations

### Full Validation Requirements

While this portal implements WCAG 2.1 AA standards, full accessibility validation requires:

1. **Manual Testing**: Automated tools catch only ~30-40% of issues
2. **User Testing**: Testing with actual users who rely on assistive technologies
3. **Expert Review**: Accessibility audit by certified professionals
4. **Ongoing Monitoring**: Regular testing as content and features change

### Areas Requiring Manual Verification

- Complex interactions (drag-and-drop, if added)
- Dynamic content updates
- Error message clarity
- Form validation feedback
- PDF document accessibility (external forms)

## Accessibility Checklist

Use this checklist for new features:

- [ ] Semantic HTML structure
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] ARIA labels where needed
- [ ] Color contrast meets AA
- [ ] Alt text for images
- [ ] Form labels present
- [ ] Error messages clear
- [ ] Screen reader tested
- [ ] Mobile responsive
- [ ] Touch targets adequate
- [ ] No keyboard traps
- [ ] Heading hierarchy correct
- [ ] Skip links present
- [ ] Status updates announced

## Resources

### Guidelines
- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Testing Tools
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Screen Readers
- [NVDA](https://www.nvaccess.org/) (Free, Windows)
- [JAWS](https://www.freedomscientific.com/products/software/jaws/) (Commercial, Windows)
- VoiceOver (Built-in, macOS/iOS)
- TalkBack (Built-in, Android)

## Reporting Issues

If you discover accessibility issues:

1. Document the issue with:
   - Page/component affected
   - Steps to reproduce
   - Expected vs actual behavior
   - Assistive technology used (if applicable)
   - Browser and version

2. Prioritize based on:
   - **Critical**: Blocks access to core functionality
   - **High**: Significantly impairs usability
   - **Medium**: Causes inconvenience
   - **Low**: Minor enhancement

3. Submit through appropriate channels

## Continuous Improvement

Accessibility is an ongoing commitment:

- Regular audits (quarterly recommended)
- User feedback integration
- Stay updated with WCAG guidelines
- Train team on accessibility best practices
- Include accessibility in code reviews
