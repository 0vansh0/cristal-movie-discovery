import { motion } from "framer-motion";

const variants = {
  common: {
    gradient: "from-slate-400 to-slate-600",
    glow: "rgba(148,163,184,.45)",
  },
  rare: {
    gradient: "from-sky-400 to-blue-600",
    glow: "rgba(56,189,248,.5)",
  },
  epic: {
    gradient: "from-fuchsia-500 to-violet-600",
    glow: "rgba(168,85,247,.55)",
  },
  legendary: {
    gradient: "from-[#FFD464] via-[#FF9F43] to-[#FF5E5E]",
    glow: "rgba(255,212,100,.65)",
  },
};

export default function AnimatedBadge({
  icon,
  title,
  subtitle,
  rarity = "legendary",
}) {
  const style = variants[rarity] || variants.legendary;

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.04,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
      }}
      className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-3xl"
    >
      {/* Glow */}
      <motion.div
        animate={{
          opacity: [0.25, 0.6, 0.25],
          scale: [1, 1.15, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        className="absolute inset-0 blur-3xl"
        style={{
          background: style.glow,
        }}
      />

      {/* Shine */}
      <motion.div
        animate={{
          x: [-250, 250],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 4,
        }}
        className="absolute top-0 left-0 h-full w-20 rotate-12 bg-white/20 blur-xl"
      />

      <div className="relative z-10 flex items-center gap-5">
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "linear",
          }}
          className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${style.gradient} shadow-2xl`}
        >
          {icon}
        </motion.div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">
            {title}
          </h3>

          <p className="mt-1 text-sm text-zinc-400">
            {subtitle}
          </p>

          <div
            className={`mt-4 inline-flex rounded-full bg-gradient-to-r ${style.gradient} px-4 py-1 text-xs font-bold uppercase tracking-wider text-black`}
          >
            {rarity}
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: 2 + i * 0.4,
            repeat: Infinity,
          }}
          className="absolute h-2 w-2 rounded-full bg-white/70"
          style={{
            left: `${15 + i * 12}%`,
            top: `${20 + (i % 3) * 20}%`,
          }}
        />
      ))}
    </motion.div>
  );
}