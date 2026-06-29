import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Terms of Service | AIOConverter',
  description: 'Terms of Service and Conditions of Use for AIOConverter.',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main style={{ flex: 1, backgroundColor: 'var(--background)' }}>
        <div style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--foreground)' }}>Terms of Service</h1>
          
          <div className="glass-panel" style={{ padding: '3rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7, color: 'var(--foreground)' }}>
            <p><strong>Effective Date: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</strong></p>
            
            <p>
              These Terms of Service ("Terms") govern your access to and use of the AIOConverter website (the "Service") provided by ViteNest. By accessing or using the Service, you agree to be bound by these Terms.
            </p>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>1. Description of Service</h2>
            <p>
              AIOConverter is an online file conversion tool that allows users to upload digital files and convert them into different formats. The Service is provided "as is" and "as available," free of charge.
            </p>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>2. User Responsibilities</h2>
            <p>
              By using our Service, you agree that:
            </p>
            <ul style={{ paddingLeft: '1.5rem' }}>
              <li>You have the legal right to upload and convert the files you submit.</li>
              <li>You will not upload any files that contain viruses, malware, or illicit content.</li>
              <li>You will not use the Service for any unlawful purpose.</li>
              <li>You will not attempt to disrupt or compromise the security of the Service.</li>
            </ul>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>3. Data Privacy and File Deletion</h2>
            <p>
              Your privacy is extremely important to us. All files uploaded to AIOConverter are processed automatically and deleted permanently from our servers within 30 minutes. We do not inspect, index, or store your files beyond the time necessary to provide the conversion service. For more details, please review our <a href="/privacy-policy" style={{ color: 'var(--foreground)', textDecoration: 'underline' }}>Privacy Policy</a>.
            </p>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>4. Intellectual Property</h2>
            <p>
              We claim no intellectual property rights over the files you upload to the Service. The uploaded files remain your sole property. However, the AIOConverter brand, logo, design, and code are the intellectual property of ViteNest and may not be copied or reproduced without permission.
            </p>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>5. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, AIOConverter and ViteNest shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your use or inability to use the Service; (b) any unauthorized access to or use of our servers and/or any personal information stored therein.
            </p>
            
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginTop: '1.5rem' }}>6. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
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
