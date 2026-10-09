import { skillGroups } from '../data/skills';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

export function Skills() {
  return (
    <Section
      id="skills"
      layout="side"
      title="Skills"
      description="From the languages I write every day to the enterprise platforms I've supported."
    >
      <dl className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
        {skillGroups.map(({ title, skills }, i) => (
          <Reveal key={title} delay={(i % 2) * 80}>
            <dt className="font-medium text-fg">{title}</dt>
            <dd className="mt-2 leading-relaxed text-fg-2">{skills.join(', ')}</dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
