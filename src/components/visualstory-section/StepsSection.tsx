import { useReveal } from "./useReveal";

type Step = {
  num: string;
  title: string;
  description: string;
  icon: JSX.Element;
};

const steps: Step[] = [
  {
    num: "01",
    title: "Provide liquidity",
    description:
      "Deposit your assets. Instead of sitting idle, they take a seat as the market maker on every trade that routes through your range.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3v13" />
        <path d="m7 12 5 5 5-5" />
        <path d="M4 20h16" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "The engine works the range",
    description:
      "A deterministic, rules-based engine holds your liquidity where the trading happens and adjusts around the clock as price moves — placing, tightening, and stepping aside on the levels it trusts.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 20a8 8 0 1 0-8-8" />
        <path d="M4 12H2m2 0 2.5-2.5" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Earn the fees, keep your keys",
    description:
      "Every swap against your liquidity pays a fee that's yours. Price-swing impact is neutralized, your principal is protected, and self-custody never leaves your hands.",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a4 4 0 0 1 8 0v2" />
        <path d="M12 12v3" />
      </svg>
    ),
  },
];

const StepCard = ({ step }: { step: Step }) => {
  const { ref, revealed } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`mm-step mm-reveal ${revealed ? "mm-in" : ""}`}
    >
      <div className="mm-num">{step.num}</div>
      <div className="mm-ico">{step.icon}</div>
      <h3>{step.title}</h3>
      <p>{step.description}</p>
    </div>
  );
};

const StepsSection = () => {
  const headReveal = useReveal<HTMLDivElement>();

  return (
    <section className="mm-wrap mm-steps-sec">
      <div
        ref={headReveal.ref}
        className={`mm-steps-head mm-reveal ${
          headReveal.revealed ? "mm-in" : ""
        }`}
      >
        <h2>Three moves, on repeat</h2>
        <p>No charts to watch. No trades to time. The engine runs the loop for you.</p>
      </div>
      <div className="mm-steps">
        {steps.map((step) => (
          <StepCard key={step.num} step={step} />
        ))}
      </div>
    </section>
  );
};

export default StepsSection;
