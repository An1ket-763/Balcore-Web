import "../App.css";
import {
  Activity,
  Shield,
  Layers,
  Users,
  Lightbulb,
  Code,
  ExternalLink,
  Play,
  ChevronDown,
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="logo-icon">
              <span className="text-lg">B</span>
            </div>
            <span className="text-xl font-semibold tracking-wide text-foreground">
              Balcore
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#learn-more" className="nav-link">
              Home
            </a>
            <a href="#features" className="nav-link">
              Features
            </a>
            <a href="#philosophy" className="nav-link flex items-center gap-1">
              Page <ChevronDown className="w-4 h-4" />
            </a>
            <a href="#audience" className="nav-link flex items-center gap-1">
              System <ChevronDown className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/Balcore"
              target="_blank"
              rel="noreferrer"
              className="nav-link"
            >
              Contact Us
            </a>
          </nav>

          <a href="#learn-more" className="nav-btn hidden md:block">
            Get Started
          </a>

          {/* Mobile menu button */}
          <a
            href="https://x.com/Balcore"
            target="_blank"
            rel="noreferrer"
            className="md:hidden flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Follow on X
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-section relative min-h-[85vh] flex items-center">
        {/* Background effects */}
        <div className="particle-field" />
        <div className="network-lines" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />

        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
          <p className="section-subtitle animate-fade-up">
            CRYPTOCURRENCY BLOCKCHAIN
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl mt-6 animate-fade-up delay-1">
            <span className="gradient-text shimmer-text">Revolutionizing</span>{" "}
            Transactions
            <br />
            with Blockchain
          </h1>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl animate-fade-up delay-2">
            Balcore is building continuous balance and yield infrastructure for
            AMM DEXs, with impermanent loss reduction at the core. Next-gen DeFi
            made simple.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6 animate-fade-up delay-3">
            <a href="#learn-more" className="btn-primary">
              Get Started Now
            </a>

            <div className="flex items-center gap-4">
              <button className="play-btn">
                <Play className="w-5 h-5 ml-0.5" />
              </button>
              <span className="text-foreground font-medium">Watch Video</span>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section
        id="learn-more"
        className="max-w-7xl mx-auto px-6 py-24 border-t border-border"
      >
        <div className="animate-fade-up">
          <p className="section-subtitle">About Balcore</p>
          <h2 className="section-title text-3xl md:text-4xl mt-4">
            The Missing Layer in DeFi Liquidity
          </h2>
          <p className="section-text mt-6">
            Automated market makers unlocked open liquidity for decentralized
            finance, but introduced structural challenges for liquidity
            providers. Liquidity can be inefficient, yields can vary wildly, and
            impermanent loss remains a deterrent for long-term participation.
          </p>
          <p className="section-text mt-4">
            Balcore is tackling these challenges at their foundation with
            infrastructure designed for tomorrow's AMMs and LP ecosystems.
          </p>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-border">
        <div className="animate-fade-up">
          <p className="section-subtitle">The Challenge</p>
          <h2 className="section-title text-3xl md:text-4xl mt-4">
            The Problem Explained
          </h2>
          <p className="section-text mt-6">
            Traditional AMM designs treat liquidity as static, reacting only to
            price changes rather than anticipating them. This can expose
            liquidity providers to repeated value loss and unpredictable
            returns.
          </p>
          <p className="section-text mt-4">
            As markets evolve, so must the systems that support them — moving
            beyond passive models toward dynamic balance and sustainable yield.
          </p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="max-w-7xl mx-auto px-6 py-24 border-t border-border">
        <div className="animate-fade-up">
          <p className="section-subtitle">Our Vision</p>
          <h2 className="section-title text-3xl md:text-4xl mt-4">
            A New Way to Think About Liquidity
          </h2>
          <p className="text-foreground/80 italic text-xl mt-6 mb-8 border-l-2 border-primary pl-6">
            "Markets move continuously. Liquidity should too."
          </p>
          <p className="section-text">
            Balcore embraces a perspective where capital isn't parked — it
            adapts. This means thinking beyond one-time placement toward
            infrastructure that understands balance, duration, and long-term
            participation.
          </p>
        </div>
      </section>

      {/* FOCUS AREAS */}
      <section
        id="features"
        className="max-w-7xl mx-auto px-6 py-24 border-t border-border"
      >
        <p className="section-subtitle animate-fade-up">Core Features</p>
        <h2 className="section-title text-3xl md:text-4xl mt-4 animate-fade-up">
          What Balcore Focuses On
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            {
              icon: <Activity className="w-6 h-6" />,
              title: "Continuous Balance",
              desc: "Real-time awareness of liquidity position and market dynamics.",
            },
            {
              icon: <Layers className="w-6 h-6" />,
              title: "Yield Sustainability",
              desc: "Building for consistent returns rather than volatile spikes.",
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Risk-Aware Design",
              desc: "Proactive protection against impermanent loss exposure.",
            },
            {
              icon: <Code className="w-6 h-6" />,
              title: "AMM-Native",
              desc: "Purpose-built systems for next-generation decentralized exchanges.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="feature-card animate-fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="feature-icon">{item.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mt-5">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* AUDIENCE */}
      <section
        id="audience"
        className="max-w-7xl mx-auto px-6 py-24 border-t border-border"
      >
        <p className="section-subtitle animate-fade-up">Who It's For</p>
        <h2 className="section-title text-3xl md:text-4xl mt-4 animate-fade-up">
          Built for Long-Term Participation
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {[
            {
              icon: <Users className="w-6 h-6" />,
              title: "Liquidity Providers",
              desc: "For participants who want yield without unnecessary exposure — capital that works with markets, not against them.",
            },
            {
              icon: <Layers className="w-6 h-6" />,
              title: "AMM Protocols",
              desc: "For teams rethinking solvent, sustainable liquidity, offering deeper utility without sacrificing stability.",
            },
            {
              icon: <Lightbulb className="w-6 h-6" />,
              title: "Builders & Researchers",
              desc: "For innovators focused on foundational DeFi infrastructure, purpose-built systems that align incentives.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="feature-card animate-fade-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="feature-icon">{item.icon}</div>
              <h3 className="text-lg font-semibold text-foreground mt-5">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY NOTES */}
      <section
        id="philosophy"
        className="max-w-7xl mx-auto px-6 py-24 border-t border-border"
      >
        <p className="section-subtitle animate-fade-up">Principles</p>
        <h2 className="section-title text-3xl md:text-4xl mt-4 animate-fade-up">
          Our Philosophy
        </h2>
        <div className="space-y-4 mt-10 max-w-3xl">
          {[
            "Liquidity should earn without begging for attention.",
            "Systems should be predictable without being rigid.",
            "Participation shouldn't punish longevity.",
            "Research matters as much as execution.",
          ].map((item, index) => (
            <div
              key={index}
              className="philosophy-item animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="philosophy-dot" />
              <p className="text-foreground/90">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-gradient border-t border-border py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="logo-icon">
              <span className="text-lg">B</span>
            </div>
            <span className="text-2xl font-semibold tracking-wide">
              Balcore
            </span>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Balcore remains in research and development with a long-term horizon
            toward meaningful impact in DeFi.
          </p>
          <a
            href="https://x.com/Balcore"
            target="_blank"
            rel="noreferrer"
            className="btn-primary inline-flex mt-8"
          >
            Follow on X → @Balcore
            <ExternalLink className="w-4 h-4" />
          </a>

          <div className="mt-16 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              © 2024 Balcore. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
