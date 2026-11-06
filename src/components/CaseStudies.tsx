import React from 'react';
import { ArrowUpRight, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

interface CaseStudiesProps {
  onOpenAuditModal: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenAuditModal }) => {
  return (
    <section id="case-studies" className="py-20 lg:py-28 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-medium text-emerald-400 tracking-wider uppercase mb-3">
            Quantified Business Impact
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
            Proven outcomes across digital media conglomerates and ad tech operators.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300">
            Real deployments delivering supply chain integrity, latency reduction, and programmatic yield recovery.
          </p>
        </div>

        {/* 3 Quantified Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Case Study 1 */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-7 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="text-xs font-mono text-emerald-400 mb-2">Publishing Network · 85 Domains</div>
              <h3 className="text-xl font-bold text-white mb-4">
                Apex Media Group
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                Apex consolidated fragmented ads.txt files across 85 vertical content sites, eliminating 1,400+ unauthorized reseller lines and enforcing automated hourly diff monitoring.
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-3 font-mono">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Recovered Arbitrage</span>
                <span className="text-emerald-400 font-bold text-base tabular-nums">+$410,000 / yr</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Ads.txt Integrity</span>
                <span className="text-white font-semibold tabular-nums">99.8%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Crawl Cycle</span>
                <span className="text-neutral-300 tabular-nums">Hourly automated</span>
              </div>
            </div>
          </div>

          {/* Case Study 2 */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-7 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="text-xs font-mono text-emerald-400 mb-2">Programmatic Exchange · SSP</div>
              <h3 className="text-xl font-bold text-white mb-4">
                Verity Programmatic SSP
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                Deployed Nexaion Prebid telemetry and Sellers.json automated reconciliation across 1.4B monthly bid requests to diagnose auction timeout losses and DSP bid shading.
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-3 font-mono">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Prebid Auction Latency</span>
                <span className="text-emerald-400 font-bold text-base tabular-nums">-38ms faster</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Effective eCPM Lift</span>
                <span className="text-white font-semibold tabular-nums">+14.2%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Timeout Loss Drop</span>
                <span className="text-neutral-300 tabular-nums">-74% reduction</span>
              </div>
            </div>
          </div>

          {/* Case Study 3 */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-7 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="text-xs font-mono text-emerald-400 mb-2">Performance Network · Affiliate</div>
              <h3 className="text-xl font-bold text-white mb-4">
                Nexus Performance Growth
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                Integrated Nexaion invalid traffic detection and server-to-server click-to-install latency auditing to eradicate click injection and publisher arbitrage.
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-3 font-mono">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Fraud Click Filtering</span>
                <span className="text-emerald-400 font-bold text-base tabular-nums">99.8% IVT filtered</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Partner Payout Accuracy</span>
                <span className="text-white font-semibold tabular-nums">100% verified</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-400">Audit Time Saved</span>
                <span className="text-neutral-300 tabular-nums">35 hrs / week</span>
              </div>
            </div>
          </div>

        </div>

        {/* Executive Testimonial Spotlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Testimonial 1 */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <blockquote className="text-base text-neutral-300 leading-relaxed mb-6">
              "Before Nexaion, auditing ads.txt and app-ads.txt across our 85 lifestyle domains was a slow, manual headache. Rogue resellers would appear unnoticed for weeks, quietly leeching our programmatic take rates. Nexaion's hourly crawler caught 42 unauthorized insertions within the first month alone."
            </blockquote>
            
            <div className="flex items-center gap-4 pt-4 border-t border-neutral-800">
              <img
                src="/src/assets/images/avatar_director_laura_1793702342627.jpg"
                alt="Laura Chen, Head of Ad Operations at Apex Media Group"
                className="w-12 h-12 rounded-full object-cover border border-neutral-700"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-sm font-semibold text-white">Laura Chen</div>
                <div className="text-xs text-neutral-400">Head of Ad Operations · Apex Media Group</div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <blockquote className="text-base text-neutral-300 leading-relaxed mb-6">
              "The latency attribution in Nexaion gave us immediate visibility into which SSP adapters were choking our header bidding wrapper. Shaving 38ms off auction execution lifted our overall fill rate by 6.2% and added six figures in incremental revenue across Q3."
            </blockquote>
            
            <div className="flex items-center gap-4 pt-4 border-t border-neutral-800">
              <img
                src="/src/assets/images/avatar_vp_marcus_1793702343663.jpg"
                alt="Marcus Vance, VP Programmatic Trading at Verity Global"
                className="w-12 h-12 rounded-full object-cover border border-neutral-700"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-sm font-semibold text-white">Marcus Vance</div>
                <div className="text-xs text-neutral-400">VP Programmatic Trading · Verity Global SSP</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
