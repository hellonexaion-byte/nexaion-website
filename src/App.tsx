import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveCrawler } from './components/InteractiveCrawler';
import { ProductBento } from './components/ProductBento';
import { ConsolePreview } from './components/ConsolePreview';
import { RoiCalculator } from './components/RoiCalculator';
import { CaseStudies } from './components/CaseStudies';
import { AboutSection } from './components/AboutSection';
import { Pricing } from './components/Pricing';
import { Footer } from './components/Footer';
import { AuditModal } from './components/AuditModal';

export default function App() {
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [targetDomain, setTargetDomain] = useState('techradar.com');

  const handleOpenAuditModal = (domain?: string) => {
    if (domain) {
      setTargetDomain(domain);
    }
    setIsAuditModalOpen(true);
  };

  const handleScrollToCrawler = () => {
    const crawlerEl = document.getElementById('crawler');
    if (crawlerEl) {
      crawlerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      
      {/* Top Bar Contract Navigation */}
      <Navbar onOpenAuditModal={() => handleOpenAuditModal()} />

      <main className="flex-1">
        {/* Executive Hero */}
        <Hero 
          onScrollToCrawler={handleScrollToCrawler}
          onOpenAuditModal={() => handleOpenAuditModal()}
        />

        {/* Live Working Ads.txt Crawler Tool */}
        <InteractiveCrawler />

        {/* 4 Pillars Product Architecture Bento */}
        <ProductBento onOpenAuditModal={() => handleOpenAuditModal()} />

        {/* Interactive SaaS Intelligence Console Demo */}
        <ConsolePreview />

        {/* ROI & Revenue Leakage Calculator */}
        <RoiCalculator onOpenAuditModal={() => handleOpenAuditModal()} />

        {/* Quantified Case Studies & Testimonials */}
        <CaseStudies onOpenAuditModal={() => handleOpenAuditModal()} />

        {/* In-Depth About Nexaion Section */}
        <AboutSection onOpenAuditModal={() => handleOpenAuditModal()} />

        {/* Transparent Enterprise & SaaS Pricing */}
        <Pricing onOpenAuditModal={() => handleOpenAuditModal()} />
      </main>

      {/* Quiet Footer */}
      <Footer onOpenAuditModal={() => handleOpenAuditModal()} />

      {/* Interactive Consultation & Audit Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        initialDomain={targetDomain}
      />

    </div>
  );
}
