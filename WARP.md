# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack (opens http://localhost:3000)
- `npm run build` - Build production bundle
- `npm start` - Start production server
- `npm run lint` - Run ESLint with Next.js TypeScript rules

### Package Management
- `npm install` - Install dependencies
- `npm install <package>` - Add new dependency
- `npm install -D <package>` - Add new dev dependency

## Architecture

### Framework & Stack
- **Next.js 15** with App Router (React 19)
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** for styling with inline theme configuration
- **Turbopack** for fast development builds
- **ESLint** with Next.js Core Web Vitals and TypeScript rules

### Project Structure
```
src/
  app/                    # Next.js App Router
    layout.tsx           # Root layout with font setup
    page.tsx            # Home page component
    globals.css         # Global styles with CSS variables
    favicon.ico
public/                  # Static assets (SVG icons)
```

### Key Configurations
- **Path aliases**: `@/*` maps to `./src/*`
- **Fonts**: Geist Sans and Geist Mono via `next/font/google`
- **Styling**: Custom CSS properties with dark mode support using `prefers-color-scheme`
- **Tailwind**: Uses v4 with inline theme configuration in globals.css

### Development Notes
- Uses `--turbopack` flag for faster development builds
- TypeScript target is ES2017 with bundler module resolution
- ESLint extends Next.js core web vitals and TypeScript configurations
- Dark mode is handled automatically via CSS media queries

This appears to be a fresh Next.js project setup as an Amie (calendar app) clone, currently showing the default Next.js landing page.
