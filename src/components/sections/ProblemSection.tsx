import { motion } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

const assumptions = [
  "Markets remain within predictable ranges",
  "Capital can stay fully exposed at all times",
  "Incentives alone can compensate for risk",
];

const ProblemSection = () => {
  return (
    <section
      id="problem"
      className="max-w-7xl mx-auto px-6 py-24 border-t border-border relative"
    >
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <AlertCircle className="w-4 h-4 text-destructive" />
            <span className="text-xs font-semibold text-destructive tracking-wider">
              THE PROBLEM
            </span>
          </motion.div>

          <h2 className="section-title text-3xl md:text-4xl">
            The Structural Problem with DeFi Liquidity
          </h2>

          <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
            Most AMM-based liquidity systems rely on simplified assumptions that
            hold during calm conditions but fail when markets behave differently
            — which they inevitably do.
          </p>
        </motion.div>

        <div className="space-y-4">
          <motion.p
            className="text-sm text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Most liquidity designs assume:
          </motion.p>

          {assumptions.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              whileHover={{ x: 8, transition: { duration: 0.2 } }}
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border hover:border-destructive/30 transition-all duration-300 group cursor-default"
            >
              <motion.div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-destructive/20 transition-colors">
                <X className="w-4 h-4 text-destructive" />
              </motion.div>
              <p className="text-foreground/80 group-hover:text-foreground transition-colors">
                {item}
              </p>
            </motion.div>
          ))}

          <motion.p
            className="text-muted-foreground mt-6 pt-4 border-t border-border/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            These assumptions work in calm environments but break down when
            markets change.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
