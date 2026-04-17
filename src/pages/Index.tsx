import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const LOGO_URL = "https://cdn.poehali.dev/projects/d0648e87-78b5-4465-bee9-33cf21539017/bucket/c8dca91b-8f8c-45dd-bc71-71706cb0bbd4.png";
const HERO_IMAGE = "https://cdn.poehali.dev/projects/d0648e87-78b5-4465-bee9-33cf21539017/bucket/4ffb3959-1cb9-4720-ba46-6f50fe124c8f.png";
const BG_GRADIENT = "https://cdn.poehali.dev/projects/d0648e87-78b5-4465-bee9-33cf21539017/bucket/d6b90de7-e167-4c77-aef6-53d6df911c0b.jpg";
const COMPANY_IMAGE = "https://cdn.poehali.dev/projects/d0648e87-78b5-4465-bee9-33cf21539017/files/5db050f5-ef26-4ceb-a365-572292c6e73f.jpg";

const IMG_PUMP_STATION = "https://cdn.poehali.dev/projects/d0648e87-78b5-4465-bee9-33cf21539017/files/98c1c8e4-c3d7-4438-b21d-0a2bca989108.jpg";
const IMG_SUBMERSIBLE = "https://cdn.poehali.dev/projects/d0648e87-78b5-4465-bee9-33cf21539017/files/a0ca4b12-40ac-413b-aeb3-2794d0bc4c27.jpg";
const IMG_IRRIGATION = "https://cdn.poehali.dev/projects/d0648e87-78b5-4465-bee9-33cf21539017/files/45d74b3f-fdfe-44d8-8b3a-174447811988.jpg";
const IMG_DIRTY_WATER = "https://cdn.poehali.dev/projects/d0648e87-78b5-4465-bee9-33cf21539017/files/c4cf942a-b218-4dfd-8713-e841b0c218f1.jpg";
const IMG_CONTROL = "https://cdn.poehali.dev/projects/d0648e87-78b5-4465-bee9-33cf21539017/files/6f26903b-f2e1-4c97-b781-9aa7da5c5299.jpg";
const IMG_MOBILE = "https://cdn.poehali.dev/projects/d0648e87-78b5-4465-bee9-33cf21539017/files/174c0ecc-c7bf-4202-90ad-9b19f67b33a5.jpg";

