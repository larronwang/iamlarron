import { Project } from './types';

const LOREM_IPSUM = "This project explores the relationship between digital interfaces and human intuition. Through a rigorous process of iteration and user testing, we arrived at a solution that feels both inevitable and surprising.";

export const ABOUT_DATA = {
  title: "Human-centeredness matters — it sees people as they truly are, not as perfect models.",
  description: "I am a designer skilled in cross-disciplinary thinking, with rich creativity and outstanding collaborative abilities. I create truly human-centered designs through media such as film, gaming, and architecture.",
  // You can change this URL to any image link you prefer
  imageUrl: "https://i.imgur.com/mzOlKIx.jpeg"
};

const NEW_PROJECTS: Project[] = [
  {
    id: 'l-same-table',
    title: 'Same Table, Next Time?',
    category: 'Expressive Computing · Course Project',
    description: 'An interactive postcard about the words we leave unsaid.',
    fullDescription: 'One restaurant table, one family dinner, and the thoughts that never make it into conversation. This illustrated web narrative turns a postcard into a place to explore the difference between what people say and what they feel.',
    imageUrl: '/projects/same-table/cover.jpg',
    year: 'Fall 2026',
    role: 'Designer, Developer, Writer',
    displaySize: 'medium',
    tools: ['JavaScript', 'p5.js', 'Illustration', 'Interactive Narrative'],
    externalUrl: 'https://same-table-next-time.netlify.app',
    externalUrlLabel: 'Experience the story',
    caseStudy: [
      { heading: 'From postcard to conversation', body: 'The project began with an original illustration of people gathering around a dining table. I developed it into a short family sitcom: Emma is leaving for college, her parents are proud, and her younger brother hides affection behind jokes about taking her room.' },
      { heading: 'Two layers of storytelling', body: 'Speech bubbles carry the shared conversation. Hovering over or clicking a character reveals private thoughts and a handwritten signature in the postcard’s writing area. A click or the Space key advances the dialogue; the interaction offers different perspectives on the same dinner rather than a branching plot.' },
      { heading: 'Designing restraint', body: 'I kept the top-down composition and a stationary table, using limited animation and blurred movement around it. Reusing the postcard’s writing area for unsent letters gave the interaction a narrative purpose without adding a separate game interface.' },
      { heading: 'An ending beyond one family', body: 'After the family leaves, other groups gather and depart in a quickening montage. The final empty table invites the audience to imagine the many ordinary stories that the same place might hold.' }
    ],
    schematicImages: ['/projects/same-table/original-postcard.png', '/projects/same-table/interactive-postcard.jpg'],
    imageCaptions: ['Original postcard illustration: a fixed table within the movement of a restaurant.', 'Playable p5.js version: the dining scene above, the postcard’s private writing space below.']
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
    title: 'Classroom Participation',
    category: 'Georgia Tech HCI · Group Project',
    description: 'Making room for participation beyond raising a hand.',
    fullDescription: 'An ongoing HCI research and design project examining how college students notice confusion, decide whether to speak, and seek help during technical lectures. The design question is not how to make everyone talk more, but how to support different ways of participating.',
    imageUrl: '/projects/hci/storyboard.jpg',
    year: 'September 2026 — Present',
    role: 'Research & Design Team Member',
    status: 'Research synthesis & concept design · In progress',
    displaySize: 'medium',
    tools: ['Observation', 'Interviews', 'Affinity Mapping', 'SCAMPER', 'Storyboarding'],
    caseStudy: [
      { heading: 'My contribution & the team process', body: 'I conducted two 30-minute classroom observations and two student interviews. As part of a four-person team, I contributed to research synthesis, brainstorming, concept refinement, and storyboarding. The affinity diagram and question journey map shown below are collaborative team outputs.' },
      { heading: 'Quiet does not mean disengaged', body: 'Across the team’s research, participation included note-taking, private thinking, peer discussion, and after-class questions. Social exposure, limited thinking time, and the pace of a lecture could make asking a question difficult even when a student wanted clarification.' },
      { heading: 'Four design requirements', body: 'Support different participation formats and timing; reduce social risk and preserve student control; create short, focused moments at natural breaks; and save confusing points in context for useful follow-up. These requirements guided our concepts rather than a target to maximize response counts.' },
      { heading: 'Three alternatives, not one assumed solution', body: 'The team explored a question parking lot with proposed AI topic grouping, Canvas-integrated quick feedback and confidence ratings, and a think-pair-share system. Voting and SCAMPER helped us combine and refine ideas. These are design alternatives, not claims of a deployed Canvas integration or a working AI system.' },
      { heading: 'What remains to be tested', body: 'The current materials document research, synthesis, concepts, and storyboards. Usability and classroom outcomes have not yet been established. The next step is to prototype and evaluate how well the concepts preserve privacy, fit lecture pacing, and help students return to unresolved questions.' }
    ],
    schematicImages: ['/projects/hci/affinity.png', '/projects/hci/journey-map.png', '/projects/hci/storyboard.jpg'],
    imageCaptions: ['Team affinity diagram synthesizing classroom observations and interviews.', 'Team journey map: from noticing confusion to seeking help and resolving or losing a question.', 'Concept storyboard: private feedback and confidence ratings inform an instructor’s natural pause. Illustrative scenario, not an evaluated outcome.']
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
