'use client';

import { PROMO_CONFIG } from '@/lib/config';
import { HelpCircle } from 'lucide-react';
import { useState } from 'react';

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-sango-surface">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="font-heading text-3xl font-bold text-sango-gold mb-3 flex items-center justify-center gap-2">
          <HelpCircle className="w-8 h-8 flex-none" />
          常见问题
        </h2>
        <p className="text-center text-sango-text-dim mb-10">
          找不到答案？欢迎直接联系我们的客服
        </p>

        <div className="space-y-3">
          {PROMO_CONFIG.faqItems.map((item, i) => (
            <div
              key={i}
              className="bg-sango-card border border-sango-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left
                  hover:bg-sango-surface transition-colors duration-150"
                aria-expanded={open === i}
              >
                <span className="font-heading font-semibold text-sango-text pr-4">
                  {item.q}
                </span>
                <span
                  className={`text-sango-gold text-lg flex-none transition-transform duration-200
                    ${open === i ? 'rotate-180' : ''}`}
                  aria-hidden
                >
                  ▾
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-sango-text-dim leading-relaxed text-sm
                  border-t border-sango-border pt-4 animate-fade-in-up">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
