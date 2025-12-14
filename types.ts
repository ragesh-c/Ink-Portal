
export interface Project {
  id: string;
  title: string;
  type: 'UX' | 'Animation' | 'Case Study';
  platform: 'Medium' | 'YouTube' | 'Web' | 'Other';
  externalURL: string;
  thumbnailImage: string;
  shortDescription: string;
  featured: boolean;
}

export interface AboutContent {
  bio: string;
  philosophy: string;
  skills: Array<{ subject: string; A: number; fullMark: number }>; // For Recharts
  toolStack: Array<{ name: string; logo: string }>;
}

export type TabType = 'Home' | 'Projects' | 'About Me';

export interface VisualConfig {
  themeMode: 'auto' | 'light' | 'dark';
  transitionStyle: 'comicPageFlip';
}
