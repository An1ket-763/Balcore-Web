import { useEffect, useRef } from "react";
import "@/features/try-it-yourself/tiy.css";
import BgLayer from "@/features/try-it-yourself/components/BgLayer";
import TiyHero from "@/features/try-it-yourself/components/TiyHero";
import InputsCard from "@/features/try-it-yourself/components/InputsCard";
import ResultsCard from "@/features/try-it-yourself/components/ResultsCard";
import ExcessCard from "@/features/try-it-yourself/components/ExcessCard";
import UnderTheHoodCard from "@/features/try-it-yourself/components/UnderTheHoodCard";
import Disclaimer from "@/features/try-it-yourself/components/Disclaimer";
import CtaRow from "@/features/try-it-yourself/components/CtaRow";
import { initTiy } from "@/features/try-it-yourself/hooks/useTiyLogic";

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
