import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="hero-section relative min-h-[85vh] flex items-center">
      {/* Background effects */}
      <div className="particle-field" />
      <div className="network-lines" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Floating crypto icons */}
      <motion.div
        className="absolute top-20 right-[15%] opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
          <Activity className="w-8 h-8 text-primary" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-[10%] opacity-15"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/30 to-primary/20 backdrop-blur-sm border border-accent/20" />
      </motion.div>

      <motion.div
        className="absolute top-40 left-[20%] opacity-10"
        animate={{
          y: [0, -25, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-subtitle"
        >
          CRYPTOCURRENCY BLOCKCHAIN
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mt-6"
        >
          <span className="gradient-text shimmer-text">Revolutionizing</span>{" "}
          Transactions
          <br />
          with Blockchain
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl"
        >
          Balcore is building continuous balance and yield infrastructure for
          AMM DEXs, with impermanent loss reduction at the core. Next-gen DeFi
          made simple.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10"
        >
          <motion.a
            href="#learn-more"
            className="btn-primary inline-flex"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Now
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-wrap gap-8 md:gap-16"
        >
          {[
            { value: "$2.5B+", label: "Total Value Locked" },
            { value: "150K+", label: "Active Users" },
            { value: "99.9%", label: "Uptime" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
            >
              <motion.p
                className="text-3xl md:text-4xl font-bold gradient-text"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
