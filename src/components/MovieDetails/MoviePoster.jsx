import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  ImageOff,
  Heart,
  Plus,
  Bookmark,
  Share2,
} from "lucide-react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function MoviePoster({
  movie,
  children,
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!movie) return null;

  const poster = movie.poster_path
    ? `${IMAGE_URL}${movie.poster_path}`
    : "https://placehold.co/500x750/111827/ffffff?text=No+Poster";

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "--";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -80,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className="relative w-full max-w-sm"
    >
      {/* Background Glow */}

      <motion.div
        animate={{
          opacity: [0.3, 0.55, 0.3],
          scale: [1, 1.08, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "easeInOut",
        }}
        className="
          absolute
          inset-0
          rounded-[40px]
          bg-gradient-to-r
          from-[#FFD464]/20
          via-orange-400/10
          to-red-500/20
          blur-[90px]
        "
      />

      {/* Poster */}

      <motion.div
        initial={{
          rotateX: 0,
          rotateY: 0,
        }}
        whileHover={{
          rotateX: 8,
          rotateY: -8,
          y: -14,
          scale: 1.04,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
          damping: 18,
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: 2000,
        }}
        className="
          group
          relative
          overflow-hidden
          rounded-[36px]
          border
          border-white/10
          bg-white/5
          shadow-[0_50px_160px_rgba(0,0,0,.65)]
          backdrop-blur-3xl
        "
      >
        {/* Image */}

        <div className="relative aspect-[2/3] w-full overflow-hidden">

          {!loaded && !error && (
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

          {error ? (

            <div
              className="
                flex
                h-full
                items-center
                justify-center
                bg-zinc-900
              "
            >
              <div className="text-center">

                <ImageOff
                  size={56}
                  className="mx-auto text-zinc-500"
                />

                <p className="mt-4 text-zinc-400">
                  Poster unavailable
                </p>

              </div>
            </div>

          ) : (

            <motion.img
              src={poster}
              alt={movie.title || movie.name}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              whileHover={{
                scale: 1.08,
              }}
              transition={{
                duration: 0.5,
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

          )}

        </div>

        {/* Shine */}

        <motion.div
          initial={{
            x: "-120%",
          }}
          whileHover={{
            x: "180%",
          }}
          transition={{
            duration: 0.9,
          }}
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            w-32
            -skew-x-12
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
          "
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Rating */}

        <motion.div
          whileHover={{
            scale: 1.08,
          }}
          className="
            absolute
            left-5
            top-5
            flex
            items-center
            gap-2
            rounded-full
            bg-black/70
            px-4
            py-2
            backdrop-blur-xl
          "
        >
          <Star
            size={16}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-semibold">
            {rating}
          </span>
        </motion.div>
                {/* Play Overlay */}

        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="
            pointer-events-none
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/35
            backdrop-blur-[2px]
          "
        >
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              border
              border-white/20
              bg-white/15
              shadow-xl
              backdrop-blur-2xl
            "
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="white"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Floating Actions */}

        <div className="absolute right-5 top-5 flex flex-col gap-3">

          <PosterAction
            icon={<Heart size={18} />}
            label="Favorite"
          />

          <PosterAction
            icon={<Plus size={18} />}
            label="Watchlist"
          />

          <PosterAction
            icon={<Bookmark size={18} />}
            label="Bookmark"
          />

          <PosterAction
            icon={<Share2 size={18} />}
            label="Share"
          />

        </div>

        {/* Bottom Info */}

        <div className="absolute inset-x-0 bottom-0 p-6">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
            }}
          >

            <h2 className="line-clamp-1 text-3xl font-black">
              {movie.title || movie.name}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-300">

              {movie.release_date && (
                <>
                  <span>{movie.release_date.slice(0, 4)}</span>
                  <span>•</span>
                </>
              )}

              {movie.original_language && (
                <>
                  <span>{movie.original_language.toUpperCase()}</span>
                  <span>•</span>
                </>
              )}

              <span>
                {(movie.vote_count ?? 0).toLocaleString()} Votes
              </span>

            </div>

          </motion.div>

        </div>

        {/* Glass Border */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            rounded-[36px]
            ring-1
            ring-white/10
          "
        />

        {children}

      </motion.div>
    </motion.div>
  );
}

function PosterAction({
  icon,
  label,
  onClick,
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.08,
        x: -4,
      }}
      whileTap={{
        scale: 0.92,
      }}
      onClick={onClick}
      aria-label={label}
      className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        bg-black/60
        text-white
        shadow-lg
        backdrop-blur-xl
        transition-all
        hover:border-[#FFD464]
        hover:bg-[#FFD464]
        hover:text-black
      "
    >
      {icon}
    </motion.button>
  );
}