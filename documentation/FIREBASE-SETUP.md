# CUTLINE — Optional Firebase Cloud Backend Setup Guide

CUTLINE is designed as a **zero-dependency static website**. Out of the box, it requires no server, no database, and no mandatory monthly subscriptions.

However, if you or your client want **live cloud database storage** for:
- 📅 **Client Appointment Bookings** (from the on-site booking modal)
- ✉️ **Contact Messages & Event Buyouts** (from the contact form)
- 📰 **Newsletter Subscribers** (from the Cutline Journal footer form)

You can activate the pre-built **Google Cloud Firestore backend** in under 5 minutes without writing any code.

---

## ⚡ Key Highlights
- **100% Free Tier:** Google Firebase's Spark Plan includes 50,000 document reads, 20,000 document writes, and 1 GB of storage per day for free — more than enough for a high-end barbershop.
- **Strictly Modular:** All Firebase logic is isolated into `firebase-config.js` and `js/firebase-service.js`.
- **Zero Console Errors:** If `enabled: false`, the site functions in silent simulation mode with instant UI confirmations.

---

## 5-Minute Quick Setup

### Step 1: Create a Free Firebase Project
1. Navigate to the [Google Firebase Console](https://console.firebase.google.com/).
2. Click **Create a project** (or **Add project**).
3. Name your project (e.g., `cutline-barbershop-toronto`) and click **Continue**.
4. Disable Google Analytics (optional, not required for Firestore) and click **Create Project**.

---

### Step 2: Register a Web App & Get Your API Keys
1. In your Firebase Project Overview dashboard, click the **Web icon (`</>`)** to add a web application.
2. Enter an App nickname (e.g., `Cutline Web`).
3. You do **not** need to check "Firebase Hosting" (unless you choose to host there).
4. Click **Register app**.
5. Firebase will display your `firebaseConfig` object:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyB...",
     authDomain: "cutline-barbershop.firebaseapp.com",
     projectId: "cutline-barbershop",
     storageBucket: "cutline-barbershop.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456"
   };
   ```

---

### Step 3: Enable Cloud Firestore
1. In the left-hand navigation sidebar of the Firebase Console, click **Build** &rarr; **Firestore Database**.
2. Click **Create database**.
3. Choose your database location (select the region nearest to your barbershop location).
4. Choose **Start in production mode** and click **Create**.

---

### Step 4: Apply Production Security Rules
1. In the Firestore Database section, click the **Rules** tab at the top.
2. Open the file `firestore.rules` included in this template folder.
3. Copy the entire contents of `firestore.rules` and paste it into the Firebase Console editor, replacing any existing code.
4. Click **Publish**.

> [!TIP]
> The included `firestore.rules` file enforces strict validation:
> - Public visitors can only create valid, sanitized documents with status `pending`.
> - Public visitors cannot read, overwrite, or delete appointments, protecting client privacy (PII).
> - Only authenticated administrators can view or update bookings.

---

### Step 5: Update `firebase-config.js`
1. Open `firebase-config.js` in any text editor.
2. Paste your project credentials and toggle `enabled: true`:
   ```javascript
   var CUTLINE_FIREBASE_CONFIG = {
     // 1. Set to true to activate live Firestore syncing
     enabled: true,

     // 2. Paste your credentials from Step 2
     apiKey: "AIzaSyB...",
     authDomain: "cutline-barbershop.firebaseapp.com",
     projectId: "cutline-barbershop",
     storageBucket: "cutline-barbershop.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456",

     // 3. Collection names (defaults are recommended)
     collections: {
       appointments: "appointments",
       inquiries: "inquiries",
       subscribers: "subscribers"
     }
   };
   ```
3. Save the file. That's it!

---

## 🧪 Testing Your Live Integration

1. Open `index.html` in your browser.
2. Click **Book Appointment** (or select a service) to open the reservation modal.
3. Fill in test customer details and click **Confirm Chair Reservation**.
4. In your browser console (`F12`), you will see:
   ```text
   ✓ CUTLINE: Cloud Firestore backend connected successfully.
   ```
5. Switch to your **Firebase Console &rarr; Firestore Database &rarr; Data tab**.
6. You will see a new collection called `appointments` with your test booking!

---

## 🗄️ Database Collections Schema

### 1. `appointments`
Created when a client reserves a chair via the on-site booking modal.
| Field | Type | Description |
| :--- | :--- | :--- |
| `serviceName` | string | Chosen haircut, shave, or ritual |
| `servicePrice` | string | Price at time of booking |
| `barberName` | string | Selected barber or "First Available Master Barber" |
| `appointmentDate` | string | Date requested (e.g. `2026-10-25`) |
| `appointmentTime` | string | Time slot requested (e.g. `11:00 AM`) |
| `clientName` | string | Client's full name |
| `clientPhone` | string | Contact phone for SMS confirmation |
| `clientEmail` | string | Email for calendar invite |
| `status` | string | Initial value is `pending` |
| `createdAt` | timestamp | Server timestamp of creation |
| `source` | string | `"cutline-website-modal"` |

### 2. `inquiries`
Created when a visitor submits the contact message form.
| Field | Type | Description |
| :--- | :--- | :--- |
| `fullname` | string | Sender's full name |
| `email` | string | Sender's email |
| `phone` | string | Phone number (optional) |
| `topic` | string | Selected topic (e.g., Private Event / Wedding) |
| `message` | string | Message body |
| `createdAt` | timestamp | Server timestamp |
| `source` | string | `"cutline-contact-form"` |

### 3. `subscribers`
Created when someone signs up for The Cutline Journal.
| Field | Type | Description |
| :--- | :--- | :--- |
| `email` | string | Sanitized subscriber email |
| `createdAt` | timestamp | Server timestamp |
| `source` | string | `"footer-journal-form"` |

---

## 💡 Managing Bookings & Adding Notifications

### Viewing Bookings
- The easiest way is directly inside the [Firebase Console](https://console.firebase.google.com/) under Firestore Data. You can filter, search, change status to `confirmed` or `completed`, and delete entries.

### Optional Free Email Notifications:
If you want to receive an immediate email every time someone books or contacts you:
1. In the Firebase Console, go to **Extensions**.
2. Install the free official **Trigger Email from Firestore** extension (powered by SendGrid, Mailgun, or standard SMTP).
3. Whenever a document is added to `appointments` or `inquiries`, an email alert is automatically delivered to the barbershop's inbox.
