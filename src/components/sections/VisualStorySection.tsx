import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import MarketBackground from "@/components/backgrounds/MarketBackground";

const videos = [
  {
    title: "Fragmented Liquidity",
    description: "A large portion of DeFi liquidity sits idle, waiting for volume or incentives.",
    src: "/videos/v1-fragmented.mp4",
  },
  {
    title: "Orchestration Layer",
    description: "BalCore introduces an orchestration layer that helps capital move with purpose, adapting as conditions change.",
    src: "/videos/v2-orchestration.mp4",
  },
  {
    title: "Coordinated Yield",
    description: "The result is liquidity that stays active and productive over time.",
    src: "/videos/v3-coordinated.mp4",
  },
];

const VisualStorySection = () => {
  return (
    <section id="visual-story" className="border-t border-border relative section-animated-bg">
      <MarketBackground />

      <div className="text-center py-16 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Eye className="w-4 h-4 text-color" />
            <span className="text-xs font-semibold text-white tracking-wider">
              HOW IT WORKS
            </span>
          </motion.div>

          <h2 className="section-title font-light text-3xl md:text-4xl lg:text-5xl text-white">
            From Idle Capital to Intelligent Yield
          </h2>
        </motion.div>
      </div>

      <div className="grid grid-cols-3 w-full relative z-10">
        {videos.map((video, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            className="overflow-hidden"
          >
            <video
              src={video.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default VisualStorySection;
