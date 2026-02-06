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
      className="py-24 relative section-animated-bg overflow-hidden"
    >
      {/* Enhanced background decorations */}
      <div className="section-grid-pattern" />
      <div className="section-orb section-orb-1" style={{ top: '10%', right: '-120px', width: '250px', height: '250px' }} />
      <div className="section-orb section-orb-2" style={{ bottom: '20%', left: '-100px', width: '200px', height: '200px' }} />
      
      {/* Center glow effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(75 85% 55% / 0.03), transparent 60%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating particles */}
      <motion.div
        className="absolute top-1/4 left-[20%] w-2 h-2 rounded-full bg-primary/40 hidden lg:block"
        animate={{
          y: [0, -30, 0],
          x: [0, 15, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-[60%] right-[25%] w-3 h-3 rounded-full bg-accent/30 hidden lg:block"
        animate={{
          y: [0, 25, 0],
          x: [0, -10, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute bottom-[30%] left-[15%] w-1.5 h-1.5 rounded-full bg-primary/50 hidden lg:block"
        animate={{
          y: [0, -20, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
              className="group"
            >
              <div className="h-full p-8 rounded-2xl content-card relative overflow-hidden">
                {/* Animated corner accent */}
                <motion.div
                  className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                <motion.div
                  className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300 icon-pulse"
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

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
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