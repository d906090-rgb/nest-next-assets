import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FluidBackground from './FluidBackground';
import TargetCursor from './TargetCursor/TargetCursor';
import GlobalErrorBoundary from './GlobalErrorBoundary';
import AIChat from './AIChat';
import ImagePlayground from './ImagePlayground';
import { CONTENT } from '../data/content';

interface LayoutProps {
  lang: 'en' | 'ru';
  toggleLang: () => void;
}

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

const YM_COUNTER_ID = 106786325;

const Layout: React.FC<LayoutProps> = ({ lang, toggleLang }) => {
  const t = CONTENT[lang];
  const location = useLocation();

  useEffect(() => {
    if (typeof window.ym === 'function') {
      window.ym(YM_COUNTER_ID, 'hit', window.location.href);
    }
  }, [location.pathname, location.search]);

  return (
    <GlobalErrorBoundary lang={lang}>
      <div className="relative min-h-screen text-white selection:bg-[#00F0FF] selection:text-black overflow-x-hidden">
        <TargetCursor targetSelector='button, a, [data-hover="true"]' />
        <FluidBackground />
        <AIChat lang={lang} />
        <ImagePlayground lang={lang} />
        
        <Header lang={lang} toggleLang={toggleLang} />
        
        <main className="relative z-10">
          <Outlet />
        </main>

        <Footer lang={lang} content={t.footer} />
      </div>
    </GlobalErrorBoundary>
  );
};

export default Layout;
