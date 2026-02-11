import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Zap,
  Youtube,
  Instagram,
  User,
  Cpu,
  Sparkles,
  MessageSquare,
  Users,
  Globe,
  FileText,
  Facebook,
  Linkedin,
  Send,
  Bot
} from 'lucide-react';

interface PricingCalculatorProps {
  lang: 'en' | 'ru';
  onLaunch: (config: { setup: number; monthly: number; details: string }) => void;
  onConsultation: () => void;
}

// 1. Price Constants (Step 2)
const BASE_PRICE = 49900;

const SOCIAL_PRICES: Record<string, number> = {
  tg: 0, vk: 0,
  shorts: 15000, reels: 15000, ok: 10000,
  pinterest: 15000, facebook: 15000, linkedin: 25000,
  zen: 35000, wordpress: 35000, threads: 40000,
  max: 50000, tiktok: 60000
};

const MODULE_PRICES: Record<string, number> = {
  autoMusic: 990, customMusic: 9900,
  labelDistribution: 49000, voiceCloning: 24900,
  aiAvatar: 49000, model3D: 9900
};

const TRAINING_PRICE = 490000;
const USD_RATE = 100; // 100 RUB = 1 USD

const TRANSLATIONS = {
  en: {
    title: "Configure Your Neuro Factory",
    subtitle: "Customize your content factory's power. Full-cycle turnkey automation.",
    baseFee: "Base Platform Core",
    baseDesc: "Server architecture, AI engine, 2 socials (Telegram, VK)",
    configurator: "FACTORY CONFIGURATOR",
    hiEndModules: "HI-END MODULES",
    power: "Generation Power",
    powerDesc: "Number of content units per day",
    volume: "Content Volume",
    tiers: ["Economy (1-10)", "Optimal (11-40)", "Industrial (41+)"],
    platforms: "Connected Platforms",
    setupFee: "One-Time Payment",
    monthlySub: "Monthly Operating Cost",
    savings: "Save up to 1M RUB/year compared to a full content department",
    cta: "Launch Factory",
    protocol: "By clicking, you activate the AI protocol",
    trainingTitle: "Training Factory Creation",
    trainingDesc: "Become a Neural Architect",
    presets: {
      eco: "Path to Stars",
      optimal: "Speed of Legends",
      max: "Edge of Possible",
      ecoSub: "Economy",
      optimalSub: "Optimal",
      maxSub: "Industrial"
    }
  },
  ru: {
    title: "Собери конфигурацию Нейро Завода",
    subtitle: "Настройте мощность вашей контент-фабрики. Автоматизация полного цикла под ключ.",
    baseFee: "Базовая платформа Core",
    baseDesc: "Серверная архитектура, AI-движок, 2 соцсети (Telegram, VK)",
    configurator: "КОНФИГУРАТОР ЗАВОДА",
    hiEndModules: "HI-END МОДУЛИ",
    power: "Мощность генерации",
    powerDesc: "Количество единиц контента в сутки",
    volume: "Объём контента",
    tiers: ["Эконом (1-10)", "Оптимально (11-40)", "Промышленный (41+)"],
    platforms: "Подключаемые площадки",
    setupFee: "Разовый платеж",
    monthlySub: "Ежемесячный расход",
    savings: "Экономия до 1 млн руб/год по сравнению с отделом контента",
    cta: "Запустить Завод",
    protocol: "Нажимая кнопку, вы активируете AI-протокол",
    trainingTitle: "Обучение созданию заводов",
    trainingDesc: "Стань архитектором нейросетей",
    presets: {
      eco: "Путь к звёздам",
      optimal: "Скорость легенд",
      max: "Грань возможного",
      ecoSub: "Эконом",
      optimalSub: "Оптимальный",
      maxSub: "Промышленный"
    }
  }
};

