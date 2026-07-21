import { useReveal } from "./hooks/useReveal";

const CloserSection = () => {
  const { ref, revealed } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className={`mm-wrap mm-closer mm-reveal ${revealed ? "mm-in" : ""}`}
    >
      <div className="mm-line">
        Be the <span className="mm-g">Market Maker</span>
      </div>
      <br />
      <a className="mm-cta" href="#">
        Try it yourself
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </section>
  );
};

export default CloserSection;
