# Abdurahman Al-Duraywish · Portfolio

Personal portfolio: a single-page site built with React, TypeScript, Tailwind CSS and Vite, deployed to GitHub Pages.

## Run it locally

Requires Node.js 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173.

Other commands:

- `npm run build` type-checks and builds the site into `dist/`.
- `npm run preview` serves that build locally, exactly as GitHub Pages will.

## Editing content

All the text lives in `src/data/`. You never need to touch the components to update the site.

| File                | What it holds                                                  |
| ------------------- | -------------------------------------------------------------- |
| `profile.ts`        | Name, hero line and photo, email, links, CV file, nav items    |
| `about.ts`          | About text and the quick facts beside it                       |
| `education.ts`      | Degree, GPA, honors, relevant areas                            |
| `experience.ts`     | Sadara co-op (featured card) and the training program          |
| `skills.ts`         | Skill groups                                                   |
| `projects.ts`       | Projects, in display order. `featured: true` gets a large card |
| `awards.ts`         | Awards, their photos and team                                  |
| `certifications.ts` | Certifications, with optional date and credential link         |

### Placeholders

Information that's still missing (a GitHub link, a certificate date, award photos) shows as a dashed amber **+ label** while you run `npm run dev`. These markers are removed from the production build, so the live site never shows them. The missing item is simply hidden until you add it.

### Award photos

1. Put the photos in `public/images/awards/venturex-2026/`. JPG, PNG or WebP all work; around 1600–2000 px wide keeps the page fast.
2. Add one entry per photo to `photos` in `src/data/awards.ts`, with its `src`, `alt` text, `caption`, `width` and `height`. The first photo is the cover.
3. Remove the matching items from `pendingPhotos`.

### Project screenshots

Put the image in `public/images/projects/` and add an `image` to the project in `src/data/projects.ts`. Projects without an image show their `artwork` diagram if they have one, or no media at all.

### CV

The Download CV buttons serve `public/Abdurahman-Al-Duraywish-CV.pdf`. Replace that file to update the CV, keeping the same name.

### Contact form

GitHub Pages can't send email by itself. By default, the form opens the visitor's email app with the message filled in. To receive messages directly instead, create a free form at [Formspree](https://formspree.io) and paste its endpoint into `contactFormEndpoint` in `src/data/profile.ts`.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Create a public repository on GitHub named `DHM22.github.io`. The site will then be at https://dhm22.github.io.
   - Any other name also works, for example `portfolio`, which serves the site at https://dhm22.github.io/portfolio/. In that case, update `VITE_SITE_URL` in `.env` so link previews point to the right address.
2. Push this folder to the repository's `main` branch.
3. In the repository, open **Settings → Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. The first deploy starts automatically. Follow it in the **Actions** tab; the site goes live when the deploy finishes.

## Project structure

```
public/            static files: CV, images, favicon, social preview image
src/
  data/            all portfolio content
  components/      page sections (Hero, Experience, Projects, AwardsGallery, …)
  components/ui/   shared pieces (Section, Button, Tag, Reveal, Pending, …)
  lib/             small helpers and hooks
  index.css        design tokens (colors, fonts) and global styles
```
