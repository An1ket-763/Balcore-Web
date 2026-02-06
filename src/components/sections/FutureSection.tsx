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
    <section className="py-24 relative section-animated-bg overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="section-grid-pattern" />
      <div className="section-orb section-orb-1" style={{ top: '20%', right: '-100px' }} />
      <div className="section-orb section-orb-2" style={{ bottom: '30%', left: '-80px' }} />
      
      {/* Animated horizontal accent lines */}
      <motion.div
        className="absolute top-1/3 left-0 h-px w-32 bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        animate={{ 
          x: [0, 100, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 h-px w-48 bg-gradient-to-l from-transparent via-accent/30 to-transparent"
        animate={{ 
          x: [0, -80, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-20 right-[15%] w-16 h-16 border border-primary/20 rounded-lg hidden lg:block"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-32 left-[10%] w-8 h-8 border border-accent/20 rounded-full hidden lg:block"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
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
                className="content-card group"
              >
                <div className="flex items-center gap-4 relative z-10">
                  <motion.div 
                    className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-colors icon-pulse"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    style={{ '--tw-shadow-color': 'hsl(80 75% 50% / 0.4)' } as React.CSSProperties}
                  >
                    {point.icon}
                  </motion.div>
                  <p className="text-foreground/90 group-hover:text-foreground transition-colors font-medium text-lg">
                    {point.text}
                  </p>
                </div>
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