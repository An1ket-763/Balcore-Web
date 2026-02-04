import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const CTASection = () => {
  return (
    <footer id="footer" className="py-24 relative overflow-hidden border-t border-border">
      {/* Animated background orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle, hsl(36 95% 55% / 0.3), transparent 70%)",
            "radial-gradient(circle, hsl(174 65% 45% / 0.2), transparent 70%)",
            "radial-gradient(circle, hsl(36 95% 55% / 0.3), transparent 70%)",
          ],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Floating sparkle icons */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Stay Updated
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="gradient-text shimmer-text">Building</span>
            <br />
            <span className="text-foreground">the Future of Liquidity</span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-lg md:text-xl mt-6 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Follow our journey as we develop next-generation DeFi liquidity
            infrastructure.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <motion.a
              href="https://x.com/Balcore_ai"
              target="_blank"
              rel="noreferrer"
              className="btn-primary group relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Follow @Balcore_ai
              </span>

              {/* Button shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                animate={{ translateX: ["-100%", "200%"] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute -top-10 right-10 w-20 h-20 rounded-xl bg-gradient-to-br from-primary/20 to-transparent rotate-12 hidden lg:block"
          animate={{
            y: [0, -20, 0],
            rotate: [12, 20, 12],
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-5 left-10 w-16 h-16 rounded-full border-2 border-dashed border-accent/30 hidden lg:block"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Divider */}
        <motion.div
          className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-border to-transparent mt-16 mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />

        {/* Copyright */}
        <motion.p
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          © 2026 Balcore. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
};

export default CTASection;