const NAV_LINKS = [
  { label: "Категории", href: "#categories" },
  { label: "О компании", href: "#about" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Контакты", href: "#contacts" },
];

const CATALOG_LIST = [
  "Насосные станции",
  "Насосы для орошения и полива",
  "Насосы для загрязненной и грязной воды",
  "Погружные насосы и миксеры",
  "Системы управления погружным оборудованием",
  "Аналоги насосов МЗ ПОТОК",
  "Армированные шланги NBR/TPU/водопроводы ПНД",
  "Мобильные транспортировщики",
  "Перемешивание/аэрирование",
  "Оборудование для внесения",
  "Расходомеры",
  "Компрессоры",
  "Запасные части",
];

const SLIDER_CATEGORIES = [
  {
    num: "01",
    title: "Насосные станции",
    desc: "Комплектные насосные станции заводской готовности. Блочно-модульное исполнение, автоматизированное управление, монтаж под ключ.",
    specs: ["Блочно-модульные", "Автоматизация", "Монтаж под ключ"],
    img: IMG_PUMP_STATION,
  },
  {
    num: "02",
    title: "Насосы для орошения и полива",
    desc: "Специализированные насосы для сельскохозяйственного орошения и полива. Высокая надёжность, экономичность, работа с удобрениями.",
    specs: ["Сельское хозяйство", "Экономия воды", "pH-стойкость"],
    img: IMG_IRRIGATION,
  },
  {
    num: "03",
    title: "Насосы для загрязнённой воды",
    desc: "Насосы для перекачки загрязнённых и грязных вод, дренажа котлованов и строительных объектов. Твёрдые включения до 50 мм.",
    specs: ["Включения до 50 мм", "Строительство", "Дренаж"],
    img: IMG_DIRTY_WATER,
  },
  {
    num: "04",
    title: "Погружные насосы и миксеры",
    desc: "Погружные агрегаты для водоснабжения, канализации и перемешивания. Работа в агрессивных средах, защита класса IP68.",
    specs: ["IP68 защита", "Агрессивные среды", "Глубина до 500 м"],
    img: IMG_SUBMERSIBLE,
  },
  {
    num: "05",
    title: "Системы управления",
    desc: "Шкафы управления погружным оборудованием с защитой от сухого хода, перегрева, перегрузки. Интеграция с SCADA и АСУ ТП.",
    specs: ["SCADA интеграция", "АСУ ТП", "Мониторинг 24/7"],
    img: IMG_CONTROL,
  },
  {
    num: "06",
    title: "Мобильные транспортировщики",
    desc: "Мобильные насосные агрегаты на прицепных рамах и колёсных шасси для оперативной переброски и перекачки на объектах.",
    specs: ["Мобильность", "Быстрый монтаж", "Дизельные/электро"],
    img: IMG_MOBILE,
  },
];

const CATEGORIES_GRID = [
  { title: "Насосные станции", icon: "Building2", col: "col-span-2 row-span-2", desc: "Блочно-модульное исполнение под ключ", dark: true, img: IMG_PUMP_STATION },
  { title: "Насосы для орошения", icon: "Sprout", col: "col-span-1 row-span-1", desc: "Сельское хозяйство", dark: false, img: null },
  { title: "Насосы для грязной воды", icon: "Droplets", col: "col-span-1 row-span-1", desc: "Включения до 50 мм", dark: false, img: null },
  { title: "Погружные насосы", icon: "ArrowDown", col: "col-span-1 row-span-2", desc: "IP68, до 500 м глубины", dark: false, img: IMG_SUBMERSIBLE },
  { title: "Системы управления", icon: "Cpu", col: "col-span-1 row-span-1", desc: "SCADA, АСУ ТП", dark: false, img: null },
  { title: "Аналоги МЗ ПОТОК", icon: "Repeat2", col: "col-span-1 row-span-1", desc: "Взаимозаменяемые модели", dark: false, img: null },
  { title: "Армированные шланги", icon: "Cable", col: "col-span-1 row-span-1", desc: "NBR/TPU/ПНД", dark: false, img: null },
  { title: "Мобильные транспортировщики", icon: "Truck", col: "col-span-2 row-span-1", desc: "Оперативная переброска, дизельные и электро", dark: false, img: IMG_MOBILE },
  { title: "Перемешивание/аэрирование", icon: "Wind", col: "col-span-1 row-span-1", desc: "Миксеры и аэраторы", dark: false, img: null },
  { title: "Расходомеры", icon: "Gauge", col: "col-span-1 row-span-1", desc: "Точный учёт", dark: false, img: null },
  { title: "Компрессоры", icon: "Zap", col: "col-span-1 row-span-1", desc: "Промышленные серии", dark: false, img: null },
  { title: "Запасные части", icon: "Wrench", col: "col-span-1 row-span-1", desc: "Оригинал и аналоги", dark: false, img: null },
];

const ADVANTAGES = [
  { num: "01", title: "Собственный склад", desc: "Более 8 000 позиций в наличии на складе площадью 4 200 м². Отгрузка в день заказа.", icon: "Warehouse" },
  { num: "02", title: "Технические эксперты", desc: "Команда из 35 инженеров с опытом свыше 15 лет. Бесплатный подбор оборудования.", icon: "Users" },
  { num: "03", title: "Гарантия 36 месяцев", desc: "Официальная гарантия на всё оборудование. Сервисный центр в собственности.", icon: "ShieldCheck" },
  { num: "04", title: "Поставка по всей РФ", desc: "Доставка в любую точку страны. Собственный транспортный отдел, страхование грузов.", icon: "Truck" },
  { num: "05", title: "Монтаж под ключ", desc: "Полный цикл: проект, поставка, монтаж, пуско-наладка, обслуживание.", icon: "Hammer" },
  { num: "06", title: "20 лет на рынке", desc: "С 2004 года. Более 3 200 реализованных объектов по всей России.", icon: "Award" },
];

const STATS = [
  { value: "20+", label: "лет на рынке" },
  { value: "3200", label: "объектов" },
  { value: "8000+", label: "позиций склад" },
  { value: "35", label: "инженеров" },
];

const SOCIAL_LINKS = [
  { name: "Telegram", icon: "MessageCircle", href: "#", color: "#26A5E4" },
  { name: "ВКонтакте", icon: "Users", href: "#", color: "#0077FF" },
  { name: "YouTube", icon: "Play", href: "#", color: "#FF0000" },
];

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const goToSlide = (idx: number) => {
    if (animating || idx === activeSlide) return;
    setAnimating(true);
    setActiveSlide(idx);
    setTimeout(() => setAnimating(false), 650);
    if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
  };

  useEffect(() => {
    autoPlayRef.current = setTimeout(() => {
      goToSlide((activeSlide + 1) % SLIDER_CATEGORIES.length);
    }, 5000);
    return () => { if (autoPlayRef.current) clearTimeout(autoPlayRef.current); };
  }, [activeSlide]);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white font-golos">

      {/* ===== HEADER ===== */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#f4f5f6]/97 backdrop-blur-md shadow-[0_1px_0_0_hsl(var(--border))]" : "bg-[#f4f5f6]/95 backdrop-blur-sm"}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src={LOGO_URL} alt="Инагротех" className="h-[26px] w-auto object-contain" />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button key={l.label} onClick={() => handleNavClick(l.href)}
                className="nav-link text-sm text-muted-foreground hover:text-foreground transition-colors duration-200">
                {l.label}
              </button>
            ))}
          </nav>

          <div className="relative" ref={menuRef}>
            <button onClick={() => setMenuOpen((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm text-foreground hover:bg-sage-pale hover:border-sage-light transition-all duration-200">
              <span className="hidden sm:inline">Все разделы</span>
              <Icon name={menuOpen ? "X" : "Menu"} size={16} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 w-72 bg-white border border-border rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.10)] overflow-hidden" style={{ animation: "scaleIn 0.2s ease both", transformOrigin: "top right" }}>
                <div className="p-2">
                  {CATALOG_LIST.map((s, i) => (
                    <a key={i} href="#"
                      className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-foreground hover:bg-sage-pale hover:text-sage transition-colors duration-150 group">
                      <span>{s}</span>
                      <Icon name="ChevronRight" size={14} className="text-muted-foreground group-hover:text-sage transition-colors" />
                    </a>
                  ))}
                </div>
                <div className="border-t border-border p-3">
                  <a href="tel:+78001234567"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-sage text-white text-sm font-medium hover:bg-sage-dark transition-colors">
                    <Icon name="Phone" size={14} />
                    +7 800 123-45-67
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="relative flex items-center overflow-hidden" style={{ paddingTop: "64px", minHeight: "calc(100vh - 0px)" }}>
        <div className="absolute inset-0">
          <img src={BG_GRADIENT} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Social sidebar */}
        <div className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3" style={{ animation: "fadeIn 0.8s ease 0.8s both" }}>
          {SOCIAL_LINKS.map((s) => (
            <a key={s.name} href={s.href} title={s.name}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/85 backdrop-blur-sm border border-white/60 shadow-sm hover:scale-110 transition-transform duration-200">
              <Icon name={s.icon} size={16} style={{ color: s.color }} fallback="Link" />
            </a>
          ))}
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-4 pb-4 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-pale border border-sage-light text-xs font-semibold text-sage-dark tracking-wide uppercase" style={{ animation: "fadeUp 0.7s ease 0.1s both" }}>
                <Icon name="CheckCircle2" size={14} className="text-sage" />
                Российский производитель
              </div>

              <div style={{ animation: "fadeUp 0.7s ease 0.2s both" }}>
                <h1 className="text-5xl lg:text-6xl font-light text-foreground leading-[1.07] tracking-tight">
                  Промышленные<br />
                  <span className="font-semibold text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, hsl(148 28% 24%), hsl(148 28% 44%))" }}>
                    насосы
                  </span>{" "}и<br />
                  насосные станции
                </h1>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed max-w-md" style={{ animation: "fadeUp 0.7s ease 0.3s both" }}>
                Поставка, монтаж и обслуживание насосного оборудования для промышленности, ЖКХ и строительства. Более 8 000 позиций в наличии.
              </p>

              <div id="hero-buttons" className="flex flex-wrap gap-4" style={{ animation: "fadeUp 0.7s ease 0.4s both" }}>
                <button className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-sage text-white font-semibold text-sm hover:bg-sage-dark transition-all duration-200 shadow-[0_4px_20px_hsl(148_28%_32%_/_0.28)] hover:-translate-y-0.5">
                  Получить консультацию
                  <Icon name="ArrowRight" size={16} />
                </button>
                <button id="btn-call" className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-border bg-white/70 text-foreground text-sm font-medium hover:border-sage-light hover:bg-sage-pale transition-all duration-200">
                  <Icon name="Phone" size={15} className="text-sage" />
                  Позвонить
                </button>
              </div>

              {/* Stats — larger, modern */}
              <div className="grid grid-cols-3 gap-4 pt-2" style={{ animation: "fadeUp 0.7s ease 0.5s both" }}>
                {STATS.slice(0, 3).map((s, i) => (
                  <div key={i} className="bg-white/70 backdrop-blur-sm rounded-2xl px-5 py-4 border border-white/80 shadow-sm text-center">
                    <div className="text-3xl font-light text-foreground tracking-tight">{s.value}</div>
                    <div className="text-[11px] text-muted-foreground mt-1 leading-tight">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Pump */}
            <div className="relative" style={{ animation: "scaleIn 0.8s ease 0.3s both" }}>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, hsl(148 40% 68%), transparent 70%)" }} />

              {/* Иллюстрация — смещена левее и выше */}
              <img src={HERO_IMAGE} alt="Промышленный насос"
                className="animate-float-pump relative z-10 w-full max-w-[650px] object-contain"
                style={{
                  filter: "drop-shadow(0 30px 60px rgba(74, 112, 74, 0.22))",
                  marginLeft: "-10%",
                  marginTop: "5%",
                }}
              />

              {/* ПРОИЗВОДИТЕЛЬНОСТЬ — сверху справа */}
              <div className="absolute top-0 right-4 lg:right-0 bg-white/92 backdrop-blur-sm border border-border rounded-2xl px-5 py-4 shadow-md z-20" style={{ animation: "fadeUp 0.6s ease 0.6s both" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sage-pale flex items-center justify-center flex-shrink-0">
                    <Icon name="Gauge" size={20} className="text-sage" />
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wide">Производительность</div>
                    <div className="text-xl font-light text-foreground mt-0.5">до 5000 м³/ч</div>
                  </div>
                </div>
              </div>

              {/* ГАРАНТИЯ — нижняя грань на уровне кнопки Позвонить */}
              <div className="absolute left-0 lg:-left-4 bg-white/92 backdrop-blur-sm border border-border rounded-2xl px-5 py-4 shadow-md z-20"
                style={{ bottom: "130px", animation: "fadeUp 0.6s ease 0.7s both" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sage-pale flex items-center justify-center">
                    <Icon name="ShieldCheck" size={20} className="text-sage" />
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wide">Гарантия</div>
                    <div className="text-xl font-light text-foreground">36 месяцев</div>
                  </div>
                </div>
              </div>

              <div className="absolute right-0 lg:right-2 bg-white/92 backdrop-blur-sm border border-border rounded-2xl px-5 py-4 shadow-md z-20"
                style={{ bottom: "130px", animation: "fadeUp 0.6s ease 0.75s both" }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sage-pale flex items-center justify-center flex-shrink-0">
                    <Icon name="ArrowUp" size={20} className="text-sage" />
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wide">Напор</div>
                    <div className="text-xl font-light text-foreground mt-0.5">до 1200 м</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ===== SLIDER / CATEGORIES ===== */}
      <section id="slider" className="pt-6 pb-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3 font-medium">Ассортимент</div>
              <h2 className="text-4xl font-light text-foreground tracking-tight">
                Категории и<br />компоненты
              </h2>
            </div>
            <button onClick={() => handleNavClick("#categories")}
              className="hidden lg:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
              Весь каталог
              <Icon name="ArrowRight" size={16} />
            </button>
          </div>

          <div className="flex gap-3 h-[360px]">
            {SLIDER_CATEGORIES.map((cat, i) => {
              const isActive = i === activeSlide;
              return (
                <button key={i} onClick={() => goToSlide(i)}
                  className="slider-tile relative overflow-hidden rounded-2xl cursor-pointer text-left"
                  style={{
                    flex: isActive ? "3.5" : "0.7",
                    background: isActive
                      ? "linear-gradient(135deg, hsl(148 28% 17%), hsl(148 22% 28%))"
                      : "hsl(var(--grey-pale))",
                  }}
                >
                  {/* Big number */}
                  <div className={`absolute select-none font-thin transition-all duration-500 ${
                    isActive
                      ? "top-7 left-7 text-white/10 text-[120px] leading-none"
                      : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl text-muted-foreground/20"
                  }`}>
                    {cat.num}
                  </div>

                  {!isActive && (
                    <div className="absolute inset-0 flex items-end justify-center pb-5 px-2">
                      <span className="text-xs font-medium text-muted-foreground text-center leading-tight">
                        {cat.title}
                      </span>
                    </div>
                  )}

                  {isActive && (
                    <div className="absolute inset-0 flex" key={`active-${i}`}>
                      {/* Left content */}
                      <div className="flex-1 p-7 flex flex-col justify-between">
                        <div>
                          <h3 className="text-[25px] font-light text-white mb-3 mt-6 leading-snug" style={{ animation: "fadeUp 0.45s ease 0.1s both" }}>
                            {cat.title}
                          </h3>
                          <p className="text-sm text-white/65 leading-relaxed max-w-xs" style={{ animation: "fadeUp 0.45s ease 0.2s both" }}>
                            {cat.desc}
                          </p>
                        </div>
                        <div className="flex items-end justify-between" style={{ animation: "fadeUp 0.45s ease 0.3s both" }}>
                          <div className="flex flex-wrap gap-2">
                            {cat.specs.map((spec, si) => (
                              <span key={si} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-white/12 text-white font-medium backdrop-blur-sm">
                                <Icon name="Check" size={11} className="text-white/80" />
                                {spec}
                              </span>
                            ))}
                          </div>
                          {/* Круглая кнопка со стрелкой */}
                          <div className="w-11 h-11 rounded-full border-2 border-white/30 flex items-center justify-center flex-shrink-0 ml-3 hover:border-white/60 transition-colors duration-200">
                            <Icon name="ArrowRight" size={18} className="text-white" />
                          </div>
                        </div>
                      </div>
                      {/* Right image — без градиента */}
                      <div className="w-48 lg:w-64 flex items-end justify-center pb-0 relative overflow-hidden" style={{ animation: "fadeIn 0.5s ease 0.2s both" }}>
                        <img src={cat.img} alt={cat.title}
                          className="w-full h-full object-cover object-left opacity-60"
                        />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 mt-5">
            {SLIDER_CATEGORIES.map((_, i) => (
              <button key={i} onClick={() => goToSlide(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === activeSlide ? "32px" : "6px",
                  height: "6px",
                  background: i === activeSlide ? "hsl(var(--sage))" : "hsl(var(--grey-light))",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-24" style={{ background: "hsl(var(--grey-pale))" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_20px_60px_rgba(0,0,0,0.09)]">
                <img src={COMPANY_IMAGE} alt="Производство" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(148 28% 14% / 0.65) 0%, transparent 55%)" }} />
              </div>

              <div className="absolute -right-4 lg:-right-8 -bottom-8 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.09)] p-6 w-52 border border-border z-10">
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-4 font-medium">Ключевые цифры</div>
                {STATS.map((s, i) => (
                  <div key={i} className={`flex items-baseline justify-between ${i > 0 ? "mt-3 pt-3 border-t border-border" : ""}`}>
                    <span className="text-xs text-muted-foreground">{s.label}</span>
                    <span className="text-lg font-semibold text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="absolute -top-5 -left-5 w-20 h-20 rounded-2xl" style={{ background: "hsl(var(--sage))", opacity: 0.12 }} />
            </div>

            <div className="space-y-8 lg:pl-6">
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3 font-medium">О компании</div>
                <h2 className="text-4xl font-light text-foreground tracking-tight leading-tight">
                  20 лет экспертизы<br />в промышленном<br />насосостроении
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed text-[15px]">
                Инагротех — российский производитель и поставщик промышленного насосного оборудования. Работаем с 2004 года. За это время реализовали более 3 200 объектов в сельском хозяйстве, нефтегазовой, химической и металлургической отраслях.
              </p>

              <p className="text-muted-foreground leading-relaxed text-[15px]">
                Наши инженеры подберут оптимальное решение для любой задачи: от единичной поставки насоса до комплектации насосной станции под ключ.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "MapPin", text: "Склад 4200 м² в Москве" },
                  { icon: "Clock", text: "Отгрузка день в день" },
                  { icon: "FileText", text: "Полная документация" },
                  { icon: "Headphones", text: "Поддержка 24/7" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-sage-pale flex items-center justify-center flex-shrink-0">
                      <Icon name={f.icon} size={16} className="text-sage" fallback="Check" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{f.text}</span>
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center gap-2 text-sage font-semibold text-sm hover:gap-3 transition-all duration-200">
                Узнать больше о компании
                <Icon name="ArrowRight" size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES GRID / CATALOG ===== */}
      <section id="categories" className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3 font-medium">Каталог</div>
            <h2 className="text-4xl font-light text-foreground tracking-tight">
              Все категории<br />оборудования
            </h2>
          </div>

          {/* Masonry grid — 6 cols, разные размеры, без фото */}
          <div className="grid grid-cols-6 gap-3" style={{ gridAutoRows: "130px" }}>

            {/* ROW 1–2: Насосные станции — 3×2 (большая) */}
            <a href="#" className="cat-card relative rounded-2xl overflow-hidden cursor-pointer group col-span-3 row-span-2"
              style={{ background: "linear-gradient(135deg, hsl(148 28% 19%), hsl(148 26% 29%))" }}>
              <div className="absolute top-5 left-5 w-11 h-11 rounded-xl flex items-center justify-center bg-white/15">
                <Icon name="Building2" size={22} className="text-white" fallback="Waves" />
              </div>
              <div className="absolute top-4 right-6 text-[80px] font-thin text-white/8 select-none leading-none">01</div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-light text-white text-xl leading-tight mb-1.5">Насосные станции</h3>
                <p className="text-xs text-white/55">Блочно-модульное исполнение под ключ</p>
              </div>
              <div className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                <Icon name="ArrowUpRight" size={14} className="text-white" />
              </div>
            </a>

            {/* ROW 1: Насосы для орошения — 2×1 */}
            <a href="#" className="cat-card relative rounded-2xl overflow-hidden cursor-pointer group col-span-2 row-span-1"
              style={{ background: "hsl(var(--sage-pale))" }}>
              <div className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center bg-white">
                <Icon name="Sprout" size={16} className="text-sage" fallback="Waves" />
              </div>
              <div className="absolute top-3 right-4 text-3xl font-thin text-muted-foreground/15 select-none leading-none">02</div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-medium text-foreground text-sm leading-tight">Насосы для орошения и полива</h3>
              </div>
            </a>

            {/* ROW 1: Оранжевая акцентная — 1×1 */}
            <div className="cat-card relative rounded-2xl overflow-hidden col-span-1 row-span-1 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(32 95% 55%), hsl(28 90% 48%))" }}>
              <div className="text-center px-3">
                <div className="text-2xl font-light text-white leading-none">8000+</div>
                <div className="text-[10px] text-white/75 mt-1 uppercase tracking-wide">позиций</div>
              </div>
            </div>

            {/* ROW 2: Насосы для загрязнённой воды — 1×1 */}
            <a href="#" className="cat-card relative rounded-2xl overflow-hidden cursor-pointer group col-span-1 row-span-1"
              style={{ background: "hsl(var(--grey-pale))" }}>
              <div className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center bg-white">
                <Icon name="Droplets" size={16} className="text-sage" fallback="Waves" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-medium text-foreground text-xs leading-tight">Насосы для загрязнённой воды</h3>
              </div>
            </a>

            {/* ROW 2: Серая пустая — 1×1 (акцент декор) */}
            <div className="cat-card relative rounded-2xl overflow-hidden col-span-1 row-span-1 flex items-center justify-center"
              style={{ background: "hsl(210 8% 90%)" }}>
              <Icon name="Package" size={28} className="text-muted-foreground/30" fallback="Box" />
            </div>

            {/* ROW 3–4: Погружные насосы — 2×2 */}
            <a href="#" className="cat-card relative rounded-2xl overflow-hidden cursor-pointer group col-span-2 row-span-2"
              style={{ background: "hsl(220 14% 95%)" }}>
              <div className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center bg-white">
                <Icon name="ArrowDown" size={16} className="text-sage" fallback="Waves" />
              </div>
              <div className="absolute top-3 right-4 text-5xl font-thin text-muted-foreground/15 select-none leading-none">04</div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-medium text-foreground text-base leading-tight mb-1">Погружные насосы и миксеры</h3>
                <p className="text-xs text-muted-foreground">IP68, до 500 м глубины</p>
              </div>
              <div className="absolute top-4 right-4 w-7 h-7 rounded-full border border-sage/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                <Icon name="ArrowUpRight" size={12} className="text-sage" />
              </div>
            </a>

            {/* ROW 3: Системы управления — 2×1 */}
            <a href="#" className="cat-card relative rounded-2xl overflow-hidden cursor-pointer group col-span-2 row-span-1"
              style={{ background: "hsl(var(--grey-pale))" }}>
              <div className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center bg-white">
                <Icon name="Cpu" size={16} className="text-sage" fallback="Waves" />
              </div>
              <div className="absolute top-3 right-4 text-3xl font-thin text-muted-foreground/15 select-none leading-none">05</div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-medium text-foreground text-sm leading-tight">Системы управления</h3>
              </div>
            </a>

            {/* ROW 3: Аналоги МЗ ПОТОК — 2×1 */}
            <a href="#" className="cat-card relative rounded-2xl overflow-hidden cursor-pointer group col-span-2 row-span-1"
              style={{ background: "hsl(var(--sage-pale))" }}>
              <div className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center bg-white">
                <Icon name="Repeat2" size={16} className="text-sage" fallback="Waves" />
              </div>
              <div className="absolute top-3 right-4 text-3xl font-thin text-muted-foreground/15 select-none leading-none">06</div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-medium text-foreground text-sm leading-tight">Аналоги насосов МЗ ПОТОК</h3>
              </div>
            </a>

            {/* ROW 4: Мобильные транспортировщики — 3×1 */}
            <a href="#" className="cat-card relative rounded-2xl overflow-hidden cursor-pointer group col-span-3 row-span-1"
              style={{ background: "hsl(215 12% 93%)" }}>
              <div className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center bg-white">
                <Icon name="Truck" size={16} className="text-sage" fallback="Waves" />
              </div>
              <div className="absolute top-3 right-4 text-4xl font-thin text-muted-foreground/15 select-none leading-none">07</div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-medium text-foreground text-sm leading-tight">Мобильные транспортировщики</h3>
                <p className="text-xs text-muted-foreground">Дизельные и электро</p>
              </div>
              <div className="absolute top-4 right-4 w-7 h-7 rounded-full border border-sage/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200">
                <Icon name="ArrowUpRight" size={12} className="text-sage" />
              </div>
            </a>

            {/* ROW 4: Оранжевая — 1×1 (цифра) */}
            <div className="cat-card relative rounded-2xl overflow-hidden col-span-1 row-span-1 flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, hsl(32 95% 55%), hsl(28 90% 48%))" }}>
              <div className="text-center">
                <div className="text-2xl font-light text-white leading-none">20+</div>
                <div className="text-[10px] text-white/75 mt-1 uppercase tracking-wide">лет</div>
              </div>
            </div>

            {/* ROW 5: Армированные шланги — 2×1 */}
            <a href="#" className="cat-card relative rounded-2xl overflow-hidden cursor-pointer group col-span-2 row-span-1"
              style={{ background: "hsl(var(--grey-pale))" }}>
              <div className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center bg-white">
                <Icon name="Cable" size={16} className="text-sage" fallback="Waves" />
              </div>
              <div className="absolute top-3 right-4 text-3xl font-thin text-muted-foreground/15 select-none leading-none">08</div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-medium text-foreground text-sm leading-tight">Армированные шланги NBR/TPU/ПНД</h3>
              </div>
            </a>

            {/* ROW 5: Перемешивание — 1×1 */}
            <a href="#" className="cat-card relative rounded-2xl overflow-hidden cursor-pointer group col-span-1 row-span-1"
              style={{ background: "hsl(var(--sage-pale))" }}>
              <div className="absolute top-4 left-4 w-8 h-8 rounded-xl flex items-center justify-center bg-white">
                <Icon name="Wind" size={14} className="text-sage" fallback="Waves" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-medium text-foreground text-xs leading-tight">Перемешивание / аэрирование</h3>
              </div>
            </a>

            {/* ROW 5: Оборудование для внесения — 1×1 */}
            <a href="#" className="cat-card relative rounded-2xl overflow-hidden cursor-pointer group col-span-1 row-span-1"
              style={{ background: "hsl(var(--grey-pale))" }}>
              <div className="absolute top-4 left-4 w-8 h-8 rounded-xl flex items-center justify-center bg-white">
                <Icon name="Leaf" size={14} className="text-sage" fallback="Waves" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-medium text-foreground text-xs leading-tight">Оборудование для внесения</h3>
              </div>
            </a>

            {/* ROW 5: Расходомеры — 1×1 */}
            <a href="#" className="cat-card relative rounded-2xl overflow-hidden cursor-pointer group col-span-1 row-span-1"
              style={{ background: "hsl(var(--sage-pale))" }}>
              <div className="absolute top-4 left-4 w-8 h-8 rounded-xl flex items-center justify-center bg-white">
                <Icon name="Gauge" size={14} className="text-sage" fallback="Waves" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-medium text-foreground text-xs leading-tight">Расходомеры</h3>
              </div>
            </a>

            {/* ROW 6: Компрессоры — 2×1 */}
            <a href="#" className="cat-card relative rounded-2xl overflow-hidden cursor-pointer group col-span-2 row-span-1"
              style={{ background: "hsl(215 12% 93%)" }}>
              <div className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center bg-white">
                <Icon name="Zap" size={16} className="text-sage" fallback="Waves" />
              </div>
              <div className="absolute top-3 right-4 text-3xl font-thin text-muted-foreground/15 select-none leading-none">12</div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-medium text-foreground text-sm leading-tight">Компрессоры</h3>
              </div>
            </a>

            {/* ROW 6: Запасные части — 2×1 */}
            <a href="#" className="cat-card relative rounded-2xl overflow-hidden cursor-pointer group col-span-2 row-span-1"
              style={{ background: "hsl(var(--grey-pale))" }}>
              <div className="absolute top-4 left-4 w-9 h-9 rounded-xl flex items-center justify-center bg-white">
                <Icon name="Wrench" size={16} className="text-sage" fallback="Waves" />
              </div>
              <div className="absolute top-3 right-4 text-3xl font-thin text-muted-foreground/15 select-none leading-none">13</div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-medium text-foreground text-sm leading-tight">Запасные части</h3>
              </div>
            </a>

            {/* ROW 6: Серая декоративная — 2×1 */}
            <div className="cat-card relative rounded-2xl overflow-hidden col-span-2 row-span-1 flex items-center justify-center gap-3"
              style={{ background: "hsl(210 8% 90%)" }}>
              <Icon name="ArrowRight" size={18} className="text-muted-foreground/40" />
              <span className="text-xs text-muted-foreground/50 font-medium uppercase tracking-wider">Смотреть все</span>
            </div>

          </div>
        </div>
      </section>

      {/* ===== ADVANTAGES ===== */}
      <section id="advantages" className="py-24 overflow-hidden" style={{ background: "hsl(var(--sage-pale))" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3 font-medium">Почему мы</div>
              <h2 className="text-4xl font-light text-foreground tracking-tight">
                Преимущества<br />работы с нами
              </h2>
            </div>
            <p className="hidden lg:block text-sm text-muted-foreground max-w-xs text-right">
              20 лет строим доверие с каждым клиентом — от малого предприятия до крупного холдинга
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADVANTAGES.map((adv, i) => (
              <div key={i} className="adv-card group relative p-7 rounded-2xl bg-white border border-border cursor-default">
                <div className="adv-num absolute top-6 right-7 text-4xl font-thin text-foreground/5 group-hover:text-white/10 transition-colors duration-300 select-none">
                  {adv.num}
                </div>
                <div className="adv-icon w-12 h-12 rounded-xl bg-sage-pale flex items-center justify-center mb-5 transition-all duration-300">
                  <Icon name={adv.icon} size={22} className="text-sage group-hover:text-white transition-colors duration-300" fallback="CheckCircle" />
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-white text-base mb-2.5 transition-colors duration-300">
                  {adv.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-white/70 leading-relaxed transition-colors duration-300">
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="contacts" className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative rounded-3xl overflow-hidden p-12 lg:p-16"
            style={{ background: "linear-gradient(135deg, hsl(148 28% 18%), hsl(148 24% 30%))" }}>
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.08] blur-3xl" style={{ background: "white", transform: "translate(30%, -30%)" }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-[0.08] blur-3xl" style={{ background: "white", transform: "translate(-30%, 30%)" }} />

            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-white/45 mb-4 font-medium">Связаться с нами</div>
                <h2 className="text-3xl lg:text-4xl font-light text-white leading-tight mb-4">
                  Подберём оборудование<br />под ваш объект
                </h2>
                <p className="text-white/55 text-sm leading-relaxed max-w-sm">
                  Отправьте техническое задание — наш инженер свяжется в течение 2 часов и предложит оптимальное решение.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
                <button className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white text-sage font-semibold text-sm hover:bg-sage-pale transition-all duration-200 shadow-lg">
                  <Icon name="MessageSquare" size={16} />
                  Получить консультацию
                </button>
                <button className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-all duration-200">
                  <Icon name="Phone" size={16} />
                  +7 800 123-45-67
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-12 border-t border-border bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-1">
              <div className="mb-4">
                <img src={LOGO_URL} alt="Инагротех" className="h-8 w-auto object-contain" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Российский производитель промышленных насосов и насосных станций. Поставка, монтаж, обслуживание с 2004 года.
              </p>
              <div className="flex items-center gap-3 mt-4">
                {SOCIAL_LINKS.map((s) => (
                  <a key={s.name} href={s.href} title={s.name}
                    className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#f4f5f6] hover:bg-sage-pale transition-colors duration-200">
                    <Icon name={s.icon} size={14} className="text-muted-foreground" fallback="Link" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { title: "Каталог", links: ["Насосные станции", "Насосы для орошения", "Погружные насосы", "Аналоги МЗ ПОТОК"] },
              { title: "Компания", links: ["О компании", "Сертификаты", "Партнёры", "Вакансии"] },
              { title: "Контакты", links: ["+7 800 123-45-67", "info@inagroteh.ru", "Москва, ул. Промышленная, 1", "Пн–Пт 9:00–18:00"] },
            ].map((col, i) => (
              <div key={i}>
                <div className="text-xs uppercase tracking-[0.12em] font-bold text-foreground mb-4">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map((l, li) => (
                    <li key={li}>
                      <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-border gap-4">
            <p className="text-xs text-muted-foreground">© 2024 Инагротех. Все права защищены.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Политика конфиденциальности</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Договор оферты</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}