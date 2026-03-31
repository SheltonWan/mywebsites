import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DownloadCards from "@/components/DownloadCards";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: "下载 — 免费获取 iWithYou",
  description: "下载 iWithYou，支持 iOS、Android、macOS 和 Windows 全平台。",
};

export default function DownloadPage() {
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

        <DownloadCards />

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

