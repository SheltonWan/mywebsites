"use client";

import {
  ShoppingCart,
  CreditCard,
  MapPin,
  ScanLine,
  Unlock,
  Banknote,
  CheckCircle,
  Bell,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionTitle from "@/components/ui/SectionTitle";

const steps = [
  {
    icon: ShoppingCart,
    title: "用户下单",
    desc: "选择课程、时段，填写信息",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: CreditCard,
    title: "微信支付",
    desc: "支持直付 / 课程包抵扣",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: MapPin,
    title: "到场签到",
    desc: "出示订单QR码",
    color: "from-purple-500 to-violet-500",
  },
  {
    icon: ScanLine,
    title: "扫码核销",
    desc: "教练/管理员扫码确认",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Unlock,
    title: "收入解冻",
    desc: "核销后教练收入自动解冻",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Banknote,
    title: "申请提现",
    desc: "支持微信钱包 / 银行卡",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: CheckCircle,
    title: "平台审核",
    desc: "审核通过自动打款",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Bell,
    title: "到账通知",
    desc: "微信消息实时推送",
    color: "from-yellow-500 to-orange-500",
  },
];

export default function WorkflowTimeline() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="业务流程"
          title="从下单到结算，全链路自动化"
          subtitle="每一步都有系统保障，让服务交付和资金结算透明高效"
        />

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <FadeIn>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute top-[34px] left-0 right-0 h-0.5 bg-gradient-to-r from-brand-200 via-brand-300 to-brand-200" />

              <div className="grid grid-cols-8 gap-4">
                {steps.map((step, i) => (
                  <div key={i} className="relative flex flex-col items-center">
                    {/* Dot */}
                    <div
                      className={`relative z-10 flex items-center justify-center w-[68px] h-[68px] rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}
                    >
                      <step.icon className="w-7 h-7 text-white" />
                    </div>

                    {/* Arrow (between steps) */}
                    {i < steps.length - 1 && (
                      <div className="absolute top-[30px] -right-2 z-20 text-gray-300">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}

                    <div className="mt-4 text-center">
                      <div className="text-sm font-bold text-gray-900">
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {step.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden">
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-brand-100" />

            <div className="space-y-6">
              {steps.map((step, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="relative flex items-start gap-4">
                    <div
                      className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} shadow-md flex-shrink-0 -ml-8`}
                    >
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-400">{step.desc}</div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
