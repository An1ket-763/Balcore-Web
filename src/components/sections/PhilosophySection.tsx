import { motion } from "framer-motion";
import { Compass, Check, RefreshCw, Shield, TrendingUp } from "lucide-react";

const philosophyItems = [
  {
    icon: <RefreshCw className="w-4 h-4" />,
    text: "Adaptability over static assumptions",
  },
  {
    icon: <Shield className="w-4 h-4" />,
    text: "Risk awareness over surface-level APY",
  },
  {
    icon: <TrendingUp className="w-4 h-4" />,
    text: "Long-term capital efficiency over short-term incentives",
  },
];

const PhilosophySection = () => {
  return (
    <section
      id="philosophy"
      className="py-24 border-t border-border relative section-animated-bg"
    >
      {/* Background decorations */}
      <div className="section-grid-pattern" />
      <div className="section-orb section-orb-1" style={{ top: '30%', right: '-80px' }} />
      <div className="section-orb section-orb-2" style={{ bottom: '10%', left: '-60px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
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
                PHILOSOPHY
              </span>
            </motion.div>

            <h2 className="section-title text-3xl md:text-4xl">Our Core Belief</h2>

            <motion.p
              className="text-xl text-foreground mt-6 font-medium leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Sustainable liquidity is not achieved by chasing yield. It is
              achieved by designing systems that adapt.
            </motion.p>

            <motion.p
              className="text-muted-foreground mt-4 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              Balcore approaches liquidity as an active system, not passive
              capital. Rather than assuming markets behave predictably, we design
              with the expectation that they won't.
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            <motion.p
              className="text-sm text-muted-foreground mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Our philosophy emphasizes:
            </motion.p>

            {philosophyItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="content-card group cursor-default"
              >
                <div className="flex items-center gap-4 relative z-10">
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 icon-pulse"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-primary-foreground">{item.icon}</div>
                  </motion.div>
                  <p className="text-foreground/90 group-hover:text-foreground transition-colors text-lg font-medium">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.p
              className="text-sm text-muted-foreground italic mt-6 pt-4 border-t border-border/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              This mindset guides every design decision.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
