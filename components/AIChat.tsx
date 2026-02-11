/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToOpenAI } from '../services/openAIService';
import { ChatMessage } from '../types';

interface AIChatProps {
  lang: 'en' | 'ru';
}

const AIChat: React.FC<AIChatProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Update initial message when language changes
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { 
          role: 'model', 
          text: lang === 'ru' 
            ? 'Привет! Я готов помочь вам с вопросами о нейро заводе. Спросите меня о чем угодно! 😊' 
            : 'Ready to transcend? Ask me anything about the neuro factory. 🚀' 
        }
      ]);
    }
  }, [lang]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      chatContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Slight delay to allow state update to render before scrolling
    setTimeout(scrollToBottom, 100);

    const responseText = await sendMessageToOpenAI(input);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end pointer-events-auto">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-[90vw] md:w-96 bg-[#050B14]/90 backdrop-blur-xl border border-[#00F0FF]/30 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,240,255,0.15)]"
          >
            {/* Header */}
            <div className="bg-linear-to-r from-[#00F0FF]/20 to-[#3B27BA]/20 p-4 flex justify-between items-center border-b border-[#00F0FF]/20">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#00F0FF] animate-pulse" />
                <h3 className="font-heading font-bold text-white tracking-wider">LUMI AI</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white" data-hover="true">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={chatContainerRef}
              className="h-64 md:h-80 overflow-y-auto p-4 space-y-3 scroll-smooth"
            >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm ${
                      msg.role === 'user'
                        ? 'bg-[#00F0FF] text-black font-medium rounded-tr-none shadow-[0_0_10px_rgba(0,240,255,0.3)]'
                        : 'bg-white/5 text-gray-200 rounded-tl-none border border-white/10'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-lg rounded-tl-none flex gap-1 border border-white/10">
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-[#00F0FF] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-[#00F0FF]/20 bg-black/40">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={lang === 'ru' ? "Задайте мне любые вопросы..." : "Ask about lineup, neuro factory..."}
                  className="flex-1 bg-transparent text-white placeholder-white/30 text-sm focus:outline-none font-mono"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="bg-[#00F0FF] p-2 rounded-lg hover:bg-white hover:text-black transition-colors disabled:opacity-50 text-black"
                  data-hover="true"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-black border border-[#00F0FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] z-50 group"
        data-hover="true"
      >
        {isOpen ? (
          <X className="w-5 h-5 md:w-6 md:h-6 text-[#00F0FF]" />
        ) : (
          <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-[#00F0FF] group-hover:animate-pulse" />
        )}
      </motion.button>
    </div>
  );
};

export default AIChat;
