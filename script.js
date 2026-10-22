/**
 * CORE SCRIPT & LEAD ENGINE
 * 
 * Synchronizes DOM elements with SITE_CONFIG, tracks UTM sources,
 * captures lead data (Name & Phone) asynchronously, and routes to WhatsApp.
 */

(function () {
  'use strict';

  let currentIntent = 'Direct Inquiry';

  // Extract UTM & Referrer Parameters
  function getTrafficSource() {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get('utm_source') || (document.referrer ? new URL(document.referrer).hostname : 'direct'),
      medium: params.get('utm_medium') || '',
      campaign: params.get('utm_campaign') || '',
      keyword: params.get('utm_term') || params.get('q') || ''
    };
  }

  // Populate dynamic DOM fields from SITE_CONFIG
  function syncDomWithConfig() {
    if (!window.SITE_CONFIG) return;
    const { business, services, faqs } = window.SITE_CONFIG;

    // Update Text Elements
    document.querySelectorAll('[data-bind]').forEach(el => {
      const key = el.getAttribute('data-bind');
      if (business[key]) {
        el.textContent = business[key];
      }
    });

    // Update Links (phone, email)
    document.querySelectorAll('[data-bind-href]').forEach(el => {
      const key = el.getAttribute('data-bind-href');
      if (key === 'phone') {
        el.setAttribute('href', `tel:${business.phoneDisplay.replace(/\s+/g, '')}`);
      } else if (key === 'email') {
        el.setAttribute('href', `mailto:${business.contactEmail}`);
      }
    });

    // Render Services Grid if container exists
    const servicesContainer = document.getElementById('services-grid');
    if (servicesContainer && Array.isArray(services) && services.length > 0) {
      servicesContainer.innerHTML = services.map(s => `
        <div class="card service-card ${s.highlighted ? 'highlighted' : ''}">
          ${s.badge ? `<div class="badge-card">${s.badge}</div>` : ''}
          <div class="service-icon">${s.icon || '💼'}</div>
          <h3>${s.title}</h3>
          <div class="service-price">${s.price}</div>
          <p>${s.desc}</p>
          <button class="btn ${s.highlighted ? 'btn-primary' : 'btn-outline'} btn-block wa-trigger" data-intent="${s.intent || s.title}">
            Book ${s.title}
          </button>
        </div>
      `).join('');
    }

    // Render FAQ Accordion if container exists
    const faqsContainer = document.getElementById('faqs-grid');
    if (faqsContainer && Array.isArray(faqs) && faqs.length > 0) {
      faqsContainer.innerHTML = faqs.map((f, i) => `
        <details class="faq-item" ${i === 0 ? 'open' : ''}>
          <summary class="faq-question">
            ${f.q}
          </summary>
          <div class="faq-answer">
            ${f.a}
          </div>
        </details>
      `).join('');
    }
  }

  // Save Lead Redundantly (Local Cache & Optional GitHub Issues / Webhook)
  async function logLeadAsync(payload) {
    try {
      // 1. Local Cache
      const leads = JSON.parse(localStorage.getItem('cached_leads') || '[]');
      leads.push({ ...payload, timestamp: new Date().toISOString() });
      localStorage.setItem('cached_leads', JSON.stringify(leads));

      // 2. Dispatch to GitHub Issues if configured
      const cfg = window.SITE_CONFIG?.business;
      if (cfg?.leadRepo && cfg?.leadToken) {
        const title = `[Lead] ${payload.name} — ${payload.phone} (${payload.intent})`;
        const body = [
          `**Business:** ${cfg.name}`,
          `**Name:** ${payload.name}`,
          `**Phone:** ${payload.phone}`,
          `**Intent:** ${payload.intent}`,
          `**Source:** ${payload.source?.source || 'direct'}`,
          `**Campaign:** ${payload.source?.campaign || 'none'}`,
          `**Page URL:** ${window.location.href}`,
          `**Timestamp:** ${new Date().toISOString()}`
        ].join('\n');

        await fetch(`https://api.github.com/repos/${cfg.leadRepo}/issues`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${cfg.leadToken}`,
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title, body, labels: ['Lead', cfg.name] })
        });
      }
    } catch (err) {
      console.warn('[Lead Engine] Redundant backup notification:', err);
    }
  }

  // Route to WhatsApp with Pre-filled Intent & Attribution
  window.redirectToWhatsApp = function (name, phone, intent) {
    const cfg = window.SITE_CONFIG ? window.SITE_CONFIG.business : {
      name: "Service Team",
      whatsappNumber: "919876543210"
    };

    const sourceInfo = getTrafficSource();
    
    // Construct WhatsApp message
    let message = `Hi ${cfg.name},\n`;
    if (name) message += `My name is *${name}*.\n`;
    message += `I want to inquire about: *${intent || currentIntent}*.\n`;
    if (phone) message += `My contact: ${phone}\n`;
    if (sourceInfo.source && sourceInfo.source !== 'direct') {
      message += `(Ref: ${sourceInfo.source} - ${sourceInfo.campaign || 'landing'})\n`;
    }

    const waUrl = `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = waUrl;
  };

  // Open Lead Modal
  window.openWaModal = function (intent) {
    currentIntent = intent || 'Direct WhatsApp Connect';
    const modal = document.getElementById('wa-modal');
    if (modal) {
      modal.removeAttribute('hidden');
      document.body.style.overflow = 'hidden';
      const nameInput = document.getElementById('modal-name');
      if (nameInput) setTimeout(() => nameInput.focus(), 100);
    }
  };

  // Close Lead Modal
  window.closeWaModal = function () {
    const modal = document.getElementById('wa-modal');
    if (modal) {
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }
  };

  // Handle Form Submission from Modal
  window.handleModalSubmit = function (event) {
    event.preventDefault();
    const name = document.getElementById('modal-name')?.value.trim();
    const phone = document.getElementById('modal-phone')?.value.trim();

    if (!name || !phone) return;

    const source = getTrafficSource();
    logLeadAsync({ name, phone, intent: currentIntent, source });
    window.closeWaModal();
    window.redirectToWhatsApp(name, phone, currentIntent);
  };

  // Handle Inline Hero Quick Form
  window.handleInlineSubmit = function (event) {
    event.preventDefault();
    const name = document.getElementById('inline-name')?.value.trim();
    const phone = document.getElementById('inline-phone')?.value.trim();
    const selectedService = document.getElementById('inline-service')?.value || 'Quick Estimate';

    if (!name || !phone) return;

    const source = getTrafficSource();
    logLeadAsync({ name, phone, intent: selectedService, source });
    window.redirectToWhatsApp(name, phone, selectedService);
  };

  // Setup Global Event Delegation
  document.addEventListener('DOMContentLoaded', () => {
    syncDomWithConfig();

    // Trigger button clicks (any element with .wa-trigger)
    document.addEventListener('click', (e) => {
      const target = e.target.closest('.wa-trigger');
      if (target) {
        e.preventDefault();
        const intent = target.getAttribute('data-intent') || 'Service Inquiry';
        window.openWaModal(intent);
      }
    });

    // Floating WhatsApp Button
    const waFloat = document.getElementById('wa-float');
    if (waFloat) {
      waFloat.addEventListener('click', (e) => {
        e.preventDefault();
        window.openWaModal('Sticky WhatsApp Floating Button');
      });
    }

    // Modal Overlay click to dismiss
    const modal = document.getElementById('wa-modal');
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) window.closeWaModal();
      });
    }

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') window.closeWaModal();
    });
  });
})();
