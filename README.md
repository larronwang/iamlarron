<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

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
