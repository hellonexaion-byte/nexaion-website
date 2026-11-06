import React, { useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface PricingProps {
  onOpenAuditModal: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenAuditModal }) => {
  const [billingCycle, setBillingCycle] = useState<'MONTHLY' | 'ANNUAL'>('ANNUAL');

  const plans = [
    {
      name: 'Publisher Pro',
      audience: 'For independent publishers & boutique ad networks',
      monthlyPrice: 150,
      annualPrice: 120,
      description: 'Automated ads.txt monitoring and basic supply path auditing for focused portfolios.',
      features: [
        'Up to 15 monitored publisher domains',
        'Daily automated crawl cycles',
        'Unauthorized reseller detection',
        'Basic syntax & format validation',
        'Weekly email digest reports',
        'Standard email support (24h SLA)',
      ],
      popular: false,
      cta: 'Start Pro Trial',
    },
    {
      name: 'Media Group',
      audience: 'For scaling media networks & programmatic agencies',
      monthlyPrice: 490,
      annualPrice: 390,
      description: 'Full-spectrum programmatic telemetry, hourly crawling, and automated API webhooks.',
      features: [
        'Up to 100 monitored domains + App-Ads.txt',
        'Hourly automated crawl & diff alerts',
        'IAB Sellers.json automated reconciliation',
        'Prebid.js auction timeout telemetry',
        'Real-time Slack / Teams & Webhook alerts',
        'Full REST API access (100k calls/mo)',
        'Quarterly programmatic audit review',
      ],
      popular: true,
      cta: 'Request Group Access',
    },
    {
      name: 'Enterprise Network',
      audience: 'For global publishing conglomerates & Tier-1 SSP/DSPs',
      monthlyPrice: 800,
      annualPrice: 640,
      description: 'Custom crawler firehose, bespoke IVT detection, and dedicated AdOps solutions engineer.',
      features: [
        'Unlimited publisher domains & mobile apps',
        'Continuous sub-hourly distributed crawling',
        'Custom Sellers.json & supply-chain reconciler',
        'Dynamic AI floor pricing engine connector',
        'High-volume streaming API firehose',
        'Dedicated AdOps solutions architect',
        '99.99% uptime SLA with custom legal terms',
      ],
      popular: false,
      cta: 'Contact Enterprise Advisory',
    },
  ];

  return (
    <section className="py-20 lg:py-28 border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-medium text-emerald-400 tracking-wider uppercase mb-3">
            Predictable SaaS Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
            Institutional intelligence tailored to your operational scale.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-neutral-300">
            Transparent plans for independent media brands, high-growth networks, and global programmatic infrastructure.
          </p>

          {/* Billing Toggle (Functional Segmented Control) */}
          <div className="mt-8 inline-flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-xl">
            <button
              onClick={() => setBillingCycle('MONTHLY')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                billingCycle === 'MONTHLY'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('ANNUAL')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 ${
                billingCycle === 'ANNUAL'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] text-emerald-400 font-mono font-semibold">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => {
            const price = billingCycle === 'ANNUAL' ? plan.annualPrice : plan.monthlyPrice;
            
            return (
              <div
                key={idx}
                className={`rounded-2xl p-8 flex flex-col justify-between transition-all relative ${
                  plan.popular
                    ? 'bg-gradient-to-b from-neutral-900 to-neutral-950 border-2 border-emerald-500/50 shadow-xl shadow-emerald-500/5'
                    : 'bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {/* Most Popular Tag if applicable */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-400 text-neutral-950 text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full font-mono">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white font-display">{plan.name}</h3>
                  </div>
                  <p className="text-xs text-neutral-400 mb-6 min-h-[32px]">
                    {plan.audience}
                  </p>

                  {/* Price */}
                  <div className="mb-6 pb-6 border-b border-neutral-800">
                    <div className="flex items-baseline gap-1 font-mono">
                      <span className="text-4xl font-bold text-white tabular-nums">${price}</span>
                      <span className="text-neutral-400 text-xs">/ month</span>
                    </div>
                    <span className="text-[11px] text-neutral-500 font-mono mt-1 block">
                      {billingCycle === 'ANNUAL' ? 'Billed annually' : 'Billed month-to-month'}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary CTA button */}
                <button
                  onClick={onOpenAuditModal}
                  className={`w-full py-3 px-4 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-emerald-400 hover:bg-emerald-300 text-neutral-950'
                      : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Enterprise Notice */}
        <div className="mt-12 text-center text-xs text-neutral-500 font-mono">
          Need custom on-premise crawl clusters, dedicated private VPC peering, or SLA terms?{' '}
          <a href="mailto:hello@nexaion.net" className="text-emerald-400 hover:underline">
            Contact hello@nexaion.net
          </a>
        </div>

      </div>
    </section>
  );
};
