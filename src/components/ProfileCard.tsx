import type { ReactNode } from 'react';

type TokenKind = 'keyword' | 'name' | 'key' | 'string' | 'literal' | 'plain';

const tokenClass: Record<TokenKind, string> = {
  keyword: 'text-[#b9a8ff]',
  name: 'text-fg',
  key: 'text-[#8fa9ff]',
  string: 'text-[#d3d8e6]',
  literal: 'text-[#b9a8ff]',
  plain: 'text-fg-3',
};

const t = (kind: TokenKind, text: string) => ({ kind, text });
const field = (key: string, value: ReturnType<typeof t>) => [t('plain', '  '), t('key', key), t('plain', ': '), value, t('plain', ',')];

const lines = [
  [t('keyword', 'const'), t('plain', ' '), t('name', 'profile'), t('plain', ' = {')],
  field('name', t('string', '"Abdurahman Al-Duraywish"')),
  field('degree', t('string', '"B.Sc. Computer Science"')),
  field('gpa', t('literal', '3.67')),
  [t('plain', '  '), t('key', 'focus'), t('plain', ': [')],
  [t('plain', '    '), t('string', '"AI & Deep Learning"'), t('plain', ',')],
  [t('plain', '    '), t('string', '"Software Engineering"'), t('plain', ',')],
  [t('plain', '    '), t('string', '"Data Analytics"'), t('plain', ',')],
  [t('plain', '  ],')],
  field('experience', t('string', '"Sadara Chemical Company"')),
  [
    t('plain', '  '),
    t('key', 'wins'),
    t('plain', ': ['),
    t('string', '"VentureX"'),
    t('plain', ', '),
    t('string', '"Sakanthon"'),
    t('plain', '],'),
  ],
  field('openToWork', t('literal', 'true')),
  [t('plain', '};')],
];

/** A short profile summary styled as a code editor window. */
export function ProfileCard() {
  return (
    <figure className="relative mx-auto w-full max-w-md lg:mr-0 lg:ml-auto">
      <div
        aria-hidden
        className="absolute -inset-8 -z-10 bg-[radial-gradient(closest-side,rgb(110_139_255_/_0.18),transparent)]"
      />
      <div className="border-gradient overflow-hidden rounded-2xl shadow-2xl shadow-black/50">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="ml-3 font-mono text-xs text-fg-3">profile.ts</span>
        </div>
        <pre className="overflow-x-auto py-5 font-mono text-[13px] leading-6">
          <code>
            {lines.map((tokens, row) => (
              <Line key={row} number={row + 1}>
                {tokens.map((token, i) => (
                  <span key={i} className={tokenClass[token.kind]}>
                    {token.text}
                  </span>
                ))}
              </Line>
            ))}
          </code>
        </pre>
      </div>
      <figcaption className="sr-only">
        Profile summary: B.Sc. Computer Science, GPA 3.67, focused on AI and deep learning, software engineering and
        data analytics; IT co-op at Sadara Chemical Company; 1st place at the VentureX and Sakanthon hackathons;
        open to work.
      </figcaption>
    </figure>
  );
}

function Line({ number, children }: { number: number; children: ReactNode }) {
  return (
    <span className="flex px-5">
      <span aria-hidden className="mr-5 w-5 shrink-0 text-right text-fg-3/50 select-none">
        {number}
      </span>
      <span className="whitespace-pre">{children}</span>
    </span>
  );
}
