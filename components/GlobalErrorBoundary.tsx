import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  lang: 'en' | 'ru';
}

interface State {
  hasError: boolean;
}

class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("CRITICAL SITE FAILURE:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#050B14] text-white z-9999 p-10 text-center font-heading">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <AlertTriangle size={80} className="text-[#00F0FF] mx-auto drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]" />
          </motion.div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 uppercase tracking-tighter">
            {this.props.lang === 'ru' ? 'СИСТЕМА ПЕРЕГРУЖЕНА' : 'SYSTEM OVERLOAD'}
          </h1>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto leading-relaxed uppercase tracking-widest text-sm">
            {this.props.lang === 'ru' 
              ? 'Ваш графический процессор не выдержал мощи завода. Мы оптимизировали ресурсы, попробуйте снова.' 
              : 'Your GPU could not handle the power of the factory. We have optimized resources, please try again.'}
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-12 py-5 bg-linear-to-r from-cyan-500 to-blue-600 text-black font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_30px_rgba(6,182,212,0.4)]"
          >
            {this.props.lang === 'ru' ? 'ПЕРЕЗАГРУЗИТЬ' : 'RESTART SYSTEM'}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default GlobalErrorBoundary;
