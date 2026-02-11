/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

interface ElectricBorderProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = "#FFFFFF",
  className = ""
}) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      
      {/* Top Line */}
      <span 
        className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-(--border-color) to-transparent -translate-x-full animate-electric-top"
        style={{ '--border-color': color } as React.CSSProperties} 
      />
      
      {/* Right Line */}
      <span 
        className="absolute top-0 right-0 w-[2px] h-full bg-linear-to-b from-transparent via-(--border-color) to-transparent -translate-y-full animate-electric-right"
        style={{ '--border-color': color } as React.CSSProperties} 
      />
      
      {/* Bottom Line */}
      <span 
        className="absolute bottom-0 right-0 w-full h-[2px] bg-linear-to-l from-transparent via-(--border-color) to-transparent translate-x-full animate-electric-bottom"
        style={{ '--border-color': color } as React.CSSProperties} 
      />
      
      {/* Left Line */}
      <span 
        className="absolute bottom-0 left-0 w-[2px] h-full bg-linear-to-t from-transparent via-(--border-color) to-transparent translate-y-full animate-electric-left"
        style={{ '--border-color': color } as React.CSSProperties} 
      />
    </div>
  );
};

export default ElectricBorder;