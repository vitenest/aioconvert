"use client";

import React from 'react';
import Link from 'next/link';
import ResponsiveAd from './ResponsiveAd';


export default function Footer() {
  return (
    <footer style={{ padding: '4rem 2rem 2rem', color: 'var(--secondary-foreground)', fontSize: '0.9rem', backgroundColor: '#ffffff', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
      <ResponsiveAd margin="0 auto 3rem" />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', textAlign: 'left', marginBottom: '3rem' }}>
        
        {/* Brand & Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--foreground)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>A</div>
            <span style={{ background: 'linear-gradient(90deg, #2563eb, #9333ea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.03em' }}>AIOConverter</span>
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
              Explore All ViteNest Tools
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, marginLeft: '2px', marginBottom: '2px' }}><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </a>
          </div>
        </div>
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
