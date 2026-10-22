# ⚡ 10-Minute Lead Generation Launch Blueprint

This repository is a production-grade, zero-build starter template for launching niche service businesses that capture leads on WhatsApp and route custom domain emails freely to Gmail.

🌐 **Live Cloudflare Pages URL:** [https://leadgen-template.pages.dev/](https://leadgen-template.pages.dev/)  
📦 **GitHub Repository:** [https://github.com/utkarshethics/leadgen-template](https://github.com/utkarshethics/leadgen-template)

---

## 🚀 10-Minute Setup SOP

### Step 1: Select Service & Buy Domain on Cloudflare
1. Go to **Cloudflare Dashboard** -> **Domain Registration** -> **Register Domains**.
2. Search your service keyword (e.g. `[service]direct.online`, `[service]care.online`, `[service]rent.online`).
3. Buy the domain at wholesale price (no registrar markup, free WHOIS privacy, auto DNSSEC).

### Step 2: Enable Free Email Routing (Cloudflare -> Gmail)
1. Select the new domain zone in Cloudflare.
2. Go to **Email** -> **Email Routing** -> Click **Get Started**.
3. Add destination address: `yourpersonalemail@gmail.com`. Check your inbox and click the verification link.
4. Set routing rules:
   - `contact@yourdomain.com` -> `yourpersonalemail@gmail.com`
   - `leads@yourdomain.com` -> `yourpersonalemail@gmail.com`
   - Catch-all `*@yourdomain.com` -> `yourpersonalemail@gmail.com`
5. Click **Add records automatically** (Cloudflare auto-injects MX & SPF TXT records).

### Step 3: Configure Your Business in `site.config.js`
Open `site.config.js` and change the business details:
- `name`: Brand name
- `tagline`: Primary value proposition
- `whatsappNumber`: Phone number (e.g. `919876543210`)
- `contactEmail`: `contact@yourdomain.com`
- `services`: Your 3 primary service packages
- `faqs`: 3-4 common questions

> **Note:** The UI elements, phone links, WhatsApp click-to-chat links, and Schema.org local business structures dynamically adapt to this file automatically.

### Step 4: Push to GitHub SCM
```bash
git init
git add .
git commit -m "feat: launch new service leadgen landing page"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_NEW_REPO.git
git push -u origin main
```

### Step 5: Connect to Cloudflare Pages
1. Go to Cloudflare Dashboard -> **Compute (Workers & Pages)** -> **Create application** -> **Pages**.
2. Select **Connect to Git** -> choose your new repository.
3. Build Settings:
   - Framework preset: `None`
   - Build command: *(leave empty)*
   - Build output directory: `/`
4. Click **Save and Deploy**.

### Step 6: Bind Custom Domain
1. In Cloudflare Pages project settings -> **Custom Domains** -> **Set up a custom domain**.
2. Enter `yourdomain.com` and `www.yourdomain.com`.
3. Cloudflare automatically configures DNS and issues universal SSL certificates within 60 seconds.

---

## 🛠️ Verification Checklist
- [ ] Visit `https://yourdomain.com` (SSL 200 OK)
- [ ] Tap WhatsApp button -> Confirm lead modal appears -> Submit -> Confirm WhatsApp opens with encoded name & intent.
- [ ] Send test email to `contact@yourdomain.com` -> Confirm delivery in Gmail inbox within 15 seconds.
