# CUTLINE — Architecture & Feature Specification (`FEATURES.md`)

CUTLINE was engineered to solve the most prevalent flaws found in standard digital template marketplaces: excessive framework bloat, brittle build tools, unmanaged third-party dependencies, and convoluted codebases that break when clients attempt basic modifications.

---

## 1. Architectural Highlights

- **Pure Vanilla Stack:** Built exclusively with semantic HTML5, modular CSS3, and standard ECMAScript. Zero node_modules, zero Webpack/Vite build steps, and zero recurring subscription requirements.
- **Centralized Data Hydration:** All business text, opening hours, team profiles, pricing cards, and color tokens are defined once in `config.js` and hydrated smoothly into the DOM upon load.
- **Progressive Fallback Markup:** If a search engine crawler or a user with disabled JavaScript loads the page, `index.html` contains semantic static fallback markup ensuring zero SEO degradation and instant first contentful paint.
- **Responsive Fluid Layouts:** Crafted using CSS Grid and Flexbox with responsive breakpoints at `1080px`, `860px`, and `600px`, tested across modern mobile smartphones, tablets, and 4K desktop screens.

---

## 2. Interactive Feature Matrix

| Feature | Description | Implementation Details |
| :--- | :--- | :--- |
| **Sticky Editorial Header** | Subtle glass-morphism blur and automatic background deepening upon scrolling | Pure CSS `backdrop-filter` with scroll event toggle |
| **Live Open/Closed Status** | Real-time calculation showing if the shop is currently open and when it opens next | JavaScript Date object calculation against client local time |
| **Service Menu Filtering** | Category tab navigation (Haircuts, Shaves, Rituals, Treatments) | Clean DOM filtering with instant re-render |
| **Team Profiles** | Master barber profiles with chairs, specialties, schedules, and individual booking | Dynamic rendering with automated button bindings |
| **Portfolio Lightbox** | Filterable image gallery with modal preview, keyboard navigation, and captions | Accessible modal supporting Escape, Next, and Prev controls |
| **FAQ Accordion** | Interactive collapsible accordion for policies, parking, and products | Fully accessible with `aria-expanded` and keyboard support |
| **Dual Booking Routing** | Routes either to external SaaS (Square, Fresha) or built-in modal | Conditional URL protocol detection in `app.js` |
| **On-Site Booking Modal** | Complete appointment inquiry dialog with service & barber preselection | Native accessible modal with form validation & confirmation |
| **Live Brand Customizer** | Floating palette preview widget for shop owners to test brand colors | Dynamic CSS variable injection via `--color-primary-bronze` |

---

## 3. Accessibility & Usability (WCAG Compliant)

- **Semantic Landmark Roles:** Explicit `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` elements.
- **Visible Focus Rings:** Customized high-contrast focus outlines for keyboard navigation (`:focus-visible`).
- **Screen Reader Support:** Hidden descriptive labels (`.sr-only`), ARIA attributes (`aria-expanded`, `aria-label`, `aria-live`, `aria-controls`), and proper form label associations.
- **Color Contrast:** Deep obsidian backgrounds (`#0D0D0D`) paired with antique cream typography (`#F5F2EB`) achieve a contrast ratio exceeding 14:1, well above WCAG AAA standards.

---

## 4. Search Engine Optimization (SEO) & Schema.org

- **Meta Tags:** Complete Open Graph (`og:*`) and Twitter Card (`twitter:*`) markup for social sharing previews.
- **Schema.org LocalBusiness JSON-LD:** Structured data script embedded in `<head>` declaring the business as a `@type: BarberShop`, with address coordinates, opening hours specifications, telephone, and price range.
- **Clean Semantic Heading Hierarchy:** Single `<h1>` tag in the hero followed by logical `<h2>` section headers and `<h3>` card titles.
