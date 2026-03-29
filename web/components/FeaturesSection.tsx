import FeatureCard from "@/components/ui/FeatureCard";
import { siteConfig } from "@/site.config";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">强大功能，一应俱全</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            从个人聊天到企业级通讯，iWithYou 提供完整的即时通讯解决方案
          </p>
        </div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {siteConfig.features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={i * 80}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
