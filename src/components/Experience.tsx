import { ArrowRight } from 'lucide-react';
import { experience, training } from '../data/experience';
import type { Role } from '../types';
import { cn } from '../lib/utils';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { TagList } from './ui/Tag';

export function Experience() {
  return (
    <Section
      id="experience"
      index="03"
      eyebrow="Experience"
      title="Experience"
      description="Hands-on work with the enterprise systems, integrations and data behind large-scale manufacturing."
    >
      <div className="space-y-6">
        {experience.map((role) => (
          <FeaturedRole key={role.id} role={role} />
        ))}
      </div>

      {training.length > 0 && (
        <div className="mt-14">
          <h3 className="eyebrow mb-5">Professional training</h3>
          <div className="grid grid-cols-1 gap-6">
            {training.map((role) => (
              <CompactRole key={role.id} role={role} />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}

function RoleHeader({ role, large }: { role: Role; large?: boolean }) {
  const Icon = role.icon;
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="flex gap-4 sm:gap-5">
        <span
          className={cn(
            'grid shrink-0 place-items-center rounded-2xl border border-line bg-surface-2 text-accent',
            large ? 'size-14' : 'size-11',
          )}
        >
          <Icon className={large ? 'size-6' : 'size-5'} aria-hidden />
        </span>
        <div>
          <h3 className={cn('font-semibold tracking-tight', large ? 'text-xl sm:text-2xl' : 'text-lg')}>
            {role.organization}
          </h3>
          <p className={cn('mt-1 text-fg-2', !large && 'text-sm')}>{role.title}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3 md:flex-col md:items-end md:gap-2">
        <span className="font-mono text-sm text-fg-2">{role.period}</span>
        {role.badge && (
          <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-[#b7c4ff]">
            {role.badge}
          </span>
        )}
      </div>
    </div>
  );
}

function FeaturedRole({ role }: { role: Role }) {
  const [homeTeam, ...rotations] = role.teams ?? [];

  return (
    <Reveal>
      <article className="border-gradient relative overflow-hidden rounded-3xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-24 size-96 bg-[radial-gradient(closest-side,rgb(110_139_255_/_0.12),transparent)]"
        />
        <div className="relative border-b border-line p-6 sm:p-8">
          <RoleHeader role={role} large />
          {role.summary && <p className="mt-6 max-w-3xl leading-relaxed text-pretty text-fg-2">{role.summary}</p>}
        </div>

        {role.achievements && (
          <ul className="relative grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
            {role.achievements.map(({ icon: Icon, title, text }) => (
              <li key={title} className="bg-surface p-6 transition-colors hover:bg-surface-2 sm:p-7">
                <span className="grid size-9 place-items-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="size-[18px]" aria-hidden />
                </span>
                <h4 className="mt-4 font-medium text-fg">{title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-2">{text}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="relative grid grid-cols-1 gap-6 border-t border-line p-6 sm:p-8 md:grid-cols-2">
          {homeTeam && (
            <div>
              <h4 className="eyebrow">Team &amp; rotations</h4>
              <ul className="mt-3 flex flex-wrap gap-2 text-sm">
                <li className="rounded-lg border border-accent/30 bg-accent/10 px-3 py-1.5 text-fg">{homeTeam}</li>
                {rotations.map((team) => (
                  <li key={team} className="rounded-lg border border-line px-3 py-1.5 text-fg-2">
                    {team}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h4 className="eyebrow">Technologies</h4>
            <TagList items={role.tech} className="mt-3" />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function CompactRole({ role }: { role: Role }) {
  return (
    <Reveal>
      <article className="rounded-3xl border border-line bg-surface/70 p-6 sm:p-8">
        <RoleHeader role={role} />
        {role.bullets && (
          <ul className="mt-6 space-y-2.5 text-sm leading-relaxed text-fg-2 sm:text-[15px]">
            {role.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                {bullet}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <TagList items={role.tech} />
          {role.link && (
            <a
              href={role.link.href}
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-fg"
            >
              {role.link.label}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </a>
          )}
        </div>
      </article>
    </Reveal>
  );
}
