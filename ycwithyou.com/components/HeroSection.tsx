import Link from "next/link";
import PhoneMockup from "@/components/ui/PhoneMockup";
import DownloadButton, { PlatformIcon } from "@/components/ui/DownloadButton";
import { siteConfig } from "@/site.config";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-brand-50 via-white to-blue-50 flex items-center overflow-hidden pt-16">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-brand-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-100/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: text */}
        <div className="text-center md:text-left animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-200 text-brand-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
            全平台即时通讯 · iOS / Android / macOS / Windows
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
            {siteConfig.name}
            <br />
            <span className="text-brand-500">{siteConfig.tagline}</span>
          </h1>

          <p className="text-lg text-gray-500 mb-3">{siteConfig.slogan}</p>
          <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
            {siteConfig.description}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
            <Link
              href="/download"
              className="px-8 py-3.5 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 transition-all shadow-lg shadow-brand-200 hover:shadow-brand-300 hover:-translate-y-0.5"
            >
              立即下载
            </Link>
            <Link
              href="/business"
              className="px-8 py-3.5 border-2 border-brand-500 text-brand-600 font-semibold rounded-full hover:bg-brand-50 transition-all hover:-translate-y-0.5"
            >
              商家接入 →
            </Link>
          </div>

          {/* Quick download icons row */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {Object.values(siteConfig.downloads).map((d) => (
              <a
                key={d.platform}
                href={d.url}
                target="_blank"
                rel="noopener noreferrer"
                title={d.label}
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-brand-600 transition-colors"
              >
                <PlatformIcon platform={d.platform} className="w-4 h-4" />
                <span>{d.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: phone mockup */}
        <div className="flex justify-center animate-fade-in delay-300">
          <div className="animate-float">
            <PhoneMockup
              src={siteConfig.images.heroMockup}
              alt="iWithYou 聊天界面"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
