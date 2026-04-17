import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/d0648e87-78b5-4465-bee9-33cf21539017/files/5e097ff1-9949-4445-b2f8-5cdcd848aa38.jpg";
const COMPANY_IMAGE = "https://cdn.poehali.dev/projects/d0648e87-78b5-4465-bee9-33cf21539017/files/5db050f5-ef26-4ceb-a365-572292c6e73f.jpg";

const NAV_LINKS = [
  { label: "Категории", href: "#categories" },
  { label: "О компании", href: "#about" },
  { label: "Преимущества", href: "#advantages" },
  { label: "Контакты", href: "#contacts" },
];

const ALL_SECTIONS = [
  { title: "Центробежные насосы", href: "#" },
  { title: "Погружные насосы", href: "#" },
  { title: "Насосные станции", href: "#" },
  { title: "Дренажные насосы", href: "#" },
  { title: "Скважинные насосы", href: "#" },
  { title: "Химические насосы", href: "#" },
  { title: "Насосы для нефтепродуктов", href: "#" },
  { title: "Запорная арматура", href: "#" },
  { title: "КИП и автоматика", href: "#" },
  { title: "Фильтрационное оборудование", href: "#" },
  { title: "Запасные части", href: "#" },
  { title: "Сервис и обслуживание", href: "#" },
];

const SLIDER_CATEGORIES = [
  {
    num: "01",
    title: "Центробежные насосы",
    desc: "Горизонтальные и вертикальные центробежные насосы для перекачки воды, технологических жидкостей, суспензий. Производительность до 5000 м³/ч, напор до 1200 м.",
    specs: ["До 5000 м³/ч", "Напор до 1200 м", "КПД до 92%"],
  },
  {
    num: "02",
    title: "Насосные станции",
    desc: "Комплектные насосные станции заводской готовности. Блочно-модульное исполнение, автоматизированное управление, монтаж под ключ.",
    specs: ["Блочно-модульные", "Автоматизация", "Монтаж под ключ"],
  },
  {
    num: "03",
    title: "Погружные насосы",
    desc: "Погружные агрегаты для водоснабжения, дренажа и канализации. Работа в агрессивных средах, защита класса IP68.",
    specs: ["IP68 защита", "Агрессивные среды", "Глубина до 500 м"],
  },
  {
    num: "04",
    title: "Запорная арматура",
    desc: "Задвижки, затворы, клапаны и краны для промышленных трубопроводов. Давление до 400 бар, диаметры DN15-DN2000.",
    specs: ["До 400 бар", "DN15–DN2000", "Все материалы"],
  },
  {
    num: "05",
    title: "Дренажные насосы",
    desc: "Насосы для откачки загрязнённых вод, дренажа строительных котлованов и подвальных помещений. Твёрдые включения до 50 мм.",
    specs: ["Включения до 50 мм", "Строительство", "Дренаж"],
  },
  {
    num: "06",
    title: "КИП и автоматика",
    desc: "Системы контроля, измерительные приборы и автоматика для насосных установок. Интеграция с SCADA и АСУ ТП.",
    specs: ["SCADA интеграция", "АСУ ТП", "Мониторинг 24/7"],
  },
];

