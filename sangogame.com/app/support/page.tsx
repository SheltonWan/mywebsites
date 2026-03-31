import FaqAccordion from '@/components/FaqAccordion';
import { PROMO_CONFIG } from '@/lib/config';
import { Bug, Lightbulb, Mail, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: '玩家支持中心 — 卧龙风云',
  description: '卧龙风云玩家支持中心：联系客服、报告问题、常见问题解答。',
};

const IC = 'w-10 h-10 text-sango-gold';
const CONTACT_CARDS: { icon: ReactNode; title: string; desc: string; label: (e: string) => string; href: (e: string) => string }[] = [
  {
    icon: <Mail className={IC} />,
    title: '联系客服',
    desc: '遇到任何疑问均可通过邮件联系我们，通常在 1–3 个工作日内回复。',
    label: (email) => email,
    href: (email) => `mailto:${email}`,
  },
  {
    icon: <Bug className={IC} />,
    title: '报告问题',
    desc: '发现 Bug 或游戏异常？请附上设备型号、系统版本及复现步骤，我们会优先跟进修复。',
    label: () => '发送报告',
    href: (email) => `mailto:${email}?subject=Bug%E6%8A%A5%E5%91%8A`,
  },
  {
    icon: <Lightbulb className={IC} />,
    title: '功能建议',
    desc: '有新玩法或改进方向想分享？优质建议将直接影响游戏后续更新方向。',
    label: () => '提交建议',
    href: (email) => `mailto:${email}?subject=%E5%8A%9F%E8%83%BD%E5%BB%BA%E8%AE%AE`,
  },
];

export default function SupportPage() {
  const { contact: { email } } = PROMO_CONFIG;
  return (
    <>
      {/* Page hero */}
      <div className="relative pt-24 pb-14 text-center bg-sango-bg overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,168,83,.07) 0%, transparent 65%)' }} />
        <h1 className="font-heading text-3xl font-bold text-sango-gold relative mb-2 flex items-center justify-center gap-2">
          <ShieldCheck className="w-8 h-8 flex-none" />
          玩家支持中心
        </h1>
        <p className="text-sango-text-dim relative">遇到任何问题，我们随时在这里</p>
      </div>

      <div className="max-w-4xl mx-auto px-6 pb-20">

        {/* Contact cards */}
        <section className="mb-16">
          <h2 className="font-heading text-xl font-bold text-sango-gold mb-6 pb-3 border-b border-sango-border">
            联系我们
          </h2>
          <div className="grid sm:grid-cols-3 gap-5">
            {CONTACT_CARDS.map((card) => (
              <div
                key={card.title}
                className="relative bg-sango-card border border-sango-border rounded-xl px-6 py-7
                  text-center hover:-translate-y-1 hover:border-sango-gold-dim
                  hover:shadow-[0_12px_40px_rgba(0,0,0,.4)]
                  transition-all duration-300 group overflow-hidden"
              >
                {/* top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px]
                  bg-gradient-to-r from-sango-gold to-transparent opacity-0
                  group-hover:opacity-100 transition-opacity duration-300" />
                <div className="mb-4 flex justify-center">{card.icon}</div>
                <h3 className="font-heading font-bold text-sango-gold mb-2">{card.title}</h3>
                <p className="text-sango-text-dim text-sm leading-relaxed mb-5">{card.desc}</p>
                <a
                  href={card.href(email)}
                  className="inline-block px-5 py-2 border border-sango-gold-dim text-sango-gold
                    rounded-lg text-sm font-semibold break-all
                    hover:bg-gradient-to-r hover:from-sango-gold hover:to-sango-gold-dim
                    hover:text-sango-card hover:border-transparent
                    hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(212,168,83,.3)]
                    transition-all duration-200"
                >
                  {card.label(email)}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ — reuse accordion component */}
        <FaqAccordion />

        <p className="text-center text-sango-text-dim text-sm mt-6">
          没有找到答案？{' '}
          <a href={`mailto:${email}`} className="text-sango-gold hover:underline">
            发邮件给我们
          </a>
        </p>

        <div className="mt-12 pt-8 border-t border-sango-border">
          <Link href="/" className="text-sango-gold hover:underline text-sm">← 返回主页</Link>
        </div>
      </div>
    </>
  );
}
