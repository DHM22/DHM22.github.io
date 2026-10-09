import type { CSSProperties } from 'react';
import { ArrowDown, Download } from 'lucide-react';
import { profile } from '../data/profile';
import { asset } from '../lib/utils';
import { ButtonLink } from './ui/Button';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export function Hero() {
  const [firstName, ...rest] = profile.name.split(' ');
  const { portrait } = profile;

  return (
    <section id="top" aria-labelledby="hero-title" className="relative">
      <div className="container-page grid min-h-[100dvh] grid-cols-1 items-center gap-12 pt-24 pb-16 lg:grid-cols-12 lg:gap-10 lg:pb-12">
        <div className="lg:col-span-7">
          <p className="hero-in text-sm text-fg-2 sm:text-base" style={delay(0)}>
            {profile.role}, {profile.availability.toLowerCase()}
          </p>

          <h1
            id="hero-title"
            className="hero-in mt-5 text-[clamp(3rem,8.2vw,6.25rem)] leading-[0.95] font-semibold tracking-[-0.045em]"
            style={delay(80)}
          >
            <span className="block">{firstName}</span>
            <span className="block text-fg-3">{rest.join(' ')}</span>
          </h1>

          <p className="hero-in mt-7 max-w-md text-lg leading-relaxed text-pretty text-fg-2 sm:text-xl" style={delay(160)}>
            {profile.headline}
          </p>

          <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row" style={delay(240)}>
            <ButtonLink href="#projects">
              View work
              <ArrowDown className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={asset(profile.cv)} download={profile.cv} variant="secondary">
              <Download className="size-4" aria-hidden />
              Download CV
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-5">
          {/* The portrait stands on a panel and breaks out over its top edge */}
          <div className="relative mx-auto flex h-[26rem] w-full max-w-md items-end justify-center sm:h-[32rem] lg:h-[min(80dvh,720px)] lg:max-w-none">
            <div aria-hidden className="hero-panel absolute inset-x-0 bottom-0 h-[74%] rounded-xl bg-surface-2" />
            <img
              src={asset(portrait.src)}
              alt={portrait.alt}
              width={portrait.width}
              height={portrait.height}
              fetchPriority="high"
              decoding="async"
              className="hero-photo relative h-full w-auto max-w-full object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
