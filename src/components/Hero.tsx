import type { CSSProperties } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { profile } from '../data/profile';
import { asset } from '../lib/utils';
import { HeroBackground } from './HeroBackground';
import { ProfileCard } from './ProfileCard';
import { ButtonLink } from './ui/Button';
import { SocialLinks } from './ui/SocialLinks';

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

export function Hero() {
  const [firstName, ...rest] = profile.name.split(' ');

  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate">
      <HeroBackground />
      <div className="container-page grid min-h-[100svh] grid-cols-1 items-center gap-14 pt-32 pb-20 lg:grid-cols-12 lg:gap-8 lg:pt-36 lg:pb-24">
        <div className="lg:col-span-7">
          <p className="hero-in" style={delay(0)}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-fg-2">
              <span className="relative flex size-2">
                <span className="pulse-ring absolute inline-flex size-full rounded-full bg-ok/60" />
                <span className="relative inline-flex size-2 rounded-full bg-ok" />
              </span>
              {profile.availability}
            </span>
          </p>

          <h1
            id="hero-title"
            className="hero-in mt-7 text-[clamp(2.75rem,8vw,5.25rem)] leading-[0.98] font-semibold tracking-[-0.04em]"
            style={delay(80)}
          >
            <span className="block">{firstName}</span>
            <span className="text-gradient block pb-1">{rest.join(' ')}</span>
          </h1>

          <div className="hero-in" style={delay(160)}>
            <p className="mt-7 text-xl font-medium text-fg sm:text-2xl">{profile.role}</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-sm text-fg-2">
              {/* The dot travels with the next item, so a wrapped line never ends on a dot */}
              {profile.focus.map((area, i) => (
                <span key={area} className="whitespace-nowrap">
                  {i > 0 && (
                    <span aria-hidden className="mr-3 text-accent">
                      •
                    </span>
                  )}
                  {area}
                </span>
              ))}
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-fg-2">{profile.intro}</p>
          </div>

          <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row" style={delay(240)}>
            <ButtonLink href="#projects">
              View My Work
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={asset(profile.cv)} download={profile.cv} variant="secondary">
              <Download className="size-4" aria-hidden />
              Download CV
            </ButtonLink>
          </div>

          <div className="hero-in" style={delay(320)}>
            <SocialLinks className="mt-8" />
          </div>
        </div>

        <div className="hero-in hidden sm:block lg:col-span-5" style={delay(200)}>
          <ProfileCard />
        </div>
      </div>
    </section>
  );
}
