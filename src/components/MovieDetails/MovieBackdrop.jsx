import { motion } from "framer-motion";

export default function MovieBackdrop({
  backdropPath,
  title,
}) {
  const image = backdropPath
    ? `https://image.tmdb.org/t/p/original${backdropPath}`
    : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000&auto=format&fit=crop";

  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Background Image */}

      <motion.img
        initial={{
          scale: 1.12,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.6,
        }}
        src={image}
        alt={title}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      {/* Dark Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-black/60
        "
      />

      {/* Bottom Gradient */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-[45%]
          bg-gradient-to-t
          from-[#070B11]
          via-[#070B11]/70
          to-transparent
        "
      />

      {/* Left Gradient */}

      <div
        className="
          absolute
          inset-y-0
          left-0
          w-[45%]
          bg-gradient-to-r
          from-[#070B11]
          via-[#070B11]/60
          to-transparent
        "
      />

      {/* Top Gradient */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-44
          bg-gradient-to-b
          from-black/70
          to-transparent
        "
      />

      {/* Aurora Glow */}

      <motion.div
        animate={{
          opacity: [0.25, 0.5, 0.25],
          scale: [1, 1.08, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-1/2
          top-1/3
          h-[650px]
          w-[650px]
          -translate-x-1/2
          rounded-full
          bg-[#FFD464]/10
          blur-[160px]
        "
      />

      {/* Noise */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          mix-blend-soft-light
          bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]
        "
      />

    </div>
  );
}