import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  /**
   * stack: heading above the content.
   * side: heading in a sticky left column, content on the right (desktop only).
   */
  layout?: 'stack' | 'side';
  children: ReactNode;
  className?: string;
}

/** Page section with the shared heading. */
export function Section({ id, title, description, layout = 'stack', children, className }: SectionProps) {
  const heading = (
    <Reveal className={layout === 'side' ? 'lg:sticky lg:top-28' : 'mb-12 max-w-3xl sm:mb-16'}>
      <h2 id={`${id}-title`} className="text-3xl font-semibold tracking-tighter text-balance sm:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-5 max-w-[60ch] leading-relaxed text-pretty text-fg-2 sm:text-lg">{description}</p>}
    </Reveal>
  );

  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('relative py-14 sm:py-20', className)}>
      <div className="container-page">
        {layout === 'side' ? (
          <div className="grid grid-cols-1 gap-10 border-t border-line pt-10 lg:grid-cols-12 lg:gap-8 lg:pt-14">
            <div className="lg:col-span-4">{heading}</div>
            <div className="lg:col-span-8">{children}</div>
          </div>
        ) : (
          <div className="border-t border-line pt-10 lg:pt-14">
            {heading}
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
