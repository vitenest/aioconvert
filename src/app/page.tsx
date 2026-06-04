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
        <AdBanner type="desktop" />
        <AdBanner type="mobile" />
        <div style={{ marginTop: '2rem' }}>
          <ConverterWorkspace />
        </div>
        <AdBanner type="native" />
        <SEOContent about={seo.about} features={seo.features} faqs={seo.faqs} />
      </main>
      <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--secondary-foreground)', fontSize: '0.875rem' }}>
        <p>&copy; 2025 AIOConvert.com - A <a href="https://vitenest.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>ViteNest</a> Product &middot; Developed by <a href="https://viterank.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>ViteRank</a></p>
      </footer>
    </>
  );
}
