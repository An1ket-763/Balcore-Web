import { ReactNode } from "react";

type MobileHeroToken = {
  id: string;
  logo: string;
  name: string;
  color: string;
  glow: string;
  tx: number;
  ty: number;
  fd: string;
  fdd: string;
  pd: string;
};

type MobileHeroAnimationProps = {
  tokens: MobileHeroToken[];
  logos: Record<string, ReactNode>;
};

const MobileHeroAnimation = ({ tokens, logos }: MobileHeroAnimationProps) => {
  return (
    <>
      <style>{`
        .balcore-mobile-scene-wrap {
          --mobile-scene-size: clamp(190px, 66vw, 280px);
          --mobile-scene-scale: calc(var(--mobile-scene-size) / 620);
          width: var(--mobile-scene-size);
          height: var(--mobile-scene-size);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
        .balcore-mobile-scene {
          position: relative;
          width: 540px;
          height: 540px;
          transform: scale(var(--mobile-scene-scale));
          transform-origin: center;
        }
        .balcore-mobile-ring { position: absolute;border-radius: 50%;top: 50%;left: 50%;transform: translate(-50%,-50%); }
        .balcore-mobile-ring1 { width: 148px;height: 148px;border: 1px solid rgba(138,92,246,0.5);animation: balcore-mobile-spin-r 18s linear infinite; }
        .balcore-mobile-ring2 { width: 256px;height: 256px;border: 1px dashed rgba(138,92,246,0.25);animation: balcore-mobile-spin-l 30s linear infinite; }
        .balcore-mobile-ring3 { width: 380px;height: 380px;border: 1px solid rgba(138,92,246,0.12);animation: balcore-mobile-spin-r 44s linear infinite; }
        .balcore-mobile-rdot { position: absolute;width: 5px;height: 5px;border-radius: 50%;background: rgba(138,92,246,0.75);box-shadow: 0 0 7px rgba(138,92,246,1); }
        .balcore-mobile-core {
          position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);
          width: 96px;height: 96px;border-radius: 50%;
          background: radial-gradient(circle,#2a1f6e 0%,#130e3a 60%,#07080f 100%);
          border: 2px solid rgba(138,92,246,0.85);
          display: flex;align-items: center;justify-content: center;flex-direction: column;
          animation: balcore-mobile-core-pulse 3s ease-in-out infinite;
          box-shadow: 0 0 32px rgba(138,92,246,0.45),0 0 65px rgba(138,92,246,0.18),inset 0 0 24px rgba(138,92,246,0.22);
        }
        .balcore-mobile-core-label { font-size: 10px;font-weight: 700;color: #fff;letter-spacing: 2px;font-family: "Clash Grotesk", sans-serif; }
        .balcore-mobile-core-sub { font-size: 7px;color: rgba(138,92,246,0.85);letter-spacing: 1.2px;margin-top: 2px; }
        .balcore-mobile-token { position: absolute;top: 50%;left: 50%; transform: translate(-50%, -50%); }
        .balcore-mobile-token-inner {
          width: 76px;height: 76px;border-radius: 50%;
          display: flex;flex-direction: column;align-items: center;justify-content: center;
          border: 2.5px solid;
          animation: balcore-mobile-token-float var(--fd,4s) ease-in-out infinite;
          animation-delay: var(--fdd,0s);
        }
        .balcore-mobile-token-name { font-size: 8px;color: rgba(255,255,255,0.75);margin-top: 3px;letter-spacing: .6px;font-weight: 500; }
        .balcore-mobile-token-pulse {
          position: absolute;width: 76px;height: 76px;border-radius: 50%;
          border: 2px solid var(--pc,#fff);
          animation: balcore-mobile-token-pulse 2.8s ease-out infinite;
          animation-delay: var(--pd,0s);
          top: 50%;left: 50%;transform: translate(-50%,-50%);
          pointer-events: none;
        }
        @keyframes balcore-mobile-spin-r { from { transform: translate(-50%,-50%) rotate(0); } to { transform: translate(-50%,-50%) rotate(360deg); } }
        @keyframes balcore-mobile-spin-l { from { transform: translate(-50%,-50%) rotate(0); } to { transform: translate(-50%,-50%) rotate(-360deg); } }
        @keyframes balcore-mobile-core-pulse {
          0%,100% { box-shadow: 0 0 32px rgba(138,92,246,0.45),0 0 65px rgba(138,92,246,0.18),inset 0 0 24px rgba(138,92,246,0.22); }
          50% { box-shadow: 0 0 55px rgba(138,92,246,0.72),0 0 100px rgba(138,92,246,0.32),inset 0 0 35px rgba(138,92,246,0.38); }
        }
        @keyframes balcore-mobile-token-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes balcore-mobile-token-pulse { 0% { transform: translate(-50%,-50%) scale(1);opacity: .6; } 100% { transform: translate(-50%,-50%) scale(2.2);opacity: 0; } }
      `}</style>

      <div className="balcore-mobile-scene-wrap">
        <div className="balcore-mobile-scene" aria-hidden="true">
          <div className="balcore-mobile-ring balcore-mobile-ring1">
            <div className="balcore-mobile-rdot" style={{ top: "-2px", left: "50%", transform: "translateX(-50%)" }} />
            <div className="balcore-mobile-rdot" style={{ bottom: "-2px", left: "50%", transform: "translateX(-50%)" }} />
          </div>
          <div className="balcore-mobile-ring balcore-mobile-ring2">
            <div className="balcore-mobile-rdot" style={{ top: "-2px", left: "50%", transform: "translateX(-50%)" }} />
            <div className="balcore-mobile-rdot" style={{ right: "-2px", top: "50%", transform: "translateY(-50%)" }} />
            <div className="balcore-mobile-rdot" style={{ bottom: "-2px", left: "50%", transform: "translateX(-50%)" }} />
            <div className="balcore-mobile-rdot" style={{ left: "-2px", top: "50%", transform: "translateY(-50%)" }} />
          </div>
          <div className="balcore-mobile-ring balcore-mobile-ring3">
            <div className="balcore-mobile-rdot" style={{ top: "-2px", left: "50%", transform: "translateX(-50%)" }} />
            <div className="balcore-mobile-rdot" style={{ right: "-2px", top: "50%", transform: "translateY(-50%)" }} />
            <div className="balcore-mobile-rdot" style={{ bottom: "-2px", left: "50%", transform: "translateX(-50%)" }} />
            <div className="balcore-mobile-rdot" style={{ left: "-2px", top: "50%", transform: "translateY(-50%)" }} />
          </div>
          <div className="balcore-mobile-core">
            <div className="balcore-mobile-core-label">BALCORE</div>
            <div className="balcore-mobile-core-sub">FLOWYIELD</div>
          </div>

          {tokens.map((token) => (
            <div
              key={token.id}
              className="balcore-mobile-token"
              style={{
                transform: `translate(calc(-50% + ${token.tx}px), calc(-50% + ${token.ty}px))`,
              }}
            >
              <div
                className="balcore-mobile-token-inner"
                style={{
                  background: `radial-gradient(circle, ${token.color}1a 0%, #0d0d1e 75%)`,
                  borderColor: token.color,
                  boxShadow: `0 0 18px ${token.glow}, 0 0 38px ${token.glow.replace("0.55", "0.12")}`,
                  ["--fd" as string]: token.fd,
                  ["--fdd" as string]: token.fdd,
                }}
              >
                {logos[token.logo]}
                <div className="balcore-mobile-token-name">{token.name}</div>
              </div>
              <div
                className="balcore-mobile-token-pulse"
                style={{
                  ["--pc" as string]: token.color,
                  ["--pd" as string]: token.pd,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileHeroAnimation;
