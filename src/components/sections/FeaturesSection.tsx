import { motion } from "framer-motion";
import { Activity, Shield, Layers, Code } from "lucide-react";

const features = [
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Continuous Balance",
    desc: "Real-time awareness of liquidity position and market dynamics.",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Yield Sustainability",
    desc: "Building for consistent returns rather than volatile spikes.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Risk-Aware Design",
    desc: "Proactive protection against impermanent loss exposure.",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "AMM-Native",
    desc: "Purpose-built systems for next-generation decentralized exchanges.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-subtitle">Core Features</p>
        <h2 className="section-title text-3xl md:text-4xl mt-4">
          What Balcore Focuses On
        </h2>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {features.map((item, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            whileHover={{
              y: -12,
              scale: 1.02,
              transition: { duration: 0.3 },
            }}
            className="feature-card group cursor-pointer"
          >
            <motion.div
              className="feature-icon"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {item.icon}
            </motion.div>
            <h3 className="text-lg font-semibold text-foreground mt-5 group-hover:text-primary transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
              {item.desc}
            </p>
            
            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 50%, hsl(36 95% 55% / 0.1), transparent 70%)",
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
