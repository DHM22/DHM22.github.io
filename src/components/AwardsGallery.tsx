import { useState } from 'react';
import { awards } from '../data/awards';
import { AwardCard } from './AwardCard';
import { AwardModal } from './AwardModal';
import { Section } from './ui/Section';

export function AwardsGallery() {
  const [open, setOpen] = useState<{ awardId: string; index: number } | null>(null);
  const openAward = open ? (awards.find((award) => award.id === open.awardId) ?? null) : null;

  return (
    <Section
      id="awards"
      index="06"
      eyebrow="Awards"
      title="Awards & Hackathons"
      description="Competition results, with photos and the story behind each one."
    >
      <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {awards.map((award, i) => (
          <li key={award.id}>
            <AwardCard
              award={award}
              delay={(i % 2) * 80}
              onOpen={(index) => setOpen({ awardId: award.id, index })}
            />
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
