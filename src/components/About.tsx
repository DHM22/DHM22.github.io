import { MapPin } from 'lucide-react';
import { aboutParagraphs, highlights } from '../data/about';
import { profile } from '../data/profile';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

export function About() {
  return (
    <Section id="about" index="01" eyebrow="About" title="About Me">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <div className="space-y-5 text-lg leading-relaxed text-pretty text-fg-2">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-fg-3">
            <MapPin className="size-4" aria-hidden />
            {profile.location}
          </p>
        </Reveal>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
          {highlights.map(({ icon: Icon, title, detail }, i) => (
            <li key={title}>
              <Reveal delay={(i % 4) * 60} className="h-full">
                <div className="h-full rounded-2xl border border-line bg-surface/70 p-4 transition-colors hover:border-line-strong sm:p-5">
                  <span className="grid size-9 place-items-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="size-[18px]" aria-hidden />
                  </span>
                  <p className="mt-4 leading-snug font-medium text-fg">{title}</p>
                  <p className="mt-1 text-sm text-fg-3">{detail}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
