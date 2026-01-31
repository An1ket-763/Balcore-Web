import { motion } from "framer-motion";
import { Wallet, Zap, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: <Wallet className="w-6 h-6" />,
    number: "01",
    title: "Connect Wallet",
    desc: "Link your wallet to access the Balcore protocol",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    number: "02",
    title: "Provide Liquidity",
    desc: "Deposit assets into optimized liquidity pools",
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    number: "03",
    title: "Earn Yields",
    desc: "Watch your returns grow with reduced IL exposure",
  },
];

const StepsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle">How It Works</p>
          <h2 className="section-title text-3xl md:text-4xl mt-4">
            Get Started in 3 Simple Steps
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection line */}
          <motion.div
            className="hidden md:block absolute top-24 left-1/4 right-1/4 h-px"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(36 95% 55% / 0.5), transparent)",
            }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="relative text-center group"
            >
              {/* Step number */}
              <motion.div
                className="relative mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary to-card flex items-center justify-center border border-border group-hover:border-primary/50 transition-all duration-500"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="text-primary relative z-10">{step.icon}</div>

                {/* Pulsing ring */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              </motion.div>

              {/* Step indicator */}
              <motion.span
                className="inline-block mt-6 text-xs font-bold tracking-widest text-primary/60"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                }}
              >
                STEP {step.number}
              </motion.span>

              <h3 className="text-xl font-semibold text-foreground mt-3 group-hover:text-primary transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-2 max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
