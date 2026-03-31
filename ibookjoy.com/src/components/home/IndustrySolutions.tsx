"use client";

import Link from "next/link";
import {
  Dumbbell,
  Scissors,
  GraduationCap,
  HeartPulse,
  Home,
  Zap,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionTitle from "@/components/ui/SectionTitle";

const industries = [
  {
    slug: "fitness",
    icon: Dumbbell,
    name: "健身私教",
    color: "#FED202",
    bg: "from-yellow-50 to-amber-50",
    border: "hover:border-yellow-400",
    desc: "私教排课 · 1对1预约 · 教练收入分成 · 学员管理",
  },
  {
    slug: "beauty",
    icon: Scissors,
    name: "美容美发",
    color: "#FF6B9D",
    bg: "from-pink-50 to-rose-50",
    border: "hover:border-pink-400",
    desc: "在线预约 · 技师排班 · 会员次卡 · 服务评价",
  },
  {
    slug: "education",
    icon: GraduationCap,
    name: "教育培训",
    color: "#4A90D9",
    bg: "from-blue-50 to-indigo-50",
    border: "hover:border-blue-400",
    desc: "试课预约 · 课时管理 · 家长反馈 · 课程包售卖",
  },
  {
    slug: "healthcare",
    icon: HeartPulse,
    name: "医疗健康",
    color: "#00B894",
    bg: "from-emerald-50 to-green-50",
    border: "hover:border-emerald-400",
    desc: "在线问诊预约 · 到诊核销 · 费用透明 · 复诊提醒",
  },
  {
    slug: "housekeeping",
    icon: Home,
    name: "家政服务",
    color: "#FF9F43",
    bg: "from-orange-50 to-amber-50",
    border: "hover:border-orange-400",
    desc: "技能认证 · 上门预约 · 服务评价 · 结算分成",
  },
  {
    slug: "youth",
    icon: Zap,
    name: "青少年体能",
    color: "#00C9A7",
    bg: "from-teal-50 to-cyan-50",
    border: "hover:border-teal-400",
    desc: "亲子约课 · 体能训练排班 · 签到打卡 · 成长记录",
  },
];

export default function IndustrySolutions() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="行业方案"
          title="一套系统，适配六大行业"
          subtitle="可配置化行业模板，一键切换色彩主题、术语体系和业务流程"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, i) => (
            <FadeIn key={ind.slug} delay={i * 0.08}>
              <Link href={`/solutions/${ind.slug}`}>
                <div
                  className={`group relative bg-gradient-to-br ${ind.bg} rounded-2xl p-6 border-2 border-transparent ${ind.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer h-full`}
                >
                  {/* Icon */}
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4 shadow-lg"
                    style={{ backgroundColor: ind.color }}
                  >
                    <ind.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {ind.name}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {ind.desc}
                  </p>

                  {/* Arrow */}
                  <div className="mt-4 flex items-center text-sm font-semibold opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-2 transition-all duration-300" style={{ color: ind.color }}>
                    了解方案
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </div>

                  {/* Decorative circle */}
                  <div
                    className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity"
                    style={{ backgroundColor: ind.color }}
                  />
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
