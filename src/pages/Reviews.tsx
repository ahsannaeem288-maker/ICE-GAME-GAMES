import React from 'react';
import { getFeaturedReviews, GameReview } from '@/src/lib/gemini';
import ReviewCard from '@/src/components/ReviewCard';
import { Star, TrendingUp } from 'lucide-react';

export default function Reviews() {
  const [reviews, setReviews] = React.useState<GameReview[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const data = await getFeaturedReviews();
      setReviews(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <div className="flex items-center gap-2 text-nexus-accent mb-4">
            <Star className="w-5 h-5 fill-current" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Expert Analysis</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase italic mb-6">
            Game <span className="text-nexus-accent">Reviews</span>
          </h1>
          <p className="text-white/40 text-sm font-light max-w-xl">
            We dive deep into the mechanics, visuals, and narrative of every major release. No fluff, just honest scores and detailed breakdowns.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3 space-y-12">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="h-96 bg-nexus-card border border-nexus-border rounded-2xl animate-pulse" />
              ))
            ) : (
              reviews.map((review, i) => (
                <ReviewCard key={review.id} review={review} index={i} />
              ))
            )}
          </div>

          <aside className="space-y-12">
            <div className="bg-nexus-card border border-nexus-border rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-nexus-accent" />
                Trending Now
              </h3>
              <div className="space-y-6">
                {[
                  { title: 'Elden Ring: Shadow of the Erdtree', score: 9.8 },
                  { title: 'Final Fantasy VII Rebirth', score: 9.5 },
                  { title: 'Helldivers 2', score: 8.9 },
                  { title: 'Tekken 8', score: 8.7 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <span className="text-sm text-white/60 group-hover:text-white transition-colors line-clamp-1">{item.title}</span>
                    <span className="text-nexus-accent font-mono text-xs font-bold">{item.score}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-nexus-accent/5 border border-nexus-accent/20 rounded-2xl p-6">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-nexus-accent">Review Policy</h3>
              <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-wider">
                Our scores are based on a 10-point scale. We complete at least 80% of the main story before issuing a final verdict.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
