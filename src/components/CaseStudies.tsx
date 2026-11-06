import React from 'react';
import { ShieldCheck, AlertTriangle, Cpu, TrendingUp, CheckCircle2, ArrowUpRight, Zap, RefreshCw } from 'lucide-react';

interface CaseStudiesProps {
  onOpenAuditModal: () => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenAuditModal }) => {
  return (
    <section id="threat-vectors" className="py-20 lg:py-28 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono text-emerald-400 tracking-wider uppercase mb-3 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Supply Chain Vulnerabilities & Threat Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
            The programmatic supply chain risks Nexaion was built to eliminate.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300">
            Publishers and ad tech firms lose an estimated 3% to 8% of programmatic revenue to silent supply path degradation, unauthorized arbitrage, and header bidding latency.
          </p>
        </div>

        {/* 3 Core Threat Vectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Threat Vector 1 */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-7 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-3">
                <span>Vulnerability 01</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  Margin Shading
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Rogue Reseller Arbitrage & Daisy-Chaining
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                When unauthorized intermediaries insert reseller lines into ads.txt files, buy-side DSP algorithms (such as The Trade Desk and DV360) shade bids due to deep schain hops, siphoning 15% to 25% of net yield away from the publisher.
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Industry Exposure:</span>
                <span className="text-amber-400 font-semibold">18% of crawled lines</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">DSP Penalty:</span>
                <span className="text-rose-400 font-semibold">-4% to -12% eCPM shading</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Nexaion Remedy:</span>
                <span className="text-emerald-400 font-semibold">Automated Prune Manifest</span>
              </div>
            </div>
          </div>

          {/* Threat Vector 2 */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-7 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-3">
                <span>Vulnerability 02</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  Inventory Rejection
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Ads.txt 1.1 Drift & Missing MCM Directives
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                Manual updates frequently introduce syntax corruption, missing TAG certification IDs, or fail to declare Google MCM <code className="text-emerald-400">OWNERDOMAIN</code> and <code className="text-emerald-400">MANAGERDOMAIN</code> headers, leading to bid invalidation.
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Syntax Failure Rate:</span>
                <span className="text-rose-400 font-semibold">1 in 4 active publishers</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">MCM Compliance:</span>
                <span className="text-neutral-300 font-semibold">Mandatory GAM Spec</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Nexaion Remedy:</span>
                <span className="text-emerald-400 font-semibold">Hourly Validation Webhooks</span>
              </div>
            </div>
          </div>

          {/* Threat Vector 3 */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-7 flex flex-col justify-between hover:border-neutral-700 transition-colors">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-3">
                <span>Vulnerability 03</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Latency Loss
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Header Bidding Auction Timeout Leaks
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                Over-burdened Prebid.js wrappers and unoptimized SSP adapter chains cause high bid latency. Bids arriving after the client-side auction timeout threshold are discarded, directly depressing auction density and fill rates.
              </p>
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-2.5 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Average Latency Drag:</span>
                <span className="text-amber-400 font-semibold">600ms - 1200ms per auction</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Discarded Bid Loss:</span>
                <span className="text-rose-400 font-semibold">4% - 9% of potential yield</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Nexaion Remedy:</span>
                <span className="text-emerald-400 font-semibold">Prebid Yield Telemetry</span>
              </div>
            </div>
          </div>

        </div>

        {/* Institutional Standards & Specifications Matrix */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                IAB Tech Lab & OpenRTB Protocol Compatibility
              </span>
              <h3 className="text-lg font-bold text-white">
                Engineered for strict programmatic specification adherence.
              </h3>
            </div>
            <button
              onClick={onOpenAuditModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-mono font-semibold text-white rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <span>Audit Your Inventory</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 font-mono text-xs">
            <div>
              <span className="text-neutral-400 block mb-1">IAB Tech Lab Ads.txt 1.1</span>
              <span className="text-white font-semibold block text-sm">Full Spec Compliance</span>
              <span className="text-[11px] text-neutral-500 mt-0.5 block">OwnerDomain & ManagerDomain parsing</span>
            </div>
            <div>
              <span className="text-neutral-400 block mb-1">App-Ads.txt 1.1 (CTV & Mobile)</span>
              <span className="text-emerald-400 font-semibold block text-sm">App Store Resolvers</span>
              <span className="text-[11px] text-neutral-500 mt-0.5 block">Google Play & iOS bundle scrapers</span>
            </div>
            <div>
              <span className="text-neutral-400 block mb-1">IAB Sellers.json 1.0</span>
              <span className="text-white font-semibold block text-sm">Cross-Reconciliation</span>
              <span className="text-[11px] text-neutral-500 mt-0.5 block">Direct publisher vs broker entity verification</span>
            </div>
            <div>
              <span className="text-neutral-400 block mb-1">OpenRTB 2.6 SupplyChain (schain)</span>
              <span className="text-emerald-400 font-semibold block text-sm">Hop Counting Engine</span>
              <span className="text-[11px] text-neutral-500 mt-0.5 block">Auditing complete node paths to DSPs</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
