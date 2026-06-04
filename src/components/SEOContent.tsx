"use client";

import React from 'react';

type SEOContentProps = {
  about: string;
  features: string[];
  faqs: { q: string, a: string }[];
};

export default function SEOContent({ about, features, faqs }: SEOContentProps) {
  return (
    <section style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--foreground)' }}>About This Tool</h2>
        <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: 'var(--secondary-foreground)' }}>{about}</p>
      </div>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--foreground)' }}>Key Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {features.map((feature, i) => (
            <div key={i} className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary)', marginBottom: '1rem' }} />
              <p style={{ fontWeight: 500 }}>{feature}</p>
            </div>
          ))}
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
