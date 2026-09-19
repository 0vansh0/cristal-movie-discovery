import { motion } from "framer-motion";
import { Play } from "lucide-react";

const CrystalLogo = () => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      transition={{
        duration: 1.2,
        type: "spring",
        stiffness: 90,
      }}
      className="relative flex items-center justify-center"
    >
      {/* Outer Rotating Ring */}

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-44 w-44 rounded-full border border-[#FF5E5E]/20"
      />

      {/* Second Ring */}

      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute h-36 w-36 rounded-full border border-[#FFD464]/20"
      />

      {/* Glow */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute h-44 w-44 rounded-full bg-[#FF5E5E]/20 blur-[70px]"
      />

      {/* Glass Crystal */}

      <motion.div
        animate={{
          rotate: [0, 6, -6, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="
          relative
          flex
          h-28
          w-28
          items-center
          justify-center
          rounded-[32px]
          border
          border-white/20
          bg-white/10
          backdrop-blur-3xl
          shadow-[0_0_60px_rgba(255,94,94,.45)]
          overflow-hidden
        "
      >
        {/* Glass Reflection */}

        <motion.div
          animate={{
            x: [-180, 180],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.8,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-0
            top-0
            h-full
            w-12
            -skew-x-12
            bg-white/20
            blur-md
          "
        />

        {/* Crystal Border Glow */}

        <div className="absolute inset-0 rounded-[32px] border border-white/10" />

        {/* Play Icon */}

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
        >
          <Play
            size={42}
            fill="white"
            color="white"
            strokeWidth={1.5}
          />
        </motion.div>
      </motion.div>

      {/* Floating Sparkles */}

      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-10, 10, -10],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2 + i * 0.4,
            repeat: Infinity,
          }}
          className="absolute h-1.5 w-1.5 rounded-full bg-[#FFD464]"
          style={{
            top: `${20 + Math.random() * 120}px`,
            left: `${20 + Math.random() * 120}px`,
          }}
        />
      ))}
    </motion.div>
  );
};

export default CrystalLogo;