import { PROMO_CONFIG } from '@/lib/config';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const { legalLinks } = PROMO_CONFIG;

  return (
    <footer className="bg-sango-surface border-t border-sango-border py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 flex-wrap">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <Image
              src="/assets/logo.png"
              alt="卧龙风云"
              width={28}
              height={28}
              className="rounded-md"
            />
            <span className="font-heading font-bold text-sango-gold">卧龙风云</span>
          </div>

          {/* Nav links */}
          <nav aria-label="页脚链接" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {legalLinks.supportPageUrl && (
              <Link href={legalLinks.supportPageUrl} className="text-sm text-sango-text-dim hover:text-sango-gold transition-colors">
                玩家支持
              </Link>
            )}
            <a href="/#faq" className="text-sm text-sango-text-dim hover:text-sango-gold transition-colors">
              常见问题
            </a>
            {/* Email: never show plaintext — only mailto link */}
            <a
              href={`mailto:${PROMO_CONFIG.contact.email}`}
              className="text-sm text-sango-text-dim hover:text-sango-gold transition-colors"
            >
              联系我们
            </a>
            {legalLinks.privacyPolicyUrl ? (
              <Link href={legalLinks.privacyPolicyUrl} className="text-sm text-sango-text-dim hover:text-sango-gold transition-colors">
                隐私政策
              </Link>
            ) : (
              <span className="text-sm text-sango-text-dim opacity-50">隐私政策（筹备中）</span>
            )}
          </nav>

          {/* Copyright */}
          <p className="text-xs text-sango-text-dim">
            &copy; {new Date().getFullYear()} 卧龙风云. All rights reserved.
          </p>
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-sango-text-dim hover:text-sango-gold transition-colors"
          >
            粤ICP备2024260305号-4
          </a>
        </div>
      </div>
    </footer>
  );
}
