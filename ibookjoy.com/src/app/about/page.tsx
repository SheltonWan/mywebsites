import type { Metadata } from "next";
import Link from "next/link";
import { Cloud, Zap, Shield, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "关于我们",
  description: "了解约享平台的品牌故事、技术实力和发展历程。",
};

const techAdvantages = [
  {
    icon: Cloud,
    title: "云原生架构",
    desc: "基于腾讯云开发 Serverless 架构，无需购买和运维服务器，弹性伸缩应对业务高峰。",
  },
  {
    icon: Smartphone,
    title: "微信生态深度整合",
    desc: "微信登录、微信支付、订阅消息、位置服务一站整合，用户零学习成本。",
  },
  {
    icon: Zap,
    title: "极速部署",
    desc: "成熟的代码框架和组件化设计，最快2周即可完成定制部署上线。",
  },
  {
    icon: Shield,
    title: "企业级安全",
    desc: "数据存储在企业独立云环境，腾讯云提供DDoS防护、数据加密、备份恢复等全套安全措施。",
  },
];

const milestones = [
  { year: "2024 Q1", event: "核心预约系统 v1.0 上线" },
  { year: "2024 Q2", event: "微信支付V3 + 退款功能上线" },
  { year: "2024 Q3", event: "教练入驻 + 收入结算系统完成" },
  { year: "2024 Q4", event: "评价系统 + 积分体系发布" },
  { year: "2025 Q1", event: "课程包/次卡功能上线" },
  { year: "2025 Q2", event: "6大行业模板配置化完成" },
  { year: "2025 Q3", event: "提现功能 + 消息系统完善" },
  { year: "2026 Q1", event: "约享平台品牌正式发布" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-brand-600 to-brand-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            关于约享平台
          </h1>
          <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
            我们致力于让每一家服务机构都能拥有数字化的预约管理能力
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">品牌故事</h2>
          <div className="prose prose-lg text-gray-600 space-y-4">
            <p>
              约享平台诞生于一个简单的观察：绝大多数线下服务机构仍然依赖电话、微信群和纸质表格管理预约和排班。
              教练在本子上画排课表，客户在微信群里接龙，老板用Excel算工资——这些场景每天都在重演。
            </p>
            <p>
              我们认为，预约管理不应该是一个复杂、昂贵的系统工程。
              借助微信小程序和云开发的技术红利，一个月内就能上线一套完整的预约系统——
              从预约到核销，从支付到结算，从评价到复购，全流程数字化闭环。
            </p>
            <p>
              约享平台的核心理念是<strong>「让预约回归简单」</strong>。
              无论是一个人的独立私教，还是连锁美容院，都能快速拥有专属的数字化预约管理平台。
            </p>
          </div>
        </div>
      </section>

      {/* Tech Advantages */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            技术优势
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {techAdvantages.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-500 flex items-center justify-center mb-4">
                  <t.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {t.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            发展历程
          </h2>
          <div className="relative pl-8 border-l-2 border-brand-100 space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-brand-400 border-4 border-brand-50" />
                <div className="ml-4">
                  <span className="text-sm font-bold text-brand-500">
                    {m.year}
                  </span>
                  <p className="text-gray-700 font-medium mt-1">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-500 to-brand-400">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            加入约享，开启数字化转型
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 text-base font-bold text-brand-700 bg-white rounded-2xl shadow-xl hover:scale-105 transition-all"
          >
            立即联系我们
          </Link>
        </div>
      </section>
    </>
  );
}
