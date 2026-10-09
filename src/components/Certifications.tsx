import { certifications } from '../data/certifications';
import { CertificationCard } from './CertificationCard';
import { Section } from './ui/Section';

export function Certifications() {
  return (
    <Section id="certifications" layout="side" title="Certifications">
      <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
        {certifications.map((certification, i) => (
          <li key={certification.name} className="border-t border-line py-6 first:border-t-0 first:pt-0 sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(2)]:pt-0">
            <CertificationCard certification={certification} delay={(i % 2) * 80} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
