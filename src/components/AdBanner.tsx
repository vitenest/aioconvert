"use client";

import React, { useEffect, useRef } from 'react';

type AdType = 'desktop' | 'mobile' | 'native';

export default function AdBanner({ type, className = '' }: { type: AdType, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine the ID from environment variables
  const getAdId = () => {
    switch (type) {
      case 'desktop': return process.env.NEXT_PUBLIC_ADSTERRA_DESKTOP_BANNER_ID;
      case 'mobile': return process.env.NEXT_PUBLIC_ADSTERRA_MOBILE_BANNER_ID;
      case 'native': return process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_ID;
      default: return null;
    }
  };

  const adId = getAdId();
  const isDummy = !adId || adId.includes('dummy');

  useEffect(() => {
    if (!isDummy && containerRef.current && !containerRef.current.hasChildNodes()) {
      // Configuration script
      const conf = document.createElement('script');
      conf.type = 'text/javascript';
      conf.innerHTML = `atOptions = {
        'key' : '${adId}',
        'format' : 'iframe',
        'height' : ${type === 'desktop' ? 90 : type === 'mobile' ? 50 : 250},
        'width' : ${type === 'desktop' ? 728 : type === 'mobile' ? 320 : 300},
        'params' : {}
      };`;
      containerRef.current.appendChild(conf);

      // Invocation script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `//www.highperformanceformat.com/${adId}/invoke.js`;
      containerRef.current.appendChild(script);
    }
  }, [adId, isDummy, type]);

  // Determine dimensions based on typical Adsterra ad sizes
  const getDimensions = () => {
    switch (type) {
      case 'desktop': return { width: '728px', height: '90px' };
      case 'mobile': return { width: '320px', height: '50px' };
      case 'native': return { width: '100%', height: '250px' }; // Native ads blend in, height varies
      default: return { width: '100%', height: '90px' };
    }
  };

  const dimensions = getDimensions();

  // For responsive hiding (e.g. don't show mobile banner on desktop)
  const responsiveClass = type === 'mobile' ? 'mobile-only-ad' : type === 'desktop' ? 'desktop-only-ad' : '';

  return (
    <div className={`ad-container ${responsiveClass} ${className}`} style={{
      display: 'flex',
      justifyContent: 'center',
      margin: '2rem auto',
      width: '100%',
      maxWidth: '1000px',
      overflow: 'hidden'
    }}>
      {isDummy ? (
        <div style={{
          width: dimensions.width,
          maxWidth: '100%',
          height: dimensions.height,
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          border: '1px dashed var(--border)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--secondary-foreground)',
          fontSize: '0.85rem',
          fontWeight: 500,
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
          Adsterra {type} Banner Placeholder
        </div>
      ) : (
        <div ref={containerRef} id={`container-${adId}`} style={{ minWidth: dimensions.width, minHeight: dimensions.height }} />
      )}
    </div>
  );
}
