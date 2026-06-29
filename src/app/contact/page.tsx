import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Contact Us | AIOConverter',
  description: 'Get in touch with AIOConverter. We are here to help with your file conversion needs.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main style={{ flex: 1, backgroundColor: 'var(--background)' }}>
        <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--foreground)' }}>Contact Us</h1>
          
          <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7, color: 'var(--foreground)' }}>
            <p style={{ fontSize: '1.1rem' }}>
              Have a question, suggestion, or running into an issue? We'd love to hear from you. The AIOConverter team is dedicated to providing the best free conversion experience on the web.
            </p>
            
            <div style={{ backgroundColor: 'rgba(0,0,0,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)', marginTop: '1rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>Email Support</h2>
              <p style={{ marginBottom: '1rem' }}>
                For general inquiries, technical support, business partnerships, or feedback, please email us directly at:
              </p>
              <a href="mailto:hello@vitenest.com" style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--foreground)', textDecoration: 'underline' }}>
                hello@vitenest.com
              </a>
            </div>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>Business Inquiries</h2>
            <p>
              AIOConverter is proudly built and maintained by ViteNest. If you are interested in advertising on our platform, discussing API integrations, or exploring other partnership opportunities, please direct your email to the address above with "Partnership" in the subject line.
            </p>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>Response Time</h2>
            <p>
              We aim to respond to all inquiries within 24-48 business hours. Thank you for your patience and for using AIOConverter!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
