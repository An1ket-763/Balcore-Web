import { motion } from "framer-motion";
import { Users, Layers, Lightbulb, ArrowUpRight } from "lucide-react";

const audiences = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Liquidity Providers",
    desc: "For participants who want yield without unnecessary exposure — capital that works with markets, not against them.",
    stats: { label: "Avg. Returns", value: "+12%" },
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "AMM Protocols",
    desc: "For teams rethinking solvent, sustainable liquidity, offering deeper utility without sacrificing stability.",
    stats: { label: "Integrations", value: "15+" },
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Builders & Researchers",
    desc: "For innovators focused on foundational DeFi infrastructure, purpose-built systems that align incentives.",
    stats: { label: "Open Source", value: "100%" },
  },
];

const AudienceSection = () => {
  return (
    <section
      id="audience"
      className="max-w-7xl mx-auto px-6 py-24 border-t border-border relative"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute -right-20 top-20 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.03, 0.06, 0.03],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(circle, hsl(174 65% 45%), transparent 70%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.span
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-xs font-semibold text-accent tracking-wider">
            WHO IT'S FOR
          </span>
        </motion.span>

        <h2 className="section-title text-3xl md:text-4xl">
          Built for Long-Term Participation
        </h2>

        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Infrastructure that serves the entire DeFi ecosystem
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mt-16">
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
                background:
                  "linear-gradient(135deg, hsl(36 95% 55% / 0.15), transparent, hsl(174 65% 45% / 0.1))",
              }}
            />

            <div className="flex items-start justify-between">
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

              <motion.div
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowUpRight className="w-5 h-5 text-primary" />
              </motion.div>
            </div>

            <h3 className="text-xl font-semibold text-foreground mt-5 relative z-10 group-hover:text-primary transition-colors">
              {item.title}
            </h3>

            <p className="text-muted-foreground text-sm mt-3 leading-relaxed relative z-10">
              {item.desc}
            </p>

            {/* Stats badge */}
            <motion.div
              className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xs text-muted-foreground">
                {item.stats.label}:
              </span>
              <span className="text-sm font-semibold text-primary">
                {item.stats.value}
              </span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AudienceSection;
