import { motion } from "framer-motion";

const IntroSection = () => {
  return (
    <section id="learn-more" className="max-w-7xl mx-auto px-6 py-24 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="section-subtitle">About Balcore</p>
        <motion.h2
          className="section-title text-3xl md:text-4xl mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The Missing Layer in DeFi Liquidity
        </motion.h2>
        <motion.p
          className="section-text mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Automated market makers unlocked open liquidity for decentralized
          finance, but introduced structural challenges for liquidity
          providers. Liquidity can be inefficient, yields can vary wildly, and
          impermanent loss remains a deterrent for long-term participation.
        </motion.p>
        <motion.p
          className="section-text mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Balcore is tackling these challenges at their foundation with
          infrastructure designed for tomorrow's AMMs and LP ecosystems.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default IntroSection;
