import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ExternalLink, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(15, 17, 21, 0)", "rgba(15, 17, 21, 0.9)"]
  );

  const navBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.1)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "#learn-more", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#philosophy", label: "About", hasDropdown: true },
    { href: "#audience", label: "Protocol", hasDropdown: true },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          backgroundColor: navBackground,
          borderBottomColor: navBorder,
        }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.a
            href="#"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="logo-icon relative"
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-lg relative z-10">B</span>
              <motion.div
                className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-orange-dark opacity-0"
                whileHover={{ opacity: 0.5 }}
              />
            </motion.div>
            <span className="text-xl font-semibold tracking-wide text-foreground">
              Balcore
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                className="nav-link flex items-center gap-1 relative group"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
                {item.hasDropdown && <ChevronDown className="w-4 h-4" />}
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
              </motion.a>
            ))}
            <motion.a
              href="https://x.com/Balcore"
              target="_blank"
              rel="noreferrer"
              className="nav-link flex items-center gap-1"
              whileHover={{ y: -2 }}
            >
              Contact
              <ExternalLink className="w-3 h-3" />
            </motion.a>
          </nav>

          <motion.a
            href="#learn-more"
            className="nav-btn hidden md:flex items-center gap-2 relative overflow-hidden group"
            whileHover={{
              scale: 1.05,
              borderColor: "hsl(36, 95%, 55%)",
              color: "hsl(36, 95%, 55%)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Get Started</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.a>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMobileMenuOpen ? "auto" : 0,
            opacity: isMobileMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border"
        >
          <nav className="px-6 py-4 space-y-4">
            {navItems.map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                className="block text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="https://x.com/Balcore"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-primary py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Follow on X
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </nav>
        </motion.div>
      </motion.header>

      {/* Spacer for fixed navbar */}
      <div className="h-0" />
    </>
  );
};

export default NavBar;
