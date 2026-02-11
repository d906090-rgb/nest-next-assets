
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { Heart, Zap, Trophy, MapPin, Diamond, Rocket, ArrowUpCircle, Shield, Activity, PlusCircle, Play, Briefcase, Tag, Cpu } from 'lucide-react';
import { useStore } from '../../store';
import { GameStatus, GEMINI_COLORS, ShopItem, RUN_SPEED_BASE } from '../../types';
import { audio } from '../System/Audio';

// Available Shop Items
const SHOP_ITEMS: ShopItem[] = [
    {
        id: 'DOUBLE_JUMP',
        name: 'ПРЫЖОК 2.0',
        description: 'Прыгай дважды. Нужно для высоких препятствий.',
        cost: 1000,
        icon: ArrowUpCircle,
        oneTime: true
    },
    {
        id: 'MAX_LIFE',
        name: 'МАКС. ЗДОРОВЬЕ',
        description: 'Добавляет слот здоровья и лечит.',
        cost: 1500,
        icon: Activity
    },
    {
        id: 'HEAL',
        name: 'АПТЕЧКА',
        description: 'Восстанавливает 1 единицу здоровья.',
        cost: 1000,
        icon: PlusCircle
    },
    {
        id: 'IMMORTAL',
        name: 'ПРОМОКОД: ЩИТ',
        description: 'Активируй (Space/Tap) для неуязвимости на 5с.',
        cost: 3000,
        icon: Shield,
        oneTime: true
    }
];

const ShopScreen: React.FC = () => {
    const { score, buyItem, closeShop, hasDoubleJump, hasImmortality } = useStore();
    const [items, setItems] = useState<ShopItem[]>([]);

    useEffect(() => {
        // Select 3 random items
        let pool = SHOP_ITEMS.filter(item => {
            if (item.id === 'DOUBLE_JUMP' && hasDoubleJump) return false;
            if (item.id === 'IMMORTAL' && hasImmortality) return false;
            return true;
        });

        // Shuffle and pick 3
        pool = pool.sort(() => 0.5 - Math.random());
        setItems(pool.slice(0, 3));
    }, []);

    return (
        <div className="absolute inset-0 bg-black/90 z-9000 text-white pointer-events-auto backdrop-blur-md overflow-y-auto">
             <div className="flex flex-col items-center justify-center min-h-full py-8 px-4">
                 <h2 className="text-3xl md:text-4xl font-black text-cyan-400 mb-2 font-cyber tracking-widest text-center">КИБЕР ЛАРЕК</h2>
                 <p className="text-gray-400 mb-6 text-sm">ОБМЕНЯЙ БОНУСЫ НА УЛУЧШЕНИЯ</p>
                 <div className="flex items-center text-yellow-400 mb-6 md:mb-8">
                     <span className="text-base md:text-lg mr-2">ВАШИ БОНУСЫ:</span>
                     <span className="text-xl md:text-2xl font-bold">{score.toLocaleString()}</span>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl w-full mb-8">
                     {items.map(item => {
                         const Icon = item.icon;
                         const canAfford = score >= item.cost;
                         return (
                             <div key={item.id} className="bg-gray-900/80 border border-gray-700 p-4 md:p-6 rounded-xl flex flex-col items-center text-center hover:border-cyan-500 transition-colors">
                                 <div className="bg-gray-800 p-3 md:p-4 rounded-full mb-3 md:mb-4">
                                     <Icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
                                 </div>
                                 <h3 className="text-lg md:text-xl font-bold mb-2">{item.name}</h3>
                                 <p className="text-gray-400 text-xs md:text-sm mb-4 h-10 md:h-12 flex items-center justify-center">{item.description}</p>
                                 <button 
                                    onClick={() => buyItem(item.id as any, item.cost)}
                                    disabled={!canAfford}
                                    className={`px-4 md:px-6 py-2 rounded font-bold w-full text-sm md:text-base ${canAfford ? 'bg-linear-to-r from-cyan-600 to-blue-600 hover:brightness-110' : 'bg-gray-700 cursor-not-allowed opacity-50'}`}
                                 >
                                     {item.cost} БОНУСОВ
                                 </button>
                             </div>
                         );
                     })}
                 </div>

                 <button 
                    onClick={closeShop}
                    className="flex items-center px-8 md:px-10 py-3 md:py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white font-bold text-lg md:text-xl rounded hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,0,255,0.4)]"
                 >
                     ВЕРНУТЬСЯ НА СМЕНУ <Play className="ml-2 w-5 h-5" fill="white" />
                 </button>
             </div>
        </div>
    );
};

