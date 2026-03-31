import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Dumbbell,
  Scissors,
  GraduationCap,
  HeartPulse,
  Home,
  Zap,
  CheckCircle2,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface IndustryData {
  icon: LucideIcon;
  name: string;
  color: string;
  heroGradient: string;
  tagline: string;
  description: string;
  painPoints: { title: string; desc: string }[];
  solutions: { title: string; desc: string }[];
  highlights: string[];
}

const industries: Record<string, IndustryData> = {
  fitness: {
    icon: Dumbbell,
    name: "健身私教",
    color: "#FED202",
    heroGradient: "from-yellow-600 via-amber-500 to-yellow-400",
    tagline: "让健身预约像呼吸一样自然",
    description:
      "告别纸质排课表和微信群接龙，约享平台为健身房和独立私教提供全套数字化预约管理方案。",
    painPoints: [
      { title: "排课混乱", desc: "手写排课表频繁冲突，教练和学员摸不清时段，约课全靠微信反复沟通" },
      { title: "收入不透明", desc: "课时费用手工记账容易出错，教练对收入分成缺少信任感" },
      { title: "会员管理粗放", desc: "课程包、次卡余额靠人记，过期、退款缺乏系统化管理" },
    ],
    solutions: [
      { title: "日历排班 + 实时容量", desc: "教练线上设定时段和容量，学员日历视图一键约课，冲突自动检测" },
      { title: "分成自动结算", desc: "课后核销即解冻收入，佣金比例可配置，月度账单一目了然" },
      { title: "课程包 & 次卡系统", desc: "灵活套餐配置，余额自动扣减，有效期到期自动提醒" },
    ],
    highlights: [
      "1对1 / 小班课 / 团课多模式支持",
      "教练认证入驻审核流程",
      "扫码核销签到",
      "学员评价与排名系统",
      "微信支付无缝对接",
      "上课前自动消息提醒",
    ],
  },
  beauty: {
    icon: Scissors,
    name: "美容美发",
    color: "#FF6B9D",
    heroGradient: "from-pink-600 via-rose-500 to-pink-400",
    tagline: "告别占线预约，美丽不等待",
    description:
      "帮助美容院、美发店实现在线预约和技师管理数字化，提升客户体验和门店运营效率。",
    painPoints: [
      { title: "预约占线", desc: "高峰期电话预约占线严重，客户流失率高" },
      { title: "技师考评难", desc: "服务质量缺乏量化标准，优秀技师难以脱颖而出" },
      { title: "会员卡管理混乱", desc: "储值卡、次卡余额查询不便，消费记录不透明" },
    ],
    solutions: [
      { title: "24 小时在线预约", desc: "客户随时自助选项目、选技师、选时段，告别电话排队" },
      { title: "评价质量评分", desc: "客户完成服务后打分评价，技师排名公开透明" },
      { title: "次卡套餐管理", desc: "一键购买套餐，余额实时可查，消费自动扣减" },
    ],
    highlights: [
      "技师列表与专业展示",
      "项目分类浏览与搜索",
      "实时在线预约",
      "服务评价沉淀口碑",
      "微信消息到店提醒",
      "收入统计与提现",
    ],
  },
  education: {
    icon: GraduationCap,
    name: "教育培训",
    color: "#4A90D9",
    heroGradient: "from-blue-700 via-blue-500 to-indigo-400",
    tagline: "让知识的传递更高效",
    description:
      "为教育培训机构和独立讲师提供课时管理、预约排班、课后评价的一站式数字化平台。",
    painPoints: [
      { title: "试课转化低", desc: "试课预约流程繁琐，家长意向冷却快" },
      { title: "课时费结算复杂", desc: "讲师课酬按课时计算，手工统计效率低且易出错" },
      { title: "缺乏反馈渠道", desc: "课后沟通依赖微信群，家长反馈难以系统化沉淀" },
    ],
    solutions: [
      { title: "灵活课程包售卖", desc: "试听课、正式课、寒暑假班均可配置为课程包，家长一键购买" },
      { title: "自动课时扣减结算", desc: "核销即扣减课时并计入讲师收入，月度自动生成结算报表" },
      { title: "评价反馈闭环", desc: "课后自动推送评价邀请，讲师可回复，形成良性反馈" },
    ],
    highlights: [
      "课程分类与难度标注",
      "课程时长 & 适合人群展示",
      "课程包灵活购买",
      "课后评价与讲师回复",
      "积分体系激励学习",
      "数据导出便于分析",
    ],
  },
  healthcare: {
    icon: HeartPulse,
    name: "医疗健康",
    color: "#00B894",
    heroGradient: "from-emerald-700 via-green-500 to-teal-400",
    tagline: "就医预约，省时省心",
    description:
      "为诊所、理疗馆、健康管理中心提供在线预约挂号和到诊管理解决方案。",
    painPoints: [
      { title: "挂号排队久", desc: "到院排队挂号浪费大量时间，患者体验差" },
      { title: "预约管理落后", desc: "电话本+Excel管理模式效率低，易出现时段冲突" },
      { title: "费用透明度低", desc: "患者对诊疗费用缺少实时了解，信任感不足" },
    ],
    solutions: [
      { title: "在线预约分诊", desc: "按科室/医生/时段线上挂号，错峰就诊减少等待" },
      { title: "QR码到诊核销", desc: "患者到院扫码签到，系统自动确认到诊状态" },
      { title: "费用明细推送", desc: "诊疗完成后自动推送费用明细和支付通知" },
    ],
    highlights: [
      "医生/理疗师资质展示",
      "科室分类预约",
      "到诊扫码确认",
      "复诊消息提醒",
      "患者评价系统",
      "数据报表导出",
    ],
  },
  housekeeping: {
    icon: Home,
    name: "家政服务",
    color: "#FF9F43",
    heroGradient: "from-orange-600 via-amber-500 to-orange-400",
    tagline: "品质家政，一键到家",
    description:
      "解决家政行业阿姨找不到、技能难验证、服务评价无沉淀的核心痛点。",
    painPoints: [
      { title: "阿姨技能难验证", desc: "服务者资质缺少系统化认证，雇主选择困难" },
      { title: "服务评价无沉淀", desc: "口碑传播靠口口相传，优质服务者缺乏曝光" },
      { title: "收款对账人工化", desc: "工资结算靠手工计算，耗时且易产生纠纷" },
    ],
    solutions: [
      { title: "资质认证流程", desc: "三步入驻认证：身份核实→技能证书→服务范围，保障服务品质" },
      { title: "评价沉淀体系", desc: "每次服务后客户评价打分，口碑排名公开透明" },
      { title: "自动结算分成", desc: "服务核销后收入自动计算，平台/服务者分成一键提现" },
    ],
    highlights: [
      "按距离/评分筛选阿姨",
      "上门时间灵活预约",
      "服务到达扫码核销",
      "真实评价建立信任",
      "课程包适配计时计次",
      "微信消息上门提醒",
    ],
  },
  youth: {
    icon: Zap,
    name: "青少年体能",
    color: "#00C9A7",
    heroGradient: "from-teal-600 via-cyan-500 to-teal-400",
    tagline: "让孩子的成长看得见",
    description:
      "为青少年体适能机构和教练提供约课、签到、评价的全流程数字化管理。",
    painPoints: [
      { title: "家长约课耗时", desc: "家长微信群约课，消息被淹，经常漏约" },
      { title: "教练排班冲突", desc: "多教练、多课程排班全靠人力协调，容易出错" },
      { title: "训练效果难追踪", desc: "缺少系统化的课后反馈，家长对孩子进步缺少感知" },
    ],
    solutions: [
      { title: "家长一键约课", desc: "小程序直接选课约时段，告别微信群接龙的低效模式" },
      { title: "智能排班容量", desc: "系统自动管理时段容量，防止超员和冲突" },
      { title: "签到 + 评价链路", desc: "签到后自动邀请评价，教练可回复反馈训练表现" },
    ],
    highlights: [
      "亲子账号约课体验",
      "小班课/团课容量控制",
      "签到打卡记录留存",
      "教练评价与排名",
      "课程包灵活购买",
      "上课前消息提醒",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(industries).map((slug) => ({ industry: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>;
}): Promise<Metadata> {
  const { industry } = await params;
  const data = industries[industry];
  if (!data) return { title: "方案未找到" };
  return {
    title: `${data.name}解决方案`,
    description: data.description,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const data = industries[industry];
  if (!data) notFound();

  const Icon = data.icon;

  return (
    <>
      {/* Hero */}
      <section
        className={`relative pt-32 pb-20 bg-gradient-to-br ${data.heroGradient}`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div
              className="flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-sm text-white/60 font-medium">
                行业方案
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">
                {data.name}
              </h1>
            </div>
          </div>
          <p className="text-xl text-white/80 font-medium mb-2">
            {data.tagline}
          </p>
          <p className="text-white/50 max-w-2xl">{data.description}</p>
        </div>
      </section>

      {/* Pain Points & Solutions */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Pain Points */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <span className="text-2xl">😰</span> 行业痛点
              </h2>
              <div className="space-y-6">
                {data.painPoints.map((p, i) => (
                  <div
                    key={i}
                    className="bg-red-50 rounded-xl p-5 border border-red-100"
                  >
                    <h4 className="font-bold text-red-800 mb-1">{p.title}</h4>
                    <p className="text-sm text-red-600/70">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <span className="text-2xl">✨</span> 约享方案
              </h2>
              <div className="space-y-6">
                {data.solutions.map((s, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl p-5 border-2 shadow-sm"
                    style={{ borderColor: data.color + "40" }}
                  >
                    <h4 className="font-bold text-gray-900 mb-1">{s.title}</h4>
                    <p className="text-sm text-gray-500">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            行业特色功能
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {data.highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white rounded-xl px-5 py-4 border border-gray-100"
              >
                <CheckCircle2
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: data.color }}
                />
                <span className="text-sm font-medium text-gray-700">{h}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className={`py-20 bg-gradient-to-br ${data.heroGradient}`}
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            开始你的{data.name}数字化之旅
          </h2>
          <p className="text-white/60 mb-8">
            无需服务器，微信云开发快速部署，30天上线
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 font-bold text-gray-900 bg-white rounded-2xl shadow-xl hover:scale-105 transition-all"
            >
              免费体验
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center px-8 py-4 font-semibold text-white bg-white/10 border border-white/25 rounded-2xl hover:bg-white/20 transition-all"
            >
              查看其他方案
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
