import "../App.css";
import NavBar from "@/components/sections/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import LiquidityEngineSection from "@/components/sections/LiquidityEngineSection";
import VisualStorySection from "@/components/sections/VisualStorySection";
import VisionSection from "@/components/sections/VisionSection";
import ProtocolSection from "@/components/sections/ProtocolSection";
import TechnologySection from "@/components/sections/TechnologySection";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <NavBar />
      <HeroSection />
      <WhatWeDoSection />
      <LiquidityEngineSection />
      <VisualStorySection />
      <VisionSection />
      <ProtocolSection />
      <TechnologySection />
      <Footer />
    </div>
  );
};

export default Index;
