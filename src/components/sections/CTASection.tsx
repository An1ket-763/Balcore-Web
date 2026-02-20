import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <footer id="footer" className="py-16 relative overflow-hidden border-t border-border">
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-2">
            <span className="gradient-text shimmer-text">BALCORE</span>
          </h3>

          <p className="text-white/80 mb-6">
            Built on Avalanche and beyond
          </p>

          <motion.a
            href="https://x.com/Balcore_ai"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            whileHover={{ scale: 1.05 }}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            → @Balcore_ai
          </motion.a>
        </motion.div>

        <motion.div
          className="w-full max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-border to-transparent mt-10 mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />

        <motion.p
          className="text-sm text-white/80"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          © Balcore 2026
        </motion.p>
      </div>
    </footer>
  );
};

export default CTASection;
