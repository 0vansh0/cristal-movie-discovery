import { motion } from "framer-motion";

export default function Top10Number({ number }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -60,
        scale: 0.8,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="absolute -left-12 bottom-0 select-none pointer-events-none z-0"
    >
      {/* Glow */}
      <div className="absolute inset-0 blur-3xl opacity-30 text-[#FF5E5E]">
        <span className="text-[170px] md:text-[220px] font-black">
          {number}
        </span>
      </div>

      {/* Outline */}
      <span
        className="
          absolute
          text-[170px]
          md:text-[220px]
          font-black
          leading-none
          text-transparent
          [-webkit-text-stroke:4px_rgba(255,255,255,0.18)]
        "
      >
        {number}
      </span>

      {/* Main Number */}
      <motion.span
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative
          text-[170px]
          md:text-[220px]
          font-black
          leading-none
          bg-gradient-to-b
          from-white
          via-zinc-300
          to-zinc-700
          bg-clip-text
          text-transparent
          drop-shadow-[0_0_30px_rgba(255,94,94,0.35)]
        "
      >
        {number}
      </motion.span>

      {/* Shine Sweep */}
      <motion.div
        animate={{
          x: [-250, 250],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear",
        }}
        className="
          absolute
          top-0
          left-0
          h-full
          w-20
          rotate-12
          bg-gradient-to-r
          from-transparent
          via-white/40
          to-transparent
          blur-md
          mix-blend-screen
        "
      />
    </motion.div>
  );
}