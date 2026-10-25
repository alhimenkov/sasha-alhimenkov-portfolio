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
  for (const brand of ["Яндекс Сплит", "DAR", "Мамисон", "МЫС", "John Dory", "QNB", "Отелло", "adidas", "START", "Yota", "2ГИС", "Рассвет"]) {
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
  assert.match(page, /className="case-campaign-break"/);
  assert.match(page, /onClick=\{closeCase\} aria-label=\{copy\.closeCase\}/);
  assert.match(page, /activeProject\.role/);
  assert.match(css, /grid-template-columns:\s*1fr 1fr/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.doesNotMatch(projects, /https?:\/\//);
  assert.doesNotMatch(projects, /NIDAS/);
  assert.doesNotMatch(projects, /SOVAS/);
  assert.match(projects, /SOLOS/);
  assert.match(projects, /RAKURS/);
  assert.match(projects, /Formula 1/);
  assert.doesNotMatch(page, /disabled=\{!hasCase\}/);
  assert.match(page, /onClick=\{\(\) => openCase\(project\)\}/);
  assert.match(page, /3400/);
  assert.match(page, /prefers-reduced-motion: reduce/);
  assert.match(page, /rootMargin:\s*"480px 0px"/);
  assert.match(page, /rootMargin:\s*"240px 0px"/);
  assert.match(page, /active=\{index === previewIndex\}/);
  assert.match(page, /preload=\{videoActive \? "metadata" : "none"\}/);
  assert.match(page, /gridTemplateColumns:\s*`\$\{caseSplit\}fr/);
  assert.match(css, /container-name:\s*case-story/);
  assert.match(css, /@container case-story \(max-width:\s*620px\)/);
  assert.match(css, /\.case-media figure[^}]+min-height:\s*0[^}]+background:\s*transparent/);
  assert.doesNotMatch(page, /CaseMediaFigure[^]*style=\{\{ background: tone \}\}/);
  assert.doesNotMatch(page, /case-preview-media"\s*style=\{\{ background:/);
  assert.match(projects, /previewFit\?: "cover" \| "contain"/);
  assert.match(page, /cover\?\.previewFit === "contain"/);
  assert.match(css, /\.preview-frame > \.visual-contain \{[^}]+width: 100%;[^}]+height: 100%;[^}]+max-width: none;[^}]+max-height: none;[^}]+object-fit: contain;/);
  for (const protectedArtwork of ["/cases/otello.jpg", "/cases/kappa/cover.webp", "/cases/burger-king/not-the-same-kv.png", "/cases/yandex-split/flight-02.png", "/cases/mys/detail-b.jpg"]) {
    assert.match(projects, new RegExp(`artwork\\(\\"${protectedArtwork.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\"`));
  }
  assert.match(page, /className="gallery-card"[^]*?<figure>\s*<ProjectVisual/);
  for (const localCase of [
    "/cases/start/film.mp4",
    "/cases/demix/motivation.mp4",
    "/cases/demix/manifesto.mp4",
    "/cases/yota/oneheart-film.mp4",
    "/cases/familia/film-01.mp4",
    "/cases/familia/film-02.mp4",
    "/cases/familia/film-03.mp4",
    "/cases/jumeirah/hero.mp4",
    "/cases/onkologika/film.mp4",
    "/cases/travli/film.mp4",
    "/cases/adidas/al-nassr.mp4",
    "/cases/adidas/grigor.mp4",
    "/cases/adidas/you-got-this.mp4",
    "/cases/adidas/city-views-linda-caicedo.mp4",
    "/cases/first-and-red/sabalenka.mp4",
    "/cases/first-and-red/khachanov.mp4",
    "/cases/fonbet/pirlo-film.mp4",
    "/cases/dar/solos-dooh.mp4",
    "/cases/dar/solos-poster.jpg",
    "/cases/dar/rakurs-film.mp4",
    "/cases/dar/rakurs-poster.jpg",
    "/cases/dar/rakurs-portrait.jpg",
    "/cases/dar/rakurs-child.jpg",
    "/cases/kappa/directors-cut.mp4",
    "/cases/kappa/directors-cut-poster.jpg",
    "/cases/burger-king/not-the-same.mp4",
    "/cases/burger-king/cheddar-king.mp4",
    "/cases/burger-king/mozzarella-king.mp4",
    "/cases/burger-king/six-for-200.mp4",
    "/cases/burger-king/parmesan-tower.mp4",
    "/cases/burger-king/angus.mp4",
    "/cases/burger-king/mystery-combo.mp4",
    "/cases/2gis/city.mp4",
    "/cases/2gis/home.mp4",
    "/cases/2gis/rescue.mp4",
    "/cases/2gis/billboard-01.jpg",
    "/cases/2gis/billboard-02.jpg",
    "/cases/sportmaster/run.mp4",
    "/cases/sportmaster/football.mp4",
    "/cases/delimobil/film.mp4",
    "/cases/rassvet/hero-collage.jpg",
    "/cases/qnb/teaser-mom.mp4",
    "/cases/qnb/teaser-taxi.mp4",
    "/cases/qnb/teaser-magazine.mp4",
    "/cases/qnb/magazine-front.jpg",
    "/cases/qnb/film-gold-room.jpg",
    "/cases/qnb/film-party.jpg",
    "/cases/qnb/film-restaurant.jpg",
    "/cases/qnb/qnb-beyond.mp4",
    "/cases/qnb/qnb-beyond-poster.jpg",
    "/cases/qnb/qnb-beyond-city-model.jpg",
    "/cases/qnb/qnb-beyond-health.jpg",
    "/cases/qnb/qnb-beyond-stadium.jpg",
    "/cases/qnb/set-01.mp4",
    "/cases/qnb/set-02.mp4",
    "/cases/technopark/spring-film.mp4",
    "/cases/technopark/winter-film.mp4",
  ]) {
    assert.match(projects, new RegExp(localCase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  for (const chapter of ["Поездка начинается раньше", "Не форма для команды. Форма для персонажа", "Старый упрёк стал новым обещанием", "Сначала характер. Потом ценность", "Человек больше диагноза", "У травли всегда есть зрители", "Магазин стал сериалом", "Город её глазами", "Сила не заканчивается на корте", "Маэстро не повышает голос", "Между дебрифом и камерой — десять дней", "Подарки выросли в лес", "Мама рядом. Теперь буквально", "Один ярлык. Две культуры"]) {
    assert.match(projects, new RegExp(chapter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(projects, /id: "kappa"[^\n]+year: "2023"/);
  assert.match(projects, /\/cases\/kappa\/film\.mp4/);
  assert.match(projects, /\/cases\/kappa\/directors-cut\.mp4/);
  assert.match(projects, /id: "burger-king"[^\n]+year: "2021—2022"/);
  assert.equal(new Set([...projects.matchAll(/\/cases\/burger-king\/[^"']+\.mp4/g)].map((match) => match[0])).size, 7);
  assert.match(projects, /layout: "portrait"/);
  assert.doesNotMatch(projects, /\/cases\/qnb\/(?:kv-\d+\.jpg|caseboard\.png|teaser\.jpg|social-motion\.jpg)/);
  assert.doesNotMatch(projects, /\/cases\/qnb\/(?:magazine-back\.jpg|teaser-rice\.mp4|teaser-gold\.mp4)/);
  assert.equal(new Set([...projects.matchAll(/\/cases\/qnb\/teaser-[^"']+\.mp4/g)].map((match) => match[0])).size, 3);
  assert.match(projects, /Ads of the World и Campaign Middle East/);
  assert.match(projects, /Уверенность растёт\. Здравый смысл — нет/);
  assert.match(projects, /id: "qnb"[^\n]+year: "2024—2025"/);
  assert.match(projects, /Сначала — показать размер бренда/);
  assert.match(projects, /Live action входит в CGI\. Шва не видно/);
  assert.match(projects, /Кампания 01/);
  assert.match(projects, /Кампания 02/);
  assert.match(css, /\.case-media-portrait \{[^}]+repeat\(6, minmax\(0,1fr\)\)/);

  const assets = [...projects.matchAll(/["'](\/[^"']+\.(?:jpg|png|mp4))["']/g)].map((match) => match[1]);
  assert.ok(assets.length >= 10);
  for (const asset of new Set(assets)) {
    await access(new URL(`../public${asset}`, import.meta.url));
  }
});

test("includes the portfolio-specific studio instruments", async () => {
  const [page, instruments, css, localization] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/studio-instruments.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/localization.ts", import.meta.url), "utf8"),
  ]);

  assert.match(page, /copy\.sound/);
  assert.match(localization, /Студийный звук/);
  assert.match(localization, /Studio sound/);
  assert.match(page, /Europe\/Moscow/);
  assert.match(page, /role="slider"/);
  assert.match(page, /portfolio-case-split/);
  assert.match(page, /function GalleryIcon/);
  assert.match(page, /function LanguageIcon/);
  assert.match(page, /function ThemeIcon/);
  assert.doesNotMatch(page, /className=\{`avatar/);
  assert.match(instruments, /AudioContext/);
  assert.match(instruments, /weatherKind/);
  assert.match(css, /\.weather-orb/);
  assert.match(css, /\.case-split-handle/);
  assert.match(css, /aspect-ratio:\s*3\s*\/\s*2/);
  assert.match(css, /object-fit:\s*cover/);
  assert.match(css, /@keyframes sound-meter/);
  assert.match(css, /@keyframes sound-preview/);
  assert.match(css, /@keyframes weather-cloud-pass/);
  assert.match(css, /@keyframes weather-fall/);
});

test("ships a complete persistent RU and EN language layer", async () => {
  const [page, localization] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/localization.ts", import.meta.url), "utf8"),
  ]);

  assert.match(page, /portfolio-language/);
  assert.match(page, /document\.documentElement\.lang = language/);
  assert.match(page, /localizeProject\(project, language\)/);
  assert.match(page, /className="case-language-button"/);
  assert.match(localization, /Project index/);
  assert.match(localization, /Индекс проектов/);
  for (const id of ["yandex-split", "dar", "mamison", "start", "demix", "yota", "familia", "burger-king"]) {
    assert.match(localization, new RegExp(`["']?${id}["']?\\s*:`));
  }
  for (const chapter of ["The journey starts earlier", "Not a team uniform. A character build", "An old criticism became a new promise", "Character first. Value second", "A person is more than a diagnosis", "Bullying always has an audience", "The store became a series", "The city through her eyes", "Power does not end at the baseline", "The maestro never raises his voice", "Ten days from debrief to camera", "The gifts grew into a forest", "Mother stays close. Now literally", "One label. Two cultures"]) {
    assert.match(localization, new RegExp(chapter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.match(localization, /Leaving other people’s noise behind/);
  assert.match(localization, /The same idea\. Shorter and closer/);
  assert.match(localization, /The magazine was not made for a deck/);
  assert.match(localization, /First, show the size of the brand/);
  assert.match(localization, /Live action enters CGI\. The seam disappears/);
  assert.match(localization, /Campaign 01/);
  assert.match(localization, /Campaign 02/);
  assert.doesNotMatch(localization, /NIDAS/);
});
