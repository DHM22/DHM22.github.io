import { Images, Trophy } from 'lucide-react';
import type { Award } from '../types';
import { asset, cn } from '../lib/utils';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';

interface AwardCardProps {
  award: Award;
  /** Opens the lightbox at the given photo */
  onOpen: (photoIndex: number) => void;
  delay?: number;
}

export function AwardCard({ award, onOpen, delay = 0 }: AwardCardProps) {
  const [cover, ...rest] = award.photos;
  const thumbs = rest.slice(0, 4);
  const notShown = rest.length - thumbs.length;
  const total = award.photos.length;
  const teamSize = award.team?.length ?? award.teamSize;

  const facts = [
    { label: 'Prize', value: award.prize },
    { label: 'Date', value: award.date },
    { label: 'Team', value: teamSize ? `${teamSize} members` : undefined },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

  return (
    <Reveal delay={delay} className="h-full">
      <article className="group border-gradient flex h-full flex-col overflow-hidden rounded-3xl">
        {cover && (
          <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
            <img
              src={asset(cover.src)}
              alt=""
              width={cover.width}
              height={cover.height}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: cover.focus }}
              className={cn(
                'size-full object-cover transition-[opacity,scale] duration-700 ease-out group-hover:scale-[1.03]',
                cover.muted && 'opacity-55 saturate-[0.85] group-hover:opacity-75',
              )}
            />
            {/* Blend the photo into the card: a cool tint and a fade into the card body */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-br from-accent/20 via-transparent to-accent-2/20 mix-blend-soft-light"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface via-surface/15 to-transparent"
            />

            <div className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-black/55 px-2.5 py-1 text-xs font-medium text-gold backdrop-blur">
                <Trophy className="size-3.5" aria-hidden />
                {award.placement}
              </span>
              {total > 1 && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                  <Images className="size-3.5" aria-hidden />
                  {total} photos
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => onOpen(0)}
              aria-label={`Open photos: ${award.event} ${award.year}`}
              className="absolute inset-0 cursor-zoom-in focus-visible:outline-offset-[-6px]"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="text-2xl font-semibold tracking-tight">
            {award.event} <span className="font-normal text-fg-3">{award.year}</span>
          </h3>
          {award.track && <p className="mt-1.5 text-fg-2">{award.track}</p>}
          {award.organizer && <p className="mt-1 text-sm leading-relaxed text-fg-3">{award.organizer}</p>}
          <p className="mt-4 leading-relaxed text-pretty text-fg-2">{award.summary}</p>
          {award.role && (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-fg-3">
              <span className="font-medium text-fg-2">My role: </span>
              {award.role}
            </p>
          )}

          {facts.length > 0 && (
            <dl
              className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line"
              style={{ gridTemplateColumns: `repeat(${facts.length}, minmax(0, 1fr))` }}
            >
              {facts.map((fact) => (
                <div key={fact.label} className="bg-surface p-3">
                  <dt className="font-mono text-[11px] tracking-wider text-fg-3 uppercase">{fact.label}</dt>
                  <dd className="mt-1 text-sm leading-snug text-fg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {thumbs.length > 0 && (
            <ul className="mt-5 grid grid-cols-4 gap-2" aria-label="More photos">
              {thumbs.map((photo, i) => (
                <li key={photo.src}>
                  <button
                    type="button"
                    onClick={() => onOpen(i + 1)}
                    aria-label={`Open photo ${i + 2} of ${total}: ${photo.caption ?? photo.alt}`}
                    className="group/thumb relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-surface-2"
                  >
                    <img
                      src={asset(photo.src)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover opacity-80 transition-[opacity,scale] duration-500 group-hover/thumb:scale-105 group-hover/thumb:opacity-100"
                    />
                    <span aria-hidden className="absolute inset-0 rounded-lg ring-1 ring-white/10 ring-inset" />
                    {i === thumbs.length - 1 && notShown > 0 && (
                      <span className="absolute inset-0 grid place-items-center bg-black/60 text-sm font-medium text-white">
                        +{notShown}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto pt-6">
            <Button variant="secondary" onClick={() => onOpen(0)} className="w-full sm:w-auto">
              <Images className="size-4" aria-hidden />
              {total > 1 ? 'View photos & details' : 'View photo & details'}
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
