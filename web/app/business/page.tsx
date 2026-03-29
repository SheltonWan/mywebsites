import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BusinessSection from "@/components/BusinessSection";

export const metadata: Metadata = {
  title: "商家接入 — IM 即时通讯接入服务",
  description: "为您的应用快速集成专业级即时通讯能力，支持多平台、多消息类型、高并发。",
};

export default function BusinessPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        {/* Page hero */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 text-center">
          <div className="max-w-3xl mx-auto px-4">
            <span className="inline-block bg-brand-500/20 text-brand-300 text-xs font-semibold px-3 py-1 rounded-full mb-6">
              企业级服务
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              为您的产品接入<br />
              <span className="text-brand-400">专业即时通讯</span>
            </h1>
            <p className="text-gray-400 text-lg mb-8">
              无需从零开发，快速为您的平台添加聊天、群组、推送等完整 IM 能力
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="mailto:smartv@qq.com"
                className="px-8 py-3.5 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 transition-all"
              >
                立即咨询
              </a>
              <Link
                href="/"
                className="px-8 py-3.5 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
              >
                了解产品
              </Link>
            </div>
          </div>
        </section>

        <BusinessSection />
      </main>
      <Footer />
    </>
  );
}
