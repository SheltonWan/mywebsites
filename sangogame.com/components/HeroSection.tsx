import Image from 'next/image';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-sango-bg pt-16"
    >
      {/* Decorative radial glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-sango-gold opacity-5 blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-sango-red opacity-5 blur-3xl animate-float"
          style={{ animationDelay: '3s' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 max-w-3xl mx-auto">
        {/* Logo */}
        <div className="mb-6 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          <Image
            src="/assets/logo.png"
            alt="卧龙风云 Logo"
            width={120}
            height={120}
            priority
            className="rounded-2xl shadow-[0_8px_40px_rgba(212,168,83,0.25)]"
          />
        </div>

        {/* Title */}
        <h1
          className="font-heading font-black text-5xl sm:text-6xl md:text-7xl mb-4
            bg-gradient-to-r from-sango-gold via-sango-accent to-sango-gold
            bg-[length:200%_auto] bg-clip-text text-transparent
            animate-shimmer animate-fade-in-up"
          style={{ animationDelay: '150ms' }}
        >
          卧龙风云
        </h1>

        {/* Subtitle */}
        <p
          className="text-sango-text-dim text-lg sm:text-xl leading-relaxed mb-8 animate-fade-in-up"
          style={{ animationDelay: '300ms' }}
        >
          三国乱世，英雄辈出<br />
          你将以何人之姿，书写属于自己的史诗？
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-3 animate-fade-in-up"
          style={{ animationDelay: '450ms' }}
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
      </div>

      {/* Scroll hint arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
        <div className="w-5 h-5 border-r-2 border-b-2 border-sango-gold-dim rotate-45 animate-bounce-arr" />
      </div>
    </section>
  );
}
