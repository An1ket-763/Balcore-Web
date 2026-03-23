import "../App.css";
import NavBar from "@/components/sections/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import VisualStorySection from "@/components/sections/VisualStorySection";
import WhyBalcoreSection from "@/components/sections/WhyBalcoreSection";
import WhatBalcoreDoesSection from "@/components/sections/WhatBalcoreDoesSection";
import SupportedAssetsSection from "@/components/sections/SupportedAssetsSection";
import BuiltOnAvalancheSection from "@/components/sections/BuiltOnAvalancheSection";
import CTASection from "@/components/sections/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <VisualStorySection />
      <WhyBalcoreSection />
      <WhatBalcoreDoesSection />
      <SupportedAssetsSection />
      <BuiltOnAvalancheSection />
      <CTASection />
    </div>
  );
};

export default Index;
