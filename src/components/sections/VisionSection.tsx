import { motion } from "framer-motion";

const VisionSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="section-subtitle">Our Vision</p>
        <motion.h2
          className="section-title text-3xl md:text-4xl mt-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A New Way to Think About Liquidity
        </motion.h2>

        <motion.div
          className="relative mt-8 mb-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ originY: 0 }}
          />
          <p className="text-foreground/80 italic text-xl pl-6">
            "Markets move continuously. Liquidity should too."
          </p>
        </motion.div>

        <motion.p
          className="section-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Balcore embraces a perspective where capital isn't parked — it
          adapts. This means thinking beyond one-time placement toward
          infrastructure that understands balance, duration, and long-term
          participation.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default VisionSection;
