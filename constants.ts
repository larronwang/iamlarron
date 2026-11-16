import { Project } from './types';

const LOREM_IPSUM = "This project explores the relationship between digital interfaces and human intuition. Through a rigorous process of iteration and user testing, we arrived at a solution that feels both inevitable and surprising.";

export const ABOUT_DATA = {
  title: "Human-centeredness matters — it sees people as they truly are, not as perfect models.",
  description: "I am a Digital Media master's student at Georgia Tech with a background in architecture. I combine user research, visual storytelling, and coded prototypes to design interactive experiences across games, web interfaces, and VR/XR.",
  // You can change this URL to any image link you prefer
  imageUrl: "https://i.imgur.com/mzOlKIx.jpeg"
};

const NEW_PROJECTS: Project[] = [
  {
    id: 'l-same-table',
    title: 'Same Table, Next Time?',
    category: 'Expressive Computing · Course Project',
    description: 'An interactive postcard about the memories, small talk, and unspoken feelings shared around a restaurant table.',
    fullDescription: 'I think of eating together as an excuse for conversation and connection. In this p5.js narrative, one table stays in place as guests and their stories come and go: first a family celebrating a daughter’s next step, then the many lives suggested by an empty table.',
    imageUrl: '/projects/same-table/cover-square-original.png',
    year: 'Fall 2026',
    role: 'Designer, Developer, Writer',
    displaySize: 'medium',
    tools: ['JavaScript', 'p5.js', 'Illustration', 'Interactive Narrative'],
    externalUrl: 'https://same-table-next-time.netlify.app',
    externalUrlLabel: 'Experience the story',
    caseStudy: [
      { heading: 'Why a restaurant table?', body: 'My interest in cooking competitions and The Bear got me thinking about restaurants as more than places that serve food. Some of my most important memories happened around a dining table: family celebrations, reunions with old friends, and conversations about life-changing decisions. Sharing a meal can make a moment feel both comfortable and meaningful. Sometimes eating is just the excuse; the real point is the conversation and the time we spend together. That became the idea behind my postcard: people arrive, make memories, and leave, while the table stays for the next story.' },
      { heading: 'A small family story', body: 'For the interactive narrative, I drew inspiration from Modern Family’s humor and warmth in ordinary family life. I wrote a short sitcom about Emma’s family celebrating her acceptance into college at a restaurant they often visit. Her parents are proud and beginning to feel her absence; her younger brother Max is more focused on taking over her room. Near the end, he changes his mind and says she can leave her things there. He never says he will miss her. I wanted the affection to stay understated, as it often does in real families: hidden in jokes, awkward pauses, and everyday sentences.' },
      { heading: 'A postcard with two voices', body: 'The top half of the postcard holds the conversation everyone can hear. Hovering over or clicking a character changes the writing on the back to reveal their private thoughts and a handwritten signature, like a letter they wrote to someone at the table but never sent. Clicking or pressing Space advances the dialogue. These interactions let the audience see the same dinner from different perspectives without turning it into a branching plot. I also replaced the original stamp with a small cake illustration to connect the postcard to the meal.' },
      { heading: 'Turning an illustration into an interaction', body: 'My main design challenge was making a static illustration interactive without losing its visual identity. I kept the top-down composition and stationary table, with blurred figures moving around it. I considered adding more animation, but too much movement would pull attention away from the conversations and weaken the contrast between the table and the busy restaurant. Using the postcard’s own writing area for the unsent letters became the breakthrough: it gave the interaction a narrative purpose without introducing a separate game interface.' },
      { heading: 'Everyday traces as stories', body: 'ListeningCups: A Case of Data Tactility and Data Stories by Audrey Desjardins and Timea Tihanyi (2019) prompted me to think about ordinary objects and personal experience. A scratch on a table, a stain after dinner, a photograph, or a conversation can all feel like traces of someone’s life. My project does not use a dataset; instead, it uses interaction and visual storytelling to imagine a table as a container for memories and ask how many stories one place might hold.' },
      { heading: 'A table after everyone leaves', body: 'After Emma’s family leaves, couples, friends, and other families appear around the same table in a quickening montage. The scenes end with an empty table: this family’s dinner mattered deeply to them, but it was only one ordinary evening in the restaurant. The final postcard exchange returns to the project’s central question: “Same table next time?” “Of course.” “How many times have we said that?” The waiter smiled. “Enough for the table to remember.” I wanted the audience to imagine all the other stories that happened there but were never told.' }
    ],
    schematicImages: ['/projects/same-table/postcard-original.png', '/projects/same-table/interactive-postcard.jpg'],
    imageCaptions: ['The complete original postcard: restaurant illustration and the closing exchange that inspired the project.', 'Interactive p5.js postcard: the shared dinner above and the private writing space below.']
  },
  {
    id: 'l-the-pass',
    title: 'The Pass',
    category: 'Independent Game Prototype',
    description: 'Three tables. Two courses. Four minutes of hospitality.',
    fullDescription: 'A browser-based 3D hospitality game about balancing the mechanics of service with the people at each table. Run the floor alone with an assisted kitchen, or share the service in local co-op.',
    imageUrl: '/projects/the-pass/cover.jpg',
    year: '2026 — Present',
    role: 'Game Designer, Developer',
    status: 'Playable prototype · In development',
    displaySize: 'medium',
    tools: ['JavaScript', 'Three.js', 'Game Systems', 'Spatial Interaction'],
    externalUrl: '/demos/the-pass.html',
    externalUrlLabel: 'Play the browser prototype',
    caseStudy: [
      { heading: 'A complete service loop', body: 'Take orders, fire kitchen tickets, cook, collect plates at the pass, serve both courses, and clear the tables. The prototype compresses this loop into a four-minute service with three tables, making pacing and task order immediately visible.' },
      { heading: 'Listening is a spatial choice', body: 'Guest conversations can only be heard nearby. Moving between kitchen tasks and tables determines which fragments of a conversation the player encounters, bringing environmental storytelling into the service loop.' },
      { heading: 'Care alongside efficiency', body: 'Players can check in, pour water, and offer a small card. Guest-specific reviews respond to completed service, food quality, and pacing rather than rewarding repetitive gestures. Solo and same-keyboard co-op modes test different divisions of responsibility.' },
      { heading: 'Prototype scope', body: 'This version uses primitive 3D geometry, fixed guests, and text dialogue to explore the core systems. It is an in-development prototype, not a finished commercial release; the demo requires a desktop browser with WebGL.' }
    ],
    schematicImages: ['/projects/the-pass/service.jpg'],
    imageCaptions: ['The playable prototype: a shared restaurant floor, contextual service actions, and kitchen tickets.']
  },
  {
    id: 'l-classroom',
    title: 'Question Parking Lot',
    category: 'Georgia Tech CS 6750 HCI · Group Project',
    description: 'Bookmark a confusing moment now. Ask about it when you are ready.',
    fullDescription: 'A classroom tool for questions students do not ask in the moment. During a lecture, one click saves the current slide and time. After class, students return to that moment, write a question when they can say what they need, and choose to keep it private, share it anonymously, or share it with their name. Each shared question becomes a car in a parking lot sorted by topic, where the instructor reviews the questions and publishes a response. I came up with the concept, interviewed five education professors, and designed and built the Figma prototype.',
    imageUrl: '/projects/hci/cover-d3-parking-lot.png',
    year: 'September 2026 — Present',
    role: 'Concept, Research & Prototype Lead',
    status: 'Low-fidelity prototype · Evaluated · In progress',
    displaySize: 'medium',
    tools: ['Observation', 'Interviews', 'Expert Interviews', 'Figma Prototyping', 'Service Blueprint', 'Heuristic Evaluation'],
    externalUrl: '/case-studies/question-parking-lot.html',
    externalUrlLabel: 'Read the full case study',
    caseStudy: [
      { heading: 'My role', body: 'This was a four-person team project. I came up with the Question Parking Lot concept. In D1 I ran classroom observations and student interviews; in D2 I ran the brainstorming and wrote the proposal. After D2 I interviewed five education professors on my own, and for D3 I designed and built the whole Figma prototype: three hubs and about 40 overlays. I also ran one of the four evaluations, a heuristic review of lecture setup, checkpoint planning, the review reminder and the bookmark drawer. Teammates ran further D1 research, made the affinity diagram and journey map, and ran the other three evaluations.' },
      { heading: 'Quiet does not mean disengaged', body: 'Our classroom research found that participation included note-taking, private thinking, peer discussion, and questions after class. Students stayed quiet for three reasons: asking in front of others felt risky, they often knew they were lost before they could say where, and the lecture moved on before they could ask. In one observed class, the professor asked “Any questions?” and moved to the next slide almost at once. The goal was not more questions, but an easier way for students to ask and for instructors to respond.' },
      { heading: 'What the professors told me', body: 'Our D2 concept asked students to tap “I understand” or “I have a question” during class, with a traffic light that alerted the instructor when confusion passed a threshold. I then interviewed five education professors. An educational psychologist framed engagement around competence, value, belonging and autonomy, and pointed out that students often cannot form a question in the moment, that questions saved for later are forgotten unless review is part of the course, and that students stop using a tool if nothing visibly happens. I traced each recommendation to a screen before building, and deferred a few that needed usability results first.' },
      { heading: 'Save now, ask later', body: 'D3 separates capture from asking. During class, “Bookmark this moment” saves the slide and time with one click and no typing. At the end of class, a reminder shows how many moments were saved and roughly how long review will take. Students then pick the kind of help they need, draft the question with optional AI help that never replaces their wording, and only then choose who can see it. The live red/green alert was removed; instead the instructor plans short checkpoints and decides when to pause.' },
      { heading: 'Who can see this question?', body: 'Every sharing option is described by what the instructor and classmates will actually see. A private draft stays with the student and creates no car. An anonymous question shows the instructor the question and slide but not the name; a named question shows the name to the instructor only. Classmates see topic totals and statuses, never the text. Instructors see bookmarks only as opt-in counts in a time window, never one student’s timestamps.' },
      { heading: 'The instructor stays in control', body: 'Instructors prepare the lecture with one or two labeled example questions, so no student has to post first, and plan checkpoints at slide boundaries. After class they see bookmarks, questions and topics as separate counts, not comprehension scores. They review AI-suggested groups beside the students’ original wording, edit or split them, and preview a reply before publishing it. Students then see Answered, but only the student can mark a question resolved, after choosing a next step such as practice, another example, or office hours.' },
      { heading: 'Building and checking the prototype', body: 'I built the prototype from a 16-screen specification as three 1440 × 900 hubs with overlays, so no flow leaves its workspace, plus launcher buttons that reset the state for each of five test tasks. Before evaluation I checked the build against the specification and fixed six issues, including a review prompt that never appeared and example questions that duplicated real student questions.' },
      { heading: 'What the evaluation found', body: 'The team ran two cognitive walkthroughs and two heuristic evaluations and ranked 17 findings on Nielsen’s 0–4 scale. One-click bookmarking and the privacy screen held up. The most serious problem came after an action: confirmations such as “Saved privately” fell below the visible area, and neither students nor instructors were told who would see what they had just shared. My review found that lecture setup did not show whether a checkpoint was scheduled, that “Remind me later” did not say where to resume, and that bookmark cards did not show who could see a linked question.' },
      { heading: 'What comes next', body: 'Labels and confirmations will be fixed first: receipts in view that name the audience, a text list of each student’s own questions beside the lot, and one vocabulary for private drafts and help types. The parking metaphor, the role of AI and anonymous sharing as the default will not change until think-aloud sessions with four to five graduate students and a review-and-respond walkthrough with a TA or instructor. The prototype uses sample data and scripted interactions; it is not a working classroom system.' }
    ],
    schematicImages: ['/projects/hci/d3-parking-lot.png', '/projects/hci/d3-fig-blueprint.png', '/projects/hci/d3-fig-expert-trace.png', '/projects/hci/d3-fig-d2-vs-d3.png', '/projects/hci/d3-fig-student-flow.png', '/projects/hci/d3-fig-question-states.png', '/projects/hci/d3-fig-privacy.png', '/projects/hci/d3-privacy-choice.png', '/projects/hci/d3-fig-instructor-flow.png', '/projects/hci/d3-instructor-review.png', '/projects/hci/d3-fig-findings.png', '/projects/hci/d3-lecture-bookmark.png', '/projects/hci/d3-bookmarks-drawer.png', '/projects/hci/d3-learning-check.png', '/projects/hci/affinity.png', '/projects/hci/journey-map.png'],
    imageCaptions: ['After class: each shared question is a car, grouped by topic. The student’s own car is outlined; example questions are marked and not counted. Figma prototype with sample data.', 'Service blueprint: what the student, the system and the instructor do from before class to after the reply.', 'Each recommendation from the professors traced to the screen that answers it.', 'What changed between the D2 concept and the D3 prototype.', 'Student flow: one click during class; writing, sharing and follow-up after class.', 'The life of a question. Answered means a reply exists; only the student can mark it resolved.', 'Who sees what for each sharing choice.', 'The sharing screen: each option explains what the instructor and classmates will see.', 'Instructor flow, from lecture setup to a published reply, with sample data.', 'Instructor review: an editable AI-suggested summary beside the students’ original questions.', 'Evaluation findings ranked on Nielsen’s 0–4 severity scale. Yellow rows come from my heuristic review.', 'During class: one click on “Bookmark this moment” saves the slide and time.', 'The end-of-class review reminder and My Bookmarks.', 'After a reply, students choose a next step. Reading an answer does not resolve the question.', 'Team affinity diagram synthesizing D1 observations and interviews.', 'Team journey map: from noticing confusion to resolving or losing a question.']
  }
];

