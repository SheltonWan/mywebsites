import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlatformIcon } from "@/components/ui/DownloadButton";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "下载 — 免费获取 iWithYou",
  description: "下载 iWithYou，支持 iOS、Android、macOS 和 Windows 全平台。",
};

const platforms = [
  {
    key: "ios" as const,
    system: "iOS 14+",
    note: "iPhone 及 iPad 均可使用",
    color: "bg-gray-900",
  },
  {
    key: "android" as const,
    system: "Android 8.0+",
    note: "支持主流 Android 手机",
    color: "bg-green-600",
  },
  {
    key: "mac" as const,
    system: "macOS 11+",
    note: "Apple Silicon & Intel 均支持",
    color: "bg-gray-700",
  },
  {
    key: "windows" as const,
    system: "Windows 10/11",
    note: "64 位系统",
    color: "bg-blue-600",
  },
];

export default function DownloadPage() {
  const dl = siteConfig.downloads;
  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-brand-500 text-white py-20 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-3">下载 iWithYou</h1>
            <p className="text-brand-100 text-lg">全平台支持，随时随地与好友保持联系</p>
            <div className="flex flex-wrap justify-center gap-3 mt-6 text-sm text-brand-200">
              <span>iOS 14+</span>
              <span className="opacity-40">·</span>
              <span>Android 8.0+</span>
              <span className="opacity-40">·</span>
              <span>macOS 11+</span>
              <span className="opacity-40">·</span>
              <span>Windows 10/11</span>
            </div>
          </div>
        </section>

        {/* Platform cards */}
        <section className="max-w-3xl mx-auto px-4 py-16 space-y-4">
          {platforms.map(({ key, system, note, color }) => {
            const d = dl[key];
            return (
              <a
                key={key}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 bg-white rounded-2xl px-6 py-5 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                {/* Icon badge */}
                <div className={`${color} rounded-2xl w-14 h-14 flex items-center justify-center shrink-0`}>
                  <PlatformIcon platform={key} className="w-7 h-7 text-white" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-base">{d.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{system} · {note}</p>
                </div>

                {/* CTA */}
                <span className="shrink-0 text-sm font-semibold text-brand-500 group-hover:text-brand-600 transition-colors flex items-center gap-1">
                  立即下载
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </a>
            );
          })}
        </section>

        {/* Footer note */}
        <p className="text-center text-sm text-gray-400 pb-16 px-4">
          当前为内测发布版本 · 如有问题请联系{" "}
          <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-500 hover:underline">
            {siteConfig.contact.email}
          </a>
        </p>
      </main>
      <Footer />
    </>
  );
}
