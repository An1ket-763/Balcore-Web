import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import MarketBackground from "@/components/backgrounds/MarketBackground";

const IdleCapitalAnimation = () => (
  <div className="relative w-full max-w-[320px] mx-auto flex flex-col items-center">
    <div className="relative w-[280px] h-[280px] flex items-center justify-center">
      <div className="grid grid-cols-3 gap-3">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="w-20 h-20 rounded-xl border border-[#4e6385] bg-gradient-to-br from-[#334766] to-[#263954] shadow-[0_8px_20px_rgba(6,14,32,0.45)] flex items-center justify-center"
            animate={{ opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
          >
            <div className="w-10 h-10 rounded-full bg-[#1b2a45] border border-[#3b4f70] flex items-center justify-center">
              <div className="w-5 h-5 rounded-full bg-[#1d3d8a] border border-[#2a5dbf]" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    <div className="flex justify-center gap-6 mt-4">
      <div className="text-center">
        <p className="text-xs text-white/80">Status</p>
        <p className="text-sm font-mono text-white/70">Dormant</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-white/80">Utilization</p>
        <p className="text-sm font-mono text-white/70">0%</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-white/80">APY</p>
        <p className="text-sm font-mono text-white/70">—</p>
      </div>
    </div>
  </div>
);

const OrchestrationAnimation = () => (
  <div className="relative w-full max-w-[320px] mx-auto flex flex-col items-center">
    <div className="relative w-[280px] h-[280px] flex items-center justify-center">
      {/* Orbit rings */}
      <motion.div
        className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-accent/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[180px] h-[180px] rounded-full border border-dashed border-accent/15"
        animate={{ rotate: -360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      {/* Hub */}
      <motion.div
        className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center"
        style={{ boxShadow: "0 0 40px hsl(174 65% 45% / 0.4)" }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </motion.div>

      {/* Orbiting particles */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-accent/80 to-accent/40"
          style={{ boxShadow: "0 0 12px hsl(174 65% 45% / 0.4)" }}
          animate={{
            rotate: [angle, angle + 360],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <motion.div
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{
              transform: `rotate(${angle}deg) translateX(120px) rotate(-${angle}deg)`,
            }}
            animate={{
              transform: [
                `rotate(0deg) translateX(120px) rotate(0deg)`,
                `rotate(360deg) translateX(120px) rotate(-360deg)`,
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: i * (6 / 6) }}
          >
            <div className="w-4 h-4 rounded-full bg-white/30" />
          </motion.div>
        </motion.div>
      ))}
    </div>
    <div className="flex justify-center gap-6 mt-4">
      <div className="text-center">
        <p className="text-xs text-white/80">Status</p>
        <p className="text-sm font-mono text-white/70">Active</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-white/80">Routing</p>
        <motion.p
          className="text-sm font-mono text-white/70"
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Real-time
        </motion.p>
      </div>
      <div className="text-center">
        <p className="text-xs text-white/80">Efficiency</p>
        <p className="text-sm font-mono text-white/70">98%</p>
      </div>
    </div>
  </div>
);

const ActiveYieldAnimation = () => (
  <div className="relative w-full max-w-[320px] mx-auto flex flex-col items-center">
    <div className="relative w-[280px] h-[280px] flex items-center justify-center">
      {/* Optimized yield rings */}
      <motion.div
        className="absolute w-[260px] h-[260px] rounded-full border-[8px] border-dashed border-[#16c8a1]/85"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full border-[6px] border-dashed border-[#21afd1]/85"
        animate={{ rotate: -360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-[140px] h-[140px] rounded-full border-[4px] border-dashed border-[#0b8f7a]/85"
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      />

      {/* Core */}
      <motion.div
        className="relative z-10 w-24 h-24 rounded-full bg-[#0b8f7a]/70 flex items-center justify-center"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2.4, repeat: Infinity }}
      >
        <div className="w-16 h-16 rounded-full bg-[#07333f]/90 flex items-center justify-center">
          <div className="w-0 h-0 border-l-[10px] border-l-[#16c8a1] border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent" />
        </div>
      </motion.div>

      {/* Floating yield indicators */}
      {[
        { top: "15%", left: "15%", value: "+12.5%", delay: 0 },
        { top: "20%", right: "18%", value: "+8.3%", delay: 0.3 },
        { bottom: "15%", left: "20%", value: "+15.7%", delay: 0.6 },
        { bottom: "20%", right: "15%", value: "+11.2%", delay: 0.9 },
      ].map((pos, i) => (
        <motion.span
          key={i}
          className="absolute text-white font-bold text-sm"
          style={{ top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: pos.delay }}
        >
          {pos.value}
        </motion.span>
      ))}

      {/* Flow particles */}
      {[
        { x: [-30, 0, -30], y: [-40, 0, -40], duration: 2, delay: 0 },
        { x: [30, 0, 30], y: [-40, 0, -40], duration: 2.5, delay: 0.3 },
        { x: [-30, 0, -30], y: [40, 0, 40], duration: 3, delay: 0.6 },
        { x: [30, 0, 30], y: [40, 0, 40], duration: 2.5, delay: 0.9 },
      ].map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-[#16c8a1]"
          style={{ boxShadow: "0 0 10px rgba(22, 200, 161, 0.5)" }}
          animate={{ x: particle.x, y: particle.y, opacity: [0, 1, 0] }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
    <div className="flex justify-center gap-6 mt-4">
      <div className="text-center">
        <p className="text-xs text-white/80">Status</p>
        <p className="text-sm font-mono text-white/70">Optimized</p>
      </div>
      <div className="text-center">
        <p className="text-xs text-white/80">Balance</p>
        <motion.p
          className="text-sm font-mono text-white/70"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          100%
        </motion.p>
      </div>
      <div className="text-center">
        <p className="text-xs text-white/80">Avg APY</p>
        <p className="text-sm font-mono text-white/70">11.9%</p>
      </div>
    </div>
  </div>
);

const scenes = [
  {
    title: "Passive Capital",
    description: "A large portion of DeFi liquidity sits idle, waiting for volume or incentives.",
    animation: <IdleCapitalAnimation />,
    accentColor: "muted-foreground",
  },
  {
    title: "Orchestration Layer",
    description: "BalCore introduces an orchestration layer that helps capital move with purpose, adapting as conditions change.",
    animation: <OrchestrationAnimation />,
    accentColor: "accent",
  },
  {
    title: "Active Yield",
    description: "The result is liquidity that stays active and productive over time.",
    animation: <ActiveYieldAnimation />,
    accentColor: "primary",
  },
];

const VisualStorySection = () => {
  return (
    <section id="visual-story" className="py-24 border-t border-border relative section-animated-bg">
      <MarketBackground />

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
            <Eye className="w-4 h-4 text-brand-lime" />
            <span className="text-xs font-semibold text-white tracking-wider">
              HOW IT WORKS
            </span>
          </motion.div>

          <h2 className="section-title font-light text-3xl md:text-4xl lg:text-5xl text-white">
            From Idle Capital to Intelligent Yield
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {scenes.map((scene, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="group relative"
            >
              <div className="h-full p-6 rounded-2xl content-card relative overflow-hidden">
                <div className="mb-6">
                  {scene.animation}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 text-center group-hover:text-white transition-colors">
                  {scene.title}
                </h3>
                <p className="text-white/85 text-sm leading-relaxed text-center">
                  {scene.description}
                </p>

                {/* Bottom accent line */}
                <motion.div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualStorySection;
