# Deployment and Performance Guide

This guide covers deployment procedures and performance optimization for the UST-OSA Enrollment Portal.

## Performance Targets

- **First Contentful Paint (FCP)**: < 1.5s on 3G
- **Largest Contentful Paint (LCP)**: < 2.5s
- **Time to Interactive (TTI)**: < 3.5s
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Lighthouse Score**: ≥ 90

## Pre-Deployment Checklist

### 1. Code Quality

- [ ] All TypeScript errors resolved
- [ ] ESLint warnings addressed
- [ ] No console.log statements in production code
- [ ] Environment variables configured
- [ ] Configuration values updated

### 2. Testing

- [ ] All pages load without errors
- [ ] Deep-linking works for all tabs
- [ ] LocalStorage persistence verified
- [ ] Form downloads work correctly
- [ ] Mobile responsive on all screen sizes
- [ ] Keyboard navigation tested
- [ ] Screen reader compatibility verified

### 3. Performance

- [ ] Lighthouse audit passed (score ≥ 90)
- [ ] Bundle size analyzed
- [ ] Images optimized
- [ ] Unused dependencies removed
- [ ] Code splitting verified

### 4. Security

- [ ] No sensitive data in client code
- [ ] Environment variables properly configured
- [ ] HTTPS enforced (in production)
- [ ] Security headers configured
- [ ] Dependencies updated (no critical vulnerabilities)

## Build Process

### Development Build

```bash
npm run dev
```

Runs on http://localhost:3000 with:
- Hot module replacement
- Source maps
- Development error messages

### Production Build

```bash
npm run build
```

Creates optimized production build:
- Minified JavaScript
- CSS optimization
- Tree shaking
- Code splitting
- Static page generation

### Production Preview

```bash
npm run build
npm run start
```

Test production build locally before deployment.

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

#### Setup

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Production deployment:
```bash
vercel --prod
```

#### Configuration

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["sin1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### Option 2: Netlify

#### Setup

1. Install Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Login:
```bash
netlify login
```

3. Initialize:
```bash
netlify init
```

4. Deploy:
```bash
netlify deploy --prod
```

#### Configuration

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Option 3: Self-Hosted (Node.js)

#### Requirements

- Node.js 18.x or higher
- PM2 or similar process manager
- Nginx or Apache (reverse proxy)

#### Setup

1. Build the application:
```bash
npm run build
```

2. Install PM2:
```bash
npm install -g pm2
```

3. Create ecosystem file `ecosystem.config.js`:
```javascript
module.exports = {
  apps: [{
    name: 'ust-osa-portal',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
};
```

4. Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name portal.ust-osa.edu.ph;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 4: Docker

#### Dockerfile

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
version: '3.8'

services:
  portal:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

#### Build and Run

```bash
docker build -t ust-osa-portal .
docker run -p 3000:3000 ust-osa-portal
```

## Environment Variables

### Production Environment

Create `.env.production`:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.ust-osa.edu.ph

# Analytics (if needed)
NEXT_PUBLIC_GA_ID=UA-XXXXXXXXX-X

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
```

### Environment Variable Management

**Vercel:**
- Set via Vercel dashboard
- Or use `vercel env add`

**Netlify:**
- Set via Netlify dashboard
- Or in `netlify.toml`

**Self-Hosted:**
- Use `.env.production` file
- Or system environment variables

## Performance Optimization

### 1. Bundle Analysis

Analyze bundle size:

```bash
npm install --save-dev @next/bundle-analyzer
```

Update `next.config.js`:

```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // Next.js config
});
```

Run analysis:

```bash
ANALYZE=true npm run build
```

### 2. Image Optimization

When adding images, use Next.js Image component:

```tsx
import Image from 'next/image';

<Image
  src="/images/logo.png"
  alt="UST Logo"
  width={200}
  height={100}
  priority // For above-the-fold images
/>
```

### 3. Font Optimization

Fonts are already optimized using `next/font`:

```tsx
import { Geist } from 'next/font/google';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
});
```

### 4. Code Splitting

Next.js automatically code-splits by route. For additional splitting:

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable SSR if not needed
});
```

### 5. Caching Strategy

Configure caching headers in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

## Monitoring

### 1. Performance Monitoring

**Vercel Analytics:**
```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

**Google Analytics:**
```tsx
// app/layout.tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
  strategy="afterInteractive"
/>
```

### 2. Error Tracking

**Sentry Integration:**
```bash
npm install @sentry/nextjs
```

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

### 3. Uptime Monitoring

Use services like:
- UptimeRobot
- Pingdom
- StatusCake

## Continuous Integration/Deployment

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## Rollback Procedures

### Vercel

```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

### PM2 (Self-Hosted)

```bash
# Save current state
pm2 save

# Rollback to previous version
git checkout [previous-commit]
npm install
npm run build
pm2 restart all
```

## Troubleshooting

### Build Failures

1. Clear cache:
```bash
rm -rf .next
npm run build
```

2. Check Node version:
```bash
node --version  # Should be 18.x or higher
```

3. Verify dependencies:
```bash
npm ci  # Clean install
```

### Performance Issues

1. Run Lighthouse audit
2. Check bundle size with analyzer
3. Review Network tab in DevTools
4. Verify caching headers
5. Check for unnecessary re-renders

### Memory Issues

Increase Node memory limit:

```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## Security Considerations

### Headers

Configure security headers in `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  }
};
```

### Dependency Audits

Regular security audits:

```bash
npm audit
npm audit fix
```

## Backup and Recovery

### Database Backups

If using a database (future):
- Automated daily backups
- Point-in-time recovery
- Offsite backup storage

### Code Backups

- Git repository (primary)
- Mirror repository (backup)
- Tagged releases for versions

## Support and Maintenance

### Regular Tasks

- **Weekly**: Check error logs
- **Monthly**: Security updates, performance review
- **Quarterly**: Full accessibility audit, dependency updates
- **Annually**: Infrastructure review, disaster recovery test

### Update Procedures

1. Test updates in development
2. Run full test suite
3. Deploy to staging
4. Verify functionality
5. Deploy to production
6. Monitor for issues

## Contact

For deployment support:
- Technical Team: UST-OICT
- Emergency Contact: [Contact Information]
