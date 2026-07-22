import HeroPlayer from "@/features/visual-story/HeroPlayer";
import StepsSection from "@/features/visual-story/StepsSection";
import CloserSection from "@/features/visual-story/CloserSection";
import StoryStyles from "@/features/visual-story/StoryStyles";

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
