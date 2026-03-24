import { motion } from "framer-motion";
import { Users, Building2, Code2, Heart } from "lucide-react";
import ProtocolFlowBackground from "@/components/backgrounds/ProtocolFlowBackground";

const audiences = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "For Individuals",
    description:
      "Earn professional-grade DeFi yields without deep technical knowledge. No manual rebalancing. No constant monitoring. Just deposit and participate.",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "For DAOs",
    description:
      "Deploy treasury capital efficiently with automation, transparency, and control, while maintaining a strong focus on risk management.",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "For DeFi",
    description:
      "Balcore bridges the gap between complex liquidity strategies and user accessibility, helping unlock idle capital for productive use.",
  },
];

const WhyBalcoreSection = () => {
  return (
    <section id="why-balcore" className="py-16 md:py-20 border-t border-border relative section-animated-bg overflow-hidden">
      <ProtocolFlowBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mobile-layout-shell relative z-10">
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
            <Heart className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-white tracking-wider">
              WHY BALCORE MATTERS
            </span>
          </motion.div>

          <h2 className="section-title font-light text-3xl md:text-4xl lg:text-5xl text-white">
            Making DeFi Accessible
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((item, i) => (
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
                  <div className="text-primary">{item.icon}</div>
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-primary/30"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                </motion.div>

                <h3 className="text-xl font-semibold text-white mb-4 relative z-10 group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-white/80 leading-relaxed relative z-10">
                  {item.description}
                </p>

                <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <motion.div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyBalcoreSection;
