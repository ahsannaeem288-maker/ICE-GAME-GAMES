import React from 'react';
import { motion } from 'motion/react';
import { GameNews } from '@/src/lib/gemini';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

interface NewsGridProps {
  news: GameNews[];
  loading: boolean;
}

export default function NewsGrid({ news, loading }: NewsGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-nexus-card border border-nexus-border rounded-xl overflow-hidden animate-pulse">
            <div className="aspect-video bg-white/5" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-white/5 rounded w-1/4" />
              <div className="h-6 bg-white/5 rounded w-3/4" />
              <div className="h-4 bg-white/5 rounded w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {news.map((item, index) => (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group bg-nexus-card border border-nexus-border rounded-xl overflow-hidden hover:border-nexus-accent/50 transition-colors"
        >
          <div className="relative aspect-video overflow-hidden">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-nexus-bg/80 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest rounded text-nexus-accent">
                {item.category}
              </span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center gap-4 text-[10px] text-white/40 font-bold uppercase tracking-widest mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {item.date}
              </span>
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3" />
                Nexus News
              </span>
            </div>
            
            <h3 className="text-xl font-display font-bold mb-3 group-hover:text-nexus-accent transition-colors leading-tight">
              {item.title}
            </h3>
            
            <p className="text-sm text-white/50 line-clamp-2 mb-6 font-light">
              {item.summary}
            </p>
            
            <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-nexus-accent group-hover:gap-4 transition-all">
              Read More
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
