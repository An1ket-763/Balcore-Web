import { motion } from "framer-motion";

const philosophyItems = [
  "Liquidity should earn without begging for attention.",
  "Systems should be predictable without being rigid.",
  "Participation shouldn't punish longevity.",
  "Research matters as much as execution.",
];

const PhilosophySection = () => {
  return (
    <section id="philosophy" className="max-w-7xl mx-auto px-6 py-24 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-subtitle">Principles</p>
        <h2 className="section-title text-3xl md:text-4xl mt-4">
          Our Philosophy
        </h2>
      </motion.div>

      <div className="space-y-4 mt-10 max-w-3xl">
        {philosophyItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ x: 8, transition: { duration: 0.2 } }}
            className="philosophy-item group cursor-default"
          >
            <motion.div
              className="philosophy-dot"
              animate={{
                scale: [1, 1.3, 1],
                boxShadow: [
                  "0 0 12px hsl(36 95% 55% / 0.5)",
                  "0 0 20px hsl(36 95% 55% / 0.8)",
                  "0 0 12px hsl(36 95% 55% / 0.5)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.3,
              }}
            />
            <p className="text-foreground/90 group-hover:text-foreground transition-colors">
              {item}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PhilosophySection;
