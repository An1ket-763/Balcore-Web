import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Balcore?",
    answer:
      "Balcore is a next-generation DeFi protocol focused on continuous balance and yield infrastructure for AMM DEXs, with impermanent loss reduction at its core.",
  },
  {
    question: "How does IL protection work?",
    answer:
      "Our algorithms continuously monitor market conditions and dynamically rebalance positions to minimize impermanent loss exposure while maintaining optimal yields.",
  },
  {
    question: "Which chains are supported?",
    answer:
      "Balcore is designed to be multi-chain ready, with initial support for major EVM-compatible networks and expansion plans for additional chains.",
  },
  {
    question: "Is Balcore audited?",
    answer:
      "Yes, our smart contracts undergo rigorous security audits by leading blockchain security firms before deployment.",
  },
  {
    question: "How do I get started?",
    answer:
      "Simply connect your wallet, select a liquidity pool, and deposit your assets. Our protocol handles the optimization automatically.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 border-t border-border">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle">FAQ</p>
          <h2 className="section-title text-3xl md:text-4xl mt-4">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 rounded-xl bg-gradient-to-br from-card to-secondary/30 border border-border hover:border-primary/30 transition-all duration-300 text-left flex items-center justify-between gap-4"
                whileHover={{ scale: 1.01 }}
              >
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-2 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
