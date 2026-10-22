/**
 * SITE CONFIGURATION
 * 
 * Edit this single file to rebrand and configure the entire site for any service niche in under 5 minutes.
 */

const SITE_CONFIG = {
  // Business Core Identity
  business: {
    name: "ExpressServices",
    legalName: "STAGE-X Express Services",
    tagline: "Fast & Reliable On-Demand Services at Your Doorstep",
    description: "Professional doorstep service with fast turnaround, verified experts, and transparent pricing. Book instantly via WhatsApp.",
    domain: "expressservices.online",
    url: "https://expressservices.online",
    
    // Communication & Lead Routing
    phoneDisplay: "+91 98765 43210",
    whatsappNumber: "919876543210", // International format without "+" or spaces
    defaultWhatsAppMessage: "Hi, I would like to book a service.",
    contactEmail: "contact@expressservices.online",
    
    // Physical & Regional Presence (for Local SEO & Schema.org)
    address: "Indiranagar 100ft Road",
    city: "Bangalore",
    state: "Karnataka",
    postalCode: "560038",
    country: "India",
    countryCode: "IN",
    
    // Offer & Pricing Highlight
    priceStartingAt: "₹49",
    priceRange: "₹₹",
    ratingScore: "4.9",
    reviewCount: "1,240+",
    turnaroundTime: "Same-Day Delivery / Service",

    // Lead Redundancy Storage
    // Option A: Private GitHub Issues Repo (e.g. 'utkarshethics/leads-db')
    // Option B: Leave empty to save locally to browser storage & pass directly to WhatsApp
    leadRepo: "utkarshethics/leads-db",
    leadToken: "" // Inject via env/inline or leave blank for local cache
  },

  // Highlighted Service Offerings
  services: [
    {
      id: "service-1",
      icon: "⚡",
      title: "Express On-Demand Service",
      price: "Starting at ₹49",
      desc: "Fast, door-to-door doorstep service completed in under 24 hours.",
      highlighted: false,
      intent: "Booking: Express Service"
    },
    {
      id: "service-2",
      icon: "⭐",
      title: "Standard Full-Care Package",
      price: "Starting at ₹149",
      desc: "Comprehensive end-to-end service with premium quality guarantee.",
      highlighted: true,
      badge: "Most Popular",
      intent: "Booking: Standard Package"
    },
    {
      id: "service-3",
      icon: "🛡️",
      title: "Commercial & Bulk Orders",
      price: "Custom Quotation",
      desc: "Tailored commercial packages for businesses, offices, and regular clients with GST invoice.",
      highlighted: false,
      intent: "Inquiry: Bulk Commercial Service"
    }
  ],

  // Frequently Asked Questions (Auto-populated in UI & Schema.org)
  faqs: [
    {
      q: "How quickly can I book a service?",
      a: "You can book in under 60 seconds directly on WhatsApp. Our representative confirms availability and dispatches an executive right away."
    },
    {
      q: "What payment methods are supported?",
      a: "We accept UPI (GPay, PhonePe, Paytm), Net Banking, Credit/Debit cards, and Cash on Delivery / Completion."
    },
    {
      q: "Do you provide GST tax invoices?",
      a: "Yes, we provide 18% GST invoices for all commercial and individual bookings on request."
    },
    {
      q: "What happens if I need to reschedule?",
      a: "Rescheduling is completely free! Simply send us a quick WhatsApp text at least 2 hours before your booked time slot."
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