export const LARGE_PROJECTS: Project[] = [
  {
    id: 'l1',
    title: "Auditor's Cut",
    category: "Personal Project",
    description: "A new movie-watching framework.",
    fullDescription: "By leveraging VR, 360° panoramic displays, and eye-tracking technology, I aim to revolutionize traditional viewing experiences. In my project Auditor's Cut, users' real-time unconscious gazes shape the film's narrative, creating a game-like interactive encounter.",
    imageUrl: "https://i.imgur.com/fLbm7Aw.png",
    year: "September 2024-March 2025",
    role: "Programmer, Designer",
    displaySize: 'large',
    videoUrl: "https://i.imgur.com/YkwywXC.mp4", 
    videoLabel: "Demo Testing Video",
    videoPosition: 'after',
    schematicImages: [
      "https://i.imgur.com/R61O79S.jpeg",
      "https://i.imgur.com/iWuoRXj.jpeg",
      "https://i.imgur.com/OqiRfFS.jpeg",
      "https://i.imgur.com/HMYi5m5.jpeg",
      "https://i.imgur.com/ZRvuAbo.jpeg",
      "https://i.imgur.com/3HKVaXq.jpeg"
    ]
  },
  {
    id: 'l2',
    title: "GRUMPIES",
    category: "Personal Project",
    description: "An elevator simulation game.",
    fullDescription: `In GRUMPIES, players take on the role of a building administrator, arranging for passengers to ride the elevator while considering factors such as passengers’ patience, occupations, and interpersonal relationships.`,
    imageUrl: "https://i.imgur.com/usjxY6H.png",
    year: "July - November 2025",
    role: "Programmer, Game Designer, Artist",
    displaySize: 'large',
    videoUrl: "https://i.imgur.com/o2tprTa.mp4",
    videoLabel: "Game Trailer",
    videoPosition: 'before',
    downloadUrl: "https://larronw.itch.io/grumpies",
    schematicImages: [
      "https://i.imgur.com/IaNSXFC.jpeg",
      "https://i.imgur.com/kbOGcHG.jpeg",
      "https://i.imgur.com/dEiGAnK.jpeg",
      "https://i.imgur.com/EpudbM7.jpeg",
      "https://i.imgur.com/af5cum9.jpeg",
      "https://i.imgur.com/nh0vUwO.jpeg"
    ]
  },
  {
    id: 'l3',
    title: "Borderline",
    category: "Course Project",
    description: "A two-player strategy board game.",
    fullDescription: `Borderline is a hidden-placement strategy board game for two players with a border-crossing theme, where one player takes on the role of the smuggler and the other plays as the border patrol, unfolding an intense game of escape and capture.

`,
    imageUrl: "https://i.imgur.com/Nl7zVLz.png",
    year: " March - June 2025",
    role: "Game Designer, Artist",
    displaySize: 'large',
    schematicImages: [
      "https://i.imgur.com/kbOBZOi.jpeg",
      "https://i.imgur.com/7QvL8Oq.png",
      "https://i.imgur.com/RFcydvJ.jpeg",
      "https://i.imgur.com/joYkrPH.jpeg",
      "https://i.imgur.com/s3E8Iu9.jpeg",
      "https://i.imgur.com/l5Nwidf.jpeg"
    ]
  },
  {
    id: 'l4',
    title: "Fermentation for a Harvest Year",
    category: "Group Project (First Author), Award-Winning Work",
    description: "A Sustainable Rural Field Toilet Solution.",
    fullDescription: `This is an innovative approach to address the difficulty of accessing toilets in the rural fields of Northeast China. Utilizing locally abundant straw bales as the primary construction material, it creates an easily disassembled and reusable toilet solution for rural areas.`,
    imageUrl: "https://i.imgur.com/08UY3KU.png",
    year: "June - December 2024",
    role: "Designer, Artist",
    designAdvisor: "Shanchao Xin",
    displaySize: 'large',
    schematicImages: [
      "https://i.imgur.com/Mr4jt2u.jpeg",
      "https://i.imgur.com/JAZcYrU.jpeg",
      "https://i.imgur.com/fRNkdtC.jpeg",
      "https://i.imgur.com/N75EL6f.jpeg",
      "https://i.imgur.com/KL2AiYA.jpeg"
    ]
  }
];

