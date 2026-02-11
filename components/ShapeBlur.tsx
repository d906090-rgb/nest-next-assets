/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { motion } from 'framer-motion';

interface ShapeBlurProps {
  className?: string;
}

const ShapeBlur: React.FC<ShapeBlurProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute inset-0 filter blur-[80px] opacity-40">
        <motion.div
          animate={{
            x: [0, 80, -80, 0],
            y: [0, -80, 80, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-[#D4AF37] rounded-full mix-blend-screen"
        />
        <motion.div
          animate={{
            x: [0, -80, 80, 0],
            y: [0, 80, -80, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-[#F0E68C] rounded-full mix-blend-screen"
        />
         <motion.div
          animate={{
            x: [0, 40, -40, 0],
            y: [0, 40, -40, 0],
            scale: [1, 1.4, 0.6, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#FFD700] rounded-full mix-blend-screen"
        />
      </div>
    </div>
  );
};

export default ShapeBlur;