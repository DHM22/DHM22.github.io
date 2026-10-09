import { ArrowUpRight } from 'lucide-react';
import type { Certification } from '../types';
import { externalLinkProps } from '../lib/utils';
import { Pending } from './ui/Pending';
import { Reveal } from './ui/Reveal';

export function CertificationCard({ certification, delay = 0 }: { certification: Certification; delay?: number }) {
  const { name, issuer, detail, date, url, icon: Icon } = certification;

  return (
    <Reveal delay={delay} className="h-full">
      <article className="flex h-full gap-4 rounded-2xl border border-line bg-surface/70 p-5 transition-colors hover:border-line-strong">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-accent">
          <Icon className="size-5" aria-hidden />
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="leading-snug font-medium text-fg">{name}</h3>
          <p className="mt-1 text-sm text-fg-2">{issuer}</p>
          {detail && <p className="mt-0.5 text-xs text-fg-3">{detail}</p>}
          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 text-xs">
            {date ? <span className="font-mono text-fg-3">{date}</span> : <Pending>date</Pending>}
            {url ? (
              <a
                href={url}
                {...externalLinkProps}
                className="inline-flex items-center gap-1 font-medium text-accent transition-colors hover:text-fg"
                aria-label={`View certificate: ${name}`}
              >
                View Certificate
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ) : (
              <Pending>certificate link</Pending>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
