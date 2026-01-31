import { motion } from "framer-motion";
import { ExternalLink, Github, MessageCircle } from "lucide-react";

const FooterSection = () => {
  const footerLinks = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#learn-more" },
    { label: "FAQ", href: "#faq" },
  ];

  const socialLinks = [
    {
      icon: <ExternalLink className="w-4 h-4" />,
      label: "Twitter",
      href: "https://x.com/Balcore",
    },
    {
      icon: <MessageCircle className="w-4 h-4" />,
      label: "Discord",
      href: "#",
    },
    { icon: <Github className="w-4 h-4" />, label: "GitHub", href: "#" },
  ];

  return (
    <footer className="footer-gradient border-t border-border py-20 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 80%, hsl(36 95% 55% / 0.05), transparent 50%)",
            "radial-gradient(circle at 80% 20%, hsl(36 95% 55% / 0.08), transparent 50%)",
            "radial-gradient(circle at 20% 80%, hsl(36 95% 55% / 0.05), transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="logo-icon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-lg">B</span>
              </motion.div>
              <span className="text-2xl font-semibold tracking-wide">
                Balcore
              </span>
            </motion.div>

            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Balcore remains in research and development with a long-term
              horizon toward meaningful impact in DeFi liquidity infrastructure.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <motion.span className="opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </motion.span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Follow our journey and be the first to know about updates.
            </p>
            <motion.a
              href="https://x.com/Balcore"
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-flex text-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Follow @Balcore
              <ExternalLink className="w-4 h-4 ml-2" />
            </motion.a>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © 2024 Balcore. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
