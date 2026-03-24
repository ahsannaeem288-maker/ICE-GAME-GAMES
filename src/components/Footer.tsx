import React from 'react';
import { Gamepad2, Twitter, Youtube, Github, Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-nexus-bg border-t border-nexus-border pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-nexus-accent rounded flex items-center justify-center">
              <Gamepad2 className="text-nexus-bg w-5 h-5" />
            </div>
            <span className="text-xl font-display font-bold tracking-tighter uppercase italic">
              Nexus<span className="text-nexus-accent">Hub</span>
            </span>
          </Link>
          <p className="text-sm text-white/40 leading-relaxed">
            The ultimate destination for gamers. Stay updated with the latest news, in-depth reviews, and join a thriving community of players worldwide.
          </p>
          <div className="flex gap-4">
            {[Twitter, Youtube, Github, Mail].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-lg border border-nexus-border flex items-center justify-center text-white/40 hover:text-nexus-accent hover:border-nexus-accent/50 transition-all">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-8">Navigation</h4>
          <ul className="space-y-4">
            {['Home', 'News', 'Reviews', 'Community', 'Esports'].map((item) => (
              <li key={item}>
                <Link to="#" className="text-sm text-white/40 hover:text-white transition-colors flex items-center group">
                  {item}
                  <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-8">Categories</h4>
          <ul className="space-y-4">
            {['PC Gaming', 'PlayStation', 'Xbox', 'Nintendo', 'Hardware'].map((item) => (
              <li key={item}>
                <Link to="#" className="text-sm text-white/40 hover:text-white transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.3em] mb-8">Newsletter</h4>
          <p className="text-sm text-white/40 mb-6">Get the latest gaming updates delivered to your inbox.</p>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Your email" 
              className="w-full bg-nexus-card border border-nexus-border rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-nexus-accent/50 transition-colors"
            />
            <button className="absolute right-2 top-2 bottom-2 px-4 bg-nexus-accent text-nexus-bg text-[10px] font-bold uppercase rounded">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-10 border-t border-nexus-border gap-6">
        <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
          © 2026 Nexus Gaming Hub. All rights reserved.
        </span>
        <div className="flex gap-8">
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
            <Link key={item} to="#" className="text-[10px] font-bold text-white/20 uppercase tracking-widest hover:text-white transition-colors">
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
