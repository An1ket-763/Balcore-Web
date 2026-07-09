// src/components/sections/TechnologySection.tsx
import horizonBg from "@/assets/images/horizon-bg.jpg";

const TechnologySection = () => {
  return (
    <>
      <style>{`
        .horizon{
          position:relative;
          min-height:660px;
          display:flex;align-items:center;
          background-image:url(${horizonBg});
          background-size:cover;
          background-position:center 30%;
          overflow:hidden;
          isolation:isolate;
          --bg:#050509;
          --ink:#f2f1f5;
          --mute:#c3c2cf;
          --brand:#7328d3;
          --brand-hi:#a372e2;
          font-family:'Poppins',sans-serif;
        }
        .horizon::before{
          content:"";position:absolute;inset:0;z-index:-1;
          background:linear-gradient(90deg,
            rgba(5,5,9,.94) 0%,
            rgba(5,5,9,.86) 30%,
            rgba(5,5,9,.55) 52%,
            rgba(5,5,9,.12) 72%,
            rgba(5,5,9,0) 88%);
        }
        .horizon::after{
          content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;
          background:linear-gradient(180deg,
            rgba(5,5,9,.85) 0%,
            rgba(5,5,9,0) 22%,
            rgba(5,5,9,0) 72%,
            rgba(5,5,9,.9) 100%);
        }
        .horizon .inner{max-width:1440px;margin:0 auto;padding:0 44px;width:100%}
        .horizon .copy{max-width:560px}
        .horizon .eyebrow{
          display:flex;align-items:center;gap:14px;
          font-family:'IBM Plex Mono',monospace;font-weight:600;
          font-size:13px;letter-spacing:.22em;text-transform:uppercase;
          color:var(--brand-hi);margin-bottom:26px;
        }
        .horizon .eyebrow::before{content:"";width:34px;height:2px;background:var(--brand)}
        .horizon .lead{
          font-family:'Barlow Condensed',sans-serif;font-weight:700;
          text-transform:uppercase;color:var(--ink);
          font-size:clamp(38px,4.6vw,62px);line-height:.98;letter-spacing:.005em;
          margin-bottom:26px;
          text-shadow:0 2px 30px rgba(0,0,0,.5);
        }
        .horizon .body{color:var(--mute);font-size:18px;line-height:1.7;max-width:440px;margin-bottom:14px}
        .horizon .body strong{color:var(--ink);font-weight:600}
        .horizon .closer{
          font-family:'Barlow Condensed',sans-serif;font-weight:600;
          text-transform:uppercase;letter-spacing:.02em;
          font-size:clamp(24px,2.4vw,32px);color:var(--ink);
          margin-top:22px;
        }
        .horizon .signoff{
          font-family:'Barlow Condensed',sans-serif;font-weight:700;
          text-transform:uppercase;letter-spacing:.06em;
          font-size:clamp(15px,1.4vw,19px);color:var(--brand-hi);
          margin-top:12px;
        }
        @media (max-width:820px){
          .horizon{min-height:600px;background-position:center 26%}
          .horizon::before{
            background:linear-gradient(180deg,
              rgba(5,5,9,.72) 0%,
              rgba(5,5,9,.82) 100%);
          }
          .horizon .inner{padding:0 24px}
          .horizon .copy{max-width:none;text-align:left}
          .horizon .body{max-width:none}
        }
        @media (max-width:640px){
          .horizon .lead{font-size:clamp(28px,9vw,38px)}
          .horizon .closer{font-size:clamp(20px,6vw,28px)}
          .horizon .signoff{font-size:clamp(13px,4vw,17px)}
        }
        @media (prefers-reduced-motion: reduce){.horizon *{transition:none!important}}
      `}</style>

      <section id="technology" className="horizon" aria-label="The view ahead">
        <div className="inner">
          <div className="copy">
            <div className="eyebrow">The view from here</div>
            <h2 className="lead">The future of liquidity orchestration looks clear from up here.</h2>
            <p className="body">Sit back. Let <strong>Balcore</strong> do the heavy lifting.</p>
            <div className="closer">Watch the horizon expand.</div>
            <div className="signoff">Be the Market Maker.</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TechnologySection;
