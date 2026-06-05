"use client";

import React, { useState } from 'react';
import Link from 'next/link';

import { Menu, X } from 'lucide-react';

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menus = [
    { name: 'Image', path: '/image-converter', items: ['jpg-to-png', 'png-to-webp', 'heif-to-jpg'] },
    { name: 'Video', path: '/video-converter', items: ['mp4-to-mp3', 'mkv-to-mp4', 'mov-to-mp4'] },
    { name: 'Document', path: '/document-converter', items: ['pdf-to-docx', 'docx-to-pdf'] },
    { name: 'Archive', path: '/archive-converter', items: ['zip-to-rar', 'rar-to-zip'] }
  ];

  return (
    <div style={{ position: 'sticky', top: '1.5rem', zIndex: 100, display: 'flex', justifyContent: 'center', width: '100%' }}>
      <header className="glass-panel" style={{ 
        padding: '0.75rem 1.5rem', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        maxWidth: '1200px',
        borderRadius: '9999px', // Pill shape
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link href="/" style={{ textDecoration: 'none', background: 'linear-gradient(90deg, #020617, #334155)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.04em' }}>
            AIOConverter
          </Link>
        </div>
        
        <nav className="header-nav-desktop" style={{ display: 'none', gap: '1.5rem', position: 'relative', height: '100%', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          {menus.map((menu) => (
            <div 
              key={menu.name}
              onMouseEnter={() => setActiveMenu(menu.name)}
              onMouseLeave={() => setActiveMenu(null)}
              style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%', cursor: 'pointer' }}
            >
              <Link href={menu.path} style={{ textDecoration: 'none', color: activeMenu === menu.name ? 'var(--foreground)' : 'var(--secondary-foreground)', fontWeight: 500, fontSize: '0.95rem', transition: 'color 0.2s ease', letterSpacing: '-0.01em' }}>
                {menu.name}
              </Link>
              
              {activeMenu === menu.name && (
                <div style={{ position: 'absolute', top: '100%', left: '50%', paddingTop: '1rem', zIndex: 10 }}>
                  <div className="animate-slide-down" style={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '1rem',
                    minWidth: '220px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem'
                  }}>
                    <div style={{ padding: '0.5rem 1rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--secondary-foreground)', fontWeight: 600 }}>Popular Conversions</div>
                    {menu.items.map(item => (
                      <Link 
                        key={item} 
                        href={`${menu.path}/${item}`}
                        style={{ 
                          padding: '0.75rem 1rem', 
                          textDecoration: 'none', 
                          color: 'var(--foreground)', 
                          fontSize: '0.9rem',
                          borderRadius: '8px',
                          fontWeight: 500,
                          display: 'block',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--secondary)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                        onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}
                      >
                        {item.split('-').join(' ').toUpperCase()}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '100%' }}>
            <a 
              href="https://vitenest.com/products" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                textDecoration: 'none', 
                color: 'var(--primary)', 
                fontWeight: 600, 
                fontSize: '0.90rem', 
                padding: '0.4rem 0.8rem', 
                borderRadius: '12px', 
                backgroundColor: 'rgba(0,0,0,0.04)', 
                border: '1px solid var(--border)',
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                transition: 'all 0.2s ease' 
              }} 
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.08)'} 
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.04)'}
            >
              More Tools
            </a>
          </div>
        </nav>
        
        <div className="header-nav-desktop">
          <Link href="/#convert" className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
            Convert Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="header-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            color: 'var(--foreground)',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="header-mobile-menu animate-slide-down-mobile" style={{
          position: 'absolute',
          top: 'calc(100% + 1rem)',
          left: '1rem',
          right: '1rem',
          backgroundColor: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-lg)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          maxHeight: '70vh',
          overflowY: 'auto'
        }}>
          {menus.map((menu) => (
            <div key={menu.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link 
                href={menu.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ textDecoration: 'none', color: 'var(--foreground)', fontWeight: 600, fontSize: '1.1rem', padding: '0.5rem 0' }}
              >
                {menu.name}
              </Link>
              <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem', borderLeft: '2px solid var(--border)', gap: '0.25rem' }}>
                {menu.items.map(item => (
                  <Link 
                    key={item} 
                    href={`${menu.path}/${item}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{ textDecoration: 'none', color: 'var(--secondary-foreground)', fontSize: '0.95rem', padding: '0.4rem 0' }}
                  >
                    {item.split('-').join(' ').toUpperCase()}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          
          <a 
            href="https://vitenest.com/products" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ 
              textDecoration: 'none', 
              color: 'var(--primary)', 
              fontWeight: 600, 
              fontSize: '1rem', 
              padding: '0.8rem', 
              backgroundColor: 'rgba(0,0,0,0.04)', 
              border: '1px solid var(--border)',
              borderRadius: '12px', 
              marginTop: '0.5rem', 
              textAlign: 'center', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem' 
            }}
          >
            More Tools
          </a>
          
          <Link 
            href="/#convert" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn btn-primary" 
            style={{ textDecoration: 'none', padding: '0.8rem', fontSize: '1rem', marginTop: '1rem', textAlign: 'center' }}
          >
            Convert Now
          </Link>
        </div>
      )}
    </div>
  );
}
