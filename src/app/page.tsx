import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ConverterWorkspace from '@/components/ConverterWorkspace';
import SEOContent from '@/components/SEOContent';
import AdBanner from '@/components/AdBanner';
import ResponsiveAd from '@/components/ResponsiveAd';
import MainLayout from '@/components/MainLayout';
import { generateSeoContent } from '@/lib/seo-content';
import LiveStats from '@/components/LiveStats';

export default function Home() {
  const seo = generateSeoContent('File Converter');

  return (
    <>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Hero />
        
        {/* Top Header Ads - Responsive */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AdBanner type="728x90" className="ad-desktop" />
          <AdBanner type="468x60" className="ad-tablet" />
          <AdBanner type="300x250" className="ad-mobile" />
        </div>

        <MainLayout>
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
        </MainLayout>
      </main>
    </>
  );
}
