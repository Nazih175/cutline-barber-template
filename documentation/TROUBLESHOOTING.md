# CUTLINE — Troubleshooting & Frequently Asked Questions (`TROUBLESHOOTING.md`)

This guide addresses common questions and provides quick solutions when editing or deploying the CUTLINE barbershop template.

---

### Q1: I edited `config.js`, but my updates aren't showing in the browser!
**Solution:**
Web browsers frequently cache local JavaScript files. To see your latest changes immediately:
- **Windows / Linux:** Press `Ctrl + Shift + R` or `Ctrl + F5` to perform a hard refresh.
- **Mac:** Press `Cmd + Shift + R`.
- Alternatively, test your changes in an Incognito / Private browsing window.

---

### Q2: How do I remove the "Live Customizer" widget before launching my site?
**Solution:**
The Live Customizer is a helper tool for shop owners and template buyers to test color palettes. When you are ready to publish:
1. Open `index.html`.
2. Scroll to Section 15 near the bottom (around lines 850–890).
3. Delete or comment out the `<button id="customizer-toggle-btn">` and `<aside id="customizer-floating-panel">` elements.
4. Save the file. The floating button will be removed completely.

---

### Q3: My booking button doesn't open my Square / Fresha / Calendly scheduling page.
**Solution:**
Ensure your booking URL in `config.js` starts with `https://`. For example:
```javascript
// ✅ CORRECT:
bookingUrl: "https://squareup.com/appointments/book/your-shop-id",

// ❌ INCORRECT (Missing https://):
bookingUrl: "squareup.com/appointments/book/your-shop-id",
```
If `bookingUrl` is set to `"#book-modal"`, CUTLINE automatically triggers the built-in on-site booking inquiry window instead.

---

### Q4: My custom uploaded photos are appearing broken or blank.
**Solution:**
1. Check that the image was saved inside the `assets/images/` directory.
2. Web file paths are case-sensitive on web servers: `my-photo.JPG` is not the same as `my-photo.jpg`. Ensure the file extension matches.
3. Check the path in `config.js` or `index.html`: it should be relative, e.g. `assets/images/my-photo.jpg`.

---

### Q5: How do I connect the Contact Form to receive client emails on static hosting?
**Solution:**
Because static websites do not run a server-side PHP or Python backend, we recommend using a free static form endpoint like **Formspree** or **FormSubmit**:

1. Register for a free endpoint at [formspree.io](https://formspree.io) or use [formsubmit.co](https://formsubmit.co).
2. In `index.html`, update the contact form tag:
   ```html
   <form id="contact-inquiry-form" action="https://formsubmit.co/your-email@example.com" method="POST">
   ```
3. When clients submit inquiries, they will be forwarded directly to your email inbox with zero server setup required!

---

### Q6: Can I add more than 3 barbers or more services?
**Solution:**
Yes! CUTLINE is completely flexible.
- In `config.js`, simply copy an existing team member or service block and paste it inside the array.
- The grid layout automatically wraps cleanly to accommodate 4, 6, 8, or more barbers and unlimited services.

---

### Q7: How do I change the currency symbol from $ to £ (GBP) or € (EUR)?
**Solution:**
In `config.js`, update the `currency` and `currencyCode` fields:
```javascript
currency: "£",
currencyCode: "GBP"
```
Then update the price strings in the `services` array (e.g. `price: "£55"`).

---

### Q8: The "Open / Closed" indicator says the shop is closed when we are actually open.
**Solution:**
Check the `hours` array in `config.js`. Ensure you set the `openHour24` and `closeHour24` properties in 24-hour military format:
- 9:00 AM = `9`
- 6:00 PM = `18`
- 8:00 PM = `20`

```javascript
// Example for 9:00 AM to 8:00 PM:
{ day: "Tuesday", openTime: "9:00 AM", closeTime: "8:00 PM", openHour24: 9, closeHour24: 20, isClosed: false }
```

---

### Q9: Can I change the fonts?
**Solution:**
Yes. CUTLINE imports `Cinzel` (display serif) and `Plus Jakarta Sans` (body sans-serif) from Google Fonts in `css/style.css`.
To use other Google Fonts (such as *Playfair Display*, *Cormorant Garamond*, or *Inter*):
1. In `css/style.css`, update line 7 `@import url(...)` with your desired Google Fonts link.
2. Update the CSS tokens `--font-serif` and `--font-sans` on lines 25–26.

---

### Q10: Need additional assistance?
If you encounter any unexpected issues or have questions regarding advanced customization, review the [START-HERE.html](START-HERE.html) guide or reach out to our support channel via your digital purchase receipt.
