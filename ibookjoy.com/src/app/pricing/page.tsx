import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PRICING } from "@/lib/site.config";

export const metadata: Metadata = {
  title: "定价方案",
  description: "约享平台定价方案，灵活选择基础版、专业版或企业版，满足不同规模服务机构需求。",
};

const plans = [
  {
    name: "基础版",
    price: "免费",
    period: "",
    desc: "适合个人服务者或小微工作室快速上手",
    color: "from-gray-500 to-gray-600",
    features: [
      "单个服务者账号",
      "基础预约排班",
      "微信支付接入",
      "扫码核销签到",
      "基础订单管理",
      "微信消息通知(3种)",
      "社区技术支持",
    ],
    cta: "免费开始",
    popular: false,
  },
  {
    name: "专业版",
    price: PRICING.proPrice,
    period: PRICING.proPeriod,
    desc: "适合中小型机构，完整功能支撑日常运营",
    color: "from-brand-400 to-brand-600",
    features: [
      `最多 ${PRICING.proMaxProviders} 个服务者`,
      "完整预约日历系统",
      "课程包 / 次卡管理",
      "评价 & 积分系统",
      "收入统计 & 提现",
      "全部 11 种消息通知",
      "数据导出 Excel",
      "行业主题自定义",
      "专属技术支持",
    ],
    cta: "立即开通",
    popular: true,
  },
  {
    name: "企业版",
    price: "定制",
    period: "",
    desc: "大型连锁机构，定制部署与专属服务",
    color: "from-violet-500 to-purple-600",
    features: [
      "不限服务者数量",
      "专业版全部功能",
      "多门店管理",
      "自定义佣金规则",
      "API 对接能力",
      "独立部署",
      "品牌 Logo 白标",
      "专属客户经理",
      "7×12 技术支持",
    ],
    cta: "联系销售",
    popular: false,
  },
];

const faqs = [
  {
    q: "是否需要自己购买服务器？",
    a: "不需要。约享平台基于微信云开发部署，无需购买和维护服务器、域名、SSL证书。",
  },
  {
    q: "上线周期大约多久？",
    a: "基础功能最快可在 2-4 周内完成部署上线，包含定制化需求通常在 1-2 个月。",
  },
  {
    q: "是否支持免费试用？",
    a: "基础版永久免费，专业版支持 14 天免费试用，满意后再付费。",
  },
  {
    q: "数据归属和安全性如何？",
    a: "所有数据存储在您的微信云开发环境中，数据完全归您所有，腾讯云提供企业级安全保障。",
  },
  {
    q: "可以中途升级或降级套餐吗？",
    a: "随时可以升级到更高版本，升级时自动按剩余天数折算差价。",
  },
  {
    q: "是否支持定制开发？",
    a: "企业版支持深度定制，包括品牌白标、API对接、特殊业务流程等，详情请联系销售。",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full bg-brand-50 text-brand-500 mb-4 tracking-wide uppercase">
            灵活定价
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight">
            选择适合您的方案
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            从free到企业级，每种规模的服务机构都能找到合适的方案
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-8 ${
                  plan.popular
                    ? "bg-white border-2 border-brand-400 shadow-2xl shadow-brand-100 scale-105"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-brand-400 to-brand-500 text-white text-xs font-bold rounded-full">
                    最受欢迎
                  </div>
                )}

                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.desc}</p>

                <div className="mt-6 mb-8">
                  <span className="text-4xl font-black text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>

                <Link
                  href="/contact"
                  className={`block w-full text-center py-3.5 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? "bg-gradient-to-r from-brand-400 to-brand-500 text-white shadow-lg shadow-brand-200 hover:shadow-brand-300 hover:scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {plan.cta}
                </Link>

                <div className="mt-8 space-y-3">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-brand-400 flex-shrink-0" />
                      <span className="text-gray-600">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            常见问题
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-100"
              >
                <h4 className="font-bold text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
