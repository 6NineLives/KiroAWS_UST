# Quick Start Guide

Get the UST-OSA Enrollment Portal up and running in minutes.

## Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm
- A code editor (VS Code recommended)

## Installation

### 1. Navigate to Project Directory

```bash
cd enrollment-portal
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including Next.js, React, TypeScript, and Tailwind CSS.

### 3. Start Development Server

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

## Project Structure Overview

```
enrollment-portal/
├── app/                    # Pages and routes
├── components/             # Reusable UI components
├── config/                 # Configuration files
├── hooks/                  # Custom React hooks
├── types/                  # TypeScript definitions
└── public/                 # Static assets
```

## Key Pages

- **Landing Page**: `http://localhost:3000`
- **SWIS Enrollment**: `http://localhost:3000/enrollment/swis`
- **Shift Enrollment**: `http://localhost:3000/enrollment/shift`

## Making Your First Change

### Update Site Name

1. Open `config/portal.config.ts`
2. Find the `site` section:

```typescript
site: {
  name: "UST-OSA Online Services",  // Change this
  // ...
}
```

3. Save the file
4. The page will automatically reload with your changes

### Add a New Form

1. Place your PDF in `public/forms/`
2. Open `config/portal.config.ts`
3. Add to `swis.forms.documents`:

```typescript
{
  id: "my-new-form",
  name: "My New Form",
  description: "Description of the form",
  fileUrl: "/forms/my-new-form.pdf"
}
```

### Add a New College

1. Open `config/portal.config.ts`
2. Add to `shift.collegeSelection.colleges`:

```typescript
{
  id: "new-college",
  name: "College of New Studies",
  code: "CNS",
  description: "Programs in new and emerging fields",
  keywords: ["new", "studies", "emerging"]
}
```

## Testing Your Changes

### Check in Browser

1. Navigate to the affected page
2. Verify your changes appear correctly
3. Test on mobile view (DevTools → Toggle device toolbar)

### Test Deep-Linking

Try these URLs:
- `http://localhost:3000/enrollment/swis?tab=deficiencies`
- `http://localhost:3000/enrollment/swis?tab=forms`
- `http://localhost:3000/enrollment/shift?tab=college-selection`

### Test Accessibility

1. Use keyboard only (Tab, Enter, Space)
2. Check focus indicators are visible
3. Verify all interactive elements are reachable

## Building for Production

### Create Production Build

```bash
npm run build
```

This creates an optimized production build in `.next/`

### Test Production Build Locally

```bash
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) to test the production build.

## Common Tasks

### Update Colors

Edit `config/portal.config.ts`:

```typescript
colors: {
  primary: "#FDB913",    // UST Yellow
  secondary: "#000000",  // Black
  accent: "#1E40AF",     // Blue
  // ...
}
```

### Update Navigation Labels

Edit `config/portal.config.ts`:

```typescript
navigation: {
  home: "Home",
  logout: "Logout"
}
```

### Add Mock Data

Edit the page files:
- SWIS: `app/enrollment/swis/page.tsx`
- Shift: `app/enrollment/shift/page.tsx`

Look for `mockDeficiencies`, `mockDocuments`, etc.

## Troubleshooting

### Port Already in Use

If port 3000 is busy:

```bash
# Use a different port
PORT=3001 npm run dev
```

### Build Errors

Clear cache and rebuild:

```bash
rm -rf .next
npm run build
```

### TypeScript Errors

Check your code editor for red underlines. TypeScript will show errors before you even run the app.

### Styling Issues

Tailwind CSS is configured automatically. If styles aren't applying:

1. Check class names are correct
2. Restart dev server
3. Clear browser cache

## Development Tips

### Hot Reload

Changes to files automatically reload the page. No need to restart the server.

### TypeScript Autocomplete

Your editor will provide autocomplete for:
- Component props
- Configuration values
- Type definitions

### Browser DevTools

- **Console**: Check for errors
- **Elements**: Inspect HTML/CSS
- **Network**: Monitor requests
- **Lighthouse**: Performance audit

### VS Code Extensions (Recommended)

- ESLint
- Tailwind CSS IntelliSense
- TypeScript and JavaScript Language Features

## Next Steps

### Learn More

- Read `README.md` for comprehensive overview
- Check `CONFIGURATION.md` for detailed config guide
- Review `ACCESSIBILITY.md` for accessibility features
- See `DEPLOYMENT.md` for production deployment

### Customize Further

1. Update user profile section
2. Add more colleges
3. Customize status badges
4. Add more forms
5. Modify color scheme

### Prepare for Production

1. Update environment variables
2. Add real PDF forms to `public/forms/`
3. Test all functionality
4. Run Lighthouse audit
5. Deploy to hosting platform

## Getting Help

### Documentation

- **README.md**: Project overview
- **CONFIGURATION.md**: Configuration details
- **ACCESSIBILITY.md**: Accessibility guide
- **DEPLOYMENT.md**: Deployment guide
- **TESTING.md**: Testing procedures

### Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Common Questions

**Q: How do I add authentication?**
A: See the "Future Enhancements" section in PROJECT_SUMMARY.md

**Q: How do I connect to a backend API?**
A: Replace mock data with API calls using fetch or axios

**Q: How do I deploy this?**
A: See DEPLOYMENT.md for detailed deployment instructions

**Q: Can I use this with a CMS?**
A: Yes, replace the config file with CMS data fetching

## Quick Reference

### Commands

```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Run production build
npm run lint     # Run ESLint
```

### Important Files

```
config/portal.config.ts     # Main configuration
app/page.tsx               # Landing page
app/enrollment/swis/page.tsx    # SWIS page
app/enrollment/shift/page.tsx   # Shift page
app/globals.css            # Global styles
```

### Key Concepts

- **Configuration-Driven**: All content in `portal.config.ts`
- **Deep-Linking**: URL-based navigation with query params
- **Type-Safe**: Full TypeScript coverage
- **Accessible**: WCAG 2.1 AA compliant
- **Modular**: Component-based architecture

## Success Checklist

- [ ] Development server running
- [ ] Landing page loads
- [ ] SWIS enrollment page works
- [ ] Shift enrollment page works
- [ ] Tab navigation works
- [ ] Deep-linking works
- [ ] College selection persists
- [ ] Forms download correctly
- [ ] Mobile responsive
- [ ] Keyboard navigation works

## You're Ready!

You now have a fully functional enrollment portal. Start customizing it to match your needs!

For detailed information on any topic, refer to the comprehensive documentation files in the project root.

Happy coding! 🚀
