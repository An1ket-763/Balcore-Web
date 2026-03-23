import { motion } from "framer-motion";
import { Zap, RefreshCw, Layers } from "lucide-react";
import YieldFlowBackground from "@/components/backgrounds/YieldFlowBackground";

const features = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Active Liquidity",
    desc: "Capital doesn't remain parked in static pools.",
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Orchestrated Yield",
    desc: "Liquidity adapts to market conditions instead of relying on fixed assumptions.",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Protocol-Native Design",
    desc: "Built as infrastructure for Avalanche and beyond.",
  },
];

const WhatBalcoreDoesSection = () => {
  return (
    <section id="what-balcore-does" className="py-16 md:py-20 border-t border-border relative section-animated-bg overflow-hidden">
      <YieldFlowBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-white tracking-wider">
              WHAT BALCORE DOES
            </span>
          </motion.div>

          <h2 className="section-title font-light text-3xl md:text-4xl lg:text-5xl text-white">
            Intelligent Liquidity Infrastructure
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl content-card relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(400px circle at 50% 0%, hsl(36 95% 55% / 0.08), transparent 60%)",
                  }}
                />

                <motion.div
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-all duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <div className="text-primary">{point.icon}</div>
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-primary/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                </motion.div>

                <h3 className="text-xl font-semibold text-white mb-3 relative z-10 group-hover:text-white transition-colors">
                  {point.title}
                </h3>
                <p className="text-white/80 leading-relaxed relative z-10">
                  {point.desc}
                </p>

                <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatBalcoreDoesSection;
