# AGENTS.md - Project Guide for AI Coding Agents

This file contains essential information about the Mr.Children Official Website project for AI coding agents.

---

## Project Overview

This is a **Next.js 16** static website for "Mr.Children - Official Website", a Japanese band fan site. It displays music albums, videos, downloads, and other media content in a responsive grid layout with filterable categories.

- **Project Name**: nextjs-website
- **Version**: 0.1.0
- **Type**: Static website (SSG)
- **Output Directory**: `dist/`

---

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Next.js | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Build Tool | Next.js CLI | - |
| Linter | ESLint | 9.x |

### Key Features
- **Next.js App Router** - Uses the modern app directory structure
- **Static Site Generation (SSG)** - Configured for static export
- **Client-side Interactivity** - React hooks for UI state management
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Dark Theme** - Consistent dark UI (#1a1a1a background)

---

## Build and Development Commands

```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production (static export to dist/)
npm run build

# Start production server (after build)
npm run start

# Run ESLint
npm run lint
```

### Build Configuration
The project is configured for static export in `next.config.ts`:
- Output mode: `export`
- Dist directory: `dist`
- Images: Unoptimized (required for static export)

---

## Project Structure

```
.
├── src/
│   └── app/
│       ├── components/          # React components
│       │   ├── Navbar.tsx       # Navigation bar with mobile menu
│       │   ├── FilterTabs.tsx   # Content filter tabs (All, Single, Album, etc.)
│       │   └── ContentGrid.tsx  # Grid display of albums/videos/downloads
│       ├── layout.tsx           # Root layout with Inter font and metadata
│       ├── page.tsx             # Home page composing all components
│       ├── globals.css          # Global styles and Tailwind directives
│       └── favicon.ico          # Site favicon
├── public/                      # Static assets (SVGs)
├── dist/                        # Build output (static files)
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── eslint.config.mjs            # ESLint flat configuration
├── postcss.config.mjs           # PostCSS with Tailwind v4
└── package.json                 # Dependencies and scripts
```

---

## Code Organization

### Path Aliases
- `@/*` maps to `./src/*`
- Example: `import Navbar from "@/app/components/Navbar"`

### Component Pattern
All components in `src/app/components/` are **Client Components**:
- Use `"use client"` directive at the top
- Use React hooks (`useState`) for state management
- Handle user interactions (clicks, filter selection, mobile menu toggle)

### Page Structure (page.tsx)
```tsx
<main className="min-h-screen bg-[#1a1a1a]">
  <Navbar />      // Top navigation with logo, links, social icons
  <FilterTabs />  // Filterable category tabs
  <ContentGrid /> // Responsive grid of content items
</main>
```

### Data Management
- Content data is stored as static arrays within components
- Currently using sample data with Unsplash images
- FilterTabs maintains active filter state (UI only, filtering logic not implemented)

---

## Styling Guidelines

### Tailwind CSS v4
- Uses `@tailwindcss/postcss` plugin (v4 syntax)
- Configuration is CSS-based, not in `tailwind.config.js`

### Color Scheme
- **Background**: `#1a1a1a` (dark gray)
- **Foreground**: `#ffffff` (white text)
- **Secondary Text**: `text-gray-300`, `text-gray-400`
- **Accent**: White borders, hover states with opacity changes

### Responsive Breakpoints
- Mobile-first approach
- Grid columns: 2 (default) → 3 (sm) → 4 (md) → 5 (lg)
- Navbar: Hamburger menu on mobile, full nav on desktop (md+)

---

## Testing Strategy

Currently, **no testing framework is configured**. To add tests:

1. Install testing libraries:
   ```bash
   npm install -D jest @testing-library/react @testing-library/jest-dom
   ```

2. Add test script to `package.json`:
   ```json
   "test": "jest"
   ```

---

## Linting and Code Style

### ESLint Configuration
- Uses ESLint 9 with flat config (`eslint.config.mjs`)
- Extends Next.js presets:
  - `eslint-config-next/core-web-vitals`
  - `eslint-config-next/typescript`
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

### Run Linter
```bash
npm run lint
```

### Code Conventions
- **TypeScript**: Strict mode enabled
- **Components**: Default exports, PascalCase filenames
- **Imports**: Use path aliases for src/ files
- **CSS**: Tailwind utility classes, avoid custom CSS when possible

---

## Deployment

### Static Export
The project builds to static HTML/CSS/JS in the `dist/` directory:

```bash
npm run build
```

### Deployment Options
1. **Vercel** (recommended for Next.js)
2. **Any static host** (GitHub Pages, Netlify, AWS S3, etc.)
   - Deploy the contents of `dist/` directory

### Image Handling
- Images are **unoptimized** (`images.unoptimized: true`)
- Required for static export
- Currently uses external Unsplash URLs

---

## Security Considerations

1. **External Images**: Currently loads from Unsplash CDN. For production, consider:
   - Self-hosting images
   - Adding Content Security Policy headers

2. **Static Export**: No server-side code runs, reducing attack surface

3. **Dependencies**: Keep dependencies updated:
   ```bash
   npm audit
   npm update
   ```

---

## Known Limitations

1. **Filter Functionality**: FilterTabs has state but doesn't actually filter ContentGrid items
2. **Sample Data**: ContentGrid uses hardcoded sample data with Unsplash images
3. **No Backend**: All data is static; no API integration
4. **No Tests**: Testing framework not configured
5. **Navigation Links**: All href attributes are `#` (placeholders)

---

## Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

---

*Last updated: 2026-02-27*
