import { motion } from "framer-motion";

const partners = [
  "UNISWAP",
  "AAVE",
  "COMPOUND",
  "CURVE",
  "BALANCER",
  "1INCH",
  "SUSHISWAP",
  "YEARN",
];

const TrustedBySection = () => {
  return (
    <section className="py-16 border-b border-border overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center text-sm text-muted-foreground mb-10 tracking-wide"
      >
        TRUSTED BY LEADING DEFI PROTOCOLS
      </motion.p>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex items-center gap-16"
          animate={{ x: [0, -1200] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {[...partners, ...partners, ...partners].map((name, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3 px-6 py-3 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors duration-300 cursor-default flex-shrink-0"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">
                  {name.charAt(0)}
                </span>
              </div>
              <span className="text-foreground/70 font-medium text-sm whitespace-nowrap">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedBySection;
