/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../WantZavod/store';
import { GameStatus } from '../WantZavod/types';

const StarField = () => {
  const isGameActive = useStore(s => s.status === GameStatus.PLAYING);
  
  // useMemo MUST be called before any conditional return (React hooks rule)
  const stars = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.7 + 0.3
    }));
  }, []);

  // Skip star animations if game is active to save GPU
  if (isGameActive) return null;

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white will-change-[opacity,transform]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            transform: 'translateZ(0)'
          }}
          initial={{ opacity: star.opacity, scale: 1 }}
          animate={{
            opacity: [star.opacity, 1, star.opacity],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: star.duration * 2, // Slower animation
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

const FluidBackground: React.FC = () => {
  const isGameActive = useStore(s => s.status === GameStatus.PLAYING);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-linear-to-br from-[#050B14] via-[#0a1220] to-[#020408]">
      
      <StarField />

      {/* Blob 1: Electric Cyan - Disabled during game */}
      {!isGameActive && (
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[90vw] h-[90vw] bg-[#00F0FF] rounded-full mix-blend-screen filter blur-[50px] opacity-20 will-change-transform"
          animate={{
            x: [0, 50, -25, 0],
            y: [0, -25, 25, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{ transform: 'translateZ(0)' }}
        />
      )}

      {/* Blob 2: Champagne Gold - Disabled during game */}
      {!isGameActive && (
        <motion.div
          className="absolute top-[20%] right-[-20%] w-screen h-[80vw] bg-[#D4AF37] rounded-full mix-blend-screen filter blur-[50px] opacity-15 will-change-transform"
          animate={{
            x: [0, -50, 25, 0],
            y: [0, 50, -25, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transform: 'translateZ(0)' }}
        />
      )}

      {/* Blob 3: Deep Electric Blue/Purple - Disabled during game */}
      {!isGameActive && (
        <motion.div
          className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] bg-[#3B27BA] rounded-full mix-blend-screen filter blur-[60px] opacity-20 will-change-transform"
          animate={{
            x: [0, 75, -75, 0],
            y: [0, -50, 50, 0],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transform: 'translateZ(0)' }}
        />
      )}

      {/* Static Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/10 to-black/80 pointer-events-none" />
    </div>
  );
};

export default FluidBackground;