"use client";

import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";

export default function CTASection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            准备好开启
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              数字化转型之旅
            </span>
            了吗？
          </h2>
          <p className="mt-6 text-lg text-white/70 max-w-2xl mx-auto">
            无需服务器，无需域名，基于微信云开发快速部署。
            一个月内即可上线属于您的预约管理小程序。
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-base font-bold text-brand-700 bg-white rounded-2xl shadow-xl shadow-black/10 hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              扫码体验小程序
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/25 rounded-2xl hover:bg-white/20 transition-all duration-300"
            >
              预约演示
            </Link>
          </div>

          {/* Trust */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-white/50">
            <span>✓ 免费试用</span>
            <span>✓ 无需服务器</span>
            <span>✓ 30天上线</span>
            <span>✓ 专属技术支持</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
