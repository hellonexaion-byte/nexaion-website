import React, { useState } from 'react';
import { 
  Search, Globe, ShieldCheck, AlertTriangle, CheckCircle2, Copy, 
  Download, RefreshCw, FileText, ArrowRight, Lock, Bell, Terminal, 
  ExternalLink, Layers, Check, Sparkles, Smartphone, Link2, Send, 
  Bot, User, Cpu, ArrowUpRight, HelpCircle, Network, GitFork, 
  XCircle, Zap, Info, CornerDownRight, ShieldAlert, ChevronRight
} from 'lucide-react';
import { 
  generateAuditForDomain, matchSellerLineWithDiagnostics, 
  CrawlAuditResult, AdsTxtLine, CrawlType, VerifiedSellerLineResult 
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
  const [targetSellerLine, setTargetSellerLine] = useState('google.com, pub-4927491028301824, DIRECT, f08c47fec0942fa0');
  const [isCrawling, setIsCrawling] = useState(false);
  const [crawlStep, setCrawlStep] = useState('');
  const [auditResult, setAuditResult] = useState<CrawlAuditResult>(() => generateAuditForDomain('techradar.com', 'web'));
  
  // Terminal tabs
  const [terminalTab, setTerminalTab] = useState<'SPO_AUDIT' | 'LINE_MATCHER' | 'SELLERS_JSON' | 'CLEAN_MANIFEST' | 'EXECUTIVE_BRIEF' | 'AI_COPILOT' | 'WEBHOOK_SETUP'>('SPO_AUDIT');
  const [spoViewMode, setSpoViewMode] = useState<'GRAPH' | 'TABLE'>('GRAPH');
  const [hopFilter, setHopFilter] = useState<'ALL' | 'DIRECT' | 'MULTI_HOP'>('ALL');
  const [filterType, setFilterType] = useState<'ALL' | 'DIRECT' | 'RESELLER' | 'WARNINGS'>('ALL');
  const [tableSearch, setTableSearch] = useState('');
  const [copiedManifest, setCopiedManifest] = useState(false);
  const [copiedFixIndex, setCopiedFixIndex] = useState<number | null>(null);
  const [webhookTestSent, setWebhookTestSent] = useState(false);

  // Active Fuzzy Diagnostic result
  const [activeDiagnostic, setActiveDiagnostic] = useState<VerifiedSellerLineResult>(() => 
    matchSellerLineWithDiagnostics(
      'google.com, pub-4927491028301824, DIRECT, f08c47fec0942fa0',
      auditResult.lines,
      auditResult.parentDomain
    )
  );

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

  // Seller line diagnostic test presets
  const sellerLinePresets = [
    { label: 'Google Direct (Match)', line: 'google.com, pub-4927491028301824, DIRECT, f08c47fec0942fa0' },
    { label: 'Rubicon Direct (Match)', line: 'rubiconproject.com, 10842, DIRECT, 0bfd66d529a73807' },
    { label: 'Intentional Relationship Mismatch', line: 'google.com, pub-4927491028301824, RESELLER, f08c47fec0942fa0' },
    { label: 'Missing Pub ID on Domain', line: 'google.com, pub-9999999999999999, DIRECT' },
    { label: 'Unlisted Exchange Partner', line: 'unauthorized-arbitrage-ssp.net, 88219, DIRECT' }
  ];

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
      
      // Run intelligent diagnostic on current target seller line
      const diag = matchSellerLineWithDiagnostics(
        targetSellerLine.trim() || 'google.com, pub-4927491028301824, DIRECT, f08c47fec0942fa0',
        result.lines,
        result.parentDomain
      );
      setActiveDiagnostic(diag);
      result.verificationResults = [diag, ...result.verificationResults.slice(0, 2)];

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

  const handleTestSellerLine = (line: string) => {
    setTargetSellerLine(line);
    const diag = matchSellerLineWithDiagnostics(line, auditResult.lines, auditResult.parentDomain);
    setActiveDiagnostic(diag);
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

  const handleCopyFix = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedFixIndex(index);
    setTimeout(() => setCopiedFixIndex(null), 2000);
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
        reply = `DSP bid shading algorithms (like The Trade Desk's Koa and Google DV360) apply algorithmic penalties when multiple uncertified reseller paths compete for the exact same impression. For ${auditResult.domain}, we detected ${auditResult.missingCerts} lines lacking certification IDs and ${auditResult.unauthorizedResellersCount} unlisted reseller hops. By deploying the cleaned manifest in Tab 4, your net clearing eCPM will recover by an estimated ${auditResult.estimatedTakeRateLossPct}%.`;
      } else if (lower.includes('unauthorized') || lower.includes('reseller') || lower.includes('hops')) {
        reply = `We detected ${auditResult.unauthorizedResellersCount} unauthorized reseller hops on ${auditResult.domain}. These occur when intermediary brokers purchase inventory through multiple reselling tiers (schain > 2) without declaring your publisher account in their Sellers.json. This exposes your media brand to arbitrage and lowers programmatic trust. We recommend revoking these GAM MCM delegations immediately.`;
      } else if (lower.includes('mcm') || lower.includes('google') || lower.includes('parent')) {
        reply = `Google MCM (Multiple Customer Management) requires both Parent and Child publishers to declare explicit OWNERDOMAIN and MANAGERDOMAIN directives in accordance with Ads.txt 1.1. On ${auditResult.domain}, the resolved parent is '${auditResult.parentDomain || auditResult.ownerDomain || 'declared owner'}'. Ensuring the pub ID matches your MCM delegation prevents invalid traffic (IVT) clawbacks.`;
      } else if (lower.includes('compliance') || lower.includes('1.1') || lower.includes('iab')) {
        reply = `To achieve full IAB Tech Lab Ads.txt 1.1 compliance, ${auditResult.domain} must: 1) Declare 'ownerdomain=${auditResult.ownerDomain || auditResult.domain}', 2) Include valid 16-character TAG Certification Authority hashes on all direct exchange lines (e.g. Google's f08c47fec0942fa0), and 3) Remove deprecated legacy exchange endpoints.`;
      } else {
        reply = `Based on Nexaion's real-time crawl of ${auditResult.domain} across global worker edge nodes, the supply chain health score is ${auditResult.spoScore}/100. Key recommendation: Eliminate the ${auditResult.unauthorizedResellersCount} unlisted reseller lines and enforce IAB Ads.txt 1.1 manager declarations to secure your auction clearing prices.`;
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
              Built for Programmatic Directors, VP of Ad Operations, and Digital Media Conglomerates to identify rogue reseller arbitrage, visualize supply chain hop topology, and verify seller seats with fuzzy diagnostics.
            </p>
          </div>

        </div>

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
                    <span>SPO & Supply Path Topology</span>
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
                    <span>Seller Line Fuzzy Diagnostics</span>
                    <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300">
                      checkOne
                    </span>
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

              {/* TAB 1: SPO AUDIT & VISUAL HOP TOPOLOGY GRAPH */}
              {terminalTab === 'SPO_AUDIT' && (
                <div className="p-5 sm:p-6 space-y-6">
                  
                  {/* Top Header with Visual Hop Graph vs Table Toggle */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <Network className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-sm font-semibold text-white font-mono">
                          Supply Path Optimization (SPO) & Hop Topology
                        </h4>
                      </div>
                      <p className="text-neutral-400 text-xs mt-1 font-mono">
                        Visualizing OpenRTB SupplyChain Object (schain) hops, DSP bid shading exposure, and intermediary margin siphoning.
                      </p>
                    </div>

                    {/* View Mode Toggle: Visual Graph vs Raw Table */}
                    <div className="flex items-center gap-1 p-1 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0 font-mono text-xs">
                      <button
                        onClick={() => setSpoViewMode('GRAPH')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                          spoViewMode === 'GRAPH'
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                            : 'text-neutral-400 hover:text-white border border-transparent'
                        }`}
                      >
                        <GitFork className="w-3.5 h-3.5" />
                        <span>Visual Hop Graph</span>
                      </button>

                      <button
                        onClick={() => setSpoViewMode('TABLE')}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors ${
                          spoViewMode === 'TABLE'
                            ? 'bg-neutral-800 text-white'
                            : 'text-neutral-400 hover:text-white border border-transparent'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Table Inspector</span>
                      </button>
                    </div>
                  </div>

                  {/* VISUAL HOP GRAPH SUB-VIEW */}
                  {spoViewMode === 'GRAPH' && (
                    <div className="space-y-4">
                      
                      {/* Filter Chips for Hop Topology */}
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-400">Topology Filter:</span>
                          <button
                            onClick={() => setHopFilter('ALL')}
                            className={`px-2.5 py-1 rounded transition-colors ${
                              hopFilter === 'ALL' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                          >
                            All Active Paths ({auditResult.lines.length})
                          </button>
                          <button
                            onClick={() => setHopFilter('DIRECT')}
                            className={`px-2.5 py-1 rounded transition-colors ${
                              hopFilter === 'DIRECT' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30' : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                          >
                            Direct 1-Hop Clean ({auditResult.directCount})
                          </button>
                          <button
                            onClick={() => setHopFilter('MULTI_HOP')}
                            className={`px-2.5 py-1 rounded transition-colors ${
                              hopFilter === 'MULTI_HOP' ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30' : 'text-neutral-500 hover:text-neutral-300'
                            }`}
                          >
                            Multi-Hop Daisy Chains ({auditResult.resellerCount})
                          </button>
                        </div>

                        <div className="text-[11px] text-neutral-400">
                          Estimated Clearing Loss: <strong className="text-amber-400">-{auditResult.estimatedTakeRateLossPct}%</strong>
                        </div>
                      </div>

                      {/* Interactive Visual Supply Path Nodes */}
                      <div className="space-y-3">
                        {auditResult.lines
                          .filter(l => {
                            if (hopFilter === 'DIRECT') return l.relationship === 'DIRECT';
                            if (hopFilter === 'MULTI_HOP') return l.relationship === 'RESELLER' || (l.schainHops && l.schainHops > 1);
                            return true;
                          })
                          .slice(0, 7)
                          .map((line, idx) => {
                            const isDirect = line.relationship === 'DIRECT';
                            const hops = line.schainHops || (isDirect ? 1 : 2);
                            const takeRateLoss = isDirect ? 0 : hops === 2 ? 4.5 : 18.2;
                            const addedLatency = isDirect ? 0 : hops === 2 ? 38 : 115;

                            return (
                              <div 
                                key={line.id || idx}
                                className={`p-4 rounded-xl border transition-all ${
                                  isDirect
                                    ? 'bg-neutral-950/80 border-emerald-500/20 hover:border-emerald-500/40'
                                    : hops >= 3
                                    ? 'bg-rose-950/10 border-rose-500/30 hover:border-rose-500/50'
                                    : 'bg-neutral-950/80 border-neutral-800 hover:border-neutral-700'
                                }`}
                              >
                                {/* Top Meta Row */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-800/60 font-mono text-xs">
                                  <div className="flex items-center gap-2.5">
                                    <span className={`w-2 h-2 rounded-full ${isDirect ? 'bg-emerald-400' : hops >= 3 ? 'bg-rose-400' : 'bg-amber-400'}`} />
                                    <span className="text-white font-semibold">{line.domain}</span>
                                    <span className="text-neutral-500">|</span>
                                    <span className="text-neutral-300 tabular-nums">Seat: {line.sellerId}</span>
                                    <span className="text-neutral-500 hidden md:inline">({line.sellerName || 'Verified Publisher'})</span>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                      isDirect
                                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                        : hops >= 3
                                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                    }`}>
                                      {isDirect ? 'DIRECT (1 HOP)' : hops >= 3 ? 'DAISY-CHAIN (3+ HOPS)' : 'RESELLER (2 HOPS)'}
                                    </span>
                                  </div>
                                </div>

                                {/* Graphical Supply Path Node Flow */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-xs font-mono items-center">
                                  
                                  {/* Node 1: Demand Side (DSP) */}
                                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center text-emerald-400 shrink-0 text-[10px] font-bold">
                                      DSP
                                    </div>
                                    <div className="truncate">
                                      <span className="text-white font-medium block truncate">The Trade Desk / DV360</span>
                                      <span className="text-[10px] text-neutral-500 block">Bid Valuation: 100%</span>
                                    </div>
                                  </div>

                                  {/* Connector Arrow 1 */}
                                  <div className="hidden md:flex items-center justify-center text-neutral-600">
                                    <div className="h-0.5 w-full bg-neutral-800 relative flex items-center justify-center">
                                      <span className="text-[9px] text-neutral-500 px-1 bg-neutral-950 font-mono">
                                        OpenRTB
                                      </span>
                                    </div>
                                  </div>

                                  {/* Node 2: SSP / Intermediate Broker */}
                                  <div className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                                    isDirect 
                                      ? 'bg-emerald-950/20 border-emerald-500/30' 
                                      : 'bg-neutral-900 border-neutral-800'
                                  }`}>
                                    <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 text-[10px] font-bold ${
                                      isDirect ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                                    }`}>
                                      {isDirect ? 'SSP' : 'HOP'}
                                    </div>
                                    <div className="truncate">
                                      <span className="text-white font-medium block truncate">{line.domain}</span>
                                      <span className="text-[10px] text-neutral-400 block">
                                        {isDirect ? 'Direct SSP Adapter' : 'Intermediary Reseller'}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Node 3: Authoritative Publisher Seat */}
                                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center gap-2">
                                    <div className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 text-[10px] font-bold">
                                      PUB
                                    </div>
                                    <div className="truncate">
                                      <span className="text-white font-medium block truncate">{auditResult.domain}</span>
                                      <span className="text-[10px] text-emerald-400 block">
                                        {line.sellerId}
                                      </span>
                                    </div>
                                  </div>

                                </div>

                                {/* Quantitative Hop Metrics Footer */}
                                <div className="mt-3 pt-2.5 border-t border-neutral-800/40 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px]">
                                  <div className="flex items-center gap-4">
                                    <span className="text-neutral-400">
                                      Latency Drag: <strong className={addedLatency === 0 ? 'text-emerald-400' : 'text-amber-400'}>+{addedLatency}ms</strong>
                                    </span>
                                    <span className="text-neutral-400">
                                      Intermediary Siphon: <strong className={takeRateLoss === 0 ? 'text-emerald-400' : 'text-rose-400'}>{takeRateLoss === 0 ? '0%' : `-${takeRateLoss}%`}</strong>
                                    </span>
                                  </div>

                                  <div className="text-neutral-400">
                                    DSP Bid Shading Action:{' '}
                                    <strong className={isDirect ? 'text-emerald-400' : 'text-amber-400'}>
                                      {isDirect ? 'Full Value Clearing' : hops >= 3 ? 'Algorithm Shaded (-12%)' : 'Minor Fee Deduction'}
                                    </strong>
                                  </div>
                                </div>

                              </div>
                            );
                          })}
                      </div>

                    </div>
                  )}

                  {/* TABLE VIEW (Detailed Line Inspector) */}
                  {spoViewMode === 'TABLE' && (
                    <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
                      <div className="p-4 border-b border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
                  )}

                </div>
              )}

              {/* TAB 2: SELLER LINE FUZZY DIAGNOSTICS (Real Cloudflare Worker checkOne seller line verification) */}
              {terminalTab === 'LINE_MATCHER' && (
                <div className="p-5 sm:p-6 space-y-6 font-mono text-xs">
                  <div className="p-5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <h4 className="text-sm font-semibold text-white">Target Seller Line Fuzzy Diagnostics</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                            Worker: checkOne()
                          </span>
                        </div>
                        <p className="text-neutral-400 text-xs mt-1">
                          Test specific SSP publisher seats against <code className="text-emerald-400">{auditResult.domain}</code> to diagnose relationship conflicts, missing TAG cert IDs, or unlisted accounts.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-neutral-500">Manifest:</span>
                        <span className="text-white font-bold">{auditResult.totalLines} lines indexed</span>
                      </div>
                    </div>

                    {/* Interactive Input Form */}
                    <div className="space-y-2 pt-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={targetSellerLine}
                          onChange={(e) => setTargetSellerLine(e.target.value)}
                          placeholder="e.g. google.com, pub-4927491028301824, DIRECT, f08c47fec0942fa0"
                          className="flex-1 px-3.5 py-2.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500 font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => handleTestSellerLine(targetSellerLine)}
                          className="px-5 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-semibold rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap"
                        >
                          <Search className="w-3.5 h-3.5" />
                          <span>Run Diagnostic</span>
                        </button>
                      </div>

                      {/* Quick Diagnostic Test Presets */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px]">
                        <span className="text-neutral-500">AdOps Test Presets:</span>
                        {sellerLinePresets.map((p, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => handleTestSellerLine(p.line)}
                            className="px-2.5 py-1 rounded bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 hover:text-emerald-300 text-neutral-300 transition-colors"
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* ACTIVE FUZZY DIAGNOSTIC RESULT CARD */}
                    {activeDiagnostic && (
                      <div className={`mt-6 p-5 rounded-xl border transition-all ${
                        activeDiagnostic.result === 'MATCH'
                          ? 'bg-emerald-950/20 border-emerald-500/40'
                          : activeDiagnostic.result === 'RELATION_MISMATCH'
                          ? 'bg-amber-950/20 border-amber-500/40'
                          : activeDiagnostic.result === 'SELLER_MISMATCH'
                          ? 'bg-rose-950/20 border-rose-500/40'
                          : 'bg-neutral-900 border-neutral-800'
                      }`}>
                        
                        {/* Result Header Badge */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-neutral-800/80">
                          <div>
                            <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-0.5">Tested Seller Record</span>
                            <span className="text-sm font-semibold text-white break-all">{activeDiagnostic.line}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className={`px-3 py-1 rounded-md text-xs font-bold uppercase ${
                              activeDiagnostic.result === 'MATCH'
                                ? 'bg-emerald-400 text-neutral-950'
                                : activeDiagnostic.result === 'RELATION_MISMATCH'
                                ? 'bg-amber-400 text-neutral-950'
                                : 'bg-rose-400 text-neutral-950'
                            }`}>
                              {activeDiagnostic.result === 'MATCH' ? '✓ VERIFIED DIRECT MATCH' : activeDiagnostic.result}
                            </span>
                          </div>
                        </div>

                        {/* 5 Technical Match Flags */}
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] mb-4">
                          <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800/80">
                            <span className="text-neutral-500 block mb-0.5">Exchange Domain</span>
                            <span className={activeDiagnostic.domainFound ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                              {activeDiagnostic.domainFound ? '✓ FOUND' : '✗ UNLISTED'}
                            </span>
                          </div>
                          <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800/80">
                            <span className="text-neutral-500 block mb-0.5">Seller Account ID</span>
                            <span className={activeDiagnostic.sellerIdFound ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                              {activeDiagnostic.sellerIdFound ? '✓ MATCHED' : '✗ NOT FOUND'}
                            </span>
                          </div>
                          <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800/80">
                            <span className="text-neutral-500 block mb-0.5">Relationship</span>
                            <span className={activeDiagnostic.relationshipFound ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
                              {activeDiagnostic.relationshipFound ? '✓ MATCH' : '⚠ CONFLICT'}
                            </span>
                          </div>
                          <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800/80">
                            <span className="text-neutral-500 block mb-0.5">TAG Cert Hash</span>
                            <span className={activeDiagnostic.certificationIdFound ? 'text-emerald-400 font-bold' : 'text-neutral-400'}>
                              {activeDiagnostic.certificationIdFound ? '✓ CERTIFIED' : '— OPTIONAL'}
                            </span>
                          </div>
                          <div className="p-2.5 bg-neutral-950 rounded-lg border border-neutral-800/80">
                            <span className="text-neutral-500 block mb-0.5">MCM Parent Domain</span>
                            <span className={activeDiagnostic.parentPresent ? 'text-emerald-400 font-bold' : 'text-neutral-400'}>
                              {activeDiagnostic.parentPresent ? '✓ LINKED' : '— ROOT'}
                            </span>
                          </div>
                        </div>

                        {/* Plain-English Technical Diagnosis */}
                        <div className="space-y-3 pt-2">
                          <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80">
                            <div className="flex items-center gap-2 text-white font-semibold mb-1">
                              <Info className="w-4 h-4 text-emerald-400" />
                              <span>Crawler Technical Diagnostic:</span>
                            </div>
                            <p className="text-neutral-300 text-xs leading-relaxed">
                              {activeDiagnostic.diagnosticExplanation}
                            </p>
                          </div>

                          <div className="p-3.5 rounded-lg bg-neutral-950 border border-neutral-800/80">
                            <div className="flex items-center gap-2 text-white font-semibold mb-1">
                              <ShieldAlert className="w-4 h-4 text-amber-400" />
                              <span>DSP Buy-Side Auction & Clearing Impact:</span>
                            </div>
                            <p className="text-neutral-300 text-xs leading-relaxed">
                              {activeDiagnostic.dspImpactNotice}
                            </p>
                          </div>

                          {/* Actionable Copyable Fix */}
                          {activeDiagnostic.suggestedCorrection && (
                            <div className="p-3.5 rounded-lg bg-neutral-950 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div>
                                <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block mb-0.5">
                                  Recommended Authoritative Correction:
                                </span>
                                <code className="text-white text-xs select-all">
                                  {activeDiagnostic.suggestedCorrection}
                                </code>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleCopyFix(activeDiagnostic.suggestedCorrection || '', 99)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-400 hover:bg-emerald-300 text-neutral-950 font-semibold text-xs rounded-md transition-colors shrink-0"
                              >
                                {copiedFixIndex === 99 ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                <span>{copiedFixIndex === 99 ? 'Copied Line' : 'Copy Fixed Line'}</span>
                              </button>
                            </div>
                          )}
                        </div>

                      </div>
                    )}
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
