import React, { Suspense, lazy, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import TargetCursor from './TargetCursor/TargetCursor';
import GlobalErrorBoundary from './GlobalErrorBoundary';
import AIChat from './AIChat';
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
const FluidBackground = lazy(() => import('./FluidBackground'));
const ImagePlayground = lazy(() => import('./ImagePlayground'));

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
        <Suspense fallback={null}>
          <FluidBackground />
        </Suspense>
        <AIChat lang={lang} />
        <Suspense fallback={null}>
          <ImagePlayground lang={lang} />
        </Suspense>
        
        <Header lang={lang} toggleLang={toggleLang} />
        
        <main className="relative z-10">
          <div id="prerender-ready" className="hidden" aria-hidden="true" />
          <Outlet />
        </main>

        <Footer lang={lang} content={t.footer} />
      </div>
    </GlobalErrorBoundary>
  );
};

export default Layout;
