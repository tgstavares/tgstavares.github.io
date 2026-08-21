const RETENTION_DAYS = 30;
const RETENTION_SECONDS = RETENTION_DAYS * 24 * 60 * 60;

export function shouldLog(request) {
  if (request.method !== "GET") {
    return false;
  }

  const destination = request.headers.get("sec-fetch-dest");
  if (destination === "document") {
    return true;
  }

  const accept = request.headers.get("accept") ?? "";
  return destination === null && accept.includes("text/html");
}

function bounded(value, maxLength) {
  return value ? value.slice(0, maxLength) : null;
}

function referrerHost(request) {
  const referrer = request.headers.get("referer");
  if (!referrer) {
    return null;
  }

  try {
    return bounded(new URL(referrer).hostname, 253);
  } catch {
    return null;
  }
}

function primaryLanguage(request) {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) {
    return null;
  }

  return bounded(acceptLanguage.split(",", 1)[0].trim(), 35);
}

export function visitFromRequest(request, now = Date.now()) {
  const ip = request.headers.get("cf-connecting-ip");
  if (!ip) {
    return null;
  }

  const url = new URL(request.url);
  return {
    visitedAt: Math.floor(now / 1000),
    ip: bounded(ip, 64),
    country: bounded(request.cf?.country ?? null, 2),
    path: bounded(url.pathname, 2048) ?? "/",
    referrerHost: referrerHost(request),
    city: bounded(request.cf?.city ?? null, 128),
    region: bounded(request.cf?.region ?? null, 128),
    asn: Number.isSafeInteger(request.cf?.asn) ? request.cf.asn : null,
    asOrganization: bounded(request.cf?.asOrganization ?? null, 255),
    userAgent: bounded(request.headers.get("user-agent"), 512),
    language: primaryLanguage(request)
  };
}

export async function writeVisit(database, visit) {
  await database
    .prepare(
      `INSERT INTO visits
        (visited_at, ip, country, path, referrer_host, city, region, asn,
         as_organization, user_agent, language)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)`
    )
    .bind(
      visit.visitedAt,
      visit.ip,
      visit.country,
      visit.path,
      visit.referrerHost,
      visit.city,
      visit.region,
      visit.asn,
      visit.asOrganization,
      visit.userAgent,
      visit.language
    )
    .run();
}

export async function pruneOldVisits(database) {
  await database
    .prepare("DELETE FROM visits WHERE visited_at < unixepoch() - ?1")
    .bind(RETENTION_SECONDS)
    .run();
}

async function recordVisit(request, database) {
  const visit = visitFromRequest(request);
  if (visit) {
    await writeVisit(database, visit);
  }
}

export default {
  async fetch(request, env, context) {
    if (shouldLog(request)) {
      context.waitUntil(
        recordVisit(request, env.VISITOR_DB).catch((error) => {
          console.error("Unable to record visit", error);
        })
      );
    }

    return fetch(request);
  },

  async scheduled(_event, env, context) {
    context.waitUntil(
      pruneOldVisits(env.VISITOR_DB).catch((error) => {
        console.error("Unable to prune old visits", error);
      })
    );
  }
};
