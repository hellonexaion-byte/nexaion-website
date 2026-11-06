import React from 'react';
import { ShieldCheck, Globe, Cpu, CheckCircle2, ArrowUpRight, Mail } from 'lucide-react';

interface AboutSectionProps {
  onOpenAuditModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenAuditModal }) => {
  return (
    <section id="about" className="py-20 lg:py-28 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-medium text-emerald-400 tracking-wider uppercase mb-3">
            Company & Engineering Vision
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
            About Nexaion: The intelligence layer for digital advertising companies.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300">
            Founded on the conviction that programmatic advertising deserves institutional-grade transparency, precision data pipelines, and automated supply chain integrity.
          </p>
        </div>

        {/* 2-Column Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Text Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-neutral-300 text-base leading-relaxed">
            <p>
              The digital advertising ecosystem processes hundreds of billions of bid requests every second across a sprawling web of SSPs, DSPs, ad networks, and intermediary resellers. Yet, despite advances in programmatic technology, publishers and ad tech companies routinely lose 3% to 8% of revenue to unauthorized domain spoofing, undocumented reseller chains, syntax corruption in <code className="text-emerald-400 bg-neutral-900 px-1.5 py-0.5 rounded font-mono text-xs">ads.txt</code>, and header bidding auction latency.
            </p>
            <p>
              <strong className="text-white font-semibold">Nexaion (<a href="https://nexaion.net" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">nexaion.net</a>)</strong> was built to solve this structural deficit. We design and operate distributed digital platforms, autonomous crawler infrastructure, and real-time analytics engines designed specifically to empower publishers, media agencies, affiliate operators, and ad tech networks.
            </p>
            
            {/* Core Capability Checklist */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-mono text-neutral-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Distributed Ads.txt & App-Ads.txt Crawling</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Publisher Yield & Prebid.js Telemetry</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Affiliate Fraud & IVT Prevention</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Enterprise AdTech Architecture Advisory</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenAuditModal}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
              >
                <span>Partner With Nexaion</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              
              <a
                href="mailto:hello@nexaion.net"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-300 bg-neutral-900 hover:text-white border border-neutral-800 rounded-lg transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>hello@nexaion.net</span>
              </a>
            </div>
          </div>

          {/* Right Image Showcase (5 cols) */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl">
            <div className="aspect-[4/3] w-full relative overflow-hidden">
              <img
                src="/src/assets/images/executive_agency_workspace_1793702342955.jpg"
                alt="Executive board room at Nexaion consulting headquarters"
                className="w-full h-full object-cover filter brightness-95"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-neutral-950/90 border border-neutral-800 text-xs font-mono text-neutral-300">
                <div className="flex items-center justify-between text-emerald-400 font-semibold mb-1">
                  <span>Nexaion Advisory Services</span>
                  <span>Global Operations</span>
                </div>
                <p className="text-neutral-400 text-[11px] leading-relaxed">
                  Tailored consulting for media networks scaling header bidding wrappers, OpenRTB integrations, and programmatic monetization.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 3 Pillars of Technology Excellence */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-neutral-800">
          <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
            <span className="text-xs font-mono text-emerald-400 block mb-2">Pillar I</span>
            <h4 className="text-lg font-bold text-white mb-2">Automated Data Pipelines</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Zero-impact crawler clusters that poll millions of publisher endpoints with polite rate limiting, automated DNS resolution, and intelligent differential caching.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
            <span className="text-xs font-mono text-emerald-400 block mb-2">Pillar II</span>
            <h4 className="text-lg font-bold text-white mb-2">IAB Tech Lab Alignment</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Native compliance with Ads.txt 1.1, Sellers.json, OpenRTB 3.0, and SupplyChain Object (schain) specifications so every auction hop is validated before a bid is cast.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800/80">
            <span className="text-xs font-mono text-emerald-400 block mb-2">Pillar III</span>
            <h4 className="text-lg font-bold text-white mb-2">Enterprise Client Advisory</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Beyond software: our senior ad ops architects audit publisher setups, optimize Prebid timeout configurations, and negotiate clean direct exchange paths.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
