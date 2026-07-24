import { Route, Routes } from "react-router-dom";
import Index from "@/pages/Index";
import Docs from "@/pages/Docs";
import JoinResearch from "@/pages/JoinResearch";
import Team from "@/pages/Team";
import LearnTab from "@/pages/LearnTab";
import BusinessPerspective from "@/pages/BusinessPerspective";
import BalcoreSimulator from "@/features/simulator/BalcoreSimulator";
import NotFound from "@/pages/NotFound";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/what-we-do" element={<Index />} />
    <Route path="/liquidity-engine" element={<Index />} />
    <Route path="/try-it-yourself" element={<Index />} />
    <Route path="/technology" element={<Index />} />
    <Route path="/contact" element={<Index />} />
    <Route path="/docs" element={<Docs />} />
    <Route path="/learn" element={<LearnTab />} />
    <Route path="/team" element={<Team />} />
    <Route path="/join-us" element={<JoinResearch />} />
    <Route path="/business-perspective" element={<BusinessPerspective />} />
    <Route path="/simulator" element={<BalcoreSimulator />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
