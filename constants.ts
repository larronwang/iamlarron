import { Project } from './types';

const LOREM_IPSUM = "This project explores the relationship between digital interfaces and human intuition. Through a rigorous process of iteration and user testing, we arrived at a solution that feels both inevitable and surprising. The design language borrows from brutalist architecture while maintaining the approachability of consumer electronics.";

// Helper to generate a picsum url
const getImg = (id: number, width: number, height: number) => `https://picsum.photos/id/${id}/${width}/${height}`;

export const KEY_PROJECTS: Project[] = [
  {
    id: 'k1',
    title: "Lumina Interface",
    category: "Product Design",
    description: "A next-generation operating system for smart homes.",
    fullDescription: `Lumina represents a paradigm shift in how we interact with our living spaces. ${LOREM_IPSUM}`,
    imageUrl: getImg(10, 1200, 800),
    year: "2024",
    role: "Lead Designer"
  },
  {
    id: 'k2',
    title: "Apex Branding",
    category: "Identity",
    description: "Visual identity for a high-frequency trading firm.",
    fullDescription: `Apex needed a brand that communicated speed, precision, and trust. ${LOREM_IPSUM}`,
    imageUrl: getImg(16, 1200, 800),
    year: "2023",
    role: "Art Director"
  },
  {
    id: 'k3',
    title: "Mono Audio",
    category: "Industrial Design",
    description: "Minimalist high-fidelity headphones.",
    fullDescription: `We stripped away everything non-essential to focus purely on sound and comfort. ${LOREM_IPSUM}`,
    imageUrl: getImg(26, 1200, 800),
    year: "2023",
    role: "Product Designer"
  },
  {
    id: 'k4',
    title: "Orbit App",
    category: "Mobile UX",
    description: "Social discovery application for creatives.",
    fullDescription: `Orbit connects artists based on visual compatibility and shared aesthetic values. ${LOREM_IPSUM}`,
    imageUrl: getImg(39, 1200, 800),
    year: "2024",
    role: "UX Researcher"
  }
];

export const MINOR_PROJECTS: Project[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `m${i}`,
  title: `Project ${i + 5}`,
  category: ["Photography", "Web Design", "Illustration", "Motion"][i % 4],
  description: "Experimental visual study.",
  fullDescription: `An exploration of form and function in a limited timeframe. ${LOREM_IPSUM}`,
  imageUrl: getImg(50 + i, 800, 800),
  year: "2022",
  role: "Creator"
}));

export const ALL_PROJECTS = [...KEY_PROJECTS, ...MINOR_PROJECTS];