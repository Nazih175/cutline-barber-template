/**
 * ==============================================================================
 * CUTLINE — FIREBASE PROJECT CONFIGURATION (`firebase-config.js`)
 * ==============================================================================
 * Optional Serverless Cloud Backend using Google Firebase & Cloud Firestore.
 *
 * WHAT THIS ENABLES:
 * - Automatic cloud storage of client appointments in Cloud Firestore.
 * - Storing contact messages and event inquiries in your database.
 * - Storing newsletter subscribers in your database.
 *
 * HOW TO ACTIVATE:
 * 1. Create a free Firebase project at: https://console.firebase.google.com/
 * 2. Click "Add App" &rarr; Web (</>).
 * 3. Copy your project credentials and replace the placeholder strings below.
 * 4. Change `enabled: false` to `enabled: true`.
 * 5. Save this file! All bookings and inquiries will now automatically sync to Firestore.
 *
 * NOTE: If `enabled: false`, the website functions perfectly in static mode
 * with simulated confirmations. No errors will ever appear in the console.
 * ==============================================================================
 */

var CUTLINE_FIREBASE_CONFIG = {
  // Toggle Firebase integration ON (true) or OFF (false)
  enabled: false,

  // Firebase Web App Credentials (from Firebase Console &rarr; Project Settings)
  apiKey: "YOUR_API_KEY",
  authDomain: "your-cutline-project.firebaseapp.com",
  projectId: "your-cutline-project",
  storageBucket: "your-cutline-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",

  // Firestore Collection Names (can be customized if desired)
  collections: {
    appointments: "appointments",
    inquiries: "inquiries",
    subscribers: "subscribers"
  }
};

// Make config accessible globally across browsers and modules
if (typeof window !== "undefined") {
  window.CUTLINE_FIREBASE_CONFIG = CUTLINE_FIREBASE_CONFIG;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = CUTLINE_FIREBASE_CONFIG;
}
