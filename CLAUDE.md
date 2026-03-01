# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Type-check (tsc -b) then bundle with Vite
npm run lint      # Run ESLint on all files
npm run preview   # Preview the production build locally
```

No test framework is configured.

## Stack

- **React 19** with TypeScript, strict mode
- **Vite** (bundler) with `@vitejs/plugin-react` (Babel-based Fast Refresh)
- **Tailwind CSS v3** with PostCSS/Autoprefixer
- **React Router DOM v7** for client-side routing
- **Framer Motion** for animations
- **Lenis** (`@studio-freight/lenis`) for smooth scrolling
- **Lucide React** for icons

## TypeScript Config

`tsconfig.app.json` enforces strict settings including `noUnusedLocals` and `noUnusedParameters` — unused variables will fail the build. `erasableSyntaxOnly` is enabled, meaning TypeScript-only constructs like `enum` and parameter properties are disallowed.

## ESLint

Config in `eslint.config.js` uses the flat config format. Covers `**/*.{ts,tsx}` files with `typescript-eslint` recommended rules plus React Hooks and React Refresh plugins.
