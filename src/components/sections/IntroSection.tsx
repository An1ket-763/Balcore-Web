import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const IntroSection = () => {
  return (
    <section
      id="learn-more"
      className="max-w-7xl mx-auto px-6 py-24 border-t border-border relative overflow-hidden"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute -left-20 top-1/2 -translate-y-1/2 w-60 h-60 rounded-full opacity-5 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(circle, hsl(174 65% 45%), transparent 70%)",
        }}
      />

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
            ABOUT BALCORE
          </span>
        </motion.div>

        <motion.h2
          className="section-title text-3xl md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The Missing Layer in DeFi Liquidity
        </motion.h2>

        <motion.p
          className="section-text mt-6 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Automated market makers unlocked open liquidity for decentralized
          finance, but introduced structural challenges for liquidity providers.
          Liquidity can be inefficient, yields can vary wildly, and impermanent
          loss remains a deterrent for long-term participation.
        </motion.p>

        <motion.p
          className="section-text mt-4 text-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Balcore is tackling these challenges at their foundation with
          infrastructure designed for tomorrow's AMMs and LP ecosystems.
        </motion.p>

        {/* Stats preview */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            { label: "Protocols", value: "15+" },
            { label: "Chains", value: "5" },
            { label: "TVL Protected", value: "$500M+" },
            { label: "IL Saved", value: "$2M+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="p-4 rounded-xl bg-secondary/30 border border-border hover:border-primary/30 transition-colors"
              whileHover={{ y: -3 }}
            >
              <p className="text-2xl font-bold gradient-text">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default IntroSection;
