import { motion } from "framer-motion";
import HeroButtons from "./HeroButtons";

export default function HeroContent({ movie }) {
  if (!movie) return null;

  const title = movie.title || movie.name;
  const year =
    movie.release_date?.slice(0, 4) ||
    movie.first_air_date?.slice(0, 4);

  const rating = Number(movie.vote_average || 0).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative z-30 flex h-full items-end"
    >
      <div className="max-w-3xl px-8 pb-24 md:px-16">

        {/* Badge */}

        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-5 inline-flex items-center rounded-full border border-[#FF5E5E]/40 bg-[#FF5E5E]/10 px-4 py-2 backdrop-blur-xl"
        >
          <span className="mr-2 h-2 w-2 rounded-full bg-[#FF5E5E]" />
          <span className="text-xs uppercase tracking-[0.25em] text-white">
            Trending Now
          </span>
        </motion.div>

        {/* Title */}

        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-black leading-none text-white md:text-7xl"
        >
          {title}
        </motion.h1>

        {/* Meta */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mt-6 flex flex-wrap items-center gap-4 text-sm text-zinc-300"
        >
          <span className="rounded-full bg-yellow-500/20 px-3 py-1 font-semibold text-yellow-300">
            ⭐ {rating}
          </span>

          <span>{year}</span>

          <span>•</span>

          <span>Movie</span>

          <span>•</span>

          <span>4K Ultra HD</span>

          <span>•</span>

          <span>Dolby Atmos</span>
        </motion.div>

        {/* Description */}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300 line-clamp-4"
        >
          {movie.overview}
        </motion.p>

        {/* Stats */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-8 flex gap-8"
        >
          <div>
            <p className="text-2xl font-bold text-white">
              {rating}
            </p>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              TMDB
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold text-white">
              {movie.popularity?.toFixed(0) || "100"}
            </p>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Popularity
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold text-white">
              HD
            </p>
            <p className="text-xs uppercase tracking-widest text-zinc-500">
              Quality
            </p>
          </div>
        </motion.div>

        {/* Buttons */}

        <HeroButtons movie={movie} />

      </div>
    </motion.div>
  );
}