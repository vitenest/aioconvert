import React from 'react';
import AdBanner from './AdBanner';
import ResponsiveAd from './ResponsiveAd';
import LiveStats from './LiveStats';
import Footer from './Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Main Workspace Layout with Sidebars */}
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', padding: '0 1rem' }}>
        
        {/* Left Skyscraper */}
        <div className="ad-skyscraper" style={{ width: '160px', flexShrink: 0, marginTop: '2rem' }}>
          <div style={{ position: 'sticky', top: '2rem' }}>
            <AdBanner type="160x600" />
          </div>
        </div>

        {/* Center Column */}
        <div style={{ flex: 1, maxWidth: '1000px', width: '100%' }}>
          {children}
        </div>
        
        {/* Right Skyscraper */}
        <div className="ad-skyscraper-right" style={{ width: '160px', flexShrink: 0, marginTop: '2rem' }}>
          <div style={{ position: 'sticky', top: '2rem' }}>
            <AdBanner type="160x600" />
          </div>
        </div>
        
      </div>
      
      <div style={{ maxWidth: '1200px', margin: '4rem auto 0', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', fontWeight: 600, color: 'var(--foreground)', marginBottom: '2rem' }}>
        <LiveStats />
      </div>
      
      <Footer />
    </>
  );
}
