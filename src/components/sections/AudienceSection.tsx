import { motion } from "framer-motion";
import { Users, Building2, Code2 } from "lucide-react";

const audiences = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Liquidity Providers",
    description:
      "Who want to participate in DeFi without relying solely on incentives or accepting unmanaged risk.",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: "Protocols & DAOs",
    description:
      "Looking for healthier liquidity behavior that aligns with long-term protocol sustainability.",
  },
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Builders & Researchers",
    description:
      "Exploring new models for liquidity management and risk-aware DeFi infrastructure.",
  },
];

const AudienceSection = () => {
  return (
    <section id="audience" className="py-24 border-t border-border relative section-animated-bg overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="section-grid-pattern" />
      <div className="section-orb section-orb-1" style={{ top: '15%', right: '-80px' }} />
      <div className="section-orb section-orb-2" style={{ bottom: '25%', left: '-60px' }} />

      {/* Animated diagonal lines */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden"
        style={{ opacity: 0.02 }}
      >
        <motion.div
          className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-primary to-transparent -rotate-45 top-1/4 -left-1/2"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute w-[200%] h-px bg-gradient-to-r from-transparent via-accent to-transparent -rotate-45 top-3/4 -left-1/2"
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-[20%] left-[8%] w-12 h-12 border border-dashed border-primary/15 rounded-xl hidden lg:block"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-[15%] right-[12%] w-8 h-8 border border-accent/20 rounded-full hidden lg:block"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle">WHO WE'RE BUILDING FOR</p>
          <h2 className="section-title text-3xl md:text-4xl mt-4">
            Designed For the Next Phase of DeFi
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {audiences.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl content-card relative overflow-hidden">
                {/* Animated gradient overlay */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(400px circle at 50% 0%, hsl(75 85% 55% / 0.08), transparent 60%)",
                  }}
                />

                {/* Icon container with enhanced animation */}
                <motion.div 
                  className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-all duration-300"
                  whileHover={{ rotate: 5 }}
                >
                  <div className="text-primary">{item.icon}</div>

                  {/* Pulsing ring */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-primary/30"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                  />
                </motion.div>

                <h3 className="text-xl font-semibold text-foreground mb-4 relative z-10 group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed relative z-10 group-hover:text-muted-foreground/90 transition-colors">
                  {item.description}
                </p>

                {/* Bottom accent line */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />

                {/* Corner glow */}
                <motion.div
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;