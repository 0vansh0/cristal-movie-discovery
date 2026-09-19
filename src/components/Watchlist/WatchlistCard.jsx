import { motion } from "framer-motion";
import {
  Play,
  Heart,
  Info,
  BookmarkCheck,
  Star,
  Clock3,
  Download,
  Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const IMAGE = "https://image.tmdb.org/t/p/w500";

export default function WatchlistCard({ movie }) {
  const navigate = useNavigate();

  const poster = movie.poster_path
    ? `${IMAGE}${movie.poster_path}`
    : "/fallback.jpg";

  return (
    <motion.div
      layout
      whileHover={{
        y: -15,
        rotateX: -4,
        rotateY: 6,
        scale: 1.04,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 20,
      }}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="group relative"
    >
      {/* Glow */}

      <div
        className="
          absolute
          inset-0
          rounded-[30px]
          bg-gradient-to-br
          from-[#FF5E5E]/20
          via-[#FFD464]/10
          to-transparent
          opacity-0
          blur-3xl
          transition
          duration-500
          group-hover:opacity-100
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
        "
      >
        {/* Poster */}

        <motion.img
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: 0.6,
          }}
          src={poster}
          alt={movie.title}
          className="h-[430px] w-full object-cover"
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

        {/* Rating */}

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 backdrop-blur-xl">
          <Star
            size={15}
            fill="#FFD464"
            color="#FFD464"
          />
          <span className="text-sm font-semibold">
            {movie.vote_average?.toFixed(1)}
          </span>
        </div>

        {/* Watchlist Badge */}

        <div className="absolute right-4 top-4 rounded-full bg-emerald-500 px-3 py-2 text-xs font-bold text-black">
          Saved
        </div>

        {/* Hover Content */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileHover={{
            opacity: 1,
          }}
          className="
            absolute
            inset-0
            flex
            flex-col
            justify-end
            p-6
          "
        >
          <h2 className="text-2xl font-black">
            {movie.title}
          </h2>

          <div className="mt-3 flex items-center gap-4 text-sm text-zinc-300">
            <span className="flex items-center gap-1">
              <Clock3 size={15} />
              2h 24m
            </span>

            <span>98% Match</span>

            <span>4K</span>
          </div>

          <p className="mt-4 line-clamp-3 text-sm text-zinc-300">
            {movie.overview}
          </p>

          {/* Progress */}

          <div className="mt-5">
            <div className="mb-2 flex justify-between text-xs">
              <span>Progress</span>
              <span>72%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "72%" }}
                transition={{ duration: 1.2 }}
                className="h-full rounded-full bg-gradient-to-r from-[#FF5E5E] via-[#FFB84D] to-[#FFD464]"
              />
            </div>
          </div>

          {/* Buttons */}

          <div className="mt-6 flex flex-wrap gap-3">

            <ActionButton
              primary
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <Play fill="currentColor" size={18} />
            </ActionButton>

            <ActionButton>
              <Heart size={18} />
            </ActionButton>

            <ActionButton>
              <BookmarkCheck size={18} />
            </ActionButton>

            <ActionButton>
              <Download size={18} />
            </ActionButton>

            <ActionButton>
              <Share2 size={18} />
            </ActionButton>

            <ActionButton
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <Info size={18} />
            </ActionButton>

          </div>

        </motion.div>

        {/* Reflection */}

        <motion.div
          animate={{
            x: [-350, 350],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 4,
          }}
          className="
            absolute
            top-0
            left-0
            h-full
            w-20
            rotate-12
            bg-white/20
            blur-xl
          "
        />

      </div>
    </motion.div>
  );
}

function ActionButton({
  children,
  primary = false,
  onClick,
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={onClick}
      className={`flex h-12 w-12 items-center justify-center rounded-full transition ${
        primary
          ? "bg-white text-black"
          : "bg-white/10 backdrop-blur-xl hover:bg-white/20"
      }`}
    >
      {children}
    </motion.button>
  );
}