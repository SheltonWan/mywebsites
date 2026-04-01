'use client';

import { PROMO_CONFIG } from '@/lib/config';
import { BarChart3 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return count;
}

function StatCard({
  count, unit, label, showPlus, active,
}: {
  count: number;
  unit: string;
  label: string;
  showPlus: boolean;
  active: boolean;
}) {
  const displayed = useCountUp(count, 1600, active);
  return (
    <div className="flex flex-col items-center px-6 py-8 bg-sango-card border border-sango-border
      rounded-xl hover:border-sango-gold transition-colors duration-200">
      <div className="font-heading text-4xl font-bold text-sango-gold mb-2">
        {displayed}
        {unit && <span className="text-2xl text-sango-accent ml-0.5">{unit}</span>}
        {showPlus && <span className="text-2xl text-sango-gold">+</span>}
      </div>
      <div className="text-sango-text-dim text-sm">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const items = [
    { count: 190, unit: '座', label: '历史城池', showPlus: true },
    { count: 4, unit: '大', label: '经典剧本', showPlus: false },
    { count: 150, unit: '位', label: '历史名将', showPlus: true },
    { count: 22, unit: '个', label: '可选势力', showPlus: false },
  ];

  // Override with config data where available
  PROMO_CONFIG.stats?.forEach((s, i) => {
    if (items[i]) {
      items[i].count = s.count;
      items[i].showPlus = s.showPlus;
    }
  });

  return (
    <section ref={sectionRef} id="stats" className="py-20 bg-sango-surface">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-heading text-3xl font-bold text-sango-gold mb-3 flex items-center justify-center gap-2">
          <BarChart3 className="w-8 h-8 flex-none" />
          数据一览
        </h2>
        <p className="text-center text-sango-text-dim mb-10">一组数字，见证三国战略的深度</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <StatCard key={item.label} {...item} active={active} />
          ))}
        </div>
      </div>
    </section>
  );
}
