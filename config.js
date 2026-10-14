/**
 * ==============================================================================
 * CUTLINE — LUXURY BARBERSHOP WEBSITE TEMPLATE
 * MASTER CONFIGURATION FILE (`config.js`)
 * ==============================================================================
 * Welcome to CUTLINE! You can customize virtually every aspect of your website
 * simply by updating the values in this file. No coding knowledge required.
 *
 * HOW TO EDIT:
 * 1. Open this file in any text editor (VS Code, Notepad, TextEdit).
 * 2. Update the text inside quotation marks "..." with your business details.
 * 3. Save the file and refresh your browser. Your changes take effect instantly!
 * ==============================================================================
 */

var CUTLINE_CONFIG = {
  // --------------------------------------------------------------------------
  // 1. BUSINESS & BRAND IDENTITY
  // --------------------------------------------------------------------------
  business: {
    name: "CUTLINE",
    subname: "Master Barbers & Grooming Atelier",
    tagline: "The Art of Timeless Grooming",
    heroHeadline: "Architectural Precision. Heritage Craft.",
    heroSubheadline: "Experience bespoke scissor craft, traditional straight-razor hot towel shaves, and unmatched hospitality in an intimate editorial atmosphere.",
    establishedYear: "2018",
    announcement: "Complimentary Single-Malt or Artisanal Espresso with Every Master Service • Appointments & Walk-ins Welcome",
    
    // Direct Contact Info
    phone: "+1 (416) 555-0198",
    phoneRaw: "+14165550198", // Clean number for click-to-call tel: links
    email: "concierge@cutlinebarbers.com",
    
    // Physical Location & Directions
    street: "148 Yorkville Avenue, Suite 200",
    cityStateZip: "Toronto, ON M5R 1C2",
    country: "Canada",
    neighborhood: "Historic Yorkville District",
    parkingNote: "Validated underground parking available at Yorkville Village. Two blocks north of Bay Subway Station.",
    googleMapsUrl: "https://maps.google.com/?q=Yorkville+Avenue+Toronto",
    
    // Primary Booking Destination:
    // Insert your booking link here (Square Appointments, Fresha, Calendly, Acuity, Booksy, Vagaro, etc.)
    // If left as "#book-modal", the built-in elegant on-site appointment booking modal will open!
    bookingUrl: "#book-modal",
    bookingButtonText: "Book Appointment",
    
    // Currency Symbol and Code
    currency: "$",
    currencyCode: "CAD"
  },

  // --------------------------------------------------------------------------
  // 2. BRAND COLOR PALETTE & THEME
  // --------------------------------------------------------------------------
  theme: {
    primaryBronze: "#C5A059",    // Refined warm brass/bronze accent
    bronzeLight: "#E5C788",      // Light golden highlight
    bronzeDark: "#8C682A",       // Deep heritage bronze border
    charcoalDark: "#0D0D0D",     // Primary dark backdrop
    charcoalCard: "#141416",     // Slightly lifted surface for cards
    charcoalBorder: "#242428",   // Subtle card borders
    creamWarm: "#F5F2EB",        // High-contrast warm off-white text
    creamMuted: "#B8B2A6"        // Subtle secondary text
  },

  // --------------------------------------------------------------------------
  // 3. WEEKLY OPENING HOURS & LIVE STATUS
  // --------------------------------------------------------------------------
  // Toggle 24/7 Live Status:
  // When true: Badge displays pulsing green "Online Concierge & Booking Live 24/7".
  // When false: Uses real-time local open/close schedule based on visitor local time.
  onlineBooking247: true,
  statusBadgeCustomText: "Online Booking & Concierge <span class='text-bronze'>Live 24/7</span>",

  hours: [
    { day: "Monday", openTime: "10:00 AM", closeTime: "7:00 PM", openHour24: 10, closeHour24: 19, isClosed: false },
    { day: "Tuesday", openTime: "9:00 AM", closeTime: "8:00 PM", openHour24: 9, closeHour24: 20, isClosed: false },
    { day: "Wednesday", openTime: "9:00 AM", closeTime: "8:00 PM", openHour24: 9, closeHour24: 20, isClosed: false },
    { day: "Thursday", openTime: "9:00 AM", closeTime: "8:00 PM", openHour24: 9, closeHour24: 20, isClosed: false },
    { day: "Friday", openTime: "9:00 AM", closeTime: "8:00 PM", openHour24: 9, closeHour24: 20, isClosed: false },
    { day: "Saturday", openTime: "9:00 AM", closeTime: "6:00 PM", openHour24: 9, closeHour24: 18, isClosed: false },
    { day: "Sunday", openTime: "11:00 AM", closeTime: "5:00 PM", openHour24: 11, closeHour24: 17, isClosed: false }
  ],
  holidayNote: "Private evening bookings, bridal parties, and VIP group reservations available upon request.",

  // --------------------------------------------------------------------------
  // 4. VALUE PROPOSITIONS & SHOP PILLARS
  // --------------------------------------------------------------------------
  pillars: [
    {
      title: "Master Craftsmanship",
      description: "Every cut is crafted with surgical precision using hand-balanced Japanese shears and tailored to your specific facial architecture.",
      icon: "scissors"
    },
    {
      title: "The Straight Razor Ritual",
      description: "Traditional hot lather machines, eucalyptus-steamed towels, cold-pressed beard oils, and feather-grade straight edge shaves.",
      icon: "razor"
    },
    {
      title: "Complimentary Speakeasy Bar",
      description: "Relax in vintage Chesterfield leather chairs while savoring rare single-malt scotch, cold Japanese lager, or freshly pulled espresso.",
      icon: "coffee"
    },
    {
      title: "Curated Atmosphere",
      description: "Audiophile analog vinyl soundscapes, bespoke amber lighting, and an unhurried sanctuary away from the city's frantic pace.",
      icon: "sparkles"
    }
  ],

  // --------------------------------------------------------------------------
  // 5. SERVICES & PRICING MENU
  // --------------------------------------------------------------------------
  serviceCategories: [
    { id: "all", label: "Full Service Menu" },
    { id: "haircuts", label: "Haircraft & Styling" },
    { id: "shaves", label: "Traditional Shaves" },
    { id: "packages", label: "Signature Rituals" },
    { id: "treatments", label: "Grooming & Scalp" }
  ],

  services: [
    {
      id: "srv-1",
      category: "haircuts",
      name: "The Executive Cut & Style",
      duration: "45 MIN",
      price: "$65",
      isPopular: true,
      description: "Detailed consultation, precision scissor or clipper silhouette, neck taper, energizing hair wash, scalp massage, blow-dry, and bespoke styling with matte clay."
    },
    {
      id: "srv-2",
      category: "haircuts",
      name: "Architectural Skin Fade & Taper",
      duration: "50 MIN",
      price: "$70",
      isPopular: false,
      description: "Flawless foil or razor fade transitioning seamlessly from bare skin to desired length. Includes crisp razor perimeter line-up and styling finish."
    },
    {
      id: "srv-3",
      category: "haircuts",
      name: "Tailored Buzz & Clean Neck Shave",
      duration: "30 MIN",
      price: "$45",
      isPopular: false,
      description: "Uniform clipper contour with graduated perimeter tapering, hot lather straight razor finish along the neck, and cold towel refresher."
    },
    {
      id: "srv-4",
      category: "shaves",
      name: "Traditional Hot Towel Straight Razor Shave",
      duration: "45 MIN",
      price: "$60",
      isPopular: true,
      description: "The classic barbershop ritual: pre-shave botanical oils, three alternating steamed eucalyptus towels, warm badger brush lather, close razor pass, and calming cold stone finish."
    },
    {
      id: "srv-5",
      category: "shaves",
      name: "Bespoke Beard Sculpt & Hot Towel Treatment",
      duration: "40 MIN",
      price: "$50",
      isPopular: false,
      description: "Freehand shear and clipper sculpting tailored to jawline aesthetics, razor cheek line-up, steam conditioning treatment, and organic cedarwood beard balm."
    },
    {
      id: "srv-6",
      category: "shaves",
      name: "The Royal Head Shave",
      duration: "45 MIN",
      price: "$55",
      isPopular: false,
      description: "Exfoliating scalp preparation, twin hot steamed towels, warm rich lather, precision straight razor pass, followed by cooling witch hazel and sun-shield scalp balm."
    },
    {
      id: "srv-7",
      category: "packages",
      name: "The CUTLINE Grand Ritual",
      duration: "90 MIN",
      price: "$130",
      isPopular: true,
      description: "Our signature head-to-toe experience: The Executive Cut, Traditional Hot Towel Straight Razor Shave, Charcoal Purifying Face Mask, and Scalp Invigoration."
    },
    {
      id: "srv-8",
      category: "packages",
      name: "Father & Son Classic Pairing",
      duration: "75 MIN",
      price: "$115",
      isPopular: false,
      description: "Two simultaneous customized haircuts, styling consultations, neck cleanup, and complimentary craft refreshments side-by-side."
    },
    {
      id: "srv-9",
      category: "treatments",
      name: "Activated Charcoal Detox Facial",
      duration: "30 MIN",
      price: "$45",
      isPopular: false,
      description: "Deep pore ultrasonic cleanse, hot steam towel, volcanic charcoal clay masque, and soothing botanical moisturizer designed specifically for men's skin."
    },
    {
      id: "srv-10",
      category: "treatments",
      name: "Natural Gray Camouflage & Blending",
      duration: "30 MIN",
      price: "$50",
      isPopular: false,
      description: "Subtle 10-minute demi-permanent tone formulation that naturally softens silver hair without obvious brassy regrowth lines."
    }
  ],

  // --------------------------------------------------------------------------
  // 6. MASTER BARBER TEAM PROFILES
  // --------------------------------------------------------------------------
  team: [
    {
      name: "Julien Vance",
      role: "Founder & Master Craftsman",
      experience: "14 Years Experience",
      chair: "Chair No. 1",
      bio: "Trained in Mayfair, London and Paris, Julien combines classic European shear craftsmanship with modern architectural silhouettes. Renowned for scissor-over-comb mastery.",
      specialties: ["Architectural Scissor Cuts", "Classic Pompadours", "Facial Topology Styling"],
      image: "assets/images/team-julien.jpg",
      schedule: "Tuesday – Saturday",
      instagram: "@julien.cutline"
    },
    {
      name: "Marcus Cole",
      role: "Senior Barber & Shave Alchemist",
      experience: "10 Years Experience",
      chair: "Chair No. 2",
      bio: "A master of the Japanese straight razor and vintage hot towel rituals. Marcus specializes in beard sculpting, precision skin fades, and restorative scalp therapy.",
      specialties: ["Hot Towel Straight Razor", "Beard Sculpting", "Crisp Skin Fades"],
      image: "assets/images/team-marcus.jpg",
      schedule: "Wednesday – Sunday",
      instagram: "@marcus.barbercraft"
    },
    {
      name: "Elena Rostova",
      role: "Styling Director & Texture Specialist",
      experience: "9 Years Experience",
      chair: "Chair No. 3",
      bio: "Editorial session stylist turned bespoke barber. Elena brings a refined fashion-forward eye to modern textured crops, subtle gray blending, and customized grooming.",
      specialties: ["Textured Crops", "Gray Blending", "Modern Tapers"],
      image: "assets/images/team-elena.jpg",
      schedule: "Monday – Friday",
      instagram: "@elena.cutline"
    }
  ],

  // --------------------------------------------------------------------------
  // 7. PORTFOLIO / GALLERY SHOWCASE
  // --------------------------------------------------------------------------
  gallery: [
    {
      id: "gal-1",
      title: "Precision Scissor Silhouette",
      category: "haircuts",
      image: "assets/images/gallery-1.jpg",
      caption: "Clean scissor-over-comb graduation with natural weight placement and low-shine pomade finish."
    },
    {
      id: "gal-2",
      title: "Traditional Straight Razor Shave",
      category: "shaves",
      image: "assets/images/gallery-2.jpg",
      caption: "Steamed hot towel lather ritual with surgical steel razor edge for the closest possible comfort."
    },
    {
      id: "gal-3",
      title: "Low Taper & Textured Crop",
      category: "haircuts",
      image: "assets/images/gallery-3.jpg",
      caption: "Surgical low skin taper seamlessly blended into heavy texture on top with matte clay finish."
    },
    {
      id: "gal-4",
      title: "Beard Architecture & Contour",
      category: "shaves",
      image: "assets/images/gallery-4.jpg",
      caption: "Hand-sculpted jawline silhouette finished with razor cheek line and nourishing cedarwood oil."
    },
    {
      id: "gal-5",
      title: "The Atelier Lounge",
      category: "atmosphere",
      image: "assets/images/gallery-5.jpg",
      caption: "Custom leather barber chairs, brass trim, and our private tasting bar for awaiting clients."
    },
    {
      id: "gal-6",
      title: "Hand-Forged Tooling",
      category: "atmosphere",
      image: "assets/images/gallery-6.jpg",
      caption: "High-carbon Japanese Hitachi steel shears and heritage shaving lathers curated from Europe."
    }
  ],

  // --------------------------------------------------------------------------
  // 8. FREQUENTLY ASKED QUESTIONS (FAQ)
  // --------------------------------------------------------------------------
  faqs: [
    {
      question: "Do I need to book in advance or do you take walk-in clients?",
      answer: "While we always gladly welcome walk-in clients whenever chair availability permits, appointments are strongly recommended to guarantee your preferred master barber and time slot. You can book online 24/7 in under 60 seconds."
    },
    {
      question: "What is your cancellation and rescheduling policy?",
      answer: "We kindly request at least 24 hours of advance notice for cancellations or rescheduling so we can offer the chair reservation to our waitlisted clients. Late cancellations within 6 hours may incur a 50% reservation fee."
    },
    {
      question: "What does the complimentary beverage service include?",
      answer: "Every appointment includes full access to our private hospitality bar. Enjoy your choice of single-malt Scotch, small-batch bourbon, chilled Japanese Asahi lager, freshly extracted double espresso, sparkling mineral water, or herbal cold brews."
    },
    {
      question: "Which grooming and styling products do you use in the shop?",
      answer: "We exclusively curate small-batch, paraben-free pomades, sea salt sprays, and cold-pressed organic beard elixirs crafted in England, Japan, and Canada. All styling products used during your cut are available for purchase in our retail apothecary."
    },
    {
      question: "Can I book a private groom's party or private after-hours event?",
      answer: "Yes, our entire atelier is available for private bridal parties, corporate executive grooming, and milestone celebrations. Full salon buyout packages include exclusive barber staffing, custom bar service, and catered cigars/charcuterie upon request."
    },
    {
      question: "What forms of payment do you accept?",
      answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express), Apple Pay, Google Pay, and Interac contactless. Cash is also accepted."
    }
  ],

  // --------------------------------------------------------------------------
  // 9. SOCIAL MEDIA CHANNELS
  // --------------------------------------------------------------------------
  social: {
    instagram: "https://instagram.com",
    facebook: "https://facebook.com",
    twitter: "https://x.com",
    youtube: "https://youtube.com",
    googleReview: "https://maps.google.com"
  },

  // --------------------------------------------------------------------------
  // 10. LEGAL & COPYRIGHT
  // --------------------------------------------------------------------------
  legal: {
    copyrightName: "CUTLINE Master Barbers Inc.",
    privacyPolicyUrl: "#privacy-modal",
    termsOfServiceUrl: "#terms-modal"
  }
};

// Make config globally accessible in browser or Node environments
if (typeof window !== "undefined") {
  window.CUTLINE_CONFIG = CUTLINE_CONFIG;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = CUTLINE_CONFIG;
}
