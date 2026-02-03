import { motion } from "framer-motion";
import { Rocket, Activity, Shield, BarChart } from "lucide-react";

const futurePoints = [
  {
    icon: <Activity className="w-5 h-5" />,
    text: "How systems behave under stress",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    text: "How capital is retained during uncertainty",
  },
  {
    icon: <BarChart className="w-5 h-5" />,
    text: "How risk is handled transparently and responsibly",
  },
];

const FutureSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Rocket className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold text-accent tracking-wider">
                LOOKING AHEAD
              </span>
            </motion.div>

            <h2 className="section-title text-3xl md:text-4xl">
              A Changing DeFi Environment
            </h2>

            <motion.p
              className="text-muted-foreground mt-6 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              As institutional and long-term capital begins to engage with crypto
              infrastructure, expectations shift. Capital becomes more selective.
              Risk tolerance decreases. Liquidity demands stability, not just
              upside.
            </motion.p>

            <motion.p
              className="text-muted-foreground mt-4 text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              DeFi systems built purely for growth and incentives face a new
              reality:{" "}
              <span className="text-foreground font-medium">
                markets no longer forgive fragile design
              </span>
              .
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-sm text-muted-foreground mb-6">
              The future of DeFi will not be defined by higher APYs or louder
              narratives. It will be defined by:
            </p>

            {futurePoints.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
                className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-secondary/50 to-secondary/20 border border-border hover:border-accent/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors">
                  {point.icon}
                </div>
                <p className="text-foreground/90 group-hover:text-foreground transition-colors">
                  {point.text}
                </p>
              </motion.div>
            ))}

            <motion.p
              className="text-primary font-medium mt-8 pt-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              Balcore is being built with this future in mind — deliberately,
              carefully, and with a long-term horizon.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FutureSection;
