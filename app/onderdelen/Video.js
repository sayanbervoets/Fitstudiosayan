'use client';

import { useEffect, useRef } from 'react';

// Speelt pas als het blok in beeld staat, en pauzeert weer als je verder
// scrolt. Anders draait er 2MB video door op een telefoon die hem niet toont.
export default function Video() {
  const speler = useRef(null);

  useEffect(() => {
    const v = speler.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const kijker = new IntersectionObserver(
      ([w]) => {
        if (w.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    kijker.observe(v);
    return () => kijker.disconnect();
  }, []);

  return (
    <video
      ref={speler}
      className="sfeervideo"
      poster="/foto/video-poster.jpg"
      muted
      loop
      playsInline
      preload="none"
      aria-label="Sfeerbeeld van een training in de studio"
    >
      <source src="/video/hero.webm" type="video/webm" />
      <source src="/video/hero.mp4" type="video/mp4" />
    </video>
  );
}
