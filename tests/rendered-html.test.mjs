import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete brand index", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Саша Алхименков — креативный директор<\/title>/i);
  for (const brand of ["Яндекс Сплит", "DAR", "Мамисон", "MR Group", "John Dory", "QNB", "Отелло", "adidas", "START", "Yota", "2ГИС", "Рассвет"]) {
    assert.match(html, new RegExp(brand));
  }
  assert.doesNotMatch(html, /Fit&amp;Go|Второй шанс/);
  assert.match(html, /class="tag">CAMPAIGN/);
});

test("keeps case studies local and aligned to the split-panel reference", async () => {
  const [page, projects, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/projects.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /className="case-layout"/);
  assert.match(page, /className="case-preview"/);
  assert.match(page, /className="case-story"/);
  assert.match(page, /selected\.role/);
  assert.match(css, /grid-template-columns:\s*1fr 1fr/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(projects, /https?:\/\//);

  const assets = [...projects.matchAll(/["'](\/[^"']+\.(?:jpg|png|mp4))["']/g)].map((match) => match[1]);
  assert.ok(assets.length >= 10);
  for (const asset of new Set(assets)) {
    await access(new URL(`../public${asset}`, import.meta.url));
  }
});
