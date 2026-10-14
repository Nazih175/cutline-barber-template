# CUTLINE — Installation & Technical Setup Guide (`INSTALLATION.md`)

This technical document outlines the environment requirements, file architecture, and local preview methods for the CUTLINE website template.

---

## 1. System Requirements

- **Operating System:** Any OS (Windows, macOS, Linux, ChromeOS).
- **Web Browser:** Any modern web browser (Google Chrome, Safari, Mozilla Firefox, Microsoft Edge, Brave).
- **Text Editor (Optional for editing):** Any text editor (Visual Studio Code, Sublime Text, Notepad++, TextEdit).
- **No Build Tools Required:** Does not require Node.js, npm, Ruby, Python, Webpack, Vite, or PHP.

---

## 2. Unpacking the Customer Deliverable

1. Extract the downloaded `cutline-barber-package.zip` to your computer or project directory.
2. Verify that the extracted directory contains:
   ```text
   cutline-barber-template/
   ├── index.html                  # Main production landing page
   ├── config.js                   # Master configuration settings
   ├── css/
   │   └── style.css               # Main luxury stylesheet
   ├── js/
   │   └── app.js                  # Vanilla JS engine
   ├── assets/
   │   ├── images/                 # Stock imagery, crest SVG, and signature
   │   └── icons/                  # 16 hand-crafted SVG vector icons
   ├── previews/                   # High-resolution screenshots of the template
   ├── documentation/              # Complete user manuals and licenses
   └── START-HERE.md               # Quickstart guide
   ```

---

## 3. Running & Testing Locally

### Method A: Direct Browser Execution (Fastest)
Simply double-click `index.html` from your file explorer. It will open directly using the `file://` protocol. All interactive modals, accordions, and configuration hydrations function immediately.

### Method B: Local Development Server (Recommended for Developers)
If you prefer running a local HTTP server:

**Using Python (Pre-installed on macOS/Linux):**
```bash
# In the cutline-barber-template directory:
python -m http.server 8080
# Open http://localhost:8080 in your browser
```

**Using VS Code Live Server:**
1. Open the `cutline-barber-template` folder in Visual Studio Code.
2. Install the **Live Server** extension by Ritwick Dey.
3. Right-click `index.html` and select **"Open with Live Server"**.

**Using Node.js (npx serve):**
```bash
npx serve .
```

---

## 4. Verification Check

After opening `index.html`, verify that:
1. The brand crest and hero image load crisply.
2. The announcement bar displays the live "Open Today" or "Currently Closed" status badge.
3. Clicking on any service filter tab (e.g. "Traditional Shaves") updates the displayed cards.
4. Clicking any gallery thumbnail opens the high-resolution lightbox preview.
5. Clicking "Book Appointment" triggers the appointment modal.
6. Opening the floating "Live Customizer" allows previewing color swatches.
