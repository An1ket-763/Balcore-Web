import { motion } from "framer-motion";
import { Users, Building2, Code2 } from "lucide-react";

const audiences = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Liquidity Providers",
    description:
      "Who want to participate in DeFi without relying solely on incentives or accepting unmanaged risk.",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Protocols & DAOs",
    description:
      "Looking for healthier liquidity behavior that aligns with long-term protocol sustainability.",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Builders & Researchers",
    description:
      "Exploring new models for liquidity management and risk-aware DeFi infrastructure.",
  },
];

const AudienceSection = () => {
  return (
    <section id="audience" className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle">WHO WE'RE BUILDING FOR</p>
          <h2 className="section-title text-3xl md:text-4xl mt-4">
            Designed For the Next Phase of DeFi
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl bg-gradient-to-br from-card via-secondary/20 to-card border border-border hover:border-primary/40 transition-all duration-500 relative overflow-hidden">
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(36 95% 55% / 0.06), transparent 40%)",
                  }}
                />

                {/* Icon container */}
                <motion.div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <div className="text-primary">{item.icon}</div>

                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-primary/30"
                    animate={{
                      scale: [1, 1.15, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                </motion.div>

                <h3 className="text-xl font-semibold text-foreground mb-4 relative z-10 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed relative z-10">
                  {item.description}
                </p>

                {/* Corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(circle at top right, hsl(36 95% 55% / 0.1), transparent 70%)",
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
