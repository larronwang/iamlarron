# New portfolio projects

This update adds Same Table, Next Time?, The Pass, and Classroom Participation to the existing 3D project deck and detail layout. All original project entries and their remote media URLs remain unchanged.

## Content and assets

- Same Table: author-provided Expressive Computing write-up and original postcard illustration; screenshots of the live p5.js experience at https://same-table-next-time.netlify.app. This is a perspective-based linear narrative, not a branching story.
- The Pass: existing author-owned, self-contained browser prototype and its README; screenshots from a local browser run. The playable build is served at `/demos/the-pass.html`. Desktop keyboard/WebGL required. No backend or login required.
- Classroom Participation: author-provided HCI D1/D2 reports. Affinity diagram and journey map are team artifacts; the storyboard is a concept scenario. The entry separates personal fieldwork from collaborative work and does not claim deployed AI, Canvas integration, usability results, or learning outcomes.
- Raw interview transcripts and full course PDFs are not published in this repository.

## October 23 media and HCI update

- Same Table uses a lossless square crop of the original dining illustration at its native 724 x 724 pixels. The full postcard is copied directly from the author's 1086 x 1448 PNG, without resizing or JPEG recompression. The detail hero keeps its square proportions independently of the text column, and images link to their original files.
- Classroom Participation is now presented as Question Parking Lot, the selected combined D2 direction: quick green/red feedback, a question-to-car metaphor, proposed topic grouping, and an entrance traffic signal that tells the instructor when to pause.
- The square parking-lot image is an approved AI-assisted interface concept, not a deployed application or a validated MVP. The original team sketch, affinity diagram, journey map, and earlier storyboard remain available as process artifacts. Full submissions and interview materials remain private.

## Existing issues outside this update

During local verification, existing Imgur-hosted images did not load. New project media is hosted in `public/projects/`, but the original project's media service has not been replaced. Confirm old media availability before relying on the whole portfolio for applications.

The contact section now uses the author-requested Georgia Tech email, ywang4823@gatech.edu, and the author's current academic location in Atlanta.

## Checks

Run `pnpm test` and `pnpm build`. Browser verification should cover the three new detail views, image previews, Escape/back navigation, both demo destinations, and mobile layout.
