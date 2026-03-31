'use client';

import { PROMO_CONFIG } from '@/lib/config';
import { Users } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

// Officer stats — displayed when an officer card is selected
const OFFICER_STATS: Record<string, { force: number; lead: number; intel: number; politics: number; title: string }> = {
  '曹操':  { force: 72, lead: 97, intel: 92, politics: 98, title: '魏王' },
  '刘备':  { force: 65, lead: 82, intel: 75, politics: 88, title: '蜀汉昭烈帝' },
  '孙权':  { force: 60, lead: 80, intel: 85, politics: 90, title: '吴大帝' },
  '诸葛亮': { force: 38, lead: 90, intel: 99, politics: 95, title: '蜀汉丞相' },
  '关羽':  { force: 98, lead: 92, intel: 72, politics: 65, title: '武圣' },
  '张飞':  { force: 97, lead: 82, intel: 55, politics: 48, title: '燕人张翼德' },
  '赵云':  { force: 96, lead: 88, intel: 78, politics: 70, title: '常山赵子龙' },
  '吕布':  { force: 99, lead: 68, intel: 50, politics: 42, title: '三国第一猛将' },
  '周瑜':  { force: 60, lead: 92, intel: 95, politics: 88, title: '东吴大都督' },
  '司马懿': { force: 52, lead: 90, intel: 98, politics: 96, title: '晋宣帝' },
  '马超':  { force: 96, lead: 85, intel: 60, politics: 50, title: '锦马超' },
  '黄忠':  { force: 92, lead: 78, intel: 62, politics: 58, title: '汉寿亭侯' },
  '魏延':  { force: 90, lead: 80, intel: 65, politics: 55, title: '征西大将军' },
  '庞统':  { force: 40, lead: 78, intel: 96, politics: 85, title: '凤雏' },
  '夏侯惇': { force: 88, lead: 82, intel: 60, politics: 58, title: '独眼将军' },
  '张辽':  { force: 89, lead: 90, intel: 78, politics: 68, title: '威震逍遥津' },
  '徐庶':  { force: 55, lead: 72, intel: 90, politics: 80, title: '单福' },
  '荀彧':  { force: 30, lead: 70, intel: 96, politics: 98, title: '王佐之才' },
  '贾诩':  { force: 28, lead: 60, intel: 99, politics: 90, title: '毒士' },
  '孙策':  { force: 95, lead: 90, intel: 72, politics: 72, title: '小霸王' },
  '夏侯渊': { force: 85, lead: 86, intel: 62, politics: 55, title: '虎步关右' },
  '许褚':  { force: 95, lead: 68, intel: 38, politics: 30, title: '虎痴' },
  '张郃':  { force: 84, lead: 88, intel: 75, politics: 60, title: '鹰扬将军' },
  '徐晃':  { force: 82, lead: 86, intel: 72, politics: 62, title: '白马义从' },
};

const ATTR_LABELS = [
  { key: 'force',    label: '武力',  desc: '影响战斗伤害' },
  { key: 'lead',     label: '统率',  desc: '影响领兵能力' },
  { key: 'intel',    label: '智力',  desc: '影响策略效果' },
  { key: 'politics', label: '政治',  desc: '影响内政外交' },
] as const;

export default function OfficersCarousel() {
  const { officers, officerImageBasePath } = PROMO_CONFIG;
  const [selected, setSelected] = useState<string | null>(null);
  const stats = selected ? OFFICER_STATS[selected] : null;

  return (
    <section id="officers" className="py-20 bg-sango-surface">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-heading text-3xl font-bold text-sango-gold mb-3 flex items-center justify-center gap-2">
          <Users className="w-8 h-8 flex-none" />
          名将风云
        </h2>
        <p className="text-center text-sango-text-dim mb-10">
          点击武将查看详情，数十位三国名将等你招募麾下
        </p>

        {/* Carousel */}
        <div
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory
            scrollbar-thin scrollbar-thumb-sango-gold-dim scrollbar-track-transparent"
        >
          {officers.map((name) => (
            <button
              key={name}
              onClick={() => setSelected(selected === name ? null : name)}
              className={`flex-none snap-start flex flex-col items-center w-32 cursor-pointer group
                transition-transform duration-200 ${selected === name ? 'scale-105' : 'hover:-translate-y-1'}`}
            >
              <div className={`relative w-20 h-20 rounded-full overflow-hidden mb-2
                border-2 transition-colors duration-200
                ${selected === name ? 'border-sango-gold shadow-[0_0_16px_rgba(212,168,83,0.5)]' : 'border-sango-border group-hover:border-sango-gold-dim'}`}
              >
                <Image
                  src={`${officerImageBasePath}${name}.png`}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="80px"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
              <span className={`font-heading text-sm font-semibold transition-colors
                ${selected === name ? 'text-sango-gold' : 'text-sango-text group-hover:text-sango-gold-dim'}`}
              >
                {name}
              </span>
            </button>
          ))}
        </div>

        {/* Stats panel — shown when an officer is selected */}
        {selected && stats && (
          <div className="mt-8 bg-sango-card border border-sango-border rounded-xl p-6
            flex flex-col sm:flex-row gap-6 items-center animate-fade-in-up">
            {/* Avatar */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-sango-gold flex-none
              shadow-[0_0_24px_rgba(212,168,83,0.3)]">
              <Image
                src={`${officerImageBasePath}${selected}.png`}
                alt={selected}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="font-heading text-2xl font-bold text-sango-gold">{selected}</div>
              <div className="text-sm text-sango-text-dim mb-4">{stats.title}</div>

              {/* Attribute bars */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {ATTR_LABELS.map(({ key, label, desc }) => {
                  const val = stats[key];
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-sango-text font-semibold">{label}</span>
                        <span className="text-sango-gold font-bold">{val}</span>
                      </div>
                      <div className="h-1.5 bg-sango-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-sango-gold to-sango-accent rounded-full"
                          style={{ width: `${val}%` }}
                        />
                      </div>
                      <div className="text-xs text-sango-text-dim mt-0.5">{desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
