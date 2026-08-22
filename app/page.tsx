"use client";

import { useEffect, useMemo, useState } from "react";

type Filter = "all" | "brand" | "campaign";

type Project = {
  id: string;
  title: string;
  number: string;
  year: string;
  tags: string[];
  filter: Exclude<Filter, "all">;
  image: string;
  imageAlt: string;
  statement: string;
  description: string;
};

const projects: Project[] = [
  {
    id: "mamison",
    title: "Мамисон",
    number: "03",
    year: "2024",
    tags: ["Айдентика", "Среда"],
    filter: "brand",
    image: "/case-mamison.jpg",
    imageAlt: "Айдентика курорта Мамисон в реальной среде",
    statement: "Место становится системой",
    description: "Не логотип для места, а система, которая становится его частью — в архитектуре, навигации и реальном опыте человека.",
  },
  {
    id: "kappa",
    title: "Kappa × Virtus.pro",
    number: "02",
    year: "2021",
    tags: ["Кампания", "Коллаборация"],
    filter: "campaign",
    image: "/case-kappa-wide.jpg",
    imageAlt: "Кампания Kappa и Virtus.pro",
    statement: "Один мир из трёх культур",
    description: "Спорт, мода и киберкультура не сложены рядом. Из их столкновения собран один узнаваемый визуальный мир.",
  },
  {
    id: "burger-king",
    title: "Уже не тот",
    number: "01",
    year: "2020",
    tags: ["Кампания", "Фильм"],
    filter: "campaign",
    image: "/case-burger-king.png",
    imageAlt: "Кадр кампании Burger King «Уже не тот»",
    statement: "Одна мысль, которую не нужно объяснять",
    description: "Характер Burger King превращён в короткий кинематографичный образ. Простая мысль удерживает весь фильм.",
  },
];

const practice = [
  { title: "HowToSasha", tags: ["Инструмент", "Web"], number: "04", text: "Восемь инструкций о совместной работе — от мутной задачи до сильного решения." },
  { title: "Обратный бриф", tags: ["Метод"], number: "03", text: "Способ превратить формальный запрос в задачу, по которой можно принимать решения." },
  { title: "Zero Draft", tags: ["Метод", "Креатив"], number: "02", text: "Первый креативный проход: несколько принципиально разных маршрутов вместо полировки одного." },
  { title: "Creative Studio OS", tags: ["Система"], number: "01", text: "Принципы, процессы и критерии качества для инхаус-студии, которая работает как система." },
];

const gallery = [
  ["/case-mamison.jpg", "Айдентика Мамисона"],
  ["/sasha-close.jpg", "Портрет Саши Алхименкова"],
  ["/case-kappa-wide.jpg", "Kappa × Virtus.pro"],
  ["/case-burger-king.png", "Burger King — Уже не тот"],
  ["/sasha-film.jpg", "Саша за работой"],
  ["/case-kappa-detail.jpg", "Наружная реклама Kappa × Virtus.pro"],
  ["/sasha-hero.jpg", "Портрет Саши Алхименкова"],
];

