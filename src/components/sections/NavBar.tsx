import { motion } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";

const NavBar = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <motion.div
            className="logo-icon"
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span className="text-lg">B</span>
          </motion.div>
          <span className="text-xl font-semibold tracking-wide text-foreground">
            Balcore
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: "#learn-more", label: "Home" },
            { href: "#features", label: "Features" },
            { href: "#philosophy", label: "Page", hasDropdown: true },
            { href: "#audience", label: "System", hasDropdown: true },
          ].map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              className="nav-link flex items-center gap-1"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              {item.label}
              {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
            </motion.a>
          ))}
          <motion.a
            href="https://x.com/Balcore"
            target="_blank"
            rel="noreferrer"
            className="nav-link"
            whileHover={{ y: -2 }}
          >
            Contact Us
          </motion.a>
        </nav>

        <motion.a
          href="#learn-more"
          className="nav-btn hidden md:block"
          whileHover={{
            scale: 1.05,
            borderColor: "hsl(36, 95%, 55%)",
            color: "hsl(36, 95%, 55%)",
          }}
          whileTap={{ scale: 0.98 }}
        >
          Get Started
        </motion.a>

        {/* Mobile menu button */}
        <motion.a
          href="https://x.com/Balcore"
          target="_blank"
          rel="noreferrer"
          className="md:hidden flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
        >
          Follow on X
          <ExternalLink className="w-4 h-4" />
        </motion.a>
      </div>
    </motion.header>
  );
};

export default NavBar;
