import { motion } from "framer-motion";

export default function Top10Background() {
  return (
    <>
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[450px]
          w-[450px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#FF5E5E]/20
          blur-[140px]
        "
      />

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="
          absolute
          right-0
          top-0
          h-[350px]
          w-[350px]
          rounded-full
          bg-[#FFD464]/20
          blur-[120px]
        "
      />
    </>
  );
}