import React from 'react';
import { ArrowUpRight, Mail, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenAuditModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuditModal }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Top 4-Column Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <a 
              href="/" 
              className="text-lg font-bold tracking-tight text-white font-display flex items-center gap-2 group"
            >
              <span className="w-2.5 h-2.5 bg-emerald-400 rotate-45 group-hover:rotate-90 transition-transform duration-300" />
              <span>Nexaion</span>
            </a>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Intelligence platform and distributed crawler infrastructure for digital advertising companies. We protect publisher yield, audit supply chains, and eliminate programmatic arbitrage.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="mailto:hello@nexaion.net"
                className="inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-emerald-400 transition-colors font-mono"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>hello@nexaion.net</span>
              </a>
              <span className="text-neutral-700">·</span>
              <a 
                href="https://nexaion.net" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors font-mono"
              >
                <span>nexaion.net</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Col 3: Products */}
          <div>
            <h4 className="text-xs uppercase font-semibold text-white tracking-wider mb-3 font-mono">
              Intelligence Suite
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#crawler" className="hover:text-emerald-400 transition-colors">
                  Ads.txt & App-Ads Crawler
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-emerald-400 transition-colors">
                  Sellers.json Validator
                </a>
              </li>
              <li>
                <a href="#console" className="hover:text-emerald-400 transition-colors">
                  Prebid.js Latency Monitor
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-emerald-400 transition-colors">
                  Traffic Quality & IVT Filter
                </a>
              </li>
              <li>
                <a href="#console" className="hover:text-emerald-400 transition-colors">
                  Dynamic Floor Engine
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Solutions */}
          <div>
            <h4 className="text-xs uppercase font-semibold text-white tracking-wider mb-3 font-mono">
              Solutions By Role
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={onOpenAuditModal} className="hover:text-emerald-400 transition-colors text-left">
                  Digital Media Groups
                </button>
              </li>
              <li>
                <button onClick={onOpenAuditModal} className="hover:text-emerald-400 transition-colors text-left">
                  Independent Publishers
                </button>
              </li>
              <li>
                <button onClick={onOpenAuditModal} className="hover:text-emerald-400 transition-colors text-left">
                  Programmatic SSPs / DSPs
                </button>
              </li>
              <li>
                <button onClick={onOpenAuditModal} className="hover:text-emerald-400 transition-colors text-left">
                  Performance & Affiliate Tech
                </button>
              </li>
              <li>
                <button onClick={onOpenAuditModal} className="hover:text-emerald-400 transition-colors text-left">
                  AdTech Architecture Consulting
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Standards & Compliance */}
          <div>
            <h4 className="text-xs uppercase font-semibold text-white tracking-wider mb-3 font-mono">
              Industry Alignment
            </h4>
            <ul className="space-y-2 text-neutral-500">
              <li>IAB Tech Lab Member Specs</li>
              <li>Ads.txt 1.1 Specification</li>
              <li>App-Ads.txt v1.0.2</li>
              <li>OpenRTB 3.0 / 2.5 Protocols</li>
              <li>TAG Certified Against Fraud</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Nexaion Inc. All rights reserved.</span>
            <span>·</span>
            <span className="text-neutral-400">nexaion.net</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-400 transition-colors cursor-pointer">Security Whitepaper</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
