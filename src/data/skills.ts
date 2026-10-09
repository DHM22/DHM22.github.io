import { Brain, Building, CodeXml, Database, Terminal, Wrench } from 'lucide-react';
import type { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    title: 'Programming',
    icon: Terminal,
    skills: ['Python', 'Java', 'JavaScript', 'SQL', 'HTML/CSS'],
  },
  {
    title: 'AI & Machine Learning',
    icon: Brain,
    skills: ['PyTorch', 'Deep Learning', 'CNN', 'NLP', 'RAG', 'LLMs', 'Machine Learning', 'LangChain', 'Agentic AI'],
  },
  {
    title: 'Software Engineering',
    icon: CodeXml,
    skills: ['React', 'Flask', 'REST APIs', 'Git', 'System Integration', 'FastAPI', 'Docker'],
  },
  {
    title: 'Data',
    icon: Database,
    skills: ['SQL', 'Excel', 'Data Analysis', 'Data Visualization', 'Financial Modeling', 'Simulation'],
  },
  {
    title: 'Enterprise Technology',
    icon: Building,
    skills: ['ServiceNow', 'BizTalk', 'Azure Logic Apps', 'LIMS', 'ITIL'],
  },
  {
    title: 'Tools',
    icon: Wrench,
    skills: ['GitHub', 'Jupyter', 'Linux', 'VS Code'],
  },
];
