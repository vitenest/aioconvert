"use client";

import React from 'react';
import Link from 'next/link';
import ResponsiveAd from './ResponsiveAd';
import LiveStats from './LiveStats';

export default function Footer() {
  return (
    <footer style={{ padding: '4rem 2rem 2rem', color: 'var(--secondary-foreground)', fontSize: '0.9rem', backgroundColor: '#ffffff', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
      <ResponsiveAd margin="0 auto 3rem" />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', textAlign: 'left', marginBottom: '3rem' }}>
        
        {/* Brand & Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--foreground)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>A</div>
            <span style={{ color: 'var(--foreground)', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.03em' }}>AIOConvert</span>
          </div>
          <p style={{ color: 'var(--secondary-foreground)', lineHeight: 1.6, fontSize: '0.95rem', maxWidth: '300px' }}>
            The ultimate free online file converter. Seamlessly transform your documents, images, audio, video, and archives into any format with lightning speed and absolute privacy.
          </p>
        </div>

        {/* Tools Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h4 style={{ color: 'var(--foreground)', fontWeight: 600, fontSize: '1.1rem' }}>Conversion Tools</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <Link href="/image-converter" style={{ textDecoration: 'none', color: 'var(--secondary-foreground)', transition: 'color 0.2s ease', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--foreground)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--secondary-foreground)'}>Image Converter</Link>
            <Link href="/video-converter" style={{ textDecoration: 'none', color: 'var(--secondary-foreground)', transition: 'color 0.2s ease', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--foreground)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--secondary-foreground)'}>Video Converter</Link>
            <Link href="/document-converter" style={{ textDecoration: 'none', color: 'var(--secondary-foreground)', transition: 'color 0.2s ease', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--foreground)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--secondary-foreground)'}>Document Converter</Link>
            <Link href="/archive-converter" style={{ textDecoration: 'none', color: 'var(--secondary-foreground)', transition: 'color 0.2s ease', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--foreground)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--secondary-foreground)'}>Archive Converter</Link>
          </div>
        </div>

        {/* ViteNest Branding */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h4 style={{ color: 'var(--foreground)', fontWeight: 600, fontSize: '1.1rem' }}>More Free Tools</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: 'var(--secondary-foreground)', lineHeight: 1.6, fontSize: '0.95rem', maxWidth: '300px' }}>
              AIOConvert is part of the ViteNest ecosystem. Discover more premium free tools designed to boost your productivity.
            </p>
            <a 
              href="https://vitenest.com/products" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem', 
                padding: '0.75rem 1.25rem', 
                backgroundColor: 'rgba(0,0,0,0.03)', 
                border: '1px solid var(--border)',
                borderRadius: '12px', 
                color: 'var(--foreground)', 
                textDecoration: 'none', 
                fontWeight: 600, 
                fontSize: '0.95rem',
                alignSelf: 'flex-start',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.06)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)'}
            >
              <span style={{ fontSize: '1.1rem' }}>✨</span> Explore All ViteNest Tools
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', fontWeight: 600, color: 'var(--foreground)', marginBottom: '2rem' }}>
        <LiveStats />
      </div>
      
      <ResponsiveAd margin="2rem auto" />

      <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid var(--border)', paddingTop: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <p>
          &copy; {new Date().getFullYear()} AIOConvert.com - A <a href="https://vitenest.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'var(--foreground)', fontWeight: 'bold' }}>ViteNest</a> Product
        </p>
        <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
          Developed by <a href="https://viterank.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>ViteRank</a>
        </p>
      </div>
    </footer>
  );
}
