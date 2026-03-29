import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import StatsBanner from "@/components/StatsBanner";
import FeaturesSection from "@/components/FeaturesSection";
import ScreenshotsSection from "@/components/ScreenshotsSection";
import BusinessSection from "@/components/BusinessSection";
import DownloadSection from "@/components/DownloadSection";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsBanner />
        <FeaturesSection />
        <ScreenshotsSection />
        <BusinessSection />
        <DownloadSection />
      </main>
      <Footer />
    </>
  );
}
