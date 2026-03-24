import React from 'react';
import { motion } from 'motion/react';
import { GameReview } from '@/src/lib/gemini';
import { Star, Check, X } from 'lucide-react';

interface ReviewCardProps {
  review: GameReview;
  index: number;
}

export default function ReviewCard({ review, index }: ReviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="bg-nexus-card border border-nexus-border rounded-2xl overflow-hidden flex flex-col lg:flex-row"
    >
      <div className="lg:w-2/5 relative h-64 lg:h-auto">
        <img 
          src={review.imageUrl} 
          alt={review.gameTitle} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-nexus-card to-transparent lg:bg-gradient-to-r" />
        <div className="absolute top-6 left-6 flex items-center justify-center w-16 h-16 bg-nexus-accent rounded-xl shadow-lg rotate-3">
          <span className="text-nexus-bg text-2xl font-display font-black">{review.score}</span>
        </div>
      </div>

      <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-center">
        <h3 className="text-3xl font-display font-black uppercase italic mb-4">
          {review.gameTitle}
        </h3>
        
        <p className="text-lg text-white/70 mb-8 font-light italic leading-relaxed">
          "{review.verdict}"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-nexus-accent mb-4 flex items-center gap-2">
              <Check className="w-3 h-3" />
              The Good
            </h4>
            <ul className="space-y-2">
              {review.pros.map((pro, i) => (
                <li key={i} className="text-sm text-white/50 flex items-start gap-2">
                  <span className="text-nexus-accent mt-1">•</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500 mb-4 flex items-center gap-2">
              <X className="w-3 h-3" />
              The Bad
            </h4>
            <ul className="space-y-2">
              {review.cons.map((con, i) => (
                <li key={i} className="text-sm text-white/50 flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className="self-start px-6 py-3 border border-nexus-accent/30 text-nexus-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded-lg hover:bg-nexus-accent hover:text-nexus-bg transition-all">
          Read Full Review
        </button>
      </div>
    </motion.div>
  );
}
