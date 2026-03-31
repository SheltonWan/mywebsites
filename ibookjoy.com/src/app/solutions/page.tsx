import type { Metadata } from "next";
import Link from "next/link";
import {
  Dumbbell,
  Scissors,
  GraduationCap,
  HeartPulse,
  Home,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "行业解决方案",
  description:
    "约享平台覆盖健身私教、美容美发、教育培训、医疗健康、家政服务、青少年体能6大行业的专属解决方案。",
};

const industries = [
  {
    slug: "fitness",
    icon: Dumbbell,
    name: "健身私教",
    color: "#FED202",
    bg: "from-yellow-50 to-amber-50",
    desc: "取代纸质排课与微信群约课，让健身房和独立教练拥有专属的数字化预约系统",
    stats: ["1对1 / 小班课 / 团课", "教练收入实时结算", "会员课程包管理"],
  },
  {
    slug: "beauty",
    icon: Scissors,
    name: "美容美发",
    color: "#FF6B9D",
    bg: "from-pink-50 to-rose-50",
    desc: "告别电话预约和到店排队，技师排班一目了然，客户评价沉淀口碑",
    stats: ["在线预约免占线", "技师评价排名", "次卡 / 储值卡管理"],
  },
  {
    slug: "education",
    icon: GraduationCap,
    name: "教育培训",
    color: "#4A90D9",
    bg: "from-blue-50 to-indigo-50",
    desc: "课时管理、试课预约、课后评价全流程数字化，提升机构运营效率",
    stats: ["灵活课程包售卖", "自动课时扣减", "家长评价反馈"],
  },
  {
    slug: "healthcare",
    icon: HeartPulse,
    name: "医疗健康",
    color: "#00B894",
    bg: "from-emerald-50 to-green-50",
    desc: "在线预约挂号，到诊扫码核销，费用明细自动推送，提升患者就诊体验",
    stats: ["在线预约分诊", "QR码到诊核销", "费用明细推送"],
  },
  {
    slug: "housekeeping",
    icon: Home,
    name: "家政服务",
    color: "#FF9F43",
    bg: "from-orange-50 to-amber-50",
    desc: "阿姨资质在线认证，上门服务评价沉淀，工资结算自动化",
    stats: ["服务者资质认证", "上门服务打卡", "自动结算分成"],
  },
  {
    slug: "youth",
    icon: Zap,
    name: "青少年体能",
    color: "#00C9A7",
    bg: "from-teal-50 to-cyan-50",
    desc: "家长一键约课，教练智能排班，签到打卡自动化，训练效果可量化",
    stats: ["亲子约课体验", "签到 + 评价链路", "课程包灵活购买"],
  },
];

export default function SolutionsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full bg-white/10 text-white/80 mb-4 tracking-wide uppercase">
            行业解决方案
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
            每个行业都有专属方案
          </h1>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            一键切换行业模板，自适应色彩主题、术语体系和业务流程
          </p>
        </div>
      </section>

      {/* Industry Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind) => (
              <Link key={ind.slug} href={`/solutions/${ind.slug}`}>
                <div
                  className={`group relative bg-gradient-to-br ${ind.bg} rounded-3xl p-8 border-2 border-transparent hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full`}
                  style={
                    { "--hover-border": ind.color } as React.CSSProperties
                  }
                >
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg"
                    style={{ backgroundColor: ind.color }}
                  >
                    <ind.icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {ind.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    {ind.desc}
                  </p>

                  <div className="space-y-2">
                    {ind.stats.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: ind.color }}
                        />
                        {s}
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-6 inline-flex items-center text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all"
                    style={{ color: ind.color }}
                  >
                    查看方案详情 →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
