import { Award, Brain, Landmark, Map, Swords, Users } from 'lucide-react';
import type { ReactNode } from 'react';

const IC = 'w-8 h-8 text-sango-gold';

const FEATURES: { icon: ReactNode; title: string; desc: string }[] = [
  {
    icon: <Landmark className={IC} />,
    title: '势力经营',
    desc: '统领多座城池，管理资金与预备兵力（骑兵/弓兵/枪兵）。派遣武将执行内政任务，发展城池生产力与驻防兵力。首都失守将触发迁都机制。',
  },
  {
    icon: <Award className={IC} />,
    title: '武将系统',
    desc: '每位武将拥有武力、统率、智力、政治四项核心属性。武将可处于在职、在野、被俘、待登场等状态，通过招募、俘虏、策反等方式改变阵营。',
  },
  {
    icon: <Swords className={IC} />,
    title: '军事系统',
    desc: '出征武将率领六部队阵型（主将/前锋/左翼/右翼/左备/右备），骑兵、弓兵、枪兵三兵种相克。支持野战与攻守城两种战斗模式，行军可触发遭遇战。',
  },
  {
    icon: <Users className={IC} />,
    title: '外交系统',
    desc: '派遣武将执行示好、结盟、修复关系三类外交任务。任务成功率受武将属性、距离、关系值及资金综合影响。支持宣战、停战、请求协战等行动。',
  },
  {
    icon: <Brain className={IC} />,
    title: 'AI 系统',
    desc: '非玩家势力由 AI 自主决策，分为内政、外交、军事三大模块。AI 拥有激进/保守/平衡三种个性，以及简单/普通/困难三档难度。',
  },
  {
    icon: <Map className={IC} />,
    title: '三国地图',
    desc: '超过 150 座历史城池，覆盖中原、江东、荆州、益州、关中、辽东等核心区域。城池间通过道路网络连接，支持寻路与行军路径规划。',
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-20 bg-sango-surface">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-heading text-3xl font-bold text-sango-gold mb-3 flex items-center justify-center gap-2">
          <Swords className="w-8 h-8 flex-none" />
          核心玩法
        </h2>
        <p className="text-center text-sango-text-dim mb-12">六大系统深度交织，策略无穷</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <article
              key={f.title}
              className="reveal bg-sango-card border border-sango-border rounded-xl p-7
                relative overflow-hidden
                hover:-translate-y-1 hover:border-sango-gold-dim hover:shadow-[0_12px_40px_rgba(0,0,0,.4)]
                transition-all duration-300 group"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5
                bg-gradient-to-r from-sango-gold to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="mb-4">{f.icon}</div>
              <h3 className="font-heading text-lg font-bold text-sango-gold mb-2">{f.title}</h3>
              <p className="text-sango-text-dim text-sm leading-relaxed">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
