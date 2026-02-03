import { motion } from "framer-motion";
import { Layers, Zap, Shield, BarChart3 } from "lucide-react";

const buildingPoints = [
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Volatility Response",
    desc: "Mechanisms designed to respond to volatility rather than ignore it",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Risk Reduction",
    desc: "Structures that reduce unnecessary exposure to structural risk",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Sustainable Yield",
    desc: "A system-level approach to balancing yield and sustainability",
  },
];

const VisionSection = () => {
  return (
    <section
      id="vision"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-secondary/10 to-transparent"
    >
      <div className="max-w-7xl mx-auto px-6">
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
            <span className="text-xs font-semibold text-primary tracking-wider">
              WHAT WE'RE BUILDING
            </span>
          </motion.div>

          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">
            Continuous Liquidity Infrastructure
          </h2>

          <motion.p
            className="text-muted-foreground mt-6 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Balcore is developing infrastructure focused on improving how
            liquidity behaves across changing market conditions.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {buildingPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-card to-secondary/30 border border-border hover:border-primary/40 transition-all duration-500 relative overflow-hidden">
                {/* Hover glow */}
                <motion.div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <motion.div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <div className="text-primary">{point.icon}</div>
                </motion.div>

                <h3 className="text-xl font-semibold text-foreground mb-3 relative z-10 group-hover:text-primary transition-colors">
                  {point.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed relative z-10">
                  {point.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            This is not a yield optimization platform. It is{" "}
            <span className="text-foreground font-medium">
              liquidity infrastructure built for longevity
            </span>
            .
          </p>
          <p className="text-sm text-muted-foreground/70 mt-4 italic">
            More details will be shared as development progresses.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
