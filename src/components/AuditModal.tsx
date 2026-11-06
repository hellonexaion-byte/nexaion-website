import React, { useState } from 'react';
import { X, CheckCircle2, RefreshCw, Send, ShieldCheck, Mail, Globe, Building } from 'lucide-react';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDomain?: string;
}

export const AuditModal: React.FC<AuditModalProps> = ({ isOpen, onClose, initialDomain = '' }) => {
  const [domain, setDomain] = useState(initialDomain);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyType, setCompanyType] = useState('Publisher / Media Group');
  const [monthlyVolume, setMonthlyVolume] = useState('10M - 50M');
  const [interest, setInterest] = useState('Ads.txt & App-Ads.txt Crawler');
  const [notes, setNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!domain.trim()) {
      setErrorMessage('Please provide a primary domain for the audit.');
      return;
    }

    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 900);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-lg border border-neutral-800 hover:border-neutral-700 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <h3 className="text-2xl font-bold text-white font-display">
              Audit Scheduled Successfully
            </h3>
            
            <p className="text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
              Our AdOps engineering team will initialize a comprehensive crawl of <span className="font-mono text-emerald-400">{domain}</span> and dispatch your full Supply Path Optimization & Sellers.json reconciliation report to <span className="font-mono text-white">{email}</span> within 4 business hours.
            </p>

            <div className="pt-4 border-t border-neutral-800 text-xs text-neutral-400 font-mono">
              Direct inquiries: <a href="mailto:hello@nexaion.net" className="text-emerald-400 hover:underline">hello@nexaion.net</a>
            </div>

            <div className="pt-2">
              <button
                onClick={handleResetAndClose}
                className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="text-xs font-medium text-emerald-400 tracking-wider uppercase mb-1 font-mono">
                Institutional Access & Network Audit
              </div>
              <h3 className="text-2xl font-bold text-white font-display">
                Request Programmatic Supply Chain Audit
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Institutional forensic analysis of publisher Ads.txt manifests, IAB Sellers.json alignment, Prebid timeout telemetry, and unauthorized reseller take-rates.
              </p>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Primary Domain / Publisher URL *
                  </label>
                  <div className="relative">
                    <Globe className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      placeholder="e.g. publisher.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Marcus Vance"
                    className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Company Type
                  </label>
                  <select
                    value={companyType}
                    onChange={(e) => setCompanyType(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>Publisher / Media Group</option>
                    <option>Ad Network / SSP</option>
                    <option>Demand Side Platform (DSP)</option>
                    <option>Performance & Affiliate Network</option>
                    <option>AdTech Engineering Agency</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Monthly Impressions / Request Volume
                  </label>
                  <select
                    value={monthlyVolume}
                    onChange={(e) => setMonthlyVolume(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>&lt; 10M / month</option>
                    <option>10M - 50M / month</option>
                    <option>50M - 200M / month</option>
                    <option>200M+ / month (Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Primary Area of Focus
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option>Ads.txt & App-Ads.txt Crawler</option>
                    <option>Prebid & Header Bidding Telemetry</option>
                    <option>Traffic Quality & IVT Shield</option>
                    <option>AI Dynamic Floor Engine</option>
                    <option>AdTech Engineering Advisory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                  Specific Challenges or Goals (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Eliminating unauthorized reseller arbitrage, optimizing GAM MCM setup, reducing auction timeout rates..."
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 bg-emerald-400 hover:bg-emerald-300 disabled:bg-neutral-800 text-neutral-950 font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-neutral-950" />
                      <span>Scheduling Audit...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Audit Request</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-[11px] text-neutral-500 text-center font-mono pt-1">
                Zero origin server load · Confidential non-disclosure terms apply · hello@nexaion.net
              </div>

            </form>
          </div>
        )}
      </div>
    </div>
  );
};
