import { motion } from "framer-motion";
import { Mountain } from "lucide-react";
import MarketBackground from "@/components/backgrounds/MarketBackground";

const integrations = [
  { name: "Avalanche Network", logo: "/logo1.png" },
  { name: "LFJ DEX", logo: "/logo5.png" },
  { name: "Pharaoh DEX", logo: "/logo6.jpg" },
  { name: "Blackhole DEX", logo: "/logo7.png" },
  { name: "Benqi Lending", logo: "/logo8.png" },
  { name: "Concentrated Liquidity Pools", logo: "/logo9.png" },
  { name: "Exochart Oracles", logo: "/logo10.png" },
  { name: "Smart Vault Architecture", logo: "/logo11.png" },
];

const BuiltOnAvalancheSection = () => {
  return (
    <section className="py-16 md:py-20 border-t border-border relative section-animated-bg overflow-hidden">
      <MarketBackground showPhones={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Mountain className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-white tracking-wider">
              ECOSYSTEM
            </span>
          </motion.div>

          <h2 className="section-title font-light text-3xl md:text-4xl lg:text-5xl text-white">
            Built on Avalanche
          </h2>

          <motion.p
            className="text-white/80 mt-4 max-w-3xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            BalCore is built natively within the Avalanche ecosystem, leveraging its speed, scalability, and composability.
          </motion.p>
        </motion.div>
      </div>

      {/* Marquee Banner */}
      <div className="relative z-10 overflow-hidden py-6">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

        <div className="marquee-track">
          {[...integrations, ...integrations].map((integration, i) => (
            <div
              key={i}
              className="marquee-item"
            >
              <img
                src={integration.logo}
                alt={`${integration.name} logo`}
                className="h-8 w-auto max-w-24 object-contain"
                loading="lazy"
              />
              <span className="text-white font-semibold text-sm tracking-wider whitespace-nowrap">
                {integration.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.p
          className="text-white/80 text-center mt-12 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          These components work together to support{" "}
          <span className="text-white font-medium">intelligent liquidity orchestration</span>.
        </motion.p>
      </div>
    </section>
  );
};

export default BuiltOnAvalancheSection;
