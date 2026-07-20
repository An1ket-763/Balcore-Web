import { useEffect } from "react";
import NavBar from "@/components/sections/NavBar";
import Footer from "@/components/sections/Footer";
import "./BalcoreSimulator.css";
import BsimBody from "./_bsim_body.jsx";
import simScript from "./_bsim_script.jsx";

const BalcoreSimulator = () => {
  useEffect(() => {
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
      <div className="bsim-root">
        <BsimBody />
      </div>
      <Footer />
    </>
  );
};

export default BalcoreSimulator;
