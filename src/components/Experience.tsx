import { ArrowRight } from 'lucide-react';
import { experience, training } from '../data/experience';
import type { Role } from '../types';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { TagList } from './ui/Tag';

export function Experience() {
  const roles = [...experience, ...training];

  return (
    <Section
      id="experience"
      title="Experience"
      description="Enterprise systems and integrations behind large-scale manufacturing, then agentic AI engineering."
    >
      <ol className="space-y-16">
        {roles.map((role) => (
          <li key={role.id}>
            <RoleEntry role={role} />
          </li>
        ))}
      </ol>
    </Section>
  );
}

function RoleEntry({ role }: { role: Role }) {
  const [homeTeam, ...rotations] = role.teams ?? [];

  return (
    <Reveal>
      <article className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3">
          <p className="font-mono text-sm text-fg-2">{role.period}</p>
          {role.badge && <p className="mt-1 text-sm text-fg-3">{role.badge}</p>}
        </div>

        <div className="md:col-span-9">
          <h3 className="text-2xl font-semibold tracking-tight">{role.organization}</h3>
          <p className="mt-1 text-fg-2">{role.title}</p>
          {role.summary && <p className="mt-5 max-w-[65ch] leading-relaxed text-pretty text-fg-2">{role.summary}</p>}

          {role.achievements && (
            <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
              {role.achievements.map(({ title, text }) => (
                <li key={title} className="border-l-2 border-accent/60 pl-4">
                  <h4 className="font-medium text-fg">{title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-fg-2">{text}</p>
                </li>
              ))}
            </ul>
          )}

          {role.bullets && (
            <ul className="mt-5 max-w-[65ch] space-y-2.5 leading-relaxed text-fg-2">
              {role.bullets.map((bullet) => (
                <li key={bullet} className="border-l-2 border-accent/60 pl-4">
                  {bullet}
                </li>
              ))}
            </ul>
          )}

          {homeTeam && (
            <p className="mt-8 text-sm text-fg-2">
              <span className="label mr-2">Teams</span>
              <span className="text-fg">{homeTeam}</span>
              {rotations.length > 0 && <>, with rotations in {rotations.join(' and ')}</>}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <TagList items={role.tech} label="Technologies" />
            {role.link && (
              <a
                href={role.link.href}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent-fg transition-colors hover:text-fg"
              >
                {role.link.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
