import { Brain, ChartColumn, Cloud, Lock, ShieldCheck } from 'lucide-react';
import type { Certification } from '../types';

/**
 * Add `date`, `credentialId` and `url` (link to the credential) as you have them.
 * Missing ones are hidden on the live site. Dates and IDs are from the LinkedIn profile.
 */
export const certifications: Certification[] = [
  {
    name: 'Google Data Analytics',
    issuer: 'Google',
    detail: 'Professional Certificate',
    date: 'January 2024',
    credentialId: 'DVVGRHWUVPFF',
    icon: ChartColumn,
  },
  {
    name: 'Machine Learning',
    issuer: 'DeepLearning.AI and Stanford University',
    detail: 'Specialization, 3 courses',
    date: 'December 2024',
    credentialId: 'CKGL6F6C16Q7',
    icon: Brain,
  },
  {
    name: 'ISC2 SSCP',
    issuer: 'ISC2',
    detail: 'Systems Security Certified Practitioner',
    date: 'January 2025',
    credentialId: 'YFK8I6NMTWEW',
    icon: ShieldCheck,
  },
  {
    name: 'KAUST-NCA Cybersecurity Training',
    issuer: 'KAUST and the National Cybersecurity Authority',
    detail: '40-hour intensive program',
    date: 'February 2025',
    icon: Lock,
  },
  {
    name: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    icon: Cloud,
  },
];
