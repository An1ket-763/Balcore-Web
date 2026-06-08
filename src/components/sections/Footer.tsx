import { useNavigate } from "react-router-dom";
import balcoreLogo from "@/assets/images/BalcoreLogo.png";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  const navigate = useNavigate();

  const linkCls =
    "text-[12px] tracking-[0.05em] text-white/50 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0";

  return (
    <footer className="border-t border-white/10 bg-[#08080f] px-6 py-12 md:px-14">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
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

        <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
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
          <button onClick={() => navigate("/join-us")} className={linkCls}>
            Join Balcore
          </button>
          <a
            href="https://x.com/Balcore_ai"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[12px] tracking-[0.05em] text-white/50 hover:text-white transition-colors"
          >
            <FaXTwitter className="text-base" />
            <span>→ @Balcore_ai</span>
          </a>
        </div>

        <div className="text-[11.5px] text-white/30">
          © 2026 Balcore. Built on Avalanche.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
