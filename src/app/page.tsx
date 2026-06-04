import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ConverterWorkspace from '@/components/ConverterWorkspace';
import SEOContent from '@/components/SEOContent';
import AdBanner from '@/components/AdBanner';
import { generateSeoContent } from '@/lib/seo-content';

export default function Home() {
  const seo = generateSeoContent('File Converter');

  return (
    <>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Hero />
        
        {/* Top Header Ads - Responsive */}
        <AdBanner type="728x90" className="ad-desktop" />
        <AdBanner type="468x60" className="ad-tablet" />
        <AdBanner type="320x50" className="ad-mobile" />

        {/* Main Workspace Layout with Sidebars */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', padding: '0 1rem' }}>
          
          {/* Left Skyscraper (Desktop Only) */}
          <div className="ad-skyscraper" style={{ width: '160px', flexShrink: 0, marginTop: '2rem' }}>
            <div style={{ position: 'sticky', top: '2rem' }}>
              <AdBanner type="160x600" />
            </div>
          </div>

          {/* Center Column */}
          <div style={{ flex: 1, maxWidth: '1000px', width: '100%' }}>
            <ConverterWorkspace />
            
            {/* High CTR Native Feed Below Converter */}
            <div style={{ margin: '3rem 0' }}>
              <AdBanner type="native" />
            </div>
            
            <SEOContent about={seo.about} features={seo.features} faqs={seo.faqs} />
            
            {/* Medium Rectangle near bottom content */}
            <div style={{ margin: '3rem 0', display: 'flex', justifyContent: 'center' }}>
              <AdBanner type="300x250" />
            </div>
          </div>

          {/* Right Skyscraper (Wide Desktop Only) */}
          <div className="ad-skyscraper-right" style={{ width: '160px', flexShrink: 0, marginTop: '2rem', display: 'none' }}>
            <div style={{ position: 'sticky', top: '2rem' }}>
              <AdBanner type="160x300" />
            </div>
          </div>
          
        </div>
      </main>
      
      <footer style={{ padding: '3rem 2rem', textAlign: 'center', color: 'var(--secondary-foreground)', fontSize: '0.875rem' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', fontWeight: 600, color: 'var(--foreground)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>🚀</span> 12,847 conversions in the last 30 days
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.2rem' }}>👀</span> 114,293 page opens in the last 30 days
          </span>
        </div>
        
        {/* Footer Ads */}
        <AdBanner type="728x90" className="ad-desktop" />
        <AdBanner type="468x60" className="ad-tablet" />
        <AdBanner type="320x50" className="ad-mobile" />

        <p style={{ marginTop: '2rem' }}>
          &copy; 2025 AIOConvert.com - A <a href="https://vitenest.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>ViteNest</a> Product &middot; Developed by <a href="https://viterank.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>ViteRank</a>
        </p>
      </footer>
    </>
  );
}
