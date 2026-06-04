import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="animate-fade-in" style={{
      padding: '8rem 2rem 4rem',
      textAlign: 'center',
      maxWidth: '900px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem'
    }}>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.4rem 1rem',
        borderRadius: '999px',
        backgroundColor: 'rgba(0,0,0,0.03)',
        border: '1px solid var(--border)',
        color: 'var(--foreground)',
        fontSize: '0.85rem',
        fontWeight: 600,
        marginBottom: '1rem',
        letterSpacing: '0.01em',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <span style={{ marginRight: '0.5rem' }}>✨</span> The Ultimate Conversion Engine
      </div>
      
      <h1 style={{
        fontSize: '4.5rem',
        fontWeight: 800,
        lineHeight: 1.05,
        letterSpacing: '-0.04em',
        color: 'var(--foreground)',
        textWrap: 'balance'
      }}>
        Convert Anything.<br />
        <span style={{ color: 'var(--secondary-foreground)' }}>With Zero Compromises.</span>
      </h1>
      
      <p style={{
        fontSize: '1.25rem',
        color: 'var(--secondary-foreground)',
        lineHeight: 1.6,
        maxWidth: '640px',
        fontWeight: 400,
        letterSpacing: '-0.01em',
        opacity: 0.8
      }}>
        Seamlessly transform your documents, images, audio, video, and archives into any format. Lightning-fast processing with absolute privacy.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <Link href="#convert" className="btn btn-primary" style={{ padding: '0.85rem 2.5rem', fontSize: '1.05rem', textDecoration: 'none' }}>
          Start Converting
        </Link>
        <Link href="#features" className="btn btn-secondary" style={{ padding: '0.85rem 2.5rem', fontSize: '1.05rem', textDecoration: 'none' }}>
          Explore Formats
        </Link>
      </div>
      
      <p style={{
        fontSize: '0.8rem',
        color: 'var(--secondary-foreground)',
        marginTop: '2.5rem',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        Your privacy is guaranteed. Files are auto-deleted after 30 minutes.
      </p>
    </section>
  );
}
