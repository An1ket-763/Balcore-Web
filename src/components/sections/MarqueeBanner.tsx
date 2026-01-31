import { motion } from "framer-motion";

const MarqueeBanner = () => {
  const items = Array(8).fill("NEW: BALCORE PROTOCOL UPDATE");

  return (
    <div className="bg-primary/10 border-b border-primary/20 overflow-hidden py-2.5">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -1920] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 25,
            ease: "linear",
          },
        }}
      >
        {items.map((text, i) => (
          <div key={i} className="flex items-center gap-4 px-8">
            <span className="text-xs font-semibold tracking-widest text-primary">
              {text}
            </span>
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          </div>
        ))}
        {items.map((text, i) => (
          <div key={`dup-${i}`} className="flex items-center gap-4 px-8">
            <span className="text-xs font-semibold tracking-widest text-primary">
              {text}
            </span>
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeBanner;
