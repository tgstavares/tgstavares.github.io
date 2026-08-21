CREATE VIEW visits_recent AS
SELECT
  id,
  datetime(visited_at, 'unixepoch') AS visited_at_utc,
  ip,
  country,
  city,
  region,
  asn,
  as_organization,
  language,
  path,
  referrer_host,
  user_agent
FROM visits
ORDER BY visited_at DESC, id DESC;
