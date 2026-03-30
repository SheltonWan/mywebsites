'use client';

import { PlatformIcon } from '@/components/ui/DownloadButton';
import { trackDownload } from '@/lib/analytics';
import { siteConfig } from '@/site.config';

const platforms = [
  {
    key: 'ios' as const,
    system: 'iOS 14+',
    note: 'iPhone 及 iPad 均可使用',
    color: 'bg-gray-900',
  },
  {
    key: 'android' as const,
    system: 'Android 8.0+',
    note: '支持主流 Android 手机',
    color: 'bg-green-600',
  },
  {
    key: 'mac' as const,
    system: 'macOS 11+',
    note: 'Apple Silicon & Intel 均支持',
    color: 'bg-gray-700',
  },
  {
    key: 'windows' as const,
    system: 'Windows 10/11',
    note: '64 位系统',
    color: 'bg-blue-600',
  },
];

export default function DownloadCards() {
  const dl = siteConfig.downloads;
  return (
    <section className="max-w-3xl mx-auto px-4 py-16 space-y-4">
      {platforms.map(({ key, system, note, color }) => {
        const d = dl[key];
        return (
          <a
            key={key}
            href={d.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDownload(key)}
            className="flex items-center gap-5 bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className={`${color} rounded-2xl w-14 h-14 flex items-center justify-center shrink-0`}>
              <PlatformIcon platform={key} className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-base">{d.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{system} · {note}</p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-brand-500 group-hover:text-brand-600 transition-colors flex items-center gap-1">
              立即下载
              <svg
                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </a>
        );
      })}
    </section>
  );
}
