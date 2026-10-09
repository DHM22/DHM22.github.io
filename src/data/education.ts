import type { Education } from '../types';

export const education: Education = {
  institution: 'Jubail Industrial College',
  authority: 'Royal Commission for Jubail & Yanbu',
  degree: 'Bachelor of Science in Computer Science',
  period: '2021 – 2026',
  gpa: '3.67',
  gpaScale: '4.00',
  honors: 'Second Class Honors',
  areas: [
    'Artificial Intelligence',
    'Machine Learning',
    'Software Engineering',
    'Databases',
    'Data Structures',
    'Cybersecurity',
  ],
  project: {
    title: 'Diabetic Retinopathy Detection',
    detail: 'Graduation project, team lead: CNN classification of retinal images',
    href: '#project-diabetic-retinopathy',
  },
};
