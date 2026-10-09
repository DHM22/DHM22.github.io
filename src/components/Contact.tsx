import { useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight, CircleAlert, CircleCheck, LoaderCircle, Mail, MapPin, Send } from 'lucide-react';
import { profile } from '../data/profile';
import { cn, externalLinkProps } from '../lib/utils';
import type { IconType } from '../types';
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons';
import { Button } from './ui/Button';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';

const methods: { label: string; value: string; href: string; icon: IconType; external: boolean }[] = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, icon: Mail, external: false },
  {
    label: 'LinkedIn',
    value: profile.linkedin.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, ''),
    href: profile.linkedin,
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: 'GitHub',
    value: profile.github.replace(/^https:\/\//, ''),
    href: profile.github,
    icon: GitHubIcon,
    external: true,
  },
];

export function Contact() {
  return (
    <Section
      id="contact"
      index="08"
      eyebrow="Contact"
      title="Let's Connect"
      description="Interested in working together, discussing technology, AI, or software engineering? Feel free to reach out."
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <Reveal className="space-y-3 lg:col-span-5">
          <div className="flex items-center gap-3 rounded-2xl border border-ok/20 bg-ok/[0.06] px-5 py-4">
            <span className="relative flex size-2.5">
              <span className="pulse-ring absolute inline-flex size-full rounded-full bg-ok/60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-ok" />
            </span>
            <span className="font-medium text-fg">{profile.availability}</span>
          </div>

          <ul className="space-y-3">
            {methods.map(({ label, value, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? externalLinkProps : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-line bg-surface/70 p-4 transition-colors hover:border-line-strong hover:bg-surface-2"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 text-fg-2 transition-colors group-hover:text-fg">
                    <Icon className="size-[18px]" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-fg-3">{label}</span>
                    <span className="block truncate text-fg">{value}</span>
                  </span>
                  <ArrowUpRight
                    className="size-4 shrink-0 text-fg-3 transition-[translate,color] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>

          <p className="flex items-center gap-2 px-1 pt-2 text-sm text-fg-3">
            <MapPin className="size-4" aria-hidden />
            {profile.location}
          </p>
        </Reveal>

        <Reveal delay={80} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'mailto';

const statusMessage: Record<Exclude<Status, 'idle' | 'sending'>, { text: string; icon: IconType; tone: string }> = {
  sent: { text: "Thanks! Your message is on its way, and I'll get back to you soon.", icon: CircleCheck, tone: 'text-ok' },
  mailto: {
    text: 'Your email app should open with the message filled in. If it does not, email me directly.',
    icon: CircleCheck,
    tone: 'text-fg-2',
  },
  error: { text: 'Something went wrong while sending. Please email me directly instead.', icon: CircleAlert, tone: 'text-amber-300' },
};

const fieldClass =
  'w-full rounded-xl border border-line bg-bg/60 px-4 text-base text-fg placeholder:text-fg-3 transition-[border-color,box-shadow] outline-none focus:border-accent/60 focus:ring-4 focus:ring-accent/15';

function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    // No form service configured: hand the message to the visitor's email app
    if (!profile.contactFormEndpoint) {
      const subject = `Portfolio message from ${name}`;
      const body = `${message}\n\n${name}\n${email}`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(profile.contactFormEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  const result = status === 'idle' || status === 'sending' ? null : statusMessage[status];

  return (
    <form
      onSubmit={handleSubmit}
      className="border-gradient rounded-3xl p-6 sm:p-8"
      aria-describedby={result ? 'contact-status' : undefined}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name">
          <input id="contact-name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={cn(fieldClass, 'h-12')} />
        </Field>
        <Field label="Email" htmlFor="contact-email">
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={cn(fieldClass, 'h-12')}
          />
        </Field>
        <Field label="Message" htmlFor="contact-message" className="sm:col-span-2">
          <textarea
            id="contact-message"
            name="message"
            required
            rows={6}
            placeholder="How can I help?"
            className={cn(fieldClass, 'min-h-36 resize-y py-3')}
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-status" role="status" aria-live="polite" className="min-h-5 text-sm">
          {result && (
            <span className={cn('inline-flex items-start gap-2', result.tone)}>
              <result.icon className="mt-0.5 size-4 shrink-0" aria-hidden />
              {result.text}
            </span>
          )}
        </p>
        <Button type="submit" disabled={status === 'sending'} className="w-full sm:w-auto">
          {status === 'sending' ? (
            <LoaderCircle className="size-4 animate-spin" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-fg-2">
        {label}
      </label>
      {children}
    </div>
  );
}
