"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  CalendarDays,
  CreditCard,
  QrCode,
  Star,
  Gift,
  Package,
  Heart,
  Newspaper,
  UserCog,
  ClipboardList,
  ScanLine,
  BarChart3,
  Wallet,
  MessageSquare,
  ToggleLeft,
  Users,
  Settings,
  Shield,
  FileSpreadsheet,
  CheckCircle2,
  ImageIcon,
  Clock,
  Megaphone,
  Lock,
  Activity,
  CreditCard as CreditCardIcon,
  type LucideIcon,
} from "lucide-react";
import FadeIn from "@/components/ui/FadeIn";
import SectionTitle from "@/components/ui/SectionTitle";

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface Tab {
  id: string;
  label: string;
  color: string;
  features: Feature[];
}

const tabs: Tab[] = [
  {
    id: "user",
    label: "用户端",
    color: "from-brand-400 to-brand-500",
    features: [
      { icon: User, title: "微信授权登录", desc: "一键微信登录，无需注册流程，自动获取头像昵称" },
      { icon: Search, title: "智能搜索与筛选", desc: "按距离、评分、订单量多维度排序，快速找到合适的服务者" },
      { icon: UserCog, title: "服务者详情", desc: "作品集、资质证书、服务评价，全方位了解服务者" },
      { icon: ClipboardList, title: "课程发现与分类", desc: "分类浏览、关键词搜索，支持多种布局模式" },
      { icon: CalendarDays, title: "日历预约", desc: "日历视图选择日期时段，实时显示剩余容量" },
      { icon: Settings, title: "动态表单", desc: "可配置化预约信息收集，灵活适配不同业务场景" },
      { icon: Package, title: "课程包/次卡", desc: "购买套餐享优惠，余额自动追踪，支持有效期管理" },
      { icon: CreditCard, title: "微信支付", desc: "微信支付V3标准接入，支持支付/退款全流程" },
      { icon: QrCode, title: "QR码签到", desc: "订单自动生成QR码，到场出示即刻完成签到" },
      { icon: Star, title: "评价打分", desc: "服务完成后星级评价、文字评论，赚取积分奖励" },
      { icon: Gift, title: "积分体系", desc: "签到/评价/消费/分享赚积分，积分可抵扣订单金额" },
      { icon: Heart, title: "收藏功能", desc: "收藏喜欢的服务者，随时查看，快速预约" },
      { icon: Newspaper, title: "资讯动态", desc: "平台公告、行业资讯、活动通知一站汇聚" },
      { icon: UserCog, title: "个人中心", desc: "资料编辑、订单管理、积分查看、套餐余额一站式管理" },
      { icon: Shield, title: "申请成为服务者", desc: "三步认证流程：身份→资质→服务，在线提交等待审核" },
    ],
  },
  {
    id: "coach",
    label: "服务端",
    color: "from-emerald-500 to-teal-500",
    features: [
      { icon: Shield, title: "入驻认证", desc: "三步申请：身份认证 + 资质上传 + 服务信息，支持驳回重提" },
      { icon: UserCog, title: "个人主页编辑", desc: "修改头像、简介、教学特点标签、案例作品" },
      { icon: ClipboardList, title: "课程排班管理", desc: "查看关联课程，管理时段和容量" },
      { icon: Activity, title: "订单追踪", desc: "按状态筛选：待核销/已完成/已过期，日统计和月统计" },
      { icon: ScanLine, title: "扫码核销", desc: "扫描用户QR码完成签到验证，防重复核销" },
      { icon: BarChart3, title: "收入仪表盘", desc: "总收入/已提现/可提现/退款扣除，月度明细" },
      { icon: CreditCardIcon, title: "银行卡管理", desc: "添加/管理银行卡信息，选择提现方式" },
      { icon: Wallet, title: "提现申请", desc: "微信钱包/银行卡提现，0.6%手续费，最低1元" },
      { icon: MessageSquare, title: "评价管理", desc: "查看用户评价、回复评论，维护服务口碑" },
      { icon: ToggleLeft, title: "身份切换", desc: "用户/服务者双身份自由切换，免密无感" },
    ],
  },
  {
    id: "admin",
    label: "管理端",
    color: "from-violet-500 to-purple-500",
    features: [
      { icon: Lock, title: "管理员登录", desc: "手机号+密码独立登录，角色权限控制" },
      { icon: BarChart3, title: "管理首页仪表盘", desc: "关键数据一览：用户/订单/收入/待审批" },
      { icon: Shield, title: "入驻审批", desc: "查看申请详情、资质证书，通过/驳回+原因" },
      { icon: Users, title: "服务者管理", desc: "列表查看、状态启停、专业筛选" },
      { icon: Settings, title: "佣金比例配置", desc: "可调整抽成比例，附详细变更历史记录" },
      { icon: BarChart3, title: "收入分析", desc: "按月查看服务者收入明细、提现状态、退款" },
      { icon: ClipboardList, title: "课程创建向导", desc: "7步引导式创建：教练→类型→信息→时长→定价→套餐→排班" },
      { icon: ClipboardList, title: "课程列表管理", desc: "排序权重、状态开关、教练筛选" },
      { icon: Clock, title: "时段管理", desc: "添加/编辑时段，设置容量上限，支持重复模板" },
      { icon: CheckCircle2, title: "签到记录", desc: "日期范围筛选，查看签到详情，导出考勤" },
      { icon: CreditCard, title: "订单管理", desc: "全局订单列表、状态筛选、订单详情" },
      { icon: Users, title: "用户管理", desc: "用户列表、详情查看、状态管理" },
      { icon: FileSpreadsheet, title: "数据导出", desc: "用户数据/签到记录一键导出Excel" },
      { icon: Megaphone, title: "新闻公告", desc: "创建/编辑新闻资讯，富文本图文内容管理" },
      { icon: ImageIcon, title: "轮播图管理", desc: "首页Banner图片管理，链接配置" },
      { icon: Users, title: "员工账号管理", desc: "创建/编辑管理员账号，密码管理" },
      { icon: Activity, title: "操作日志", desc: "记录所有管理操作，安全审计可追溯" },
    ],
  },
];

export default function FeaturesContent() {
  const [active, setActive] = useState(0);
  const tab = tabs[active];

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-600 to-brand-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <SectionTitle
              badge="完整功能清单"
              title="42+ 核心功能模块"
              subtitle="用户端 · 服务端 · 管理端三端协同，覆盖服务行业运营全链路"
              light
            />
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Tab Switcher */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-sm border border-gray-100">
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
                      layoutId="featureTab"
                      className={`absolute inset-0 bg-gradient-to-r ${t.color} rounded-xl`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">
                    {t.label}
                    <span className="ml-1.5 text-xs opacity-60">
                      ({t.features.length})
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Feature Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={tab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {tab.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="group bg-white rounded-xl p-5 border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${tab.color} shadow-md flex-shrink-0`}
                    >
                      <f.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">
                        {f.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
