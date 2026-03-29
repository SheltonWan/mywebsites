import { siteConfig } from "@/site.config";

export default function StatsBanner() {
  return (
    <section className="bg-brand-500 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {siteConfig.stats.map((stat) => (
            <div key={stat.label} className="animate-fade-up">
              <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
              <p className="text-brand-100 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
