import { useState, useEffect } from 'react';

/**
 * BackToTop — scroll-to-top button matching the original ft-back-to-top element.
 * Appears after the user scrolls down 400px.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className="ft-back-to-top"
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      style={{ display: visible ? undefined : 'none' }}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m6 14 6-6 6 6" />
      </svg>
    </button>
  );
}
