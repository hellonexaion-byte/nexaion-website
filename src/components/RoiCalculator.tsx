import React, { useState } from 'react';
import { Calculator, ArrowRight, DollarSign, TrendingUp, ShieldCheck } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenAuditModal: () => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenAuditModal }) => {
  const [monthlyImpressions, setMonthlyImpressions] = useState(40); // Millions
  const [avgCpm, setAvgCpm] = useState(2.80); // Dollars
  const [leakagePercent, setLeakagePercent] = useState(3.5); // Percentage

  // Computations
  const annualImpressions = monthlyImpressions * 12 * 1_000_000;
  const annualGrossSpend = (annualImpressions / 1000) * avgCpm;
  const annualLostRevenue = annualGrossSpend * (leakagePercent / 100);
  const recoveredYield = annualLostRevenue * 0.82; // 82% recovered through Nexaion SPO & ads.txt cleaning
  const nexaionCostAnnual = 1490 * 12; // Standard media tier
  const roiMultiplier = Math.max(1, Math.round(recoveredYield / nexaionCostAnnual));

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <section className="py-20 lg:py-28 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-medium text-emerald-400 tracking-wider uppercase mb-3">
            Financial Impact Modeling
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
            Quantify your programmatic revenue leakage.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300">
            Unauthorized resellers, domain spoofing, and auction latency quietly erode publisher margins. Model your annual recovered revenue with Nexaion.
          </p>
        </div>

        {/* Calculator Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Slider 1: Monthly Impressions */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-white">
                    Monthly Ad Impressions
                  </label>
                  <span className="text-base font-bold font-mono text-emerald-400 tabular-nums">
                    {monthlyImpressions}M / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={monthlyImpressions}
                  onChange={(e) => setMonthlyImpressions(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer h-2 bg-neutral-950 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-neutral-500 font-mono mt-1">
                  <span>5M</span>
                  <span>100M</span>
                  <span>200M+</span>
                </div>
              </div>

              {/* Slider 2: Average CPM */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-white">
                    Average Programmatic Blended CPM
                  </label>
                  <span className="text-base font-bold font-mono text-emerald-400 tabular-nums">
                    ${avgCpm.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0.50"
                  max="10.00"
                  step="0.10"
                  value={avgCpm}
                  onChange={(e) => setAvgCpm(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer h-2 bg-neutral-950 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-neutral-500 font-mono mt-1">
                  <span>$0.50</span>
                  <span>$5.00</span>
                  <span>$10.00</span>
                </div>
              </div>

              {/* Slider 3: Leakage % */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-white">
                    Estimated Arbitrage & Reseller Leakage
                  </label>
                  <span className="text-base font-bold font-mono text-amber-400 tabular-nums">
                    {leakagePercent.toFixed(1)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1.0"
                  max="8.0"
                  step="0.5"
                  value={leakagePercent}
                  onChange={(e) => setLeakagePercent(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-neutral-950 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-neutral-500 font-mono mt-1">
                  <span>1.0% (Pristine SPO)</span>
                  <span>3.5% (Industry Avg)</span>
                  <span>8.0% (Unchecked)</span>
                </div>
              </div>

            </div>

            {/* Formula footnote */}
            <div className="pt-4 border-t border-neutral-800 text-xs text-neutral-400 leading-relaxed">
              Based on empirical studies of programmatic supply path audits (PwC/ISBA 2024 & Nexaion crawl telemetry). Assumes 82% arbitrage recovery rate through Ads.txt deduplication and direct DSP routing.
            </div>
          </div>

          {/* Output Results Column (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-mono block mb-2">
                Estimated Net Recovered Yield
              </span>
              <div className="text-4xl sm:text-5xl font-bold text-emerald-400 font-mono tabular-nums tracking-tight">
                {formatCurrency(recoveredYield)}
              </div>
              <span className="text-xs text-neutral-400 font-mono block mt-1">
                Annual net publisher upside
              </span>

              <div className="mt-8 space-y-4 pt-6 border-t border-neutral-800">
                <div className="flex justify-between items-center text-sm font-mono">
                  <span className="text-neutral-400">Annual Monitored Gross Spend</span>
                  <span className="text-white font-semibold tabular-nums">{formatCurrency(annualGrossSpend)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-mono">
                  <span className="text-neutral-400">Total Supply Path Leakage</span>
                  <span className="text-rose-400 font-semibold tabular-nums">{formatCurrency(annualLostRevenue)}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-mono">
                  <span className="text-neutral-400">Projected ROI Multiple</span>
                  <span className="text-emerald-400 font-bold tabular-nums">~{roiMultiplier}x Investment</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-neutral-800">
              <button
                onClick={onOpenAuditModal}
                className="w-full py-3.5 px-4 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Request Custom Supply Path Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-neutral-500 text-center mt-2 font-mono">
                Includes full domain crawl + Sellers.json discrepancy report
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
