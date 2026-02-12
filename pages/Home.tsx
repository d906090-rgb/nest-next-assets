import React, { Suspense, lazy, useRef, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, Square, Play, ChevronLeft, ChevronRight, Hexagon, Star, Zap, Music, Clapperboard, User, Send as SendIcon, X } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import GradientText from '../components/GlitchText';
import ArtistCard from '../components/ArtistCard';
import { useStore as useGameStore } from '../WantZavod/store';
import { GameStatus } from '../WantZavod/types';
import PricingCalculator from '../components/PricingCalculator';
import Stepper, { Step } from '../components/Stepper';
import FAQSection from '../components/FAQSection';
import { 
  TikTok, Telegram, VK, YouTube, Instagram, Threads, OpenAI, 
  LinkedIn, Pinterest, WordPress, Odnoklassniki, Runway, ElevenLabs 
} from '../components/BrandIcons';
import { Artist } from '../types';
import { CONTENT, LINEUP_DATA, getHeroDate } from '../data/content';
const WantZavodGame = lazy(() => import('../WantZavod/App'));

interface HomeProps {
  lang: 'en' | 'ru';
}

const Home: React.FC<HomeProps> = ({ lang }) => {
  const location = useLocation();
  const gameStatus = useGameStore(s => s.status);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [isStepperOpen, setIsStepperOpen] = useState(false);
  const [selectedTierIndex, setSelectedTierIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: '', contact: '', notes: '', config: '' });
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const t = CONTENT[lang];
  const lineup = LINEUP_DATA[lang];
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedArtist) {
        if (e.key === 'ArrowLeft') navigateArtist('prev');
        if (e.key === 'ArrowRight') navigateArtist('next');
        if (e.key === 'Escape') setSelectedArtist(null);
      }
      if (isStepperOpen) {
        if (e.key === 'Escape') setIsStepperOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArtist, isStepperOpen]);

  useEffect(() => {
    setIsPlaying(false);
    setAudioProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [selectedArtist]);

  const handleCalculatorLaunch = (config: { setup: number; monthly: number; details: string }) => {
    setFormData(prev => ({ ...prev, config: config.details }));
    setSelectedTierIndex(1);
    setIsStepperOpen(true);
  };

  const handleConsultationRequest = () => {
    setFormData(prev => ({ ...prev, config: 'CONSULTATION_REQUEST' }));
    setSelectedTierIndex(null);
    setIsStepperOpen(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navigateArtist = (direction: 'next' | 'prev') => {
    if (!selectedArtist) return;
    const currentIndex = lineup.findIndex(a => a.id === selectedArtist.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % lineup.length;
    } else {
      nextIndex = (currentIndex - 1 + lineup.length) % lineup.length;
    }
    setSelectedArtist(lineup[nextIndex]);
  };

  const togglePlayback = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setAudioProgress(progress || 0);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          {lang === 'ru'
            ? 'Нейро Завод — AI-автоматизация контента 24/7'
            : 'Neuro Factory — AI Content Automation 24/7'}
        </title>
        <meta
          name="description"
          content={
            lang === 'ru'
              ? 'Нейро Завод: генерация видео, изображений и аудио нейросетями, автопостинг в соцсети, интеграции make.com и n8n.'
              : 'Neuro Factory: AI video, image, and audio generation, autoposting to social networks, make.com and n8n integrations.'
          }
        />
        <meta
          name="keywords"
          content={
            lang === 'ru'
              ? 'AI, автоматизация, контент завод, нейро завод, make.com, n8n, нейросети, Sora 2'
              : 'ai, automation, content factory, neuro factory, make.com, n8n, neural networks, sora 2'
          }
        />
        <link rel="canonical" href="https://tecai.ru/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={
            lang === 'ru'
              ? 'Нейро Завод — AI-автоматизация контента 24/7'
              : 'Neuro Factory — AI Content Automation 24/7'
          }
        />
        <meta
          property="og:description"
          content={
            lang === 'ru'
              ? 'Нейро Завод: генерация видео, изображений и аудио нейросетями, автопостинг в соцсети, интеграции make.com и n8n.'
              : 'Neuro Factory: AI video, image, and audio generation, autoposting to social networks, make.com and n8n integrations.'
          }
        />
        <meta property="og:url" content="https://tecai.ru/" />
        <meta property="og:image" content="https://tecai.ru/og-image.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            lang === 'ru'
              ? 'Нейро Завод — AI-автоматизация контента 24/7'
              : 'Neuro Factory — AI Content Automation 24/7'
          }
        />
        <meta
          name="twitter:description"
          content={
            lang === 'ru'
              ? 'Нейро Завод: генерация видео, изображений и аудио нейросетями, автопостинг в соцсети, интеграции make.com и n8n.'
              : 'Neuro Factory: AI video, image, and audio generation, autoposting to social networks, make.com and n8n integrations.'
          }
        />
        <meta name="twitter:image" content="https://tecai.ru/og-image.webp" />
        <link rel="alternate" hrefLang="ru" href="https://tecai.ru/" />
        <link rel="alternate" hrefLang="en" href="https://tecai.ru/?lang=en" />
        <link rel="alternate" hrefLang="x-default" href="https://tecai.ru/" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col justify-center items-center px-4 relative pt-20">
        <motion.div style={{ y }} className="text-center z-10 max-w-7xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex items-center justify-center gap-4 mb-6"
           >
              <div className="h-px w-12 bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] tracking-[0.5em] text-xs font-bold uppercase">{getHeroDate(lang)}</span>
              <div className="h-px w-12 bg-[#D4AF37]"></div>
           </motion.div>
          
          <div className="mb-4 flex flex-col items-center leading-none">
             <GradientText text={t.hero.h1_1} as="h1" className="text-[9vw] md:text-[8vw] leading-[0.9] tracking-tighter" />
             <GradientText text={t.hero.h1_2} as="div" className="text-[9vw] md:text-[8vw] leading-[0.9] tracking-tighter" />
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto text-gray-300 mt-6"
          >
            {t.hero.subtitle}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 relative flex justify-center"
          >
            <button 
              onClick={() => scrollToSection('tickets')}
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-transparent focus:outline-none"
              data-hover="true"
            >
              <div className="absolute inset-0 drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                 <div 
                    className="absolute inset-0 bg-linear-to-r from-[#00F0FF] via-[#ff00ff] to-[#D4AF37] opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)' }}
                 />
                 <div 
                   className="absolute inset-[2px] bg-[#050B14]/90 backdrop-blur-md"
                   style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 50%, 90% 100%, 10% 100%, 0 50%)' }}
                 >
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />
                 </div>
              </div>
              <span className="relative z-10 flex items-center gap-3 text-white font-bold tracking-[0.2em] uppercase text-sm group-hover:text-[#00F0FF] transition-colors drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]">
                {t.hero.cta} <Sparkles className="w-4 h-4 animate-pulse" />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="py-8 bg-[#00F0FF] text-black overflow-hidden flex whitespace-nowrap border-y border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.4)]">
        <motion.div 
          className="flex gap-12 font-heading font-bold text-4xl uppercase items-center"
          animate={{ x: '-50%' }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
           {Array.from({ length: 4 }).map((_, i) => (
              <React.Fragment key={i}>
                  <span>{t.marquee[0]}</span>
                  <div className="flex gap-4 items-center opacity-80">
                    <OpenAI className="w-8 h-8" />
                    <ElevenLabs className="w-8 h-8" />
                    <Runway className="w-8 h-8" />
                  </div>
                  <span>{t.marquee[1]}</span>
                  <div className="flex gap-4 items-center opacity-80">
                    <YouTube className="w-8 h-8" />
                    <TikTok className="w-8 h-8" />
                    <Instagram className="w-8 h-8" />
                    <VK className="w-8 h-8" />
                    <Telegram className="w-8 h-8" />
                  </div>
                  <span>{t.marquee[2]}</span>
                  <div className="flex gap-4 items-center opacity-80">
                    <Threads className="w-8 h-8" />
                    <LinkedIn className="w-8 h-8" />
                    <Pinterest className="w-8 h-8" />
                    <WordPress className="w-8 h-8" />
                    <Odnoklassniki className="w-8 h-8" />
                  </div>
              </React.Fragment>
           ))}
        </motion.div>
      </div>

      {/* Lineup Section */}
      <section id="lineup" className="py-24 md:py-32 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-16 flex items-end justify-between border-b border-white/10 pb-6"
          >
            <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">
              {t.lineupSection.title_1} <span className="text-[#00F0FF]">{t.lineupSection.title_2}</span>
            </h2>
            <span className="hidden md:block text-[#D4AF37] font-mono">{t.lineupSection.phase}</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/10">
            {lineup.map((artist) => (
              <ArtistCard 
                key={artist.id} 
                artist={artist} 
                onClick={() => setSelectedArtist(artist)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-black/50 relative border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { icon: Hexagon, ...t.experience.items[0] },
                 { icon: Star, ...t.experience.items[1] },
                 { icon: Zap, ...t.experience.items[2] },
                 { icon: Music, ...t.experience.items[3] },
                 { icon: Clapperboard, ...t.experience.items[4] },
                 { icon: User, ...t.experience.items[5] }
               ].map((feature, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="group p-8 border border-white/5 hover:border-[#00F0FF] hover:shadow-[0_0_20px_rgba(0,240,255,0.2)] bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-white/10 relative overflow-hidden"
                  >
                     <feature.icon className="w-12 h-12 text-[#00F0FF] mb-6 group-hover:scale-110 group-hover:text-white transition-all duration-500 drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                     <h3 className="font-heading text-2xl font-bold mb-4 uppercase">{feature.title}</h3>
                     <p className="text-gray-400 font-light leading-relaxed group-hover:text-gray-200 transition-colors whitespace-pre-line">{feature.text}</p>
                     
                     {/* --- PER-BLOCK ANIMATIONS --- */}

                     {/* 1. AI (Neural Network Animation) - Index 0 */}
                     {i === 0 && (
                        <div className="absolute top-6 right-6 w-12 h-12 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                           <div className="relative w-full h-full">
                              <motion.div 
                                className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#00F0FF] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_#00F0FF]"
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                              {[0, 120, 240].map((deg) => (
                                <motion.div
                                  key={deg}
                                  className="absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-white rounded-full"
                                  animate={{
                                     x: [0, Math.cos(deg * Math.PI / 180) * 16, 0],
                                     y: [0, Math.sin(deg * Math.PI / 180) * 16, 0],
                                     opacity: [0, 1, 0]
                                  }}
                                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: deg * 0.005 }}
                                />
                              ))}
                              <motion.div 
                                className="absolute inset-0 border border-[#00F0FF]/30 rounded-full"
                                animate={{ scale: [0.5, 1.2], opacity: [0.8, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                           </div>
                        </div>
                     )}

                     {/* 2. Best Quality (Rotating Star/Seal Animation) - Index 1 */}
                     {i === 1 && (
                        <div className="absolute top-6 right-6 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                           <div className="relative flex items-center justify-center">
                             <motion.div
                               animate={{ rotate: 360 }}
                               transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                             >
                               <Star className="w-10 h-10 text-[#D4AF37] fill-[#D4AF37]/10" />
                             </motion.div>
                             <motion.div
                                className="absolute"
                                animate={{ scale: [0.8, 1.2, 0.8], rotate: -180, opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                             >
                                <Sparkles className="w-6 h-6 text-white" />
                             </motion.div>
                           </div>
                        </div>
                     )}

                     {/* 3. Automate All (Conveyor Belt Animation) - Index 2 */}
                     {i === 2 && (
                        <div className="absolute bottom-6 right-6 opacity-30 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden w-24">
                           <motion.div
                              className="flex gap-1"
                              animate={{ x: [-24, 0] }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                           >
                              {[1,2,3,4,5].map(k => (
                                <ChevronRight key={k} className="w-6 h-6 text-[#00F0FF]" />
                              ))}
                           </motion.div>
                        </div>
                     )}

                     {/* 4. Audio Visualizer Animation - Index 3 */}
                     {i === 3 && (
                       <div className="absolute bottom-6 right-6 flex gap-1 items-end h-10 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                         {[1, 2, 3, 4, 5].map((_, barIdx) => (
                           <motion.div
                             key={barIdx}
                             className="w-1.5 bg-[#00F0FF] rounded-t-sm"
                             animate={{ height: ["20%", "100%", "20%"] }}
                             transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: barIdx * 0.15 }}
                           />
                         ))}
                       </div>
                     )}
                     
                     {/* 5. Video AI Animation (Rec Viewfinder) - Index 4 */}
                     {i === 4 && (
                       <div className="absolute top-6 right-6 w-12 h-8 opacity-30 group-hover:opacity-100 transition-opacity duration-300 border border-white/50 rounded-sm flex items-center justify-center">
                          <motion.div 
                            className="w-2 h-2 bg-red-500 rounded-full mr-1"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <span className="text-[8px] font-mono text-white">REC</span>
                          <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#00F0FF]" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#00F0FF]" />
                          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#00F0FF]" />
                          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#00F0FF]" />
                       </div>
                     )}

                     {/* 6. AI Avatars Animation (Holographic Scan) - Index 5 */}
                     {i === 5 && (
                        <div className="absolute top-6 right-6 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                           <div className="relative w-12 h-12 flex items-center justify-center overflow-hidden">
                              <User className="w-full h-full text-[#00F0FF]" />
                              <motion.div
                                className="absolute left-0 w-full h-1 bg-white/80 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                                animate={{ top: ['0%', '100%'] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                              />
                              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,240,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.2)_1px,transparent_1px)] bg-size-[4px_4px] mix-blend-overlay" />
                           </div>
                        </div>
                     )}

                     {/* Subtle Electric Shine on Hover */}
                     <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
      
      {/* WantZavod Game Section */}
      <section id="wantzavod" className="relative h-[600px] md:h-[800px] bg-black overflow-hidden border-y border-[#00F0FF]/20">
         <Suspense fallback={<div className="w-full h-full bg-black" />}>
           <WantZavodGame />
         </Suspense>
      </section>

      {/* Tickets Section */}
      <section id="tickets" className="relative">
         <PricingCalculator lang={lang} onLaunch={handleCalculatorLaunch} onConsultation={handleConsultationRequest} />
      </section>

      {/* About Section */}
      <section className="py-24 px-6 md:px-12 border-y border-white/5 bg-black/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-8">
            {t.about.title}
          </h2>
          <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-12">
            {t.stats.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.stats.items.map((item) => (
              <div key={item.label} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <p className="text-4xl md:text-5xl font-bold text-[#00F0FF] mb-3">{item.value}</p>
                <p className="text-gray-300 uppercase tracking-wide">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-6 md:px-12 bg-black/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-10">
            {t.comparison.title}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left min-w-[720px]">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-4 pr-6 text-gray-400 uppercase text-xs">{lang === 'ru' ? 'Метрика' : 'Metric'}</th>
                  <th className="py-4 px-6 text-[#00F0FF] uppercase text-xs">{lang === 'ru' ? 'Нейро Завод' : 'Neuro Factory'}</th>
                  <th className="py-4 pl-6 text-gray-400 uppercase text-xs">{lang === 'ru' ? 'Традиционная команда' : 'Traditional Team'}</th>
                </tr>
              </thead>
              <tbody>
                {t.comparison.rows.map((row) => (
                  <tr key={row.metric} className="border-b border-white/10">
                    <td className="py-5 pr-6 font-semibold text-white">{row.metric}</td>
                    <td className="py-5 px-6 text-gray-200">{row.neuro}</td>
                    <td className="py-5 pl-6 text-gray-400">{row.traditional}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection lang={lang} items={t.faq.items} />

      {/* Stepper Modal */}
      <AnimatePresence>
         {isStepperOpen && (
           <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-2xl relative"
             >
                <button 
                  onClick={() => setIsStepperOpen(false)}
                  className="absolute -top-12 right-0 md:-right-12 text-white hover:text-[#00F0FF] transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>

                <Stepper
                  initialStep={1}
                  onFinalStepCompleted={async () => {
                     const tariffName = selectedTierIndex !== null ? t.tickets.tiers[selectedTierIndex].name : (lang === 'ru' ? 'Нужна консультация' : 'Need consultation');
                     const configDetails = formData.config ? `\n⚙️ <b>Конфигурация:</b> ${formData.config}` : '';
                     const userNotes = formData.notes ? `\n📝 <b>Комментарий:</b> ${formData.notes}` : '';
                     const messageText = lang === 'ru' 
                       ? `🚀 <b>НОВАЯ ЗАЯВКА</b>\n\n👤 <b>Имя:</b> ${formData.name}\n📱 <b>Контакт:</b> ${formData.contact}\n💎 <b>Тариф:</b> ${tariffName}${configDetails}${userNotes}`
                       : `🚀 <b>NEW ORDER</b>\n\n👤 <b>Name:</b> ${formData.name}\n📱 <b>Contact:</b> ${formData.contact}\n💎 <b>Tier:</b> ${tariffName}${configDetails}${userNotes}`;

                     try {
                        const response = await fetch('/api/telegram', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ text: messageText }),
                        });
                        if (!response.ok) console.error('Telegram API Error');
                     } catch (error) {
                        console.error('Telegram Network Error:', error);
                     }
                     setTimeout(() => setIsStepperOpen(false), 2000);
                  }}
                  backButtonText={lang === 'ru' ? 'Назад' : 'Back'}
                  nextButtonText={lang === 'ru' ? 'Далее' : 'Next'}
                >
                  <Step>
                    <div className="flex flex-col gap-2">
                       <h2 className="text-2xl font-heading font-bold text-white mb-1">
                          {lang === 'ru' ? 'Инициализация' : 'Initialization'}
                       </h2>
                       <p className="text-gray-400 text-sm mb-6">
                          {lang === 'ru' ? 'Введите ваши контактные данные для создания цифрового профиля.' : 'Enter your contact details to create a digital profile.'}
                       </p>
                       <div className="space-y-4">
                          <div>
                            <label className="stepper-label">{lang === 'ru' ? 'Имя / Бренд' : 'Name / Brand'}</label>
                            <input 
                               className="stepper-input" 
                               placeholder={lang === 'ru' ? 'Например: Иван Иванов' : 'e.g. John Doe'} 
                               value={formData.name}
                               onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                          </div>
                          <div>
                             <label className="stepper-label">{lang === 'ru' ? 'Telegram / Email' : 'Telegram / Email'}</label>
                             <input 
                                className="stepper-input" 
                                placeholder="@username" 
                                value={formData.contact}
                                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                             />
                          </div>
                       </div>
                    </div>
                  </Step>
                  <Step>
                    <div className="flex flex-col gap-2">
                       <h2 className="text-2xl font-heading font-bold text-white mb-1">
                          {lang === 'ru' ? 'Конфигурация' : 'Configuration'}
                       </h2>
                       <p className="text-gray-400 text-sm mb-6">
                          {lang === 'ru' ? 'Уточните детали вашего запроса.' : 'Refine your request details.'}
                       </p>
                       <div>
                          <label className="stepper-label">{lang === 'ru' ? 'Выбранный Тариф' : 'Selected Tier'}</label>
                          <select 
                             className="stepper-input mt-2 cursor-pointer"
                             value={selectedTierIndex !== null ? selectedTierIndex : -1}
                             onChange={(e) => {
                               const val = parseInt(e.target.value);
                               setSelectedTierIndex(val === -1 ? null : val);
                             }}
                          >
                             <option value={-1}>
                               {lang === 'ru' ? '— Нужна консультация —' : '— Need consultation —'}
                             </option>
                             {t.tickets.tiers.map((tier, index) => (
                               <option key={index} value={index}>{tier.name}</option>
                             ))}
                          </select>
                       </div>
                       <div className="mt-4">
                          <label className="stepper-label">{lang === 'ru' ? 'Комментарий (опционально)' : 'Notes (Optional)'}</label>
                          <textarea 
                             className="stepper-input h-24 resize-none" 
                             placeholder="..." 
                             value={formData.notes}
                             maxLength={3000}
                             onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          />
                       </div>
                    </div>
                  </Step>
                  <Step>
                     <div className="flex flex-col items-center justify-center text-center py-8">
                        <motion.div 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }} 
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                          className="w-20 h-20 bg-[#00F0FF] rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_#00F0FF]"
                        >
                           <SendIcon className="w-10 h-10 text-black ml-1" />
                        </motion.div>
                        <h2 className="text-3xl font-heading text-white mb-2">{lang === 'ru' ? 'Готово!' : 'Ready!'}</h2>
                     </div>
                  </Step>
                </Stepper>
             </motion.div>
           </div>
         )}
      </AnimatePresence>

      {/* Artist Modal */}
      <AnimatePresence>
        {selectedArtist && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl"
            onClick={() => setSelectedArtist(null)}
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-6xl h-full max-h-[85vh] bg-[#050B14] border border-[#D4AF37]/30 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-6 right-6 z-20 p-2 text-white hover:text-[#00F0FF]"
                onClick={() => setSelectedArtist(null)}
              >
                <X />
              </button>
              <div className="w-full md:w-1/2 h-[35vh] md:h-full relative shrink-0">
                <img src={selectedArtist.image} alt={selectedArtist.name} className="w-full h-full object-cover filter grayscale contrast-125" />
                <div className="absolute inset-0 bg-linear-to-t from-[#050B14] to-transparent" />
              </div>
              <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center">
                 <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-4 text-white leading-none">{selectedArtist.name}</h2>
                 <p className="text-xl text-[#D4AF37] mb-8 font-light italic">{selectedArtist.genre}</p>
                 <p className="text-gray-300 mb-12 max-w-md whitespace-pre-line">{selectedArtist.description}</p>
                 <div className="flex gap-4">
                   {selectedArtist.audioUrl && (
                      <audio ref={audioRef} src={selectedArtist.audioUrl} onEnded={() => setIsPlaying(false)} onTimeUpdate={handleTimeUpdate} />
                   )}
                   <button 
                     onClick={togglePlayback}
                     disabled={!selectedArtist.audioUrl}
                     className="flex-1 py-4 font-bold uppercase tracking-widest transition-all relative overflow-hidden flex items-center justify-center gap-3 border border-white/10"
                   >
                     {selectedArtist.audioUrl && (
                       <div className="absolute inset-0 bg-[#00F0FF]/10">
                         <motion.div className="absolute inset-0 bg-[#00F0FF]/20" animate={{ width: `${audioProgress}%` }} />
                       </div>
                     )}
                     <span className="relative z-10">{isPlaying ? (lang === 'ru' ? t.modal.pause : 'STOP') : t.modal.listen}</span>
                   </button>
                   <div className="flex gap-2">
                     <button onClick={() => navigateArtist('prev')} className="p-4 border border-white/10 hover:border-[#00F0FF] transition-colors"><ChevronLeft /></button>
                     <button onClick={() => navigateArtist('next')} className="p-4 border border-white/10 hover:border-[#00F0FF] transition-colors"><ChevronRight /></button>
                   </div>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Home;
