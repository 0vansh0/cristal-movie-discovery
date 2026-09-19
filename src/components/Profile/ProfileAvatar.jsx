import { motion } from "framer-motion";
import { Camera, Crown } from "lucide-react";

export default function ProfileAvatar() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.8,
        type: "spring",
        stiffness: 120,
      }}
      className="relative w-fit"
    >
      {/* Animated Glow */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.8, 0.35],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF5E5E] via-[#FF9B5E] to-[#FFD464] blur-3xl"
      />

      {/* Outer Ring */}
      <motion.div
        whileHover={{
          rotate: 360,
        }}
        transition={{
          duration: 10,
          ease: "linear",
        }}
        className="relative rounded-full bg-gradient-to-r from-[#FF5E5E] via-[#FF9B5E] to-[#FFD464] p-[5px]"
      >
        {/* Avatar */}
        <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-[#080B12] bg-[#151923]">

          <img
            src="https://i.pravatar.cc/400?img=12"
            alt="Avatar"
            className="h-full w-full object-cover transition duration-500 hover:scale-110"
          />

          {/* Shine */}
          <motion.div
            animate={{
              x: [-220, 220],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              repeatDelay: 4,
            }}
            className="absolute top-0 h-full w-20 rotate-12 bg-white/30 blur-xl"
          />

          {/* Upload */}
          <button
            className="
              absolute
              bottom-3
              right-3
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-[#FF5E5E]
              to-[#FFD464]
              shadow-lg
              transition
              hover:scale-110
            "
          >
            <Camera size={18} className="text-black" />
          </button>

          {/* Online */}
          <div className="absolute left-4 bottom-4 h-5 w-5 rounded-full border-4 border-[#080B12] bg-green-500" />
        </div>
      </motion.div>

      {/* Premium Badge */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="
          absolute
          -right-3
          top-3
          flex
          items-center
          gap-2
          rounded-full
          bg-gradient-to-r
          from-[#FFD464]
          to-[#FF9B5E]
          px-4
          py-2
          shadow-xl
        "
      >
        <Crown size={16} className="text-black" />

        <span className="text-sm font-bold text-black">
          PRO
        </span>
      </motion.div>

      {/* Level */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="
          absolute
          -bottom-3
          left-1/2
          -translate-x-1/2
          rounded-full
          bg-[#0E131D]
          px-6
          py-2
          text-sm
          font-bold
          border
          border-white/10
        "
      >
        Level 27
      </motion.div>
    </motion.div>
  );
}