import { useNavigate } from "react-router-dom";
import balcoreLogo from "@/assets/images/BalcoreLogo.png";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const navigate = useNavigate();

  const linkCls =
    "text-[13px] font-medium tracking-[0.03em] text-white/55 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0";

  return (
    <footer className="bg-[#08080f] px-4 py-6 md:px-14 md:py-12">
      <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-[#0b0b12] px-6 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:px-10 md:py-9">
        <div className="flex flex-col items-start gap-7 md:flex-row md:items-center md:justify-between">
          <button
            onClick={() => {
              if (window.location.pathname !== "/") navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-3 bg-transparent border-none cursor-pointer"
            aria-label="Balcore home"
          >
            <img src={balcoreLogo} alt="Balcore" className="h-8 object-contain" />
          </button>

          <nav className="flex flex-wrap items-center gap-x-8 gap-y-4 md:gap-x-10" aria-label="Footer navigation">
            <button onClick={() => navigate("/docs")} className={linkCls}>
              Docs
            </button>
            <a
              href="https://cdn.balcore.ai/whitepaper.pdf"
              target="_blank"
              rel="noreferrer"
              className={linkCls}
            >
              Whitepaper
            </a>
            <button onClick={() => navigate("/team")} className={linkCls}>
              Team
            </button>
            <a href="/join-us" className={linkCls}>
              Join Balcore →
            </a>
          </nav>
        </div>

        <div className="my-7 h-px w-full bg-white/10" />

        <div className="flex flex-col items-start gap-4 text-[12px] tracking-[0.03em] text-white/35 md:flex-row md:items-center md:justify-between">
          <div>© 2026 Balcore. Built on Avalanche.</div>
          <a
            href="https://x.com/Balcore_ai"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-white/55 transition-colors hover:text-white"
          >
            <FaXTwitter className="text-base" />
            <span>@Balcore_ai</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
