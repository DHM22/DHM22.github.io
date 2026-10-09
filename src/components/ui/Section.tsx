import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  /** Two-digit section number, shown in the eyebrow */
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
}

/** Page section with the shared numbered header. */
export function Section({ id, index, eyebrow, title, description, children, className }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('section-divider relative py-24 sm:py-28', className)}>
      <div className="container-page">
        <Reveal className="mb-12 max-w-2xl sm:mb-14">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent">{index}</span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            <span>{eyebrow}</span>
          </p>
          <h2 id={`${id}-title`} className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          {description && <p className="mt-4 text-base leading-relaxed text-pretty text-fg-2 sm:text-lg">{description}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
