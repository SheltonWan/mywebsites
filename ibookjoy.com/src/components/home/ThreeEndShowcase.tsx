"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  CalendarDays,
  CreditCard,
  QrCode,
  Star,
  ScanLine,
  BarChart3,
  Wallet,
  MessageSquare,
  Users,
  Settings,
  FileSpreadsheet,
  Shield,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import SectionTitle from "@/components/ui/SectionTitle";
import PhoneMockup from "@/components/ui/PhoneMockup";
import { BASE_PATH } from "@/lib/site.config";

const tabs = [
  {
    id: "user",
    label: "用户端",
    subtitle: "轻松预约，便捷体验",
    color: "from-brand-400 to-brand-500",
    features: [
      { icon: Search, text: "智能搜索与筛选教练" },
      { icon: CalendarDays, text: "日历视图选择时段" },
      { icon: CreditCard, text: "微信支付 & 课程包抵扣" },
      { icon: QrCode, text: "订单二维码签到" },
      { icon: Star, text: "评价打分获积分" },
    ],
        mockupImage: `${BASE_PATH}/screenshots/user-app.png`,
    mockupAlt: "用户端首页截图",
  },
  {
    id: "coach",
    label: "服务端",
    subtitle: "高效接单，智能结算",
    color: "from-emerald-500 to-teal-500",
    features: [
      { icon: ClipboardList, text: "课程排班管理" },
      { icon: ScanLine, text: "扫码核销签到" },
      { icon: BarChart3, text: "收入统计仪表盘" },
      { icon: Wallet, text: "提现到微信/银行卡" },
      { icon: MessageSquare, text: "回复用户评价" },
    ],
      mockupImage: `${BASE_PATH}/screenshots/coach-income.png`,
    mockupAlt: "教练收入统计截图",
  },
  {
    id: "admin",
    label: "管理端",
    subtitle: "全局掌控，数据驱动",
    color: "from-violet-500 to-purple-500",
    features: [
      { icon: Users, text: "用户 & 教练管理" },
      { icon: Settings, text: "课程创建7步向导" },
      { icon: Shield, text: "入驻审批工作流" },
      { icon: FileSpreadsheet, text: "数据导出 Excel" },
      { icon: CheckCircle2, text: "佣金 & 结算配置" },
    ],
      mockupImage: `${BASE_PATH}/screenshots/admin-dashboard.png`,
    mockupAlt: "管理后台截图",
  },
];

export default function ThreeEndShowcase() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="三端协同"
          title="用户 · 服务者 · 管理员"
          subtitle="三端各司其职，数据实时同步，构建完整的服务闭环生态"
        />

        {/* Tab Switcher */}
        <FadeIn>
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-gray-100 rounded-2xl p-1.5">
              {tabs.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActive(i)}
                  className={`relative px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                    active === i
                      ? "text-white shadow-lg"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {active === i && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 bg-gradient-to-r ${t.color} rounded-xl`}
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.5,
                      }}
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Left: Features */}
            <div>
              <h3
                className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${tab.color} bg-clip-text text-transparent mb-2`}
              >
                {tab.subtitle}
              </h3>
              <div className="mt-8 space-y-4">
                {tab.features.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-brand-50 transition-colors group"
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${tab.color} shadow-md`}
                    >
                      <f.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium group-hover:text-brand-600 transition-colors">
                      {f.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Mockup */}
            <div className="flex justify-center">
              <PhoneMockup>
                <Image
                  src={tab.mockupImage}
                  alt={tab.mockupAlt}
                  fill
                  className="object-cover object-top"
                />
              </PhoneMockup>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
