import "../App.css";
import NavBar from "@/components/sections/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import VisualStorySection from "@/components/sections/VisualStorySection";
import VisionSection from "@/components/sections/VisionSection";
import TryItYourselfSection from "@/components/sections/TryItYourselfSection";
import TechnologySection from "@/components/sections/TechnologySection";
import GrowingSection from "@/components/sections/GrowingSection";
import Footer from "@/components/sections/Footer";
import UiView from "@/components/Ui-section/UiView";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      <NavBar />
      <HeroSection />
      <WhatWeDoSection />
      <UiView />
      <TryItYourselfSection />
      <VisualStorySection />
      <VisionSection />
      <TechnologySection />
      <GrowingSection />
      <Footer />
    </div>
  );
};

export default Index;