# Marina Yee — An Interactive Scrollytelling Story

An interactive one-pager telling the story of fashion designer Marina Yee, one of the Antwerp Six, created for MoMu (Fashion Museum Antwerp) as part of the Devine assignment.

🔗 **Live site:** https://pixie-paw.github.io/int3_retake/

## Tech stack

- [Astro](https://astro.build) — static site generation, image optimization pipeline
- Vanilla JavaScript (no framework) — nav interactions, sound toggle, scrollspy, YouTube facade
- Vanilla CSS — custom design tokens, responsive layouts, no CSS framework
- npm — dependency management
- GitHub Actions — automated build & deploy to GitHub Pages

## Getting started (setup from scratch)

If you've just cloned this repo and don't have the dependencies installed yet:

```bash
# 1. Install Node.js v22.12.0 or later
#    https://nodejs.org

# 2. Clone the repo
git clone https://github.com/pixie-paw/int3_retake.git
cd int3_retake

# 3. Install all project dependencies
npm install

# 4. Start the local dev server
npm run dev
```

The site will be available at `http://localhost:4321/int3_retake/` (note the base path).

To test on a phone or other device on the same Wi-Fi network:

```bash
npm run dev -- --host
```

Then open the printed `Network:` URL (with `/int3_retake/` appended) on the other device.

### Build for production

```bash
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  assets/            # images, organized per section (hero, intro, chapter1, nav...)
  components/
    nav/             # navigation bar, mobile menu, language switcher, sound toggle
    story/           # chapter nav, per-chapter content components, YouTube facade
    Hero.astro
    BaseHead.astro
    Footer.astro
  data/
    chapters.ts       # single source of truth for chapter labels/order
  layouts/
    Layout.astro       # page shell: head, nav, footer
    StoryLayout.astro   # wraps Layout with Hero + ChapterNav
  pages/
    index.astro         # the entire one-pager (all chapters stacked as sections)
  styles/
    tokens.css           # design tokens: colors, fonts, spacing, weights
    reset.css             # CSS reset
    global.css             # base styles, utility classes
public/
  fonts/                    # self-hosted local fonts (.woff2)
  momu_logo.svg              # referenced via import.meta.env.BASE_URL, not a hardcoded path — see note below
```

## Fonts

- **Adobe Fonts (Typekit)**: Akzidenz Grotesk Next Pro/Condensed, Playfair Display — loaded via `<link>` in `BaseHead.astro`
- **Local/self-hosted fonts**: Punktype, BestieSeventy, BastligaOne — declared via `@font-face` in `tokens.css`, files in `public/fonts/`

## Git workflow

This project follows **GitHub Flow**:
- `main` always contains working, deployable code
- new work happens on feature/fix branches (`feature/...`, `fix/...`)
- changes are merged into `main` via pull request
- deployment to GitHub Pages happens automatically on every merge to `main`, via `.github/workflows/deploy.yml`

## Browser support / testing

Tested in Chrome and Safari, on both desktop and mobile viewports (including real-device testing via local network).

## Animation & interaction approach

- CSS transitions/animations for simple state changes (hover states, toggle icons, scroll bounce)
- Native browser behavior (anchor scrolling, `<dialog>`, `IntersectionObserver`) preferred over custom JS where possible, for progressive enhancement
- Decorative images use `aria-hidden="true"` with real, visually-hidden headings/text alongside them for accessibility
- Two notable JS-free interaction patterns, both functional with JavaScript disabled:
  - **Multi-fact disclosure pagination** (`InfoReveal.astro`): a hidden radio-button group with `<label for>` arrows and CSS `:checked ~` sibling matching, rather than JS-driven state
  - **Footer email forms**: native `type="email"`/`required` browser validation, with correct/invalid feedback messages toggled via a CSS sibling combinator (`:invalid:not(:placeholder-shown)`) reacting to the input's own validity state — no JS involved in the validation logic itself. JS is used only as a light enhancement, to stop the no-backend form from doing a plain page-reloading GET request on submit.
- Public assets referenced by path (e.g. the MoMu logo in the footer) go through `import.meta.env.BASE_URL` rather than a hardcoded absolute path, since the site deploys under a GitHub Pages subpath (`/int3_retake/`) — a bare `/momu_logo.svg` resolves to the wrong root and 404s.

## Accessibility

- Semantic HTML landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`, `<section>` with headings)
- Skip-to-content link
- All interactive elements keyboard-accessible with correct ARIA attributes (`aria-pressed`, `aria-expanded`, `aria-current`)
- Visually-hidden real text alongside flattened/image-based titles for screen reader access
- Responsive text truncation (e.g. the footer's "Next story" link shortening on mobile) is decoupled from what's announced to screen readers via a permanent `aria-label` on the link, so the accessible name doesn't shrink along with the visible text

## Known limitations

- A very minor sub-pixel horizontal scroll may be visible on some mobile devices around full-bleed images, caused by browser scrollbar-width calculation differences. Investigated but not fully resolved without introducing other regressions (see git history for `fix/lace-adjustments`).
- The "Next story" footer link is a placeholder destination, pending a second story existing in the series.

## Credits

- Content and story: MoMu Antwerp / MoMu interview archives / Irina Moldovan
- Interview video: Galerie Sofie Van de Velde

## License

This project was created for educational purposes as part of a school assignment.