import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Play,
  Heart,
  Info,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Top10Number from "./Top10Number";
import Top10Progress from "./Top10Progress";

const IMAGE = "https://image.tmdb.org/t/p/w500";

export default function Top10Card({ movie, index }) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  const poster = movie?.poster_path
    ? `${IMAGE}${movie.poster_path}`
    : "https://placehold.co/500x750/111827/ffffff?text=No+Poster";

  const rating = movie?.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

  const year =
    movie?.release_date?.slice(0, 4) ||
    movie?.first_air_date?.slice(0, 4) ||
    "----";

  return (
    <motion.div
      whileHover={{
        y: -15,
        rotateY: 8,
        rotateX: -2,
        scale: 1.04,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 18,
      }}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative w-[240px] shrink-0"
    >
      {/* Rank Number */}
      <Top10Number number={index + 1} />

      {/* Glow */}
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#FF5E5E]/20 via-[#FFD464]/10 to-transparent blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

      {/* Card */}
      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#141414]/60 backdrop-blur-xl shadow-2xl">

        {/* Poster */}
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
          src={poster}
          alt={movie?.title}
          loading="lazy"
          onError={(e) => {
            e.target.src =
              "https://placehold.co/500x750/111827/ffffff?text=Poster";
          }}
          className="h-[360px] w-full object-cover"
        />

        {/* Reflection */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        {/* Rating */}
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 backdrop-blur-xl">
          <Star
            size={14}
            fill="#FFD464"
            color="#FFD464"
          />
          <span className="text-sm font-semibold">
            {rating}
          </span>
        </div>

        {/* Year */}
        <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 backdrop-blur-xl">
          <Calendar size={14} />
          <span className="text-sm">
            {year}
          </span>
        </div>

        {/* Overlay */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/70 to-transparent p-5"
          >
            <h2 className="text-xl font-bold">
              {movie?.title}
            </h2>

            <p className="mt-2 line-clamp-3 text-sm text-zinc-300">
              {movie?.overview || "No description available."}
            </p>

            <Top10Progress
              popularity={movie?.popularity || 70}
            />

            {/* Buttons */}
            <div className="mt-5 flex items-center gap-3">

              <motion.button
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.08 }}
                onClick={() =>
                  navigate(`/movie/${movie.id}`)
                }
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-lg"
              >
                <Play
                  fill="currentColor"
                  size={20}
                />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.08 }}
                onClick={() => setLiked(!liked)}
                className={`flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-xl transition ${
                  liked
                    ? "bg-red-500"
                    : "bg-white/10"
                }`}
              >
                <Heart
                  size={20}
                  fill={liked ? "white" : "none"}
                />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.92 }}
                whileHover={{ scale: 1.08 }}
                onClick={() =>
                  navigate(`/movie/${movie.id}`)
                }
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-xl"
              >
                <Info size={20} />
              </motion.button>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* Shine */}
        <motion.div
          animate={{
            x: [-250, 320],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "linear",
          }}
          className="absolute top-0 left-0 h-full w-24 rotate-12 bg-white/20 blur-xl"
        />
      </div>
    </motion.div>
  );
}