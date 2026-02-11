import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X, ChevronDown } from 'lucide-react';
import GlassLogo from './GlassLogo';
import { CONTENT, MENU_STRUCTURE } from '../data/content';

interface HeaderProps {
  lang: 'en' | 'ru';
  toggleLang: () => void;
}

const Header: React.FC<HeaderProps> = ({ lang, toggleLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const t = CONTENT[lang];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const menuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0 }
  };

  const dropdownVariants = {
    closed: { opacity: 0, y: 10, display: 'none' },
    open: { opacity: 1, y: 0, display: 'block' }
  };

  return (
    <nav aria-label="Primary navigation" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-2 bg-[#050B14]/80 backdrop-blur-md border-b border-white/10' : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <Link to="/" className="z-50" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <GlassLogo lang={lang} className="scale-90 origin-left" />
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8 text-xs font-bold tracking-widest uppercase items-center">
          {/* Neurogeneration Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('neuro')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              type="button"
              className={`flex items-center gap-1 hover:text-[#00F0FF] transition-all cursor-pointer bg-transparent border-none ${
                activeDropdown === 'neuro' ? 'text-[#00F0FF]' : 'text-white'
              }`}
              data-hover="true"
              aria-label={lang === 'ru' ? 'Открыть меню Нейрогенерация' : 'Open Neurogeneration menu'}
              aria-haspopup="menu"
              aria-expanded={activeDropdown === 'neuro'}
            >
              {t.nav.neurogeneration} <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'neuro' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'neuro' && (
                <motion.div 
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={dropdownVariants}
                  className="absolute top-full left-0 mt-2 w-56 bg-[#050B14]/95 backdrop-blur-xl border border-white/10 p-2 shadow-2xl"
                >
                  {MENU_STRUCTURE.neuro.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-3 text-[10px] text-white hover:bg-[#00F0FF]/10 hover:text-[#00F0FF] transition-all border-b border-white/5 last:border-0"
                      data-hover="true"
                    >
                      {item.label[lang]}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Autoposting Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setActiveDropdown('auto')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button 
              type="button"
              className={`flex items-center gap-1 hover:text-[#00F0FF] transition-all cursor-pointer bg-transparent border-none ${
                activeDropdown === 'auto' ? 'text-[#00F0FF]' : 'text-white'
              }`}
              data-hover="true"
              aria-label={lang === 'ru' ? 'Открыть меню Автопостинг' : 'Open Autoposting menu'}
              aria-haspopup="menu"
              aria-expanded={activeDropdown === 'auto'}
            >
              {t.nav.autoposting} <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === 'auto' ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {activeDropdown === 'auto' && (
                <motion.div 
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={dropdownVariants}
                  className="absolute top-full left-0 mt-2 w-56 bg-[#050B14]/95 backdrop-blur-xl border border-white/10 p-2 shadow-2xl"
                >
                  {MENU_STRUCTURE.autoposting.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="block px-4 py-3 text-[10px] text-white hover:bg-[#00F0FF]/10 hover:text-[#00F0FF] transition-all border-b border-white/5 last:border-0"
                      data-hover="true"
                    >
                      {item.label[lang]}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/cases" className="hover:text-[#00F0FF] transition-all text-white" data-hover="true">
            {t.nav.cases}
          </Link>
          
          <Link to="/faq" className="hover:text-[#00F0FF] transition-all text-white" data-hover="true">
            {t.nav.faq}
          </Link>

          <div className="h-6 w-px bg-white/20 mx-2"></div>
          
          <button 
             type="button"
             onClick={toggleLang}
             className="text-white hover:text-[#00F0FF] font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer bg-transparent border-none"
             data-hover="true"
             aria-label={lang === 'ru' ? 'Переключить язык на английский' : 'Switch language to Russian'}
          >
             <Globe className="w-4 h-4" /> {lang === 'en' ? 'RU' : 'EN'}
          </button>

          <button 
            type="button"
            onClick={() => scrollToSection('tickets')}
            className="relative px-8 py-3 text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] border border-[#D4AF37] overflow-hidden group hover:text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.8)] transition-all duration-300"
            data-hover="true"
            aria-label={lang === 'ru' ? 'Перейти к тарифам' : 'Go to pricing tiers'}
          >
            <span className="relative z-10">{t.nav.cta}</span>
            <div className="absolute inset-0 bg-[#D4AF37] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-4 z-50">
          <button 
             type="button"
             onClick={toggleLang}
             className="text-white font-bold text-[10px] border border-white/30 px-2 py-1 rounded"
             aria-label={lang === 'ru' ? 'Переключить язык на английский' : 'Switch language to Russian'}
          >
             {lang === 'en' ? 'RU' : 'EN'}
          </button>
          <button 
            type="button"
            className="text-white hover:text-[#00F0FF] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? (lang === 'ru' ? 'Закрыть меню' : 'Close menu') : (lang === 'ru' ? 'Открыть меню' : 'Open menu')}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#050B14] flex flex-col pt-32 px-10 gap-6 overflow-y-auto"
          >
            {/* Neurogeneration Accordion */}
            <div className="flex flex-col gap-4">
              <button 
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'neuro' ? null : 'neuro')}
                className="flex items-center justify-between font-heading text-3xl text-white uppercase text-left"
                aria-label={lang === 'ru' ? 'Развернуть раздел Нейрогенерация' : 'Toggle Neurogeneration section'}
                aria-expanded={activeDropdown === 'neuro'}
              >
                {t.nav.neurogeneration}
                <ChevronDown className={`w-6 h-6 transition-transform ${activeDropdown === 'neuro' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'neuro' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-col pl-4 gap-4 overflow-hidden"
                  >
                    {MENU_STRUCTURE.neuro.map((item) => (
                      <Link 
                        key={item.path} 
                        to={item.path}
                        className="text-xl text-gray-400 hover:text-[#00F0FF] uppercase"
                      >
                        {item.label[lang]}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Autoposting Accordion */}
            <div className="flex flex-col gap-4">
              <button 
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'auto' ? null : 'auto')}
                className="flex items-center justify-between font-heading text-3xl text-white uppercase text-left"
                aria-label={lang === 'ru' ? 'Развернуть раздел Автопостинг' : 'Toggle Autoposting section'}
                aria-expanded={activeDropdown === 'auto'}
              >
                {t.nav.autoposting}
                <ChevronDown className={`w-6 h-6 transition-transform ${activeDropdown === 'auto' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'auto' && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-col pl-4 gap-4 overflow-hidden"
                  >
                    {MENU_STRUCTURE.autoposting.map((item) => (
                      <Link 
                        key={item.path} 
                        to={item.path}
                        className="text-xl text-gray-400 hover:text-[#00F0FF] uppercase"
                      >
                        {item.label[lang]}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/cases" className="font-heading text-3xl text-white uppercase">
              {t.nav.cases}
            </Link>
            
            <Link to="/faq" className="font-heading text-3xl text-white uppercase">
              {t.nav.faq}
            </Link>

            <button 
              type="button"
              onClick={() => scrollToSection('tickets')}
              className="mt-8 py-5 bg-[#D4AF37] text-black font-black uppercase tracking-widest text-center"
              aria-label={lang === 'ru' ? 'Перейти к тарифам' : 'Go to pricing tiers'}
            >
              {t.nav.cta}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header;
