import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import FeatureHighlights from "@/components/home/FeatureHighlights";
import ThreeEndShowcase from "@/components/home/ThreeEndShowcase";
import IndustrySolutions from "@/components/home/IndustrySolutions";
import WorkflowTimeline from "@/components/home/WorkflowTimeline";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <FeatureHighlights />
      <ThreeEndShowcase />
      <IndustrySolutions />
      <WorkflowTimeline />
      <CTASection />
    </>
  );
}
