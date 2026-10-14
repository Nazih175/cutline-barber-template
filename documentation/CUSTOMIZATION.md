# CUTLINE — Detailed Customization Guide (`CUSTOMIZATION.md`)

This manual details how to customize every section, text string, image, and color in the CUTLINE website template.

---

## 1. The Centralized Configuration System (`config.js`)

CUTLINE is powered by a central configuration file located at the root of the template: `config.js`. When you edit this file, your changes are immediately propagated across the header, hero, services menu, team profiles, hours table, contact cards, and footer.

### A. Business Identity & Contact Info
```javascript
business: {
  name: "YOUR BARBERSHOP",                     // Primary brand name displayed in header & footer
  subname: "Master Barbers & Grooming Atelier",// Subtitle shown under your logo
  tagline: "The Art of Timeless Grooming",     // Elevator pitch in footer
  heroHeadline: "Architectural Precision.",    // Main hero headline
  heroSubheadline: "Experience bespoke...",    // Hero description text
  establishedYear: "2018",                     // Year displayed on the about badge
  announcement: "Complimentary Espresso...",   // Top announcement banner text

  // Contact details
  phone: "+1 (555) 123-4567",                  // Formatted phone number
  phoneRaw: "+15551234567",                    // Clean numbers only for click-to-call links
  email: "hello@yourbarber.com",               // Contact email

  // Location & Directions
  street: "123 Main Street, Suite 100",
  cityStateZip: "Your City, State / Province ZIP",
  parkingNote: "Free customer parking in rear lot.",
  googleMapsUrl: "https://maps.google.com/?q=Your+Address",

  // Booking Destination
  bookingUrl: "#book-modal",                   // Paste Square/Fresha/Calendly link or keep #book-modal
  bookingButtonText: "Book Appointment",
  currency: "$",
  currencyCode: "CAD"
}
```

---

## 2. Setting Your Brand Colors (`config.js`)

You can alter the overall color aesthetic simply by modifying the `theme` object:

```javascript
theme: {
  primaryBronze: "#C5A059",    // Accent color (buttons, borders, highlights)
  bronzeLight: "#E5C788",      // Hover states & badges
  bronzeDark: "#8C682A",       // Gradients & dark borders
  charcoalDark: "#0D0D0D",     // Main dark background
  charcoalCard: "#141416",     // Surface color for cards
  creamWarm: "#F5F2EB",        // Primary text color
  creamMuted: "#B8B2A6"        // Secondary descriptive text
}
```

### Popular Preset Color Palettes:

1. **Classic Heritage Bronze (Default):**
   - `primaryBronze: "#C5A059"`
   - `charcoalDark: "#0D0D0D"`

2. **Imperial Silver & Slate:**
   - `primaryBronze: "#D1D5DB"`
   - `charcoalDark: "#0B0F17"`

3. **Royal Emerald & Gold:**
   - `primaryBronze: "#10B981"`
   - `charcoalDark: "#061510"`

4. **Midnight Crimson & Brass:**
   - `primaryBronze: "#E11D48"`
   - `charcoalDark: "#13080A"`

---

## 3. Customizing Services & Pricing

In `config.js`, scroll to `services: [ ... ]`. Each service has the following structure:

```javascript
{
  id: "srv-1",
  category: "haircuts",                      // "haircuts", "shaves", "packages", or "treatments"
  name: "The Executive Cut & Style",
  duration: "45 MIN",
  price: "$65",
  isPopular: true,                           // Adds the gold "Signature" pill badge
  description: "Detailed consultation, precision scissor work, and energizing wash."
}
```

- To add a new service: copy and paste a block, change the `id` to a unique name (e.g. `srv-11`), and set your price and description.
- To delete a service: delete the corresponding `{ ... }` block.

---

## 4. Customizing the Master Barbers / Team

In `config.js`, navigate to `team: [ ... ]`:

```javascript
{
  name: "Julien Vance",
  role: "Founder & Master Craftsman",
  experience: "14 Years Experience",
  chair: "Chair No. 1",
  bio: "Trained in London and Paris, specializing in scissor-over-comb cuts.",
  specialties: ["Architectural Scissor Cuts", "Classic Pompadours"],
  image: "assets/images/team-julien.jpg",     // Replace with your photo in assets/images/
  schedule: "Tuesday – Saturday",
  instagram: "@julien.cutline"
}
```

---

## 5. Replacing Images With Your Own Photography

All images reside in the `assets/images/` directory.

### Recommended Dimensions:
- **Hero Image (`hero-barber.jpg`):** 1400 x 900 px (Portrait/Landscape, under 400 KB)
- **About Section (`about-craft.jpg`):** 1000 x 1200 px (Portrait)
- **Barber Portraits (`team-julien.jpg`, etc.):** 800 x 1000 px (Portrait)
- **Gallery Photos (`gallery-1.jpg` to `gallery-6.jpg`):** 800 x 800 px or 800 x 1000 px

### How to Swap an Image:
1. Export your photo as a `.jpg` or `.webp` file.
2. Optimize your file size at [TinyPNG.com](https://tinypng.com) for optimal web performance.
3. Save the image in `assets/images/` with the same filename (e.g., `hero-barber.jpg`) to overwrite the placeholder, OR name it something new (e.g., `my-shop.jpg`) and update the path in `config.js` or `index.html`.

---

## 6. Configuring Google Maps Directions

1. Go to [Google Maps](https://maps.google.com).
2. Search for your barbershop address.
3. Click **Share** &rarr; **Embed a map**.
4. Copy the `src="..."` URL from the iframe code.
5. In `index.html`, locate line 527:
   ```html
   <iframe src="YOUR_COPIED_GOOGLE_MAPS_EMBED_URL" ...></iframe>
   ```
6. In `config.js`, update `googleMapsUrl` with your direct Google Maps link.