export const MEDIUM_PROJECTS: Project[] = [
  ...NEW_PROJECTS,
  {
    id: 'm1',
    title: "Finder",
    category: "Personal Project",
    description: "A population census software. ",
    fullDescription: `Finder is a software designed to enhance the accuracy of population censuses and foster social connections among similar demographic groups. Tailored for an aging society, it is particularly suitable for elderly populations and also serves to promote social interaction.`,
    imageUrl: "https://i.imgur.com/IwI6SR6.png",
    year: "September - December 2025",
    role: "Programmer, UI/UX Designer",
    displaySize: 'medium',
    externalUrl: "https://finderapp-c2pmdpd0r-larronwangs-projects.vercel.app",
    externalUrlLabel: "view app",
    schematicImages: [
      "https://i.imgur.com/P1MijqJ.jpeg",
      "https://i.imgur.com/1YqHduW.jpeg"
    ]
  },
  {
    id: 'm2',
    title: "E/R City Lounge",
    category: "Course Project",
    description: "A Large-Scale Architectural Design Integrating Commerce and Culture.",
    fullDescription: `E/R stands for Extension and Reception. The project is situated along the Haihe River in Tianjin, serving as both an extension of the riverside facade and an urban "living room," embodying a welcoming and hospitable role for the city.`,
    imageUrl: "https://i.imgur.com/2Od82Kz.png",
    year: "March - June 2024",
    role: "Designer",
    displaySize: 'medium',
    schematicImages: [
      "https://i.imgur.com/3H5Pb2S.jpeg",
      "https://i.imgur.com/0tq1ue6.jpeg"
    ]
  },
  {
    id: 'm3',
    title: "Real-Life Onsen Retreat",
    category: "Award-Winning Work",
    description: "A Hot Spring Center Translated Through Cinema.",
    fullDescription: `This design interprets the core theme of the film "The Butterfly Effect"—that a small choice can lead to vastly different outcomes—into the spatial experience of a hot spring center, creating a labyrinthine sense of branching paths. Simultaneously, it provides a relaxing bathing sanctuary for the migrant population working in Beijing.`,
    imageUrl: "https://i.imgur.com/uC0QQVX.png",
    year: "November - December 2023",
    role: "Designer",
    designAdvisor: "Ying Zou",
    displaySize: 'medium',
    schematicImages: [
      "https://i.imgur.com/q4rFMGV.jpeg"
    ]
  },
  {
    id: 'm4',
    title: "3DCP Bridge",
    category: "Group Project, Course Project",
    description: "An experimental construction of an optimized 3DCP bridge.",
    fullDescription: `A Digitally-Designed, Segmented 3D-Printed Concrete Bridge Assembled Without Internal Steel Reinforcement. Through computational design, the form, thickness, handrails, and internal support of the bridge have been iteratively optimized.`,
    imageUrl: "https://i.imgur.com/aDQx5Xh.png",
    year: "March - June 2025",
    role: "Designer",
    designAdvisor: "Xuehai Bai，Ye Zhang",
    displaySize: 'medium',
    schematicImages: [
      "https://i.imgur.com/VuOzNbo.jpeg"
    ]
  }
];

