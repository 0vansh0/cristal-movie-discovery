import { motion } from "framer-motion";

const IMAGE = "https://image.tmdb.org/t/p/original";

export default function MovieBackdrop({ movie }) {
  const backdrop = movie?.backdrop_path
    ? `${IMAGE}${movie.backdrop_path}`
    : "https://placehold.co/1920x1080/09090B/ffffff?text=CRISTAL";

  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Background Image */}

      <motion.img
        src={backdrop}
        alt={movie?.title}
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}

      <div className="absolute inset-0 bg-black/50" />

      {/* Left Gradient */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/80 to-transparent" />

      {/* Bottom Gradient */}

      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/40 to-transparent" />

      {/* Glow */}

      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#FF5E5E]/20
          blur-[180px]
        "
      />
    </div>
  );
}