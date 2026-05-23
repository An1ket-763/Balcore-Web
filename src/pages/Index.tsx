import "../App.css";
import NavBar from "@/components/sections/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import VisualStorySection from "@/components/sections/VisualStorySection";
import WhyBalcoreSection from "@/components/sections/WhyBalcoreSection";
import WhatBalcoreDoesSection from "@/components/sections/WhatBalcoreDoesSection";
import SupportedAssetsSection from "@/components/sections/SupportedAssetsSection";
import BuiltOnAvalancheSection from "@/components/sections/BuiltOnAvalancheSection";
import CTASection from "@/components/sections/CTASection";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import LiquidityEngineSection from "@/components/sections/LiquidityEngineSection";
import ProtocolSection from "@/components/sections/ProtocolSection";
import TechnologySection from "@/components/sections/TechnologySection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <WhatWeDoSection />
      <LiquidityEngineSection />
      <ProtocolSection />
      <TechnologySection />
      {/* <CTASection /> */}
    </div>
  );
};

export default Index;
