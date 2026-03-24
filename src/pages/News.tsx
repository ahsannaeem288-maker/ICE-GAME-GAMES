import React from 'react';
import { getLatestNews, GameNews } from '@/src/lib/gemini';
import NewsGrid from '@/src/components/NewsGrid';
import { Search, Filter } from 'lucide-react';

export default function News() {
  const [news, setNews] = React.useState<GameNews[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const data = await getLatestNews();
      setNews(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-5xl md:text-7xl font-display font-black uppercase italic mb-6">
            Nexus <span className="text-nexus-accent">News</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <p className="text-white/40 text-sm font-light max-w-xl">
              Your daily dose of gaming intelligence. From hardware breakthroughs to esports triumphs, we cover it all.
            </p>
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search news..." 
                  className="w-full bg-nexus-card border border-nexus-border rounded-lg py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-nexus-accent/50"
                />
              </div>
              <button className="p-3 bg-nexus-card border border-nexus-border rounded-lg text-white/40 hover:text-nexus-accent transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 no-scrollbar">
          {['All News', 'Esports', 'Hardware', 'Releases', 'Updates', 'Mobile'].map((cat) => (
            <button 
              key={cat}
              className="px-6 py-2 rounded-full border border-nexus-border text-[10px] font-bold uppercase tracking-widest whitespace-nowrap hover:border-nexus-accent hover:text-nexus-accent transition-all"
            >
              {cat}
            </button>
          ))}
        </div>

        <NewsGrid news={news} loading={loading} />
        
        {!loading && (
          <div className="mt-20 flex justify-center">
            <button className="px-10 py-4 border border-nexus-accent/30 text-nexus-accent text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl hover:bg-nexus-accent hover:text-nexus-bg transition-all">
              Load More Articles
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
