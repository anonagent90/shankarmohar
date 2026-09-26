# Shankar Mohar — Personal Website

**Domain:** https://shankarmohar.com  
**Stack:** Pure HTML · CSS · Vanilla JavaScript — no build tools required.

---

## Files

```
/
├── index.html        ← Main homepage
├── styles.css        ← All styles
├── script.js         ← All interactions, form logic, animations
├── README.md         ← This file
└── assets/
    └── favicon.svg   ← Site favicon
```

---

## Before You Go Live — 4 Things to Configure

All configuration lives in **one place** at the top of `script.js`:

```js
const SITE_CONFIG = {
  whatsappNumber:  "[INSERT_WHATSAPP_NUMBER]",
  viewPageUrl:     "/work.html",
  formEndpoint:    "[INSERT_FORM_ENDPOINT]",
  formProviderKey: "[INSERT_FORM_PROVIDER_KEY]",
  email:           "info@ShankarMohar.com",
  resumeUrl:       "https://shankar-mycv.pages.dev/"
};
```

### 1. WhatsApp Number

Replace `[INSERT_WHATSAPP_NUMBER]` with your number in international format, **no + or spaces**.

| Format | Example |
|--------|---------|
| India +91 98765 43210 | `"919876543210"` |
| Canada +1 416 555 0100 | `"14165550100"` |

### 2. "Click to View" Page

Replace `"/work.html"` with whatever internal page you build later:

```js
viewPageUrl: "/work.html",       // or /posts.html / /insights.html
```

This one value controls all "Click to View" buttons across the site.

### 3. Form Setup (choose one provider)

The form is designed to work with any static-friendly form service. Pick one:

#### Option A — Formspree (simplest)
1. Go to https://formspree.io and create a free account
2. Create a new form pointing to `info@ShankarMohar.com`
3. Copy your Form ID (e.g., `abcdefgh`)
4. Set: `formEndpoint: "https://formspree.io/f/abcdefgh"`
5. Leave `formProviderKey` as-is (not needed for Formspree)

#### Option B — Web3Forms
1. Go to https://web3forms.com and generate an access key for `info@ShankarMohar.com`
2. Set: `formEndpoint: "https://api.web3forms.com/submit"`
3. Set: `formProviderKey: "YOUR_ACCESS_KEY_HERE"`

#### Option C — Getform
1. Go to https://getform.io and create a form endpoint
2. Set: `formEndpoint: "https://getform.io/f/YOUR_FORM_ID"`

#### Option D — Basin
1. Go to https://usebasin.com and create a form
2. Set: `formEndpoint: "https://usebasin.com/f/YOUR_FORM_ID"`

> **Note:** Until you add a real endpoint, the form works in "dev mode" — it shows the success screen without actually sending email. This lets you test the site locally.

### 4. Email Customization

Update `email:` if your contact address changes. This appears in the footer.

---

## Deployment

### Option A — GitHub Pages (free, recommended)

1. Create a GitHub account at https://github.com
2. Click **New repository** → name it `shankarmohar-website` (or anything)
3. Set visibility to **Public**
4. Upload all files from this folder (drag & drop in the GitHub UI, or use Git)
5. Go to **Settings → Pages**
6. Under **Source**, select `main` branch and `/ (root)` folder → **Save**
7. GitHub gives you a URL like `https://yourusername.github.io/repo-name`
8. Connect your custom domain (next section)

### Option B — Cloudflare Pages (fastest, recommended for custom domain)

1. Go to https://pages.cloudflare.com
2. Connect your GitHub repository
3. Build settings: **Framework preset → None**, **Build command → leave blank**, **Output directory → leave blank**
4. Click **Save and Deploy**
5. Add your custom domain under **Custom domains**

### Option C — Netlify

1. Go to https://app.netlify.com
2. Drag and drop the entire project folder onto the Netlify dashboard
3. Netlify gives you a preview URL immediately
4. Add custom domain under **Site settings → Domain management**

### Option D — Vercel

1. Go to https://vercel.com
2. Import your GitHub repository
3. Framework: **Other** (no framework)
4. Deploy — Vercel handles the rest
5. Add custom domain in **Project Settings → Domains**

---

## Connecting ShankarMohar.com

After deploying to any of the above platforms:

### With Cloudflare Pages (easiest)
1. Add your domain to Cloudflare (it becomes your DNS provider)
2. In Cloudflare Pages, add `ShankarMohar.com` as a custom domain
3. Cloudflare handles the DNS records automatically

### With GitHub Pages
1. In your domain registrar, add these DNS records:
   ```
   Type: A     Name: @    Value: 185.199.108.153
   Type: A     Name: @    Value: 185.199.109.153
   Type: A     Name: @    Value: 185.199.110.153
   Type: A     Name: @    Value: 185.199.111.153
   Type: CNAME Name: www  Value: yourusername.github.io
   ```
2. In GitHub Pages settings, add `ShankarMohar.com` as your custom domain
3. Check **Enforce HTTPS** once the certificate is issued (usually within 24h)

### With Netlify / Vercel
Follow the DNS instructions provided in each platform's custom domain setup — they show you the exact records to add.

---

## Future Pages

When you create additional pages (e.g., `/work.html`), just add the file to your repository and update `viewPageUrl` in `SITE_CONFIG`.

Planned pages:
- `/work.html` — Case studies / selected projects
- `/posts.html` — Articles / insights
- `/insights.html` — Performance marketing thinking

---

## Making Updates

- **Content:** Edit `index.html` (sections are clearly commented)
- **Styles:** Edit `styles.css` (organised by component)
- **Config / behavior:** Edit the `SITE_CONFIG` block at the top of `script.js`
- **Colors:** Change CSS variables in the `:root` block at the top of `styles.css`

---

## Local Testing

Open `index.html` directly in any browser. No server required.

> **Form note:** The form will show the success screen locally (dev mode) but won't actually send email until you configure a real `formEndpoint`.

---

Built for **ShankarMohar.com** · Your Paid Media Pro
