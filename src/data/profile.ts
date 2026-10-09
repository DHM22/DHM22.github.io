import type { Profile } from '../types';

export const profile: Profile = {
  name: 'Abdurahman Al-Duraywish',
  role: 'Computer Science Graduate',
  focus: ['AI & Deep Learning', 'Software Engineering', 'Data Analytics'],
  intro:
    'Computer Science graduate passionate about building intelligent solutions through AI, software engineering, and data.',
  location: 'Eastern Province, Saudi Arabia',
  availability: 'Open to opportunities',
  email: 'alduraywish_a@outlook.com',
  linkedin: 'https://www.linkedin.com/in/abdurahman-al-duraywish/',
  github: 'https://github.com/DHM22',
  cv: 'Abdurahman-Al-Duraywish-CV.pdf',
  // Paste a Formspree (https://formspree.io) or similar endpoint here to receive messages directly.
  contactFormEndpoint: '',
};

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'awards', label: 'Awards' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
] as const;
