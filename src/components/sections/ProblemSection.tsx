import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    "Static liquidity models react too slowly",
    "Impermanent loss erodes long-term returns",
    "Yield volatility discourages participation",
    "Capital efficiency remains suboptimal",
  ];

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

      <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-xs font-semibold text-destructive tracking-wider">
              THE CHALLENGE
            </span>
          </motion.div>

          <motion.h2
            className="section-title text-3xl md:text-4xl"
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
            liquidity providers to repeated value loss and unpredictable returns.
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

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="space-y-4"
        >
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              whileHover={{ x: 8 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/10 hover:border-destructive/30 transition-all group"
            >
              <motion.div
                className="w-8 h-8 rounded-lg bg-destructive/20 flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-destructive font-bold text-sm">
                  {i + 1}
                </span>
              </motion.div>
              <p className="text-foreground/80 group-hover:text-foreground transition-colors">
                {problem}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
