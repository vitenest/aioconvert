import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';

export const metadata = {
  title: 'Blog | AIOConverter',
  description: 'Read our latest articles on file conversion, digital privacy, and productivity.',
};

export default function BlogIndexPage() {
  return (
    <>
      <Header />
      <main style={{ flex: 1, backgroundColor: 'var(--background)' }}>
        <div style={{ maxWidth: '1000px', margin: '4rem auto', padding: '0 2rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--foreground)' }}>Blog</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--secondary-foreground)', marginBottom: '3rem' }}>
            Insights, tutorials, and tips on file conversion and digital productivity.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {blogPosts.map((post) => (
              <Link 
                href={`/blog/${post.slug}`} 
                key={post.slug}
                className="glass-panel"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  textDecoration: 'none', 
                  color: 'inherit',
                  overflow: 'hidden',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                }}
              >
                <div style={{ width: '100%', height: '200px', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--secondary-foreground)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {post.date}
                  </span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.3 }}>{post.title}</h2>
                  <p style={{ color: 'var(--secondary-foreground)', fontSize: '0.95rem', lineHeight: 1.6, marginTop: 'auto' }}>
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
