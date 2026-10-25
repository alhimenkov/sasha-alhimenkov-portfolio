import type { Project, ProjectSection } from "./projects";

export type Language = "ru" | "en";

type SectionTranslation = Pick<ProjectSection, "title" | "paragraphs"> & { eyebrow?: string; campaign?: ProjectSection["campaign"] };
type ProjectTranslation = {
  title?: string;
  lede: string;
  paragraphs: string[];
  works?: string[];
  sections?: SectionTranslation[];
};

export const ui = {
  ru: {
    navigation: "Навигация",
    home: "Саша Алхименков — в начало",
    projectFilter: "Фильтр проектов",
    all: "Все",
    brand: "Бренд",
    campaigns: "Кампании",
    gallery: "Галерея",
    index: "Индекс",
    about: "Обо мне",
    theme: "Сменить светлую и тёмную тему",
    projectIndex: "Индекс проектов",
    showAll: "Показать все",
    galleryLabel: "Галерея работ",
    openCase: "Открыть кейс",
    casePending: "Кейс готовится",
    caseStudy: "Кейс",
    closePreview: "Закрыть превью кейса",
    closeCase: "Закрыть кейс и вернуться к индексу",
    resizeCase: "Изменить соотношение превью и текста",
    role: "Роль",
    selectedWork: "Выбранные работы",
    materials: "материалы",
    footer: "Новые работы появляются регулярно. Заходите ещё.",
    studioContext: "Студийный контекст",
    city: "Москва",
    sound: "Студийный звук",
    soundOn: "вкл",
    soundOff: "выкл",
    soundEnable: "Включить звуковую обратную связь",
    soundDisable: "Выключить звуковую обратную связь",
    contacts: "Контакты",
    weather: { clear: "ясно", cloud: "облачно", rain: "дождь", snow: "снег", fog: "туман" },
    name: "Саша Алхименков",
    heroRole: "креативный директор",
    heroBeforeBrand: "Превращаю сложные продукты в",
    heroBrand: "ясные бренды",
    heroCampaigns: "кампании",
    heroAfterCampaigns: "и системы. Сейчас руковожу",
    heroStudio: "Creative Studio Финтеха Яндекса.",
    aboutLead: "Я креативный директор. Больше десяти лет собираю бренды, кампании и команды — от идеи и стратегии до работающей системы.",
    aboutBody: "С октября 2025 года руковожу Creative Studio Финтеха Яндекса. До этого был главным креативным директором SETTERS. Мне важен не объём производства, а качество решения: понять, что должно измениться, найти сильный маршрут и защитить его до результата.",
    experience: "Опыт",
    expertise: "Экспертиза",
    clients: "Клиенты",
    currentRole: "Креативный директор · 2025 — сейчас",
    settersRole: "Главный креативный директор · до 2025",
    independent: "Независимая практика",
    independentRole: "Бренды, кампании, продукты и творческие системы",
    expertiseLeft: ["Креативная стратегия", "Кампании", "Бренд-платформы", "Айдентика"],
    expertiseRight: ["Нейминг", "Creative direction", "Командные процессы", "AI-инструменты"],
  },
  en: {
    navigation: "Navigation",
    home: "Sasha Alhimenkov — home",
    projectFilter: "Project filter",
    all: "All",
    brand: "Brand",
    campaigns: "Campaigns",
    gallery: "Gallery",
    index: "Index",
    about: "About",
    theme: "Switch light and dark theme",
    projectIndex: "Project index",
    showAll: "Show all",
    galleryLabel: "Work gallery",
    openCase: "Open case study",
    casePending: "Case study in progress",
    caseStudy: "Case Study",
    closePreview: "Close case preview",
    closeCase: "Close case study and return to the index",
    resizeCase: "Change the preview and text column ratio",
    role: "Role",
    selectedWork: "Selected work",
    materials: "materials",
    footer: "New work appears regularly. Come back soon.",
    studioContext: "Studio context",
    city: "Moscow",
    sound: "Studio sound",
    soundOn: "on",
    soundOff: "off",
    soundEnable: "Enable sound feedback",
    soundDisable: "Disable sound feedback",
    contacts: "Contacts",
    weather: { clear: "clear", cloud: "cloudy", rain: "rain", snow: "snow", fog: "fog" },
    name: "Sasha Alhimenkov",
    heroRole: "creative director",
    heroBeforeBrand: "I turn complex products into",
    heroBrand: "clear brands",
    heroCampaigns: "campaigns",
    heroAfterCampaigns: "and systems. I currently lead",
    heroStudio: "Creative Studio at Yandex Fintech.",
    aboutLead: "I am a creative director. For more than ten years, I have been building brands, campaigns and teams — from the first idea and strategy to a working system.",
    aboutBody: "Since October 2025, I have led Creative Studio at Yandex Fintech. Before that, I was Chief Creative Officer at SETTERS. What matters to me is not the volume of production but the quality of the decision: understand what must change, find a strong route and defend it all the way to the result.",
    experience: "Experience",
    expertise: "Expertise",
    clients: "Clients",
    currentRole: "Creative Director · 2025 — present",
    settersRole: "Chief Creative Officer · until 2025",
    independent: "Independent practice",
    independentRole: "Brands, campaigns, products and creative systems",
    expertiseLeft: ["Creative strategy", "Campaigns", "Brand platforms", "Identity"],
    expertiseRight: ["Naming", "Creative direction", "Team processes", "AI tools"],
  },
} as const;

