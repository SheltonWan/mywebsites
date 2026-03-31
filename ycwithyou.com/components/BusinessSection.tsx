import Link from "next/link";
import { siteConfig } from "@/site.config";

export default function BusinessSection() {
  const { business } = siteConfig;
  return (
    <section id="business" className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-brand-500/20 text-brand-300 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            B 端服务
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{business.title}</h2>
          <p className="text-gray-400 max-w-xl mx-auto">{business.subtitle}</p>
        </div>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {business.highlights.map((h, i) => (
            <div
              key={h.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors animate-fade-up"
              style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
            >
              <div className="text-3xl mb-3">{h.icon}</div>
              <h3 className="font-semibold text-white mb-2">{h.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{h.description}</p>
            </div>
          ))}
        </div>

        {/* Integration steps */}
        <div className="mb-14">
          <h3 className="text-center text-xl font-semibold mb-8 text-gray-300">接入流程</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {business.steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {i + 1}
                </div>
                <h4 className="font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-sm text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href={business.cta.href}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 text-white font-semibold rounded-full hover:bg-brand-600 transition-all shadow-lg shadow-brand-900/40 hover:-translate-y-0.5 text-base"
          >
            {business.cta.label}
            <span>→</span>
          </a>
          <p className="text-gray-500 text-sm mt-3">或直接发邮件至 {siteConfig.contact.email}</p>
        </div>
      </div>
    </section>
  );
}
