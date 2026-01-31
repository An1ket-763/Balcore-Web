import { motion } from "framer-motion";
import { Shield, Zap, BarChart3, Lock, RefreshCw, Globe } from "lucide-react";

const BentoFeaturesSection = () => {
  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle">Advanced Features</p>
          <h2 className="section-title text-3xl md:text-4xl mt-4">
            Built for Speed. Scaled for Growth.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Large featured card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5 }}
            className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl bg-gradient-to-br from-card via-secondary/50 to-card border border-border hover:border-primary/40 transition-all duration-500 p-8"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
            
            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full" style={{
                backgroundImage: "linear-gradient(hsl(36 95% 55% / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(36 95% 55% / 0.3) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }} />
            </div>

            <div className="relative z-10">
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-orange-dark flex items-center justify-center mb-6"
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Shield className="w-8 h-8 text-primary-foreground" />
              </motion.div>

              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Impermanent Loss Protection
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                Our advanced algorithms continuously monitor and rebalance your
                positions to minimize IL exposure while maintaining optimal
                yields across market conditions.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { value: "40%", label: "Avg IL Reduction" },
                  { value: "24/7", label: "Active Monitoring" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="p-4 rounded-xl bg-background/50 border border-border"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <p className="text-2xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Smaller cards */}
          {[
            {
              icon: <Zap className="w-5 h-5" />,
              title: "Lightning Fast",
              desc: "Sub-second transaction processing",
            },
            {
              icon: <BarChart3 className="w-5 h-5" />,
              title: "Real-time Analytics",
              desc: "Live performance tracking",
            },
            {
              icon: <Lock className="w-5 h-5" />,
              title: "Battle-tested Security",
              desc: "Audited smart contracts",
            },
            {
              icon: <RefreshCw className="w-5 h-5" />,
              title: "Auto-compound",
              desc: "Maximize your returns",
            },
            {
              icon: <Globe className="w-5 h-5" />,
              title: "Multi-chain Ready",
              desc: "Deploy across networks",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card to-secondary/30 border border-border hover:border-primary/40 transition-all duration-300 p-6"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              <motion.div
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center text-primary mb-4 relative z-10"
                whileHover={{ rotate: 10 }}
              >
                {item.icon}
              </motion.div>

              <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors relative z-10">
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1 relative z-10">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoFeaturesSection;
