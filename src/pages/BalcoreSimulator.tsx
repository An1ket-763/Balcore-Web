import { useEffect, useRef } from "react";
import NavBar from "@/components/sections/NavBar";
import Footer from "@/components/sections/Footer";
import "./BalcoreSimulator.css";
import bodyHtml from "./_bsim_body.html?raw";
import simScript from "./_bsim_script.js?raw";

const BalcoreSimulator = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    // Execute simulator script scoped to this mount. It references DOM by IDs
    // which live inside rootRef after dangerouslySetInnerHTML.
    const script = document.createElement("script");
    script.textContent = simScript;
    document.body.appendChild(script);
    return () => {
      try {
        document.body.removeChild(script);
      } catch (_) {
        /* noop */
      }
    };
  }, []);

  return (
    <>
      <NavBar />
      <div style={{ height: 72 }} />
      <div
        ref={rootRef}
        className="bsim-root"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
      <Footer />
    </>
  );
};

export default BalcoreSimulator;
