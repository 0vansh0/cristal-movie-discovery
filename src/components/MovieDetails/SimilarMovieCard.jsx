import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  Play,
  Calendar,
  ImageOff,
} from "lucide-react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function SimilarMovieCard({
  movie,
  onClick,
  onFavorite,
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!movie) return null;

  const poster = movie.poster_path
    ? `${IMAGE_URL}${movie.poster_path}`
    : null;

  return (
    <motion.article
      whileHover={{
        y: -12,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
      }}
      onClick={() => onClick?.(movie)}
      className="
        group
        cursor-pointer
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-3xl
      "
    >
      {/* Poster */}

      <div className="relative aspect-[2/3] overflow-hidden">

        {!loaded && poster && !error && (

          <div
            className="
              absolute
              inset-0
              animate-pulse
              bg-gradient-to-br
              from-zinc-800
              via-zinc-700
              to-zinc-800
            "
          />

        )}

        {poster && !error ? (

          <motion.img
            src={poster}
            alt={movie.title}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            whileHover={{
              scale: 1.08,
            }}
            className={`
              h-full
              w-full
              object-cover
              transition
              duration-500
              ${loaded ? "opacity-100" : "opacity-0"}
            `}
          />

        ) : (

          <div
            className="
              flex
              h-full
              items-center
              justify-center
              bg-zinc-900
            "
          >
            <ImageOff
              size={56}
              className="text-zinc-500"
            />
          </div>

        )}

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Rating */}

        <div
          className="
            absolute
            left-4
            top-4
            flex
            items-center
            gap-2
            rounded-full
            bg-black/70
            px-3
            py-1.5
            backdrop-blur-xl
          "
        >
          <Star
            size={14}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-xs font-semibold">
            {movie.vote_average?.toFixed(1)}
          </span>

        </div>

        {/* Favorite */}

        <motion.button
          whileTap={{
            scale: 0.9,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onFavorite?.(movie);
          }}
          className="
            absolute
            right-4
            top-4
            rounded-full
            bg-black/60
            p-2
            backdrop-blur-xl
          "
        >
          <Heart size={18} />
        </motion.button>

        {/* Play Overlay */}

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/40
            opacity-0
            transition
            group-hover:opacity-100
          "
        >
          <motion.div
            whileHover={{
              scale: 1.15,
            }}
            className="
              rounded-full
              bg-white/20
              p-5
              backdrop-blur-xl
            "
          >
            <Play
              className="fill-white"
              size={30}
            />
          </motion.div>
        </div>

      </div>

      {/* Content */}

      <div className="p-5">

        <h3 className="line-clamp-1 text-lg font-bold">
          {movie.title}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-sm text-zinc-400">

          <Calendar size={15} />

          {movie.release_date?.slice(0, 4) || "Unknown"}

        </div>

        <p className="mt-4 line-clamp-2 text-sm text-zinc-400">
          {movie.overview}
        </p>

      </div>

    </motion.article>
  );
}