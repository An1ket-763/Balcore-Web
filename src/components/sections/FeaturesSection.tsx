import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Activity, Shield, Layers, Code, ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const features = [
  {
    icon: <Activity className="w-6 h-6" />,
    title: "Continuous Balance",
    desc: "Real-time awareness of liquidity position and market dynamics for optimal performance.",
    color: "from-primary to-orange-dark",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Yield Sustainability",
    desc: "Building for consistent returns rather than volatile spikes that hurt long-term LPs.",
    color: "from-accent to-teal",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Risk-Aware Design",
    desc: "Proactive protection against impermanent loss with intelligent rebalancing.",
    color: "from-primary to-accent",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "AMM-Native",
    desc: "Purpose-built systems for next-generation decentralized exchanges and protocols.",
    color: "from-orange-dark to-primary",
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

const FeatureCard = ({
  item,
  index,
}: {
  item: (typeof features)[0];
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      whileHover={{
        y: -12,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className="feature-card group cursor-pointer relative"
    >
      {/* Spotlight effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), hsl(36 95% 55% / 0.15), transparent 40%)`,
        }}
      />

      <motion.div
        className={`feature-icon bg-gradient-to-br ${item.color}`}
        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
      >
        {item.icon}
      </motion.div>

      <div className="flex items-start justify-between mt-5">
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
          {item.title}
        </h3>
        <motion.div
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ArrowUpRight className="w-5 h-5 text-primary" />
        </motion.div>
      </div>

      <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
        {item.desc}
      </p>

      {/* Bottom gradient line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="max-w-7xl mx-auto px-6 py-24 border-t border-border relative overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute -right-40 top-20 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(circle, hsl(36 95% 55%), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-xs font-semibold text-primary tracking-wider">
            CORE FEATURES
          </span>
        </motion.span>

        <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">
          What Balcore Focuses On
        </h2>

        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Infrastructure designed for the future of decentralized finance
        </p>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {features.map((item, i) => (
          <FeatureCard key={i} item={item} index={i} />
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
