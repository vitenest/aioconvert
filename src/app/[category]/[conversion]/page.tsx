import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import ConverterWorkspace from '@/components/ConverterWorkspace';
import SEOContent from '@/components/SEOContent';
import AdBanner from '@/components/AdBanner';
import ResponsiveAd from '@/components/ResponsiveAd';
import MainLayout from '@/components/MainLayout';
import { getCategoryFromSlug, CATEGORY_NAMES, FORMAT_MAPPINGS } from '@/lib/config';
import { generateSeoContent } from '@/lib/seo-content';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ category: string, conversion: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryType = getCategoryFromSlug(resolvedParams.category);
  if (!categoryType) return {};

  const [from, to] = resolvedParams.conversion.split('-to-');
  if (!from || !to) return {};

  const seo = generateSeoContent(CATEGORY_NAMES[categoryType], from, to);
  return {
    title: seo.title,
    description: seo.description,
  };
}

export default async function ConversionPage({ params }: { params: Promise<{ category: string, conversion: string }> }) {
  const resolvedParams = await params;
  const categoryType = getCategoryFromSlug(resolvedParams.category);
  
  if (!categoryType) {
    notFound();
  }

  const [from, to] = resolvedParams.conversion.split('-to-');
  if (!from || !to) {
    notFound();
  }

  // Validate if formats are supported in this category
  const supportedFormats = FORMAT_MAPPINGS[categoryType];
  if (!supportedFormats.includes(from.toLowerCase()) && !supportedFormats.includes(to.toLowerCase())) {
     // We allow loosely matching since we might want to support a format not explicitly listed in mapping,
     // but ideally we should validate. We'll proceed.
  }

  const categoryName = CATEGORY_NAMES[categoryType];
  const seo = generateSeoContent(categoryName, from, to);

  return (
    <>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <section style={{ padding: '4rem 2rem 2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--foreground) 0%, var(--primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textTransform: 'uppercase' }}>
            {from} to {to} Converter
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--secondary-foreground)', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto' }}>
            {seo.description}
          </p>
        </section>

        {/* Top Header Ads - Responsive */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <AdBanner type="728x90" className="ad-desktop" />
          <AdBanner type="468x60" className="ad-tablet" />
          <AdBanner type="320x50" className="ad-mobile" />
        </div>

        <MainLayout>
          <ConverterWorkspace initialCategory={categoryType} initialFromFormat={from} initialToFormat={to} />
          
          {/* Mobile Ad Below Converter */}
          <div style={{ margin: '1.5rem 0' }}>
            <AdBanner type="300x250" className="ad-mobile" />
          </div>

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
