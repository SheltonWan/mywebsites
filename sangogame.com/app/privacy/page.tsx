import { PROMO_CONFIG } from '@/lib/config';
import { ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '隐私政策 — 卧龙风云',
  description: '卧龙风云隐私政策：我们如何处理您的数据。卧龙风云不收集任何个人信息，游戏完全离线运行。',
};

export default function PrivacyPage() {
  const { contact: { email } } = PROMO_CONFIG;
  return (
    <div className="max-w-3xl mx-auto px-6 pt-24 pb-20">

      <h1 className="font-heading text-3xl font-bold text-sango-gold mb-2">隐私政策</h1>
      <p className="text-sm text-sango-text-dim mb-10 pb-6 border-b border-sango-border">
        最后更新：2026年3月19日&nbsp;&nbsp;|&nbsp;&nbsp;适用版本：全平台（iOS / Android / macOS / Windows / Web）
      </p>

      {/* Summary highlight */}
      <div className="bg-sango-card border-l-4 border-sango-gold border border-sango-border rounded-lg px-6 py-4 mb-10">
        <p className="text-sango-text font-semibold flex items-start gap-2">
          <ShieldCheck className="w-5 h-5 text-sango-gold flex-none mt-0.5" />
          <span>简短版本：<strong>卧龙风云不收集您的任何个人信息</strong>
          。游戏完全在您的设备上离线运行，所有数据存于本地，我们无法访问。
          </span>
        </p>
      </div>

      <Section title="1. 我们收集哪些数据？">
        <p>我们<strong>不收集任何</strong>涉及您个人身份的数据，包括但不限于：</p>
        <BulletList items={[
          '姓名、电子邮件地址、电话号码',
          '设备标识符（IDFA、GAID、设备指纹等）',
          '地理位置信息',
          '联系人、日历、摄像头、麦克风等权限数据',
          '使用行为分析、崩溃上报、广告追踪',
        ]} />
      </Section>

      <Section title="2. 本地存储了哪些数据？">
        <p>游戏会在您的<strong>本地设备</strong>上保存以下内容，这些数据<strong>不会离开您的设备</strong>：</p>
        <BulletList items={[
          '游戏进度存档（势力数据、城池状态、武将信息等游戏状态）',
          '语言偏好设置（简体中文 / 繁体中文 / 英文 / 日文）',
        ]} />
        <p>您可以随时通过卸载应用来删除所有本地数据。</p>
      </Section>

      <Section title="3. 卧龙风云是否联网？">
        <p>
          卧龙风云是<strong>完全离线</strong>的单机游戏。游戏运行过程中不发起任何网络请求，
          不与任何服务器通信，无云存档、无账号登录、无广告加载。
        </p>
        <p>
          唯一涉及网络的场景是：您主动在应用商店下载或更新游戏，该过程由
          App Store / Google Play 等平台负责，不受本政策约束。
        </p>
      </Section>

      <Section title="4. 第三方 SDK">
        <p>
          我们未集成任何广告 SDK、数据分析 SDK 或用户追踪 SDK。
          游戏使用的第三方库均为开源工具类库（游戏引擎、音频播放、本地存储等），
          不具备网络数据收集能力。主要依赖如下：
        </p>
        <BulletList items={[
          'Flame：游戏引擎（开源，无数据收集）',
          'audioplayers：本地音频播放（无网络功能）',
          'shared_preferences / path_provider：本地偏好与文件路径访问（无网络功能）',
          'package_info_plus：仅读取应用版本号用于界面显示（无数据上报）',
        ]} />
      </Section>

      <Section title="5. 儿童隐私">
        <p>
          鉴于本游戏不收集任何数据，我们无法也不会收集任何 13 岁以下儿童的个人信息。
          本游戏内容适合全年龄段玩家。
        </p>
      </Section>

      <Section title="6. 隐私政策的变更">
        <p>
          若本政策发生重大变更，我们将在本页面更新"最后更新"日期，并在版本更新说明中进行告知。
          继续使用游戏即视为接受最新政策。
        </p>
      </Section>

      <Section title="7. 联系我们">
        <p>如果您对本隐私政策有任何疑问，欢迎通过以下方式联系我们：</p>
        <div className="bg-sango-card border border-sango-border rounded-xl px-6 py-5 mt-2">
          <p className="text-sango-text font-semibold mb-2">卧龙风云开发团队</p>
          <a href={`mailto:${email}`} className="text-sango-gold font-semibold hover:underline">
            {email}
          </a>
        </div>
      </Section>

      <div className="mt-12 pt-8 border-t border-sango-border">
        <Link href="/" className="text-sango-gold hover:underline text-sm">← 返回主页</Link>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="font-heading text-lg font-bold text-sango-gold mt-8 mb-3">{title}</h2>
      <div className="text-sango-text-dim space-y-3 text-sm leading-relaxed">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1 my-2">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="text-sango-gold-dim mt-0.5">·</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
