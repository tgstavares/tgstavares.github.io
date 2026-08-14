import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html", host: "localhost" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the academic homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Tiago Tavares · Economist<\/title>/i);
  assert.match(html, /Working papers/);
  assert.match(html, /Publications/);
  assert.match(html, /Introduction to Macroeconomics/);
  assert.match(html, /data-theme="dark"/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("server-renders the main secondary routes", async () => {
  for (const path of ["/research", "/teaching", "/cv", "/personal"]) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  }
});

test("ships the finished assets and removes starter dependencies", async () => {
  await Promise.all([
    access(new URL("public/og.png", projectRoot)),
    access(new URL("public/images/tiago-tavares.jpg", projectRoot)),
    access(new URL("public/files/TiagoTavares_CV.pdf", projectRoot)),
  ]);

  const packageJson = await readFile(new URL("package.json", projectRoot), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
});
