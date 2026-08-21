import assert from "node:assert/strict";
import test from "node:test";

import worker, {
  pruneOldVisits,
  shouldLog,
  visitFromRequest,
  writeVisit
} from "../src/index.js";

function databaseSpy() {
  const calls = [];
  return {
    calls,
    prepare(sql) {
      const call = { sql, bindings: [] };
      calls.push(call);
      return {
        bind(...bindings) {
          call.bindings = bindings;
          return this;
        },
        async run() {
          call.ran = true;
        }
      };
    }
  };
}

test("logs document requests but ignores assets and non-GET requests", () => {
  assert.equal(
    shouldLog(
      new Request("https://www.tgstavares.com/research/", {
        headers: { "sec-fetch-dest": "document" }
      })
    ),
    true
  );
  assert.equal(
    shouldLog(
      new Request("https://www.tgstavares.com/app.css", {
        headers: { "sec-fetch-dest": "style", accept: "text/css" }
      })
    ),
    false
  );
  assert.equal(
    shouldLog(
      new Request("https://www.tgstavares.com/", {
        method: "POST",
        headers: { "sec-fetch-dest": "document" }
      })
    ),
    false
  );
});

test("builds visit metadata without retaining query strings", () => {
  const request = new Request(
    "https://www.tgstavares.com/research/?private=value",
    {
      headers: {
        "cf-connecting-ip": "203.0.113.9",
        "accept-language": "pt-PT,pt;q=0.9,en;q=0.8",
        "user-agent": "ExampleBrowser/1.0",
        referer: "https://example.edu/some/private/path?query=value"
      }
    }
  );
  Object.defineProperty(request, "cf", {
    value: {
      country: "PT",
      city: "Lisbon",
      region: "Lisbon",
      asn: 64500,
      asOrganization: "Example University"
    }
  });

  assert.deepEqual(visitFromRequest(request, 1_725_000_000_000), {
    visitedAt: 1_725_000_000,
    ip: "203.0.113.9",
    country: "PT",
    path: "/research/",
    referrerHost: "example.edu",
    city: "Lisbon",
    region: "Lisbon",
    asn: 64500,
    asOrganization: "Example University",
    userAgent: "ExampleBrowser/1.0",
    language: "pt-PT"
  });
});

test("does not create a record when Cloudflare supplied no client IP", () => {
  assert.equal(
    visitFromRequest(new Request("https://www.tgstavares.com/")),
    null
  );
});

test("writes visits and prunes records older than thirty days", async () => {
  const database = databaseSpy();
  await writeVisit(database, {
    visitedAt: 1_725_000_000,
    ip: "203.0.113.9",
    country: "PT",
    path: "/research/",
    referrerHost: "example.edu",
    city: "Lisbon",
    region: "Lisbon",
    asn: 64500,
    asOrganization: "Example University",
    userAgent: "ExampleBrowser/1.0",
    language: "pt-PT"
  });
  await pruneOldVisits(database);

  assert.match(database.calls[0].sql, /INSERT INTO visits/);
  assert.deepEqual(database.calls[0].bindings, [
    1_725_000_000,
    "203.0.113.9",
    "PT",
    "/research/",
    "example.edu",
    "Lisbon",
    "Lisbon",
    64500,
    "Example University",
    "ExampleBrowser/1.0",
    "pt-PT"
  ]);
  assert.equal(database.calls[0].ran, true);
  assert.match(database.calls[1].sql, /DELETE FROM visits/);
  assert.deepEqual(database.calls[1].bindings, [2_592_000]);
  assert.equal(database.calls[1].ran, true);
});

test("forwards requests while recording a document asynchronously", async () => {
  const originalFetch = globalThis.fetch;
  const database = databaseSpy();
  const backgroundTasks = [];
  globalThis.fetch = async () => new Response("origin", { status: 200 });

  try {
    const response = await worker.fetch(
      new Request("https://www.tgstavares.com/", {
        headers: {
          "cf-connecting-ip": "203.0.113.9",
          "sec-fetch-dest": "document"
        }
      }),
      { VISITOR_DB: database },
      { waitUntil: (task) => backgroundTasks.push(task) }
    );
    await Promise.all(backgroundTasks);

    assert.equal(await response.text(), "origin");
    assert.equal(database.calls.length, 1);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
