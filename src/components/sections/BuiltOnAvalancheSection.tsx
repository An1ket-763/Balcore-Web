import { motion } from "framer-motion";
import { Mountain } from "lucide-react";

const integrations = [
  "Avalanche Network",
  "LFJ DEX",
  "Pharaoh DEX",
  "Blackhole DEX",
  "Benqi Lending",
  "Concentrated Liquidity Pools",
  "Exochart Oracles",
  "Smart Vault Architecture",
];

const BuiltOnAvalancheSection = () => {
  return (
    <section className="py-24 border-t border-border relative section-animated-bg overflow-hidden">
      <div className="section-grid-pattern" />
      <div className="protocol-wave-field">
        <div className="protocol-wave protocol-wave-1" />
        <div className="protocol-wave protocol-wave-2" />
        <div className="protocol-wave protocol-wave-3" />
      </div>
      <div className="section-orb section-orb-1" style={{ top: '20%', right: '-100px' }} />
      <div className="section-orb section-orb-2" style={{ bottom: '15%', left: '-80px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Mountain className="w-4 h-4 text-destructive" />
            <span className="text-xs font-semibold text-destructive tracking-wider">
              ECOSYSTEM
            </span>
          </motion.div>

          <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">
            Built on Avalanche
          </h2>

          <motion.p
            className="text-muted-foreground mt-4 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            BalCore is built natively within the Avalanche ecosystem, leveraging its speed, scalability, and composability.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {integrations.map((name, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group"
            >
              <div className="p-5 rounded-xl content-card text-center cursor-default relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(300px circle at 50% 50%, hsl(36 95% 55% / 0.06), transparent 60%)",
                  }}
                />
                <p className="text-foreground/90 font-medium relative z-10 group-hover:text-primary transition-colors text-sm">
                  {name}
                </p>
                <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-muted-foreground text-center mt-12 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          These components work together to support{" "}
          <span className="text-foreground font-medium">intelligent liquidity orchestration</span>.
        </motion.p>
      </div>
    </section>
  );
};

export default BuiltOnAvalancheSection;
