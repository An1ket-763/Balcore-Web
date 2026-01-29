import "../App.css";
import NavBar from "@/components/sections/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import IntroSection from "@/components/sections/IntroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import VisionSection from "@/components/sections/VisionSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import AudienceSection from "@/components/sections/AudienceSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <HeroSection />
      <IntroSection />
      <ProblemSection />
      <VisionSection />
      <FeaturesSection />
      <AudienceSection />
      <PhilosophySection />
      <FooterSection />
    </div>
  );
};

export default Index;
