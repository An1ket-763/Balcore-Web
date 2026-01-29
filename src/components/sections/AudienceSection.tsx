import { motion } from "framer-motion";
import { Users, Layers, Lightbulb } from "lucide-react";

const audiences = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Liquidity Providers",
    desc: "For participants who want yield without unnecessary exposure — capital that works with markets, not against them.",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "AMM Protocols",
    desc: "For teams rethinking solvent, sustainable liquidity, offering deeper utility without sacrificing stability.",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Builders & Researchers",
    desc: "For innovators focused on foundational DeFi infrastructure, purpose-built systems that align incentives.",
  },
];

const AudienceSection = () => {
  return (
    <section id="audience" className="max-w-7xl mx-auto px-6 py-24 border-t border-border">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <p className="section-subtitle">Who It's For</p>
        <h2 className="section-title text-3xl md:text-4xl mt-4">
          Built for Long-Term Participation
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {audiences.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            whileHover={{
              y: -8,
              transition: { duration: 0.3 },
            }}
            className="feature-card group relative overflow-hidden"
          >
            {/* Animated border gradient */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg, hsl(36 95% 55% / 0.15), transparent, hsl(174 65% 45% / 0.1))",
              }}
            />
            
            <motion.div
              className="feature-icon relative z-10"
              animate={{
                boxShadow: [
                  "0 8px 24px -8px hsl(36 95% 55% / 0.5)",
                  "0 12px 32px -8px hsl(36 95% 55% / 0.7)",
                  "0 8px 24px -8px hsl(36 95% 55% / 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {item.icon}
            </motion.div>
            
            <h3 className="text-lg font-semibold text-foreground mt-5 relative z-10 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed relative z-10">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AudienceSection;
