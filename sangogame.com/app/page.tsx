import FaqAccordion from '@/components/FaqAccordion';
import FeaturesGrid from '@/components/FeaturesGrid';
import HeroSection from '@/components/HeroSection';
import OfficersCarousel from '@/components/OfficersCarousel';
import PlatformsGrid from '@/components/PlatformsGrid';
import RevealObserver from '@/components/RevealObserver';
import ScenariosGrid from '@/components/ScenariosGrid';
import ScreenshotSlideshow from '@/components/ScreenshotSlideshow';
import StatsSection from '@/components/StatsSection';
import WorldMap from '@/components/WorldMap';

export default function HomePage() {
  return (
    <>
      {/* Activates .reveal scroll animations — client component, renders nothing */}
      <RevealObserver />

      {/* 1. 全屏英雄区 */}
      <HeroSection />

      {/* 2. 截图轮播 — 游戏画面一览 */}
      <ScreenshotSlideshow />

      {/* 3. 核心特色 */}
      <FeaturesGrid />

      {/* 4. 剧本介绍 */}
      <ScenariosGrid />

      {/* 5. 武将展示 */}
      <OfficersCarousel />

      {/* 6. 沙盘地图 */}
      <WorldMap />

      {/* 7. 数据亮点 */}
      <StatsSection />

      {/* 8. 下载 / 游玩入口 */}
      <PlatformsGrid />

      {/* 9. 常见问题 */}
      <FaqAccordion />
    </>
  );
}
