# SkillBridge — AI-Assisted RPL Assessment Tool

**SIH 2026 — Problem Statement 26242**
AI-Assisted Skill Assessment Tool for Recognition of Prior Learning (RPL)

SkillBridge helps assess workers who have gained skills through practical work, apprenticeships, or informal experience but may not have formal certification. AI assists with skill extraction, qualification mapping, evidence review, and scoring suggestions — but **the authorized assessor always makes the final decision**.

## Run locally

```bash
npm install
npm run dev
```

The app will open at `http://localhost:5173`.

## Build

```bash
npm run build
```

This produces a `dist/` folder you can deploy anywhere.

## Deploy to GitHub Pages

### Step 1 — Configure the base path

Open `vite.config.js` and replace `YOUR-REPOSITORY-NAME` with your actual repository name:

```js
base: '/skillbridge/'
```

### Step 2 — Upload to GitHub

```bash
git init
git add .
git commit -m "Initial SkillBridge MVP"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** → **Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. The included workflow (`.github/workflows/deploy.yml`) will automatically build and deploy on every push to `main`.

Your site will be live at:
```
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/
```

## Tech Stack

- **Frontend:** React + JavaScript + Vite
- **Icons:** lucide-react
- **Data:** Local JSON / localStorage
- **AI:** Demonstration / mock AI assistance layer (no external API)
- **Deployment:** GitHub Pages

## Project Structure

```
src/
  components/    Reusable UI components
  pages/         Main application pages
  data/          Mock data (workers, qualifications, tasks, translations)
  utils/         Scoring, storage, skill extraction helpers
  hooks/         Custom React hooks
  styles/        Global CSS theme
  App.jsx        Main app with routing
  main.jsx       Entry point
```

## Important Note

This is a **prototype MVP**. AI features are simulated using local logic. No real NSQF certification is issued. All assessment decisions are made by human assessors.
