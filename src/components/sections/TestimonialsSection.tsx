import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Balcore transformed how we approach liquidity provision. IL reduction is finally a reality.",
    author: "Alex Chen",
    role: "DeFi Researcher",
    rating: 5,
  },
  {
    quote:
      "The yield consistency we've achieved with Balcore is unlike anything else in the market.",
    author: "Sarah Martinez",
    role: "Fund Manager",
    rating: 5,
  },
  {
    quote:
      "Finally, a protocol that understands long-term LP needs. Game changer for our DAO.",
    author: "James Wilson",
    role: "DAO Contributor",
    rating: 5,
  },
  {
    quote:
      "Reduced our IL exposure by 40% while maintaining competitive yields. Impressive tech.",
    author: "Maya Thompson",
    role: "Quant Trader",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="section-subtitle">Testimonials</p>
          <h2 className="section-title text-3xl md:text-4xl mt-4">
            Trusted by DeFi Leaders
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="p-8 rounded-2xl bg-gradient-to-br from-card to-secondary/30 border border-border hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
                {/* Hover gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Quote mark */}
                <div className="absolute top-4 right-6 text-6xl font-serif text-primary/10 select-none">
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(item.rating)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                    >
                      <Star className="w-4 h-4 fill-primary text-primary" />
                    </motion.div>
                  ))}
                </div>

                <p className="text-foreground/90 text-lg leading-relaxed mb-6 relative z-10">
                  "{item.quote}"
                </p>

                <div className="flex items-center gap-4 relative z-10">
                  <motion.div
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-dark flex items-center justify-center text-primary-foreground font-bold"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    {item.author.charAt(0)}
                  </motion.div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {item.author}
                    </p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
