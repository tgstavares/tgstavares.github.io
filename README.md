# Tiago Tavares Academic Website

This is the current local implementation of Tiago Tavares's academic website.
It uses a dark theme by default and provides a research-first homepage with
dedicated Research, Teaching, and CV pages. It is a statically exported Next.js
site designed for GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by the development server. By default it is
`http://localhost:3000`.

## Static build and validation

```bash
npm run build
npm test
```

The production site is written to `out/`. To inspect that exact static build:

```bash
npm start
```

Then open `http://localhost:4173`.

## GitHub Pages

The workflow in `.github/workflows/deploy-pages.yml` builds and deploys `out/`
whenever `main` is pushed. In the repository settings, set Pages to use GitHub
Actions. The custom domain can be configured later without rebuilding the site.

Historical course pages are preserved as static files under `public/legacy/`
and are linked from the Teaching page. They are not part of the React source
and should only be edited when correcting archived course content or links.
