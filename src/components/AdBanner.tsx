"use client";

import React, { useEffect, useRef } from 'react';

export type AdType = 'native' | '468x60' | '300x250' | '160x600' | '160x300' | '320x50' | '728x90';

export default function AdBanner({ type, className = '' }: { type: AdType, className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const getAdId = () => {
    switch (type) {
      case 'native': return process.env.NEXT_PUBLIC_ADSTERRA_NATIVE_ID;
      case '468x60': return process.env.NEXT_PUBLIC_ADSTERRA_468X60;
      case '300x250': return process.env.NEXT_PUBLIC_ADSTERRA_300X250;
      case '160x600': return process.env.NEXT_PUBLIC_ADSTERRA_160X600;
      case '160x300': return process.env.NEXT_PUBLIC_ADSTERRA_160X300;
      case '320x50': return process.env.NEXT_PUBLIC_ADSTERRA_320X50;
      case '728x90': return process.env.NEXT_PUBLIC_ADSTERRA_728X90;
      default: return null;
    }
  };

  const adId = getAdId();
  const isDummy = !adId || adId.includes('dummy');

  useEffect(() => {
    if (!isDummy && containerRef.current && !containerRef.current.hasChildNodes()) {
      if (type === 'native') {
        // Native Banner Injection
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = `https://pl29637924.effectivecpmnetwork.com/${adId}/invoke.js`;
        containerRef.current.appendChild(script);
      } else {
        // Standard Banner Injection
        const [wStr, hStr] = type.split('x');
        const conf = document.createElement('script');
        conf.type = 'text/javascript';
        conf.innerHTML = `atOptions = {
          'key' : '${adId}',
          'format' : 'iframe',
          'height' : ${parseInt(hStr, 10)},
          'width' : ${parseInt(wStr, 10)},
          'params' : {}
        };`;
        containerRef.current.appendChild(conf);

        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.highperformanceformat.com/${adId}/invoke.js`;
        containerRef.current.appendChild(script);
      }
    }
  }, [adId, isDummy, type]);

  const getDimensions = () => {
    if (type === 'native') return { width: '100%', height: 'auto', minHeight: '250px' };
    const [w, h] = type.split('x');
    return { width: `${w}px`, height: `${h}px`, minHeight: `${h}px` };
  };

  const dimensions = getDimensions();

  return (
    <div className={`ad-container ${className}`} style={{
      display: 'flex',
      justifyContent: 'center',
      margin: '1.5rem auto',
      width: '100%',
      maxWidth: type === 'native' ? '1000px' : dimensions.width,
      overflow: 'hidden'
    }}>
      {isDummy ? (
        <div style={{
          width: dimensions.width,
          maxWidth: '100%',
          height: dimensions.height,
          minHeight: dimensions.minHeight,
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
          Ad Placeholder: {type}
        </div>
      ) : (
        <div 
          ref={containerRef} 
          id={`container-${adId}`} 
          style={{ 
            minWidth: type === 'native' ? '100%' : dimensions.width, 
            minHeight: dimensions.minHeight,
            display: 'flex',
            justifyContent: 'center'
          }} 
        />
      )}
    </div>
  );
}
