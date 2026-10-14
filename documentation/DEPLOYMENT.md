# CUTLINE — Complete Deployment & Hosting Guide (`DEPLOYMENT.md`)

Because CUTLINE is built on clean, modern static web architecture (HTML5, CSS3, Vanilla JS), you can host it **100% free** on enterprise global CDN platforms or deploy it to any standard web hosting provider in minutes.

---

## Method 1: Netlify Drop (Recommended — 60 Seconds, 100% Free)

Netlify offers free global CDN hosting, automatic HTTPS SSL certificates, and custom domain linking.

### Step-by-Step:
1. Open your browser and navigate to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop your `cutline-barber-template` folder into the dotted upload area.
3. Wait 10 seconds while Netlify uploads your files.
4. Your website is immediately live! Netlify will provide a live URL (e.g., `https://brave-barber-12345.netlify.app`).

### Connecting Your Custom Domain (e.g. `yourbarbershop.com`):
1. In your Netlify dashboard, click **Site Configuration** &rarr; **Domain Management**.
2. Click **Add a domain** and type your registered domain name.
3. Follow the DNS instructions provided by Netlify:
   - Point your domain's **A Record** to Netlify’s load balancer IP (`75.2.60.5`).
   - Point your `www` **CNAME** to your Netlify site subdomain.
4. Netlify will automatically generate a free Let's Encrypt SSL certificate within a few minutes.

---

## Method 2: Cloudflare Pages (Free, Ultra-Fast Global Edge)

Cloudflare Pages provides the world's fastest edge network with built-in DDoS protection.

### Step-by-Step:
1. Sign up for a free account at [https://pages.cloudflare.com](https://pages.cloudflare.com).
2. Click **Create Application** &rarr; **Pages** &rarr; **Direct Upload**.
3. Name your project (e.g., `cutline-barbers`).
4. Drag and drop the `cutline-barber-template` folder.
5. Click **Deploy Site**. Your site is now live on `*.pages.dev` with free SSL and edge caching.

---

## Method 3: GitHub Pages (Free)

If you use GitHub:
1. Create a new GitHub repository named `my-barbershop-site`.
2. Push or upload the contents of `cutline-barber-template` directly to the `main` branch.
3. Go to **Settings** &rarr; **Pages**.
4. Under **Source**, select `Deploy from a branch` and choose `main` / `(root)`.
5. Click **Save**. Your site will be published at `https://yourusername.github.io/my-barbershop-site/`.

---

## Method 4: Traditional Web Hosting (cPanel, GoDaddy, Bluehost, Namecheap)

If you already have existing shared web hosting:

1. Log into your hosting account's **cPanel** (or hosting control panel).
2. Open **File Manager** and enter the `public_html/` folder (or your domain's document root).
3. If there is a default `index.html` or `index.php` placeholder from your host, remove or rename it.
4. Upload all files and folders from `cutline-barber-template`:
   - `index.html`
   - `config.js`
   - `css/`
   - `js/`
   - `assets/`
5. Ensure file permissions are set properly (typically `644` for files, `755` for directories).
6. Open your browser and visit your domain name!

---

## DNS Configuration Quick Reference

When connecting a custom domain bought through GoDaddy, Namecheap, Google Domains, or Porkbun:

| Record Type | Host / Name | Value / Destination | Notes |
| :--- | :--- | :--- | :--- |
| **A** | `@` | IP provided by your host | Points root domain |
| **CNAME** | `www` | Your hosting target URL | Points www subdomain |

---

## Pre-Deployment Verification Checklist

Before announcing your site to clients:
- [ ] Tested phone click-to-call link on a mobile device.
- [ ] Confirmed that booking button redirects to your active appointment scheduler.
- [ ] Verified physical address and Google Maps directions.
- [ ] Checked opening hours to ensure "Open/Closed" indicator matches your actual schedule.
- [ ] Updated social media URLs in `config.js`.
- [ ] Checked SSL padlock (`https://`) in the browser URL bar.
