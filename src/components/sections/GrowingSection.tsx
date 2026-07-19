import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CsModal from "@/components/ui/CsModal";

const GrowingSection = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="growing"
      className="relative border-b border-white/5 bg-[#06060f] px-5 py-16 md:py-24"
    >
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-5 flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-[#a78bfa]">
          <span className="h-[1px] w-8 bg-[#8b5cf6]" />
          Growing Every Year
        </div>

        <h2
          className="mb-6 font-black uppercase leading-[0.95] tracking-[-0.01em] text-white"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "clamp(30px, 6vw, 56px)",
          }}
        >
          Built for everyone who deserves better yield.
        </h2>

        <p className="mx-auto mb-9 max-w-2xl text-[14px] leading-[1.75] text-white/60 md:text-[15px]">
          BalCore has grown in users, capital, and protocol depth every quarter.
          We continue to navigate volatile markets by solving the problems others
          avoid — staying persistent, rigorous, and innovative.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#7c3aed] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#6d28d9] hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(124,58,237,0.4)]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Get Started
          </button>
          <button
            onClick={() => navigate("/docs")}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-transparent px-6 py-3 text-sm font-medium text-white/80 transition-all hover:border-white/35 hover:text-white"
          >
            Read the Docs
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <CsModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </section>
  );
};

export default GrowingSection;
