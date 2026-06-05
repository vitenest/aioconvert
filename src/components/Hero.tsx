import React from 'react';
import Link from 'next/link';
import ResponsiveAd from '@/components/ResponsiveAd';

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
      
      <h1 className="hero-title">
        Convert Anything.<br />
        <span style={{ color: 'var(--secondary-foreground)' }}>With Zero Compromises.</span>
      </h1>
      
      <p className="hero-subtitle">
        Seamlessly transform your documents, images, audio, video, and archives into any format. Lightning-fast processing with absolute privacy.
      </p>
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'center' }}>
        <Link href="#convert" className="btn btn-primary" style={{ padding: '0.85rem 2.5rem', fontSize: '1.05rem', textDecoration: 'none' }}>
          Start Converting
        </Link>
      </div>

      <ResponsiveAd margin="2rem 0 1rem" />
      
      <p style={{
        fontSize: '0.8rem',
        color: 'var(--secondary-foreground)',
        marginTop: '0.5rem',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        Your privacy is guaranteed. Files are auto-deleted after 30 minutes.
      </p>

      <ResponsiveAd margin="1rem 0 2rem" />
    </section>
  );
}
