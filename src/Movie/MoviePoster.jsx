import { motion } from "framer-motion";
import {
  Play,
  Heart,
  Star,
  Bookmark,
  Download,
} from "lucide-react";

const IMAGE = "https://image.tmdb.org/t/p/w780";

export default function MoviePoster({ movie }) {
  const poster = movie?.poster_path
    ? `${IMAGE}${movie.poster_path}`
    : "https://placehold.co/600x900/09090B/ffffff?text=CRISTAL";

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 80,
        rotateY: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotateY: 0,
      }}
      transition={{
        duration: 0.9,
      }}
      whileHover={{
        y: -12,
        rotateY: 8,
        scale: 1.03,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="relative w-[330px] shrink-0"
    >
      {/* Glow */}

      <div
        className="
        absolute
        inset-0
        rounded-[34px]
        bg-gradient-to-br
        from-[#FF5E5E]/30
        via-[#FFD464]/15
        to-transparent
        blur-3xl
      "
      />

      {/* Card */}

      <div
        className="
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        shadow-[0_30px_70px_rgba(0,0,0,.6)]
      "
      >
        {/* Poster */}

        <img
          src={poster}
          alt={movie?.title}
          className="h-[500px] w-full object-cover"
        />

        {/* Reflection */}

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white/20
          via-transparent
          to-transparent
        "
        />

        {/* Rating */}

        <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 backdrop-blur-xl">

          <Star
            size={16}
            fill="#FFD464"
            color="#FFD464"
          />

          <span className="font-semibold text-white">
            {movie?.vote_average?.toFixed(1) || "8.8"}
          </span>

        </div>

        {/* Top Rated */}

        <div className="absolute right-5 top-5 rounded-full bg-[#FF5E5E] px-4 py-2 text-xs font-bold uppercase tracking-wider">

          TOP RATED

        </div>

        {/* Buttons */}

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: .95 }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-black"
          >
            <Play
              size={22}
              fill="currentColor"
            />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 backdrop-blur-xl"
          >
            <Heart />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 backdrop-blur-xl"
          >
            <Bookmark />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 backdrop-blur-xl"
          >
            <Download />
          </motion.button>

        </div>

        {/* Shine */}

        <motion.div
          animate={{
            x: [-350, 350],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="
          absolute
          top-0
          left-0
          h-full
          w-24
          rotate-12
          bg-white/25
          blur-xl
        "
        />
      </div>
    </motion.div>
  );
}