import { motion } from "framer-motion";

export default function HeroGradient() {
  return (
    <>
      {/* Left Cinematic Gradient */}
      <div className="absolute inset-y-0 left-0 w-[65%] bg-gradient-to-r from-[#09090B] via-[#09090bee] to-transparent z-10" />

      {/* Bottom Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#09090B] via-[#09090bcc] to-transparent z-10" />

      {/* Top Gradient */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 to-transparent z-10" />

      {/* Right Soft Shadow */}
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/30 to-transparent z-10" />

      {/* Aurora Light */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#FF5E5E]/20
          blur-[150px]
          z-0
        "
      />

      {/* Golden Accent */}
      <motion.div
        animate={{
          x: [-60, 60, -60],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-[20%]
          right-[15%]
          h-[250px]
          w-[250px]
          rounded-full
          bg-[#FFD464]/20
          blur-[120px]
          z-0
        "
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,.55)_100%)] z-20" />
    </>
  );
}