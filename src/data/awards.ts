import type { Award } from '../types';

/**
 * To add photos: put the files in public/images/awards/<award-id>/ and list them in `photos`.
 * The first photo is the card cover. `muted` dims it in the card only; `focus` picks the part of
 * a tall photo that stays in frame. Around 1200-2000 px wide keeps the page fast.
 */
export const awards: Award[] = [
  {
    id: 'venturex-2026',
    placement: '1st Place',
    event: 'VentureX Hackathon',
    year: '2026',
    date: 'October 2026',
    track: 'Cloud Computing & Infrastructure track',
    organizer: 'Future Technology Club, College of Computer and Information Sciences, King Saud University',
    prize: 'Training-to-hire program',
    project: 'Harf: an Arabic-aware LLM gateway',
    summary:
      'Won the Cloud Computing & Infrastructure track with Harf, a gateway that makes Arabic AI requests 36% cheaper at near-identical answer quality.',
    description: [
      'LLM providers bill per token, and Arabic text splits into more tokens than English. Our measurements showed the same customer-service conversation costing 18-41% more in Arabic, depending on the model.',
      "Harf sits between an organization's apps and its LLM providers. It normalizes dialectal Arabic, detects the intent of each request and routes it along the cheapest safe path: an approved answer from memory, a small model, or a large model.",
    ],
    achievement:
      'In a blind, LLM-judged test of 183 Arabic customer-service questions through the OpenAI API, Harf cut cost by 36% at near-identical quality (4.92 vs. 4.94 out of 5). Answers from memory were 30 of 31 correct and 29× faster.',
    team: [
      { name: 'Abdullah AlShehri', role: 'Models & measurement' },
      { name: 'Majed AlMutairi', role: 'Data & evaluation' },
      { name: 'Abdurahman Al-Duraywish', role: 'Experience & presentation', isMe: true },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/DHM22/Harf' },
      { label: 'Live prototype', href: 'https://harf-venturex.netlify.app' },
    ],
    photos: [
      {
        src: 'images/awards/venturex-2026/venturex-win.webp',
        alt: 'Abdurahman holding the VentureX first-place board, dated 3 October 2026',
        caption: 'Receiving 1st place, 3 October 2026',
        width: 1200,
        height: 2133,
        focus: '50% 60%',
        muted: true,
      },
    ],
  },
  {
    id: 'sakanthon-2026',
    placement: '1st Place',
    event: 'Sakanthon',
    year: '2026',
    date: 'September 2026',
    track: 'Financial Solutions track',
    organizer: 'Developmental Housing Hackathon by Sakan and Jood Housing',
    project: 'Sukna (سُكنى): a revolving bridge fund for housing donations',
    summary:
      'Won the Financial Solutions track with Sukna, a revolving bridge fund that gets families into their homes as soon as their donation campaign crosses a set threshold.',
    description: [
      "On Jood's housing donation platform, an approved family only receives its home once the campaign is 100% funded. One real case had collected 84% of a SAR 111,881 unit and was still stalled over a SAR 16,074 gap. Across active cases, SAR 1.17M sat in suspended gaps, and not a single campaign had completed.",
      "Sukna is a revolving bridge fund that sits on top of Jood as an operational layer. When a campaign reaches a set threshold, the fund closes the remaining gap so the home is delivered at once. Later donations and the family's installments repay the bridge, freeing the capital for the next family.",
    ],
    achievement:
      'Our model showed SAR 1 million housing 42 families a year across three cycles instead of 8, with no new donations or donation channels: the whole effect comes from re-sequencing money already in the system.',
    role: 'AI and modeling: the case-prioritization logic and the fund-rotation simulation, plus the interactive simulator on real Jood platform data that let the judges move the funding threshold live and watch families housed and capital turnover respond.',
    teamSize: 3,
    photos: [
      {
        src: 'images/awards/sakanthon-2026/sakanthon-ceremony.webp',
        alt: 'The Sakanthon winning team on stage with the organizers, holding the SAR 35,000 first-place board',
        caption: 'On stage after winning 1st place in the Financial Solutions track',
        width: 1080,
        height: 1440,
        focus: '50% 56%',
      },
      {
        src: 'images/awards/sakanthon-2026/sakanthon-win.webp',
        alt: 'Abdurahman holding the Sakanthon first-place trophy and board',
        caption: 'Receiving 1st place in the Financial Solutions track',
        width: 1200,
        height: 2133,
        focus: '50% 66%',
        muted: true,
      },
    ],
  },
];
