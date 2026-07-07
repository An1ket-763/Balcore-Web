import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Docs from "./pages/Docs";
import JoinResearch from "./pages/JoinResearch";
import Team from "./pages/Team";
import LearnTab from "./pages/LearnTab";
import NotFound from "./pages/NotFound";
// import WhitePaper from "./pages/WhitePaper";

const queryClient = new QueryClient();

const App = () => (
  <div>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/what-we-do" element={<Index />} />
            <Route path="/liquidity-engine" element={<Index />} />
            <Route path="/protocol" element={<Index />} />
            <Route path="/try-it-yourself" element={<Index />} />
            <Route path="/technology" element={<Index />} />
            <Route path="/contact" element={<Index />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/team" element={<Team />} />
            <Route path="/join-us" element={<JoinResearch />} />
            {/* <Route path="/white-paper" element={<WhitePaper />} /> */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </div>
);

export default App;
