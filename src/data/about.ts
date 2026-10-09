import { Brain, ChartColumn, CodeXml, Factory, Gauge, GraduationCap, Medal, Trophy } from 'lucide-react';
import type { Highlight } from '../types';

export const aboutParagraphs = [
  "I'm a Computer Science graduate from Jubail Industrial College who enjoys turning data and ideas into working, intelligent software.",
  'My work spans deep learning, LLM and agentic AI systems, software engineering and data analytics: from a CNN that grades diabetic retinopathy to two first-place hackathon projects in 2026, an Arabic-aware LLM gateway at VentureX and a revolving housing fund model at Sakanthon. At Sadara Chemical Company, I worked on the enterprise systems and integrations behind manufacturing operations.',
];

export const highlights: Highlight[] = [
  { icon: GraduationCap, title: 'B.Sc. Computer Science', detail: 'Jubail Industrial College' },
  { icon: Medal, title: 'Second Class Honors', detail: 'Class of 2026' },
  { icon: Gauge, title: 'GPA 3.67 / 4.00', detail: 'Cumulative' },
  { icon: Factory, title: 'Sadara Chemical Company', detail: 'IT co-op, 2026' },
  { icon: Brain, title: 'AI & Deep Learning', detail: 'PyTorch, CNNs, LLMs and RAG' },
  { icon: CodeXml, title: 'Software Engineering', detail: 'React, Flask, REST APIs' },
  { icon: ChartColumn, title: 'Data Analytics', detail: 'SQL, Excel, visualization' },
  { icon: Trophy, title: '2× 1st Place, 2026', detail: 'VentureX and Sakanthon hackathons' },
];
