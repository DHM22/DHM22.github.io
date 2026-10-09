import { useCallback, useEffect, useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, Trophy, X } from 'lucide-react';
import type { Award } from '../types';
import { asset, cn, externalLinkProps } from '../lib/utils';
import { ButtonLink } from './ui/Button';
import { Pending } from './ui/Pending';
import { Badge } from './ui/Tag';

interface AwardModalProps {
  award: Award | null;
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
}

/** Photo lightbox with the award details, built on the native <dialog>. */
export function AwardModal({ award, index, onIndexChange, onClose }: AwardModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  const photos = award?.photos ?? [];
  const count = photos.length;
  const photo = photos[index];
  const isOpen = award !== null;

  const go = useCallback(
    (step: number) => {
      if (count > 1) onIndexChange((index + step + count) % count);
    },
    [count, index, onIndexChange],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (isOpen && !dialog.open) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, go]);

  // Preload the neighbouring photos so arrows feel instant
  useEffect(() => {
    if (count < 2) return;
    for (const step of [1, -1]) {
      const preload = new Image();
      preload.src = asset(photos[(index + step + count) % count].src);
    }
  }, [index, count, photos]);

  const handleClose = () => {
    onClose();
    returnFocusRef.current?.focus();
  };

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-labelledby="award-dialog-title"
      onClose={handleClose}
      onClick={(event) => {
        // A click on the dialog element itself is a click on the backdrop
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
    >
      {award && photo && (
        <>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="absolute top-3 right-3 z-20 grid size-11 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75"
          >
            <X className="size-5" aria-hidden />
          </button>

          <div className="flex h-full flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
            <div className="flex shrink-0 flex-col bg-surface-2 lg:min-w-0 lg:flex-1">
              <div
                className="relative h-[46svh] lg:h-auto lg:flex-1"
                onTouchStart={(event) => (touchStartX.current = event.touches[0].clientX)}
                onTouchEnd={(event) => {
                  const start = touchStartX.current;
                  touchStartX.current = null;
                  if (start === null) return;
                  const distance = event.changedTouches[0].clientX - start;
                  if (Math.abs(distance) > 50) go(distance < 0 ? 1 : -1);
                }}
              >
                <img
                  key={photo.src}
                  src={asset(photo.src)}
                  alt={photo.alt}
                  className="fade-in absolute inset-0 m-auto max-h-[calc(100%-2rem)] max-w-[calc(100%-2rem)] rounded-lg object-contain lg:max-h-[calc(100%-4rem)] lg:max-w-[calc(100%-6rem)]"
                />
                {count > 1 && (
                  <>
                    <NavButton direction="previous" onClick={() => go(-1)} />
                    <NavButton direction="next" onClick={() => go(1)} />
                  </>
                )}
              </div>

              <div className="flex items-start justify-between gap-4 border-t border-line px-5 py-3">
                <p className="text-sm text-fg-2">{photo.caption ?? photo.alt}</p>
                <p className="shrink-0 font-mono text-xs text-fg-3 tabular-nums" aria-live="polite">
                  {index + 1} / {count}
                </p>
              </div>

              {count > 1 && (
                <ul className="flex gap-2 overflow-x-auto px-5 pb-4" aria-label="Photos">
                  {photos.map((item, i) => (
                    <li key={item.src} className="shrink-0">
                      <button
                        type="button"
                        onClick={() => onIndexChange(i)}
                        aria-label={`Show photo ${i + 1}: ${item.caption ?? item.alt}`}
                        aria-current={i === index ? 'true' : undefined}
                        className={cn(
                          'block h-14 w-20 overflow-hidden rounded-md border transition',
                          i === index
                            ? 'border-accent ring-2 ring-accent/30'
                            : 'border-line opacity-55 hover:opacity-100',
                        )}
                      >
                        <img src={asset(item.src)} alt="" loading="lazy" className="size-full object-cover" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <aside className="shrink-0 border-t border-line p-6 sm:p-8 lg:w-[25rem] lg:overflow-y-auto lg:border-t-0 lg:border-l">
              <Badge icon={Trophy}>
                {award.placement}
              </Badge>
              <h2 id="award-dialog-title" className="mt-4 text-2xl font-semibold tracking-tight">
                {award.event} {award.year}
              </h2>
              {award.track && <p className="mt-2 text-fg-2">{award.track}</p>}
              {award.organizer && <p className="mt-1 text-sm leading-relaxed text-fg-3">{award.organizer}</p>}

              {(award.date || award.prize) && (
                <dl
                  className={cn(
                    'mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line',
                    award.date && award.prize ? 'grid-cols-2' : 'grid-cols-1',
                  )}
                >
                  {award.prize && (
                    <div className="bg-surface p-3">
                      <dt className="font-mono text-[11px] tracking-wider text-fg-3 uppercase">Prize</dt>
                      <dd className="mt-1 text-sm text-fg">{award.prize}</dd>
                    </div>
                  )}
                  {award.date && (
                    <div className="bg-surface p-3">
                      <dt className="font-mono text-[11px] tracking-wider text-fg-3 uppercase">Date</dt>
                      <dd className="mt-1 text-sm text-fg">{award.date}</dd>
                    </div>
                  )}
                </dl>
              )}

              <div className="mt-8 space-y-7 text-[15px] leading-relaxed">
                <section>
                  <h3 className="label">The project</h3>
                  <p className="mt-2 font-medium text-fg">{award.project}</p>
                  {award.description.map((paragraph) => (
                    <p key={paragraph} className="mt-2 text-pretty text-fg-2">
                      {paragraph}
                    </p>
                  ))}
                </section>

                <section>
                  <h3 className="label">Achievement</h3>
                  <p className="mt-2 text-pretty text-fg-2">{award.achievement}</p>
                </section>

                {award.role && (
                  <section>
                    <h3 className="label">My role</h3>
                    <p className="mt-2 text-pretty text-fg-2">{award.role}</p>
                  </section>
                )}

                {!award.team && award.teamSize && (
                  <section>
                    <h3 className="label">Team</h3>
                    <p className="mt-2 flex flex-wrap items-center gap-3 text-fg-2">
                      Team of {award.teamSize}
                      <Pending>teammates' names</Pending>
                    </p>
                  </section>
                )}

                {award.team && (
                  <section>
                    <h3 className="label">Team</h3>
                    <ul className="mt-3 space-y-2.5">
                      {award.team.map((member) => (
                        <li key={member.name} className="flex items-baseline justify-between gap-4 text-sm">
                          <span className={member.isMe ? 'font-medium text-fg' : 'text-fg'}>{member.name}</span>
                          {member.role && <span className="text-right text-fg-3">{member.role}</span>}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {award.links && (
                  <div className="flex flex-wrap gap-2">
                    {award.links.map((link) => (
                      <ButtonLink key={link.href} href={link.href} {...externalLinkProps} variant="secondary" size="compact">
                        {link.label}
                        <ArrowUpRight className="size-4" aria-hidden />
                      </ButtonLink>
                    ))}
                  </div>
                )}

                {award.pendingPhotos && award.pendingPhotos.length > 0 && (
                  <Pending>Photos to add: {award.pendingPhotos.join(', ')}</Pending>
                )}
              </div>
            </aside>
          </div>
        </>
      )}
    </dialog>
  );
}

function NavButton({ direction, onClick }: { direction: 'previous' | 'next'; onClick: () => void }) {
  const Icon = direction === 'previous' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === 'previous' ? 'Previous photo' : 'Next photo'}
      className={cn(
        'absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75',
        direction === 'previous' ? 'left-3' : 'right-3',
      )}
    >
      <Icon className="size-5" aria-hidden />
    </button>
  );
}
