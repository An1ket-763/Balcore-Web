import { motion } from "framer-motion";
import { Coins } from "lucide-react";
import ProtocolFlowBackground from "@/components/backgrounds/ProtocolFlowBackground";

const assets = [
  { name: "AVAX", logo: "/logo1.png", color: "from-red-500/40 to-red-600/30", borderColor: "border-red-500/30" },
  { name: "BTC.b", logo: "/logo2.png", color: "from-orange-500/40 to-amber-600/30", borderColor: "border-orange-500/30" },
  { name: "USDC", logo: "/logo3.png", color: "from-emerald-500/40 to-emerald-600/30", borderColor: "border-emerald-500/30" },
  { name: "ETH", logo: "/logo4.png", color: "from-purple-500/40 to-indigo-600/30", borderColor: "border-purple-500/30" },
];

const SupportedAssetsSection = () => {
  return (
    <section className="py-24 border-t border-border relative section-animated-bg overflow-hidden">
      <ProtocolFlowBackground />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
            <Coins className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-white tracking-wider">
              SUPPORTED ASSETS
            </span>
          </motion.div>

          <h2 className="section-title text-3xl md:text-4xl text-white">
            Launch Assets
          </h2>

          <motion.p
            className="text-white/80 mt-4 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            BalCore is designed to support high-quality, widely used assets at launch.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {assets.map((asset, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group"
            >
              <motion.div
                className={`p-6 rounded-2xl bg-gradient-to-br ${asset.color} border ${asset.borderColor} cursor-default transition-all duration-300 hover:scale-105`}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center justify-center gap-3">
                  <img src={asset.logo} alt={`${asset.name} logo`} className="w-8 h-8 object-contain" />
                  <p className="text-2xl font-bold text-white">{asset.name}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-sm text-white/80 mt-8 text-center italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          Additional assets may be supported as the protocol evolves.
        </motion.p>
      </div>
    </section>
  );
};

export default SupportedAssetsSection;