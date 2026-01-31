import { motion } from "framer-motion";
import { Eye, Quote } from "lucide-react";

const VisionSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 border-t border-border relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(circle, hsl(36 95% 55%), transparent 70%)",
        }}
      />

      <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Eye className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wider">
              OUR VISION
            </span>
          </motion.div>

          <motion.h2
            className="section-title text-3xl md:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A New Way to Think About Liquidity
          </motion.h2>

          <motion.p
            className="section-text mt-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Balcore embraces a perspective where capital isn't parked — it
            adapts. This means thinking beyond one-time placement toward
            infrastructure that understands balance, duration, and long-term
            participation.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          {/* Quote card */}
          <motion.div
            className="relative p-8 rounded-2xl bg-gradient-to-br from-card via-secondary/30 to-card border border-border"
            whileHover={{ y: -5 }}
          >
            {/* Quote icon */}
            <motion.div
              className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-orange-dark flex items-center justify-center"
              animate={{
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Quote className="w-6 h-6 text-primary-foreground" />
            </motion.div>

            <motion.div
              className="absolute left-0 top-8 bottom-8 w-1 bg-gradient-to-b from-primary via-accent to-primary rounded-full"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              style={{ originY: 0 }}
            />

            <p className="text-foreground/90 italic text-xl md:text-2xl leading-relaxed pl-6">
              "Markets move continuously. Liquidity should too."
            </p>

            <div className="flex items-center gap-4 mt-6 pl-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold">
                B
              </div>
              <div>
                <p className="font-semibold text-foreground">Balcore Team</p>
                <p className="text-sm text-muted-foreground">Core Philosophy</p>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute -bottom-3 -right-3 w-20 h-20 rounded-xl border border-dashed border-primary/20"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VisionSection;
