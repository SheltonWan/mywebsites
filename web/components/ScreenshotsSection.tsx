import PhoneMockup from "@/components/ui/PhoneMockup";
import { siteConfig } from "@/site.config";

export default function ScreenshotsSection() {
  return (
    <section id="screenshots" className="py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">精心设计的界面</h2>
          <p className="text-gray-500">简洁直观，让沟通更自然</p>
        </div>

        {/* Horizontal scroll strip */}
        <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar snap-x snap-mandatory">
          {siteConfig.images.screenshots.map((shot, i) => (
            <div
              key={shot.src}
              className="flex-none snap-center flex flex-col items-center gap-3 animate-fade-up"
              style={{ animationDelay: `${i * 100}ms`, animationFillMode: "both" }}
            >
              <PhoneMockup src={shot.src} alt={shot.alt} />
              <p className="text-xs text-gray-400">{shot.alt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
