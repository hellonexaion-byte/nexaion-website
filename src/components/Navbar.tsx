import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenAuditModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuditModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-neutral-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 lg:px-8 h-20">
        
        {/* Zone 1: Single element Brand Zone (display face wordmark) */}
        <a 
          href="/" 
          className="text-xl font-bold tracking-tight text-white whitespace-nowrap shrink-0 font-display flex items-center gap-2 group"
        >
          <span className="w-2.5 h-2.5 bg-emerald-400 rotate-45 group-hover:rotate-90 transition-transform duration-300" />
          <span>Nexaion</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <a 
            href="#products" 
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            Products
          </a>
          <a 
            href="#crawler" 
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            Ads.txt Crawler
          </a>
          <a 
            href="#console" 
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            Intelligence Console
          </a>
          <a 
            href="#case-studies" 
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            Case Studies
          </a>
          <a 
            href="#about" 
            className="hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            About
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={onOpenAuditModal}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-emerald-500/20"
          >
            <span>Request Audit</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg border border-neutral-800"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-900/95 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-neutral-300">
            <a 
              href="#products" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-400 transition-colors"
            >
              Products
            </a>
            <a 
              href="#crawler" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-400 transition-colors"
            >
              Ads.txt Crawler
            </a>
            <a 
              href="#console" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-400 transition-colors"
            >
              Intelligence Console
            </a>
            <a 
              href="#case-studies" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-400 transition-colors"
            >
              Case Studies
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-emerald-400 transition-colors"
            >
              About
            </a>
          </nav>
          <div className="pt-3 border-t border-neutral-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuditModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-emerald-400 rounded-lg"
            >
              <span>Request Audit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