export const SMALL_PROJECTS: Project[] = [
  {
    id: 's0',
    title: "Return to the North: Virtual Archaeology of Electronic Orbits",
    category: "Group Work",
    description: "VR/XR-Based Interactive Virtual Narrative Space",
    fullDescription: "Participated in the exhibition design for Return to the North: Virtual Archaeology of Electronic Orbits (SIGGRAPH Exhibition), assisting the team in creating models for the exhibition videos.",
    imageUrl: "https://i.imgur.com/wMOeRcK.jpeg",
    year: "July - October 2025",
    role: "3D Modeler",
    designAdvisor: "Yin Bing",
    displaySize: 'small',
    schematicImages: [
      "https://i.imgur.com/keQZ0sW.png",
      "https://i.imgur.com/aTUKwip.jpeg"
    ]
  },
  {
    id: 's1',
    title: "City Bookcase",
    category: "Course Project，Award-Winning Work",
    description: "A Second-hand Bookstore Design Centered on the Reconstruction of an Ancient Pagoda.",
    fullDescription: "City Bookcase is a second-hand bookstore built around the reconstruction of Beijing's Wansong Laoren Pagoda, aiming to recreate the ambiance of a traditional second-hand bookshop through the simplest spatial arrangement.",
    imageUrl: "https://i.imgur.com/i4iL3rp.jpeg",
    year: "March - May 2023",
    role: "Designer",
    designAdvisor: "Xinnan Zhang",
    displaySize: 'small',
    schematicImages: [
      "https://i.imgur.com/Jo2bhIb.png",
      "https://i.imgur.com/RlqbNkn.jpeg"
    ]
  },
  {
    id: 's2',
    title: "Boundless",
    category: "Group Project (First Author)，Course Project",
    description: "Design for the Cultural Center of Xianju, Zhejiang.",
    fullDescription: "This is a large-scale cultural center project. The Boundless scheme employs undulating floor slabs to create an urban plaza, dissolving the boundaries between the building and the street as well as the vertical spatial divisions within the structure itself.",
    imageUrl: "https://i.imgur.com/3Dg4C6G.png",
    year: "September - December 2024",
    role: "Designer",
    designAdvisor: "Kai Zhou， Xinnan Zhang",
    displaySize: 'small',
    schematicImages: [
      "https://i.imgur.com/Z970pde.png",
      "https://i.imgur.com/7rZE8yt.png",
      "https://i.imgur.com/w7hJ7fB.png",
      "https://i.imgur.com/HhigEQq.png"
    ]
  },
  {
    id: 's3',
    title: "X-Factor",
    category: "Group Project (First Author)，Course Project",
    description: "A Mobile Toilet for Rural Markets.",
    fullDescription: "X-Factor is a foldable, mobile toilet designed for rural markets. Its interior is divided into two halves: one serves as the toilet space, while the other functions as a vending stall. The exterior cladding can be unfolded to create a display wall for merchandise.",
    imageUrl: "https://i.imgur.com/bCMw2fj.png",
    year: "June 2024",
    role: "Designer",
    designAdvisor: "Shanchao Xin",
    displaySize: 'small',
    schematicImages: [
      "https://i.imgur.com/qOWQpV5.png",
      "https://i.imgur.com/ykOJXhP.png",
      "https://i.imgur.com/nD8QsU2.png"
    ]
  },
  {
    id: 's4',
    title: "Duchamp Art Center",
    category: "Course Project",
    description: "A Customized Art Center Design.",
    fullDescription: "Taking the anti-artistic and rebellious nature of artist Duchamp as a conceptual thread, this scheme translates the core of his art into architectural form to design a medium-sized art center dedicated to exhibiting his works.",
    imageUrl: "https://i.imgur.com/HtGwVgk.png",
    year: "September - November 2023",
    role: "Designer",
    designAdvisor: "Di Wang",
    displaySize: 'small',
    schematicImages: [
      "https://i.imgur.com/zOdjfAC.jpeg",
      "https://i.imgur.com/StNyy8f.png",
      "https://i.imgur.com/1gxqAC3.png"
    ]
  },
  {
    id: 's5',
    title: "The Stratagem of the Empty City",
    category: "Course Project",
    description: "International Student Apartment Design.",
    fullDescription: "With the imagery of a Walled City as its concept, this scheme features a sunken plaza as the entry point and a central entertainment hub block, creating an integrated apartment building designed for international students that combines living and recreational functions.",
    imageUrl: "https://i.imgur.com/N6Tpb0J.jpeg",
    year: "May - June 2023",
    role: "Designer",
    designAdvisor: "Jun Ren",
    displaySize: 'small',
    schematicImages: [
      "https://i.imgur.com/NUdl02d.jpeg"
    ]
  }
];

export const ALL_PROJECTS = [...LARGE_PROJECTS, ...MEDIUM_PROJECTS, ...SMALL_PROJECTS];
export const KEY_PROJECTS = LARGE_PROJECTS;
export const MINOR_PROJECTS = [...MEDIUM_PROJECTS, ...SMALL_PROJECTS];
