import React from 'react';
import { getLiveStreams, LiveStream } from '@/src/lib/gemini';
import StreamCard from '@/src/components/StreamCard';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, ExternalLink, MessageSquare } from 'lucide-react';

export default function Streams() {
  const [streams, setStreams] = React.useState<LiveStream[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedStream, setSelectedStream] = React.useState<LiveStream | null>(null);

  React.useEffect(() => {
    async function fetchData() {
      const data = await getLiveStreams();
      setStreams(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <div className="flex items-center gap-3 text-red-500 mb-4">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Live Now</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase italic mb-6">
            Nexus <span className="text-nexus-accent">Live</span>
          </h1>
          <p className="text-white/40 text-sm font-light max-w-xl">
            Watch the world's best players in real-time. Integrated Twitch and YouTube Gaming feeds from the Nexus community.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            [...Array(8)].map((_, i) => (
              <div key={i} className="aspect-video bg-nexus-card border border-nexus-border rounded-xl animate-pulse" />
            ))
          ) : (
            streams.map((stream, i) => (
              <StreamCard 
                key={stream.id} 
                stream={stream} 
                index={i} 
                onSelect={setSelectedStream}
              />
            ))
          )}
        </div>

        {/* Stream Modal */}
        <AnimatePresence>
          {selectedStream && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-nexus-bg/95 backdrop-blur-xl"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative w-full max-w-6xl bg-nexus-card border border-nexus-border rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,255,204,0.1)]"
              >
                <div className="flex flex-col lg:flex-row h-full max-h-[85vh]">
                  {/* Player Area */}
                  <div className="flex-1 bg-black relative aspect-video lg:aspect-auto">
                    <iframe
                      src={selectedStream.streamUrl}
                      className="w-full h-full border-none"
                      allowFullScreen
                    />
                    <button 
                      onClick={() => setSelectedStream(null)}
                      className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-nexus-accent text-white hover:text-nexus-bg rounded-lg transition-all z-10"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  {/* Sidebar Info */}
                  <div className="lg:w-80 border-l border-nexus-border p-6 flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <img 
                        src={`https://i.pravatar.cc/150?u=${selectedStream.username}`} 
                        className="w-12 h-12 rounded-xl border border-nexus-border"
                        alt={selectedStream.username}
                      />
                      <div>
                        <h3 className="font-display font-bold text-white leading-tight">{selectedStream.username}</h3>
                        <span className="text-[10px] text-nexus-accent font-bold uppercase tracking-widest">{selectedStream.platform}</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-display font-bold text-white mb-4 leading-tight">
                      {selectedStream.title}
                    </h2>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                        <span className="text-white/40">Playing</span>
                        <span className="text-white">{selectedStream.game}</span>
                      </div>
                      <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-bold">
                        <span className="text-white/40">Viewers</span>
                        <span className="text-nexus-accent">{selectedStream.viewers.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="mt-auto space-y-3">
                      <button className="w-full py-3 bg-nexus-accent text-nexus-bg font-bold uppercase text-[10px] tracking-widest rounded-xl flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Join Chat
                      </button>
                      <button className="w-full py-3 border border-white/10 text-white/60 font-bold uppercase text-[10px] tracking-widest rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                        <ExternalLink className="w-4 h-4" />
                        Open on {selectedStream.platform}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
