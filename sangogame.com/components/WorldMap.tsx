import { Map } from 'lucide-react';
import Image from 'next/image';

const CITY_TYPES = [
  { label: '大都市', desc: '战略核心，资源产出最丰，驻兵上限最高，得之可威慑四方' },
  { label: '中都市', desc: '重要战略节点，资源丰富，攻防兼备的必争之地' },
  { label: '小都市', desc: '偏远边缘城池，资源有限，适合作为扩张跳板' },
  { label: '关卡',   desc: '险要地形，守方防御系数额外提升 50%，攻克须遣大军' },
  { label: '战场',   desc: '历史著名战役地点，控制范围内己方兵力获得额外加成' },
];

export default function WorldMap() {
  return (
    <section id="world" className="py-20 bg-sango-surface">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-heading text-3xl font-bold text-sango-gold mb-3 flex items-center justify-center gap-2">
          <Map className="w-8 h-8 flex-none" />
          沙盘天下
        </h2>
        <p className="text-center text-sango-text-dim mb-12">
          以全局视角俯瞰三国大地，城市、关隘、港口尽在掌握
        </p>

        <div className="flex flex-col lg:flex-row gap-10 items-center">
          {/* Map image */}
          <div className="flex-1 relative min-h-[300px] w-full rounded-2xl overflow-hidden
            border border-sango-border shadow-[0_0_40px_rgba(212,168,83,0.1)]">
            <Image
              src="/assets/images/map_bk.jpg"
              alt="三国战略世界地图"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          {/* City types legend */}
          <div className="flex-none w-full lg:w-72 space-y-4">
            {CITY_TYPES.map(({ label, desc }) => (
              <div
                key={label}
                className="flex items-start gap-3 bg-sango-card border border-sango-border
                  rounded-xl px-5 py-4 hover:border-sango-gold transition-colors duration-150"
              >
                <span className="font-heading font-bold text-sango-gold mt-0.5 flex-none">
                  [{label}]
                </span>
                <p className="text-sango-text-dim text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
