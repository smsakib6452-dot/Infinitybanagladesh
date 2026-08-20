# Infinity Bangladesh — Official Digital Platform
> **Team Identity:** Team Infinity  
> **Tagline:** United for Humanity  
> **Organization:** Infinity Bangladesh  
> **Country:** Bangladesh  
> **Official Facebook:** [https://www.facebook.com/infinitybangladesh](https://www.facebook.com/infinitybangladesh)

---

## 🌟 1. Overview & Organizational Integrity

**Infinity Bangladesh (Team Infinity — United for Humanity)** is a youth-driven, non-profit social and humanitarian volunteer organization working for child welfare, emergency flood & winter relief, education support, and community dignity across Bangladesh.

### Strict Fact Verification Policy (Rule #1 Compliance)
This digital platform is constructed in strict adherence to truth in reporting:
- **No invented or fabricated information**: Unverified corporate registrations, office phone numbers, bank accounts, or volunteer totals are never hallucinated.
- **Dynamic CMS Placeholders**: Any pending details are clearly marked with `[OFFICIAL INFORMATION REQUIRED]` and are 100% editable from the Admin Management Portal as official documentation becomes available.
- **Official Brand Logo**: The official vector emblem and Facebook brand logo are embedded across headers, footers, mobile drawers, and favicons.

---

## 🏛️ 2. Leadership & Committee Architecture

The platform provides a dynamic, database-backed Committee & Governance System that supports multi-year terms without being locked to any single year:

### A. Executive Committee (e.g. 2026, 2027, 2028+)
- **Visual Tiered Hierarchy**:
  - **Tier 1 (President)**: **#01** Md. Shahidul Alam Sakib (*মোঃ শাহিদুল আলম সাকিব*) — Emerald hero arch card.
  - **Tier 2 (Senior VP & Vice Presidents)**: **#02** Mohammad Ismail (*সিনিয়র সহ-সভাপতি*), **#03** Joinul Abedin (*সহ-সভাপতি*), **#04** Sohel Akram Sobuj (*সহ-সভাপতি*).
  - **Tier 3 (General Secretary)**: **#05** Salimur Rahman Opi (*সাধারণ সম্পাদক*) — Crimson highlight card.
  - **Tier 4 (Joint General Secretaries & Departmental Secretaries)**: **#06 to #27** (*Organizing, Finance, Student Affairs, Publicity, Office, Cultural, Relief & Disaster, Sports, Social Welfare*).
- **Public URL**: `/#/about/executive-committee`

### B. Standing Committee (Permanent Governance Council)
- **Visual Tiered Layout (Matching Official Poster)**:
  - **Tier 1 (Chairman)**: **#01** Sakib Al Karim (*সাকিব আল করিম*)
  - **Tier 2 (Vice-Chairmen)**: **#02** Tamimul Hasib Rimad (*তামীমুল হাসিব রিমাদ*), **#03** Shifat Sattar (*শিফাত সাত্তার*)
  - **Tier 3 (Committee Members)**: **#04** Ishtiaqe Ahmed, **#05** Chaity Debi Piya, **#06** Rakib Ahmed, **#07** Md Ashraful Islam, **#08** Tanveer Haidar Rakib, **#09** Md Arshad.
- **Public URL**: `/#/about/standing-committees`

### C. Past Committees & Historical Archive
- Archives former executive councils (e.g., 2025 Executive Committee) with collapsible member rosters and historical contributions.
- **Public URL**: `/#/about/past-committees`

---

## 🛠️ 3. Technology Stack & Free-First Architecture

The project is built entirely on a **Zero-Cost, Free-First Architecture** requiring **NO paid hosting, NO paid database, NO paid APIs, NO paid email services, and NO paid image storage**:

- **Frontend Core:** React 19 (Strict TypeScript), Vite 6
- **Styling:** Tailwind CSS (Modern semantic tokens, sleek dark modes, responsive cards)
- **Typography:** English (`Plus Jakarta Sans`), Bengali (`Hind Siliguri`, `Noto Sans Bengali`)
- **Database & ORM:** PostgreSQL + Prisma ORM (Prisma schema with relational models and indexes)
- **Icons & Motion:** Lucide React, Motion animations
- **State & Storage:** Unified `DataContext` with instant localStorage persistence, offline JSON backup/restore, and API/Prisma service layers.

---

## 🚀 4. Local Development & Setup

### Prerequisites
- Node.js 18.x, 20.x, or 22.x
- npm or yarn

### Commands
```bash
# 1. Clone the repository
git clone https://github.com/your-username/infinity-bangladesh.git
cd infinity-bangladesh

# 2. Install dependencies
npm install

# 3. Create your local environment file
cp .env.example .env.local

# 4. Start local development server
npm run dev

# 5. Build for production (validates zero TypeScript errors)
npm run build

# 6. Preview production build locally
npm run start
```

Your application will be live at `http://localhost:3000/`.

---

## 🔐 5. Admin Management Portal

- **URL:** `/#/admin` (or click **Admin** in the header / footer)
- **Default Development Passcode:** `admin123` or `infinity2025`
- **16 Complete CMS Modules:**
  1. **Dashboard Overview:** Live metric summaries, quick actions, audit stream.
  2. **Campaigns Manager:** Create, edit, and publish relief drives, packages, and seasonal campaigns.
  3. **Committees & Leadership:** 
     - Add/Edit/Remove members, assign serial numbers (`#01` to `#27`), toggle Homepage Featured status.
     - 1-click **Move Up ⬆️ / Move Down ⬇️** reordering (controlled by `sortOrder`, not alphabetical).
     - Create new committees (e.g. 2027 Executive Committee, Special taskforces).
     - Custom Position Creator with 5 hierarchy levels.
  4. **Volunteers:** Review applicants across Bangladesh districts, change status (`New`, `Reviewing`, `Approved`, `Contacted`, `Rejected`), and export to CSV.
  5. **Donations:** Record manual offline donations, generate printable PDF-style receipts, and audit transaction IDs.
  6. **Stories:** Publish consent-grounded humanitarian impact stories.
  7. **News & Updates:** Organization press releases and announcements.
  8. **Events:** Volunteer orientations, relief packing workshops, and meetups.
  9. **Photo Gallery:** Upload field photography with captions and lightbox.
  10. **Video Archive:** YouTube & Facebook video player embeddings.
  11. **Transparency Reports:** Publish PDF audit reports and zero-leakage distribution sheets.
  12. **Partners:** Institutional collaborators and CSR partner directory.
  13. **Messages:** Contact form inbox with Read/Unread tracking.
  14. **Impact Metrics:** Verified beneficiaries, active volunteers, districts covered, and campaigns count.
  15. **Site & SEO Settings:** Edit brand metadata, social links, announcement banner, and contact details.
  16. **Backup & Restore:** 1-click JSON export/import of the entire database state.

---

## 🌐 6. Free Vercel Deployment Guide (Step-by-Step)

Follow these steps to deploy the website for free on Vercel:

### Step 1: Create a GitHub Repository
1. Go to [github.com/new](https://github.com/new).
2. Name your repository `infinity-bangladesh`.
3. Keep it **Public** or **Private** and click **Create repository**.

### Step 2: Push the Code to GitHub
```bash
git init
git add .
git commit -m "feat: complete production-ready Infinity Bangladesh platform"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/infinity-bangladesh.git
git push -u origin main
```

### Step 3: Create a Free Vercel Account
1. Visit [vercel.com/signup](https://vercel.com/signup).
2. Sign up for free using your GitHub account.

### Step 4: Import the GitHub Repository into Vercel
1. In your Vercel Dashboard, click **Add New...** &rarr; **Project**.
2. Select `infinity-bangladesh` from your GitHub repository list.

### Step 5: Configure Build Settings
Vercel will automatically detect Vite:
- **Framework Preset:** Vite
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Step 6: Configure Free PostgreSQL Database (Optional for Cloud DB)
You can use any free PostgreSQL database:
- **Neon** ([neon.tech](https://neon.tech)) — Free serverless PostgreSQL (No credit card required).
- **Supabase** ([supabase.com](https://supabase.com)) — Free tier PostgreSQL (No credit card required).
- Add `DATABASE_URL` into Vercel **Environment Variables**.

### Step 7: Deploy
Click **Deploy**. Vercel will build the project in under 30 seconds.

### Step 8: Open Your Live Website
Once deployed, Vercel will provide your live URL (e.g. `https://infinity-bangladesh.vercel.app`). No custom domain or paid services required!

---

## 📄 7. License & Code of Conduct
Developed for **Infinity Bangladesh**.  
All rights reserved © 2026. **Team Infinity — United for Humanity**.
