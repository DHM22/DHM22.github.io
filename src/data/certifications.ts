import { Brain, ChartColumn, Cloud, Lock, ShieldCheck } from 'lucide-react';
import type { Certification } from '../types';

/** Add `date` and `url` (link to the credential) as you have them. Missing ones are hidden on the live site. */
export const certifications: Certification[] = [
  {
    name: 'Google Data Analytics',
    issuer: 'Google',
    detail: 'Professional Certificate',
    icon: ChartColumn,
  },
  {
    name: 'Machine Learning',
    issuer: 'DeepLearning.AI and Stanford University',
    icon: Brain,
  },
  {
    name: 'ISC2 SSCP',
    issuer: 'ISC2',
    detail: 'Systems Security Certified Practitioner',
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
