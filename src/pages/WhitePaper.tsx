// import { motion } from "framer-motion";
// import { ChevronRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import NavBar from "@/components/sections/NavBar";
// import ReactMarkdownRenderer from "@/docs/MarkdownRenderer";
// import { whitePaperSection } from "@/docs/white-paper";

// const WhitePaper = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-background">
//       <NavBar />

//       <main className="pt-[72px] min-h-screen">
//         <div className="max-w-4xl mx-auto px-6 md:px-12 py-12">
//           <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
//             <button
//               onClick={() => navigate("/")}
//               className="hover:text-primary transition-colors"
//             >
//               Home
//             </button>
//             <ChevronRight className="w-3 h-3" />
//             <span className="text-primary">White Paper</span>
//           </div>

//           <motion.article
//             key={whitePaperSection.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="docs-content"
//           >
//             <ReactMarkdownRenderer content={whitePaperSection.content} />
//           </motion.article>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default WhitePaper;
