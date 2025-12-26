export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  year: string;
  role: string;
  designAdvisor?: string; // New field for design mentorship
  displaySize?: 'large' | 'medium' | 'small';
  schematicImages?: string[]; // Technical design documentation images
  videoUrl?: string; // Optional YouTube or video link
  videoLabel?: string; // Custom label for the video section
  videoPosition?: 'before' | 'after'; // Whether to show video before or after schematics
  downloadUrl?: string; // Optional download link
  externalUrl?: string; // Generic external link (e.g., "View", "Demo")
  externalUrlLabel?: string; // Label for the external link button
}

export type SectionId = 'home' | 'portfolio' | 'about' | 'contact';