
export interface Project {
  id: string;
  title: string;
  type: 'Product Design' | 'Animation' | 'Case Study' | 'Creative Production';
  platform: 'Medium' | 'YouTube' | 'Web' | 'Instagram' | 'Other';
  externalURL: string;
  thumbnailImage: string;
  shortDescription: string;
  featured: boolean;
}

export interface AboutContent {
  bio: string;
  philosophy: string;
  toolStack: Array<{ name: string; logo: string }>;
}

export interface CareerItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: 'Work' | 'Education';
}

export type TabType = 'Home' | 'Projects' | 'About Me';