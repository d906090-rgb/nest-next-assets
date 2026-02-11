/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import GlassLogo from './GlassLogo';
import { 
  Telegram, YouTube, TikTok, Instagram, Threads, 
  Pinterest, LinkedIn, VK, Odnoklassniki, Dzen 
} from './BrandIcons';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  copyright: string;
  columns: FooterColumn[];
}

interface FooterProps {
  lang: 'ru' | 'en';
  content: FooterContent;
}

interface SocialSphereProps {
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  href: string;
  label: string;
}

const SocialSphere: React.FC<SocialSphereProps> = ({ Icon, color, href, label }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ y: -10, scale: 1.1 }}
      className="relative group w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full"
    >
      {/* Sphere Body */}
      <div 
        className="absolute inset-0 rounded-full transition-all duration-300"
        style={{
          background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), rgba(255,255,255,0.05) 50%, ${color}40)`,
          boxShadow: `
            inset -4px -4px 8px rgba(0,0,0,0.6),
            inset 4px 4px 8px rgba(255,255,255,0.2),
            0 0 0 1px rgba(255,255,255,0.1),
            0 10px 20px -5px ${color}60
          `
        }}
      >
        {/* Shine highlight */}
        <div className="absolute top-2 left-3 w-4 h-2 bg-white/40 blur-[2px] rounded-full transform -rotate-45" />
      </div>

      {/* Icon */}
      <div className="relative z-10 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        <Icon className="w-6 h-6 md:w-7 md:h-7" />
      </div>

      {/* Internal Glow on Hover */}
      <div 
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"
        style={{ background: color, filter: 'blur(8px)' }}
      />
    </motion.a>
  );
};

const Footer: React.FC<FooterProps> = ({ lang, content }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const socials = [
    { icon: Telegram, color: '#229ED9', href: 'https://t.me/kontentzavodAI', label: 'Telegram' },
    { icon: YouTube, color: '#FF0000', href: 'https://www.youtube.com/@НейросмехИИ', label: 'YouTube' },
    { icon: Instagram, color: '#E1306C', href: 'https://www.instagram.com/neyrosmeh/reels/', label: 'Instagram' },
    { icon: Pinterest, color: '#E60023', href: 'https://ru.pinterest.com/AIkontentzavod/', label: 'Pinterest' },
    { icon: LinkedIn, color: '#0077B5', href: 'https://www.linkedin.com/in/reanimatorxp/', label: 'LinkedIn' },
    { icon: VK, color: '#0077FF', href: 'https://vk.com/kontentzavodai?from=groups', label: 'VK' },
    { icon: Dzen, color: '#FFD700', href: 'https://dzen.ru/kontentzavodai', label: 'Dzen' },
    { icon: TikTok, color: '#00F0FF', href: 'https://www.tiktok.com/@neyrosmeh', label: 'TikTok' } 
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only intercept internal anchor links for smooth scrolling with offset
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const targetId = href.substring(1);
      
      if (location.pathname !== '/') {
        navigate(`/#${targetId}`);
        return;
      }
      
      const element = document.getElementById(targetId);
      
      if (element) {
        const headerOffset = 100; // Matches the offset used in App.tsx navigation
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer className="relative bg-[#020408] pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Background Circuit Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
             <path d="M10 10h80v80h-80z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#00F0FF]" />
             <circle cx="10" cy="10" r="1.5" className="fill-[#00F0FF]" />
             <path d="M90 90 l-20 -20" stroke="currentColor" strokeWidth="0.5" className="text-[#00F0FF]" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
        <div className="absolute inset-0 bg-linear-to-t from-[#020408] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-[#020408] via-transparent to-[#020408]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-24 mb-20">
          
          {/* Left: Logo & Info */}
          <div className="shrink-0 space-y-6 max-w-xs">
            <GlassLogo lang={lang} className="scale-110 origin-left" />
            <p className="text-gray-400 text-sm leading-relaxed">
              {lang === 'ru' 
                ? 'Платформа автоматизации контента нового поколения. Создавайте, масштабируйте и управляйте цифровым присутствием с помощью ИИ.' 
                : 'Next-generation content automation platform. Create, scale, and manage your digital presence with AI.'}
            </p>
          </div>

          {/* Right: Navigation Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8 w-full">
            {content.columns.map((col, idx) => (
              <div key={idx} className="space-y-6">
                <h4 className="font-heading font-bold text-lg text-white/90">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <a 
                        href={link.href} 
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="text-gray-500 hover:text-[#00F0FF] hover:translate-x-1 transition-all duration-300 inline-block text-sm uppercase tracking-wide cursor-pointer"
                        aria-label={link.label}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Social Spheres Row */}
        <div className="relative mb-12">
          {/* Floor Reflection Gradient */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[120%] h-20 bg-linear-to-t from-[#00F0FF]/10 to-transparent blur-3xl opacity-30 pointer-events-none" />

          {/* Social Icons Container */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 perspective-1000">
            {socials.map((social, idx) => (
              <div key={idx} className="relative group">
                 <SocialSphere 
                    Icon={social.icon} 
                    color={social.color} 
                    href={social.href}
                    label={social.label}
                 />
                 {/* Individual Reflection */}
                 <div 
                   className="absolute top-full left-0 w-full h-full opacity-30 pointer-events-none transition-opacity duration-300 group-hover:opacity-50"
                   style={{
                     transform: 'scaleY(-1) translateY(-10px)',
                     maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0) 100%)',
                     WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0) 100%)'
                   }}
                 >
                    <SocialSphere 
                      Icon={social.icon} 
                      color={social.color} 
                      href={social.href}
                      label={social.label}
                    />
                 </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-mono uppercase tracking-widest">
          <p>{content.copyright}</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-[#00F0FF] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#00F0FF] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;