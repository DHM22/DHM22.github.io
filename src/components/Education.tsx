import { ArrowRight } from 'lucide-react';
import { education } from '../data/education';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

export function Education() {
  const { project } = education;

  return (
    <Section id="education" title="Education">
      <Reveal>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p className="label">{education.authority}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{education.institution}</h3>
            <p className="mt-2 text-fg-2">{education.degree}</p>
            <p className="mt-1 font-mono text-sm text-fg-3">{education.period}</p>
          </div>

          <dl className="grid grid-cols-2 gap-6 md:col-span-6">
            <div>
              <dt className="label">GPA</dt>
              <dd className="mt-1 text-5xl font-semibold tracking-tighter tabular-nums sm:text-6xl">
                {education.gpa}
                <span className="ml-1.5 text-lg font-normal tracking-normal text-fg-3">/ {education.gpaScale}</span>
              </dd>
            </div>
            <div>
              <dt className="label">Honors</dt>
              <dd className="mt-2 text-xl leading-snug font-medium sm:text-2xl">{education.honors}</dd>
            </div>
          </dl>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 border-t border-line pt-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <h4 className="label">Relevant areas</h4>
            <p className="mt-2 max-w-[48ch] leading-relaxed text-fg-2">{education.areas.join(', ')}</p>
          </div>

          {project && (
            <a href={project.href} className="group block md:col-span-6">
              <span className="label block">Graduation project</span>
              <span className="mt-2 flex items-center gap-2 text-lg font-medium text-fg">
                {project.title}
                <ArrowRight
                  className="size-4 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
              <span className="mt-1 block text-fg-2">{project.detail}</span>
            </a>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