const PricingCalculator: React.FC<PricingCalculatorProps> = ({ lang, onLaunch, onConsultation }) => {
  const t = TRANSLATIONS[lang];

  // 2. State Management (Step 1)
  const [contentVolume, setContentVolume] = useState(15);
  const [socials, setSocials] = useState<Record<string, boolean>>({
    tg: true,
    vk: true,
    shorts: false,
    reels: false,
    ok: false,
    pinterest: false,
    facebook: false,
    linkedin: false,
    zen: false,
    wordpress: false,
    threads: false,
    max: false,
    tiktok: false
  });
  const [modules, setModules] = useState<Record<string, boolean>>({
    autoMusic: false,
    customMusic: false,
    labelDistribution: false,
    voiceCloning: false,
    aiAvatar: false,
    model3D: false
  });
  const [training, setTraining] = useState(false);

  // 3. Calculation Logic (Step 3)
  const totals = useMemo(() => {
    let setupFee = BASE_PRICE;
    
    Object.entries(socials).forEach(([key, enabled]) => {
      if (enabled) setupFee += SOCIAL_PRICES[key] || 0;
    });
    
    Object.entries(modules).forEach(([key, enabled]) => {
      if (enabled) setupFee += MODULE_PRICES[key] || 0;
    });
    
    if (training) setupFee += TRAINING_PRICE;
    
    let pricePerUnit = 500;
    if (contentVolume > 40) pricePerUnit = 150;
    else if (contentVolume > 10) pricePerUnit = 300;
    
    const monthlyFee = contentVolume * pricePerUnit * 30;
    
    return { setupFee, monthlyFee };
  }, [contentVolume, socials, modules, training]);

  const formatPrice = (price: number) => {
    if (lang === 'en') {
      const usdPrice = Math.round(price / USD_RATE);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(usdPrice);
    }
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price);
  };

  const applyPreset = (type: 'eco' | 'optimal' | 'max') => {
    if (type === 'eco') setContentVolume(10);
    else if (type === 'optimal') setContentVolume(40);
    else if (type === 'max') setContentVolume(100);
  };

  const toggleSocial = (id: string) => {
    if (id === 'tg' || id === 'vk') return; // locked
    setSocials(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleLaunchClick = () => {
    const selectedSocials = Object.entries(socials).filter(([_, v]) => v).map(([k]) => k).join(', ');
    const selectedModules = Object.entries(modules).filter(([_, v]) => v).map(([k]) => k).join(', ');
    const details = `Volume: ${contentVolume}/day, Socials: ${selectedSocials}, Modules: ${selectedModules}, Training: ${training ? 'Yes' : 'No'}`;
    onLaunch({ setup: totals.setupFee, monthly: totals.monthlyFee, details });
  };

  return (
    <div className="py-24 px-4 md:px-10 font-heading selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <motion.h2 className="text-3xl md:text-6xl font-bold uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 mb-4">
            {t.title}
          </motion.h2>
          <p className="text-slate-400 max-w-2xl">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT PANEL (Step 4) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 4.1 Base Fee Card */}
            <div className="bg-slate-900/60 backdrop-blur-md border-2 border-cyan-400/50 rounded-2xl p-6 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-400/20 rounded-xl text-cyan-400">
                    <Cpu size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-cyan-400">{t.baseFee}</h3>
                    <p className="text-sm text-slate-400">{t.baseDesc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-mono text-2xl text-cyan-400 font-bold">{formatPrice(BASE_PRICE)}</span>
                  <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center text-slate-900 shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                    <Check size={18} strokeWidth={3} />
                  </div>
                </div>
              </div>
            </div>

            <div className="factory-container space-y-6">
              {/* 4.2 Accordion 1: Configurator */}
              <details open className="cyber-accordion">
                <summary className="accordion-header list-none cursor-pointer p-5 bg-slate-800/40 backdrop-blur-md border border-cyan-500/30 rounded-xl hover:border-cyan-500/50 transition-all flex items-center justify-between">
                  <h3 className="font-bold text-lg text-cyan-400">⚙️ {t.configurator}</h3>
                  <span className="arrow text-cyan-400 transition-transform duration-300">▼</span>
                </summary>
                <div className="accordion-content mt-4 px-2 space-y-8 pb-6">
                  
                  {/* Presets */}
                  <div className="presets-wrapper grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { id: 'eco' as const, title: t.presets.eco, sub: t.presets.ecoSub, vol: 10 },
                      { id: 'optimal' as const, title: t.presets.optimal, sub: t.presets.optimalSub, vol: 40 },
                      { id: 'max' as const, title: t.presets.max, sub: t.presets.maxSub, vol: 100 },
                    ].map((p) => (
                      <div 
                        key={p.id}
                        className={`preset-card p-5 rounded-2xl border-2 cursor-pointer transition-all hover:scale-105 ${
                          contentVolume === p.vol 
                            ? 'border-cyan-400 bg-cyan-400/10 active-preset' 
                            : 'border-slate-700 bg-slate-800/40 hover:border-slate-500'
                        }`}
                        onClick={() => applyPreset(p.id)}
                      >
                        <h4 className="font-bold text-lg mb-1">{p.title}</h4>
                        <p className="text-sm text-slate-400">{p.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Volume Slider */}
                  <div className="bg-slate-800/20 p-8 rounded-3xl border border-slate-700/50">
                    <div className="flex justify-between items-end mb-6">
                      <div>
                        <h3 className="font-bold text-xl mb-1 text-white">{t.power}</h3>
                        <p className="text-sm text-slate-500">{t.powerDesc}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">{t.volume}</span>
                        <motion.div key={contentVolume} animate={{ scale: [1, 1.1, 1] }} className="text-5xl font-black text-cyan-400 font-mono">
                          {contentVolume}
                        </motion.div>
                      </div>
                    </div>
                    <input 
                      type="range" min="1" max="100" value={contentVolume}
                      onChange={(e) => setContentVolume(parseInt(e.target.value))}
                      className="w-full h-3 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                      style={{ background: `linear-gradient(to right, #22d3ee ${contentVolume}%, #334155 ${contentVolume}%)` }}
                    />
                    <div className="flex justify-between mt-4 text-[10px] uppercase font-bold tracking-widest text-slate-600">
                      {t.tiers.map((tier, i) => (
                        <span key={tier} className={
                          (i === 0 && contentVolume <= 10) || 
                          (i === 1 && contentVolume > 10 && contentVolume <= 40) ||
                          (i === 2 && contentVolume > 40) ? "text-cyan-400" : ""
                        }>{tier}</span>
                      ))}
                    </div>
                  </div>

                  {/* Social Grid */}
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-cyan-500/70 mb-4">{t.platforms}</h3>
                    <div className="socials-grid">
                      {[
                        { id: 'tg', label: 'Telegram', icon: MessageSquare, price: 0 },
                        { id: 'vk', label: 'VK Video', icon: Users, price: 0 },
                        { id: 'shorts', label: 'Shorts', icon: Youtube, price: SOCIAL_PRICES.shorts },
                        { id: 'reels', label: 'Reels', icon: Instagram, price: SOCIAL_PRICES.reels },
                        { id: 'ok', label: 'OK', icon: Globe, price: SOCIAL_PRICES.ok },
                        { id: 'pinterest', label: 'Pinterest', icon: FileText, price: SOCIAL_PRICES.pinterest },
                        { id: 'facebook', label: 'Facebook', icon: Facebook, price: SOCIAL_PRICES.facebook },
                        { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, price: SOCIAL_PRICES.linkedin },
                        { id: 'zen', label: 'Дзен', icon: Globe, price: SOCIAL_PRICES.zen },
                        { id: 'wordpress', label: 'Wordpress', icon: FileText, price: SOCIAL_PRICES.wordpress },
                        { id: 'threads', label: 'Threads', icon: Send, price: SOCIAL_PRICES.threads },
                        { id: 'max', label: 'MAX', icon: Youtube, price: SOCIAL_PRICES.max },
                        { id: 'tiktok', label: 'TikTok', icon: Youtube, price: SOCIAL_PRICES.tiktok },
                      ].map((s) => (
                        <div 
                          key={s.id}
                          className={`social-card relative ${socials[s.id] ? 'selected' : ''}`}
                          onClick={() => toggleSocial(s.id)}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <s.icon size={24} className={socials[s.id] ? 'text-black' : 'text-cyan-400'} />
                            <span className="font-bold">{s.label}</span>
                            {s.price > 0 && (
                              <span className="text-[10px] opacity-70">
                                {lang === 'en' ? `$${Math.round(s.price / USD_RATE)}` : `${s.price / 1000}k ₽`}
                              </span>
                            )}
                          </div>
                          {socials[s.id] && (
                            <div className="absolute top-1 right-1 bg-black/20 rounded-full p-0.5">
                              <Check size={10} className="text-black" strokeWidth={4} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </details>

              {/* 4.3 Accordion 2: Hi-End Modules */}
              <details className="cyber-accordion">
                <summary className="accordion-header list-none cursor-pointer p-5 bg-slate-800/40 backdrop-blur-md border border-cyan-500/30 rounded-xl hover:border-cyan-500/50 transition-all flex items-center justify-between">
                  <h3 className="font-bold text-lg text-cyan-400">🚀 {t.hiEndModules}</h3>
                  <span className="arrow text-cyan-400 transition-transform duration-300">▼</span>
                </summary>
                <div className="accordion-content mt-4 px-2 space-y-3 pb-6">
                  {[
                    { id: 'autoMusic', label: lang === 'ru' ? 'Авто генерация музыки' : 'Auto Music Gen', desc: '10 tracks', price: MODULE_PRICES.autoMusic, icon: <Bot size={20}/> },
                    { id: 'customMusic', label: lang === 'ru' ? 'Кастомная генерация музыки' : 'Custom Music Gen', desc: '10 tracks', price: MODULE_PRICES.customMusic, icon: <Bot size={20}/> },
                    { id: 'labelDistribution', label: lang === 'ru' ? 'Лейбл дистрибуция' : 'Label Distribution', desc: 'Premium', price: MODULE_PRICES.labelDistribution, icon: <Zap size={20}/> },
                    { id: 'voiceCloning', label: lang === 'ru' ? 'Клонирование голоса' : 'Voice Cloning', desc: 'Digital Twin', price: MODULE_PRICES.voiceCloning, icon: <Zap size={20}/> },
                    { id: 'aiAvatar', label: 'AI Avatar', desc: 'Neural Avatar', price: MODULE_PRICES.aiAvatar, icon: <Bot size={20}/> },
                    { id: 'model3D', label: lang === 'ru' ? '3D модель' : '3D Model', desc: '3D Object', price: MODULE_PRICES.model3D, icon: <Zap size={20}/> },
                  ].map((m) => (
                    <button 
                      type="button"
                      key={m.id}
                      className={`hi-end-item p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer w-full text-left ${
                        modules[m.id] ? 'border-cyan-400 bg-cyan-400/5' : 'border-slate-700 bg-slate-900/40'
                      }`}
                      onClick={() => setModules(prev => ({ ...prev, [m.id]: !prev[m.id] }))}
                    >
                      <div className="info flex gap-4 items-center">
                        <div className={modules[m.id] ? 'text-cyan-400' : 'text-slate-600'}>{m.icon}</div>
                        <div>
                          <span className="font-bold text-white text-sm block">{m.label}</span>
                          <span className="price text-cyan-400 text-xs font-mono">{formatPrice(m.price)}</span>
                        </div>
                      </div>
                      {/* Visual-only toggle — actual state driven by parent button click */}
                      <div className="switch-ios" aria-hidden="true">
                        <div className={`slider-ios ${modules[m.id] ? 'switch-on' : ''}`} />
                      </div>
                    </button>
                  ))}
                </div>
              </details>

              {/* 4.4 Training Block */}
              <button 
                type="button"
                className={`training-card w-full text-left ${training ? 'active-training' : ''}`}
                onClick={() => setTraining(!training)}
              >
                <div className="training-glow"></div>
                <div className="training-content flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl transition-all ${
                    training ? 'bg-[#ffd700] text-black shadow-[0_0_20px_rgba(255,215,0,0.6)]' : 'bg-[#ffd700]/20 text-[#ffd700]'
                  }`}>🎓</div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-xl text-white">{t.trainingTitle}</h4>
                    <p className="text-sm text-gray-400">{t.trainingDesc}</p>
                  </div>
                  <div className={`text-2xl font-black ${training ? 'text-[#ffd700]' : 'text-[#ffd700]/50'}`}>
                    {formatPrice(TRAINING_PRICE)}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* 4.5 RIGHT PANEL: Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <div className="relative overflow-hidden bg-slate-900/60 backdrop-blur-xl border-2 border-cyan-400/50 rounded-2xl p-8 shadow-[0_0_40px_rgba(34,211,238,0.1)]">
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8 border-b border-cyan-400/20 pb-4">
                  <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-500">Factory Config</span>
                  <span className="text-[10px] uppercase font-bold text-cyan-400 animate-pulse">Active</span>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <span className="text-[10px] uppercase font-black text-slate-500 block mb-2">{t.setupFee}</span>
                    <motion.div key={totals.setupFee} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-4xl font-black text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.3)]">
                      {formatPrice(totals.setupFee)}
                    </motion.div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-black text-slate-500 block mb-2">{t.monthlySub}</span>
                    <motion.div key={totals.monthlyFee} initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="text-4xl font-black text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)] font-mono">
                      {formatPrice(totals.monthlyFee)}
                    </motion.div>
                  </div>

                  <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-xl">
                    <p className="text-xs text-green-200/90 leading-relaxed text-center">{t.savings}</p>
                  </div>

                  <button 
                    onClick={handleLaunchClick}
                    className="w-full bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black uppercase py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center gap-3 group"
                  >
                    <Zap size={22} className="fill-current group-hover:animate-pulse" />
                    {t.cta}
                  </button>

                  <p className="text-center text-[9px] uppercase tracking-widest text-slate-600">{t.protocol}</p>

                {/* Red Consultation Button */}
                <button 
                  onClick={onConsultation}
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-black uppercase py-4 rounded-2xl mt-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] text-sm leading-tight"
                >
                  {lang === 'ru' 
                    ? 'НЕ ЗНАЮ ЧТО ВЫБРАТЬ, СВЯЖИТЕСЬ СО МНОЙ' 
                    : "I DON'T KNOW WHAT TO CHOOSE, CONTACT ME"}
                </button>
                </div>
              </div>
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;
