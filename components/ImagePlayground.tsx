/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Aperture, X, Download, Sparkles, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { createImageTask, pollTaskStatus } from '../services/kieAiService';

interface ImagePlaygroundProps {
  lang: 'en' | 'ru';
}

type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3' | '3:4';

const ImagePlayground: React.FC<ImagePlaygroundProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const t = {
    title: 'KIE.AI STUDIO',
    subtitle: lang === 'ru' ? 'Визуальный Синтез' : 'Visual Synthesis',
    placeholder: lang === 'ru' ? 'Опишите ваш сон...' : 'Describe your dream...',
    generate: lang === 'ru' ? 'СГЕНЕРИРОВАТЬ' : 'GENERATE',
    download: lang === 'ru' ? 'СКАЧАТЬ' : 'DOWNLOAD',
    aspect: lang === 'ru' ? 'Формат:' : 'Aspect:',
    error: lang === 'ru' ? 'Ошибка синтеза' : 'Synthesis Error'
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      // Step 1: Create task with Kie.ai API
      const taskId = await createImageTask(prompt, aspectRatio);
      
      // Step 2: Poll for results
      const imageUrl = await pollTaskStatus(taskId);
      
      if (imageUrl) {
        setImageUrl(imageUrl);
      } else {
        throw new Error('No image URL received');
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || t.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-22 right-4 md:bottom-26 md:right-6 z-40 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="mb-4 bg-[#050B14]/95 backdrop-blur-xl border border-[#00F0FF]/30 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.1)] w-[320px] md:w-[350px]"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-[#00F0FF]/20 to-transparent p-3 flex justify-between items-center border-b border-[#00F0FF]/20">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#00F0FF]" />
                <span className="font-heading font-bold text-white text-xs tracking-widest">{t.title}</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
               {/* Aspect Ratio Selector */}
               <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] text-gray-400 uppercase tracking-widest">{t.aspect}</span>
                  <div className="flex gap-1">
                     {(['1:1', '16:9', '9:16', '4:3', '3:4'] as AspectRatio[]).map((ratio) => (
                        <button
                           key={ratio}
                           onClick={() => setAspectRatio(ratio)}
                           className={`text-[10px] px-2 py-1 rounded border transition-all ${
                              aspectRatio === ratio 
                              ? 'bg-[#00F0FF] text-black border-[#00F0FF]' 
                              : 'bg-transparent text-gray-400 border-white/10 hover:border-white/30'
                           }`}
                        >
                           {ratio}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Image Display Area */}
               <div className="relative w-full aspect-square bg-black/50 rounded-lg border border-white/10 mb-4 overflow-hidden flex items-center justify-center group">
                  {isLoading ? (
                     <div className="flex flex-col items-center gap-2">
                        <Sparkles className="w-8 h-8 text-[#00F0FF] animate-spin" />
                        <span className="text-xs text-[#00F0FF] animate-pulse">Processing...</span>
                     </div>
                  ) : imageUrl ? (
                     <>
                        <img src={imageUrl} alt="AI-сгенерированное изображение" className="w-full h-full object-contain" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <a 
                             href={imageUrl} 
                             download={`kie-ai-generated-${Date.now()}.png`}
                             className="flex items-center gap-2 bg-[#00F0FF] text-black px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform"
                           >
                              <Download className="w-4 h-4" /> {t.download}
                           </a>
                        </div>
                     </>
                  ) : error ? (
                     <div className="flex flex-col items-center gap-2 text-red-400 p-4 text-center">
                        <AlertCircle className="w-8 h-8" />
                        <span className="text-xs">{error}</span>
                     </div>
                  ) : (
                     <div className="text-gray-600 text-xs text-center px-4">
                        {t.subtitle}
                     </div>
                  )}
               </div>

               {/* Input Area */}
               <div className="flex gap-2">
                  <input 
                     type="text" 
                     value={prompt}
                     onChange={(e) => setPrompt(e.target.value)}
                     placeholder={t.placeholder}
                     onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                     className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00F0FF]/50 transition-colors"
                  />
                  <button 
                     onClick={handleGenerate}
                     disabled={isLoading || !prompt.trim()}
                     className="bg-[#00F0FF] text-black p-2 rounded-lg hover:bg-white transition-colors disabled:opacity-50"
                  >
                     <Sparkles className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black border border-[#00F0FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] group relative overflow-hidden"
        data-hover="true"
      >
        <div className="absolute inset-0 bg-[#00F0FF]/10 group-hover:bg-[#00F0FF]/20 transition-colors" />
        <Aperture className="w-5 h-5 md:w-6 md:h-6 text-[#00F0FF] group-hover:rotate-90 transition-transform duration-500" />
      </motion.button>
    </div>
  );
};

export default ImagePlayground;
