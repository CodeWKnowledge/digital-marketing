import { useState, useRef, useEffect } from 'react';

/**
 * LazyImage — viewport-aware image with blur-up fade-in.
 * Wraps native lazy loading with an IntersectionObserver for older browsers
 * and applies a smooth opacity transition once loaded.
 */
export default function LazyImage({
  src,
  alt = '',
  width,
  height,
  className = '',
  style = {},
  priority = false, // set true for above-the-fold / LCP images
  objectFit = 'cover',
}) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(priority);
  const ref = useRef(null);

  useEffect(() => {
    if (priority || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // start loading 200px before entering viewport
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [priority]);

  return (
    <span
      ref={ref}
      style={{
        display: 'block',
        overflow: 'hidden',
        background: '#f3f4f6',
        ...( width && height ? { aspectRatio: `${width}/${height}` } : {}),
        ...style,
      }}
      className={className}
    >
      {inView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchpriority={priority ? 'high' : 'low'}
          onLoad={() => setLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
            display: 'block',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.35s ease',
            willChange: loaded ? 'auto' : 'opacity',
          }}
        />
      )}
    </span>
  );
}
