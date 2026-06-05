import React from 'react';
import AdBanner from './AdBanner';

export default function ResponsiveAd({ margin = '1rem 0' }: { margin?: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin, width: '100%', overflow: 'hidden' }}>
      <AdBanner type="728x90" className="ad-desktop" />
      <AdBanner type="468x60" className="ad-tablet" />
      <AdBanner type="300x250" className="ad-mobile" />
    </div>
  );
}
