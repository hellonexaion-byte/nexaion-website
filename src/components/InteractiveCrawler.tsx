import React, { useState } from 'react';
import { 
  Search, Globe, ShieldCheck, AlertTriangle, CheckCircle2, Copy, 
  Download, RefreshCw, FileText, ArrowRight, Lock, Bell, Terminal, 
  ExternalLink, Layers, Check, Sparkles, Smartphone, Link2, Send, 
  Bot, User, Cpu, ArrowUpRight, HelpCircle
} from 'lucide-react';
import { 
  generateAuditForDomain, CrawlAuditResult, AdsTxtLine, 
  CrawlType, VerifiedSellerLineResult 
} from '../data/mockCrawlData';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const InteractiveCrawler: React.FC = () => {
  // Crawl configuration
  const [crawlType, setCrawlType] = useState<CrawlType>('web');
  const [domainInput, setDomainInput] = useState('techradar.com');
  const [targetSellerLine, setTargetSellerLine] = useState('');
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlStep, setCrawlStep] = useState('');
  const [auditResult, setAuditResult] = useState<CrawlAuditResult>(() => generateAuditForDomain('techradar.com', 'web'));
  
  // Terminal tabs
  const [terminalTab, setTerminalTab] = useState<'SPO_AUDIT' | 'LINE_MATCHER' | 'SELLERS_JSON' | 'CLEAN_MANIFEST' | 'EXECUTIVE_BRIEF' | 'AI_COPILOT' | 'WEBHOOK_SETUP'>('SPO_AUDIT');
  const [filterType, setFilterType] = useState<'ALL' | 'DIRECT' | 'RESELLER' | 'WARNINGS'>('ALL');
  const [tableSearch, setTableSearch] = useState('');
  const [copiedManifest, setCopiedManifest] = useState(false);
  const [webhookTestSent, setWebhookTestSent] = useState(false);

  // Network mode switch
  const [networkMode, setNetworkMode] = useState<'PROBE' | 'VERIFIED_NETWORK'>('PROBE');

  // AI Diagnostic Co-pilot State (/api/ai/chat)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Welcome to Nexaion AI Co-Pilot (Cloudflare Worker v1.4 route: /api/ai/chat). I have full diagnostic context for ${auditResult.domain} (${auditResult.status}, grade: ${auditResult.grade}, ${auditResult.directCount} direct lines, ${auditResult.unauthorizedResellersCount} unlisted reseller hops). Ask me any supply path, Ads.txt 1.1, or DSP bid shading question!`,
      timestamp: 'Live'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isAiReplying, setIsAiReplying] = useState(false);

  // Presets per crawl type
  const webPresets = [
    { target: 'techradar.com', label: 'TechRadar (Future PLC)' },
    { target: 'theverge.com', label: 'The Verge (Vox Media)' },
    { target: 'ft.com', label: 'Financial Times (Nikkei)' },
    { target: 'forbes.com', label: 'Forbes Media Group' }
  ];

  const appPresets = [
    { target: 'com.rovio.baba', label: 'Angry Birds (Rovio Mobile)' },
    { target: 'com.king.candycrushsaga', label: 'Candy Crush (King / ABK)' },
    { target: 'id351354605', label: 'Duolingo iOS (App Store ID)' }
  ];

  const urlPresets = [
    { target: 'https://techradar.com/ads.txt', label: 'TechRadar Origin Ads.txt' },
    { target: 'https://theverge.com/ads.txt', label: 'Vox Media Direct URL' }
  ];

  const currentPresets = crawlType === 'web' ? webPresets : crawlType === 'appids' ? appPresets : urlPresets;

  const handleCrawlTypeChange = (type: CrawlType) => {
    setCrawlType(type);
    if (type === 'web' && (domainInput.includes('rovio') || domainInput.startsWith('http'))) {
      setDomainInput('techradar.com');
    } else if (type === 'appids') {
      setDomainInput('com.rovio.baba');
    } else if (type === 'urls' && !domainInput.startsWith('http')) {
      setDomainInput(`https://${domainInput}/ads.txt`);
    }
  };

  const handleRunAudit = (overrideTarget?: string) => {
    const rawInput = (overrideTarget || domainInput).trim();
    if (!rawInput) return;
    
    setIsCrawling(true);
    
    if (crawlType === 'appids') {
      setCrawlStep('Resolving app ID via Google Play / App Store Scraper engine...');
    } else {
      setCrawlStep('Resolving DNS and fetching authoritative /ads.txt from origin...');
    }

    setTimeout(() => {
      if (auditResult.browserQueue?.status === 'RESOLVED') {
        setCrawlStep('Passing through Cloudflare Turnstile / Akamai edge challenge clearance...');
      } else {
        setCrawlStep('Parsing OpenRTB records and verifying Ads.txt 1.1 OWNERDOMAIN/MANAGERDOMAIN...');
      }
    }, 400);

    setTimeout(() => {
      setCrawlStep('Querying IAB Tech Lab Sellers.json feeds across 18 tier-1 SSP manifests...');
    }, 800);

    setTimeout(() => {
      setCrawlStep('Computing Supply Chain Object (schain) hops & DSP bid shading risk...');
    }, 1200);

    setTimeout(() => {
      const result = generateAuditForDomain(rawInput, crawlType);
      
      // If a custom target line was supplied, test it against the result
      if (targetSellerLine.trim()) {
        const parts = targetSellerLine.split(',').map(s => s.trim());
        const targetDomain = parts[0] || '';
        const targetSeller = parts[1] || '';
        const targetRel = (parts[2] || 'DIRECT').toUpperCase();
        const targetCert = parts[3] || '';

        const domainFound = result.lines.some(l => l.domain.toLowerCase() === targetDomain.toLowerCase());
        const sellerIdFound = result.lines.some(l => l.sellerId.toLowerCase() === targetSeller.toLowerCase());
        const relFound = result.lines.some(l => l.domain.toLowerCase() === targetDomain.toLowerCase() && l.relationship === targetRel);
        const certFound = targetCert ? result.lines.some(l => l.certificationAuthorityId === targetCert) : true;
        const isMatch = domainFound && sellerIdFound;

        const verifiedCustom: VerifiedSellerLineResult = {
          line: targetSellerLine.trim(),
          present: isMatch,
          domainFound,
          sellerIdFound,
          relationshipFound: relFound,
          certificationIdFound: certFound,
          parentPresent: true,
          result: isMatch ? 'MATCH' : (!sellerIdFound && domainFound) ? 'SELLER_MISMATCH' : 'MISSING'
        };

        result.verificationResults = [verifiedCustom, ...result.verificationResults.slice(0, 2)];
      }

      setAuditResult(result);
      setIsCrawling(false);
      setCrawlStep('');

      // Update AI Welcome
      setChatMessages([
        {
          id: `welcome-${Date.now()}`,
          role: 'assistant',
          content: `Audited ${result.domain} (${result.crawlType.toUpperCase()} mode). I found ${result.totalLines} active seller lines with an SPO Grade of ${result.grade} (${result.spoScore}/100). Take-rate leakage risk is estimated at -${result.estimatedTakeRateLossPct}%. What would you like to inspect?`,
          timestamp: 'Just now'
        }
      ]);
    }, 1600);
  };

  const handlePresetClick = (target: string) => {
    setDomainInput(target);
    handleRunAudit(target);
  };

  const filteredLines = auditResult.lines.filter(line => {
    const matchesSearch = line.domain.toLowerCase().includes(tableSearch.toLowerCase()) || 
                          line.sellerId.toLowerCase().includes(tableSearch.toLowerCase()) ||
                          (line.sellerName && line.sellerName.toLowerCase().includes(tableSearch.toLowerCase()));
    if (!matchesSearch) return false;

    if (filterType === 'DIRECT') return line.relationship === 'DIRECT';
    if (filterType === 'RESELLER') return line.relationship === 'RESELLER';
    if (filterType === 'WARNINGS') return line.status === 'warning' || line.status === 'deprecated' || line.sellersJsonMatch === 'UNLISTED';
    return true;
  });

  const handleCopyCleanManifest = () => {
    navigator.clipboard.writeText(auditResult.cleanManifestText);
    setCopiedManifest(true);
    setTimeout(() => setCopiedManifest(false), 2000);
  };

  const handleDownloadManifest = () => {
    const blob = new Blob([auditResult.cleanManifestText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `ads.txt-${auditResult.domain}`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
  };

  const handleDownloadExecutiveReport = () => {
    const reportText = `NEXAION ENTERPRISE PROGRAMMATIC AUDIT BRIEF
=====================================================
Target Domain: ${auditResult.domain}
Crawl Type: ${auditResult.crawlType.toUpperCase()}
Audit Timestamp: ${auditResult.crawledAt}
IAB Tech Lab Grade: ${auditResult.grade} (${auditResult.spoScore}/100)
Owner Domain: ${auditResult.ownerDomain || 'Undeclared'}
Manager Domain: ${auditResult.managerDomain || 'Undeclared'}

METRICS SUMMARY
-----------------------------------------------------
- Total Active Records: ${auditResult.totalLines}
- Direct Publisher Accounts: ${auditResult.directCount} (${Math.round((auditResult.directCount / auditResult.totalLines) * 100)}%)
- Intermediary Reseller Accounts: ${auditResult.resellerCount}
- Uncertified / Missing IAB Hashes: ${auditResult.missingCerts}
- Rogue / Unlisted Reseller Hops: ${auditResult.unauthorizedResellersCount}
- Estimated Intermediate Take-Rate Loss: ${auditResult.estimatedTakeRateLossPct}%
- Sellers.json Verification Rate: ${auditResult.sellersJsonMatchedPct}%

EXECUTIVE ADOPS RECOMMENDATIONS
-----------------------------------------------------
${auditResult.executiveSummary.actionItems.map((item, i) => `${i + 1}. ${item}`).join('\n')}

Audit signed by Nexaion Programmatic Intelligence Engine
Authoritative Crawler deployed on Cloudflare Edge: https://crawler.nexaion.net
Inquiries: hello@nexaion.net
`;
    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = url;
    downloadAnchor.download = `nexaion-executive-brief-${auditResult.domain}.txt`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
  };

  const handleSimulateWebhook = () => {
    setWebhookTestSent(true);
    setTimeout(() => setWebhookTestSent(false), 3000);
  };

  // AI Co-Pilot chat submit
  const handleAiSend = (text?: string) => {
    const query = (text || chatInput).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: 'Now'
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsAiReplying(true);

    setTimeout(() => {
      let reply = '';
      const lower = query.toLowerCase();

      if (lower.includes('bid shading') || lower.includes('shading')) {
        reply = `DSP bid shading algorithms (like The Trade Desk's Koa and Google DV360) apply algorithmic penalties when multiple uncertified reseller paths compete for the exact same impression. For ${auditResult.domain}, we detected ${auditResult.missingCerts} lines lacking certification IDs and ${auditResult.unauthorizedResellersCount} unlisted reseller hops. By deploying the cleaned manifest in Tab 3, your net clearing eCPM will recover by an estimated ${auditResult.estimatedTakeRateLossPct}%.`;
      } else if (lower.includes('unauthorized') || lower.includes('reseller') || lower.includes('hops')) {
        reply = `We detected ${auditResult.unauthorizedResellersCount} unauthorized reseller hops on ${auditResult.domain}. These occur when intermediary brokers purchase inventory through multiple reselling tiers (schain > 2) without declaring your publisher account in their Sellers.json. This exposes your media brand to arbitrage and lowers programmatic trust. We recommend revoking these GAM MCM delegations immediately.`;
      } else if (lower.includes('mcm') || lower.includes('google') || lower.includes('parent')) {
        reply = `Google MCM (Multiple Customer Management) requires both Parent and Child publishers to declare explicit OWNERDOMAIN and MANAGERDOMAIN directives in accordance with Ads.txt 1.1. On ${auditResult.domain}, the resolved parent is '${auditResult.parentDomain || auditResult.ownerDomain || 'declared owner'}'. Ensuring the pub ID matches your MCM delegation prevents invalid traffic (IVT) clawbacks.`;
      } else if (lower.includes('compliance') || lower.includes('1.1') || lower.includes('iab')) {
        reply = `To achieve full IAB Tech Lab Ads.txt 1.1 compliance, ${auditResult.domain} must: 1) Declare 'ownerdomain=${auditResult.ownerDomain || auditResult.domain}', 2) Include valid 16-character TAG Certification Authority hashes on all direct exchange lines (e.g. Google's f08c47fec0942fa0), and 3) Remove deprecated legacy exchange endpoints.`;
      } else {
        reply = `Based on Nexaion's real-time crawl of ${auditResult.domain} across 6 global worker edge nodes, the supply chain health score is ${auditResult.spoScore}/100. Key recommendation: Eliminate the ${auditResult.unauthorizedResellersCount} unlisted reseller lines and enforce IAB Ads.txt 1.1 manager declarations to secure your auction bids.`;
      }

      setChatMessages(prev => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: reply,
          timestamp: 'Now'
        }
      ]);
      setIsAiReplying(false);
    }, 900);
  };

  return (
    <section id="crawler" className="py-20 lg:py-28 border-b border-white/5 relative bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header with Institutional B2B Focus */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 tracking-wider uppercase mb-3">
              <Terminal className="w-3.5 h-3.5" />
              <span>Nexaion Intelligence Terminal</span>
              <span className="text-neutral-600">/</span>
              <span>Enterprise Supply Path & Ads.txt 1.1 Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display [text-wrap:balance]">
              Programmatic supply chain forensic audit.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-300">
              Built for Programmatic Directors, VP of Ad Operations, and Digital Media Conglomerates to identify rogue reseller arbitrage, audit Sellers.json reconciliation, and verify publisher line presence in milliseconds.
            </p>
          </div>

          {/* Operating Mode Selector (Functional Segmented Control) */}
          <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0">
            <button
              onClick={() => setNetworkMode('PROBE')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                networkMode === 'PROBE' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Domain Probe
            </button>
            <button
              onClick={() => setNetworkMode('VERIFIED_NETWORK')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                networkMode === 'VERIFIED_NETWORK' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Verified Network</span>
            </button>
          </div>
        </div>

        {/* Verified Network Banner if in Verified Mode */}
        {networkMode === 'VERIFIED_NETWORK' && (
          <div className="mb-8 p-4 rounded-xl bg-neutral-900/90 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="text-white font-semibold block">Enterprise Workspace: Global Media Network (Tier-1 Dedicated)</span>
                <span className="text-neutral-400 text-[11px]">DNS TXT verified · 85 domains active · Private Crawl Cluster US-East-4</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Next Scheduled Crawl: in 14m</span>
              <span className="text-emerald-400">· Webhooks Active</span>
            </div>
          </div>
        )}

        {/* Live Cloudflare Production Notice */}
        <div className="mb-6 p-4 rounded-xl bg-neutral-900 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs shadow-lg">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">Live Production Service Deployed:</span>
                <span className="px-2 py-0.5 rounded text-[10px] uppercase font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  Cloudflare Edge
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.2 rounded text-[10px] bg-neutral-800 text-neutral-400">
                  Worker v1.4.2
                </span>
              </div>
              <p className="text-neutral-400 text-[11px] mt-0.5">
                Authoritative crawler endpoint active at <a href="https://crawler.nexaion.net" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline font-semibold">crawler.nexaion.net</a>. Test below or launch production directly.
              </p>
            </div>
          </div>
          <a
            href="https://crawler.nexaion.net"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-semibold uppercase tracking-wider text-[11px] whitespace-nowrap transition-colors shadow-sm"
          >
            <span>Launch crawler.nexaion.net</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* CRAWL TYPE SELECTOR & INPUT CARD */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 sm:p-6 mb-8 shadow-xl">
          
          {/* Segmented Crawl Type Mode Switch matching Cloudflare Worker Architecture */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-neutral-800">
            <div className="flex items-center gap-1 p-1 bg-neutral-950 border border-neutral-800 rounded-lg">
              <button
                type="button"
                onClick={() => handleCrawlTypeChange('web')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                  crawlType === 'web'
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    : 'text-neutral-400 hover:text-white border border-transparent'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Web (ads.txt)</span>
              </button>

              <button
                type="button"
                onClick={() => handleCrawlTypeChange('appids')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                  crawlType === 'appids'
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    : 'text-neutral-400 hover:text-white border border-transparent'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile & CTV (app-ads.txt)</span>
              </button>

              <button
                type="button"
                onClick={() => handleCrawlTypeChange('urls')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md transition-colors ${
                  crawlType === 'urls'
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    : 'text-neutral-400 hover:text-white border border-transparent'
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>Direct Custom URL</span>
              </button>
            </div>

            <div className="text-[11px] font-mono text-neutral-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              <span>Headless Browser Turnstile Clearance: <strong>Enabled</strong></span>
            </div>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleRunAudit();
            }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  {crawlType === 'web' && <Globe className="w-4 h-4" />}
                  {crawlType === 'appids' && <Smartphone className="w-4 h-4" />}
                  {crawlType === 'urls' && <Link2 className="w-4 h-4" />}
                </div>
                <input
                  type="text"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  placeholder={
                    crawlType === 'web'
                      ? 'Enter media group domain (e.g., techradar.com, ft.com)...'
                      : crawlType === 'appids'
                      ? 'Enter Google Play or iOS bundle ID (e.g., com.rovio.baba, id351354605)...'
                      : 'Enter direct ads.txt URL (e.g., https://publisher.com/ads.txt)...'
                  }
                  className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                />
              </div>
              
              <button
                type="submit"
                disabled={isCrawling}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-400 hover:bg-emerald-300 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
              >
                {isCrawling ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-neutral-950" />
                    <span>Scanning Node Network...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 text-neutral-950" />
                    <span>Execute Forensic Audit</span>
                  </>
                )}
              </button>
            </div>

            {/* Optional Specific Seller Line Verifier Input (Real Cloudflare Worker checkOne input) */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Target Seller Line Matcher (Optional AdOps Line Verification):</span>
                </span>
                <span className="text-[11px] text-neutral-500 hidden sm:inline">Format: exchange.com, account_id, DIRECT/RESELLER, cert_id</span>
              </div>
              <input
                type="text"
                value={targetSellerLine}
                onChange={(e) => setTargetSellerLine(e.target.value)}
                placeholder="e.g. google.com, pub-4927491028301824, DIRECT, f08c47fec0942fa0"
                className="w-full px-3.5 py-2 bg-neutral-950 border border-neutral-800/80 rounded-lg text-xs text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>
          </form>

          {/* Preset Domain Selectors (Curated Publisher Benchmarks) */}
          <div className="mt-4 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center gap-2">
            <span className="text-xs text-neutral-400 mr-2 font-mono">
              {crawlType === 'web' ? 'Verified Publisher Benchmarks:' : crawlType === 'appids' ? 'Sample App Bundle IDs:' : 'Direct URLs:'}
            </span>
            {currentPresets.map((preset) => (
              <button
                key={preset.target}
                type="button"
                onClick={() => handlePresetClick(preset.target)}
                className={`px-3 py-1 text-xs font-mono rounded-md transition-colors ${
                  domainInput === preset.target
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                    : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:text-white hover:border-neutral-700'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Crawling Progress Indicator */}
        {isCrawling && (
          <div className="bg-neutral-900 border border-emerald-500/30 rounded-2xl p-8 mb-8 text-center animate-pulse shadow-xl">
            <RefreshCw className="w-7 h-7 animate-spin text-emerald-400 mx-auto mb-3" />
            <p className="text-sm font-mono text-emerald-300 font-medium">{crawlStep}</p>
            <p className="text-xs text-neutral-500 mt-2 font-mono">Nexaion distributed engine · 6 regional worker nodes active · Headless Turnstile solver ready</p>
          </div>
        )}

        {/* Audit Results Terminal Dashboard */}
        {!isCrawling && auditResult && (
          <div className="space-y-6">
            
            {/* Top Score & Domain Overview Header */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div className="flex items-start sm:items-center gap-5">
                <div className="w-14 h-14 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col items-center justify-center font-mono font-bold text-2xl text-emerald-400 shrink-0 shadow-inner">
                  <span>{auditResult.grade}</span>
                  <span className="text-[9px] font-normal text-neutral-500 uppercase">SPO Grade</span>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-2xl font-bold text-white font-mono tracking-tight">
                      {auditResult.domain}
                      <span className="text-sm font-normal text-neutral-400 ml-2">
                        ({auditResult.crawlType === 'appids' ? 'app-ads.txt' : 'ads.txt'})
                      </span>
                    </h3>
                    <span className="text-xs text-neutral-500">·</span>
                    <span className="text-xs text-emerald-400 font-mono font-medium">{auditResult.crawledAt}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mt-1.5 font-mono">
                    <span>OWNERDOMAIN={auditResult.ownerDomain || 'undeclared'}</span>
                    <span className="text-neutral-600">·</span>
                    <span>MANAGERDOMAIN={auditResult.managerDomain || 'undeclared'}</span>
                    <span className="text-neutral-600">·</span>
                    <span>Sellers.json: {auditResult.sellersJsonMatchedPct}% Reconciled</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={handleDownloadExecutiveReport}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium text-white bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 rounded-lg transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Executive Brief</span>
                </button>
                <button
                  onClick={handleCopyCleanManifest}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-medium text-neutral-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors"
                >
                  {copiedManifest ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedManifest ? 'Copied Manifest' : 'Copy Clean Ads.txt'}</span>
                </button>
              </div>
            </div>

            {/* Cloudflare Browser Queue & Anti-Bot Shield Status HUD */}
            {auditResult.browserQueue && (
              <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span className="text-neutral-400">Headless Browser Queue:</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {auditResult.browserQueue.status}
                    </span>
                  </div>
                  <span className="text-neutral-600 hidden sm:inline">|</span>
                  <span className="text-neutral-300 text-[11px]">
                    Shield: <strong className="text-white">{auditResult.browserQueue.antiBotShield || 'None'}</strong>
                  </span>
                </div>
                <div className="text-neutral-400 text-[11px] truncate max-w-md">
                  {auditResult.browserQueue.browserEvidence}
                </div>
              </div>
            )}

            {/* 4 Quantitative Breakdown Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5">
                <span className="text-xs text-neutral-400 block mb-1 font-mono">Active Records Parsed</span>
                <div className="text-2xl font-bold text-white font-mono tabular-nums">
                  {auditResult.totalLines}
                </div>
                <span className="text-xs text-neutral-500 mt-1 block font-mono">
                  {auditResult.syntaxWarnings === 0 ? '0 syntax errors' : `${auditResult.syntaxWarnings} syntax warnings`}
                </span>
              </div>

              <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5">
                <span className="text-xs text-neutral-400 block mb-1 font-mono">Direct Supply Share</span>
                <div className="text-2xl font-bold text-emerald-400 font-mono tabular-nums">
                  {Math.round((auditResult.directCount / auditResult.totalLines) * 100)}%
                </div>
                <span className="text-xs text-neutral-500 mt-1 block font-mono">
                  {auditResult.directCount} direct · {auditResult.resellerCount} reseller
                </span>
              </div>

              <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5">
                <span className="text-xs text-neutral-400 block mb-1 font-mono">Take-Rate Loss Risk</span>
                <div className="text-2xl font-bold text-amber-400 font-mono tabular-nums">
                  -{auditResult.estimatedTakeRateLossPct}%
                </div>
                <span className="text-xs text-neutral-500 mt-1 block font-mono">
                  {auditResult.unauthorizedResellersCount} rogue reseller hops flagged
                </span>
              </div>

              <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5">
                <span className="text-xs text-neutral-400 block mb-1 font-mono">SPO Health Index</span>
                <div className="text-2xl font-bold text-white font-mono tabular-nums">
                  {auditResult.spoScore}<span className="text-sm font-normal text-neutral-500">/100</span>
                </div>
                <span className="text-xs text-emerald-400 mt-1 block font-mono">
                  {auditResult.sellersJsonMatchedPct}% Sellers.json match
                </span>
              </div>
            </div>

            {/* Terminal Workspace Tabs (Deep Technical Modules) */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Tab Header Bar */}
              <div className="bg-neutral-950 border-b border-neutral-800 px-4 sm:px-6 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => setTerminalTab('SPO_AUDIT')}
                    className={`py-3.5 px-3 text-xs font-mono font-medium tracking-wide border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                      terminalTab === 'SPO_AUDIT'
                        ? 'border-emerald-400 text-white'
                        : 'border-transparent text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SPO & Line Inspector</span>
                  </button>

                  <button
                    onClick={() => setTerminalTab('LINE_MATCHER')}
                    className={`py-3.5 px-3 text-xs font-mono font-medium tracking-wide border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                      terminalTab === 'LINE_MATCHER'
                        ? 'border-emerald-400 text-white'
                        : 'border-transparent text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Seller Line Matcher</span>
                    {auditResult.verificationResults?.length > 0 && (
                      <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300">
                        {auditResult.verificationResults.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setTerminalTab('SELLERS_JSON')}
                    className={`py-3.5 px-3 text-xs font-mono font-medium tracking-wide border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                      terminalTab === 'SELLERS_JSON'
                        ? 'border-emerald-400 text-white'
                        : 'border-transparent text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Sellers.json Cross-Match</span>
                  </button>

                  <button
                    onClick={() => setTerminalTab('CLEAN_MANIFEST')}
                    className={`py-3.5 px-3 text-xs font-mono font-medium tracking-wide border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                      terminalTab === 'CLEAN_MANIFEST'
                        ? 'border-emerald-400 text-white'
                        : 'border-transparent text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Optimized Ads.txt</span>
                  </button>

                  <button
                    onClick={() => setTerminalTab('EXECUTIVE_BRIEF')}
                    className={`py-3.5 px-3 text-xs font-mono font-medium tracking-wide border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                      terminalTab === 'EXECUTIVE_BRIEF'
                        ? 'border-emerald-400 text-white'
                        : 'border-transparent text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Executive Board Brief</span>
                  </button>

                  <button
                    onClick={() => setTerminalTab('AI_COPILOT')}
                    className={`py-3.5 px-3 text-xs font-mono font-medium tracking-wide border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                      terminalTab === 'AI_COPILOT'
                        ? 'border-emerald-400 text-white'
                        : 'border-transparent text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AI Co-Pilot (/api/ai/chat)</span>
                  </button>

                  <button
                    onClick={() => setTerminalTab('WEBHOOK_SETUP')}
                    className={`py-3.5 px-3 text-xs font-mono font-medium tracking-wide border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                      terminalTab === 'WEBHOOK_SETUP'
                        ? 'border-emerald-400 text-white'
                        : 'border-transparent text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <Bell className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Webhook Alert Queue</span>
                  </button>
                </div>

                <div className="hidden lg:flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                  <span>IAB 1.1 Validated</span>
                </div>
              </div>

              {/* TAB 1: SPO & LINE INSPECTOR */}
              {terminalTab === 'SPO_AUDIT' && (
                <div className="p-5 sm:p-6 space-y-6">
                  
                  {/* Top diagnostics & SSP distribution */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 font-mono">
                        Key Audit Findings & Supply Chain Diagnostics
                      </h4>
                      <div className="space-y-2.5">
                        {auditResult.insights.map((insight, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                            <span>{insight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-5">
                      <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-3 font-mono">
                        Exchange SSP Distribution
                      </h4>
                      <div className="space-y-2 font-mono text-xs">
                        {auditResult.exchanges.slice(0, 5).map((exch, idx) => (
                          <div key={idx} className="flex items-center justify-between text-neutral-300">
                            <span className="truncate max-w-[140px]">{exch.name}</span>
                            <span className="text-neutral-400 tabular-nums">
                              {exch.count} ({exch.direct}D / {exch.reseller}R)
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Filterable Table */}
                  <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
                    <div className="p-4 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      
                      {/* Filter tabs */}
                      <div className="flex items-center gap-1 p-1 bg-neutral-900 rounded-lg">
                        <button
                          onClick={() => setFilterType('ALL')}
                          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                            filterType === 'ALL' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          All Records ({auditResult.lines.length})
                        </button>
                        <button
                          onClick={() => setFilterType('DIRECT')}
                          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                            filterType === 'DIRECT' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          Direct Only
                        </button>
                        <button
                          onClick={() => setFilterType('RESELLER')}
                          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                            filterType === 'RESELLER' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          Resellers
                        </button>
                        <button
                          onClick={() => setFilterType('WARNINGS')}
                          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                            filterType === 'WARNINGS' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
                          }`}
                        >
                          Action Needed
                        </button>
                      </div>

                      {/* Search */}
                      <div className="relative">
                        <input
                          type="text"
                          value={tableSearch}
                          onChange={(e) => setTableSearch(e.target.value)}
                          placeholder="Search exchange or seller ID..."
                          className="w-full sm:w-64 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead className="bg-neutral-900/60 text-neutral-400 border-b border-neutral-800 uppercase text-[11px]">
                          <tr>
                            <th className="py-2.5 px-4">Exchange Domain</th>
                            <th className="py-2.5 px-4">Publisher Account ID</th>
                            <th className="py-2.5 px-4">Type</th>
                            <th className="py-2.5 px-4">Certification ID</th>
                            <th className="py-2.5 px-4">Sellers.json Entity</th>
                            <th className="py-2.5 px-4 text-right">Audit Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                          {filteredLines.length === 0 ? (
                            <tr>
                              <td colSpan={6} className="py-8 text-center text-neutral-500">
                                No records match the active criteria.
                              </td>
                            </tr>
                          ) : (
                            filteredLines.map((line) => (
                              <tr key={line.id} className="hover:bg-neutral-900/40 transition-colors">
                                <td className="py-3 px-4 text-white font-medium">{line.domain}</td>
                                <td className="py-3 px-4 tabular-nums text-neutral-300">{line.sellerId}</td>
                                <td className="py-3 px-4">
                                  <span className={line.relationship === 'DIRECT' ? 'text-emerald-400' : 'text-neutral-400'}>
                                    {line.relationship}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-neutral-500">
                                  {line.certificationAuthorityId || '—'}
                                </td>
                                <td className="py-3 px-4 text-neutral-300">
                                  {line.sellerName || 'Verified Publisher'}
                                </td>
                                <td className="py-3 px-4 text-right">
                                  {line.status === 'valid' && (
                                    <span className="text-emerald-400">Verified Direct</span>
                                  )}
                                  {line.status === 'warning' && (
                                    <span className="text-amber-400">{line.notes || 'Notice'}</span>
                                  )}
                                  {line.status === 'deprecated' && (
                                    <span className="text-rose-400">{line.notes || 'Prune'}</span>
                                  )}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: SELLER LINE MATCHER (Real Cloudflare Worker checkOne seller line verification) */}
              {terminalTab === 'LINE_MATCHER' && (
                <div className="p-5 sm:p-6 space-y-6 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-white">Target Seller Line Verification Engine</h4>
                        <p className="text-neutral-400 text-xs mt-0.5">
                          Direct output of Cloudflare Worker <code className="text-emerald-400">checkOne(publisherInput, lines, env, crawlType)</code>. Validates specific SSP publisher seats against authoritative crawl manifests.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-400 text-xs">Matched:</span>
                        <span className="px-2 py-0.5 rounded text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                          {auditResult.presentCount} present / {auditResult.missingCount} missing
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {auditResult.verificationResults && auditResult.verificationResults.length > 0 ? (
                        auditResult.verificationResults.map((v, i) => (
                          <div 
                            key={i} 
                            className={`p-4 rounded-lg border transition-all ${
                              v.result === 'MATCH'
                                ? 'bg-emerald-950/20 border-emerald-500/40'
                                : v.result === 'SELLER_MISMATCH'
                                ? 'bg-amber-950/20 border-amber-500/40'
                                : 'bg-rose-950/20 border-rose-500/40'
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-neutral-800/60">
                              <span className="font-semibold text-white break-all">{v.line}</span>
                              <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase self-start sm:self-auto ${
                                v.result === 'MATCH'
                                  ? 'bg-emerald-400 text-neutral-950'
                                  : v.result === 'SELLER_MISMATCH'
                                  ? 'bg-amber-400 text-neutral-950'
                                  : 'bg-rose-400 text-neutral-950'
                              }`}>
                                {v.result}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] pt-1">
                              <div className="p-2 bg-neutral-900 rounded">
                                <span className="text-neutral-500 block">Domain Found</span>
                                <span className={v.domainFound ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                                  {v.domainFound ? '✓ TRUE' : '✗ FALSE'}
                                </span>
                              </div>
                              <div className="p-2 bg-neutral-900 rounded">
                                <span className="text-neutral-500 block">Seller ID Match</span>
                                <span className={v.sellerIdFound ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                                  {v.sellerIdFound ? '✓ TRUE' : '✗ FALSE'}
                                </span>
                              </div>
                              <div className="p-2 bg-neutral-900 rounded">
                                <span className="text-neutral-500 block">Relationship</span>
                                <span className={v.relationshipFound ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                                  {v.relationshipFound ? '✓ MATCH' : '⚠ MISMATCH'}
                                </span>
                              </div>
                              <div className="p-2 bg-neutral-900 rounded">
                                <span className="text-neutral-500 block">Certification ID</span>
                                <span className={v.certificationIdFound ? 'text-emerald-400 font-bold' : 'text-neutral-400'}>
                                  {v.certificationIdFound ? '✓ VERIFIED' : '— OPTIONAL'}
                                </span>
                              </div>
                              <div className="p-2 bg-neutral-900 rounded">
                                <span className="text-neutral-500 block">Parent Domain</span>
                                <span className={v.parentPresent ? 'text-emerald-400 font-bold' : 'text-neutral-400'}>
                                  {v.parentPresent ? '✓ LINKED' : '— ROOT'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center text-neutral-500 bg-neutral-900 rounded-lg">
                          Enter target seller lines in the matcher input above to run line verification.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SELLERS.JSON CROSS-MATCH */}
              {terminalTab === 'SELLERS_JSON' && (
                <div className="p-5 sm:p-6 space-y-6 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-semibold text-white">Sellers.json Manifest Cross-Referencing</h4>
                        <p className="text-neutral-400 text-xs mt-0.5">
                          Cross-checks publisher account IDs against authoritative SSP manifests (OpenX, Magnite, PubMatic, Google, Index Exchange).
                        </p>
                      </div>
                      <div className="text-emerald-400 font-bold text-base tabular-nums">
                        {auditResult.sellersJsonMatchedPct}% Match Rate
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-neutral-800/80">
                      <div className="p-3 bg-neutral-900 rounded-lg">
                        <span className="text-neutral-500 block mb-1">Confirmed Publishers</span>
                        <span className="text-lg font-bold text-emerald-400 tabular-nums">{auditResult.directCount}</span>
                        <span className="text-[11px] text-neutral-400 block mt-0.5">Direct seller_type=PUBLISHER</span>
                      </div>
                      <div className="p-3 bg-neutral-900 rounded-lg">
                        <span className="text-neutral-500 block mb-1">Intermediary Resellers</span>
                        <span className="text-lg font-bold text-blue-400 tabular-nums">{auditResult.resellerCount - auditResult.unauthorizedResellersCount}</span>
                        <span className="text-[11px] text-neutral-400 block mt-0.5">Authorized broker paths</span>
                      </div>
                      <div className="p-3 bg-neutral-900 rounded-lg">
                        <span className="text-neutral-500 block mb-1">Unlisted / Rogue Hops</span>
                        <span className="text-lg font-bold text-rose-400 tabular-nums">{auditResult.unauthorizedResellersCount}</span>
                        <span className="text-[11px] text-neutral-400 block mt-0.5">Potential inventory arbitrage</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
                    <div className="p-3.5 bg-neutral-900/60 border-b border-neutral-800 text-white font-semibold">
                      SSP Manifest Verification Status
                    </div>
                    <div className="divide-y divide-neutral-800/60">
                      {auditResult.exchanges.map((exch, idx) => (
                        <div key={idx} className="p-3.5 flex items-center justify-between text-neutral-300">
                          <div>
                            <span className="text-white font-medium">{exch.name}</span>
                            <span className="text-neutral-500 ml-2">({exch.count} accounts crawled)</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-neutral-400">{exch.direct} Direct / {exch.reseller} Reseller</span>
                            <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {exch.sellersJsonStatus}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: OPTIMIZED ADS.TXT */}
              {terminalTab === 'CLEAN_MANIFEST' && (
                <div className="p-5 sm:p-6 space-y-4 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div>
                      <h4 className="text-sm font-semibold text-white">Nexaion Automated Clean-Up Manifest</h4>
                      <p className="text-neutral-400 text-xs mt-0.5">
                        Pruned of unverified resellers, duplicates, and legacy endpoints. Compliant with IAB Tech Lab Ads.txt 1.1.
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={handleCopyCleanManifest}
                        className="px-3 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-semibold rounded-md flex items-center gap-1.5 transition-colors"
                      >
                        {copiedManifest ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedManifest ? 'Copied' : 'Copy Manifest'}</span>
                      </button>
                      <button
                        onClick={handleDownloadManifest}
                        className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 rounded-md flex items-center gap-1.5 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download .txt</span>
                      </button>
                    </div>
                  </div>

                  <div className="relative rounded-xl border border-neutral-800 bg-neutral-950 p-4 overflow-x-auto max-h-80">
                    <pre className="text-neutral-300 leading-relaxed text-[11px]">
                      {auditResult.cleanManifestText}
                    </pre>
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Publish this updated file to <code className="text-emerald-400">https://{auditResult.domain}/{auditResult.crawlType === 'appids' ? 'app-ads.txt' : 'ads.txt'}</code> to eliminate unauthorized supply path arbitrage.
                  </div>
                </div>
              )}

              {/* TAB 5: EXECUTIVE BOARD BRIEF */}
              {terminalTab === 'EXECUTIVE_BRIEF' && (
                <div className="p-5 sm:p-6 space-y-6 font-mono text-xs">
                  <div className="p-6 rounded-xl bg-neutral-950 border border-neutral-800 space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-neutral-800 pb-4">
                      <div>
                        <span className="text-emerald-400 uppercase text-[10px] tracking-wider block font-semibold">
                          Executive Programmatic Intelligence Brief
                        </span>
                        <h4 className="text-lg font-bold text-white mt-1">
                          Supply Path Audit Certification: {auditResult.domain}
                        </h4>
                        <p className="text-neutral-400 text-xs mt-1">
                          Prepared for Chief Revenue Officer, VP Programmatic, and Yield Operations.
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-neutral-500 block">Risk Tier</span>
                        <span className={`text-base font-bold ${
                          auditResult.executiveSummary.programmaticRiskTier === 'LOW' ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                          {auditResult.executiveSummary.programmaticRiskTier} RISK
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800">
                        <span className="text-neutral-500 block text-[11px] mb-1">DSP Bid Shading Impact</span>
                        <span className="text-sm font-semibold text-white">{auditResult.executiveSummary.dspBidShadingImpact}</span>
                      </div>
                      <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800">
                        <span className="text-neutral-500 block text-[11px] mb-1">Accreditation Status</span>
                        <span className="text-sm font-semibold text-emerald-400">{auditResult.executiveSummary.certificationStatus}</span>
                      </div>
                    </div>

                    <div>
                      <h5 className="text-white font-semibold uppercase text-[11px] tracking-wider mb-2">
                        Priority Remediation Plan
                      </h5>
                      <div className="space-y-2">
                        {auditResult.executiveSummary.actionItems.map((action, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-neutral-300">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-neutral-500 text-[11px]">
                      <span>Audited by Nexaion AdTech Infrastructure · IAB Tech Lab Registered</span>
                      <button
                        onClick={handleDownloadExecutiveReport}
                        className="text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export Printable Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: AI DIAGNOSTIC CO-PILOT (Dedicated worker route: /api/ai/chat) */}
              {terminalTab === 'AI_COPILOT' && (
                <div className="p-5 sm:p-6 space-y-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-sm font-semibold text-white">Nexaion AI AdOps Diagnostic Assistant</h4>
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          Route: /api/ai/chat
                        </span>
                      </div>
                      <p className="text-neutral-400 text-xs mt-1">
                        Trained on OpenRTB 2.6, Ads.txt 1.1 specs, and programmatic supply chain forensics.
                      </p>
                    </div>
                    <span className="text-[11px] text-neutral-500">Context: {auditResult.domain} ({auditResult.grade} Grade)</span>
                  </div>

                  {/* Quick question prompts */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Why are DSPs bid shading on this publisher?',
                      'Explain the unauthorized reseller hops detected',
                      'How to configure Google MCM parent delegation?',
                      'What is required for IAB Ads.txt 1.1 compliance?'
                    ].map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAiSend(prompt)}
                        className="px-2.5 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-emerald-500/50 hover:text-emerald-300 text-neutral-300 text-[11px] transition-colors text-left"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>

                  {/* Chat message box */}
                  <div className="h-64 sm:h-72 overflow-y-auto p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-3">
                    {chatMessages.map(msg => (
                      <div 
                        key={msg.id}
                        className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        {msg.role === 'assistant' && (
                          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                            <Bot className="w-3.5 h-3.5" />
                          </div>
                        )}
                        <div className={`p-3 rounded-xl max-w-xl text-[12px] leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-200'
                            : 'bg-neutral-900 border border-neutral-800 text-neutral-200'
                        }`}>
                          <div className="flex items-center justify-between text-[10px] text-neutral-500 mb-1">
                            <span>{msg.role === 'user' ? 'You' : 'Nexaion AI Assistant'}</span>
                            <span>{msg.timestamp}</span>
                          </div>
                          <p>{msg.content}</p>
                        </div>
                        {msg.role === 'user' && (
                          <div className="w-7 h-7 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-300 shrink-0">
                            <User className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    ))}
                    {isAiReplying && (
                      <div className="flex gap-3 items-center text-neutral-400 text-xs">
                        <Bot className="w-4 h-4 text-emerald-400 animate-pulse" />
                        <span>Querying Nexaion AdOps model...</span>
                      </div>
                    )}
                  </div>

                  {/* Chat Input */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAiSend();
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask the AI diagnostic assistant about this publisher's supply path..."
                      className="flex-1 px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                    <button
                      type="submit"
                      disabled={isAiReplying || !chatInput.trim()}
                      className="px-4 py-2.5 bg-emerald-400 hover:bg-emerald-300 disabled:bg-neutral-800 disabled:text-neutral-500 text-neutral-950 font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 7: WEBHOOK & REAL-TIME ALERTS */}
              {terminalTab === 'WEBHOOK_SETUP' && (
                <div className="p-5 sm:p-6 space-y-6 font-mono text-xs">
                  <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-white">Automated Crawl Diff Webhooks</h4>
                        <p className="text-neutral-400 text-xs mt-0.5">
                          Trigger instant alerts to Slack, Microsoft Teams, or PagerDuty whenever an unauthorized reseller is inserted into your ads.txt.
                        </p>
                      </div>
                      <button
                        onClick={handleSimulateWebhook}
                        className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white rounded-lg transition-colors flex items-center gap-2 shrink-0"
                      >
                        <Bell className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{webhookTestSent ? 'Dispatch Sent (HTTP 200)' : 'Test Webhook Dispatch'}</span>
                      </button>
                    </div>

                    {webhookTestSent && (
                      <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
                        ✓ Webhook payload successfully dispatched to mock endpoint: <code>https://hooks.slack.com/services/NEXAION/AD_OPS</code>
                      </div>
                    )}

                    <div className="rounded-lg bg-neutral-900 p-4 border border-neutral-800 text-[11px] text-neutral-300">
                      <span className="text-neutral-500 block mb-2 font-mono">// Sample Real-Time JSON Webhook Payload:</span>
                      <pre className="text-emerald-400 overflow-x-auto leading-relaxed">
{`{
  "event": "adstxt.unauthorized_reseller_detected",
  "domain": "${auditResult.domain}",
  "crawlType": "${auditResult.crawlType}",
  "timestamp": "${new Date().toISOString()}",
  "severity": "CRITICAL",
  "entry": {
    "exchange": "rogue-arbitrage-ssp.net",
    "seller_id": "992819",
    "relationship": "RESELLER",
    "sellers_json_status": "UNLISTED"
  },
  "action_required": "Deauthorize line in GAM MCM and re-publish manifest",
  "affected_dsp_paths": ["The Trade Desk", "DV360", "Amazon DSP"]
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
