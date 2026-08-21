CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visited_at INTEGER NOT NULL,
  ip TEXT NOT NULL,
  country TEXT,
  path TEXT NOT NULL,
  referrer_host TEXT,
  city TEXT,
  region TEXT,
  asn INTEGER,
  as_organization TEXT,
  user_agent TEXT,
  language TEXT
);

CREATE INDEX IF NOT EXISTS visits_visited_at_idx ON visits (visited_at);
CREATE INDEX IF NOT EXISTS visits_ip_idx ON visits (ip);

CREATE VIEW IF NOT EXISTS visits_recent AS
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
