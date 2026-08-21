CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visited_at INTEGER NOT NULL,
  ip TEXT NOT NULL,
  country TEXT,
  path TEXT NOT NULL,
  referrer_host TEXT
);

CREATE INDEX IF NOT EXISTS visits_visited_at_idx ON visits (visited_at);
CREATE INDEX IF NOT EXISTS visits_ip_idx ON visits (ip);