export const HUD: React.FC = () => {
  const { score, lives, maxLives, collectedLetters, status, level, restartGame, startGame, gemsCollected, distance, isImmortalityActive, speed } = useStore();
  const target = ['Х', 'О', 'Ч', 'У', 'З', 'А', 'В', 'О', 'Д'];

  // Increased Z-Index to 9000 to be above the Canvas Loader (usually z-1000)
  const containerClass = "absolute inset-0 pointer-events-none flex flex-col justify-between p-4 md:p-8 z-[9000]";

  if (status === GameStatus.SHOP) {
      return <ShopScreen />;
  }

  if (status === GameStatus.MENU) {
      return (
          <div className="absolute inset-0 flex items-center justify-center z-9000 bg-black/80 backdrop-blur-sm p-4 pointer-events-auto">
              {/* Card Container */}
              <div className="relative w-full max-w-md rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,123,255,0.4)] border border-blue-500/30 animate-in zoom-in-95 duration-500 bg-[#0a0a0a]">
                
                {/* Logo / Title Area */}
                <div className="relative w-full h-80 flex flex-col items-center justify-center bg-linear-to-b from-[#001a33] to-[#0a0a0a] p-6 overflow-hidden">
                     {/* Decorative Elements */}
                     <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,123,255,0.2)_0%,transparent_70%)]"></div>
                     <div className="absolute w-32 h-32 bg-blue-500/20 blur-3xl rounded-full top-1/4 animate-pulse"></div>

                     {/* Main Logo Construction */}
                     <div className="relative z-10 flex flex-col items-center mb-6">
                        <div className="w-24 h-24 rounded-full bg-gray-900 border-4 border-blue-500 flex items-center justify-center shadow-[0_0_30px_rgba(0,123,255,0.6)] mb-4 relative">
                            <Cpu className="w-12 h-12 text-blue-400" />
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-[10px] font-bold text-black animate-bounce">AI</div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-white to-blue-400 font-cyber tracking-wider text-center drop-shadow-[0_0_10px_rgba(0,123,255,0.8)]">
                            ХОЧУ<br/>ЗАВОД
                        </h1>
                        <p className="text-blue-400/80 text-sm font-mono tracking-[0.3em] mt-2">KONTENT ZAVOD</p>
                     </div>
                     
                     {/* Play Button Area */}
                     <div className="relative z-10 w-full">
                        <button 
                          onClick={() => { audio.init(); startGame(); }}
                          className="w-full group relative px-6 py-4 bg-blue-600/20 backdrop-blur-md border border-blue-500/50 text-white font-black text-xl rounded-xl hover:bg-blue-600/40 transition-all shadow-[0_0_20px_rgba(0,123,255,0.3)] hover:shadow-[0_0_40px_rgba(0,123,255,0.6)] hover:border-blue-400 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-linear-to-r from-blue-500/40 via-cyan-500/40 to-blue-500/40 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                            <span className="relative z-10 tracking-widest flex items-center justify-center">
                                НАЧАТЬ СМЕНУ <Play className="ml-2 w-5 h-5 fill-white" />
                            </span>
                        </button>
                     </div>
                </div>

                <div className="bg-[#0f0f0f] p-4 text-center border-t border-white/5">
                     <p className="text-gray-500 text-[10px] md:text-xs font-mono tracking-wider">
                        [ СТРЕЛКИ / СВАЙП ДЛЯ ДВИЖЕНИЯ ]
                    </p>
                </div>
              </div>
          </div>
      );
  }

  if (status === GameStatus.GAME_OVER) {
      return (
          <div className="absolute inset-0 bg-black/90 z-9000 text-white pointer-events-auto backdrop-blur-sm overflow-y-auto">
              <div className="flex flex-col items-center justify-center min-h-full py-8 px-4">
                <h1 className="text-4xl md:text-6xl font-black text-white mb-6 drop-shadow-[0_0_10px_rgba(255,0,0,0.8)] font-cyber text-center">ВЫ УВОЛЕНЫ</h1>
                
                <div className="grid grid-cols-1 gap-3 md:gap-4 text-center mb-8 w-full max-w-md">
                    <div className="bg-gray-900/80 p-3 md:p-4 rounded-lg border border-gray-700 flex items-center justify-between">
                        <div className="flex items-center text-yellow-400 text-sm md:text-base"><Trophy className="mr-2 w-4 h-4 md:w-5 md:h-5"/> СМЕНА</div>
                        <div className="text-xl md:text-2xl font-bold font-mono">{level} / 3</div>
                    </div>
                    <div className="bg-gray-900/80 p-3 md:p-4 rounded-lg border border-gray-700 flex items-center justify-between">
                        <div className="flex items-center text-cyan-400 text-sm md:text-base"><Briefcase className="mr-2 w-4 h-4 md:w-5 md:h-5"/> КОДОВ СОБРАНО</div>
                        <div className="text-xl md:text-2xl font-bold font-mono">{gemsCollected}</div>
                    </div>
                    <div className="bg-gray-900/80 p-3 md:p-4 rounded-lg border border-gray-700 flex items-center justify-between">
                        <div className="flex items-center text-purple-400 text-sm md:text-base"><MapPin className="mr-2 w-4 h-4 md:w-5 md:h-5"/> ДИСТАНЦИЯ</div>
                        <div className="text-xl md:text-2xl font-bold font-mono">{Math.floor(distance)} М</div>
                    </div>
                     <div className="bg-gray-800/50 p-3 md:p-4 rounded-lg flex items-center justify-between mt-2">
                        <div className="flex items-center text-white text-sm md:text-base">СЧЕТ</div>
                        <div className="text-2xl md:text-3xl font-bold font-cyber text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500">{score.toLocaleString()}</div>
                    </div>
                </div>

                <button 
                  onClick={() => { audio.init(); restartGame(); }}
                  className="px-8 md:px-10 py-3 md:py-4 bg-linear-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg md:text-xl rounded hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                >
                    НАЧАТЬ ЗАНОВО
                </button>
              </div>
          </div>
      );
  }

  if (status === GameStatus.VICTORY) {
    return (
        <div className="absolute inset-0 bg-linear-to-b from-purple-900/90 to-black/95 z-9000 text-white pointer-events-auto backdrop-blur-md overflow-y-auto">
            <div className="flex flex-col items-center justify-center min-h-full py-8 px-4">
                <Rocket className="w-16 h-16 md:w-24 md:h-24 text-yellow-400 mb-4 animate-bounce drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]" />
                <h1 className="text-3xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-orange-500 to-pink-500 mb-2 drop-shadow-[0_0_20px_rgba(255,165,0,0.6)] font-cyber text-center leading-tight">
                    ВЫ ПРИНЯТЫ!
                </h1>
                <p className="text-cyan-300 text-sm md:text-xl font-mono mb-8 tracking-widest text-center uppercase">
                    ДОБРО ПОЖАЛОВАТЬ НА ЗАВОД
                </p>
                
                <div className="grid grid-cols-1 gap-4 text-center mb-8 w-full max-w-md">
                     <div className="bg-black/60 p-4 rounded-xl border border-yellow-500/30">
                        <div className="text-xs md:text-sm text-gray-400 mb-2 tracking-wider">ВАШИ ПРОМОКОДЫ</div>
                        <div className="flex flex-col gap-2">
                             <div className="bg-yellow-500/20 text-yellow-300 p-2 rounded border border-yellow-500/50 font-mono text-lg select-text">ХОЧУЗАВОД5</div>
                             <div className="bg-yellow-500/20 text-yellow-300 p-2 rounded border border-yellow-500/50 font-mono text-lg select-text">ХОЧУЗАВОД10</div>
                             <div className="bg-yellow-500/20 text-yellow-300 p-2 rounded border border-yellow-500/50 font-mono text-lg select-text">ХОЧУЗАВОД15</div>
                        </div>
                    </div>

                    <div className="bg-black/60 p-6 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                        <div className="text-xs md:text-sm text-gray-400 mb-1 tracking-wider">ФИНАЛЬНЫЙ СЧЕТ</div>
                        <div className="text-3xl md:text-4xl font-bold font-cyber text-white">{score.toLocaleString()}</div>
                    </div>
                </div>

                <button 
                  onClick={() => { audio.init(); restartGame(); }}
                  className="px-8 md:px-12 py-4 md:py-5 bg-white text-black font-black text-lg md:text-xl rounded hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] tracking-widest"
                >
                    НОВАЯ СМЕНА
                </button>
            </div>
        </div>
    );
  }

  return (
    <div className={containerClass}>
        {/* Top Bar */}
        <div className="flex justify-between items-start w-full">
            <div className="flex flex-col">
                <div className="text-3xl md:text-5xl font-bold text-cyan-400 drop-shadow-[0_0_10px_#00ffff] font-cyber">
                    {score.toLocaleString()}
                </div>
            </div>
            
            <div className="flex space-x-1 md:space-x-2">
                {[...Array(maxLives)].map((_, i) => (
                    <Heart 
                        key={i} 
                        className={`w-6 h-6 md:w-8 md:h-8 ${i < lives ? 'text-pink-500 fill-pink-500' : 'text-gray-800 fill-gray-800'} drop-shadow-[0_0_5px_#ff0054]`} 
                    />
                ))}
            </div>
        </div>
        
        {/* Level Indicator - Moved to Top Center aligned with Score/Hearts */}
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 text-sm md:text-lg text-purple-300 font-bold tracking-wider font-mono bg-black/50 px-3 py-1 rounded-full border border-purple-500/30 backdrop-blur-sm z-50">
            СМЕНА {level} <span className="text-gray-500 text-xs md:text-sm">/ 3</span>
        </div>

        {/* Active Skill Indicator */}
        {isImmortalityActive && (
             <div className="absolute top-24 left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold text-xl md:text-2xl animate-pulse flex items-center drop-shadow-[0_0_10px_gold]">
                 <Shield className="mr-2 fill-yellow-400" /> НЕУЯЗВИМОСТЬ
             </div>
        )}

        {/* Word Collection Status */}
        <div className="absolute top-16 md:top-24 left-1/2 transform -translate-x-1/2 flex space-x-0.5 md:space-x-2 px-2 w-full justify-center">
            {target.map((char, idx) => {
                const isCollected = collectedLetters.includes(idx);
                const color = GEMINI_COLORS[idx];

                return (
                    <div 
                        key={idx}
                        style={{
                            borderColor: isCollected ? color : 'rgba(55, 65, 81, 1)',
                            color: isCollected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(55, 65, 81, 1)',
                            boxShadow: isCollected ? `0 0 10px ${color}` : 'none',
                            backgroundColor: isCollected ? color : 'rgba(0, 0, 0, 0.9)'
                        }}
                        className={`w-4 h-6 xs:w-5 xs:h-7 md:w-8 md:h-10 flex items-center justify-center border md:border-2 font-black text-[8px] xs:text-[10px] md:text-lg font-cyber rounded transform transition-all duration-300 shrink-0`}
                    >
                        {char}
                    </div>
                );
            })}
        </div>

        {/* Bottom Overlay */}
        <div className="w-full flex justify-end items-end">
             <div className="flex items-center space-x-2 text-cyan-500 opacity-70">
                 <Zap className="w-4 h-4 md:w-6 md:h-6 animate-pulse" />
                 <span className="font-mono text-base md:text-xl">СКОРОСТЬ {Math.round((speed / RUN_SPEED_BASE) * 100)}%</span>
             </div>
        </div>
    </div>
  );
};
