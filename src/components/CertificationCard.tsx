import { ArrowUpRight } from 'lucide-react';
import type { Certification } from '../types';
import { externalLinkProps } from '../lib/utils';
import { Pending } from './ui/Pending';
import { Reveal } from './ui/Reveal';

export function CertificationCard({ certification, delay = 0 }: { certification: Certification; delay?: number }) {
  const { name, issuer, detail, date, credentialId, url } = certification;

  return (
    <Reveal delay={delay}>
      <article>
        <h3 className="text-lg leading-snug font-medium text-fg">{name}</h3>
        <p className="mt-1 text-fg-2">{issuer}</p>
        {detail && <p className="mt-0.5 text-sm text-fg-3">{detail}</p>}
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {date ? <span className="font-mono text-fg-3">{date}</span> : <Pending>date</Pending>}
          {credentialId && <span className="font-mono text-fg-3">ID {credentialId}</span>}
          {url ? (
            <a
              href={url}
              {...externalLinkProps}
              className="inline-flex items-center gap-1 font-medium text-accent-fg transition-colors hover:text-fg"
              aria-label={`View certificate: ${name}`}
            >
              View certificate
              <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          ) : (
            <Pending>certificate link</Pending>
          )}
        </div>
      </article>
    </Reveal>
  );
}
