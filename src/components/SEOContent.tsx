"use client";

import React from 'react';

type SEOContentProps = {
  about: string;
  features: string[];
  faqs: { q: string, a: string }[];
};

export default function SEOContent({ about, features, faqs }: SEOContentProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "AIOConvert Tool",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "description": about,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <section className="workspace-section-padding" style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--foreground)' }}>About This Tool</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--secondary-foreground)' }}>{about}</p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--foreground)' }}>Key Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {features.map((feature, i) => {
            const parts = feature.split(': ');
            const title = parts[0];
            const desc = parts.slice(1).join(': ');
            
            return (
              <div key={i} style={{ backgroundColor: '#f4f5f7', borderRadius: '1rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1a1a1a' }} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1a1a1a' }}>{title}</h3>
                <p style={{ fontSize: '0.95rem', color: '#333333', lineHeight: 1.5 }}>{desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--foreground)' }}>Frequently Asked Questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {faqs.map((faq, i) => (
            <details key={i} style={{ 
              backgroundColor: 'white', 
              border: '1px solid var(--border)', 
              borderRadius: '0.75rem', 
              padding: '1rem' 
            }}>
              <summary style={{ fontWeight: 600, cursor: 'pointer', outline: 'none', padding: '0.5rem 0' }}>{faq.q}</summary>
              <p style={{ marginTop: '1rem', color: 'var(--secondary-foreground)', lineHeight: 1.6 }}>{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
