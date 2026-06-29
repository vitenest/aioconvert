import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'About Us | AIOConverter',
  description: 'Learn about AIOConverter and our mission to provide the best free online file conversion tools.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main style={{ flex: 1, backgroundColor: 'var(--background)' }}>
        <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--foreground)' }}>About Us</h1>
          
          <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7, color: 'var(--foreground)' }}>
            <p style={{ fontSize: '1.1rem' }}>
              Welcome to <strong>AIOConverter</strong>, a part of the ViteNest ecosystem. Our mission is simple: to make digital file management as effortless, fast, and secure as possible for everyone.
            </p>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>Our Story</h2>
            <p>
              In a world where digital formats are constantly evolving, compatibility issues shouldn't hold you back. Whether you're a student, professional, or digital creator, dealing with unsupported file types can be a frustrating roadblock. We built AIOConverter to break down these barriers. 
            </p>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>What We Do</h2>
            <p>
              We provide a robust suite of free online conversion tools that handle everything from documents and images to audio and video files. Our advanced multi-threaded processing engine ensures that your conversions are lightning-fast without compromising on quality.
            </p>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>Our Commitment to Privacy</h2>
            <p>
              We know that the files you convert can contain sensitive, personal, or proprietary information. That's why privacy is at the core of AIOConverter. We don't store your files longer than necessary. Every uploaded and converted file is automatically and permanently deleted from our servers within 30 minutes. We do not look at, analyze, or share your data with anyone.
            </p>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>Get in Touch</h2>
            <p>
              We are constantly working to improve AIOConverter. If you have any questions, feedback, or feature requests, we would love to hear from you. 
              <br/><br/>
              Contact us anytime at: <strong><a href="mailto:hello@vitenest.com" style={{ color: 'var(--foreground)' }}>hello@vitenest.com</a></strong>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
