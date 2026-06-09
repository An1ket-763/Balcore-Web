import { useEffect, useRef } from "react";
import "../TIY section/tiy.css";
import BgLayer from "../TIY section/BgLayer";
import TiyHero from "../TIY section/TiyHero";
import InputsCard from "../TIY section/InputsCard";
import ResultsCard from "../TIY section/ResultsCard";
import ExcessCard from "../TIY section/ExcessCard";
import UnderTheHoodCard from "../TIY section/UnderTheHoodCard";
import Disclaimer from "../TIY section/Disclaimer";
import CtaRow from "../TIY section/CtaRow";
import { initTiy } from "../TIY section/useTiyLogic";

const TryItYourselfSection = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const cleanup = initTiy(rootRef.current);
    return cleanup;
  }, []);

  return (
    <section id="try-it-yourself" className="tiy-root" ref={rootRef}>
      <BgLayer />
      <div className="wrap">
        <TiyHero />
        <div className="calc">
          <InputsCard />
          <ResultsCard />
        </div>
        <ExcessCard />
        <UnderTheHoodCard />
        <Disclaimer />
        <CtaRow />
      </div>
    </section>
  );
};

export default TryItYourselfSection;
