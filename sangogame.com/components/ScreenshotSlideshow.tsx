'use client';

import { PROMO_CONFIG } from '@/lib/config';
import { MonitorPlay } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const SLIDE_INTERVAL = 4000;

export default function ScreenshotSlideshow() {
  const { screenshots: scenarios } = PROMO_CONFIG;
  const [current, setCurrent] = useState(0);
  const [paused,  setPaused]  = useState(false);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % scenarios.length);
  }, [scenarios.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + scenarios.length) % scenarios.length);
  }, [scenarios.length]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, paused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <section id="screenshots" className="bg-sango-bg py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-heading text-3xl font-bold text-sango-gold mb-3 flex items-center justify-center gap-2">
          <MonitorPlay className="w-8 h-8 flex-none" />
          游戏截图
        </h2>
        <p className="text-center text-sango-text-dim mb-10">四大历史剧本，再现波澜壮阔的三国风云</p>

        <div
          className="relative overflow-hidden rounded-2xl border border-sango-border group"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slides */}
          <div className="relative w-full aspect-[16/9] bg-sango-card">
            {scenarios.map((sc, i) => (
              <div
                key={sc.image}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={`/assets/snapshots/${sc.image}`}
                  alt={sc.title}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 1140px"
                />
                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-16
                  bg-gradient-to-t from-black/80 to-transparent">
                  <span className="text-xs font-semibold text-sango-gold-dim tracking-widest uppercase">
                    {sc.tag}
                  </span>
                  <h3 className="font-heading text-2xl font-bold text-white mt-1">
                    {sc.title}
                  </h3>
                  <p className="text-sm text-sango-text-dim mt-1 max-w-2xl line-clamp-2">{sc.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next Buttons */}
          <button
            onClick={prev}
            aria-label="上一张"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 flex items-center justify-center
              rounded-full bg-black/40 border border-white/10
              text-white hover:bg-sango-gold/70 transition-colors
              opacity-0 group-hover:opacity-100 duration-200"
          >
            ‹
          </button>
          <button
            onClick={next}
            aria-label="下一张"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 flex items-center justify-center
              rounded-full bg-black/40 border border-white/10
              text-white hover:bg-sango-gold/70 transition-colors
              opacity-0 group-hover:opacity-100 duration-200"
          >
            ›
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {scenarios.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`跳转到第 ${i + 1} 张`}
                className={`rounded-full transition-all duration-200 ${
                  i === current
                    ? 'w-5 h-2 bg-sango-gold'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
