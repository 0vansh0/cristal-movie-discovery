import { motion } from "framer-motion";

const title = "CRISTAL".split("");

export default function SplashText() {
  return (
    <div className="mt-10 flex flex-col items-center">

      {/* Brand Name */}

      <h1 className="flex text-6xl md:text-7xl font-black tracking-[0.45em] text-white">

        {title.map((letter, index) => (
          <motion.span
            key={index}
            initial={{
              opacity: 0,
              y: 40,
              filter: "blur(10px)",
            }}
            animate={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            transition={{
              delay: 0.15 * index,
              duration: 0.6,
              ease: "easeOut",
            }}
            className="relative"
          >
            {letter}

            {/* Glow */}

            <motion.div
              animate={{
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.2,
              }}
              className="
                absolute
                inset-0
                blur-xl
                bg-[#FF5E5E]/20
                -z-10
              "
            />

          </motion.span>
        ))}

      </h1>

      {/* Divider */}

      <motion.div
        initial={{
          width: 0,
          opacity: 0,
        }}
        animate={{
          width: 180,
          opacity: 1,
        }}
        transition={{
          delay: 1.2,
          duration: 0.8,
        }}
        className="
          mt-6
          h-px
          rounded-full
          bg-gradient-to-r
          from-transparent
          via-[#FFD464]
          to-transparent
        "
      />

      {/* Tagline */}

      <motion.p
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.5,
          duration: 0.8,
        }}
        className="
          mt-5
          text-sm
          md:text-base
          uppercase
          tracking-[0.35em]
          text-zinc-400
        "
      >
        Discover Cinema Beautifully
      </motion.p>

      {/* Loading Status */}

      <motion.p
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
        }}
        className="
          mt-2
          text-xs
          tracking-[0.25em]
          uppercase
          text-zinc-600
        "
      >
        Loading Experience
      </motion.p>

    </div>
  );
}