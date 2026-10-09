import { ArrowRight, CalendarDays, GraduationCap } from 'lucide-react';
import { education } from '../data/education';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { TagList } from './ui/Tag';

export function Education() {
  const { project } = education;

  return (
    <Section id="education" index="02" eyebrow="Education" title="Education">
      <Reveal>
        <article className="border-gradient relative overflow-hidden rounded-3xl">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -right-24 size-80 bg-[radial-gradient(closest-side,rgb(110_139_255_/_0.14),transparent)]"
          />
          <div className="relative grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="flex gap-5">
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-line bg-surface-2 text-accent">
                  <GraduationCap className="size-6" aria-hidden />
                </span>
                <div>
                  <p className="text-sm text-fg-3">{education.authority}</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{education.institution}</h3>
                  <p className="mt-2 text-fg-2">{education.degree}</p>
                  <p className="mt-3 inline-flex items-center gap-2 font-mono text-sm text-fg-2">
                    <CalendarDays className="size-4 text-fg-3" aria-hidden />
                    {education.period}
                  </p>
                </div>
              </div>

              <dl className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-line bg-white/[0.02] p-4 sm:p-5">
                  <dt className="eyebrow">GPA</dt>
                  <dd className="mt-2 text-2xl font-semibold tracking-tight tabular-nums sm:text-3xl">
                    {education.gpa}
                    <span className="ml-1 text-base font-normal text-fg-3">/ {education.gpaScale}</span>
                  </dd>
                </div>
                <div className="rounded-2xl border border-line bg-white/[0.02] p-4 sm:p-5">
                  <dt className="eyebrow">Honors</dt>
                  <dd className="mt-2 text-lg leading-snug font-semibold sm:text-xl">{education.honors}</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col">
              <h4 className="eyebrow">Relevant areas</h4>
              <TagList items={education.areas} className="mt-4" />

              {project && (
                <a
                  href={project.href}
                  className="group mt-8 flex items-center justify-between gap-4 rounded-2xl border border-line bg-white/[0.02] p-5 transition-colors hover:border-line-strong hover:bg-white/[0.04] lg:mt-auto"
                >
                  <span>
                    <span className="eyebrow block">Graduation project</span>
                    <span className="mt-2 block font-medium text-fg">{project.title}</span>
                    <span className="mt-1 block text-sm text-fg-3">{project.detail}</span>
                  </span>
                  <ArrowRight
                    className="size-5 shrink-0 text-fg-3 transition-[translate,color] group-hover:translate-x-1 group-hover:text-fg"
                    aria-hidden
                  />
                </a>
              )}
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
