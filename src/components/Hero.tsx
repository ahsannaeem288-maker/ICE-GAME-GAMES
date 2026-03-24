import React from 'react';
import { motion } from 'motion/react';
import { Play, Info, ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden flex items-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" 
          alt="Gaming Background" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nexus-bg via-nexus-bg/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-nexus-bg via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 bg-nexus-accent/10 border border-nexus-accent/20 text-nexus-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded">
              Featured Release
            </span>
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
              March 2026
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-display font-black uppercase leading-[0.9] mb-6 italic">
            Cyber<span className="text-nexus-accent">Rebirth</span> 2077
          </h1>

          <p className="text-lg text-white/60 mb-10 font-light leading-relaxed max-w-xl">
            Experience the next evolution of Night City. New districts, enhanced cybernetics, and a story that redefines the genre. Available now on all platforms.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-nexus-accent text-nexus-bg font-black uppercase text-sm tracking-widest rounded-lg flex items-center gap-3 hover:scale-105 transition-transform active:scale-95 shadow-[0_0_30px_rgba(0,255,204,0.3)]">
              <Play className="w-5 h-5 fill-current" />
              Watch Trailer
            </button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black uppercase text-sm tracking-widest rounded-lg flex items-center gap-3 hover:bg-white/10 transition-colors">
              <Info className="w-5 h-5" />
              Game Details
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom decorative elements */}
      <div className="absolute bottom-10 left-0 right-0 z-10 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-end">
          <div className="flex gap-8">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Status</span>
              <span className="text-nexus-accent font-mono text-xs flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-nexus-accent rounded-full animate-pulse" />
                SERVERS ONLINE
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">Players</span>
              <span className="text-white font-mono text-xs">1,240,592</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4 text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
            <span>Scroll to explore</span>
            <div className="w-12 h-px bg-white/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
