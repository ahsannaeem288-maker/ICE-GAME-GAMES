import React from 'react';
import { motion } from 'motion/react';
import { Users, MessageSquare, Trophy, Heart, Send } from 'lucide-react';

const mockPosts = [
  { id: 1, user: 'GhostRunner', avatar: 'https://i.pravatar.cc/150?u=1', content: 'Just hit Diamond in Valorant! The grind was real.', likes: 124, comments: 12, time: '2h ago' },
  { id: 2, user: 'CyberWitch', avatar: 'https://i.pravatar.cc/150?u=2', content: 'Anyone playing the new CyberRebirth DLC? The boss in the Neon District is insane.', likes: 89, comments: 45, time: '4h ago' },
  { id: 3, user: 'PixelMaster', avatar: 'https://i.pravatar.cc/150?u=3', content: 'Sharing my latest setup build. What do you guys think of the cable management?', likes: 567, comments: 82, time: '6h ago' },
];

export default function Community() {
  return (
    <main className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase italic mb-6">
            Nexus <span className="text-nexus-accent">Community</span>
          </h1>
          <p className="text-white/40 text-sm font-light max-w-xl">
            The heart of the Nexus. Connect with players, share your highlights, and discuss your favorite games.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-nexus-card border border-nexus-border rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-6">Channels</h3>
              <nav className="space-y-2">
                {[
                  { name: 'General', icon: MessageSquare, active: true },
                  { name: 'Tournaments', icon: Trophy, active: false },
                  { name: 'Looking for Group', icon: Users, active: false },
                  { name: 'Highlights', icon: Heart, active: false },
                ].map((item) => (
                  <button 
                    key={item.name}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      item.active ? 'bg-nexus-accent text-nexus-bg' : 'text-white/40 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="bg-nexus-card border border-nexus-border rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-6">Online Now</h3>
              <div className="flex -space-x-3">
                {[...Array(8)].map((_, i) => (
                  <img 
                    key={i}
                    src={`https://i.pravatar.cc/150?u=${i + 10}`} 
                    className="w-10 h-10 rounded-full border-2 border-nexus-card"
                    alt="User"
                  />
                ))}
                <div className="w-10 h-10 rounded-full bg-nexus-accent text-nexus-bg flex items-center justify-center text-[10px] font-bold border-2 border-nexus-card">
                  +42
                </div>
              </div>
            </div>
          </div>

          {/* Feed */}
          <div className="lg:col-span-6 space-y-8">
            <div className="bg-nexus-card border border-nexus-border rounded-2xl p-6">
              <div className="flex gap-4">
                <img src="https://i.pravatar.cc/150?u=me" className="w-12 h-12 rounded-xl" alt="Me" />
                <div className="flex-1">
                  <textarea 
                    placeholder="What's on your mind, Gamer?" 
                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-white/20 resize-none h-24"
                  />
                  <div className="flex justify-between items-center pt-4 border-t border-nexus-border">
                    <div className="flex gap-4">
                      {/* Add icons for image, video, etc. */}
                    </div>
                    <button className="px-6 py-2 bg-nexus-accent text-nexus-bg font-bold uppercase text-[10px] tracking-widest rounded-lg flex items-center gap-2">
                      Post <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {mockPosts.map((post) => (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-nexus-card border border-nexus-border rounded-2xl p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <img src={post.avatar} className="w-10 h-10 rounded-lg" alt={post.user} />
                      <div>
                        <h4 className="text-sm font-bold text-white">{post.user}</h4>
                        <span className="text-[10px] text-white/20 uppercase tracking-widest">{post.time}</span>
                      </div>
                    </div>
                    <button className="text-white/20 hover:text-white">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-white/70 mb-6 leading-relaxed">{post.content}</p>
                  <div className="flex gap-6">
                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-nexus-accent transition-colors">
                      <Heart className="w-4 h-4" /> {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-nexus-accent transition-colors">
                      <MessageSquare className="w-4 h-4" /> {post.comments}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            <div className="bg-nexus-card border border-nexus-border rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-6">Upcoming Events</h3>
              <div className="space-y-6">
                {[
                  { title: 'Nexus Open: Valorant', date: 'Mar 28', prize: '$5,000' },
                  { title: 'Community Night: FFVII', date: 'Mar 30', prize: 'Badges' },
                ].map((event, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-white line-clamp-1">{event.title}</span>
                      <span className="text-[10px] text-nexus-accent font-mono">{event.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest">Prize Pool</span>
                      <span className="text-[10px] font-bold text-white">{event.prize}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 border border-nexus-accent/20 text-nexus-accent text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-nexus-accent/10 transition-all">
                View All Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
