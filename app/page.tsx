"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { localizeProject, ui, type Language } from "./localization";
import { projects, type Filter, type Project, type ProjectMedia } from "./projects";
import { playStudioCue, weatherKind, type WeatherKind } from "./studio-instruments";

function GalleryIcon({ back = false }: { back?: boolean }) {
  return back ? (
    <svg className="nav-icon" viewBox="0 0 18 18" aria-hidden="true"><path d="M11.5 4.5 7 9l4.5 4.5" /></svg>
  ) : (
    <svg className="nav-icon" viewBox="0 0 18 18" aria-hidden="true"><rect x="3" y="3" width="5" height="5" rx="1" /><rect x="10" y="3" width="5" height="5" rx="1" /><rect x="3" y="10" width="5" height="5" rx="1" /><rect x="10" y="10" width="5" height="5" rx="1" /></svg>
  );
}

function LanguageIcon() {
  return <svg className="nav-icon" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="6" /><path d="M3.5 9h11M9 3c1.7 1.7 2.6 3.7 2.6 6S10.7 13.3 9 15M9 3C7.3 4.7 6.4 6.7 6.4 9S7.3 13.3 9 15" /></svg>;
}

function ThemeIcon({ light }: { light: boolean }) {
  return light ? (
    <svg className="nav-icon" viewBox="0 0 18 18" aria-hidden="true"><path d="M13.7 11.8A5.6 5.6 0 0 1 6.2 4.3 5.7 5.7 0 1 0 13.7 11.8Z" /></svg>
  ) : (
    <svg className="nav-icon" viewBox="0 0 18 18" aria-hidden="true"><circle cx="9" cy="9" r="3.2" /><path d="M9 1.8v2M9 14.2v2M1.8 9h2M14.2 9h2M3.9 3.9l1.4 1.4M12.7 12.7l1.4 1.4M14.1 3.9l-1.4 1.4M5.3 12.7l-1.4 1.4" /></svg>
  );
}

type HeroLinkKind = "about" | "brand" | "campaign";

