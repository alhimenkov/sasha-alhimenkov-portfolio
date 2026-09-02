"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { projects, type Filter, type Project } from "./projects";
import { playStudioCue, weatherKind, weatherLabels, type WeatherKind } from "./studio-instruments";

const practice = [
  { title: "HowToSasha", tags: ["Инструмент", "Web"], number: "04", text: "Восемь инструкций о совместной работе — от мутной задачи до сильного решения." },
  { title: "Обратный бриф", tags: ["Метод"], number: "03", text: "Способ превратить формальный запрос в задачу, по которой можно принимать решения." },
  { title: "Zero Draft", tags: ["Метод", "Креатив"], number: "02", text: "Первый креативный проход: несколько принципиально разных маршрутов вместо полировки одного." },
  { title: "Creative Studio OS", tags: ["Система"], number: "01", text: "Принципы, процессы и критерии качества для инхаус-студии, которая работает как система." },
];

function ProjectVisual({ project, compact = false, mediaIndex = 0 }: { project: Project; compact?: boolean; mediaIndex?: number }) {
  const cover = project.media?.[mediaIndex] ?? project.media?.[0];
  if (cover?.type === "image") return <img src={cover.src} alt={cover.alt} />;
  if (cover?.type === "video") return <video src={cover.src} poster={cover.poster} muted loop autoPlay playsInline preload="metadata"><track kind="captions" src="/captions/portfolio.vtt" srcLang="ru" label="Русский" /></video>;
  return (
    <span className="generated-cover" style={{ background: project.tone }}>
      <b>{project.title}</b>
      {!compact && <small>{project.year}<br />{project.tags.join(" / ")}</small>}
    </span>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<Filter>("all");
  const [galleryView, setGalleryView] = useState(false);
  const [light, setLight] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutClosing, setAboutClosing] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [storyOpen, setStoryOpen] = useState(false);
  const [caseClosing, setCaseClosing] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [practiceOpen, setPracticeOpen] = useState<(typeof practice)[number] | null>(null);
  const [practiceClosing, setPracticeClosing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [filterPill, setFilterPill] = useState({ x: 6, width: 0 });
  const [projectHover, setProjectHover] = useState<{ id: string; y: number; height: number } | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [moscowTime, setMoscowTime] = useState("");
  const [weather, setWeather] = useState<{ kind: WeatherKind; temperature: number | null; isDay: boolean }>({ kind: "clear", temperature: null, isDay: true });
  const [caseSplit, setCaseSplit] = useState(50);
  const [splitDragging, setSplitDragging] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const soundRef = useRef(false);
  const splitDraggingRef = useRef(false);
  const caseSplitRef = useRef(50);

  const closeCase = useCallback(() => {
    if (!selected || caseClosing) return;
    setCaseClosing(true);
    window.setTimeout(() => {
      setSelected(null);
      setStoryOpen(false);
      setCaseClosing(false);
    }, 560);
  }, [selected, caseClosing]);

  const visibleProjects = useMemo(
    () => filter === "all" ? projects : projects.filter((project) => project.filter === filter),
    [filter],
  );

  const anyModalOpen = Boolean(aboutOpen || selected || practiceOpen);

  const openAbout = () => {
    setAboutClosing(false);
    setAboutOpen(true);
  };

  const closeAbout = useCallback(() => {
    if (!aboutOpen || aboutClosing) return;
    setAboutClosing(true);
    window.setTimeout(() => {
      setAboutOpen(false);
      setAboutClosing(false);
    }, 560);
  }, [aboutOpen, aboutClosing]);

  const openPractice = (item: (typeof practice)[number]) => {
    setPracticeClosing(false);
    setPracticeOpen(item);
  };

  const closePractice = useCallback(() => {
    if (!practiceOpen || practiceClosing) return;
    setPracticeClosing(true);
    window.setTimeout(() => {
      setPracticeOpen(null);
      setPracticeClosing(false);
    }, 560);
  }, [practiceOpen, practiceClosing]);

  const closeStory = useCallback(() => {
    if (window.matchMedia("(max-width: 820px)").matches) closeCase();
    else setStoryOpen(false);
  }, [closeCase]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem("portfolio-theme");
      if (saved === "light" || saved === "dark") {
        setLight(saved === "light");
        return;
      }
      if (window.matchMedia("(max-width: 820px)").matches) {
        setLight(window.matchMedia("(prefers-color-scheme: light)").matches);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const savedSound = window.localStorage.getItem("portfolio-sound");
      const enabled = !reducedMotion && savedSound === "on";
      setSoundEnabled(enabled);
      soundRef.current = enabled;
      const savedSplit = Number.parseFloat(window.localStorage.getItem("portfolio-case-split") ?? "");
      if (Number.isFinite(savedSplit) && savedSplit >= 32 && savedSplit <= 68) {
        caseSplitRef.current = savedSplit;
        setCaseSplit(savedSplit);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const updateClock = () => setMoscowTime(new Intl.DateTimeFormat("ru-RU", {
      timeZone: "Europe/Moscow", weekday: "short", hour: "2-digit", minute: "2-digit",
    }).format(new Date()).replace(",", " ·"));
    updateClock();
    const clock = window.setInterval(updateClock, 30_000);
    const controller = new AbortController();
    fetch("https://api.open-meteo.com/v1/forecast?latitude=55.7558&longitude=37.6173&current=temperature_2m,weather_code,is_day&timezone=Europe%2FMoscow", { signal: controller.signal })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => {
        if (!data?.current) return;
        setWeather({
          kind: weatherKind(Number(data.current.weather_code)),
          temperature: Math.round(Number(data.current.temperature_2m)),
          isDay: Boolean(data.current.is_day),
        });
      })
      .catch(() => undefined);
    return () => { window.clearInterval(clock); controller.abort(); };
  }, []);

  useEffect(() => {
    const hover = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const target = event.target instanceof Element ? event.target.closest("button, a") : null;
      if (target && !target.contains(event.relatedTarget as Node | null)) playStudioCue("hover", soundRef.current);
    };
    const press = (event: PointerEvent) => {
      if (event.target instanceof Element && event.target.closest("button, a")) playStudioCue("press", soundRef.current);
    };
    document.addEventListener("pointerover", hover);
    document.addEventListener("pointerdown", press);
    return () => { document.removeEventListener("pointerover", hover); document.removeEventListener("pointerdown", press); };
  }, []);

  useEffect(() => {
    let value = 0;
    const timer = window.setInterval(() => {
      value = Math.min(100, value + Math.ceil(Math.random() * 18));
      setLoadProgress(value);
      if (value === 100) window.clearInterval(timer);
    }, 55);
    const done = window.setTimeout(() => setLoading(false), 850);
    return () => { window.clearInterval(timer); window.clearTimeout(done); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("in-view")),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [galleryView]);

  useEffect(() => {
    document.body.style.overflow = anyModalOpen ? "hidden" : "";
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (aboutOpen) closeAbout();
      else if (practiceOpen) closePractice();
      else if (selected && storyOpen) closeStory();
      else closeCase();
    };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [aboutOpen, practiceOpen, selected, storyOpen, anyModalOpen, closeAbout, closePractice, closeStory, closeCase]);

  useEffect(() => {
    const update = () => {
      const root = filterRef.current;
      const active = root?.querySelector<HTMLButtonElement>('button[aria-selected="true"]');
      if (active) setFilterPill({ x: active.offsetLeft, width: active.offsetWidth });
    };
    const frame = window.requestAnimationFrame(update);
    document.fonts?.ready.then(update);
    window.addEventListener("resize", update);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", update);
    };
  }, [filter, galleryView]);

  useEffect(() => {
    if (!selected || (selected.media?.length ?? 0) < 2) return;
    const timer = window.setInterval(() => {
      setPreviewIndex((value) => (value + 1) % (selected.media?.length ?? 1));
    }, 680);
    return () => window.clearInterval(timer);
  }, [selected]);

  const openCase = (project: Project) => {
    setCaseClosing(false);
    setStoryOpen(false);
    setPreviewIndex(0);
    setSelected(project);
    playStudioCue("open", soundRef.current);
  };

  const changeFilter = (next: Filter) => {
    setFilter(next);
    setGalleryView(false);
  };

  const toggleTheme = () => {
    setLight((value) => {
      const next = !value;
      window.localStorage.setItem("portfolio-theme", next ? "light" : "dark");
      return next;
    });
  };

  const toggleSound = () => {
    setSoundEnabled((current) => {
      const next = !current;
      soundRef.current = next;
      window.localStorage.setItem("portfolio-sound", next ? "on" : "off");
      if (next) playStudioCue("ready", true);
      return next;
    });
  };

  const updateCaseSplit = (clientX: number) => {
    const next = Math.max(32, Math.min(68, (clientX / window.innerWidth) * 100));
    caseSplitRef.current = next;
    setCaseSplit(next);
  };

  const startSplitResize = (event: ReactPointerEvent<HTMLButtonElement>) => {
    splitDraggingRef.current = true;
    setSplitDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    document.body.style.userSelect = "none";
    updateCaseSplit(event.clientX);
  };

  const moveSplitResize = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!splitDraggingRef.current) return;
    updateCaseSplit(event.clientX);
  };

  const endSplitResize = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!splitDraggingRef.current) return;
    splitDraggingRef.current = false;
    setSplitDragging(false);
    document.body.style.userSelect = "";
    try { event.currentTarget.releasePointerCapture(event.pointerId); } catch { /* capture may already be released */ }
    window.localStorage.setItem("portfolio-case-split", caseSplitRef.current.toFixed(1));
    playStudioCue("ready", soundRef.current);
  };

  const keySplitResize = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const step = event.shiftKey ? 5 : 2;
    let next = caseSplit;
    if (event.key === "ArrowLeft") next -= step;
    else if (event.key === "ArrowRight") next += step;
    else if (event.key === "Home") next = 50;
    else return;
    event.preventDefault();
    next = Math.max(32, Math.min(68, next));
    caseSplitRef.current = next;
    setCaseSplit(next);
    window.localStorage.setItem("portfolio-case-split", next.toFixed(1));
    playStudioCue("press", soundRef.current);
  };

  return (
    <div className={`${light ? "site light" : "site"}${anyModalOpen ? " has-modal" : ""}`}>
      <div className={loading ? "loader" : "loader loader-done"} aria-hidden={!loading}>
        <span>/{loadProgress}</span>
      </div>

      <div className="page-field" />
      <div className="rail rail-left" />
      <div className="rail rail-right" />

      <header className={galleryView ? "floating-nav gallery-mode" : "floating-nav"} aria-label="Навигация">
        <a className="avatar" href="#top" aria-label="Саша Алхименков — в начало">
          <img src="/sasha-hero.jpg" alt="" />
          <span />
        </a>
        {!galleryView && (
          <div className="filters" ref={filterRef} role="tablist" aria-label="Фильтр проектов">
            <span className="filter-pill" style={{ width: filterPill.width, transform: `translateX(${filterPill.x}px)` }} aria-hidden="true" />
            {([['all', 'Все'], ['brand', 'Бренд'], ['campaign', 'Кампании']] as const).map(([value, label]) => (
              <button className={filter === value ? "is-active" : ""} key={value} onClick={() => changeFilter(value)} role="tab" aria-selected={filter === value}>{label}</button>
            ))}
          </div>
        )}
        <button className="nav-button view-button" onClick={() => setGalleryView((value) => !value)}>
          <span aria-hidden="true">{galleryView ? "‹" : "▦"}</span> {galleryView ? "Индекс" : "Галерея"}
        </button>
        <button className="nav-button about-button" onClick={openAbout}>Обо мне</button>
        <button className="theme-button" onClick={toggleTheme} aria-label="Сменить светлую и тёмную тему">◐</button>
      </header>

      <main className="wrap" id="top">
        <section className="hero reveal">
          <p>
            <button onClick={openAbout}>Саша Алхименков</button> — креативный директор.
            Превращаю сложные продукты в <button onClick={() => changeFilter("brand")}>ясные бренды</button>,
            <button onClick={() => changeFilter("campaign")}> кампании</button> и системы. Сейчас руковожу
            <strong> Creative Studio Финтеха Яндекса.</strong>
          </p>
          <button className="mobile-theme" onClick={toggleTheme} aria-label="Сменить тему">◐</button>
        </section>

        {!galleryView ? (
          <>
            <section className="section project-section reveal" aria-labelledby="project-index">
              <h1 id="project-index">Индекс проектов</h1>
              <div className="project-list filtered-list" onMouseLeave={() => setProjectHover(null)}>
                <span
                  className={`project-hover-bar${projectHover ? " is-visible" : ""}`}
                  style={{ height: projectHover?.height ?? 0, transform: `translateY(${projectHover?.y ?? 0}px)` }}
                  aria-hidden="true"
                />
                <span
                  className={`project-hover-cap${projectHover ? " is-visible" : ""}`}
                  style={{ height: projectHover?.height ?? 0, transform: `translateY(${projectHover?.y ?? 0}px)` }}
                  aria-hidden="true"
                >↗</span>
                {visibleProjects.map((project, index) => (
                  <button
                    className={`project-row${projectHover?.id === project.id ? " is-active" : ""}`}
                    style={{ animationDelay: `${index * 22}ms` }}
                    onMouseEnter={(event) => setProjectHover({ id: project.id, y: event.currentTarget.offsetTop - 2, height: event.currentTarget.offsetHeight + 4 })}
                    onFocus={(event) => setProjectHover({ id: project.id, y: event.currentTarget.offsetTop - 2, height: event.currentTarget.offsetHeight + 4 })}
                    onBlur={() => setProjectHover(null)}
                    onClick={() => openCase(project)}
                    key={project.id}
                  >
                    <span className="project-tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</span>
                    <span className="project-title">{project.title}</span>
                    <sup>{project.number}</sup>
                  </button>
                ))}
              </div>
              {filter !== "all" && <button className="show-all" onClick={() => setFilter("all")}>Показать все</button>}
            </section>

            <section className="section practice-section reveal" aria-labelledby="practice-title">
              <div className="section-copy">
                <h2 id="practice-title">ПРАКТИКА</h2>
                <p>Инструменты, методы и рабочие системы для креативной разработки.</p>
              </div>
              <div className="project-list practice-list">
                {practice.map((item) => (
                  <button className="project-row" onClick={() => openPractice(item)} key={item.number}>
                    <span className="project-tags">{item.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</span>
                    <span className="project-title">{item.title}</span>
                    <sup>{item.number}</sup>
                  </button>
                ))}
              </div>
            </section>

            <section className="section notes-section reveal" aria-labelledby="notes-title">
              <div className="section-copy">
                <h2 id="notes-title">архив/мыслей</h2>
                <p>Как я смотрю на креатив, команды и решения.</p>
              </div>
              <button className="note-row" onClick={() => openPractice(practice[1])}>Смысл перед формой <sup>02</sup></button>
              <button className="note-row" onClick={() => openPractice(practice[2])}>Не варианты, а маршруты <sup>01</sup></button>
            </section>
          </>
        ) : (
          <section className="gallery reveal in-view" aria-label="Галерея работ">
            {projects.map((project, index) => (
              <button className="gallery-card" style={{ animationDelay: `${(index % 9) * 45}ms` }} onClick={() => openCase(project)} key={project.id} aria-label={`Открыть кейс ${project.title}`}>
                <figure style={{ background: project.tone }}>
                  <ProjectVisual project={project} />
                </figure>
              </button>
            ))}
          </section>
        )}
      </main>

      <footer className="footer">
        <hr />
        <p>Новые работы появляются регулярно. Заходите ещё.</p>
        <div className="studio-instruments" aria-label="Студийный контекст">
          <div className={`weather-status weather-${weather.kind}${weather.isDay ? " is-day" : " is-night"}`} title={`Москва · ${weatherLabels[weather.kind]}${weather.temperature === null ? "" : ` · ${weather.temperature}°`} `}>
            <span className="weather-orb" aria-hidden="true"><span /></span>
            <span><b>Москва</b><time>{moscowTime || "GMT+3"}</time></span>
            <em>{weather.temperature === null ? weatherLabels[weather.kind] : `${weather.temperature}° · ${weatherLabels[weather.kind]}`}</em>
          </div>
          <button className="sound-toggle" onClick={toggleSound} aria-pressed={soundEnabled} aria-label={`${soundEnabled ? "Выключить" : "Включить"} звуковую обратную связь`}>
            <span className="sound-wave" aria-hidden="true"><i /><i /><i /></span>
            <span>Студийный звук <b>{soundEnabled ? "вкл" : "выкл"}</b></span>
          </button>
        </div>
        <nav aria-label="Контакты">
          <a href="mailto:alhimenkov@yandex-team.ru">Email ↗</a>
          <a href="https://t.me/tgimondays" target="_blank" rel="noreferrer">Telegram ↗</a>
        </nav>
        <div className="signature">Саша Алхименков</div>
      </footer>

      {aboutOpen && (
        <div className={`overlay${aboutClosing ? " overlay-closing" : ""}`} role="dialog" aria-modal="true" aria-label="Обо мне">
          <article className="modal bio-modal">
            <header><span>Обо мне</span><button onClick={closeAbout} aria-label="Закрыть">×</button></header>
            <div className="bio-grid">
              <aside>
                <strong>Саша Алхименков</strong>
                <a href="mailto:alhimenkov@yandex-team.ru">alhimenkov@yandex-team.ru ↗</a>
                <a href="https://t.me/tgimondays" target="_blank" rel="noreferrer">Telegram ↗</a>
              </aside>
              <div className="bio-content">
                <img src="/sasha-close.jpg" alt="Саша Алхименков" />
                <p className="bio-lead">Я креативный директор. Больше десяти лет собираю бренды, кампании и команды — от идеи и стратегии до работающей системы.</p>
                <p>С октября 2025 года руковожу Creative Studio Финтеха Яндекса. До этого был главным креативным директором SETTERS. Мне важен не объём производства, а качество решения: понять, что должно измениться, найти сильный маршрут и защитить его до результата.</p>
              </div>
            </div>
            <section className="bio-section"><h3>Опыт</h3><div><p><strong>Creative Studio Финтеха Яндекса</strong><em>Креативный директор · 2025 — сейчас</em></p><p><strong>SETTERS</strong><em>Главный креативный директор · до 2025</em></p><p><strong>Независимая практика</strong><em>Бренды, кампании, продукты и творческие системы</em></p></div></section>
            <section className="bio-section"><h3>Экспертиза</h3><div className="bio-columns"><p>Креативная стратегия<br />Кампании<br />Бренд-платформы<br />Айдентика</p><p>Нейминг<br />Creative direction<br />Командные процессы<br />AI-инструменты</p></div></section>
            <section className="bio-section"><h3>Клиенты</h3><p>Яндекс · Sberbank · Toyota · PepsiCo · Beeline · МегаФон · ВкусВилл · Самокат · Burger King · Netflix · Avito · adidas</p></section>
          </article>
        </div>
      )}

      {selected && (
        <div className={`case-overlay${caseClosing ? " is-closing" : ""}${storyOpen ? " story-open" : ""}`} role="dialog" aria-modal="true" aria-label={`Кейс ${selected.title}`}>
          <button className="case-backdrop-hit" onClick={closeCase} aria-label="Закрыть превью кейса" />
          <div className="case-layout" data-resizing={splitDragging} style={{ gridTemplateColumns: `${caseSplit}% ${100 - caseSplit}%` }}>
            <aside className="case-preview">
              <div className="case-preview-media" style={{ background: selected.tone }}>
                {(selected.media?.length ? selected.media : [null]).map((_, index) => (
                  <span className={index === previewIndex ? "preview-frame is-current" : "preview-frame"} key={index} aria-hidden={index !== previewIndex}>
                    <ProjectVisual project={selected} compact mediaIndex={index} />
                  </span>
                ))}
              </div>
              <footer>
                <p>{selected.title}<br /><em>{selected.year}</em></p>
                <button onClick={() => setStoryOpen(true)}>Case Study</button>
              </footer>
            </aside>

            <button
              className="case-split-handle"
              style={{ left: `${caseSplit}%` }}
              role="slider"
              aria-label="Изменить соотношение превью и текста"
              aria-orientation="horizontal"
              aria-valuemin={32}
              aria-valuemax={68}
              aria-valuenow={Math.round(caseSplit)}
              aria-valuetext={`${Math.round(caseSplit)} процентов превью, ${Math.round(100 - caseSplit)} процентов текста`}
              onPointerDown={startSplitResize}
              onPointerMove={moveSplitResize}
              onPointerUp={endSplitResize}
              onPointerCancel={endSplitResize}
              onKeyDown={keySplitResize}
            >
              <span aria-hidden="true"><i /><i /><i /></span>
              <em>{Math.round(caseSplit)} / {Math.round(100 - caseSplit)}</em>
            </button>

            <article className="case-story" aria-hidden={!storyOpen}>
              <header>
                <span>{selected.number}.</span>
                <button onClick={closeStory} aria-label="Закрыть case study">×</button>
              </header>
              <section className="case-intro">
                <div className="case-meta">
                  <h2>{selected.title}</h2>
                  <p><em>{selected.year}</em><br />Role: {selected.role}</p>
                  <div className="case-tags">{selected.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <div className="case-copy">
                  <p className="case-lede">{selected.lede}</p>
                  {selected.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {selected.works && <p className="case-work-list"><span>Selected work</span>{selected.works.join(" · ")}</p>}
                </div>
              </section>
              <section className="case-media" aria-label={`Материалы ${selected.title}`}>
                {(selected.media?.length ? selected.media : [{ type: "cover" as const }]).map((media, index) => (
                  <figure key={"src" in media ? media.src : `${selected.id}-${index}`} style={{ background: selected.tone }}>
                    {media.type === "image" && <img src={media.src} alt={media.alt} />}
                    {media.type === "video" && <video src={media.src} poster={media.poster} controls playsInline preload="metadata" aria-label={media.alt}><track kind="captions" src="/captions/portfolio.vtt" srcLang="ru" label="Русский" /></video>}
                    {media.type === "cover" && <span className="generated-cover"><b>{selected.title}</b><small>{selected.lede}</small></span>}
                  </figure>
                ))}
              </section>
            </article>
          </div>
        </div>
      )}

      {practiceOpen && (
        <div className={`overlay compact-overlay${practiceClosing ? " overlay-closing" : ""}`} role="dialog" aria-modal="true" aria-label={practiceOpen.title}>
          <article className="modal compact-modal">
            <header><span>{practiceOpen.number}. Практика</span><button onClick={closePractice} aria-label="Закрыть">×</button></header>
            <div><h2>{practiceOpen.title}</h2><p>{practiceOpen.text}</p></div>
          </article>
        </div>
      )}
    </div>
  );
}