const enProjects: Record<string, ProjectTranslation> = {
  "yandex-split": {
    title: "Yandex Split",
    lede: "First, gifts held their balance. Then products played a profitable game. In spring, everything bloomed. Three campaigns, one character.",
    paragraphs: [
      "Split has a simple mechanic and a very noisy shelf. Every product pulls focus. Every partner asks to be bigger. Every season needs a new reason to care.",
      "We did not calm the chaos down. We put it on stage. The result is a world where the benefit reads in one glance and products behave like performers — strange, bright, but part of the same troupe.",
    ],
    works: ["Three seasonal flights", "30+ partners", "OOH and digital"],
    sections: [
      { eyebrow: "01 / Entrance", title: "Products take the stage", paragraphs: ["A chair balances on a disco ball. Cosmetics form an impossible tower. A gift looks ready to unwrap itself. The absurdity catches the eye. Split brings it back to the benefit."] },
      { eyebrow: "02 / Rhythm", title: "The season changes. The world stays", paragraphs: ["The first flight was built on balance. The second on play. The third on spring bloom. The metaphor changed. The tone, stage and recognition remained."] },
      { eyebrow: "03 / Scale", title: "One language. Thirty partners", paragraphs: ["The campaign ran across outdoor, digital and more than thirty partners without turning into a warehouse of unrelated layouts. Brand consideration grew by 12 percentage points. Individual flights exceeded the new-user target."] },
    ],
  },
  dar: {
    lede: "Three homes. Three different ways to picture a future life — without repeating a single device.",
    paragraphs: [
      "Development projects often change their name while keeping the same visual language. With DAR, we did the opposite: every property received its own rhythm, colour and distance from the character.",
      "SOLOS speaks through the horizon and the proximity of Sokolniki. RAKURS through life inside the home. Dom na Chasovoy through light, the memory of the district and people who seem to have lived there already.",
    ],
    works: ["SOLOS", "RAKURS", "Dom na Chasovoy"],
    sections: [
      { eyebrow: "01 / Horizon", title: "The city recedes. Nature stays close", paragraphs: ["SOLOS does not compete with the street by listing arguments. A wide landscape, calm movement and one precise line give the home its own tempo. DAR remains a signature, not a loud explanation."], campaign: { number: "Project 01", title: "SOLOS", year: "2025—2026", descriptor: "A home beside Sokolniki" } },
      { eyebrow: "02 / Inside", title: "Architecture begins with a person", paragraphs: ["RAKURS is not presented through empty square metres and perfect silence. There is age, character, books, family gestures and a world assembled by hand. The home becomes visible through the people it exists for."], campaign: { number: "Project 02", title: "RAKURS", year: "2025—2026", descriptor: "A home as a stage for everyday life" } },
      { eyebrow: "03 / Characters", title: "Residents from another time", paragraphs: ["They are not playing historical figures. They simply look as if the place already has a continuation. One portrait brings together an old district, a new home and a person choosing both."], campaign: { number: "Project 03", title: "Dom na Chasovoy", year: "2025—2026", descriptor: "Memory of the district, portraits and moving light" } },
      { eyebrow: "04 / Light", title: "It travels through the house", paragraphs: ["Light is not decoration here. It enters the frame, touches the character and moves on. A custom rail system was built on set to make it happen. The technology stayed off camera. The magic remained in frame."] },
      { eyebrow: "05 / Film", title: "No tour of the benefits", paragraphs: ["Twenty seconds. Several faces. One movement of light. The film lists nothing and never raises its voice. That is precisely why the house stays in memory."] },
    ],
  },
  mamison: {
    title: "Mamison",
    lede: "The name almost sounds like ‘mother’s dream’ in Russian. But the resort is real: snow, lifts, ticket desks, parking. The brand had to wake up fast.",
    paragraphs: [
      "It would have been easy to package a new resort in mountains, snowflakes and another ‘national ornament’. We left the postcards in the gift shop. What we took from local culture was rhythm, not decoration.",
      "The rhythm of an Ossetian gauyz carpet became a sign and a living graphic system. It brings the resort together — from the first wayfinding sign to the last après-ski stop.",
    ],
    sections: [
      { eyebrow: "01 / Mark", title: "Not an ornament. A movement", paragraphs: ["The form does not quote tradition literally. It takes its tempo: repeat, turn, accelerate. That is why the identity feels at home on both a façade and a ski run."] },
      { eyebrow: "02 / Voice", title: "From epic tales to simply epic", paragraphs: ["From pies to après-ski. From history to stories. Short verbal chains connect two versions of the place: the one that is centuries old and the one opening today."] },
      { eyebrow: "03 / Resort", title: "The brand stepped into the snow", paragraphs: ["The identity did not stay in a presentation. It met people at the ticket desk, guided them through the car park, climbed to the information centre and dissolved into the movement of the resort. Exactly where it belongs."] },
    ],
  },
  "mr-group": {
    title: "MYS",
    lede: "‘We with…’ is a phrase that can never end the same way twice. It became the brand of a place where the city meets life outside it.",
    paragraphs: [
      "The project offers something rare: no need to choose between city and nature. The centre is close. Quiet is even closer. It needed a brand that could hold both halves without calling them ‘harmony’.",
      "The name came from a simple phrase. MYS is a place. In Russian, ‘my s’ is also the beginning of a story: with a child, with friends, with a dog, with whoever makes choosing a home worthwhile.",
    ],
    works: ["Naming", "Strategy", "Identity and environment"],
    sections: [
      { eyebrow: "01 / Name", title: "The name has a continuation", paragraphs: ["With you. With the children. With friends. Two letters turn a geographic point into a personal phrase. The brand immediately speaks not about square metres but about who will be there."] },
      { eyebrow: "02 / Character", title: "The city holds the line. Nature lets it go", paragraphs: ["Dark architecture gives the system discipline. A green line enters unannounced: it wanders, crosses the frame and leads further. Together they hold the ‘and’ that made the project possible."] },
      { eyebrow: "03 / Place", title: "First a promise. Then an address", paragraphs: ["The identity enters the city, appears in the sales office, stays on maps and small objects. Gradually, an advertising image becomes a real place. And the phrase ‘we with…’ gets an address."] },
    ],
  },
  "john-dory": {
    lede: "Dubai did not need another seafood restaurant. It could use a reliable seafood dealer.",
    paragraphs: [
      "When brands enter a new market, they often become more polite, safer and slightly anonymous. John Dory went the other way. We sharpened its directness and turned product expertise into character rather than a footnote on the menu.",
      "Your Seafood Dealer is not a restaurant metaphor. It is a promise: people here know where to find the best fish and will not spend half an hour telling you how fresh it is.",
    ],
    works: ["Strategy", "Positioning", "Dubai launch"],
    sections: [
      { eyebrow: "01 / Position", title: "The person to call for fish", paragraphs: ["He knows the suppliers. Remembers oyster season. Does not try to please everyone. John Dory speaks like an expert people return to: brief, confident and to the point."] },
      { eyebrow: "02 / World", title: "The Renaissance. But hungry", paragraphs: ["The Northern Renaissance meets a fish market, sharp copy and colour that wakes up the appetite. Cultured, yes. Ceremonious, never."] },
      { eyebrow: "03 / Dubai", title: "Not a translation. A new chapter", paragraphs: ["The brand entered a new city without changing character. Menu, space and communication speak in one voice: serious about the product, attentive to detail and solemn only until the first joke."] },
    ],
  },
  qnb: {
    lede: "Two years. Two campaigns. One of the region’s largest banks first showed its global scale, then spoke through a deeply human insight.",
    paragraphs: [
      "The relationship began with QNB Beyond. The bank’s global investment reach became a cinematic journey: from a person and a model city to infrastructure, sport and an entire world of opportunity.",
      "A year later, we changed the lens. Instead of demonstrating scale, we found a tension everyone recognised: almost everyone knows someone who is certain where other people should invest their money. A relative. A taxi driver. The person at the next table.",
      "Dima and I began Unsolicited Advice without a brief or a committed client. The two of us built the strategy, creative, design and copy, brought the idea to QNB and carried it through production. The relationship continued not by repeating itself, but by changing genre completely.",
    ],
    works: ["QNB Beyond", "Unsolicited Advice", "Two campaigns in two years", "beIN · TV · digital · social"],
    sections: [
      { eyebrow: "01 / Hero film", title: "Leaving other people’s noise behind", paragraphs: ["A magazine pulls the hero into a noisy flat. The flat leads to a golden room. Then come trading screens, a restaurant and more experts. The spaces change. The pressure builds. Ahmed Helmy argues with no one and tries to convince no one. He simply walks out — and into QNB."] },
      { eyebrow: "02 / Film world", title: "Certainty rises. Common sense does not", paragraphs: ["Each new scene promises the right answer and leads somewhere stranger. Golden telephones. A family celebration. Restaurant advice that has turned into a ritual. The absurdity builds until the most reasonable move becomes obvious: stop listening to random experts."] },
      { eyebrow: "03 / Vertical films", title: "The same idea. Shorter and closer", paragraphs: ["The short vertical stories take one familiar character at a time and get straight to the point. No exposition: someone appears, starts giving advice and goes much too far within seconds. They are not a separate campaign but quick entrances into the world of the hero film."] },
      { eyebrow: "04 / Prop", title: "The magazine was not made for a deck", paragraphs: ["Money Advisor was built as a real printed object that people could hold and quote with confidence. In the hero film, it opens the door into the world of unsolicited advice. In the vertical films, it returns as a recurring campaign device."] },
      { eyebrow: "05 / QNB Beyond · 2024", title: "First, show the size of the brand", paragraphs: ["QNB operates at several scales at once: people, industries, cities and international markets. We did not explain that through a footprint map or a corporate montage. The film begins with one person, then expands the space around them until a single journey becomes an entire world."] },
      { eyebrow: "06 / Beyond world", title: "Live action enters CGI. The seam disappears", paragraphs: ["The characters move through architectural models, infrastructure, healthcare and sport. Live action joins CGI worlds created with Mathematic, while the final city brings different areas of the business into one image. The film aired extensively across sports broadcasts on beIN and other major channels."] },
      { eyebrow: "07 / Done", title: "Finishing is part of the idea", paragraphs: ["QNB Beyond showed the bank’s scale. Unsolicited Advice showed its character. The second project began without a brief, a committed client or a large agency team, then appeared in Ads of the World and Campaign Middle East after release. Long relationships are not built by repeating a successful device. They are built by finding a new one each time."] },
    ],
  },
  otello: {
    title: "Otello",
    lede: "The trip has not started yet. But your mind is already there. A booking service becomes the first step of the journey, not just a utility.",
    paragraphs: [
      "The new service needed to claim a place in the category quickly. Not become another ‘book now’ button, but put the next trip in people’s minds.",
      "We joined familiar everyday life with the promise of somewhere new. Saturated colour, large typography and moments in which the holiday has almost begun.",
    ],
    sections: [
      { eyebrow: "01 / Impulse", title: "The journey starts earlier", paragraphs: ["The location does not change first. Your state of mind does. Everyday life opens up and another place is suddenly visible through it. Otello appears at exactly that moment: before the decision to go, not after it."] },
      { eyebrow: "02 / Language", title: "Emotion does not hide the product", paragraphs: ["Cinematic light and saturated colour create desire. Large typography returns it to action. The campaign stays emotional without losing the point: the path to a trip is short and clear."] },
    ],
  },
  technopark: {
    title: "Technopark",
    lede: "In spring, technology bloomed. In winter, it grew into an entire forest. Two campaigns in which the store stopped being a shelf and became a world of its own.",
    paragraphs: [
      "Premium technology is usually filmed as an object: clean, expensive and still. Technopark needed a different effect — a range that felt less like a catalogue and more like an adventure.",
      "Over one year, we built two worlds. In the first, real flowers continued into 3D and filled a store at night. In the second, technology gathered into a winter forest where every device had a role to play.",
    ],
    works: ["Spring · 8 March", "Gift Forest · New Year", "Films · KV · digital"],
    sections: [
      { campaign: { number: "Campaign 01", title: "Spring. 8 March", year: "2024", descriptor: "Flowers and technology inside a store at night" }, eyebrow: "01 / Film", title: "Ten days from debrief to camera", paragraphs: ["The brief arrived on 5 February. By the night of the 15th, we were filming inside the store. Script, key visual and production could not wait for one another. They moved at the same time and formed one world from the start."] },
      { eyebrow: "02 / Flowers", title: "Not decoration. A second nature for technology", paragraphs: ["Gypsophila was already part of the store. We treated it not as decoration, but as the material of the world. In 3D, the flowers became larger, freer and more vivid. Coffee machines, hair dryers and other devices did not pose among bouquets — they emerged from a living environment."] },
      { campaign: { number: "Campaign 02", title: "Gift Forest", year: "2024", descriptor: "A New Year film inside a technological fairy tale" }, eyebrow: "03 / Film", title: "The gifts grew into a forest", paragraphs: ["Technopark describes its store as a digital fairy tale made real. For New Year, we took that literally: instead of familiar snow and tinsel, we built a technological forest where a gift does not wait under the tree. It comes out to meet you."] },
      { eyebrow: "04 / World", title: "Technology does not sit on a shelf. It responds", paragraphs: ["Smart lights draw the path. Robot vacuums clear the snow. Watches fly like birds. A styler does the heroine’s hair, while a branch lowers headphones into her hands. The range becomes the plot: every device gets an action, not just a beautiful angle."] },
      { eyebrow: "05 / Two seasons", title: "One store. Two states", paragraphs: ["The spring campaign feels close, bright and almost tactile. The New Year film is larger, darker and cinematic. They do not repeat the same device, but do the same thing: turn a premium range from a list of products into a place worth entering."] },
    ],
  },
  "first-and-red": {
    lede: "Two champions. Two ways to control the game. First&Red speaks not about the ranking, but the character that made it possible.",
    paragraphs: [
      "Aryna Sabalenka enters the frame through power, candour and live energy. Karen Khachanov through strategy, patience and precision. The athletes are different, so the campaign never forces them into one voice.",
      "Film and photography work as one system, but never as a formal ambassador package. Each athlete gets a distinct rhythm, light and space. The brand stays shared; the character stays personal.",
    ],
    works: ["Aryna Sabalenka", "Karen Khachanov"],
    sections: [
      { eyebrow: "01 / Power", title: "Power does not end at the baseline", paragraphs: ["The world No.1 joins First&Red as more than a ranking. The campaign presents Aryna Sabalenka beyond the result: dominance on court continues through candour, energy and confidence away from it."] },
      { eyebrow: "02 / Strategy", title: "The match begins before the first shot", paragraphs: ["Karen Khachanov approaches tennis like chess: reading the field, waiting, choosing the moment. The film introduces the new ambassador through his mindset — strategy, patience and precision, on and off the court."] },
    ],
  },
  adidas: {
    lede: "Five campaigns. Five voices. One sports brand that does not need to begin with the logo every time.",
    paragraphs: [
      "A club kit, a new tennis shoe, decisive football matches, the first football-only store and a walk through Dubai with Linda Caicedo. Different briefs, one rule: keep the adidas system recognisable while giving each local story its own voice.",
      "The product never takes centre stage and freezes there. It runs, plays, gathers a team, lands inside a comedy and becomes part of the city. The brand enters the action — and that is how it stays in memory.",
    ],
    works: ["Al Nassr", "Grigor Dimitrov / Ubersonic 5", "You Got This", "The Manager", "City Views / Linda Caicedo"],
    sections: [
      { eyebrow: "01 / Club", title: "A kit says who you play for", paragraphs: ["A series of films presents the different Al Nassr kits. adidas global guidelines hold the campaign together. Colour, tension and club character keep it from becoming generic."] },
      { eyebrow: "02 / Speed", title: "Play Your Fastest", paragraphs: ["Ubersonic 5 is built for speed. Grigor Dimitrov gives it another quality: precision that makes athletic movement feel almost theatrical. Fast. Composed. Without extra noise."] },
      { eyebrow: "03 / Support", title: "Belief needs someone beside you", paragraphs: ["Ahead of the decisive World Cup qualifiers, the campaign shifts attention from the result to support. Coach, team, fans — confidence is not a private trait here, but something people pass to one another."] },
      { eyebrow: "04 / Comedy", title: "The store became a series", paragraphs: ["The first football-only adidas store opened not with a conventional spot, but a three-episode comedy. Brand ambassadors became the cast of The Manager, and the retail space became a place where football culture lives between the seriousness of the game and a well-timed joke."] },
      { eyebrow: "05 / Route", title: "The city through her eyes", paragraphs: ["In a collaboration between adidas Originals, Real Madrid and Visit Dubai, Linda Caicedo moves through Dubai Frame and Al Seef. The city never becomes a checklist of landmarks. It follows her pace, and the route becomes her portrait: she does not follow a ready-made path — she writes her own."] },
    ],
  },
  jumeirah: {
    lede: "Hospitality is easy to write into a standard. Harder to catch in a single gesture. Spirit of Jumeirah did exactly that.",
    paragraphs: [
      "Corporate values often arrive before people. We reversed the order: first a character, a look, an action. Only then the word that names it.",
      "An observational camera and unhurried pace turn service into culture rather than instruction. The brand promises nothing. It shows what attention looks like in real life.",
    ],
    works: ["Spirit of Jumeirah"],
    sections: [
      { eyebrow: "01 / Person", title: "Character first. Value second", paragraphs: ["The story does not begin with a line from the brand book. It begins with someone who notices a detail, takes responsibility and does a little more than expected."] },
      { eyebrow: "02 / Observation", title: "Service does not play the lead", paragraphs: ["The camera never asks people to perform care. It stays close long enough for care to reveal itself. Values are not declared; they become visible."] },
    ],
  },
  fonbet: {
    lede: "From Andrea Pirlo’s calm to Formula 1 speed. Different territories of sport, one long conversation with Fonbet.",
    paragraphs: [
      "When Andrea Pirlo joined Fonteam, the brand did not need a loud celebrity entrance. It needed an exact portrait of its new ambassador. We built the campaign around qualities already present in him: calm, leadership and almost imperturbable control.",
      "The work continued with Formula 1. It is not a separate case here: the point is the range of the collaboration. One brand can speak through an almost motionless portrait and through extreme speed — as long as both are built on precise sporting drama.",
    ],
    works: ["Andrea Pirlo", "Formula 1", "Films and photo series"],
    sections: [
      { eyebrow: "01 / Presence", title: "The maestro never raises his voice", paragraphs: ["Pirlo enters quietly and takes the frame without an unnecessary gesture. The camera does not turn him into a superhero. It leaves a pause where precision, experience and control become stronger than any declaration."] },
      { eyebrow: "02 / Portrait", title: "One person. Several speeds", paragraphs: ["A formal suit. Warm suede. A white polo and an almost accidental smile. The photo series changes distance and temperature while holding on to one thing: Pirlo remains himself in every frame."] },
      { eyebrow: "03 / System", title: "Three stories. One sense of control", paragraphs: ["The films and photographs do not retell the same scene in different formats. Each adds another shade to the character; together they form a system that can continue without changing its tone."] },
      { eyebrow: "04 / Collaboration", title: "From control to speed", paragraphs: ["The Formula 1 project expanded the relationship with Fonbet beyond a single ambassador campaign. In the portfolio, it works as the next chapter of the collaboration rather than a separate card in the index."] },
    ],
  },
  start: {
    lede: "A film ends on the screen. The feeling does not. START speaks not about what you can watch, but what you cannot unsee afterwards.",
    paragraphs: [
      "Streaming services count premieres, genres and hours of content. We changed the unit of measure: not how much someone watched, but what stayed with them afterwards.",
      "That became the line ‘Feel what you watch’. It brought different releases into one emotional platform — without catalogues, interfaces or the usual list of benefits.",
    ],
    works: ["Feel what you watch", "Brand film"],
    sections: [
      { eyebrow: "01 / Reaction", title: "The story leaves the frame", paragraphs: ["At first, someone is simply watching. Then anxiety, intimacy or joy leaves the screen and fills the room. A luminous current links different genres through one physical idea: the content is no longer opposite the viewer — it moves through them."] },
      { eyebrow: "02 / Film", title: "Not a catalogue. Thirty seconds of feeling", paragraphs: ["We do not show a shelf of series or drag a finger across an interface. The film gathers different reactions into one rhythm and turns each into a visual event. The product appears through the effect it leaves behind."] },
      { eyebrow: "03 / Platform", title: "Genres change. The formula stays", paragraphs: ["Horror, intimacy, excitement, laughter — every release has its own emotion, but the principle remains. START does not promise more content. It promises an experience that does not end with the credits."] },
    ],
  },
  demix: {
    lede: "Two chapters of collaboration. One question: how do you speak about sport without punishment, commands or someone else’s standard?",
    paragraphs: [
      "In 2019, we began with a manifesto and the real reasons of ordinary people. At SETTERS, the conversation continued: sport became a love affair, a community, a shared year and a workout worth sharing with someone else.",
      "The form moved from a hard-edged film to a bright ambassador series. The position stayed: sport does not begin with the result. It begins where someone wants to continue.",
    ],
    works: ["Sport Is Where You Are", "Real Motivation", "Fall in Love with Sport", "2023 Manifesto", "Training Continues Where You Are"],
    sections: [
      { campaign: { number: "Chapter 01", title: "MORE", year: "2019", descriptor: "A manifesto and a documentary campaign about personal motivation" }, eyebrow: "01 / Manifesto", title: "Sport exists before the result", paragraphs: ["The film builds sport from brief physical states: broken breath, weight, anger, another attempt to continue. There is no flawless technique and no safe distance. The camera stays inside the effort; Demix stands beside it, not above it."] },
      { eyebrow: "02 / People", title: "Do not invent motivation. Listen to it", paragraphs: ["We left out actors and prepared lines. Street-cast protagonists named the reasons that bring them back to training. Their answers became a film and then personal reminders people could save where they would actually need them."] },
      { campaign: { number: "Chapter 02", title: "SETTERS", year: "2022—2024", descriptor: "A national campaign series about enjoying sport" }, eyebrow: "03 / Falling in love", title: "Sport you anticipate like a date", paragraphs: ["Artur Dalaloyan, Daria Trubnikova and Elizaveta Tuktamysheva treated sport not as an obligation but a relationship. You think about it before sleep, prepare for it and dress for it. The effort remained on screen but stopped feeling like punishment."] },
      { eyebrow: "04 / Community", title: "One person starts. Others join", paragraphs: ["Every morning, the protagonist watches runner Liza Pogudo pass his balcony. At first she is alone. Then a running community gathers around her and the observer becomes a participant. Motivation is not delivered as a command — it passes from person to person."] },
      { eyebrow: "05 / 2023", title: "Four countries. One year of sport", paragraphs: ["Across one year, the team shot four campaigns in Georgia, Türkiye, Uzbekistan and Russia. The closing manifesto assembled them like an annual album: different places, disciplines and protagonists continue in the people watching the film."] },
      { eyebrow: "06 / 2024", title: "The workout becomes a team event", paragraphs: ["In the following campaign, every ambassador gained training partners. An individual workout became a sports battle: enjoyment appears not after winning, but inside the shared movement."] },
      { eyebrow: "07 / Distance", title: "Six campaigns do not repeat one formula", paragraphs: ["A manifesto, documentary confessions, ambassadors, a running community and a team workout all speak differently. One position holds them together: the brand does not demand that people love effort. It shows what there is to love about sport itself."] },
    ],
  },
  onkologika: {
    title: "Onkologika",
    lede: "We are used to postponing life. People who once could have lost it no longer do.",
    paragraphs: [
      "For World Cancer Day, we asked people in remission how the diagnosis had changed the logic of their lives. We did not ask them to talk about fighting. We asked what they could no longer postpone.",
      "Their answers became a film and an outdoor campaign. Personal decisions entered the city without dramatization or pity — a direct conversation about time that does not have to wait for a convenient moment.",
    ],
    works: ["Film", "Outdoor campaign", "Special project"],
    sections: [
      { eyebrow: "01 / Question", title: "What are you no longer willing to postpone?", paragraphs: ["Not ‘how did you beat the illness?’ and not ‘what did it teach you?’ One question moves the conversation from a medical history into the present: which decisions has this person finally made for themselves?"] },
      { eyebrow: "02 / Film", title: "Do not speak for the protagonists", paragraphs: ["The camera does not intensify the drama or turn remission into heroism. It leaves a pause in which each person chooses their own words. The film works not as a social instruction, but as a meeting."] },
      { eyebrow: "03 / People", title: "A person is more than a diagnosis", paragraphs: ["What stays on screen is not a case history, but habits, loved ones, work, plans and the things they once lacked the nerve to do. Cancer matters — but it does not take away everything else about a person."] },
      { eyebrow: "04 / Tone", title: "No pity. No hero worship", paragraphs: ["We removed two familiar distances: looking down at ‘strong people’ and looking up at a ‘tragic fate’. What remains is a conversation between equals — calm, occasionally awkward and therefore alive."] },
      { eyebrow: "05 / City", title: "Personal decisions became public", paragraphs: ["Short answers carried the film into the outdoor campaign. Without a long explanation, they sounded like promises a passer-by overhears — and cannot help trying on for themselves."] },
    ],
  },
  yota: {
    lede: "First, someone wrote ‘YOU CAN’T’ over a bus that said ‘YOU CAN’. Then we went looking for winter in the middle of summer. Two Yota projects began with the impossible and became invitations to participate.",
    paragraphs: [
      "Yota had already told its audience MOZHNO — ‘you can’. Our task was to turn that word from an advertising frame into an action people would continue without instructions.",
      "YOTABUS gave its surface to artists. The Øneheart project gave the future video to photographers and the community. In both cases, the brand set the first impulse and others assembled the final form.",
    ],
    works: ["YOTABUS · 2023", "Øneheart · Snowfall", "Two co-creation projects"],
    sections: [
      { campaign: { number: "Project 01", title: "YOTABUS", year: "2023", descriptor: "An art special project built around Yota’s MOZHNO — ‘you can’ — platform" }, eyebrow: "01 / Turn", title: "Someone wrote ‘YOU CAN’T’ over ‘YOU CAN’", paragraphs: ["The branded bus had only just appeared in the Punk Fiction courtyard when an unknown artist crossed out its original graphics. We could have restored the layout and pretended nothing had happened. We chose a more honest move: recognise the intervention as part of the project."] },
      { eyebrow: "02 / Response", title: "That is allowed too", paragraphs: ["Instead of guarding the surface, we opened it up. Artists submitted work, the audience voted and the bus changed in public. Max 13 assembled the final composition: he did not return the object to its original state, but preserved every voice on it."] },
      { eyebrow: "03 / Result", title: "Not a medium. A public permission", paragraphs: ["The bus stopped being an advertising surface and became an urban workshop. MOZHNO stopped being a slogan: the brand proved the word through its own behaviour — accepting the unplanned and handing control to the community."] },
      { campaign: { number: "Project 02", title: "Øneheart", year: "2024", descriptor: "Snowfall — a summer video assembled by Yota’s art community" }, eyebrow: "04 / Inversion", title: "Finding winter in the middle of summer", paragraphs: ["Snowfall sounds like a memory of cold. We invited the community around Yota’s Y Journal to hear it in summer and find their own signs of winter: white fireworks, stained glass, poplar fluff and accidental light."] },
      { eyebrow: "05 / Edit", title: "Not a collection. A fairy tale", paragraphs: ["The individual photographs resisted becoming a story. The connection appeared when a plot emerged: a creature steals the sun, winter arrives and people wake inside it. After darkness, daylight returns. User works stopped being a gallery and became a single music video."] },
      { eyebrow: "06 / Continuation", title: "The brand sets the impulse. People complete it", paragraphs: ["YOTABUS and Snowfall look like opposites: a loud street object and a quiet musical collage. Their mechanics are the same. Yota does not illustrate freedom and creativity — it gives away part of the authorship and accepts a result it could not have predicted."] },
    ],
  },
  vkusvill: {
    title: "VkusVill",
    lede: "One New Year, the products sang for the customers. The next, celebration stopped waiting for the calendar. Two campaigns, one intimate gesture.",
    paragraphs: [
      "VkusVill builds customer relationships not around a perfect image, but around constant conversation. Both campaigns therefore begin not with a tree or gifts, but with how people actually experience the holidays.",
      "In 2023, we celebrated the customers themselves and turned products into performers. In 2024, we recalled the familiar ‘don’t touch it, it’s for New Year’ — and replaced the restriction with permission to celebrate whenever you want.",
    ],
    works: ["We Celebrate You · 2023", "Grab and Celebrate! · 2024", "Animation, packaging and city media"],
    sections: [
      { campaign: { number: "Project 01", title: "We Celebrate You", year: "2023", descriptor: "A song and animation instead of another New Year greeting" }, eyebrow: "01 / Occasion", title: "Celebrate the people, not the date", paragraphs: ["Every December, brands congratulate everyone on the same holiday. We shifted the focus. For VkusVill, the real occasion was its customers — the people whose reviews, compliments and criticism change the brand every day."] },
      { eyebrow: "02 / Number", title: "The products took the stage", paragraphs: ["Product photographs gained faces, hands, personalities and their own parts. The assortment stopped looking like a display and became a festive ensemble. Not mascots for the future — performers for one New Year number."] },
      { eyebrow: "03 / Voice", title: "Advertising you can sing along to", paragraphs: ["Professional performers recorded the vocals. The team wrote the arrangement, lyrics and ukulele part. The subtitles became karaoke: the viewer does not merely hear a greeting, but quietly joins the chorus."] },
      { campaign: { number: "Project 02", title: "Grab and Celebrate!", year: "2024", descriptor: "A line and design system for spontaneous celebration" }, eyebrow: "04 / Restriction", title: "Don’t touch it. It’s for New Year", paragraphs: ["Since childhood, celebration has come with rules: do not open it early, do not begin before everyone arrives, wait for midnight. We took the familiar restriction and reversed it. The best things do not have to wait for the correct date."] },
      { eyebrow: "05 / Permission", title: "Grab it. Celebrate", paragraphs: ["The line works in two modes at once: put the product in your basket, and simply go ahead — without lengthy preparation — and make a celebration. The custom lettering reads like a personal note on the pack: warm, slightly uneven and permissive."] },
      { eyebrow: "06 / System", title: "An old postcard entered a modern store", paragraphs: ["Bullfinches, fir branches and print grain met a disco ball, Olivier salad and a delivery bag. Rays and branches linked the different scenes. The system kept its domestic warmth without becoming a museum reconstruction of New Year."] },
      { eyebrow: "07 / Scale", title: "From the shelf to the store and the city", paragraphs: ["The identity expanded across packaging, point-of-sale materials, metro banners and outdoor media. Products, colours and scenes changed. The main idea did not: every contact felt like a small permission not to postpone something good."] },
    ],
  },
  kappa: {
    lede: "Form means two things: sportswear and a way to be yourself. Kappa × Virtus.pro met exactly there.",
    paragraphs: [
      "The collaboration could easily have become two logos on one hoodie. But Kappa speaks the language of sportswear, while Virtus.pro belongs to the culture of avatars and playable roles. We built not merchandise, but a shared world for the collection launch.",
      "Film, photography, creator boxes, outdoor media and a game-like landing page work as levels of one campaign. Wherever people met the launch, they were still inside the game.",
    ],
    works: ["Kappa × Virtus.pro collection", "Main film and launch cut", "Playable landing page"],
    sections: [
      { eyebrow: "01 / Formula", title: "Not a team uniform. A character build", paragraphs: ["In a game, you choose a character. In the city, you choose what to wear. We joined the two gestures: the collection became a way to level up not a fictional avatar, but your own image. Sport, fashion and esports stopped competing for the foreground."] },
      { eyebrow: "02 / Main film", title: "Reality glitched", paragraphs: ["The players leave the familiar setup and enter a world where the physical location gradually begins to obey game logic. The clothes never interrupt the action for a product demonstration — they remain part of the characters throughout the film."] },
      { eyebrow: "03 / Launch cut", title: "Seventeen seconds. No explanation", paragraphs: ["The short version reduces the launch to a clean impulse: movement, silhouettes and the collaboration itself. It works not as a compressed retelling of the film, but as a fast entry into its world."] },
      { eyebrow: "04 / Landing", title: "You could play through the clothes", paragraphs: ["The landing page was not another storefront. Game mechanics turned browsing into action, while 3D clothing models let people inspect each piece as closely as a new skin before choosing it."] },
      { eyebrow: "05 / Image", title: "Players became campaign characters", paragraphs: ["The photography retained the gaming identity without turning people into interface decoration. A perspective grid, player stats and orange markers build the frame while the clothing remains its main subject."] },
      { eyebrow: "06 / Release", title: "The game world left the screen", paragraphs: ["The system continued through outdoor media and launch materials. Scale changed — from a personal encounter to a large city placement. The logic did not: people were not watching the collaboration from outside, but entering it like a new level."] },
    ],
  },
  "burger-king": {
    year: "2021—2022",
    lede: "For two years, we changed not Burger King’s volume but the subject of the conversation: less provocation, more taste. One brand turn. Six different campaigns.",
    paragraphs: [
      "Burger King knew how to make people talk, but the product had disappeared inside the noise. The brand was remembered as a bold provocateur — not as a place people chose for genuinely good burgers.",
      "We did not make it quieter. We redirected that energy towards the food. New products received their own genres, while the larger Not What It Used to Be campaign collected the change into one line: Burger King had changed — and become tastier.",
    ],
    works: ["Not What It Used to Be", "Cheese Lovers", "Mozzarella King", "6 for 200", "Angus", "Mystery Combo"],
    sections: [
      { campaign: { number: "Project 01", title: "Not What It Used to Be", year: "2022", descriptor: "A large campaign about how the brand had changed" }, eyebrow: "01 / Turn", title: "An old criticism became a new promise", paragraphs: ["‘Not what it used to be’ normally means: worse. We kept the viewer inside that phrase until the very last word. The rumour crosses a restaurant, the street, public transport and the news — then returns to the woman who calmly completes the thought: it tastes better."] },
      { eyebrow: "02 / Film", title: "Rumour first. Proof second", paragraphs: ["Instead of listing the changes, one phrase grows into national news. At the end, the product gives it a precise meaning. Not a rebrand for the sake of a new voice, but new food that is finally worth talking about."] },
      { campaign: { number: "Project 02", title: "Cheddar King", year: "2021", descriptor: "A single bite stretched across the entire film" }, eyebrow: "03 / Anticipation", title: "Twenty seconds before the bite", paragraphs: ["The burger is already in his hands. The bite is one moment away. But cheese stretches time: heat melts cheddar, a fan feeds the flame, a guitar string bends with the cheese. Food porn is no longer a pause in the story. It becomes the story."] },
      { campaign: { number: "Project 03", title: "Mozzarella King", year: "2021", descriptor: "Italy stretched to absurdity" }, eyebrow: "04 / Patty", title: "Not cheese inside. Cheese instead of the patty", paragraphs: ["A mozzarella patty is already a strange enough product fact. We did not normalise it. Italian style reaches kitsch, the characters reach operatic seriousness, and stretchy cheese becomes a full dramatic device."] },
      { campaign: { number: "Project 04", title: "6 for 200", year: "2021", descriptor: "A value offer without price-tag noise" }, eyebrow: "05 / Rhythm", title: "Six items. Six entrances", paragraphs: ["A large combo easily becomes a tiny price list. We did the opposite: every product gets its own entrance, colour and typography. Price does not shout over the food — it gathers the series into one simple formula."] },
      { campaign: { number: "Project 05", title: "Angus", year: "2021", descriptor: "A premium range built around real Angus beef" }, eyebrow: "06 / Protagonist", title: "Only the meat stays in frame", paragraphs: ["If the Angus is real, it does not need gold frames or restaurant manners. Premium value comes from light, texture and a very close camera. The burger does not receive a role in the story — it is the story."] },
      { campaign: { number: "Project 06", title: "Mystery Combo", year: "2022", descriptor: "A combo that refuses to reveal itself early" }, eyebrow: "07 / Intrigue", title: "The box first. The burger later", paragraphs: ["A combo normally has a price, a list of items and a familiar packshot. Here, the question came first. A white box hides the product until the final moment, turning an ordinary order into a small game."] },
    ],
  },
  "2gis": {
    lede: "‘Give me a sign.’ Three routes, three small adventures and one city that suddenly starts giving directions.",
    paragraphs: [
      "Navigation is easy to show as a close-up of a phone. We did the opposite and brought the city itself to life. Road signs, transport icons, graffiti and posters assemble a route before the character has time to get lost.",
      "Three films became the centre of the campaign, while the line moved into the streets: media facades and billboards teased a short ‘Give me a sign’; digital and street formats revealed which sign might be needed. 2GIS remained a complex product but felt like a simple magical helper.",
    ],
    works: ["Give Me a Sign", "Three films", "360° campaign"],
    sections: [
      { eyebrow: "01 / Overture", title: "The city plays the route", paragraphs: ["A man is rushing to the start of a concert. The metro, graffiti, indicators and road markings join the same musical movement and guide him towards the final strike of the gong. The route becomes a score."] },
      { eyebrow: "02 / Rescue", title: "The streets know the shortcut", paragraphs: ["A run is interrupted by a lost pet. The rain gets heavier, the address is unfamiliar and time is short. A bus stop, an alley and a light above the entrance give the runner one timely cue after another."] },
      { eyebrow: "03 / Home", title: "One driver. Several addresses", paragraphs: ["After a party, the sober friend gets the longest route. Passengers disappear one by one, the night changes colour, and 2GIS turns a complicated trip into a calm road home."] },
      { eyebrow: "04 / City", title: "The line moved into the streets", paragraphs: ["The media facades did not retell the films. They caught people on the move with a short question — where to eat quickly, which way to turn, where to find the right place. The green line extended the route across the real city, while 2GIS answered at exactly the moment the answer was needed."] },
    ],
  },
  sportmaster: {
    title: "Sportmaster",
    lede: "A record does not begin on the scoreboard. It begins when the usual result is no longer enough.",
    paragraphs: [
      "Sportmaster PRO speaks to people who already know how to run, play and choose their gear. The series never explains sport from zero and never turns the film into a catalogue.",
      "The product stays inside the action. The camera holds speed, effort and contact with the surface — everything a new personal result is actually made of.",
    ],
    works: ["PRO Running", "PRO Football"],
    sections: [
      { eyebrow: "01 / Running", title: "One more step beyond the usual", paragraphs: ["Forest, tarmac and store are connected by one movement. The shoes do not appear as a separate packshot: they take the impact, hold the pace and become part of the physical feeling of running."] },
      { eyebrow: "02 / Football", title: "The decision happens in motion", paragraphs: ["The match is built from brief contacts: body, turf, ball, boot. The camera does not watch from the sideline — it enters the game and keeps the product where it actually works."] },
    ],
  },
  familia: {
    lede: "First, you want the piece. Then its price surprises you. Familia keeps the order exactly this way.",
    paragraphs: [
      "Off-price retail is used to explaining itself through discounts. But the real excitement begins at the rail: among the huge assortment appears a piece that should not have been this easy to find.",
      "We turned the strategy of ‘different shopping’ into three short scenes. A day of the week changes the look. Red boots become a museum object. A trend stops being an instruction.",
    ],
    works: ["Brands set free from prices", "Three films", "Fashion retail"],
    sections: [
      { eyebrow: "01 / Every day", title: "One week. Seven versions of you", paragraphs: ["Hopscotch becomes a calendar of looks. Monday does not need to resemble Tuesday, and a daily arrival becomes a reason to invent yourself again rather than a retail message."] },
      { eyebrow: "02 / Price", title: "Big brand. Small price tag", paragraphs: ["Red boots stand on a plinth like a rare exhibit. The price changes; the desire stays. ‘Brands set free from prices’ becomes an action inside the frame."] },
      { eyebrow: "03 / Trend", title: "Fashion is better without instructions", paragraphs: ["The woman moves through colour, texture and rails without trying to fit a single correct look. A trend can be tried on, mixed and left behind."] },
    ],
  },
  delimobil: {
    title: "Delimobil",
    lede: "On the first lap, the drivers raced. On the second, their mothers got in beside them. That was enough.",
    paragraphs: [
      "Safe driving is usually explained with rules, fines and frightening consequences. We skipped the lecture. Drivers who liked speeding in Delimobil cars were invited to a closed track and allowed to take the first lap as they normally would.",
      "Before the second run, the conditions changed: their mothers took the passenger seats. The speed, music and driving style shifted immediately. That is how ‘Drive as if your mother were beside you’ became a campaign. The same thought then continued beyond the film.",
    ],
    works: ["Social experiment", "Case film", "Tattoo special project"],
    sections: [
      { eyebrow: "01 / First lap", title: "Give speed a safe place", paragraphs: ["The city racers were not asked to pretend. On the track they accelerated, made mistakes and hit cones. The camera captured the habit more clearly than any lecture could."] },
      { eyebrow: "02 / Second lap", title: "The most persuasive passenger", paragraphs: ["The door opens and a mother takes the seat. Aggressive bass gives way to melody, sharp editing settles down, and drivers start braking early. Not because the rules changed. Because the presence did."] },
      { eyebrow: "03 / Film", title: "The experiment became the message", paragraphs: ["The first run produced numerous small collisions and violations. The second produced none. The observation became a short rule everyone can hear in their own mother’s voice: drive as if she were beside you."] },
      { eyebrow: "04 / Special project", title: "Mother stays close. Now literally", paragraphs: ["Tattoo studio 13 by BLACK STAR joined the campaign. Instead of another reminder about road rules, it offered ten free tattoos dedicated to mothers. The message left the film and became a personal sign that stays with the driver."] },
    ],
  },
  travli: {
    title: "Travli NET",
    role: "Case Study Design",
    lede: "Bullying is sustained not only by those who attack. It is sustained by those who see it and walk past.",
    paragraphs: [
      "Another team created the campaign and its central mechanism. I joined at the festival-submission stage, shaping the finished material into a case study that made the bystander’s role immediately clear.",
      "The viewer first occupies the familiar position of a witness. Then inaction stops feeling neutral: most people choose not to intervene, and that indifference is what allows bullying to continue.",
    ],
    works: ["Festival submission", "Case study design", "Anti-bullying"],
    sections: [
      { eyebrow: "01 / Original idea", title: "Bullying always has an audience", paragraphs: ["The original concept centres on the bystander. Watching from the sidelines may feel safe, but the majority’s silence leaves a person alone with the abuse."] },
      { eyebrow: "02 / Submission", title: "Watching is already a choice", paragraphs: ["The festival case study moves the viewer from observer to participant. Editing, pauses and the recurring image of eyes turn the film into a question of personal responsibility. My role was the structure and design of the submission, not the original idea."] },
    ],
  },
  rassvet: {
    title: "Rassvet",
    lede: "Gauguin was called a savage. So were skaters. One label became the beginning of a collaboration.",
    paragraphs: [
      "The Pushkin Museum and Rassvet did not need another souvenir drop. They needed a reason for two cultures to genuinely meet.",
      "We found it in Gauguin’s reputation. The artist and skaters carried the same image of people outside the rules. Gauguin’s works moved onto three shirts and six skateboards — not as decoration, but as a sign of shared character.",
      "The collection launched within Rassvet’s international context. Vogue, GQ and Esquire covered it on release day.",
    ],
    works: ["Collaboration concept", "Three shirts", "Six skateboards", "International launch"],
    sections: [
      { eyebrow: "01 / Idea", title: "One label. Two cultures", paragraphs: ["The image of a ‘savage’ followed Gauguin. The same label had followed skaters for decades. Instead of smoothing over that collision, we made it the basis of the collaboration."] },
      { eyebrow: "02 / Collection", title: "The canvas changes scale", paragraphs: ["Fragments of Gauguin’s works are not locked inside a rectangular frame. On a shirt they wrap around the body. On a board they are cut by the shape of the deck. Three shirts and six skateboards form one series, while every object still stands on its own."] },
      { eyebrow: "03 / Launch", title: "Not museum merchandise. A new life for the work", paragraphs: ["The collection did not become quieter for the museum or more solemn for art. Columns, sculpture, skateboards and the models’ direct gaze remain in the same frame. Gauguin enters streetwear without an explanatory note."] },
    ],
  },
};

export function localizeProject(project: Project, language: Language): Project {
  if (language === "ru") return project;
  const translation = enProjects[project.id];
  if (!translation) return project;
  return {
    ...project,
    ...translation,
    sections: project.sections?.map((section, index) => ({
      ...section,
      ...(translation.sections?.[index] ?? {}),
    })),
  };
}
