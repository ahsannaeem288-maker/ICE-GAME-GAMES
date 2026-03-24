import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Gamepad2, Newspaper, Star, Users, Search, Menu, X, Radio } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { name: 'Home', path: '/', icon: Gamepad2 },
  { name: 'Live', path: '/live', icon: Radio },
  { name: 'News', path: '/news', icon: Newspaper },
  { name: 'Reviews', path: '/reviews', icon: Star },
  { name: 'Community', path: '/community', icon: Users },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "bg-nexus-bg/80 backdrop-blur-xl border-b border-nexus-border py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-nexus-accent rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(0,255,204,0.4)]">
            <Gamepad2 className="text-nexus-bg w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tighter uppercase italic">
            Nexus<span className="text-nexus-accent">Hub</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium uppercase tracking-widest transition-colors hover:text-nexus-accent flex items-center gap-2",
                location.pathname === item.path ? "text-nexus-accent" : "text-white/70"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="p-2 text-white/70 hover:text-nexus-accent transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button 
            className="md:hidden p-2 text-white/70 hover:text-nexus-accent transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <button className="hidden md:block px-6 py-2 bg-nexus-accent text-nexus-bg font-bold uppercase text-xs tracking-widest rounded-full hover:scale-105 transition-transform active:scale-95 shadow-[0_0_20px_rgba(0,255,204,0.2)]">
            Join Nexus
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-nexus-bg border-b border-nexus-border p-6 md:hidden flex flex-col gap-6"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-lg font-medium uppercase tracking-widest flex items-center gap-4",
                  location.pathname === item.path ? "text-nexus-accent" : "text-white/70"
                )}
              >
                <item.icon className="w-6 h-6" />
                {item.name}
              </Link>
            ))}
            <button className="w-full py-4 bg-nexus-accent text-nexus-bg font-bold uppercase text-sm tracking-widest rounded-xl">
              Join Nexus
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
