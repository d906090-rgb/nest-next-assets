/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import ShapeBlur from './ShapeBlur';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  lang: 'en' | 'ru';
  content: {
    title: string;
    items: FAQItem[];
  };
}

const AccordionItem: React.FC<{ item: FAQItem, isOpen: boolean, onClick: () => void, index: number }> = ({ item, isOpen, onClick, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group mb-4"
    >
      <button
        onClick={onClick}
        className="w-full relative flex items-center overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-[#00F0FF]/50 transition-all duration-300"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-linear-to-r from-[#00F0FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icon Container (The "Button" look from reference) */}
        <div className="relative z-10 p-4 pr-6 bg-black/20 border-r border-white/10 flex items-center justify-center min-h-[80px]">
          <div className={`
            w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300
            ${isOpen ? 'bg-[#00F0FF] text-black shadow-[0_0_15px_#00F0FF]' : 'bg-white/10 text-[#00F0FF] group-hover:bg-[#00F0FF]/20'}
          `}>
            {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
          </div>
        </div>

        {/* Question Text */}
        <div className="relative z-10 p-4 text-left flex-1">
          <h3 className={`font-heading text-lg md:text-xl font-medium transition-colors duration-300 ${isOpen ? 'text-[#00F0FF]' : 'text-gray-200'}`}>
            {item.question}
          </h3>
        </div>
      </button>

      {/* Answer Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="p-6 pt-4 pl-[88px] text-gray-400 leading-relaxed border-l border-white/10 ml-6 mb-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQ: React.FC<FAQProps> = ({ lang, content }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-[#00F0FF]/5 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: 3D Visual */}
        <div className="relative hidden lg:block h-[600px] w-full">
           <ShapeBlur className="opacity-30" />
           <motion.div 
             className="absolute inset-0 flex items-center justify-center"
             animate={{ y: [-10, 10, -10] }}
             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
           >
             {/* 
                Since we can't load the exact external 3D asset from the user's local file, 
                we simulate the "Circuit Question Mark" using a high-quality relevant image 
                styled with filters to match the cyberpunk look.
             */}
             <div className="relative w-[400px] h-[500px]">
               <img 
                 src="/assets/faq-ai.png" 
                 alt="AI Automation Factory" 
                 className="w-full h-full object-contain filter contrast-125 drop-shadow-[0_0_30px_rgba(0,240,255,0.3)]"
               />
               
               {/* Overlay "FAQ" text to mimic the reference composition */}
               <h2 className="absolute -top-10 -left-10 font-heading text-[120px] font-black text-transparent bg-clip-text bg-linear-to-br from-white to-transparent opacity-10 select-none">
                 FAQ
               </h2>
             </div>
           </motion.div>
        </div>

        {/* Right Side: Accordion */}
        <div className="relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-12 text-white"
          >
            FAQ <span className="text-[#00F0FF]">.</span>
          </motion.h2>

          <div className="flex flex-col">
            {content.items.map((item, index) => (
              <AccordionItem 
                key={index}
                index={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;