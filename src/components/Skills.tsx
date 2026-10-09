import { skillGroups } from '../data/skills';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { TagList } from './ui/Tag';

export function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      eyebrow="Skills"
      title="Skills & Technologies"
      description="Grouped by area, from the languages I write every day to the enterprise platforms I've supported."
    >
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map(({ title, icon: Icon, skills }, i) => (
          <li key={title}>
            <Reveal delay={(i % 3) * 70} className="h-full">
              <div className="h-full rounded-2xl border border-line bg-surface/70 p-6 transition-colors hover:border-line-strong">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-lg bg-accent/10 text-accent">
                      <Icon className="size-[18px]" aria-hidden />
                    </span>
                    <h3 className="font-medium">{title}</h3>
                  </div>
                  <span className="font-mono text-xs text-fg-3" aria-label={`${skills.length} skills`}>
                    {String(skills.length).padStart(2, '0')}
                  </span>
                </div>
                <TagList items={skills} className="mt-5" />
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
