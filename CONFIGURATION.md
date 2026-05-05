# Configuration Guide

This document provides detailed information about configuring the UST-OSA Enrollment Portal.

## Configuration File Location

All configuration is centralized in: `config/portal.config.ts`

## Configuration Structure

### 1. Site Information

```typescript
site: {
  name: string;              // Portal name displayed in header
  university: string;        // University name for footer
  office: string;           // Office information for footer
  poweredBy: string;        // Technical credit line
  designCredit: string;     // Design credit line
}
```

### 2. Navigation

```typescript
navigation: {
  home: string;    // Home link label
  logout: string;  // Logout button label
}
```

### 3. Landing Page

```typescript
landing: {
  welcomePrefix: string;           // Welcome message prefix
  datePrefix: string;              // Date display prefix
  announcementTitle: string;       // Announcement banner title
  announcementSubtitle: string;    // Announcement banner subtitle
  announcementCTA: string;         // Call-to-action button text
  accessPrompt: string;            // Section heading
  
  cards: Array<{
    id: string;                    // Unique identifier
    title: string;                 // Card title
    subtitle: string;              // Card description
    icon: string;                  // Icon path (placeholder)
    links: Array<{
      label: string;               // Link text
      href: string;                // Link destination
    }>;
  }>;
}
```

### 4. Enrollment Categories

```typescript
enrollment: {
  categories: Array<{
    id: string;                    // Category identifier
    name: string;                  // Display name
    tabs: Array<{
      id: string;                  // Tab identifier
      label: string;               // Tab label
      route: string;               // URL route segment
    }>;
  }>;
}
```

### 5. SWIS Configuration

#### Deficiencies

```typescript
swis: {
  deficiencies: {
    title: string;                 // Section title
    subtitle: string;              // Section description
    emptyMessage: string;          // Message when no deficiencies
    columns: string[];             // Table column headers
  }
}
```

#### Downloadable Forms

```typescript
swis: {
  forms: {
    title: string;                 // Section title
    subtitle: string;              // Section description
    documents: Array<{
      id: string;                  // Unique identifier
      name: string;                // Document name
      description: string;         // Document description
      fileUrl: string;             // PDF file path
    }>;
  }
}
```

**Adding a New Form:**

```typescript
// In config/portal.config.ts
documents: [
  // ... existing forms
  {
    id: "new-form-id",
    name: "New Form Name",
    description: "Description of the form",
    fileUrl: "/forms/new-form.pdf"  // Place PDF in public/forms/
  }
]
```

#### Document Tracking

```typescript
swis: {
  tracking: {
    title: string;                 // Section title
    subtitle: string;              // Section description
    statusTypes: {
      pending: { label: string; color: string; };
      received: { label: string; color: string; };
      incomplete: { label: string; color: string; };
      approved: { label: string; color: string; };
    }
  }
}
```

### 6. Shift Enrollment Configuration

#### College Selection

```typescript
shift: {
  collegeSelection: {
    title: string;                 // Section title
    subtitle: string;              // Section description
    searchPlaceholder: string;     // Search input placeholder
    colleges: Array<{
      id: string;                  // Unique identifier
      name: string;                // College full name
      code: string;                // College code/abbreviation
      description: string;         // College description
      keywords: string[];          // Search keywords
    }>;
  }
}
```

**Adding a New College:**

```typescript
// In config/portal.config.ts
colleges: [
  // ... existing colleges
  {
    id: "new-college",
    name: "College of New Studies",
    code: "CNS",
    description: "Programs in new and emerging fields",
    keywords: ["new", "studies", "emerging", "innovative"]
  }
]
```

**Search Functionality:**
The search filters across:
- College name
- College code
- Description
- All keywords in the array

#### Requirements

```typescript
shift: {
  requirements: {
    title: string;                 // Section title
    subtitle: string;              // Section description
    defaultMessage: string;        // Message when no college selected
  }
}
```

### 7. User Configuration

```typescript
user: {
  placeholderName: string;         // Default user name
  placeholderId: string;           // Default student ID
  placeholderAvatar: string;       // Avatar image path
}
```

### 8. Color Scheme

```typescript
colors: {
  primary: string;                 // Primary brand color (UST Yellow)
  secondary: string;               // Secondary color (Black)
  accent: string;                  // Accent color (Blue for links)
  success: string;                 // Success state color
  warning: string;                 // Warning state color
  error: string;                   // Error state color
  gray: {
    50: string;                    // Lightest gray
    100: string;
    // ... through 900
    900: string;                   // Darkest gray
  }
}
```

## Type Safety

All configuration is fully typed. TypeScript will provide:
- Autocomplete suggestions
- Type checking
- Error detection

```typescript
// Export type for use in components
export type PortalConfig = typeof portalConfig;
```

## Using Configuration in Components

```typescript
import { portalConfig } from '@/config/portal.config';

// Access configuration values
const title = portalConfig.swis.deficiencies.title;
const colleges = portalConfig.shift.collegeSelection.colleges;
```

## Best Practices

1. **Never hardcode text**: Always use configuration values
2. **Update types**: When adding new fields, ensure TypeScript types are updated
3. **Maintain consistency**: Follow existing naming conventions
4. **Document changes**: Update this guide when adding new configuration options
5. **Test thoroughly**: Verify changes across all affected pages

## Common Configuration Tasks

### Updating Site Branding

```typescript
site: {
  name: "New Portal Name",
  university: "New University Name",
  // ... other fields
}
```

### Adding a Tab to a Category

```typescript
enrollment: {
  categories: [
    {
      id: "swis",
      name: "SWIS Enrollment",
      tabs: [
        // ... existing tabs
        {
          id: "new-tab",
          label: "New Tab",
          route: "new-tab"
        }
      ]
    }
  ]
}
```

### Modifying Status Colors

```typescript
swis: {
  tracking: {
    statusTypes: {
      pending: { 
        label: "Under Review",  // Changed label
        color: "blue"           // Changed color
      },
      // ... other statuses
    }
  }
}
```

## Environment-Specific Configuration

For environment-specific values (API endpoints, etc.), use environment variables:

```typescript
// .env.local
NEXT_PUBLIC_API_URL=https://api.example.com

// In code
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
```

## Validation

The configuration is validated at build time through TypeScript. Invalid configurations will cause compilation errors.

## Migration Guide

When updating from an older version:

1. Compare your `portal.config.ts` with the new structure
2. Add any new required fields
3. Update deprecated field names
4. Test all pages after migration
5. Verify deep-linking still works

## Support

For configuration assistance, refer to:
- TypeScript type definitions in `types/index.ts`
- Component implementations in `components/`
- Example usage in page files
