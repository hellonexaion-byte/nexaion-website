import React from 'react';
import { ArrowUpRight, ShieldCheck, Cpu, Activity, BarChart3, Database, Lock, RefreshCw } from 'lucide-react';

interface ProductBentoProps {
  onOpenAuditModal: () => void;
}

export const ProductBento: React.FC<ProductBentoProps> = ({ onOpenAuditModal }) => {
  return (
    <section id="products" className="py-20 lg:py-28 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-medium text-emerald-400 tracking-wider uppercase mb-3">
            Core Technology Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
            Four pillars of digital advertising intelligence.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300">
            Engineered specifically for digital advertising companies, media conglomerates, and programmatic trading desks needing absolute visibility into inventory, supply paths, and auction yield.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Marquee Card 1 (Span 2 Columns): Ads.txt Crawler Engine - LIVE IN PRODUCTION */}
          <div className="lg:col-span-2 rounded-2xl bg-neutral-900/70 border border-emerald-500/30 p-8 flex flex-col justify-between group hover:border-emerald-500/50 transition-colors overflow-hidden relative shadow-xl">
            
            {/* Top info */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">01. Supply Path Intelligence</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    ● Live in Production
                  </span>
                </div>
                <span className="text-xs text-neutral-400 font-mono">Cloudflare Global Edge</span>
              </div>
              
              <h3 className="text-2xl font-bold text-white font-display mb-3">
                Ads.txt & App-Ads.txt Automated Crawler & Forensic Matcher
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed max-w-xl mb-4">
                Deployed and live at <a href="https://crawler.nexaion.net" target="_blank" rel="noreferrer" className="text-emerald-400 font-mono font-medium hover:underline">crawler.nexaion.net</a> on Cloudflare Edge. Serving two dedicated enterprise programmatic workflows:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs font-mono">
                <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800">
                  <span className="text-emerald-400 font-semibold block mb-1">🏢 For Publishers & App Devs</span>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    Full origin file audit, take-rate loss calculation (-3.2% to -18%), visual supply chain hop graph, and clean IAB 1.1 manifest export.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-neutral-950/80 border border-neutral-800">
                  <span className="text-emerald-400 font-semibold block mb-1">⚡ For Ad Networks & SSPs</span>
                  <p className="text-neutral-400 text-[11px] leading-relaxed">
                    Batch partner line verification, 4-point element match breakdown (domain, seller ID, relationship, cert ID), and one-click 25-column CSV download.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual element with high-res infrastructure photo */}
            <div className="rounded-xl overflow-hidden border border-neutral-800 relative aspect-[16/9] max-h-72 mt-2">
              <img
                src="/src/assets/images/crawler_infrastructure_1793702342266.jpg"
                alt="High-velocity crawler infrastructure at Nexaion data center"
                className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent" />
              
              {/* Overlay telemetry badges */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-neutral-300">
                <div className="flex items-center gap-2 bg-neutral-950/80 px-3 py-1.5 rounded-md border border-neutral-800">
                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Production endpoint: crawler.nexaion.net</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 bg-neutral-950/80 px-3 py-1.5 rounded-md border border-neutral-800 text-emerald-400">
                  <span>Cloudflare Deployed</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-neutral-400 font-mono">Live on Cloudflare · IAB 1.1 Specification</span>
              <div className="flex items-center gap-3">
                <a 
                  href="https://crawler.nexaion.net"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-semibold uppercase tracking-wider text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                >
                  <span>Launch Live Tool</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Publisher Monetization & Yield Intelligence - UNDER CONSTRUCTION */}
          <div className="rounded-2xl bg-neutral-900/70 border border-neutral-800 p-8 flex flex-col justify-between group hover:border-neutral-700 transition-colors">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">02. Yield Analytics</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider bg-neutral-800 text-amber-400 border border-amber-500/20">
                  Under Construction · Private Beta
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white font-display mb-3">
                Publisher Monetization & Yield Intelligence
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                Deep telemetry into header bidding auctions. Uncover auction timeout losses, SSP bid shading discrepancies, and real-time floor price elasticity across all ad units.
              </p>
            </div>

            {/* Interactive Graphic Card */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-neutral-400">
                <span>Auction Timeout Loss</span>
                <span className="text-emerald-400 font-semibold">-42ms Latency</span>
              </div>
              <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-4/5 rounded-full" />
              </div>
              <div className="flex items-center justify-between text-neutral-400 pt-1">
                <span>SSP Win Rate Efficiency</span>
                <span className="text-white font-semibold">94.8%</span>
              </div>
              <div className="w-full bg-neutral-900 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-400 h-full w-[94%] rounded-full" />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-mono">Prebid.js Native · In Development</span>
              <button 
                onClick={onOpenAuditModal}
                className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-300 hover:text-white"
              >
                <span>Request Early Access</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Affiliate & Campaign Infrastructure - UNDER CONSTRUCTION */}
          <div className="rounded-2xl bg-neutral-900/70 border border-neutral-800 p-8 flex flex-col justify-between group hover:border-neutral-700 transition-colors">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">03. Performance Tech</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider bg-neutral-800 text-neutral-400 border border-neutral-700">
                  Under Construction
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white font-display mb-3">
                Affiliate & Performance Infrastructure
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed mb-6">
                Enterprise attribution verification and anti-fraud shield. Monitor click-to-install latency, identify click injection, verify publisher traffic validity, and safeguard payout accuracy.
              </p>
            </div>

            {/* Metric preview box */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Click Injection Shield</span>
                <span className="text-amber-400">In Development</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Invalid Traffic (IVT) Filter</span>
                <span className="text-white">TAG Architecture</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Attribution Engine</span>
                <span className="text-neutral-300">S2S Protocol</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-xs text-neutral-400 font-mono">Q1 2027 Target</span>
              <button 
                onClick={onOpenAuditModal}
                className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-300 hover:text-white"
              >
                <span>Join Waitlist</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Marquee Card 4 (Span 2 Columns): AI RTB Optimization & Forecasting - UNDER CONSTRUCTION */}
          <div className="lg:col-span-2 rounded-2xl bg-neutral-900/70 border border-neutral-800 p-8 flex flex-col justify-between group hover:border-neutral-700 transition-colors">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="text-xs font-mono text-emerald-400 tracking-wider uppercase">04. Automated Optimization</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wider bg-neutral-800 text-neutral-400 border border-neutral-700">
                  Under Construction · Algorithmic R&D
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white font-display mb-3">
                AI RTB Dynamic Floor & Revenue Forecaster
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed max-w-xl mb-6">
                Algorithmic yield optimization engine that computes dynamic floor prices based on real-time DSP bid density, historical win curves, time-of-day elasticity, and seasonal advertising cycles.
              </p>
            </div>

            {/* High-Tech Data Grid preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-950 border border-neutral-800 font-mono text-xs">
              <div className="p-3 bg-neutral-900/50 rounded-lg">
                <span className="text-neutral-500 block mb-1">Average Yield Lift</span>
                <span className="text-xl font-bold text-emerald-400 tabular-nums">+14.2%</span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">eCPM improvement</span>
              </div>
              <div className="p-3 bg-neutral-900/50 rounded-lg">
                <span className="text-neutral-500 block mb-1">Floor Recalculation</span>
                <span className="text-xl font-bold text-white tabular-nums">Sub-second</span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">Distributed inference</span>
              </div>
              <div className="p-3 bg-neutral-900/50 rounded-lg">
                <span className="text-neutral-500 block mb-1">Bid Discrepancy</span>
                <span className="text-xl font-bold text-white tabular-nums">&lt;0.05%</span>
                <span className="text-[11px] text-neutral-400 block mt-0.5">S2S reconciliation</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-xs text-neutral-400">Compatible with Google Ad Manager & OpenRTB</span>
              <button 
                onClick={onOpenAuditModal}
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                <span>Read Whitepaper</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
