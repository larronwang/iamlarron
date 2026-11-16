# New portfolio projects

This update adds Same Table, Next Time?, The Pass, and Classroom Participation to the existing 3D project deck and detail layout. All original project entries and their remote media URLs remain unchanged.

## Content and assets

- Same Table: author-provided Expressive Computing write-up and original postcard illustration; screenshots of the live p5.js experience at https://same-table-next-time.netlify.app. This is a perspective-based linear narrative, not a branching story.
- The Pass: existing author-owned, self-contained browser prototype and its README; screenshots from a local browser run. The playable build is served at `/demos/the-pass.html`. Desktop keyboard/WebGL required. No backend or login required.
- Classroom Participation: author-provided HCI D1/D2 reports. Affinity diagram and journey map are team artifacts; the storyboard is a concept scenario. The entry separates personal fieldwork from collaborative work and does not claim deployed AI, Canvas integration, usability results, or learning outcomes.
- Raw interview transcripts and full course PDFs are not published in this repository.

## October 23 media and HCI update

- Same Table uses a lossless square crop of the original dining illustration at its native 724 x 724 pixels. The full postcard is copied directly from the author's 1086 x 1448 PNG, without resizing or JPEG recompression. The detail hero keeps its square proportions independently of the text column, and images link to their original files.
- Question Parking Lot now reflects D3 (Nov 2026): students bookmark a lecture moment in one click, write the question after class, choose private / anonymous / named sharing, and each submitted question becomes a car grouped by topic. The D2 live red/green alert and traffic signal were dropped after interviews with five education professors. Two cognitive walkthroughs and two heuristic evaluations (Yiyang: HE-08 to HE-12) were run; think-aloud testing is next.
- D3 screenshots (`public/projects/hci/d3-*.png`) are taken from the Figma prototype figures in the D3 report and use sample data. Diagram images (`d3-fig-*.png`) are rendered from the full case study page at `public/case-studies/question-parking-lot.html`; edit that page and re-render rather than editing the PNGs.
- Attribution follows the author's account: they came up with the concept, ran D2 brainstorming and wrote the proposal, interviewed the five professors alone, and built the whole Figma prototype; teammates ran three of the four evaluations. Keep the professors anonymous.
- The square parking-lot cover is the earlier D2 AI-assisted interface concept, not a deployed application or a validated MVP. The original team sketch, affinity diagram, journey map, and earlier storyboard remain available as process artifacts. Full submissions and interview materials remain private.

## Existing issues outside this update

During local verification, existing Imgur-hosted images did not load. New project media is hosted in `public/projects/`, but the original project's media service has not been replaced. Confirm old media availability before relying on the whole portfolio for applications.

The contact section now uses the author-requested Georgia Tech email, ywang4823@gatech.edu, and the author's current academic location in Atlanta.

## Checks

Run `pnpm test` and `pnpm build`. Browser verification should cover the three new detail views, image previews, Escape/back navigation, both demo destinations, and mobile layout.
