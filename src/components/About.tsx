import { aboutParagraphs, facts } from '../data/about';
import { profile } from '../data/profile';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

export function About() {
  const [lead, ...rest] = aboutParagraphs;

  return (
    <Section id="about" title="About">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <p className="text-2xl leading-snug font-medium tracking-tight text-pretty sm:text-3xl">{lead}</p>
          {rest.map((paragraph) => (
            <p key={paragraph} className="mt-6 max-w-[62ch] leading-relaxed text-pretty text-fg-2 sm:text-lg">
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal delay={100} className="lg:col-span-4 lg:col-start-9">
          <dl className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-1">
            {[...facts, { label: 'Based in', value: profile.location }].map((fact) => (
              <div key={fact.label}>
                <dt className="label">{fact.label}</dt>
                <dd className="mt-1 text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}