function HeroLink({ label, kind, flashing, hinting, hintIndex, onClick }: { label: string; kind: HeroLinkKind; flashing: boolean; hinting: boolean; hintIndex: number; onClick: () => void }) {
  let letterIndex = 0;
  return (
    <button
      className={`hero-link hero-link-${kind}${flashing ? " is-flashing" : ""}${hinting ? " is-hinting" : ""}`}
      style={{ "--hint-index": hintIndex } as CSSProperties}
      aria-label={label}
      onClick={onClick}
    >
      <span className="hero-link-copy" aria-hidden="true">
        {label.split(" ").map((word, wordIndex, words) => (
          <span key={`${word}-${wordIndex}`}>
            <span className="hero-link-word">
              {Array.from(word).map((letter) => {
                const index = letterIndex++;
                return <span className="hero-letter" style={{ "--char-index": index } as CSSProperties} key={`${letter}-${index}`}>{letter}</span>;
              })}
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </button>
  );
}

function ProjectVisual({ project, compact = false, mediaIndex = 0, active }: { project: Project; compact?: boolean; mediaIndex?: number; active?: boolean }) {
  const cover = project.media?.[mediaIndex] ?? project.media?.[0];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const videoActive = active ?? inView;

  useEffect(() => {
    const player = videoRef.current;
    if (cover?.type !== "video" || active !== undefined || !player) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "240px 0px",
      threshold: 0.08,
    });
    observer.observe(player);
    return () => observer.disconnect();
  }, [active, cover?.src, cover?.type]);

  const fitClass = cover?.previewFit === "contain" ? "visual-contain" : "visual-cover";
  if (cover?.type === "image") return <img className={fitClass} src={cover.src} alt={cover.alt} loading={compact ? "eager" : "lazy"} decoding="async" />;
  if (cover?.type === "video") return <video className={fitClass} ref={videoRef} src={videoActive ? cover.src : undefined} poster={cover.poster} muted loop autoPlay={videoActive} playsInline preload={videoActive ? "metadata" : "none"} aria-label={cover.alt}><track kind="captions" src="/captions/portfolio.vtt" srcLang="ru" label="Русский" /></video>;
  return (
    <span className="generated-cover" style={{ background: project.tone }}>
      <b>{project.title}</b>
      {!compact && <small>{project.year}<br />{project.tags.join(" / ")}</small>}
    </span>
  );
}

function CaseMediaFigure({ media }: { media: ProjectMedia }) {
  const looping = media.type === "video" && media.playback === "loop";
  const figureRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(media.type !== "video");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const figure = figureRef.current;
    if (media.type !== "video" || !figure) return;

    const loadObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      setShouldLoad(true);
      loadObserver.disconnect();
    }, { rootMargin: "480px 0px" });
    const playbackObserver = new IntersectionObserver((entries) => {
      setIsVisible(entries.some((entry) => entry.isIntersecting));
    }, { threshold: 0.18 });

    loadObserver.observe(figure);
    playbackObserver.observe(figure);
    return () => {
      loadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, [media.src, media.type]);

  useEffect(() => {
    const player = videoRef.current;
    if (!looping || !player) return;
    if (shouldLoad && isVisible) player.play().catch(() => undefined);
    else player.pause();
  }, [isVisible, looping, shouldLoad]);

  return (
    <figure ref={figureRef} className={`case-media-item case-media-item-${media.type}`}>
      {media.type === "image" && <img className={media.previewFit === "contain" ? "visual-contain" : undefined} src={media.src} alt={media.alt} loading="lazy" decoding="async" />}
      {media.type === "video" && (
        <video
          className={media.previewFit === "contain" ? "visual-contain" : undefined}
          ref={videoRef}
          src={shouldLoad ? media.src : undefined}
          poster={media.poster}
          controls={!looping}
          muted={looping}
          loop={looping}
          playsInline
          preload={shouldLoad ? "metadata" : "none"}
          aria-label={media.alt}
        >
          <track kind="captions" src="/captions/portfolio.vtt" srcLang="ru" label="Русский" />
        </video>
      )}
      {media.caption && <figcaption>{media.caption}</figcaption>}
    </figure>
  );
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("ru");
  const [filter, setFilter] = useState<Filter>("all");
  const [galleryView, setGalleryView] = useState(false);
  const [light, setLight] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutClosing, setAboutClosing] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [storyOpen, setStoryOpen] = useState(false);
  const [caseClosing, setCaseClosing] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [previewPaused, setPreviewPaused] = useState(false);
  const [filterPill, setFilterPill] = useState({ x: 6, width: 0 });
  const [projectHover, setProjectHover] = useState<{ id: string; y: number; height: number } | null>(null);
  const [heroLinkFlash, setHeroLinkFlash] = useState<"about" | "brand" | "campaign" | null>(null);
  const [heroIntroHint, setHeroIntroHint] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [moscowTime, setMoscowTime] = useState("");
  const [weather, setWeather] = useState<{ kind: WeatherKind; temperature: number | null; isDay: boolean }>({ kind: "clear", temperature: null, isDay: true });
  const [caseSplit, setCaseSplit] = useState(50);
  const [splitDragging, setSplitDragging] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const heroLinkTimerRef = useRef<number | null>(null);
  const heroHintTimerRef = useRef<number | null>(null);
  const soundRef = useRef(false);
  const splitDraggingRef = useRef(false);
  const caseSplitRef = useRef(50);
  const copy = ui[language];

  const localizedProjects = useMemo(
    () => projects.map((project) => localizeProject(project, language)),
    [language],
  );

  const activeProject = useMemo(() => {
    if (!selected) return null;
    const source = projects.find((project) => project.id === selected.id) ?? selected;
    return localizeProject(source, language);
  }, [language, selected]);

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
    () => filter === "all" ? localizedProjects : localizedProjects.filter((project) => project.filter === filter),
    [filter, localizedProjects],
  );

  const anyModalOpen = Boolean(aboutOpen || selected);

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

  const closeStory = useCallback(() => {
    if (window.matchMedia("(max-width: 820px)").matches) closeCase();
    else setStoryOpen(false);
  }, [closeCase]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const saved = window.localStorage.getItem("portfolio-language");
      if (saved === "ru" || saved === "en") setLanguage(saved);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => () => {
    if (heroLinkTimerRef.current !== null) window.clearTimeout(heroLinkTimerRef.current);
    if (heroHintTimerRef.current !== null) window.clearTimeout(heroHintTimerRef.current);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const startTimer = window.setTimeout(() => {
      setHeroIntroHint(true);
      heroHintTimerRef.current = window.setTimeout(() => setHeroIntroHint(false), 1100);
    }, 720);
    return () => window.clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

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
    const updateClock = () => setMoscowTime(new Intl.DateTimeFormat(language === "ru" ? "ru-RU" : "en-GB", {
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
  }, [language]);

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
      else if (selected && storyOpen) closeStory();
      else closeCase();
    };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [aboutOpen, selected, storyOpen, anyModalOpen, closeAbout, closeStory, closeCase]);

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
    if (!selected || storyOpen || previewPaused || (selected.media?.length ?? 0) < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setPreviewIndex((value) => (value + 1) % (selected.media?.length ?? 1));
    }, 3400);
    return () => window.clearInterval(timer);
  }, [selected, storyOpen, previewPaused]);

  const openCase = (project: Project) => {
    setCaseClosing(false);
    setStoryOpen(false);
    setPreviewIndex(0);
    setPreviewPaused(false);
    setSelected(project);
    playStudioCue("open", soundRef.current);
  };

  const changeFilter = (next: Filter) => {
    setFilter(next);
    setGalleryView(false);
  };

  const activateHeroLink = (link: "about" | "brand" | "campaign", action: () => void) => {
    if (heroLinkTimerRef.current !== null) window.clearTimeout(heroLinkTimerRef.current);
    setHeroLinkFlash(link);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 190;
    heroLinkTimerRef.current = window.setTimeout(() => {
      action();
      setHeroLinkFlash(null);
      heroLinkTimerRef.current = null;
    }, delay);
  };

  const toggleTheme = () => {
    setLight((value) => {
      const next = !value;
      window.localStorage.setItem("portfolio-theme", next ? "light" : "dark");
      return next;
    });
  };

  const toggleLanguage = () => {
    setLanguage((current) => {
      const next = current === "ru" ? "en" : "ru";
      window.localStorage.setItem("portfolio-language", next);
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
      <div className="page-field" />
      <div className="rail rail-left" />
      <div className="rail rail-right" />

      <header className={galleryView ? "floating-nav gallery-mode" : "floating-nav"} aria-label={copy.navigation}>
        <a className="avatar" href="#top" aria-label={copy.home}>
          <img src="/sasha-hero.jpg" alt="" />
        </a>
        {!galleryView && (
          <div className="filters" ref={filterRef} role="tablist" aria-label={copy.projectFilter}>
            <span className="filter-pill" style={{ width: filterPill.width, transform: `translateX(${filterPill.x}px)` }} aria-hidden="true" />
            {([['all', copy.all], ['brand', copy.brand], ['campaign', copy.campaigns]] as const).map(([value, label]) => (
              <button className={filter === value ? "is-active" : ""} key={value} onClick={() => changeFilter(value)} role="tab" aria-selected={filter === value}>{label}</button>
            ))}
          </div>
        )}
        <button className="nav-button view-button" onClick={() => setGalleryView((value) => !value)}>
          <GalleryIcon back={galleryView} /> {galleryView ? copy.index : copy.gallery}
        </button>
        <button className="nav-button about-button" onClick={openAbout}>{copy.about}</button>
        <button className="nav-button language-button" onClick={toggleLanguage} aria-label={language === "ru" ? "Switch to English" : "Переключить на русский"}><LanguageIcon />{language.toUpperCase()}</button>
        <button className="theme-button" onClick={toggleTheme} aria-label={copy.theme}><ThemeIcon light={light} /></button>
      </header>

      <main className="wrap" id="top">
        <section className="hero reveal">
          <p>
            <HeroLink label={copy.name} kind="about" flashing={heroLinkFlash === "about"} hinting={heroIntroHint} hintIndex={0} onClick={() => activateHeroLink("about", openAbout)} /> — {copy.heroRole}. {copy.heroBeforeBrand}{" "}
            <HeroLink label={copy.heroBrand} kind="brand" flashing={heroLinkFlash === "brand"} hinting={heroIntroHint} hintIndex={1} onClick={() => activateHeroLink("brand", () => changeFilter("brand"))} />,{" "}
            <HeroLink label={copy.heroCampaigns} kind="campaign" flashing={heroLinkFlash === "campaign"} hinting={heroIntroHint} hintIndex={2} onClick={() => activateHeroLink("campaign", () => changeFilter("campaign"))} /> {copy.heroAfterCampaigns}{" "}
            <strong>{copy.heroStudio}</strong>
          </p>
          <button className="mobile-theme" onClick={toggleTheme} aria-label={copy.theme}><ThemeIcon light={light} /></button>
        </section>

        {!galleryView ? (
          <>
            <section className="section project-section reveal" aria-labelledby="project-index">
              <h1 id="project-index">{copy.projectIndex}</h1>
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
              {filter !== "all" && <button className="show-all" onClick={() => setFilter("all")}>{copy.showAll}</button>}
            </section>

          </>
        ) : (
          <section className="gallery reveal in-view" aria-label={copy.galleryLabel}>
            {localizedProjects.filter((project) => project.media?.length).map((project, index) => (
              <button className="gallery-card" style={{ animationDelay: `${(index % 9) * 45}ms` }} onClick={() => openCase(project)} key={project.id} aria-label={`${copy.openCase} ${project.title}`}>
                <figure>
                  <ProjectVisual project={project} />
                </figure>
              </button>
            ))}
          </section>
        )}
      </main>

      <footer className="footer">
        <hr />
        <p>{copy.footer}</p>
        <div className="studio-instruments" aria-label={copy.studioContext}>
          <div className={`weather-status weather-${weather.kind}${weather.isDay ? " is-day" : " is-night"}`} title={`${copy.city} · ${copy.weather[weather.kind]}${weather.temperature === null ? "" : ` · ${weather.temperature}°`} `}>
            <span className="weather-orb" aria-hidden="true"><span /></span>
            <span><b>{copy.city}</b><time>{moscowTime || "GMT+3"}</time></span>
            <em>{weather.temperature === null ? copy.weather[weather.kind] : `${weather.temperature}° · ${copy.weather[weather.kind]}`}</em>
          </div>
          <button className="sound-toggle" onClick={toggleSound} aria-pressed={soundEnabled} aria-label={soundEnabled ? copy.soundDisable : copy.soundEnable}>
            <span className="sound-wave" aria-hidden="true"><i /><i /><i /></span>
            <span>{copy.sound} <b>{soundEnabled ? copy.soundOn : copy.soundOff}</b></span>
          </button>
        </div>
        <nav aria-label={copy.contacts}>
          <a href="mailto:aalhimenkov@gmail.com">Email ↗</a>
          <a href="https://t.me/tgimondays" target="_blank" rel="noreferrer">Telegram ↗</a>
        </nav>
        <div className="signature">{copy.name}</div>
      </footer>

      {aboutOpen && (
        <div className={`overlay${aboutClosing ? " overlay-closing" : ""}`} role="dialog" aria-modal="true" aria-label={copy.about}>
          <article className="modal bio-modal">
            <header><span>{copy.about}</span><button onClick={closeAbout} aria-label={language === "ru" ? "Закрыть" : "Close"}>×</button></header>
            <div className="bio-grid">
              <aside>
                <strong>{copy.name}</strong>
                <a href="mailto:aalhimenkov@gmail.com">aalhimenkov@gmail.com ↗</a>
                <a href="https://t.me/tgimondays" target="_blank" rel="noreferrer">Telegram ↗</a>
              </aside>
              <div className="bio-content">
                <img src="/sasha-close.jpg" alt={copy.name} />
                <p className="bio-lead">{copy.aboutLead}</p>
                <p>{copy.aboutBody}</p>
              </div>
            </div>
            <section className="bio-section"><h3>{copy.experience}</h3><div><p><strong>{language === "ru" ? "Creative Studio Финтеха Яндекса" : "Creative Studio at Yandex Fintech"}</strong><em>{copy.currentRole}</em></p><p><strong>SETTERS</strong><em>{copy.settersRole}</em></p><p><strong>{copy.independent}</strong><em>{copy.independentRole}</em></p></div></section>
            <section className="bio-section"><h3>{copy.expertise}</h3><div className="bio-columns"><p>{copy.expertiseLeft.map((item) => <span key={item}>{item}<br /></span>)}</p><p>{copy.expertiseRight.map((item) => <span key={item}>{item}<br /></span>)}</p></div></section>
            <section className="bio-section"><h3>{copy.clients}</h3><p>Yandex · Sberbank · Toyota · PepsiCo · Beeline · MegaFon · VkusVill · Samokat · Burger King · Netflix · Avito · adidas</p></section>
          </article>
        </div>
      )}

      {activeProject && (
        <div className={`case-overlay${caseClosing ? " is-closing" : ""}${storyOpen ? " story-open" : ""}`} role="dialog" aria-modal="true" aria-label={`${copy.caseStudy} ${activeProject.title}`}>
          <button className="case-backdrop-hit" onClick={closeCase} aria-label={copy.closePreview} />
          <div className="case-layout" data-resizing={splitDragging} style={{ gridTemplateColumns: `${caseSplit}fr ${100 - caseSplit}fr` }}>
            <aside className="case-preview">
              <div
                className="case-preview-media"
                onMouseEnter={() => setPreviewPaused(true)}
                onMouseLeave={() => setPreviewPaused(false)}
              >
                {(activeProject.media?.length ? activeProject.media : [null]).map((_, index) => (
                  <span className={index === previewIndex ? "preview-frame is-current" : "preview-frame"} key={index} aria-hidden={index !== previewIndex}>
                    <ProjectVisual project={activeProject} compact mediaIndex={index} active={index === previewIndex} />
                  </span>
                ))}
              </div>
              <footer>
                <p>{activeProject.title}<br /><em>{activeProject.year}</em></p>
                <button onClick={() => setStoryOpen(true)}>{copy.caseStudy}</button>
              </footer>
            </aside>

            <button
              className="case-split-handle"
              style={{ left: `${caseSplit}%` }}
              role="slider"
              aria-label={copy.resizeCase}
              aria-orientation="horizontal"
              aria-valuemin={32}
              aria-valuemax={68}
              aria-valuenow={Math.round(caseSplit)}
              aria-valuetext={language === "ru" ? `${Math.round(caseSplit)} процентов превью, ${Math.round(100 - caseSplit)} процентов текста` : `${Math.round(caseSplit)} percent preview, ${Math.round(100 - caseSplit)} percent text`}
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
                <span>{activeProject.number}.</span>
                <div className="case-story-actions">
                  <button className="case-language-button" onClick={toggleLanguage} aria-label={language === "ru" ? "Switch to English" : "Переключить на русский"}>{language === "ru" ? "EN" : "RU"}</button>
                  <button onClick={closeCase} aria-label={copy.closeCase}>×</button>
                </div>
              </header>
              <section className="case-intro">
                <div className="case-meta">
                  <h2>{activeProject.title}</h2>
                  <p><em>{activeProject.year}</em><br />{copy.role}: {activeProject.role}</p>
                  <div className="case-tags">{activeProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <div className="case-copy">
                  <p className="case-lede">{activeProject.lede}</p>
                  {activeProject.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {activeProject.works && <p className="case-work-list"><span>{copy.selectedWork}</span>{activeProject.works.join(" · ")}</p>}
                </div>
              </section>
              {activeProject.sections?.length ? (
                <div className="case-chapters">
                  {activeProject.sections.map((section, sectionIndex) => (
                    <div className="case-chapter-group" key={`${activeProject.id}-${section.title}`}>
                      {section.campaign && (
                        <section className="case-campaign-break" aria-label={`${section.campaign.number}: ${section.campaign.title}`}>
                          <div className="case-campaign-meta"><span>{section.campaign.number}</span><span>{section.campaign.year}</span></div>
                          <h2>{section.campaign.title}</h2>
                          <p>{section.campaign.descriptor}</p>
                        </section>
                      )}
                      <section className="case-chapter">
                        <div className="case-chapter-copy">
                          <p className="case-chapter-index">{section.eyebrow ?? String(sectionIndex + 1).padStart(2, "0")}</p>
                          <h3>{section.title}</h3>
                          <div>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                        </div>
                        {section.media?.length && (
                          <div className={`case-media case-media-${section.layout ?? "single"}`} aria-label={`${section.title}: ${copy.materials}`}>
                            {section.media.map((media) => <CaseMediaFigure key={media.src} media={media} />)}
                          </div>
                        )}
                      </section>
                    </div>
                  ))}
                </div>
              ) : (
                <section className="case-media" aria-label={`${copy.materials} ${activeProject.title}`}>
                  {activeProject.media?.length ? activeProject.media.map((media) => <CaseMediaFigure key={media.src} media={media} />) : (
                    <figure style={{ background: activeProject.tone }}><span className="generated-cover"><b>{activeProject.title}</b><small>{activeProject.lede}</small></span></figure>
                  )}
                </section>
              )}
            </article>
          </div>
        </div>
      )}

    </div>
  );
}
