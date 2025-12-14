export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  imageUrl: string;
  year: string;
  role: string;
}

export type SectionId = 'home' | 'portfolio' | 'about' | 'contact';