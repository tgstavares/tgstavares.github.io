# Cloudflare visitor logger

This Worker sits in front of the existing GitHub Pages deployment and records
top-level HTML visits in a Cloudflare D1 database. It does not log requests for
images, stylesheets, scripts, or other page assets.

Each record contains:

- visit time;
- visitor IP address;
- Cloudflare country code;
- requested path, without its query string; and
- referrer's hostname, without its path or query string;
- approximate city and region;
- network ASN and organization;
- browser user-agent string; and
- primary browser language.

A daily scheduled task deletes records older than 30 days.

## Deploy

The Cloudflare zone must exist and its DNS records must be proxied before the
Worker route can receive requests.

```bash
npm install
npx wrangler login
npx wrangler d1 create tgstavares-visitors --config ./wrangler.jsonc
```

Copy the returned database ID into `wrangler.jsonc`, then initialize and deploy:

```bash
npx wrangler d1 execute tgstavares-visitors --remote --file schema.sql --config ./wrangler.jsonc
npm run check
npx wrangler deploy --config ./wrangler.jsonc
```

For an existing deployment, apply pending migrations before deploying:

```bash
npx wrangler d1 migrations apply tgstavares-visitors --remote --config ./wrangler.jsonc
```

## Read recent visits

```bash
npx wrangler d1 execute tgstavares-visitors --remote --config ./wrangler.jsonc --command \
  "SELECT datetime(visited_at, 'unixepoch') AS visited_at_utc, ip, country, city, region, asn, as_organization, language, path, referrer_host, user_agent FROM visits ORDER BY visited_at DESC LIMIT 100"
```

To summarize unique IPs over the last 30 days:

```bash
npx wrangler d1 execute tgstavares-visitors --remote --config ./wrangler.jsonc --command \
  "SELECT ip, country, COUNT(*) AS page_views, datetime(MAX(visited_at), 'unixepoch') AS last_seen_utc FROM visits GROUP BY ip, country ORDER BY MAX(visited_at) DESC"
```
