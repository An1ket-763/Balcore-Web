import { motion, rgba, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Menu, X, Rocket } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import balcoreMark from "@/assets/images/Blogo.png";
import balcoreText from "@/assets/images/BalcoreTextLogo.png";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import CsModal from "@/components/ui/CsModal";

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
    ["rgba(15, 17, 21, 0)", "rgba(15, 17, 21, 0.9)"],
  );

  const navBorder = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.1)"],
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
    // If we're on non-home content pages, navigate to home first
    if (["/docs"].includes(location.pathname)) {
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
      "/what-we-do": "what-we-do",
      "/liquidity-engine": "liquidity",
      "/protocol": "protocol",
      "/try-it-yourself": "try-it-yourself",
      "/technology": "technology",
      "/contact": "footer",
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
    { sectionId: "what-we-do", label: "What We Do", path: "/what-we-do" },
    { sectionId: "protocol", label: "Protocol", path: "/protocol" },
    { sectionId: "try-it-yourself", label: "Try it Yourself", path: "/try-it-yourself" },
  ];

  const isDocsPage = location.pathname === "/docs";
  // const isWhitePaperPage = location.pathname === "/white-paper";

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          backgroundColor: "rgba(8,8,15,.72)",
          borderBottomColor: navBorder,
        }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mobile-layout-shell py-3.5 sm:py-4 flex justify-between items-center gap-3">
          <motion.a
            onClick={() => handleNavClick("top", "/")}
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.02 }}
            role="button"
          >
            {/* Logo Mark */}
            {/* Logo Mark */}
            <motion.img
              src={balcoreMark}
              alt="Balcore Logo"
              className="h-11 sm:h-13 w-auto object-contain"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />

            {/* Logo Text */}
            <motion.img
              src={balcoreText}
              alt="Balcore"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden min-[1025px]:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.button
                key={i}
                onClick={() => handleNavClick(item.sectionId, item.path)}
                className="nav-link flex items-center gap-1 relative group bg-transparent border-none cursor-pointer"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
                <motion.span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.button>
            ))}
            <motion.button
              onClick={() => navigate("/learn")}
              className={`nav-link flex items-center gap-1 relative group bg-transparent border-none cursor-pointer ${location.pathname === "/learn" ? "text-primary" : ""
                }`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Learn
              <motion.span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.button>
            <motion.button
              onClick={() => navigate("/docs")}
              className={`nav-link flex items-center gap-1 relative group bg-transparent border-none cursor-pointer ${isDocsPage ? "text-primary" : ""
                }`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Docs
              <motion.span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.button>
            <motion.button
              onClick={() => navigate("/join-us")}
              className={`nav-link flex items-center gap-1 relative group bg-transparent border-none cursor-pointer ${location.pathname === "/join-us" ? "text-primary" : ""
                }`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              Join Us
              <motion.span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.button>
            {/* <motion.button
              onClick={() => navigate("/white-paper")}
              className={`nav-link flex items-center gap-1 relative group bg-transparent border-none cursor-pointer ${
                isWhitePaperPage ? "text-primary" : ""
              }`}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              White Paper
              <motion.span
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
              />
            </motion.button> */}
          </nav>

          <motion.button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary hidden min-[1025px]:flex items-center gap-2 relative overflow-hidden group"
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
            className="min-[1025px]:hidden p-2 text-white shrink-0"
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
          className="min-[1025px]:hidden overflow-hidden bg-background/95 backdrop-blur-xl border-t border-border shadow-2xl"
        >
          <nav className="px-4 sm:px-6 py-4 space-y-3">
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
                navigate("/learn");
              }}
              className={`block transition-colors py-2 bg-transparent border-none cursor-pointer text-left w-full ${location.pathname === "/learn"
                ? "text-primary"
                : "text-white/80 hover:text-white/85"
                }`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: navItems.length * 0.1 }}
            >
              Learn
            </motion.button>
            <motion.button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/docs");
              }}
              className={`block transition-colors py-2 bg-transparent border-none cursor-pointer text-left w-full ${isDocsPage
                ? "text-primary"
                : "text-white/80 hover:text-white/85"
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
                navigate("/join-us");
              }}
              className={`block transition-colors py-2 bg-transparent border-none cursor-pointer text-left w-full ${location.pathname === "/join-us"
                ? "text-primary"
                : "text-white/80 hover:text-white/85"
                }`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: (navItems.length + 2) * 0.1 }}
            >
              Join Us
            </motion.button>
            {/* <motion.button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigate("/white-paper");
              }}
              className={`block transition-colors py-2 bg-transparent border-none cursor-pointer text-left w-full ${isWhitePaperPage
                ? "text-primary"
                : "text-white/80 hover:text-white/85"
                }`}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: (navItems.length + 1) * 0.1 }}
            >
              White Paper
            </motion.button> */}
            <motion.button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 text-white py-2.5 font-medium w-full justify-start"
            >
              <Rocket className="w-4 h-4" />
              Launch App
            </motion.button>
            <motion.a
              href="https://x.com/Balcore_ai"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-white/80 py-2.5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Follow on X
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </nav>
        </motion.div>
      </motion.header>

      {/* Coming Soon Modal */}
      <CsModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />

      {/* Spacer for fixed navbar */}
      <div className="h-0" />
    </>
  );
};

export default NavBar;