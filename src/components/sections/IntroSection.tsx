import { motion } from "framer-motion";
import { Sparkles, TrendingDown, AlertTriangle, LogOut } from "lucide-react";

const issues = [
  {
    icon: <TrendingDown className="w-5 h-5" />,
    text: "Impermanent loss that outweighs fees",
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    text: "Yield that fluctuates unpredictably",
  },
  {
    icon: <LogOut className="w-5 h-5" />,
    text: "Liquidity that exits precisely when it's needed most",
  },
];

const IntroSection = () => {
  return (
    <section
      id="learn-more"
      className="py-24 border-t border-border relative section-animated-bg overflow-hidden"
    >
      {/* Enhanced background decorations */}
      <div className="section-grid-pattern" />
      <div className="section-orb section-orb-1" />
      <div className="section-orb section-orb-2" />
      
      {/* Animated accent lines */}
      <motion.div
        className="absolute top-0 left-1/4 w-px h-32 bg-gradient-to-b from-primary/30 to-transparent"
        animate={{ opacity: [0.3, 0.7, 0.3], height: ["8rem", "12rem", "8rem"] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-1/3 w-px h-24 bg-gradient-to-t from-accent/30 to-transparent"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs font-semibold text-accent tracking-wider">
              CONTEXT
            </span>
          </motion.div>

          <motion.h2
            className="section-title text-3xl md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            DeFi Has Grown Fast.
            <br />
            <span className="text-muted-foreground">Its Foundations Haven't.</span>
          </motion.h2>

          <motion.p
            className="section-text mt-6 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Over the last few years, DeFi has unlocked global access to liquidity,
            yield, and financial primitives that were once limited to institutions.
            But as markets mature, cracks begin to show.
          </motion.p>

          <motion.p
            className="section-text mt-4 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Liquidity systems that perform well during expansion struggle during
            volatility. Incentives attract capital quickly — but often fail to
            retain it. Risk is pushed to users instead of being managed at the
            system level.
          </motion.p>

          <motion.p
            className="section-text mt-4 text-lg font-medium text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Balcore exists to rethink these foundations.
          </motion.p>
        </motion.div>

        {/* Enhanced outcome cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {issues.map((issue, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="content-card content-card-destructive group"
            >
              <div className="relative z-10">
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center text-destructive mb-4 group-hover:bg-destructive/20 transition-colors"
                  whileHover={{ rotate: -10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  {issue.icon}
                </motion.div>
                <p className="text-foreground/80 group-hover:text-foreground transition-colors font-medium">
                  {issue.text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="text-sm text-muted-foreground mt-8 italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
        >
          These outcomes are not anomalies. They are structural consequences of
          current liquidity design.
        </motion.p>
      </div>
    </section>
  );
};

export default IntroSection;