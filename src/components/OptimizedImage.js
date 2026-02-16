import { useState, useEffect } from 'react';

export function OptimizedImage({ src, alt, width, height, className, style, priority = false }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Extract base name from path (e.g., "/img1_.jpg" -> "img1_")
  const baseName = src.replace(/^\//, '').replace(/\.[^.]+$/, '');
  
  // Build paths for different sizes and formats
  const webpSrcSet = `
    /optimized/${baseName}-sm.webp 400w,
    /optimized/${baseName}-md.webp 800w,
    /optimized/${baseName}-lg.webp 1200w
  `;
  
  const fallbackSrc = `/optimized/${baseName}-sm.jpg`;
  const webpLg = `/optimized/${baseName}-lg.webp`;
  
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={webpSrcSet}
        sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
      />
      <img
        src={error ? src : webpLg}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={className}
        style={{
          ...style,
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />
    </picture>
  );
}
