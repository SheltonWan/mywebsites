"use client";

import {
  CalendarDays,
  CreditCard,
  ScanLine,
  Wallet,
  Star,
  Gift,
  Package,
  Bell,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionTitle from "@/components/ui/SectionTitle";

const features = [
  {
    icon: CalendarDays,
    title: "智能预约引擎",
    desc: "日历视图、时段管理、容量控制、冲突检测，灵活支持1对1、小班、团课等多种模式。",
    color: "from-blue-500 to-cyan-400",
  },
  {
    icon: CreditCard,
    title: "微信支付闭环",
    desc: "微信支付V3标准对接，下单-支付-退款-对账全自动，资金流清晰可追溯。",
    color: "from-green-500 to-emerald-400",
  },
  {
    icon: ScanLine,
    title: "扫码核销",
    desc: "15位唯一码 + QR验证，到场扫一扫即完成签到，防重复核销，秒级确认。",
    color: "from-purple-500 to-violet-400",
  },
  {
    icon: Wallet,
    title: "自动结算分成",
    desc: "收入冻结→核销解冻→申请提现→平台审核→资金到账，完整财务链路。",
    color: "from-orange-500 to-amber-400",
  },
  {
    icon: Star,
    title: "评价体系",
    desc: "星级+文字评价、服务者回复、质量评分排名，构建真实的口碑信任体系。",
    color: "from-yellow-500 to-orange-400",
  },
  {
    icon: Gift,
    title: "积分激励",
    desc: "签到/评价/消费/分享多维度赚积分，积分抵扣下单，提升用户活跃与复购。",
    color: "from-pink-500 to-rose-400",
  },
  {
    icon: Package,
    title: "课程包 / 次卡",
    desc: "灵活套餐配置，有效期管理，余额自动追踪，支持退款规则自定义。",
    color: "from-teal-500 to-cyan-400",
  },
  {
    icon: Bell,
    title: "智能消息通知",
    desc: "11种场景自动推送：预约成功、上课提醒、核销通知、收入到账等全覆盖。",
    color: "from-indigo-500 to-blue-400",
  },
];

export default function FeatureHighlights() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="核心能力"
          title="一个平台，解决全部预约管理难题"
          subtitle="从预约排课到支付结算，从扫码核销到评价体系，8大核心模块覆盖服务行业全链路"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div className="group relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-full">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} shadow-lg mb-4`}
                >
                  <f.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.desc}
                </p>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-brand-400 to-brand-300 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
