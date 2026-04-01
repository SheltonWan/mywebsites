export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center text-center overflow-hidden pt-16"
    >
      {/* SEO title */}
      <h1 className="sr-only">卧龙风云 — 三国乱世策略游戏</h1>

      {/* Responsive background: vertical image on mobile, horizontal on desktop */}
      <picture className="absolute inset-0 block w-full h-full">
        <source media="(max-width: 767px)" srcSet="/assets/web_bg_v.webp" type="image/webp" />
        <img
          src="/assets/web_bg.webp"
          alt="卧龙风云 — 三国乱世，英雄逐鹿"
          className="absolute inset-0 w-full h-full object-cover object-center md:object-top"
          fetchPriority="high"
        />
      </picture>

      {/* Gradient overlay: transparent at top, increasingly dark toward bottom */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/90"
        aria-hidden="true"
      />

      {/* Push intro text to lower half */}
      <div className="flex-1" />

      {/* Game intro text block with frosted-glass mask */}
      <div
        className="relative z-10 max-w-2xl w-full px-6 mb-8 animate-fade-in-up"
        style={{ animationDelay: '150ms' }}
      >
        <div className="bg-black/50 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/10 text-left sm:text-center">
          <p className="text-white/90 leading-relaxed text-sm sm:text-base">
            卧龙风云是一款以三国乱世为舞台的深度策略游戏。你将执掌群雄之一，在 190 余座历史城池构成的宏大战略版图上，统筹内政、外交与征战，招募名将、经营城池、调度兵力，在瞬息万变的局势中争夺天下。
          </p>
          <p className="text-white/80 leading-relaxed text-sm sm:text-base mt-4">
            骑兵、弓兵、枪兵相互克制，野战、攻城、遭遇战层层交织，AI 势力也会自主发展、结盟、出兵，让每一次决策都真正影响战局走向。
          </p>
        </div>
      </div>

      {/* CTA buttons */}
      <div
        className="relative z-10 flex flex-col sm:flex-row gap-3 mb-24 animate-fade-in-up"
        style={{ animationDelay: '300ms' }}
      >
        <a
          href="#screenshots"
          className="px-8 py-3 rounded-lg font-semibold text-sango-bg
            bg-gradient-to-r from-sango-gold to-sango-gold-dim
            hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(212,168,83,0.35)]
            transition-all duration-200"
        >
          探索游戏 ↓
        </a>
        <a
          href="#platforms"
          className="px-8 py-3 rounded-lg font-semibold text-sango-gold
            border border-sango-gold-dim
            hover:bg-sango-gold/10 hover:-translate-y-0.5
            transition-all duration-200"
        >
          立即下载
        </a>
      </div>

      {/* Scroll hint arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
        <div className="w-5 h-5 border-r-2 border-b-2 border-sango-gold-dim rotate-45 animate-bounce-arr" />
      </div>
    </section>
  );
}
