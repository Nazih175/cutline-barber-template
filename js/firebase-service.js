/**
 * ==============================================================================
 * CUTLINE — FIREBASE CLOUD SERVICE ENGINE (`firebase-service.js`)
 * ==============================================================================
 * Handles seamless, zero-dependency integration with Google Cloud Firestore:
 * - Real-time saving of client appointment reservations
 * - Storing customer inquiries & event buyout requests
 * - Storing newsletter subscribers
 *
 * ARCHITECTURE:
 * - Operates in "Plug-and-Play" mode:
 *   If `CUTLINE_FIREBASE_CONFIG.enabled` is `false`, requests resolve cleanly
 *   in simulated offline mode with zero errors and zero external requests.
 * - When `enabled` is set to `true` in `firebase-config.js`, this engine
 *   dynamically loads the official Firebase Web SDK and writes directly to Firestore.
 * ==============================================================================
 */

(function () {
  "use strict";

  class CutlineFirebaseService {
    constructor() {
      this.config = window.CUTLINE_FIREBASE_CONFIG || {};
      this.db = null;
      this.isReady = false;
      this.initPromise = null;

      if (this.config.enabled) {
        this.initPromise = this._bootstrapFirebase();
      }
    }

    /**
     * Checks if Firebase is enabled by user in firebase-config.js
     */
    isEnabled() {
      return Boolean(this.config && this.config.enabled);
    }

    /**
     * Dynamically loads Firebase SDK scripts if not already present on page
     */
    async _loadScript(src) {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.head.appendChild(script);
      });
    }

    /**
     * Bootstraps Firebase App and Cloud Firestore
     */
    async _bootstrapFirebase() {
      if (!this.isEnabled()) return null;

      try {
        // Load Firebase App & Firestore Compat SDKs from Google's official CDN
        await this._loadScript("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
        await this._loadScript("https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore-compat.js");

        if (typeof firebase === "undefined") {
          throw new Error("Firebase SDK could not be initialized from CDN.");
        }

        // Initialize Firebase App if not already initialized
        if (!firebase.apps.length) {
          firebase.initializeApp({
            apiKey: this.config.apiKey,
            authDomain: this.config.authDomain,
            projectId: this.config.projectId,
            storageBucket: this.config.storageBucket,
            messagingSenderId: this.config.messagingSenderId,
            appId: this.config.appId
          });
        }

        this.db = firebase.firestore();
        this.isReady = true;
        console.log("✓ CUTLINE: Cloud Firestore backend connected successfully.");
        return this.db;
      } catch (err) {
        console.warn("⚠️ CUTLINE: Firebase initialization failed. Falling back to simulation mode.", err);
        this.isReady = false;
        return null;
      }
    }

    /**
     * Ensures Firebase is initialized before proceeding with database operations
     */
    async _ensureReady() {
      if (this.isReady) return true;
      if (this.initPromise) {
        await this.initPromise;
        return this.isReady;
      }
      return false;
    }

    /**
     * 1. Save an Appointment Booking to Cloud Firestore
     * @param {Object} data
     */
    async saveAppointmentBooking(data) {
      const ready = await this._ensureReady();
      const colName = (this.config.collections && this.config.collections.appointments) || "appointments";

      const payload = {
        serviceName: String(data.serviceName || "").trim(),
        servicePrice: String(data.servicePrice || "").trim(),
        barberName: String(data.barberName || "").trim(),
        appointmentDate: String(data.appointmentDate || "").trim(),
        appointmentTime: String(data.appointmentTime || "").trim(),
        clientName: String(data.clientName || "").trim(),
        clientPhone: String(data.clientPhone || "").trim(),
        clientEmail: String(data.clientEmail || "").trim(),
        status: "pending",
        createdAt: this.isReady ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString(),
        source: "cutline-website-modal"
      };

      if (!ready || !this.db) {
        // Fallback simulation mode
        console.info("CUTLINE Firebase [Simulation]: Appointment recorded locally:", payload);
        return { success: true, mode: "simulated", data: payload };
      }

      try {
        const docRef = await this.db.collection(colName).add(payload);
        return { success: true, mode: "firestore", id: docRef.id, data: payload };
      } catch (error) {
        console.error("CUTLINE Firebase Error saving appointment:", error);
        throw error;
      }
    }

    /**
     * 2. Save a Contact Message / Event Buyout Inquiry to Cloud Firestore
     * @param {Object} data
     */
    async saveContactInquiry(data) {
      const ready = await this._ensureReady();
      const colName = (this.config.collections && this.config.collections.inquiries) || "inquiries";

      const payload = {
        fullname: String(data.fullname || "").trim(),
        email: String(data.email || "").trim(),
        phone: String(data.phone || "").trim(),
        topic: String(data.topic || "General Question").trim(),
        message: String(data.message || "").trim(),
        createdAt: this.isReady ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString(),
        source: "cutline-contact-form"
      };

      if (!ready || !this.db) {
        // Fallback simulation mode
        console.info("CUTLINE Firebase [Simulation]: Contact inquiry recorded locally:", payload);
        return { success: true, mode: "simulated", data: payload };
      }

      try {
        const docRef = await this.db.collection(colName).add(payload);
        return { success: true, mode: "firestore", id: docRef.id, data: payload };
      } catch (error) {
        console.error("CUTLINE Firebase Error saving inquiry:", error);
        throw error;
      }
    }

    /**
     * 3. Save a Newsletter Subscriber to Cloud Firestore
     * @param {string} email
     */
    async saveNewsletterSubscriber(email) {
      const ready = await this._ensureReady();
      const colName = (this.config.collections && this.config.collections.subscribers) || "subscribers";

      const payload = {
        email: String(email || "").trim().toLowerCase(),
        source: "footer-journal-form",
        createdAt: this.isReady ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString()
      };

      if (!ready || !this.db) {
        console.info("CUTLINE Firebase [Simulation]: Newsletter subscriber recorded:", payload);
        return { success: true, mode: "simulated", data: payload };
      }

      try {
        const docRef = await this.db.collection(colName).add(payload);
        return { success: true, mode: "firestore", id: docRef.id, data: payload };
      } catch (error) {
        console.error("CUTLINE Firebase Error saving subscriber:", error);
        throw error;
      }
    }
  }

  // Expose singleton service on window
  if (typeof window !== "undefined") {
    window.CutlineFirebase = new CutlineFirebaseService();
  }
})();
