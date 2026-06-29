import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Privacy Policy | AIOConverter',
  description: 'Privacy Policy for AIOConverter. Learn how we handle and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main style={{ flex: 1, backgroundColor: 'var(--background)' }}>
        <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--foreground)' }}>Privacy Policy</h1>
          
          <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7, color: 'var(--foreground)' }}>
            <p><strong>Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong></p>
            
            <p>
              At AIOConverter ("we," "our," or "us"), your privacy is our top priority. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website (the "Site") and use our free file conversion services.
            </p>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>1. File Uploads and Processing</h2>
            <p>
              When you use our services to convert files, you upload them to our secure servers. <strong>We do not read, look into, or mine any data from your files.</strong> All processing is done automatically.
            </p>
            <p>
              <strong>Automatic Deletion:</strong> Your files (both the uploaded original and the converted output) are automatically and permanently deleted from our servers within 30 minutes of conversion. We keep no backups or copies of your files.
            </p>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>2. Information We Collect</h2>
            <p>
              <strong>Log Data:</strong> Like most websites, our servers automatically record information ("Log Data") created by your use of the Site. Log Data may include information such as your IP address, browser type, operating system, the referring web page, pages visited, location, your mobile carrier, device and application IDs, search terms, and cookie information.
            </p>
            <p>
              <strong>Cookies:</strong> We use cookies to collect additional website usage data and to improve our Site and service. You can control cookies through your browser settings.
            </p>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>3. How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>Provide, operate, and maintain our Site</li>
              <li>Improve, personalize, and expand our Site</li>
              <li>Understand and analyze how you use our Site</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Detect and prevent fraud</li>
            </ul>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>4. Third-Party Advertising</h2>
            <p>
              We use third-party advertising companies to serve ads when you visit our Site. These companies may use information (not including your name, address, email address, or telephone number) about your visits to this and other Web sites in order to provide advertisements about goods and services of interest to you.
            </p>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
              <br/><br/>
              <strong><a href="mailto:hello@vitenest.com" style={{ color: 'var(--foreground)' }}>hello@vitenest.com</a></strong>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
