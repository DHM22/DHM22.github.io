import { GraduationCap, Trophy, Users } from 'lucide-react';
import type { Project } from '../types';

/**
 * Featured projects get the large card; the rest go in the grid below, in this order.
 * Projects without a screenshot use generated artwork (`artwork`).
 */
export const projects: Project[] = [
  {
    id: 'harf',
    name: 'Harf',
    subtitle: 'Arabic-Aware LLM Gateway',
    badge: { label: '1st Place, VentureX Hackathon 2026', icon: Trophy, tone: 'gold' },
    description:
      'LLM providers bill per token, and Arabic splits into more tokens than English. Harf sits between apps and LLM providers: it normalizes dialectal Arabic, detects the intent of each request, and routes it along the cheapest safe path: an approved answer, a small model or a large model.',
    metrics: [
      { value: '−36%', label: 'cost, in a 183-question test' },
      { value: '4.92/5', label: 'answer quality (4.94 before)' },
      { value: '29×', label: 'faster on repeat questions' },
    ],
    tech: ['Python', 'NLP', 'LLMs', 'Embeddings', 'OpenAI API'],
    image: {
      src: 'images/projects/harf.webp',
      alt: 'Harf prototype: 183 Arabic questions routed to memory, a small model or a large model, with the cost savings',
      width: 1600,
      height: 1000,
    },
    github: 'https://github.com/DHM22/Harf',
    demo: 'https://harf-venturex.netlify.app',
    note: 'Team of 3',
    featured: true,
  },
  {
    id: 'sukna',
    name: 'Sukna (سُكنى)',
    subtitle: 'Revolving Bridge Fund for Housing Donations',
    badge: { label: '1st Place, Sakanthon 2026', icon: Trophy, tone: 'gold' },
    description:
      "On Jood's housing donation platform, a family only receives its home once the campaign is 100% funded; one real case stalled at 84% over a SAR 16,074 gap. Sukna adds a revolving bridge fund on top of the platform: once a campaign crosses a set threshold, the fund closes the gap so the home is delivered at once, and later donations and installments repay it for the next family.",
    metrics: [
      { value: '42 vs 8', label: 'families housed a year per SAR 1M' },
      { value: '1.17M', label: 'riyals stuck in unfinished campaigns' },
      { value: '0', label: 'new donations needed' },
    ],
    role: 'AI and modeling: case prioritization, the fund-rotation simulation, and the live simulator the judges used on real Jood data.',
    tech: ['Python', 'Financial Modeling', 'Simulation', 'Data Analysis', 'Interactive Prototype'],
    // Replace with a screenshot of the simulator when you have one (see the README)
    artwork: 'fund',
    note: 'Team of 3',
    featured: true,
  },
  {
    id: 'c-sync',
    name: 'C-Sync',
    subtitle: 'AI Trend Agent',
    badge: { label: 'Capstone, team lead', icon: Users },
    description:
      'An agentic AI system that monitors emerging technology trends, verifies information using reliable sources, evaluates relevance to an educational curriculum, and generates prioritized recommendations. An instructor approves every change.',
    metrics: [
      { value: '74 → 29', label: 'signals to cited recommendations' },
      { value: '13', label: 'actionable curriculum updates' },
      { value: '257', label: 'offline tests, zero API calls' },
    ],
    tech: ['Python', 'RAG', 'LLMs', 'Chroma', 'Agentic AI', 'Streamlit', 'Docker'],
    image: {
      src: 'images/projects/c-sync.webp',
      alt: 'C-Sync home screen: 74 signals narrowed to 57 trends, 29 recommendations and 13 actionable changes',
      width: 1600,
      height: 1000,
    },
    github: 'https://github.com/DHM22/C-Sync',
    demo: 'https://c-sync-agentic-ai.streamlit.app/',
    role: 'Team lead: end-to-end pipeline integration, the C-Sync interface and Docker.',
    note: 'SDA × WeCloudData',
    featured: true,
  },
  {
    id: 'diabetic-retinopathy',
    name: 'Diabetic Retinopathy Detection',
    badge: { label: 'Graduation project, team lead', icon: GraduationCap },
    description:
      'CNN-based image classification project for detecting diabetic retinopathy, grading severity from retinal fundus images with preprocessing and augmentation to cope with limited data.',
    tech: ['Python', 'PyTorch', 'CNN', 'Computer Vision'],
    image: {
      src: 'images/projects/diabetic-retinopathy.webp',
      alt: 'Three retinal fundus images labelled No DR, Moderate and Severe',
      width: 1600,
      height: 1000,
    },
    github: 'https://github.com/iignlu/Graduation-Project',
  },
  {
    id: 'vm-lab',
    name: 'VM Lab Management Dashboard',
    description:
      'Web-based dashboard for virtual machine management, IP allocation, utilization monitoring, lifecycle management, alerts, and audit logging.',
    tech: ['JavaScript', 'Networking', 'Virtualization', 'UI/UX'],
  },
];
