import React, { useState } from 'react';
import { Activity, ShieldCheck, Zap, AlertTriangle, ArrowUpRight, Filter, Download, CheckCircle2, ChevronRight, BarChart2 } from 'lucide-react';

export const ConsolePreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'SUPPLY' | 'PREBID' | 'FRAUD' | 'FORECAST'>('SUPPLY');
  const [timeframe, setTimeframe] = useState<'24H' | '7D' | '30D'>('7D');
  const [sspFilter, setSspFilter] = useState<'ALL' | 'GOOGLE' | 'MAGNITE' | 'PUBMATIC'>('ALL');

  return (
    <section id="console" className="py-20 lg:py-28 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="text-xs font-medium text-emerald-400 tracking-wider uppercase mb-3">
              Interactive Platform Interface
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
              The programmatic intelligence dashboard.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-300">
              A single operational pane for AdOps teams, programmatic monetization leads, and media networks.
            </p>
          </div>

          {/* Timeframe switch */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0">
            <button
              onClick={() => setTimeframe('24H')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeframe === '24H' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Last 24 Hours
            </button>
            <button
              onClick={() => setTimeframe('7D')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeframe === '7D' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeframe('30D')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeframe === '30D' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              30 Days
            </button>
          </div>
        </div>

        {/* Dashboard Frame */}
        <div className="rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl">
          
          {/* Top Workspace Navigation Tabs */}
          <div className="border-b border-neutral-800 bg-neutral-950/80 px-6 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('SUPPLY')}
                className={`py-4 px-3 text-xs font-medium tracking-wide border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'SUPPLY'
                    ? 'border-emerald-400 text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Supply Path & Ads.txt Live Stream</span>
              </button>

              <button
                onClick={() => setActiveTab('PREBID')}
                className={`py-4 px-3 text-xs font-medium tracking-wide border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'PREBID'
                    ? 'border-emerald-400 text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Prebid.js & Auction Latency</span>
              </button>

              <button
                onClick={() => setActiveTab('FRAUD')}
                className={`py-4 px-3 text-xs font-medium tracking-wide border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'FRAUD'
                    ? 'border-emerald-400 text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Traffic Quality & Spoof Shield</span>
              </button>

              <button
                onClick={() => setActiveTab('FORECAST')}
                className={`py-4 px-3 text-xs font-medium tracking-wide border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                  activeTab === 'FORECAST'
                    ? 'border-emerald-400 text-white'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <BarChart2 className="w-4 h-4 text-emerald-400" />
                <span>AI Floor Price Elasticity</span>
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-xs text-neutral-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Crawl Nodes: 6 Active</span>
            </div>
          </div>

          {/* Active Tab Viewport */}
          <div className="p-6 lg:p-8">
            
            {/* VIEW 1: SUPPLY PATH & ADS.TXT MONITOR */}
            {activeTab === 'SUPPLY' && (
              <div className="space-y-6">
                {/* 4 Metric cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-400 block mb-1">Monitored Publisher Domains</span>
                    <span className="text-2xl font-bold text-white font-mono tabular-nums">
                      {timeframe === '24H' ? '128' : timeframe === '7D' ? '412' : '1,240'}
                    </span>
                    <span className="text-xs text-emerald-400 mt-1 block">100% crawl completion</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-400 block mb-1">Unauthorized Reseller Diffs</span>
                    <span className="text-2xl font-bold text-rose-400 font-mono tabular-nums">
                      {timeframe === '24H' ? '3' : timeframe === '7D' ? '14' : '42'}
                    </span>
                    <span className="text-xs text-neutral-500 mt-1 block">Flagged for immediate takedown</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-400 block mb-1">Direct Supply Integrity</span>
                    <span className="text-2xl font-bold text-white font-mono tabular-nums">98.4%</span>
                    <span className="text-xs text-neutral-500 mt-1 block">Verified against Sellers.json</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-400 block mb-1">Arbitrage Revenue Saved</span>
                    <span className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
                      {timeframe === '24H' ? '$18,400' : timeframe === '7D' ? '$142,800' : '$620,000'}
                    </span>
                    <span className="text-xs text-neutral-500 mt-1 block">Through rogue reseller elimination</span>
                  </div>
                </div>

                {/* Real-time Diff Log Table */}
                <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
                  <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-white font-semibold uppercase tracking-wider">
                      Recent Ads.txt Modification Feed
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">Real-time webhook queue</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-neutral-900/60 text-neutral-400 border-b border-neutral-800 text-[11px] uppercase">
                        <tr>
                          <th className="py-2.5 px-4">Timestamp</th>
                          <th className="py-2.5 px-4">Publisher Domain</th>
                          <th className="py-2.5 px-4">Change Type</th>
                          <th className="py-2.5 px-4">Exchange Record</th>
                          <th className="py-2.5 px-4 text-right">Audit Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                        <tr className="hover:bg-neutral-900/40">
                          <td className="py-3 px-4 text-neutral-500">2 mins ago</td>
                          <td className="py-3 px-4 text-white font-medium">media-group-alpha.com</td>
                          <td className="py-3 px-4 text-rose-400">Unauthorized Reseller Added</td>
                          <td className="py-3 px-4 text-neutral-400">unknown-dsp.com, 99281, RESELLER</td>
                          <td className="py-3 px-4 text-right">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/10 text-rose-400 border border-rose-500/20">
                              Alert Dispatched
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-neutral-900/40">
                          <td className="py-3 px-4 text-neutral-500">14 mins ago</td>
                          <td className="py-3 px-4 text-white font-medium">techwire-daily.net</td>
                          <td className="py-3 px-4 text-emerald-400">Direct Line Verified</td>
                          <td className="py-3 px-4 text-neutral-400">google.com, pub-9182374619, DIRECT</td>
                          <td className="py-3 px-4 text-right">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Validated
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-neutral-900/40">
                          <td className="py-3 px-4 text-neutral-500">38 mins ago</td>
                          <td className="py-3 px-4 text-white font-medium">metro-gazette.com</td>
                          <td className="py-3 px-4 text-amber-400">Missing Cert Hash</td>
                          <td className="py-3 px-4 text-neutral-400">rubiconproject.com, 14201, RESELLER</td>
                          <td className="py-3 px-4 text-right">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              Notice Sent
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 2: PREBID & LATENCY */}
            {activeTab === 'PREBID' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-400 block mb-1">Median Header Bid Latency</span>
                    <span className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">142ms</span>
                    <span className="text-xs text-neutral-500 mt-1 block">Down from 210ms (-32%)</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-400 block mb-1">Prebid Auction Timeout Rate</span>
                    <span className="text-2xl font-bold text-white font-mono tabular-nums">1.8%</span>
                    <span className="text-xs text-neutral-500 mt-1 block">Well under 5% industry threshold</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-400 block mb-1">Effective eCPM Lift</span>
                    <span className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">+14.6%</span>
                    <span className="text-xs text-neutral-500 mt-1 block">Blended programmatic lift</span>
                  </div>
                </div>

                {/* SSP Bidder Breakdown Table */}
                <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
                  <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                    <span className="text-xs font-mono text-white font-semibold uppercase tracking-wider">
                      SSP Performance & Timeout Analytics
                    </span>
                    <span className="text-xs text-neutral-400 font-mono">1.2B Bid Requests Analyzed</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-neutral-900/60 text-neutral-400 border-b border-neutral-800 text-[11px] uppercase">
                        <tr>
                          <th className="py-2.5 px-4">SSP / Exchange</th>
                          <th className="py-2.5 px-4">Bid Response Rate</th>
                          <th className="py-2.5 px-4">Avg Latency</th>
                          <th className="py-2.5 px-4">Timeout %</th>
                          <th className="py-2.5 px-4 text-right">Win Share</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                        <tr className="hover:bg-neutral-900/40">
                          <td className="py-3 px-4 text-white font-medium">Google Ad Manager (Open Bidding)</td>
                          <td className="py-3 px-4 tabular-nums">98.9%</td>
                          <td className="py-3 px-4 text-emerald-400 tabular-nums">94ms</td>
                          <td className="py-3 px-4 text-neutral-400 tabular-nums">0.4%</td>
                          <td className="py-3 px-4 text-right text-emerald-400 font-semibold tabular-nums">41.2%</td>
                        </tr>
                        <tr className="hover:bg-neutral-900/40">
                          <td className="py-3 px-4 text-white font-medium">Magnite (Rubicon)</td>
                          <td className="py-3 px-4 tabular-nums">95.4%</td>
                          <td className="py-3 px-4 text-neutral-300 tabular-nums">138ms</td>
                          <td className="py-3 px-4 text-neutral-400 tabular-nums">1.1%</td>
                          <td className="py-3 px-4 text-right text-white tabular-nums">22.4%</td>
                        </tr>
                        <tr className="hover:bg-neutral-900/40">
                          <td className="py-3 px-4 text-white font-medium">Index Exchange</td>
                          <td className="py-3 px-4 tabular-nums">96.1%</td>
                          <td className="py-3 px-4 text-neutral-300 tabular-nums">126ms</td>
                          <td className="py-3 px-4 text-neutral-400 tabular-nums">0.9%</td>
                          <td className="py-3 px-4 text-right text-white tabular-nums">16.8%</td>
                        </tr>
                        <tr className="hover:bg-neutral-900/40">
                          <td className="py-3 px-4 text-white font-medium">PubMatic</td>
                          <td className="py-3 px-4 tabular-nums">92.8%</td>
                          <td className="py-3 px-4 text-neutral-300 tabular-nums">152ms</td>
                          <td className="py-3 px-4 text-neutral-400 tabular-nums">1.9%</td>
                          <td className="py-3 px-4 text-right text-white tabular-nums">11.6%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 3: TRAFFIC QUALITY & FRAUD SHIELD */}
            {activeTab === 'FRAUD' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-400 block mb-1">Invalid Traffic (IVT) Filter Rate</span>
                    <span className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">99.88%</span>
                    <span className="text-xs text-neutral-500 mt-1 block">Accredited by TAG standards</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-400 block mb-1">Domain Spoofing Interceptions</span>
                    <span className="text-2xl font-bold text-white font-mono tabular-nums">482,109</span>
                    <span className="text-xs text-neutral-500 mt-1 block">Fake domain bid requests blocked</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-400 block mb-1">Chargeback Risk Reduction</span>
                    <span className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">94%</span>
                    <span className="text-xs text-neutral-500 mt-1 block">Zero DSPclawbacks in Q3</span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300 space-y-3">
                  <span className="text-white font-semibold uppercase tracking-wider block">
                    Automated Protection Measures
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Continuous HTTP Host header vs app ID validation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Click flood and fast-click signature rejection</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Data center IP blocklist (AWS/GCP/Azure crawler proxy filters)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Instant API revocation webhooks for affiliate networks</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 4: AI FLOOR PRICE ELASTICITY */}
            {activeTab === 'FORECAST' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-400 block mb-1">Dynamic eCPM Baseline</span>
                    <span className="text-2xl font-bold text-white font-mono tabular-nums">$3.84</span>
                    <span className="text-xs text-emerald-400 mt-1 block">+$0.48 vs Static Hard Floors</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-400 block mb-1">Fill Rate Optimization</span>
                    <span className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">91.2%</span>
                    <span className="text-xs text-neutral-500 mt-1 block">Elastic floor maintains fill volume</span>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <span className="text-xs text-neutral-400 block mb-1">Bid Density Correlation</span>
                    <span className="text-2xl font-bold text-white font-mono tabular-nums">4.8 Bidders</span>
                    <span className="text-xs text-neutral-500 mt-1 block">Per qualified auction opportunity</span>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-white font-semibold uppercase tracking-wider">
                      Algorithmic Floor Price Elasticity Curve
                    </span>
                    <span className="text-xs text-emerald-400 font-mono">Dynamic Yield Peak: $3.92</span>
                  </div>
                  
                  {/* Visual Bar Graph Simulation */}
                  <div className="grid grid-cols-7 gap-2 h-36 items-end pt-4">
                    {[
                      { floor: '$1.50', yieldPct: 45, fill: '98%' },
                      { floor: '$2.00', yieldPct: 62, fill: '96%' },
                      { floor: '$2.50', yieldPct: 78, fill: '94%' },
                      { floor: '$3.00', yieldPct: 91, fill: '92%' },
                      { floor: '$3.50 (AI Optimal)', yieldPct: 98, fill: '89%', optimal: true },
                      { floor: '$4.00', yieldPct: 82, fill: '74%' },
                      { floor: '$4.50', yieldPct: 65, fill: '58%' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                        <span className="text-[10px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.fill} fill
                        </span>
                        <div 
                          className={`w-full rounded-t transition-all ${
                            item.optimal ? 'bg-emerald-400' : 'bg-neutral-800 hover:bg-neutral-700'
                          }`}
                          style={{ height: `${item.yieldPct}%` }}
                        />
                        <span className={`text-[10px] font-mono truncate w-full text-center ${
                          item.optimal ? 'text-emerald-400 font-semibold' : 'text-neutral-500'
                        }`}>
                          {item.floor}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-900 text-xs text-neutral-400 flex items-center justify-between">
                    <span>Nexaion RTB Elasticity Engine models bid density across 24-hour cycles</span>
                    <span className="text-emerald-400 font-mono">Automated GAM API Push Ready</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
