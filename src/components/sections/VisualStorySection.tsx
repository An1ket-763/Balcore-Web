import HeroPlayer from "@/components/visualstory-section/HeroPlayer";
import StepsSection from "@/components/visualstory-section/StepsSection";
import CloserSection from "@/components/visualstory-section/CloserSection";
import StoryStyles from "@/components/visualstory-section/StoryStyles";

const VisualStorySection = () => {
  return (
    <>
      <StoryStyles />
      <section id="visual-story" className="mm-howitworks">
        <HeroPlayer />
        <StepsSection />
        <CloserSection />
      </section>
    </>
  );
};

export default VisualStorySection;
