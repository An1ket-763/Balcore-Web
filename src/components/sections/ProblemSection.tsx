import { motion } from "framer-motion";

const ProblemSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 border-t border-border relative overflow-hidden">
      {/* Decorative background element */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none"
        animate={{
          rotate: 360,
        }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full border-2 border-dashed border-primary/30" />
        <div className="absolute inset-8 rounded-full border border-accent/20" />
        <div className="absolute inset-16 rounded-full border border-primary/20" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="relative z-10"
      >
        <p className="section-subtitle">The Challenge</p>
        <motion.h2
          className="section-title text-3xl md:text-4xl mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          The Problem Explained
        </motion.h2>
        <motion.p
          className="section-text mt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Traditional AMM designs treat liquidity as static, reacting only to
          price changes rather than anticipating them. This can expose
          liquidity providers to repeated value loss and unpredictable
          returns.
        </motion.p>
        <motion.p
          className="section-text mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          As markets evolve, so must the systems that support them — moving
          beyond passive models toward dynamic balance and sustainable yield.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ProblemSection;
