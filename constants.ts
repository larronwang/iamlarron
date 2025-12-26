import { Project } from './types';

const LOREM_IPSUM = "This project explores the relationship between digital interfaces and human intuition. Through a rigorous process of iteration and user testing, we arrived at a solution that feels both inevitable and surprising.";

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