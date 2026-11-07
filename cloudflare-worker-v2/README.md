# Nexaion Crawler & Forensic Verification Engine (V2)

An upgraded, standalone Cloudflare Worker engineered for isolated deployment on a new subdomain (such as `audit.nexaion.net`, `beta.crawler.nexaion.net`, or `v2.nexaion.net`).

> 🛡️ **Zero Impact on Production**: This deployment is 100% self-contained and isolated. It does **not** alter, replace, or touch your live `crawler.nexaion.net` worker or D1 database tables.

---

## 🚀 Key Capabilities

### 1. 🏢 For Publishers & App Developers (`/api/audit`)
* **Origin File Forensic Audit**: Crawls and validates `ads.txt` and `app-ads.txt` against IAB Tech Lab 1.1 specs.
* **Programmatic Revenue Loss Estimator**: Calculates take-rate leakage (-3% to -18%) resulting from uncertified lines and unauthorized reseller daisy chains.
* **Clean Manifest Sanitizer**: Generates a deduplicated, sorted, and certified manifest ready for 1-click download.

### 2. ⚡ For Ad Networks & SSPs (`/api/batch-check`)
* **Dual Crawl Modes**:
  * 🌐 **Web**: Automated apex, subdomain, HTTPS, HTTP, and `www.` resolution.
  * 📱 **App**: Scrapes Google Play (`com.*`) and Apple App Store (`id*`) to automatically discover developer domains and fetch `/app-ads.txt`.
* **Live Target Line Linter**: Instant syntax checking for missing fields, invalid relationships (only `DIRECT` or `RESELLER`), or malformed TAG certification hashes.
* **Exact 4-Point Element Verification**:
  * `Domain Found` (Verified only when seller seat is registered under this exchange)
  * `Seller ID Found`
  * `Relationship Match` (DIRECT vs RESELLER)
  * `Certification Authority ID` (TAG verification)
* **Standardized Status Badges**:
  * `FOUND (1:1)` (Green): All 4 elements confirmed.
  * `RELATION MISMATCH` (Amber): Seat exists under this exchange, but relationship is inverted.
  * `NOT FOUND` (Red): Partner seat is missing from the publisher's manifest.
* **1-Click Partner Remediation Outreach**: Generates a pre-formatted email to publisher AdOps teams with the exact missing line and rationale.
* **25-Column CSV Export** (`JOB_CSV_25_HEADER`): 100% compliant with your existing schema and protected against spreadsheet formula injection.

---

## 📦 How to Deploy to a New Subdomain

### Method A: Cloudflare Dashboard (Recommended · 2 Minutes)
1. Log in to the [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Create Worker**.
3. Name your worker: `nexaion-crawler-v2`.
4. Click **Deploy**.
5. Click **Quick Edit** (or Edit Code), select all, paste the contents of `worker.js`, and click **Save and Deploy**.
6. **Assign Subdomain**:
   * Go to **Settings** > **Triggers** > **Custom Domains**.
   * Click **Add Custom Domain**.
   * Type your desired subdomain, e.g., `audit.nexaion.net` or `beta.crawler.nexaion.net`.
   * Cloudflare will automatically provision the DNS record and SSL certificate in seconds!

---

### Method B: Deploy via Wrangler CLI
From your local terminal:
\`\`\`bash
cd cloudflare-worker-v2
npx wrangler deploy
\`\`\`

To test locally:
\`\`\`bash
npx wrangler dev
\`\`\`

---

## 🌐 API Reference

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/` | `GET` | Institutional Dark Web Terminal UI |
| `/health` | `GET` | Health check & edge telemetry status |
| `/api/batch-check` | `POST` | Multi-URL + target lines batch verification |
| `/api/audit` | `POST` | Publisher origin file audit & revenue loss calculation |
| `/api/export-csv` | `POST` | Formats rows into the authoritative 25-column CSV |
