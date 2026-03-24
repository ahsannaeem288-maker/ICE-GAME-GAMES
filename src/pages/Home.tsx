import React from 'react';
import Hero from '@/src/components/Hero';
import NewsGrid from '@/src/components/NewsGrid';
import ReviewCard from '@/src/components/ReviewCard';
import StreamCard from '@/src/components/StreamCard';
import { getLatestNews, getFeaturedReviews, getLiveStreams, GameNews, GameReview, LiveStream } from '@/src/lib/gemini';
import { motion } from 'motion/react';
import { ArrowRight, Zap, Trophy, MessageSquare, Users, Radio } from 'lucide-react';

export default function Home() {
  const [news, setNews] = React.useState<GameNews[]>([]);
  const [reviews, setReviews] = React.useState<GameReview[]>([]);
  const [streams, setStreams] = React.useState<LiveStream[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const [newsData, reviewsData, streamsData] = await Promise.all([
        getLatestNews(),
        getFeaturedReviews(),
        getLiveStreams()
      ]);
      setNews(newsData);
      setReviews(reviewsData);
      setStreams(streamsData);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />

      {/* Stats Bar */}
      <section className="py-12 border-y border-nexus-border bg-nexus-card/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Active Users', value: '2.4M', icon: Zap },
            { label: 'Total Reviews', value: '15k+', icon: Trophy },
            { label: 'Daily News', value: '50+', icon: MessageSquare },
            { label: 'Community Posts', value: '1.2M', icon: Users },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 text-nexus-accent mb-1">
                <stat.icon className="w-4 h-4" />
                <span className="text-2xl font-display font-black tracking-tight">{stat.value}</span>
              </div>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Live Now Section */}
      <section className="py-24 px-6 bg-nexus-accent/5 border-b border-nexus-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center gap-2 text-red-500 mb-2">
                <Radio className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Live Now</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic">
                Nexus <span className="text-nexus-accent">Live</span>
              </h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-nexus-accent group">
              Explore All Streams
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              [...Array(4)].map((_, i) => (
                <div key={i} className="aspect-video bg-nexus-card border border-nexus-border rounded-xl animate-pulse" />
              ))
            ) : (
              streams.map((stream, i) => (
                <StreamCard key={stream.id} stream={stream} index={i} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic mb-4">
                Latest <span className="text-nexus-accent">Updates</span>
              </h2>
              <p className="text-white/40 text-sm font-light max-w-md">
                Stay ahead of the game with breaking news, patch notes, and industry leaks.
              </p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-nexus-accent group">
              View All News
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <NewsGrid news={news} loading={loading} />
        </div>
      </section>

      {/* Featured Reviews Section */}
      <section className="py-24 px-6 bg-nexus-card/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic mb-4">
              Expert <span className="text-nexus-accent">Reviews</span>
            </h2>
            <p className="text-white/40 text-sm font-light max-w-xl mx-auto">
              Honest, in-depth analysis of the latest titles. We play them so you know if they're worth your time.
            </p>
          </div>

          <div className="space-y-12">
            {loading ? (
              [...Array(2)].map((_, i) => (
                <div key={i} className="h-96 bg-nexus-card border border-nexus-border rounded-2xl animate-pulse" />
              ))
            ) : (
              reviews.map((review, i) => (
                <ReviewCard key={review.id} review={review} index={i} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Community Teaser */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nexus-accent/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-nexus-accent/10 border border-nexus-accent/20 rounded-full text-nexus-accent text-[10px] font-bold uppercase tracking-widest">
              <Users className="w-3 h-3" />
              Join the Hub
            </div>
            
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase italic leading-tight">
              Ready to join the <span className="text-nexus-accent">Nexus</span> community?
            </h2>
            
            <p className="text-lg text-white/60 font-light max-w-2xl mx-auto leading-relaxed">
              Connect with millions of players, share your highlights, and participate in exclusive tournaments. The next level of gaming starts here.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button className="px-10 py-5 bg-nexus-accent text-nexus-bg font-black uppercase text-sm tracking-widest rounded-xl shadow-[0_0_40px_rgba(0,255,204,0.4)] hover:scale-105 transition-transform active:scale-95">
                Create Free Account
              </button>
              <button className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black uppercase text-sm tracking-widest rounded-xl hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

import { Users } from 'lucide-react';
