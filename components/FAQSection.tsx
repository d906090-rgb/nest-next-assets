import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQSectionProps {
  lang: 'en' | 'ru';
  items?: { question: string; answer: string }[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ lang, items }) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const displayItems = items || [];

  return (
    <section className="py-24 px-4 md:px-10 font-heading selection:bg-cyan-500/30">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <HelpCircle className="text-cyan-400 w-8 h-8" />
              <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white">
                {lang === 'ru' ? 'Частые вопросы' : 'FAQ'}
              </h2>
            </div>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {lang === 'ru' 
                ? 'Ответы на вопросы о работе Нейро Завода и нейросетях'
                : 'Answers to questions about Neuro Factory and AI networks'}
            </p>
          </motion.div>
        </div>

        <div className="space-y-4">
          {displayItems.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`bg-slate-900/60 backdrop-blur-md border-2 rounded-2xl overflow-hidden transition-all duration-300
                  ${openIndex === index 
                    ? 'border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.15)]' 
                    : 'border-slate-700/50 hover:border-cyan-400/30'}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between group"
                >
                  <span className={`font-bold text-lg pr-4 transition-colors
                    ${openIndex === index ? 'text-cyan-400' : 'text-white'}`}>
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                    ${openIndex === index ? 'bg-cyan-400 text-slate-900' : 'bg-slate-800 text-slate-500 group-hover:bg-slate-700'}`}>
                    {openIndex === index ? (
                      <ChevronUp size={18} strokeWidth={2.5} />
                    ) : (
                      <ChevronDown size={18} strokeWidth={2.5} />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-slate-300 leading-relaxed border-t border-cyan-400/20 pt-4">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Help CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-slate-400 text-sm mb-4">
            {lang === 'ru' 
              ? 'Не нашли ответ на свой вопрос? Свяжитесь с нами!'
              : 'Didn\'t find your answer? Contact us!'}
          </p>
          <a
            href="https://t.me/AI_Technology_avto"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-400/10 border-2 border-cyan-400/50 rounded-xl text-cyan-400 font-bold hover:bg-cyan-400/20 hover:border-cyan-400 transition-all duration-300 group"
          >
            <span>{lang === 'ru' ? 'Написать в Telegram' : 'Write to Telegram'}</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
