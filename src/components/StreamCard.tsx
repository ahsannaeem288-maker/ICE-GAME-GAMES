import React from 'react';
import { motion } from 'motion/react';
import { LiveStream } from '@/src/lib/gemini';
import { Users, Play, ExternalLink } from 'lucide-react';

interface StreamCardProps {
  stream: LiveStream;
  index: number;
  onSelect?: (stream: LiveStream) => void;
}

export default function StreamCard({ stream, index, onSelect }: StreamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-nexus-card border border-nexus-border rounded-xl overflow-hidden hover:border-nexus-accent/50 transition-all cursor-pointer"
      onClick={() => onSelect?.(stream)}
    >
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={stream.thumbnailUrl} 
          alt={stream.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 bg-nexus-accent rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,255,204,0.5)]">
            <Play className="text-nexus-bg w-6 h-6 fill-current ml-1" />
          </div>
        </div>
        
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="px-2 py-0.5 bg-red-600 text-[10px] font-bold uppercase tracking-widest rounded flex items-center gap-1">
            <span className="w-1 h-1 bg-white rounded-full animate-pulse" />
            Live
          </span>
          <span className="px-2 py-0.5 bg-nexus-bg/80 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest rounded text-white/80">
            {stream.platform}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-nexus-bg/80 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest rounded text-white/80 flex items-center gap-1">
          <Users className="w-3 h-3" />
          {stream.viewers.toLocaleString()}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <img 
            src={`https://i.pravatar.cc/150?u=${stream.username}`} 
            className="w-8 h-8 rounded-lg border border-nexus-border"
            alt={stream.username}
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-white truncate group-hover:text-nexus-accent transition-colors">
              {stream.title}
            </h4>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-medium truncate">
              {stream.username} • {stream.game}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
