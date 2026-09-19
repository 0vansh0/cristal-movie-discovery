import { motion } from "framer-motion";

export default function SplashLoader() {
  return (
    <div className="mt-12 flex flex-col items-center gap-4">

      {/* Loading Track */}

      <div className="relative h-[6px] w-72 overflow-hidden rounded-full bg-white/10 backdrop-blur-xl">

        {/* Animated Progress */}

        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2.8,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-0
            top-0
            h-full
            rounded-full
            bg-gradient-to-r
            from-[#FFD464]
            via-[#FF5E5E]
            to-[#E23C64]
          "
        />

        {/* Shimmer */}

        <motion.div
          animate={{
            x: ["-120%", "220%"],
          }}
          transition={{
            duration: 1.3,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            top-0
            h-full
            w-16
            -skew-x-12
            bg-white/40
            blur-sm
          "
        />
      </div>

      {/* Loading Text */}

      <motion.p
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
        }}
        className="
          text-xs
          uppercase
          tracking-[0.35em]
          text-zinc-400
        "
      >
        Preparing Your Cinematic Experience...
      </motion.p>

      {/* Animated Dots */}

      <div className="flex gap-2">

        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -8, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="h-2 w-2 rounded-full bg-[#FF5E5E]"
          />
        ))}

      </div>
    </div>
  );
}