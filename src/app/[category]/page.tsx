import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ConverterWorkspace from '@/components/ConverterWorkspace';
import SEOContent from '@/components/SEOContent';
import AdBanner from '@/components/AdBanner';
import ResponsiveAd from '@/components/ResponsiveAd';
import MainLayout from '@/components/MainLayout';
import { getCategoryFromSlug, CATEGORY_NAMES } from '@/lib/config';
import { generateSeoContent } from '@/lib/seo-content';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const categoryType = getCategoryFromSlug(resolvedParams.category);
  if (!categoryType) return {};

  const seo = generateSeoContent(CATEGORY_NAMES[categoryType]);
  return {
    title: seo.title,
    description: seo.description,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const categoryType = getCategoryFromSlug(resolvedParams.category);
  
  if (!categoryType) {
    notFound();
  }

  const categoryName = CATEGORY_NAMES[categoryType];
  const seo = generateSeoContent(categoryName);

  return (
    <>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <section style={{ padding: '4rem 2rem 2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, background: 'linear-gradient(135deg, var(--foreground) 0%, var(--primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {categoryName}
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
          <ConverterWorkspace />
          
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
