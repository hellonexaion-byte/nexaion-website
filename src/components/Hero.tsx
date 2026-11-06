import React from 'react';
import { ArrowDown, ArrowUpRight, Search, ShieldCheck, Zap, Activity } from 'lucide-react';

interface HeroProps {
  onScrollToCrawler: () => void;
  onOpenAuditModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToCrawler, onOpenAuditModal }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-white/5">
      {/* Background radial gradient accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Unboxed Metadata Kicker (Anti-slop: NO PILL) */}
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-400 tracking-wider uppercase mb-6">
          <span>Digital Advertising Intelligence</span>
          <span aria-hidden="true" className="text-neutral-600">/</span>
          <span>IAB Tech Lab Compliant</span>
          <span aria-hidden="true" className="text-neutral-600">/</span>
          <span>500M+ Records Indexed</span>
        </div>

        {/* Display Headline with text-wrap: balance and max-w-4xl */}
        <div className="max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white font-display leading-[1.08] [text-wrap:balance]">
            Architecting transparency across the digital advertising supply chain.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-neutral-300 leading-relaxed max-w-2xl font-normal">
            Automated Ads.txt & App-Ads.txt crawler, programmatic yield telemetry, and supply path optimization (SPO) engineered for digital publishers, media agencies, and ad networks.
          </p>
        </div>

        {/* Action Controls */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            onClick={onScrollToCrawler}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-neutral-950 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-lg transition-colors shadow-sm shadow-emerald-500/20 whitespace-nowrap shrink-0"
          >
            <Search className="w-4 h-4 text-neutral-950" />
            <span>Launch Forensic Supply Path Terminal</span>
          </button>
          
          <button
            onClick={onOpenAuditModal}
            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <span>Request Institutional Access</span>
            <ArrowUpRight className="w-4 h-4 text-neutral-400" />
          </button>
        </div>

        {/* Hero Visual Card with High-Res Image & Live Programmatic Telemetry Overlay */}
        <div className="mt-14 relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/60 shadow-2xl">
          <div className="relative aspect-[16/9] max-h-[560px] w-full overflow-hidden">
            <img
              src="/src/assets/images/hero_ad_intelligence_1793702342274.jpg"
              alt="Executive programmatic advertising intelligence war room displaying real-time auction analytics"
              className="w-full h-full object-cover object-center filter brightness-90 contrast-105"
              referrerPolicy="no-referrer"
            />
            {/* Measured gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/50" />

            {/* In-Hero Live Telemetry Card (HUD) */}
            <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8">
              <div className="bg-neutral-950/85 backdrop-blur-md rounded-xl p-5 lg:p-6 border border-white/10 max-w-3xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800/80 pb-4 mb-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-emerald-400 font-mono font-medium">Nexaion Global Crawl Grid</span>
                    <h3 className="text-white font-semibold text-base mt-0.5">Distributed Ads.txt & Programmatic Supply Path Monitor</h3>
                  </div>
                  <div className="text-xs text-neutral-400 font-mono">
                    <span>Region: US-East / EU-Central / AP-East</span>
                  </div>
                </div>

                {/* 4 Quantitative Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="text-xs text-neutral-400 block">Records Indexed</span>
                    <span className="text-xl lg:text-2xl font-bold text-white font-mono tabular-nums">542,891,400</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block">Crawl Throughput</span>
                    <span className="text-xl lg:text-2xl font-bold text-emerald-400 font-mono tabular-nums">8,420 QPS</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block">Monitored Ad Spend</span>
                    <span className="text-xl lg:text-2xl font-bold text-white font-mono tabular-nums">$2.4B/yr</span>
                  </div>
                  <div>
                    <span className="text-xs text-neutral-400 block">Sellers.json Accuracy</span>
                    <span className="text-xl lg:text-2xl font-bold text-white font-mono tabular-nums">99.82%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Partner & Standard Badges */}
        <div className="mt-16 pt-8 border-t border-neutral-800/80">
          <p className="text-xs uppercase tracking-wider text-neutral-400 font-medium mb-6">
            Standards & Protocols Supported Across The Ecosystem
          </p>
          <div className="flex flex-wrap items-center justify-between gap-6 lg:gap-10 text-neutral-400 text-sm font-medium">
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>IAB Tech Lab Ads.txt 1.1</span>
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>App-Ads.txt for CTV & Mobile</span>
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Sellers.json Validation</span>
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>OpenRTB 3.0 & Prebid.js</span>
            </span>
            <span className="flex items-center gap-2 hover:text-white transition-colors">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Google MCM & Open Bidding</span>
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
