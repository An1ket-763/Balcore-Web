import "../App.css";
import NavBar from "@/components/sections/NavBar";
import MarqueeBanner from "@/components/sections/MarqueeBanner";
import HeroSection from "@/components/sections/HeroSection";
import TrustedBySection from "@/components/sections/TrustedBySection";
import IntroSection from "@/components/sections/IntroSection";
import StepsSection from "@/components/sections/StepsSection";
import ProblemSection from "@/components/sections/ProblemSection";
import VisionSection from "@/components/sections/VisionSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import BentoFeaturesSection from "@/components/sections/BentoFeaturesSection";
import AudienceSection from "@/components/sections/AudienceSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import PhilosophySection from "@/components/sections/PhilosophySection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar />
      <MarqueeBanner />
      <HeroSection />
      <TrustedBySection />
      <IntroSection />
      <StepsSection />
      <ProblemSection />
      <VisionSection />
      <FeaturesSection />
      <BentoFeaturesSection />
      <AudienceSection />
      <TestimonialsSection />
      <PhilosophySection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </div>
  );
};

export default Index;
