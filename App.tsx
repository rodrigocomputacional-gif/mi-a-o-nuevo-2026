
import React, { useState, useEffect, useCallback } from 'react';
import { FireworkCanvas } from './components/FireworkCanvas';
import { Countdown } from './components/Countdown';
import { generateNewYearWish } from './services/geminiService';

const App: React.FC = () => {
  const [wish, setWish] = useState<string>("¡Preparándonos para un 2026 mágico!");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleNewWish = useCallback(async () => {
    setIsGenerating(true);
    const newWish = await generateNewYearWish();
    setWish(newWish);
    setIsGenerating(false);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'Feliz Año Nuevo 2026',
      text: '¡Mira este increíble mensaje de Año Nuevo 2026!',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center text-white">
      {/* Background Fireworks */}
      <FireworkCanvas />

      {/* Main Overlay Content */}
      <div className={`z-10 flex flex-col items-center transition-all duration-1000 transform ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        
        {/* Top Controls */}
        <div className="absolute top-8 right-8 flex space-x-4">
           <button 
            onClick={handleShare}
            className="glass p-3 rounded-full hover:bg-white/10 transition-colors text-yellow-400"
            title="Compartir link"
          >
            <i className={`fa-solid ${copied ? 'fa-check' : 'fa-share-nodes'} text-xl`}></i>
          </button>
        </div>

        {/* Decorative Badge */}
        <div className="mb-4 inline-flex items-center space-x-2 bg-yellow-500/20 px-4 py-1 rounded-full border border-yellow-500/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
          </span>
          <p className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Cuenta Regresiva 2026</p>
        </div>

        {/* Title Section */}
        <div className="text-center px-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-dancing text-yellow-200 mb-2 drop-shadow-lg">¡Feliz Año Nuevo!</h2>
          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] select-none">
            2026
          </h1>
        </div>

        {/* Countdown */}
        <div className="mb-12">
          <Countdown />
        </div>

        {/* Dynamic Wish Card */}
        <div className="max-w-md w-[90%] md:w-full glass p-8 rounded-[2rem] text-center shadow-2xl relative overflow-hidden group border-white/20">
          {/* Subtle light effect */}
          <div className="absolute top-0 -left-1/2 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 transition-all duration-1000 group-hover:left-full"></div>
          
          <i className="fa-solid fa-quote-left text-yellow-400/30 text-4xl mb-4 block"></i>
          
          <p className={`text-xl md:text-2xl font-dancing text-white leading-relaxed mb-6 transition-opacity duration-300 min-h-[3rem] flex items-center justify-center ${isGenerating ? 'opacity-50' : 'opacity-100'}`}>
            "{wish}"
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleNewWish}
              disabled={isGenerating}
              className="group/btn relative px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-full transition-all duration-300 transform active:scale-95 disabled:opacity-50 flex items-center justify-center space-x-2 overflow-hidden shadow-[0_0_20px_rgba(234,179,8,0.4)]"
            >
              <span className="relative z-10">
                {isGenerating ? (
                  <i className="fa-solid fa-circle-notch animate-spin mr-2"></i>
                ) : (
                  <i className="fa-solid fa-wand-magic-sparkles mr-2 group-hover/btn:rotate-12 transition-transform"></i>
                )}
                Nuevo Deseo
              </span>
            </button>
            
            <button 
              onClick={handleShare}
              className="px-8 py-3 glass hover:bg-white/10 text-white font-bold rounded-full transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-share-nodes"></i>
              <span>Compartir</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="absolute bottom-8 text-white/40 text-[10px] md:text-xs text-center uppercase tracking-widest px-4 pointer-events-none">
          <p>Toca la pantalla para lanzar más fuegos artificiales</p>
          <p className="mt-1">Brilla intensamente este 2026</p>
        </div>
      </div>

      {/* Ambient background particles (Tailwind animation) */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-yellow-500/5 blur-2xl animate-pulse"
            style={{
              width: `${Math.random() * 150 + 100}px`,
              height: `${Math.random() * 150 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 7 + 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
