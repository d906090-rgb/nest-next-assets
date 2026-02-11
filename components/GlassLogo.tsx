/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const logoImg = '/logo-ai.png';

interface GlassLogoProps {
  className?: string;
  lang?: 'en' | 'ru';
}

const GlassLogo = ({ className = "", lang = 'ru' }: GlassLogoProps) => {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative flex items-center gap-4 group cursor-default ${className}`}
    >
        {/* Image Container with Glow Animation */}
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            filter: [
              "drop-shadow(0 0 4px rgba(0, 240, 255, 0.4)) brightness(1)",
              "drop-shadow(0 0 15px rgba(0, 240, 255, 0.75)) brightness(1.15)",
              "drop-shadow(0 0 4px rgba(0, 240, 255, 0.4)) brightness(1)"
            ]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="relative w-[66px] h-[66px] md:w-[77px] md:h-[77px] shrink-0"
        >
          {imgError ? (
            // Fallback icon if image fails to load
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#00F0FF] to-[#D4AF37] rounded-full">
              <span className="text-3xl">⚡</span>
            </div>
          ) : (
            <img 
              src={logoImg}
              alt="Нейро Завод — логотип платформы AI-автоматизации"
              className="w-full h-full object-contain"
              onError={() => setImgError(true)}
            />
          )}
        </motion.div>

        {/* Text Logo */}
        <div className="flex flex-col">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-heading text-xl md:text-2xl font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.6)] leading-none uppercase"
            >
            {lang === 'ru' ? 'НЕЙРО' : 'CONTENT'}
            </motion.span>
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-[11.5px] md:text-[14px] tracking-[0.4em] text-[#D4AF37] font-bold uppercase opacity-90 pl-1"
            >
            {lang === 'ru' ? 'ЗАВ∞Д' : 'FACTORY'}
            </motion.span>
        </div>
    </motion.div>
  );
};

export default GlassLogo;