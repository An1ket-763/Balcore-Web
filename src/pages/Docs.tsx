import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, BookOpen } from "lucide-react";
import NavBar from "@/components/sections/NavBar";
import { docsContent } from "@/content";
import ReactMarkdownRenderer from "@/content/MarkdownRenderer";

const Docs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Get active section from hash or default to first
  const hash = location.hash.replace("#", "");
  const activeSection = docsContent.find((s) => s.id === hash) || docsContent[0];

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeSection.id]);

const handleSectionClick = (id: string) => {
  navigate(`/docs#${id}`, { replace: true });

  if (id === "whitepaper") {
    window.open("https://cdn.balcore.ai/whitepaper.pdf", "_blank");
  }

  setMobileSidebarOpen(false);
};

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <div className="flex pt-[72px]">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden lg:flex flex-col fixed top-[72px] left-0 bottom-0 z-40 transition-all duration-300 ${
            sidebarOpen ? "w-72" : "w-0"
          }`}
        >
          <div className="h-full overflow-hidden border-r border-border/50 bg-card/50 backdrop-blur-xl">
            <div className="flex items-center justify-between p-5 border-b border-border/50">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-foreground tracking-wide uppercase">
                  Documentation
                </span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-md hover:bg-muted/50 text-muted-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-60px)]">
              {docsContent.map((section, i) => (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 group ${
                    activeSection.id === section.id
                      ? "bg-primary/10 text-primary border border-primary/20 font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                  }`}
                >
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold transition-colors ${
                      activeSection.id === section.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 text-muted-foreground group-hover:bg-muted"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <span className="truncate">{section.shortTitle}</span>
                  {activeSection.id === section.id && (
                    <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0 text-primary" />
                  )}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Sidebar toggle when collapsed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="hidden lg:flex fixed top-[88px] left-4 z-50 p-2 rounded-lg bg-card border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="lg:hidden fixed top-[88px] left-4 z-50 p-2 rounded-lg bg-card border border-border/50 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileSidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                onClick={() => setMobileSidebarOpen(false)}
              />
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="lg:hidden fixed top-0 left-0 bottom-0 w-72 z-50 bg-card border-r border-border/50"
              >
                <div className="flex items-center justify-between p-5 border-b border-border/50 mt-[72px]">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="text-sm font-semibold text-foreground tracking-wide uppercase">
                      Documentation
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 rounded-md hover:bg-muted/50 text-muted-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-132px)]">
                  {docsContent.map((section, i) => (
                    <button
                      key={section.id}
                      onClick={() => handleSectionClick(section.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 group ${
                        activeSection.id === section.id
                          ? "bg-primary/10 text-primary border border-primary/20 font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                      }`}
                    >
                      <span
                        className={`flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold transition-colors ${
                          activeSection.id === section.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted/50 text-muted-foreground group-hover:bg-muted"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="truncate">{section.shortTitle}</span>
                    </button>
                  ))}
                </nav>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main
          className={`flex-1 min-h-screen transition-all duration-300 ${
            sidebarOpen ? "lg:ml-72" : "lg:ml-0"
          }`}
        >
          <div className="max-w-4xl mx-auto px-6 md:px-12 pt-6 pb-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <button
                onClick={() => navigate("/")}
                className="hover:text-primary transition-colors"
              >
                Home
              </button>
              <ChevronRight className="w-3 h-3" />
              <span className="text-primary">Docs</span>
              <ChevronRight className="w-3 h-3" />
              <span className="text-foreground">{activeSection.shortTitle}</span>
            </div>

            {/* Doc content */}
            <motion.article
              key={activeSection.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="docs-content"
            >
              <ReactMarkdownRenderer content={activeSection.content} />
            </motion.article>

            {/* Prev/Next navigation */}
            <div className="flex justify-between items-center mt-16 pt-8 border-t border-border/50">
              {(() => {
                const currentIndex = docsContent.findIndex(
                  (s) => s.id === activeSection.id
                );
                const prev = currentIndex > 0 ? docsContent[currentIndex - 1] : null;
                const next =
                  currentIndex < docsContent.length - 1
                    ? docsContent[currentIndex + 1]
                    : null;
                return (
                  <>
                    {prev ? (
                      <button
                        onClick={() => handleSectionClick(prev.id)}
                        className="text-left group"
                      >
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          Previous
                        </span>
                        <p className="text-sm text-foreground group-hover:text-primary transition-colors mt-1">
                          ← {prev.shortTitle}
                        </p>
                      </button>
                    ) : (
                      <div />
                    )}
                    {next ? (
                      <button
                        onClick={() => handleSectionClick(next.id)}
                        className="text-right group"
                      >
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          Next
                        </span>
                        <p className="text-sm text-foreground group-hover:text-primary transition-colors mt-1">
                          {next.shortTitle} →
                        </p>
                      </button>
                    ) : (
                      <div />
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Docs;
