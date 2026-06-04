"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

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
        width: 'auto',
        minWidth: '700px',
        borderRadius: '9999px', // Pill shape
        gap: '3rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ 
            width: '28px', 
            height: '28px', 
            borderRadius: '50%', 
            background: 'var(--foreground)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            fontSize: '1rem'
          }}>
            A
          </div>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--foreground)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
            AIOConverter
          </Link>
        </div>
        
        <nav style={{ display: 'flex', gap: '2.5rem', position: 'relative', height: '100%', alignItems: 'center' }}>
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
                <div className="animate-slide-down" style={{ 
                  position: 'absolute', 
                  top: 'calc(100% + 1rem)', 
                  left: '50%',
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
              )}
            </div>
          ))}
        </nav>
        
        <div>
          <Link href="/#convert" className="btn btn-primary" style={{ textDecoration: 'none', padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>
            Convert Now
          </Link>
        </div>
      </header>
    </div>
  );
}
