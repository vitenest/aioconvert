import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/lib/blog-data';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }
  return {
    title: `${post.title} | AIOConverter Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main style={{ flex: 1, backgroundColor: 'var(--background)' }}>
        <article style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
          <Link className="back-link" href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--secondary-foreground)', textDecoration: 'none', fontWeight: 500, marginBottom: '2rem', fontSize: '0.95rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Blog
          </Link>
          
          <div style={{ marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--secondary-foreground)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {post.date}
            </span>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, marginTop: '0.5rem', marginBottom: '1.5rem', color: 'var(--foreground)', lineHeight: 1.15 }}>
              {post.title}
            </h1>
          </div>

          <div style={{ width: '100%', height: '400px', position: 'relative', overflow: 'hidden', borderRadius: '24px', marginBottom: '3rem', boxShadow: 'var(--shadow-md)' }}>
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          <div className="blog-content" style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--foreground)' }}>
            {post.content}
          </div>
        </article>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        .blog-content h2 { font-size: 2rem; font-weight: 700; margin-top: 2.5rem; margin-bottom: 1rem; line-height: 1.3; }
        .blog-content h3 { font-size: 1.5rem; font-weight: 600; margin-top: 2rem; margin-bottom: 0.75rem; }
        .blog-content p { margin-bottom: 1.5rem; }
        .blog-content ul { margin-bottom: 1.5rem; padding-left: 1.5rem; }
        .blog-content li { margin-bottom: 0.5rem; }
        .blog-content strong { font-weight: 700; }
        .blog-content em { font-style: italic; }
        .back-link { transition: color 0.2s ease; }
        .back-link:hover { color: var(--foreground) !important; }
      `}} />
      
      <Footer />
    </>
  );
}
