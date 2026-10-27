<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

## Current portfolio — October 27, 2026

- Portfolio address: https://yiyangchewang.vercel.app/
- This domain follows `codex/add-new-portfolio-projects`; updates to this branch refresh that address. The original `main` branch remains separate.
- The current HCI entry is **Question Parking Lot**, with the selected D2 MVP, the team's original sketch, and research artifacts.
- Same Table uses a square crop from the original illustration and the full-resolution original postcard PNG. Cover and gallery images can be enlarged and opened at their original resolution.
- Contact email: **ywang4823@gatech.edu**. The site title, biography, and contact location reflect Yiyang Che Wang's Georgia Tech Digital Media studies in Atlanta.
- The original 14 projects, three added projects, CHE. signature, responsive layout, and default home/gallery scales of 80%/70% are retained.


This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/12ukDR3ljm0gjsWite11KymGG2AppdaWv

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. No API key is required for the current static portfolio.
3. Run the app:
   `npm run dev`

## Portfolio editing guide

- Project descriptions, links and ordering: `constants.ts`.
- Home signature and particle interaction: `components/HeroCanvas.tsx`.
- Default zoom and responsive sizing: `interactionLayout.ts` (`DEFAULT_HOME_ZOOM = 0.8`, `DEFAULT_PORTFOLIO_ZOOM = 0.7`). These multiply the screen-adaptive sizes; clicking a percentage resets to that section's default.
- Portfolio card layout and label sizing: `components/Project3DDeck.tsx`.
- Page sections and navigation: `App.tsx`.
- Local project images: `public/projects/`.

The current changes are on branch `codex/add-new-portfolio-projects` (PR #1). Edit this branch to continue the preview. The `main` branch and production site have not been replaced.

This portfolio is a static React/Vite app and does not currently require a Gemini API key. Run `npm test` and `npm run build` before publishing changes.
