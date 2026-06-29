"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ padding: '4rem 2rem 2rem', color: '#e5e7eb', fontSize: '0.9rem', backgroundColor: '#000000', borderTop: '1px solid #1f2937', marginTop: '4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'left', marginBottom: '3rem' }}>
        
        {/* Brand & Description */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ color: '#ffffff', fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.04em' }}>AIOConverter</span>
          </div>
          <p style={{ color: '#9ca3af', lineHeight: 1.6, fontSize: '0.95rem', maxWidth: '300px' }}>
            The ultimate free online file converter. Seamlessly transform your documents, images, audio, video, and archives into any format with lightning speed and absolute privacy.
          </p>
        </div>

        {/* Tools Menu */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h4 style={{ color: '#ffffff', fontWeight: 600, fontSize: '1.1rem' }}>Conversion Tools</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <Link href="/image-converter" style={{ textDecoration: 'none', color: '#9ca3af', transition: 'color 0.2s ease', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}>Image Converter</Link>
            <Link href="/video-converter" style={{ textDecoration: 'none', color: '#9ca3af', transition: 'color 0.2s ease', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}>Video Converter</Link>
            <Link href="/document-converter" style={{ textDecoration: 'none', color: '#9ca3af', transition: 'color 0.2s ease', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}>Document Converter</Link>
            <Link href="/archive-converter" style={{ textDecoration: 'none', color: '#9ca3af', transition: 'color 0.2s ease', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}>Archive Converter</Link>
          </div>
        </div>

        {/* Company */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h4 style={{ color: '#ffffff', fontWeight: 600, fontSize: '1.1rem' }}>Company</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <Link href="/about" style={{ textDecoration: 'none', color: '#9ca3af', transition: 'color 0.2s ease', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}>About Us</Link>
            <Link href="/blog" style={{ textDecoration: 'none', color: '#9ca3af', transition: 'color 0.2s ease', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}>Blog</Link>
            <Link href="/contact" style={{ textDecoration: 'none', color: '#9ca3af', transition: 'color 0.2s ease', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}>Contact</Link>
            <Link href="/privacy-policy" style={{ textDecoration: 'none', color: '#9ca3af', transition: 'color 0.2s ease', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}>Privacy Policy</Link>
            <Link href="/terms" style={{ textDecoration: 'none', color: '#9ca3af', transition: 'color 0.2s ease', fontWeight: 500 }} onMouseOver={(e) => e.currentTarget.style.color = '#ffffff'} onMouseOut={(e) => e.currentTarget.style.color = '#9ca3af'}>Terms of Service</Link>
          </div>
        </div>

        {/* ViteNest Branding */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h4 style={{ color: '#ffffff', fontWeight: 600, fontSize: '1.1rem' }}>More Free Tools</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <p style={{ color: '#9ca3af', lineHeight: 1.6, fontSize: '0.95rem', maxWidth: '300px' }}>
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
                backgroundColor: 'rgba(255,255,255,0.1)', 
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px', 
                color: '#ffffff', 
                textDecoration: 'none', 
                fontWeight: 600, 
                fontSize: '0.95rem',
                alignSelf: 'flex-start',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
            >
              Explore All ViteNest Tools
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7, marginLeft: '2px', marginBottom: '2px' }}><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', borderTop: '1px solid #1f2937', paddingTop: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
        <p>
          &copy; {new Date().getFullYear()} AIOConvert.com - A <a href="https://vitenest.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#ffffff', fontWeight: 'bold' }}>ViteNest</a> Product
        </p>
        <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
          Developed by <a href="https://viterank.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#ffffff', fontWeight: 'bold' }}>ViteRank</a>
        </p>
      </div>
    </footer>
  );
}
