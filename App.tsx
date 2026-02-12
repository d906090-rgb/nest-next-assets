import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AvatarsPage from './pages/neuro/AvatarsPage';
import VideoPage from './pages/neuro/VideoPage';
import AudioPage from './pages/neuro/AudioPage';
import SocialPage from './pages/neuro/SocialPage';
import ThreeDPage from './pages/neuro/ThreeDPage';
import ImagesPage from './pages/neuro/ImagesPage';
import SocialsPage from './pages/autoposting/SocialsPage';
import SitesPage from './pages/autoposting/SitesPage';
import CasesPage from './pages/CasesPage';
import FAQPage from './pages/FAQPage';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'ru'>('ru');

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ru' : 'en');
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout lang={lang} toggleLang={toggleLang} />}>
          <Route index element={<Home lang={lang} />} />
          
          {/* Neurogeneration Routes */}
          <Route path="neuro-generation">
            <Route path="avatars" element={<AvatarsPage lang={lang} />} />
            <Route path="video" element={<VideoPage lang={lang} />} />
            <Route path="audio" element={<AudioPage lang={lang} />} />
            <Route path="social" element={<SocialPage lang={lang} />} />
            <Route path="3d" element={<ThreeDPage lang={lang} />} />
            <Route path="images" element={<ImagesPage lang={lang} />} />
          </Route>
          
          {/* Autoposting Routes */}
          <Route path="autoposting">
            <Route path="socials" element={<SocialsPage lang={lang} />} />
            <Route path="sites" element={<SitesPage lang={lang} />} />
          </Route>
          
          {/* Other Pages */}
          <Route path="about" element={<AboutPage lang={lang} />} />
          <Route path="cases" element={<CasesPage lang={lang} />} />
          <Route path="faq" element={<FAQPage lang={lang} />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
