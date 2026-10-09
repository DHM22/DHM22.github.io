import {
  BrainCircuit,
  Factory,
  FlaskConical,
  GitCompareArrows,
  LayoutDashboard,
  ListChecks,
  ShieldCheck,
  Workflow,
} from 'lucide-react';
import type { Role } from '../types';

/** Work experience. The first entry is shown as the large featured card. */
export const experience: Role[] = [
  {
    id: 'sadara',
    organization: 'Sadara Chemical Company',
    title: 'IT / Manufacturing Operations Management Co-op',
    period: 'Jan 2026 - May 2026',
    icon: Factory,
    badge: 'Co-op',
    summary:
      'Supported the enterprise applications behind manufacturing operations, combining Python automation and data analysis with system integration, testing and IT service management.',
    achievements: [
      {
        icon: LayoutDashboard,
        title: 'Operational dashboards',
        text: 'Developed and maintained ServiceNow dashboards for operational data.',
      },
      {
        icon: Workflow,
        title: 'Enterprise integration',
        text: 'Supported LIMS, BizTalk, SAP-LIMS and enterprise application integration activities.',
      },
      {
        icon: FlaskConical,
        title: 'System & interface testing',
        text: 'Performed system and interface testing and troubleshooting.',
      },
      {
        icon: GitCompareArrows,
        title: 'Integration modernization',
        text: 'Evaluated BizTalk versus Azure Logic Apps for integration modernization.',
      },
      {
        icon: ListChecks,
        title: 'ITIL processes',
        text: 'Worked with ITIL processes, including incidents, requests, problems and changes.',
      },
      {
        icon: ShieldCheck,
        title: 'Infrastructure & security',
        text: 'Supported vulnerability and endpoint analysis during the Infrastructure and Information Protection rotations.',
      },
    ],
    teams: ['Manufacturing Operations Management', 'Infrastructure', 'Information Protection'],
    tech: ['Python', 'SQL', 'ServiceNow', 'BizTalk', 'Azure', 'LIMS', 'ITIL'],
  },
];

/** Training programs, shown as compact cards under the work experience. */
export const training: Role[] = [
  {
    id: 'sda-wecloud',
    organization: 'SDA × WeCloudData',
    title: 'Agentic AI Engineering Program (Trainee)',
    period: 'Aug 2026 - Sep 2026',
    icon: BrainCircuit,
    badge: 'Remote',
    bullets: [
      'Built agentic AI systems with LangChain and the OpenAI API: tool calling, multi-step orchestration and API integration.',
      'Developed RAG pipelines with FAISS, and evaluated LLM outputs with DeepEval, Ragas and promptfoo.',
      'Packaged agent services with FastAPI and Docker, and led the four-person C-Sync capstone team.',
    ],
    tech: ['LangChain', 'OpenAI API', 'RAG', 'FAISS', 'FastAPI', 'Docker'],
    link: { label: 'See the capstone: C-Sync', href: '#project-c-sync' },
  },
];