const CATEGORIES_GRID = [
  { title: "Центробежные насосы", icon: "Waves", col: "col-span-2 row-span-2", desc: "Широкий ассортимент", dark: true },
  { title: "Насосные станции", icon: "Building2", col: "col-span-1 row-span-1", desc: "Под ключ", dark: false },
  { title: "Погружные насосы", icon: "ArrowDown", col: "col-span-1 row-span-1", desc: "IP68", dark: false },
  { title: "Дренажные", icon: "Droplets", col: "col-span-1 row-span-1", desc: "Строительство", dark: false },
  { title: "Скважинные насосы", icon: "Zap", col: "col-span-1 row-span-2", desc: "Глубокое бурение", dark: false },
  { title: "Химические насосы", icon: "FlaskConical", col: "col-span-1 row-span-1", desc: "Агрессивные среды", dark: false },
  { title: "Для нефтепродуктов", icon: "Fuel", col: "col-span-1 row-span-1", desc: "ATEX исполнение", dark: false },
  { title: "Запорная арматура", icon: "Settings", col: "col-span-2 row-span-1", desc: "DN15–DN2000, до 400 бар", dark: false },
  { title: "КИП и автоматика", icon: "Cpu", col: "col-span-1 row-span-1", desc: "SCADA, АСУ ТП", dark: false },
  { title: "Запасные части", icon: "Wrench", col: "col-span-1 row-span-1", desc: "Оригинал и аналоги", dark: false },
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
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_hsl(var(--border))]" : "bg-white/80 backdrop-blur-sm"}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-sage flex items-center justify-center">
              <Icon name="Waves" size={14} className="text-white" />
            </div>
            <span className="text-sm tracking-tight text-foreground font-semibold">
              ИН<span className="text-sage font-black">АГРОТЕХ</span>
            </span>
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
                  {ALL_SECTIONS.map((s, i) => (
                    <a key={i} href={s.href}
                      className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm text-foreground hover:bg-sage-pale hover:text-sage transition-colors duration-150 group">
                      <span>{s.title}</span>
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
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 75% 75% at 68% 50%, hsl(148 25% 88% / 0.95) 0%, hsl(150 18% 94% / 0.55) 45%, white 72%)" }} />
        <div className="absolute inset-0 opacity-[0.022]" style={{ backgroundImage: "linear-gradient(hsl(148 28% 32%) 1px, transparent 1px), linear-gradient(90deg, hsl(148 28% 32%) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 pt-24 pb-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sage-pale border border-sage-light text-xs font-medium text-sage-dark tracking-wide uppercase" style={{ animation: "fadeUp 0.7s ease 0.1s both" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-sage animate-pulse-soft" />
                Промышленное насосное оборудование
              </div>

              <div style={{ animation: "fadeUp 0.7s ease 0.2s both" }}>
                <h1 className="text-5xl lg:text-6xl font-black text-foreground leading-[1.07] tracking-tight">
                  Промышленные<br />
                  <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, hsl(148 28% 30%), hsl(148 28% 50%))" }}>
                    насосы
                  </span>{" "}и<br />
                  насосные станции
                </h1>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed max-w-md" style={{ animation: "fadeUp 0.7s ease 0.3s both" }}>
                Поставка, монтаж и обслуживание насосного оборудования для промышленности, ЖКХ и строительства. Более 8 000 позиций в наличии.
              </p>

              <div className="flex flex-wrap gap-4" style={{ animation: "fadeUp 0.7s ease 0.4s both" }}>
                <button className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-sage text-white font-semibold text-sm hover:bg-sage-dark transition-all duration-200 shadow-[0_4px_20px_hsl(148_28%_32%_/_0.28)] hover:-translate-y-0.5">
                  Получить консультацию
                  <Icon name="ArrowRight" size={16} />
                </button>
                <button className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-border text-foreground text-sm font-medium hover:border-sage-light hover:bg-sage-pale transition-all duration-200">
                  <Icon name="Phone" size={15} className="text-sage" />
                  Позвонить
                </button>
              </div>

              <div className="flex items-center gap-8 pt-2 border-t border-border" style={{ animation: "fadeUp 0.7s ease 0.5s both" }}>
                {STATS.slice(0, 3).map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-xl font-black text-foreground">{s.value}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Pump */}
            <div className="relative flex items-center justify-center" style={{ animation: "scaleIn 0.8s ease 0.3s both" }}>
              <div className="absolute w-[480px] h-[480px] rounded-full border border-sage-light/35 opacity-50" />
              <div className="absolute w-[360px] h-[360px] rounded-full border border-sage-light/50 opacity-60" />
              <div className="absolute w-[240px] h-[240px] rounded-full border border-sage-light/70 opacity-70" />
              <div className="absolute w-72 h-72 rounded-full opacity-25 blur-3xl" style={{ background: "radial-gradient(circle, hsl(148 40% 68%), transparent 70%)" }} />

              <img src={HERO_IMAGE} alt="Промышленный насос"
                className="animate-float-pump relative z-10 w-full max-w-[440px] object-contain"
                style={{ filter: "drop-shadow(0 30px 60px rgba(74, 112, 74, 0.22))" }}
              />

              <div className="absolute top-8 right-4 lg:right-0 bg-white/92 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-sm z-20" style={{ animation: "fadeUp 0.6s ease 0.6s both" }}>
                <div className="text-xs text-muted-foreground">Производительность</div>
                <div className="text-base font-bold text-foreground mt-0.5">до 5000 м³/ч</div>
              </div>

              <div className="absolute bottom-12 left-0 lg:-left-4 bg-white/92 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-sm z-20" style={{ animation: "fadeUp 0.6s ease 0.7s both" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sage-pale flex items-center justify-center">
                    <Icon name="ShieldCheck" size={16} className="text-sage" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Гарантия</div>
                    <div className="text-sm font-bold text-foreground">36 месяцев</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </section>

      {/* ===== SLIDER ===== */}
      <section id="slider" className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3 font-medium">Ассортимент</div>
              <h2 className="text-4xl font-black text-foreground tracking-tight">
                Категории<br />и компоненты
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => goToSlide((activeSlide - 1 + SLIDER_CATEGORIES.length) % SLIDER_CATEGORIES.length)}
                className="w-11 h-11 rounded-xl border border-border flex items-center justify-center hover:bg-sage-pale hover:border-sage-light transition-colors">
                <Icon name="ChevronLeft" size={18} />
              </button>
              <button onClick={() => goToSlide((activeSlide + 1) % SLIDER_CATEGORIES.length)}
                className="w-11 h-11 rounded-xl border border-border flex items-center justify-center hover:bg-sage-pale hover:border-sage-light transition-colors">
                <Icon name="ChevronRight" size={18} />
              </button>
            </div>
          </div>

          <div className="flex gap-3 h-[340px]">
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
                  <div className={`absolute select-none font-black transition-all duration-500 ${
                    isActive
                      ? "top-6 left-6 text-white/15 text-7xl"
                      : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-muted-foreground/30"
                  }`}>
                    {cat.num}
                  </div>

                  {!isActive && (
                    <div className="absolute inset-0 flex items-end justify-center pb-5 px-2">
                      <span className="text-xs font-semibold text-muted-foreground text-center leading-tight">
                        {cat.title}
                      </span>
                    </div>
                  )}

                  {isActive && (
                    <div className="absolute inset-0 p-7 flex flex-col justify-between" key={`active-${i}`}>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-3 mt-5" style={{ animation: "fadeUp 0.45s ease 0.1s both" }}>
                          {cat.title}
                        </h3>
                        <p className="text-sm text-white/65 leading-relaxed max-w-xs" style={{ animation: "fadeUp 0.45s ease 0.2s both" }}>
                          {cat.desc}
                        </p>
                      </div>
                      <div className="flex items-end justify-between" style={{ animation: "fadeUp 0.45s ease 0.3s both" }}>
                        <div className="flex flex-wrap gap-2">
                          {cat.specs.map((spec, si) => (
                            <span key={si} className="text-xs px-3 py-1.5 rounded-full bg-white/12 text-white font-medium backdrop-blur-sm">
                              {spec}
                            </span>
                          ))}
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-white/12 flex items-center justify-center flex-shrink-0">
                          <Icon name="ArrowRight" size={18} className="text-white" />
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 mt-6">
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
                    <span className="text-lg font-black text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>

              <div className="absolute -top-5 -left-5 w-20 h-20 rounded-2xl" style={{ background: "hsl(var(--sage))", opacity: 0.12 }} />
            </div>

            <div className="space-y-8 lg:pl-6">
              <div>
                <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3 font-medium">О компании</div>
                <h2 className="text-4xl font-black text-foreground tracking-tight leading-tight">
                  20 лет экспертизы<br />в промышленном<br />насосостроении
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed text-[15px]">
                МЗ Поток — ведущий поставщик промышленного насосного оборудования в России. Работаем с 2004 года. За это время реализовали более 3 200 объектов в нефтегазовой, химической, металлургической отраслях и ЖКХ.
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

      {/* ===== CATEGORIES GRID ===== */}
      <section id="categories" className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="mb-12">
            <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3 font-medium">Каталог</div>
            <h2 className="text-4xl font-black text-foreground tracking-tight">
              Все категории<br />оборудования
            </h2>
          </div>

          <div className="grid grid-cols-4 grid-rows-3 gap-4 h-[560px]">
            {CATEGORIES_GRID.map((cat, i) => (
              <a key={i} href="#"
                className={`cat-card relative rounded-2xl overflow-hidden cursor-pointer group ${cat.col}`}
                style={{
                  background: cat.dark
                    ? "linear-gradient(135deg, hsl(148 28% 19%), hsl(148 26% 29%))"
                    : i % 4 === 1
                    ? "hsl(var(--sage-pale))"
                    : i % 3 === 0
                    ? "hsl(var(--grey-pale))"
                    : "hsl(var(--grey-light))",
                }}
              >
                <div className={`absolute top-5 left-5 w-10 h-10 rounded-xl flex items-center justify-center ${cat.dark ? "bg-white/15" : "bg-white"}`}>
                  <Icon name={cat.icon} size={18} className={cat.dark ? "text-white" : "text-sage"} fallback="Waves" />
                </div>

                <div className={`absolute top-4 right-5 text-xs font-bold tracking-wide ${cat.dark ? "text-white/25" : "text-muted-foreground/35"}`}>
                  {String(i + 1).padStart(2, "0")}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className={`font-bold leading-tight mb-1 ${cat.dark ? "text-white text-lg" : "text-foreground text-sm"}`}>
                    {cat.title}
                  </h3>
                  <p className={`text-xs ${cat.dark ? "text-white/55" : "text-muted-foreground"}`}>
                    {cat.desc}
                  </p>
                </div>

                <div className={`absolute top-5 right-5 w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1.5 group-hover:translate-x-0 ${cat.dark ? "bg-white/18" : "bg-white"}`}>
                  <Icon name="ArrowUpRight" size={14} className={cat.dark ? "text-white" : "text-sage"} />
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-sage-pale hover:border-sage-light transition-all duration-200">
              Посмотреть весь каталог
              <Icon name="ChevronRight" size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ===== ADVANTAGES ===== */}
      <section id="advantages" className="py-24 overflow-hidden" style={{ background: "hsl(var(--sage-pale))" }}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-3 font-medium">Почему мы</div>
              <h2 className="text-4xl font-black text-foreground tracking-tight">
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
                <div className="adv-num absolute top-6 right-7 text-4xl font-black text-foreground/5 group-hover:text-white/10 transition-colors duration-300 select-none">
                  {adv.num}
                </div>
                <div className="adv-icon w-12 h-12 rounded-xl bg-sage-pale flex items-center justify-center mb-5 transition-all duration-300">
                  <Icon name={adv.icon} size={22} className="text-sage group-hover:text-white transition-colors duration-300" fallback="CheckCircle" />
                </div>
                <h3 className="font-bold text-foreground group-hover:text-white text-base mb-2.5 transition-colors duration-300">
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
                <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-4">
                  Подберём оборудование<br />под ваш объект
                </h2>
                <p className="text-white/55 text-sm leading-relaxed max-w-sm">
                  Отправьте техническое задание — наш инженер свяжется в течение 2 часов и предложит оптимальное решение.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
                <button className="flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white text-sage font-bold text-sm hover:bg-sage-pale transition-all duration-200 shadow-lg">
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
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-sage flex items-center justify-center">
                  <Icon name="Waves" size={14} className="text-white" />
                </div>
                <span className="text-sm tracking-tight font-semibold">ИН<span className="text-sage font-black">АГРОТЕХ</span></span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Промышленные насосы и насосные станции. Поставка, монтаж, обслуживание с 2004 года.
              </p>
            </div>
            {[
              { title: "Каталог", links: ["Центробежные насосы", "Насосные станции", "Погружные насосы", "Запорная арматура"] },
              { title: "Компания", links: ["О компании", "Сертификаты", "Партнёры", "Вакансии"] },
              { title: "Контакты", links: ["+7 800 123-45-67", "info@mzpotok.ru", "Москва, ул. Промышленная, 1", "Пн–Пт 9:00–18:00"] },
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