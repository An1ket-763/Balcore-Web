import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Activity, ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  const gradientX = useTransform(smoothX, [0, window.innerWidth], [0, 100]);
  const gradientY = useTransform(smoothY, [0, window.innerHeight], [0, 100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="hero-section relative min-h-screen flex items-center overflow-hidden">
      {/* Mouse-following gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(36 95% 55% / 0.15), transparent 40%)`,
        }}
      />

      {/* Background effects */}
      <div className="particle-field" />
      <div className="network-lines" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(hsl(36 95% 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(36 95% 55%) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating crypto icons */}
      <motion.div
        className="absolute top-20 right-[15%] opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/30 to-accent/20 backdrop-blur-sm border border-primary/20 flex items-center justify-center">
          <Activity className="w-8 h-8 text-primary" />
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-[10%] opacity-15"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/30 to-primary/20 backdrop-blur-sm border border-accent/20" />
      </motion.div>

      <motion.div
        className="absolute top-40 left-[20%] opacity-10"
        animate={{
          y: [0, -25, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/40 to-transparent" />
      </motion.div>

      {/* Additional floating elements */}
      <motion.div
        className="absolute top-[60%] right-[8%] w-24 h-24 rounded-2xl border border-dashed border-primary/20 hidden lg:block"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute top-[30%] right-[30%] w-2 h-2 rounded-full bg-accent hidden lg:block"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm font-medium text-primary tracking-wide">
            NEXT-GEN DEFI INFRASTRUCTURE
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] max-w-5xl"
        >
          <motion.span
            className="gradient-text shimmer-text inline-block"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Revolutionizing
          </motion.span>
          <br />
          <span className="text-foreground">
            Liquidity with{" "}
            <span className="relative">
              Balance
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          Balcore is building continuous balance and yield infrastructure for
          AMM DEXs, with impermanent loss reduction at the core. Next-gen DeFi
          made simple.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <motion.a
            href="#learn-more"
            className="btn-primary group relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Get Started Now
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
              animate={{ translateX: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            />
          </motion.a>

          <motion.a
            href="#features"
            className="btn-secondary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Explore Features
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 flex flex-wrap gap-8 md:gap-16"
        >
          {[
            { value: "$2.5B+", label: "Total Value Locked" },
            { value: "150K+", label: "Active Users" },
            { value: "99.9%", label: "Uptime" },
            { value: "40%", label: "Avg IL Reduction" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center group"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <motion.p
                className="text-3xl md:text-4xl font-bold gradient-text"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-muted-foreground mt-1 group-hover:text-foreground/80 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.a
          href="#learn-more"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
