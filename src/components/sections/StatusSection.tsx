import { motion } from "framer-motion";
import { Clock, Hammer } from "lucide-react";

const StatusSection = () => {
  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-white tracking-wider">
              PROJECT STATUS
            </span>
          </motion.div>

          <h2 className="section-title text-3xl md:text-4xl text-white">
            Under Active Development
          </h2>

          <motion.div
            className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-secondary/50 to-card border border-border max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mx-auto mb-6"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Hammer className="w-8 h-8 text-primary" />
            </motion.div>

            <p className="text-white/80 text-lg leading-relaxed">
              BalCore is currently under development. The focus is on careful design, testing assumptions, and building systems meant to last.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatusSection;
