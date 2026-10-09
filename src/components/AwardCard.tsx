import { ArrowRight } from 'lucide-react';
import type { Award } from '../types';
import { asset } from '../lib/utils';
import { Reveal } from './ui/Reveal';

interface AwardCardProps {
  award: Award;
  /** Opens the lightbox at the given photo */
  onOpen: (photoIndex: number) => void;
  delay?: number;
}

/** One award as a ledger row: placement, the story, and the cover photo. */
export function AwardCard({ award, onOpen, delay = 0 }: AwardCardProps) {
  const [cover] = award.photos;
  const total = award.photos.length;
  const [rank, ...placeWords] = award.placement.split(' ');

  return (
    <Reveal delay={delay}>
      <article className="group grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        <p className="flex items-baseline gap-2 md:col-span-2 md:block" aria-hidden>
          <span className="block text-5xl leading-none font-semibold tracking-tighter text-accent-fg sm:text-7xl">{rank}</span>
          <span className="block text-sm text-fg-3 md:mt-1">{placeWords.join(' ')}</span>
        </p>

        <div className="md:col-span-6">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            <span className="sr-only">{award.placement}, </span>
            {award.event} <span className="font-normal text-fg-3">{award.year}</span>
          </h3>
          {award.track && <p className="mt-1.5 text-fg-2">{award.track}</p>}
          {award.organizer && <p className="mt-1 text-sm leading-relaxed text-fg-3">{award.organizer}</p>}
          <p className="mt-5 max-w-[60ch] leading-relaxed text-pretty text-fg-2">{award.summary}</p>
          {award.prize && (
            <p className="mt-4 text-sm text-fg-2">
              <span className="label mr-2">Prize</span>
              {award.prize}
            </p>
          )}
          <button
            type="button"
            onClick={() => onOpen(0)}
            className="mt-6 inline-flex items-center gap-1.5 font-medium text-accent-fg transition-colors hover:text-fg"
          >
            {total > 1 ? 'Photos and details' : 'Photo and details'}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </button>
        </div>

        {cover && (
          <button
            type="button"
            onClick={() => onOpen(0)}
            aria-label={`Open photos: ${award.event} ${award.year}`}
            className="relative aspect-[4/3] cursor-zoom-in overflow-hidden rounded-xl bg-surface-2 md:col-span-4 md:aspect-[4/5]"
          >
            <img
              src={asset(cover.src)}
              alt=""
              width={cover.width}
              height={cover.height}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: cover.focus }}
              className="size-full object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-hover:scale-[1.03]"
            />
          </button>
        )}
      </article>
    </Reveal>
  );
}
