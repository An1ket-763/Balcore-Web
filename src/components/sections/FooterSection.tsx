import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="footer-gradient border-t border-border py-20 relative overflow-hidden">
      {/* Background animation */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, hsl(36 95% 55% / 0.05), transparent 50%)",
            "radial-gradient(circle at 80% 20%, hsl(36 95% 55% / 0.08), transparent 50%)",
            "radial-gradient(circle at 20% 80%, hsl(36 95% 55% / 0.05), transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <motion.div
            className="logo-icon"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-lg">B</span>
          </motion.div>
          <span className="text-2xl font-semibold tracking-wide">Balcore</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground max-w-xl mx-auto text-lg"
        >
          Balcore remains in research and development with a long-term horizon
          toward meaningful impact in DeFi.
        </motion.p>

        <motion.a
          href="https://x.com/Balcore"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary inline-flex mt-8"
        >
          Follow on X → @Balcore
          <ExternalLink className="w-4 h-4" />
        </motion.a>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-border"
        >
          <p className="text-sm text-muted-foreground">
            © 2024 Balcore. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
