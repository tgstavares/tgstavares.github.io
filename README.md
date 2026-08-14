# Tiago Tavares Academic Website

This is the current Sites implementation of Tiago Tavares's academic website.
It uses a dark theme by default and provides a research-first homepage with
dedicated Research, Teaching, CV, and Personal pages.

## Local development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run build
npm test
```

The previous Quarto build is preserved under `../website/`. Its rendered pages
are included in `public/legacy/` so historical courses, software notes, and old
galleries remain accessible from the new site.
