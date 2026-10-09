import type { ComponentType } from 'react';

/** Any icon component: lucide icons and the brand icons in components/ui/BrandIcons. */
export type IconType = ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>;

export interface LinkItem {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  role: string;
  focus: string[];
  intro: string;
  location: string;
  availability: string;
  email: string;
  linkedin: string;
  github: string;
  /** File in /public */
  cv: string;
  /** Optional form service URL (Formspree, Web3Forms, …). Empty: the form opens the visitor's email app. */
  contactFormEndpoint: string;
}

export interface Highlight {
  icon: IconType;
  title: string;
  detail: string;
}

export interface Education {
  institution: string;
  authority: string;
  degree: string;
  period: string;
  gpa: string;
  gpaScale: string;
  honors: string;
  areas: string[];
  project?: { title: string; detail: string; href: string };
}

export interface Achievement {
  icon: IconType;
  title: string;
  text: string;
}

export interface Role {
  id: string;
  organization: string;
  title: string;
  period: string;
  icon: IconType;
  badge?: string;
  summary?: string;
  /** Large tiles, used for the featured role */
  achievements?: Achievement[];
  /** Short bullet list, used for compact roles */
  bullets?: string[];
  /** Teams and rotations; the first one is shown as the home team */
  teams?: string[];
  tech: string[];
  link?: LinkItem;
}

export interface SkillGroup {
  title: string;
  icon: IconType;
  skills: string[];
}

export interface ImageAsset {
  /** File in /public */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  tech: string[];
  badge?: { label: string; icon: IconType; tone?: 'accent' | 'gold' };
  metrics?: { value: string; label: string }[];
  /** A screenshot; projects without one get generated artwork */
  image?: ImageAsset;
  artwork?: 'dashboard' | 'fund';
  github?: string;
  demo?: string;
  /** What I did on the project */
  role?: string;
  note?: string;
  /** Featured projects get the large two-column card */
  featured?: boolean;
}

export interface Photo extends ImageAsset {
  caption?: string;
  /** CSS object-position for cropped previews, e.g. '50% 60%' to keep a face and a sign in frame */
  focus?: string;
  /** Dims the photo in the award card so it sits with the dark design. The viewer shows it at full clarity. */
  muted?: boolean;
}

export interface TeamMember {
  name: string;
  role?: string;
  isMe?: boolean;
}

export interface Award {
  id: string;
  placement: string;
  event: string;
  year: string;
  track?: string;
  organizer?: string;
  date?: string;
  prize?: string;
  project: string;
  summary: string;
  description: string[];
  achievement: string;
  /** My part in the project */
  role?: string;
  team?: TeamMember[];
  /** Used when the team members aren't listed by name */
  teamSize?: number;
  links?: LinkItem[];
  photos: Photo[];
  /** Photos still to add. Listed in development only, as a reminder. */
  pendingPhotos?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  icon: IconType;
  date?: string;
  detail?: string;
  url?: string;
}
