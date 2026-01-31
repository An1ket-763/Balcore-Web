import { motion } from "framer-motion";
import { Compass, Check } from "lucide-react";

const philosophyItems = [
  "Liquidity should earn without begging for attention.",
  "Systems should be predictable without being rigid.",
  "Participation shouldn't punish longevity.",
  "Research matters as much as execution.",
];

const PhilosophySection = () => {
  return (
    <section
      id="philosophy"
      className="max-w-7xl mx-auto px-6 py-24 border-t border-border relative"
    >
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Compass className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wider">
              PRINCIPLES
            </span>
          </motion.div>

          <h2 className="section-title text-3xl md:text-4xl">Our Philosophy</h2>

          <p className="text-muted-foreground mt-4 max-w-lg">
            The core beliefs that guide every decision we make at Balcore.
          </p>
        </motion.div>

        <div className="space-y-4">
          {philosophyItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ x: 8, transition: { duration: 0.2 } }}
              className="philosophy-item group cursor-default"
            >
              <motion.div
                className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-orange-dark flex items-center justify-center flex-shrink-0"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              >
                <Check className="w-4 h-4 text-primary-foreground" />
              </motion.div>
              <p className="text-foreground/90 group-hover:text-foreground transition-colors">
                {item}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
