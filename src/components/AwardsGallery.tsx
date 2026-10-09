import { useState } from 'react';
import { awards } from '../data/awards';
import { AwardCard } from './AwardCard';
import { AwardModal } from './AwardModal';
import { Section } from './ui/Section';

export function AwardsGallery() {
  const [open, setOpen] = useState<{ awardId: string; index: number } | null>(null);
  const openAward = open ? (awards.find((award) => award.id === open.awardId) ?? null) : null;

  return (
    <Section id="awards" title="Awards">
      <ul className="divide-y divide-line">
        {awards.map((award) => (
          <li key={award.id} className="py-12 first:pt-0 last:pb-0">
            <AwardCard award={award} onOpen={(index) => setOpen({ awardId: award.id, index })} />
          </li>
        ))}
      </ul>

      <AwardModal
        award={openAward}
        index={open?.index ?? 0}
        onIndexChange={(index) => setOpen((current) => current && { ...current, index })}
        onClose={() => setOpen(null)}
      />
    </Section>
  );
}
