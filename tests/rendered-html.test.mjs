import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const exportRoot = new URL("../out/", import.meta.url);

async function render(path = "/") {
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");
  const isFile = /\.[a-z0-9]+$/i.test(normalizedPath);
  const relativePath = normalizedPath
    ? isFile
      ? normalizedPath
      : `${normalizedPath}/index.html`
    : "index.html";

  try {
    const body = await readFile(new URL(relativePath, exportRoot));
    const contentType = relativePath.endsWith(".html")
      ? "text/html; charset=utf-8"
      : relativePath.endsWith(".xml")
        ? "application/xml; charset=utf-8"
        : "text/plain; charset=utf-8";

    return new Response(body, {
      status: 200,
      headers: { "content-type": contentType },
    });
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return new Response("Not found", { status: 404 });
    }
    throw error;
  }
}

test("server-renders the academic homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Tiago Tavares · Economist<\/title>/i);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/www\.tgstavares\.com\/"\/>/,
  );
  assert.match(
    html,
    /<meta property="og:url" content="https:\/\/www\.tgstavares\.com\/"\/>/,
  );
  assert.match(html, /<meta name="twitter:creator" content="@tgstavares"\/>/);
  assert.match(html, /<link rel="shortcut icon" href="\/favicon\.ico"\/>/);
  assert.match(html, /<link rel="apple-touch-icon" href="\/apple-touch-icon\.png"/);
  assert.match(html, /<script type="application\/ld\+json">/);
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /"name":"Tiago Gomes da Silva Tavares"/);
  assert.match(html, /<h1 class="visually-hidden">Tiago Tavares<\/h1>/);
  assert.match(html, /Recent working papers/);
  assert.match(html, /Publications/);
  assert.match(html, /xhdfe: Fast high-dimensional fixed-effects estimation in Stata/);
  assert.match(html, /Tiago Tavares joint with Miguel Portela/);
  assert.match(html, /abstract_id=7271338/);
  assert.match(
    html,
    /href="https:\/\/github\.com\/reisportela\/xhdfe-xfe"[^>]*aria-label="GITHUB for xhdfe:[^"]+">GITHUB<\/a>/,
  );
  assert.match(html, /Tiago Tavares joint with Anurag Singh/);
  assert.doesNotMatch(
    html,
    /Delays in Death Reports and their Implications|Heterogeneous Investment Dynamics of Greek Manufacturing Firms/,
  );
  assert.doesNotMatch(html, />SSRN<|>RePEc</);
  assert.match(html, />LINK</);
  assert.doesNotMatch(
    html,
    /Noisy Information About the Trend and Sovereign Default Risk|Dam_Sharma_Tavares_2023_manpremium\.pdf|>Article</,
  );
  assert.doesNotMatch(html, /Abstracts and complete research record/);
  assert.match(html, />Working paper<\/a>/);
  assert.match(html, /10\.1016\/j\.jedc\.2025\.105080/);
  assert.match(html, /10\.1016\/j\.jdeveco\.2021\.102774/);
  assert.match(html, /10\.1016\/j\.jedc\.2019\.103749/);
  assert.match(html, /<p class="paper-title">/);
  assert.match(html, /<details class="paper-abstract">/);
  assert.match(html, /<summary class="abstract-toggle">Abstract<\/summary>/);
  assert.match(
    html,
    /<div class="paper-meta"><p class="paper-venue">Working paper<\/p><div class="paper-links"/,
  );
  assert.match(
    html,
    /Revise and resubmit(?:<!-- -->)?, <strong class="journal-name"><em>IMF Economic Review<\/em><\/strong>/,
  );
  assert.match(
    html,
    /<strong class="journal-name"><em>Journal of Financial Economics<\/em><\/strong>, 145\(1\)/,
  );
  assert.doesNotMatch(html, /<h3 class="paper-title">/);
  assert.doesNotMatch(html, /Introduction to Macroeconomics|id="teaching"/);
  assert.match(html, /data-theme="dark"/);
  assert.match(html, /data-palette="cobalt"/);
  assert.match(html, /Use Cobalt theme/);
  assert.match(html, /Use Day theme/);
  assert.match(html, /aria-label="Use Cobalt theme"[^>]*aria-pressed="true"/);
  assert.match(html, /aria-label="Use Day theme"[^>]*aria-pressed="false"/);
  assert.doesNotMatch(html, /Use Graphite theme|Use Monochrome theme/);
  assert.match(html, /aria-label="Email Tiago Tavares"/);
  assert.match(html, /href="https:\/\/github\.com\/tgstavares"/);
  assert.match(html, /aria-label="Tiago Tavares on GitHub"/);
  assert.match(html, /<div class="profile-details">/);
  assert.match(html, /<strong>Full name:<\/strong> Tiago Gomes da Silva Tavares/);
  assert.match(html, /href="\/files\/TiagoTavares_CV\.pdf">PDF<\/a>/);
  assert.match(html, /mailto:tgstavares@gmail\.com/);
  assert.match(html, /mailto:tgstavares@eeg\.uminho\.pt/);
  assert.match(html, />github\.com\/tgstavares<\/a>/);
  assert.match(html, /href="https:\/\/x\.com\/tgstavares">x\.com\/tgstavares<\/a>/);
  assert.match(
    html,
    /href="https:\/\/www\.linkedin\.com\/in\/tiago-tavares-b1612025b\/">linkedin\.com\/in\/tiago-tavares-b1612025b<\/a>/,
  );
  assert.doesNotMatch(
    html,
    /Homepage sections|Profile and contact information|href="#personal"|href="\/personal"|id="personal"/,
  );
  assert.match(html, /<h2 id="home-title">Tiago Tavares<\/h2>/);
  assert.match(html, /Macroeconomics · International Economics · Firm Dynamics/);
  assert.doesNotMatch(
    html,
    /Current projects in macroeconomics|Published work|Peer-reviewed research on sovereign risk/,
  );
  assert.doesNotMatch(html, /<footer\b|Legacy archive/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("server-renders the main secondary routes", async () => {
  const routes = [
    ["/research", "Research"],
    ["/teaching", "Teaching"],
    ["/cv", "Curriculum Vitae"],
  ];

  for (const [path, title] of routes) {
    const response = await render(path);
    assert.equal(response.status, 200, path);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

    const html = await response.text();
    assert.match(html, new RegExp(`<title>${title} · Tiago Tavares<\\/title>`));
    assert.match(
      html,
      new RegExp(
        `<link rel="canonical" href="https:\\/\\/www\\.tgstavares\\.com${path}\\/"\\/>`,
      ),
    );
  }
});

test("serves production robots and sitemap metadata", async () => {
  const robotsResponse = await render("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  assert.match(robotsResponse.headers.get("content-type") ?? "", /^text\/plain\b/i);
  const robots = await robotsResponse.text();
  assert.match(robots, /User-Agent: \*\nAllow: \//);
  assert.match(robots, /Host: https:\/\/www\.tgstavares\.com/);
  assert.match(robots, /Sitemap: https:\/\/www\.tgstavares\.com\/sitemap\.xml/);

  const sitemapResponse = await render("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapResponse.headers.get("content-type") ?? "", /application\/xml/i);
  const sitemap = await sitemapResponse.text();
  for (const path of ["/", "/research", "/teaching", "/cv"]) {
    assert.match(sitemap, new RegExp(`<loc>https:\\/\\/www\\.tgstavares\\.com${path}<\\/loc>`));
  }
});

test("personal is no longer a site route", async () => {
  const response = await render("/personal");
  assert.equal(response.status, 404);
});

test("research starts with publications and keeps abstracts with paper metadata", async () => {
  const response = await render("/research");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<main class="page-shell research-shell">/);
  assert.match(html, /<h1 class="visually-hidden">Research<\/h1>/);
  assert.doesNotMatch(html, /class="page-header"/);
  assert.doesNotMatch(
    html,
    /Working papers, peer-reviewed publications, and conference discussions/,
  );
  assert.match(
    html,
    /<h2>Publications<\/h2>.*?<h2>Working papers<\/h2>.*?<h2>Paper discussions<\/h2>/s,
  );
  assert.match(
    html,
    /<div class="paper-meta"><p class="paper-venue">Working paper<\/p><div class="paper-links"[^>]*>.*?<\/div><details class="paper-abstract">/,
  );
  assert.doesNotMatch(html, /discussion-list/);
  assert.match(html, /Mind the Gaps: Gender Complementarities in Migration and FDI/);
  assert.match(html, /Delays in Death Reports and their Implications/);
  assert.match(html, /Heterogeneous Investment Dynamics of Greek Manufacturing Firms/);
  assert.match(html, /<span class="paper-year">2023<\/span>/);
  assert.match(html, /1st Notre Dame–ITAM PODER Mini-Conference/);
  assert.match(html, /aria-label="Links for Mind the Gaps:[^"]+"><a[^>]+>PDF<\/a>/);
});

test("teaching starts with current courses and links the complete previous record", async () => {
  const response = await render("/teaching");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<main class="page-shell teaching-shell">/);
  assert.match(html, /<h1 class="visually-hidden">Teaching<\/h1>/);
  assert.doesNotMatch(html, /class="page-header"|Latest listed teaching|Previous courses/);
  assert.match(html, /<h2>Current<\/h2>/);
  assert.match(html, /<h2>Previous<\/h2>/);
  assert.doesNotMatch(html, /Summer 2013|Summer 2014|clientes\.netvisao\.pt/);
  assert.match(html, /href="\/legacy\/archive\/2015finteco\.html">Fall 2015<\/a>/);
  assert.match(html, /href="\/legacy\/archive\/spring2024\.html">Spring 2024<\/a>/);
  assert.match(html, /Advanced Macroeconomics II.*?Spring 2025/s);
  assert.match(html, /International Trade.*?Spring 2025/s);
  assert.match(html, /href="\/legacy\/archive\/fall2025\.html">Fall 2025<\/a>/);
  assert.doesNotMatch(html, /Applied Economics Research Workshop - Masters/);
  assert.doesNotMatch(html, /Historical course pages and materials/);

  const spring2025Archive = await readFile(
    new URL("public/legacy/archive/spring2025.html", projectRoot),
    "utf8",
  );
  assert.doesNotMatch(
    spring2025Archive,
    /href="\.\.\/(?:references|archive|contact)\.html"/,
  );
});

test("CV is a native web page with the updated academic record", async () => {
  const response = await render("/cv");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<main class="page-shell cv-shell">/);
  assert.match(html, /Last updated September 2026/);
  assert.match(html, /Assistant Professor, University of Lisbon - ISEG \(Portugal\)/);
  assert.match(html, /Firm Dynamics/);
  assert.match(html, /COVID-19 Economics/);
  assert.match(html, /Universidade Católica Portuguesa/);
  assert.match(html, /xhdfe: Fast high-dimensional fixed-effects estimation in Stata/);
  assert.match(html, /Talks and conferences/);
  assert.match(html, /Teaching experience/);
  assert.match(html, /Professor Yan Bai/);
  assert.match(html, /href="\/files\/TiagoTavares_CV\.pdf"[^>]*>.*?Download PDF/s);
  assert.doesNotMatch(html, /<iframe\b|class="cv-frame"/);
});

test("ships the finished assets and removes starter dependencies", async () => {
  await Promise.all([
    access(new URL(".github/workflows/deploy-pages.yml", projectRoot)),
    access(new URL("public/.nojekyll", projectRoot)),
    access(new URL("public/og.png", projectRoot)),
    access(new URL("public/favicon.ico", projectRoot)),
    access(new URL("public/favicon.png", projectRoot)),
    access(new URL("public/apple-touch-icon.png", projectRoot)),
    access(new URL("public/images/tiago-tavares.jpg", projectRoot)),
    access(new URL("public/files/TiagoTavares_CV.pdf", projectRoot)),
  ]);

  const packageJson = await readFile(new URL("package.json", projectRoot), "utf8");
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(packageJson, /vinext|wrangler|cloudflare|vite/i);
  assert.match(packageJson, /"next": "16\.3\.1"/);
  await assert.rejects(access(new URL("app/_sites-preview", projectRoot)));
});
