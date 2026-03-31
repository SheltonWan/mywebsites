import { PROMO_CONFIG } from '@/lib/config';
import { BookOpen } from 'lucide-react';
import Image from 'next/image';

export default function ScenariosGrid() {
  const { scenarios } = PROMO_CONFIG;

  return (
    <section id="scenarios" className="py-20 bg-sango-bg">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-heading text-3xl font-bold text-sango-gold mb-3 flex items-center justify-center gap-2">
          <BookOpen className="w-8 h-8 flex-none" />
          历史剧本
        </h2>
        <p className="text-center text-sango-text-dim mb-12">四大经典历史节点，再现波澜壮阔的三国风云</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {scenarios.map((sc, i) => (
            <article
              key={sc.title}
              className="reveal bg-sango-card border border-sango-border rounded-xl overflow-hidden
                hover:-translate-y-1 hover:border-sango-gold-dim hover:shadow-[0_12px_40px_rgba(0,0,0,.4)]
                transition-all duration-300 group"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Scenario image */}
              <div className="relative w-full aspect-video overflow-hidden">
                <Image
                  src={`/assets/images/${sc.image}`}
                  alt={sc.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sango-card/90 to-transparent" />
                <span className="absolute bottom-2 left-3 text-xs font-semibold text-sango-gold-dim tracking-widest uppercase">
                  {sc.chapter}
                </span>
              </div>

              {/* Text */}
              <div className="p-5">
                <h3 className="font-heading text-xl font-bold text-sango-gold mb-1">{sc.title}</h3>
                <div className="text-xs text-sango-text-dim mb-3">{sc.date}</div>
                <p className="text-sm text-sango-text-dim leading-relaxed">{sc.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
