'use client';

import { trackDownload } from '@/lib/analytics';
import { PROMO_CONFIG } from '@/lib/config';
import { getPlatformLinkInfo } from '@/lib/getPlatformLink';
import { Smartphone } from 'lucide-react';
import Link from 'next/link';
import { FaAndroid, FaApple, FaGlobe, FaWindows, FaWrench } from 'react-icons/fa';
import { SiGoogleplay } from 'react-icons/si';

export default function PlatformsGrid() {
  const { downloadLinks } = PROMO_CONFIG;

  // Build list of platform entries to display
  const entries = Object.entries(downloadLinks).filter(([, url]) => !!url);

  return (
    <section id="platforms" className="py-20 bg-sango-bg">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="font-heading text-3xl font-bold text-sango-gold mb-3 flex items-center justify-center gap-2">
          <Smartphone className="w-8 h-8 flex-none" />
          多端畅玩
        </h2>
        <p className="text-center text-sango-text-dim mb-12">
          支持 iOS · Android · Web 全平台，随时随地运筹帷幄
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {entries.map(([, url]) => {
            const info = getPlatformLinkInfo(url);
            if (!info) return null;
            const { label, isBeta, platformKey } = info;
            return (
              <Link
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => { if (platformKey) trackDownload(platformKey); }}
                className="relative inline-flex items-center gap-3 px-8 py-4
                  bg-sango-card border border-sango-border rounded-xl
                  font-heading font-semibold text-sango-text
                  hover:border-sango-gold hover:text-sango-gold hover:bg-sango-surface
                  transition-all duration-200 group min-w-[180px] justify-center"
              >
                {isBeta && (
                  <span className="absolute -top-2 -right-2 text-xs px-2 py-0.5
                    bg-sango-red text-white rounded-full font-body font-normal">
                    内测
                  </span>
                )}
                <PlatformIcon url={url} label={label} />
                {label}
              </Link>
            );
          })}
        </div>

        <p className="text-center text-sango-text-dim text-sm mt-8">
          内测版需填写测试码方可下载，如有疑问请{' '}
          <a
            href={`mailto:${PROMO_CONFIG.contact.email}`}
            className="text-sango-gold hover:underline"
          >
            联系我们
          </a>
        </p>
      </div>
    </section>
  );
}

function PlatformIcon({ url, label }: { url: string; label: string }) {
  const u = url.toLowerCase();
  const l = label.toLowerCase();
  const cls = 'w-5 h-5';
  if (l.includes('ios')) return <Smartphone className={cls} />;
  if (u.includes('pgyer.com') || u.includes('fir.im')) {
    if (u.includes('android')) return <FaAndroid className={cls} />;
    return <FaWrench className={cls} />;
  }
  if (u.includes('apps.apple.com') || u.includes('itunes.apple')) return <FaApple className={cls} />;
  if (u.includes('play.google')) return <SiGoogleplay className={cls} />;
  if (u.endsWith('.exe') || u.includes('windows')) return <FaWindows className={cls} />;
  if (u.endsWith('.dmg') || u.includes('macos')) return <FaApple className={cls} />;
  if (u.includes('android') || u.includes('apk')) return <FaAndroid className={cls} />;
  return <FaGlobe className={cls} />;
}
