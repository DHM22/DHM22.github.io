import { certifications } from '../data/certifications';
import { CertificationCard } from './CertificationCard';
import { Section } from './ui/Section';

export function Certifications() {
  return (
    <Section id="certifications" index="07" eyebrow="Certifications" title="Certifications">
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((certification, i) => (
          <li key={certification.name}>
            <CertificationCard certification={certification} delay={(i % 3) * 70} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
