import { motion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Menu, X, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (sectionId: string, path: string) => {
    // If we're on the docs page, navigate to home first
    if (location.pathname === "/docs") {
      navigate(path);
      return;
    }
    if (sectionId === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      scrollToSection(sectionId);
    }
    setIsMobileMenuOpen(false);

    if (location.pathname !== path) {
      navigate(path);
    }
  };

  useEffect(() => {
    const pathToSection: Record<string, string> = {
      "/": "top",
      "/about": "why-balcore",
      "/protocol": "what-balcore-does",
    };

    const sectionId = pathToSection[location.pathname];
    if (!sectionId) return;

    const timeout = window.setTimeout(() => {
      if (sectionId === "top") {
        window.scrollTo({ top: 0, behavior: "auto" });
      } else {
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: "auto" });
        }
      }
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [location.pathname]);

  const navItems = [
    { sectionId: "top", label: "Home", path: "/" },
    { sectionId: "why-balcore", label: "About", path: "/about" },
    { sectionId: "what-balcore-does", label: "Protocol", path: "/protocol" },
    { sectionId: "footer", label: "Contact", path: "/contact" },
  ];

  const isDocsPage = location.pathname === "/docs";

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
            onClick={() => handleNavClick("top", "/")}
            className="flex items-center gap-3 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            role="button"
          >
            <motion.img
              src="/BalcoreLogo.png"
              alt="Balcore logo"
              className="h-10 object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => handleNavClick(item.sectionId, item.path)}
                className="nav-link flex items-center gap-1 relative group bg-transparent border-none cursor-pointer"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                />
              </motion.button>
            ))}
            <motion.button
              onClick={() => navigate("/docs")}
              className={`nav-link flex items-center gap-1 relative group bg-transparent border-none cursor-pointer ${
                isDocsPage ? "text-primary" : ""
              }`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Docs
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              />
            </motion.button>
          </nav>

          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary hidden md:flex items-center gap-2 relative overflow-hidden group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Rocket className="w-4 h-4 text-white" />
            <span className="relative z-10 text-white">Launch App</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
              animate={{ translateX: ["-100%", "200%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          </motion.button>

          {/* Mobile menu button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
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
              <motion.button
                key={i}
                onClick={() => handleNavClick(item.sectionId, item.path)}
                className="block text-white/80 hover:text-white/85 transition-colors py-2 bg-transparent border-none cursor-pointer text-left w-full"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/docs");
              }}
              className={`block transition-colors py-2 bg-transparent border-none cursor-pointer text-left w-full ${
                isDocsPage ? "text-primary" : "text-white/80 hover:text-white/85"
              }`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: navItems.length * 0.1 }}
            >
              Docs
            </motion.button>
            <motion.button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 text-white py-2 font-medium"
            >
              <Rocket className="w-4 h-4" />
              Launch App
            </motion.button>
            <motion.a
              href="https://x.com/Balcore_ai"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white/80 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Follow on X
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </nav>
        </motion.div>
      </motion.header>

      {/* Coming Soon Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-background/95 backdrop-blur-xl border-border sm:max-w-md">
          <DialogHeader className="text-center sm:text-center">
            <motion.div
              className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Rocket className="w-8 h-8 text-color" />
              </motion.div>
            </motion.div>
            <DialogTitle className="text-2xl font-bold">
              <span className="gradient-text">Coming Soon</span>
            </DialogTitle>
            <DialogDescription className="text-white/80 mt-2">
              We're working hard to bring you the next generation of DeFi liquidity infrastructure. Stay tuned!
            </DialogDescription>
          </DialogHeader>

          <motion.div
            className="mt-6 flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.a
              href="https://x.com/Balcore_ai"
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full justify-center flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow for Updates
            </motion.a>
            <motion.button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-2.5 px-4 rounded-lg border border-border text-white/80 hover:text-white hover:border-primary/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Close
            </motion.button>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Spacer for fixed navbar */}
      <div className="h-0" />
    </>
  );
};

export default NavBar;
