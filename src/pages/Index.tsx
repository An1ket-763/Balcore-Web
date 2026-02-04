import "../App.css";
import NavBar from "@/components/sections/NavBar";
import MarqueeBanner from "@/components/sections/MarqueeBanner";
import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import VisionSection from "@/components/sections/VisionSection";
import AudienceSection from "@/components/sections/AudienceSection";
import FutureSection from "@/components/sections/FutureSection";
import StatusSection from "@/components/sections/StatusSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar />
      <MarqueeBanner />
      <HeroSection />
      <IntroSection />
      <ProblemSection />
      <PhilosophySection />
      <VisionSection />
      <AudienceSection />
      <FutureSection />
      <StatusSection />
      <CTASection />
    </div>
  );
};

export default Index;
