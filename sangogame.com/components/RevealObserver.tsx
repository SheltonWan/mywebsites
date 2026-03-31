'use client';

import { useEffect } from 'react';

/**
 * Mounts a single IntersectionObserver for ALL elements with class `.reveal`.
 * When they scroll into view they receive the `.visible` class, triggering the
 * CSS fade-in-up animation defined in globals.css.
 */
export default function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12 },
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null; // renders nothing
}