export default function Home() {
  const [filter, setFilter] = useState<Filter>("all");
  const [galleryView, setGalleryView] = useState(false);
  const [light, setLight] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [selected, setSelected] = useState<Project | null>(null);
  const [practiceOpen, setPracticeOpen] = useState<(typeof practice)[number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  const visibleProjects = useMemo(
    () => filter === "all" ? projects : projects.filter((project) => project.filter === filter),
    [filter],
  );

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
    const modalOpen = aboutOpen || selected || practiceOpen;
    document.body.style.overflow = modalOpen ? "hidden" : "";
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setAboutOpen(false); setSelected(null); setPracticeOpen(null); }
    };
    window.addEventListener("keydown", close);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", close); };
  }, [aboutOpen, selected, practiceOpen]);

  const changeFilter = (next: Filter) => {
    setFilter(next);
    setGalleryView(false);
  };

  return (
    <div className={light ? "site light" : "site"}>
      <div className={loading ? "loader" : "loader loader-done"} aria-hidden={!loading}>
        <span>/{loadProgress}</span>
      </div>

      <div className="page-field" />
      <div className="rail rail-left" />
      <div className="rail rail-right" />

      <header className="floating-nav" aria-label="Навигация">
        <a className="avatar" href="#top" aria-label="Саша Алхименков — в начало">
          <img src="/sasha-hero.jpg" alt="" />
          <span />
        </a>
        {!galleryView && (
          <div className="filters" role="tablist" aria-label="Фильтр проектов">
            {([['all', 'Все'], ['brand', 'Бренд'], ['campaign', 'Кампании']] as const).map(([value, label]) => (
              <button className={filter === value ? "is-active" : ""} key={value} onClick={() => changeFilter(value)} role="tab" aria-selected={filter === value}>{label}</button>
            ))}
          </div>
        )}
        <button className="nav-button view-button" onClick={() => setGalleryView((value) => !value)}>
          <span aria-hidden="true">{galleryView ? "‹" : "▦"}</span> {galleryView ? "Индекс" : "Галерея"}
        </button>
        <button className="nav-button about-button" onClick={() => setAboutOpen(true)}>Обо мне</button>
        <button className="theme-button" onClick={() => setLight((value) => !value)} aria-label="Сменить светлую и тёмную тему">◐</button>
      </header>

      <main className="wrap" id="top">
        <section className="hero reveal">
          <p>
            <button onClick={() => setAboutOpen(true)}>Саша Алхименков</button> — креативный директор.
            Превращаю сложные продукты в <button onClick={() => changeFilter("brand")}>ясные бренды</button>,
            <button onClick={() => changeFilter("campaign")}> кампании</button> и системы. Сейчас руковожу
            <strong> Creative Studio Финтеха Яндекса.</strong>
          </p>
          <button className="mobile-theme" onClick={() => setLight((value) => !value)} aria-label="Сменить тему">◐</button>
        </section>

        {!galleryView ? (
          <>
            <section className="section project-section reveal" aria-labelledby="project-index">
              <h1 id="project-index">Индекс проектов</h1>
              <div className="project-list">
                {visibleProjects.map((project) => (
                  <button className="project-row" onClick={() => setSelected(project)} key={project.id}>
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
                  <button className="project-row" onClick={() => setPracticeOpen(item)} key={item.number}>
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
              <button className="note-row" onClick={() => setPracticeOpen(practice[1])}>Смысл перед формой <sup>02</sup></button>
              <button className="note-row" onClick={() => setPracticeOpen(practice[2])}>Не варианты, а маршруты <sup>01</sup></button>
            </section>
          </>
        ) : (
          <section className="gallery reveal in-view" aria-label="Галерея работ">
            {gallery.map(([src, alt], index) => (
              <figure key={`${src}-${index}`}><img src={src} alt={alt} /></figure>
            ))}
          </section>
        )}
      </main>

      <footer className="footer">
        <hr />
        <p>Новые работы появляются регулярно. Заходите ещё.</p>
        <time aria-label="Локальное время">Москва · GMT+3</time>
        <nav aria-label="Контакты">
          <a href="mailto:alhimenkov@yandex-team.ru">Email ↗</a>
          <a href="https://t.me/tgimondays" target="_blank" rel="noreferrer">Telegram ↗</a>
        </nav>
        <div className="signature">Саша Алхименков</div>
      </footer>

      {aboutOpen && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Обо мне">
          <article className="modal bio-modal">
            <header><span>Обо мне</span><button onClick={() => setAboutOpen(false)} aria-label="Закрыть">×</button></header>
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
        <div className="overlay" role="dialog" aria-modal="true" aria-label={`Кейс ${selected.title}`}>
          <article className="modal case-modal">
            <header><span>{selected.number}. Кейс</span><button onClick={() => setSelected(null)} aria-label="Закрыть">×</button></header>
            <div className="case-head"><div><h2>{selected.title}</h2><p>{selected.year}<br />{selected.tags.join(" · ")}</p></div><strong>{selected.statement}</strong></div>
            <img src={selected.image} alt={selected.imageAlt} />
            <div className="case-body"><p>{selected.description}</p><p>Здесь важен принцип: форма не прикладывается к идее после. Она и есть способ сделать идею видимой, точной и работающей.</p></div>
          </article>
        </div>
      )}

      {practiceOpen && (
        <div className="overlay compact-overlay" role="dialog" aria-modal="true" aria-label={practiceOpen.title}>
          <article className="modal compact-modal">
            <header><span>{practiceOpen.number}. Практика</span><button onClick={() => setPracticeOpen(null)} aria-label="Закрыть">×</button></header>
            <div><h2>{practiceOpen.title}</h2><p>{practiceOpen.text}</p></div>
          </article>
        </div>
      )}
    </div>
  );
}
