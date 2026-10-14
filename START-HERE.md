# CUTLINE — Luxury Barbershop Website Template
### Quickstart Guide (`START-HERE.md`)

Welcome and congratulations on acquiring **CUTLINE** — an editorial-grade, commercial website template designed specifically for luxury barbershops, modern grooming ateliers, and master shear artisans.

---

## ⚡ The 3-Minute Quickstart

You do **not** need to install Node.js, run terminal commands, or learn coding. CUTLINE is 100% static and ready to launch.

### Step 1: Open Your Website
Double-click `index.html` in your file browser. CUTLINE opens immediately in Google Chrome, Safari, Edge, or Firefox.

### Step 2: Customize Your Details in `config.js`
Open `config.js` with any text editor (VS Code, Notepad, TextEdit, Sublime):
1. **Change your Shop Name, Phone & Address** (Lines 20–35).
2. **Add your Booking URL** (Line 42) — paste your link from Square Appointments, Fresha, Calendly, Acuity, Booksy, or Vagaro.
3. **Update your Prices & Services** (Lines 80–180).
4. **Update your Team Profiles & Hours** (Lines 190–260).
5. **Save `config.js`** and refresh `index.html` in your browser. All updates take effect immediately!

### Step 3: Deploy Free to the Web
When you are ready for clients to see your website, drag and drop the folder into [Netlify Drop](https://app.netlify.com/drop) or [Cloudflare Pages](https://pages.cloudflare.com). Your site will be live on a secure HTTPS domain in under 60 seconds!

---

## 📁 Package Directory Structure

```text
cutline-barber-template/
├── index.html                  # Semantic, accessible HTML5 website
├── config.js                   # Master configuration file (edit this!)
├── firebase-config.js          # Optional Firebase Cloud database config
├── firestore.rules             # Production security rules for Cloud Firestore
├── css/
│   └── style.css               # Luxury editorial stylesheet & tokens
├── js/
│   ├── app.js                  # Vanilla JS engine (dynamic hydration, modals, filters)
│   └── firebase-service.js     # Zero-dependency cloud database synchronization
├── assets/
│   ├── images/                 # Curated photography, SVG crest, and signature
│   └── icons/                  # 16 hand-crafted SVG vector icons
├── previews/                   # High-resolution screenshots of the template
├── documentation/
│   ├── START-HERE.html         # Interactive visual quickstart guide
│   ├── FIREBASE-SETUP.md       # 5-minute Cloud Firestore database setup guide
│   ├── CUSTOMIZATION.md        # Complete guide to editing every section
│   ├── DEPLOYMENT.md           # Free hosting on Netlify, Vercel, GitHub, cPanel
│   ├── FEATURES.md             # Architecture, SEO, and accessibility breakdown
│   ├── TROUBLESHOOTING.md      # Common questions and instant solutions
│   └── COMMERCIAL-LICENSE.md   # Commercial end-user license agreement
└── START-HERE.md               # This quickstart file
```

---

## 📖 In-Depth Guides in `/documentation`

For detailed step-by-step assistance, open any of the guides inside the `documentation/` folder:

- **[Interactive Visual Dashboard](documentation/START-HERE.html)** — Open in your browser for a visual interactive walkthrough.
- **[Firebase Cloud Backend Guide](documentation/FIREBASE-SETUP.md)** — Connect Google Cloud Firestore for cloud booking and contact storage.
- **[Customization Guide](documentation/CUSTOMIZATION.md)** — Explains how to update services, team members, photo galleries, brand colors, and third-party booking integrations.
- **[Deployment Guide](documentation/DEPLOYMENT.md)** — Free hosting options with custom domain setup instructions.
- **[Troubleshooting Guide](documentation/TROUBLESHOOTING.md)** — Quick fixes for common issues.
- **[License Agreement](documentation/COMMERCIAL-LICENSE.md)** — Permitted commercial and client uses.

---

## 💎 Key Highlights

- **Zero Dependencies:** No frameworks to maintain, no breaking npm packages, no security vulnerabilities.
- **Instant Booking Integration:** Seamlessly routes to your preferred booking provider (Square, Fresha, Calendly, Acuity) or captures requests via the built-in on-site booking modal.
- **Automated Open/Closed Status:** Automatically informs visitors whether the shop is currently open based on client local time.
- **Built-in Live Customizer:** Test color schemes and shop names directly in the live browser preview.
- **SEO & Schema.org Ready:** Pre-configured with JSON-LD LocalBusiness structured data for optimal Google Maps and local search ranking.
