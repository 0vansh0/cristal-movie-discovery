import { motion } from "framer-motion";

import MovieBackdrop from "./MovieBackdrop";
import MoviePoster from "./MoviePoster";
import MovieInfo from "./MovieInfo";
import MovieActions from "./MovieActions";
import MovieGenres from "./MovieGenres";
import MovieRating from "./MovieRating";

export default function MovieHero({
  movie,
  trailer,
  onAction,
}) {
  if (!movie) return null;

  return (
    <section className="relative overflow-hidden">

      {/* Background */}

      <MovieBackdrop
        backdropPath={movie.backdrop_path}
        title={movie.title}
      />

      {/* Content */}

      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          px-6
          pt-28
          pb-20
        "
      >

        <div
          className="
            grid
            gap-14
            lg:grid-cols-[380px_1fr]
            items-start
          "
        >

          {/* LEFT */}

          <motion.div
            initial={{
              opacity:0,
              x:-60,
            }}
            animate={{
              opacity:1,
              x:0,
            }}
            transition={{
              duration:.8,
            }}
          >

            <MoviePoster movie={movie} />

          </motion.div>

          {/* RIGHT */}

          <motion.div
            initial={{
              opacity:0,
              x:60,
            }}
            animate={{
              opacity:1,
              x:0,
            }}
            transition={{
              delay:.2,
              duration:.8,
            }}
          >

            {/* Movie Title */}

            <motion.h1
              initial={{
                opacity:0,
                y:20,
              }}
              animate={{
                opacity:1,
                y:0,
              }}
              transition={{
                delay:.3,
              }}
              className="
                text-5xl
                font-black
                leading-tight
                lg:text-7xl
              "
            >
              {movie.title}
            </motion.h1>

            {/* Tagline */}

            {movie.tagline && (

              <motion.p
                initial={{
                  opacity:0,
                  y:15,
                }}
                animate={{
                  opacity:1,
                  y:0,
                }}
                transition={{
                  delay:.45,
                }}
                className="
                  mt-5
                  text-xl
                  italic
                  text-[#FFD464]
                "
              >
                {movie.tagline}
              </motion.p>

            )}

            {/* Overview */}

            <motion.p
              initial={{
                opacity:0,
              }}
              animate={{
                opacity:1,
              }}
              transition={{
                delay:.6,
              }}
              className="
                mt-8
                max-w-3xl
                text-lg
                leading-8
                text-zinc-300
              "
            >
              {movie.overview}
            </motion.p>

            {/* Genres */}

            <div className="mt-10">

              <MovieGenres
                genres={movie.genres}
              />

            </div>

            {/* Actions */}

            <div className="mt-10">

              <MovieActions
                trailer={trailer}
                onAction={onAction}
              />

            </div>
                        {/* Rating */}

            <div className="mt-10">

              <MovieRating
                movie={movie}
              />

            </div>

            {/* Movie Information */}

            <div className="mt-10">

              <MovieInfo
                movie={movie}
              />

            </div>

            {/* Quick Stats */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.8,
              }}
              className="
                mt-10
                grid
                gap-6
                sm:grid-cols-2
                xl:grid-cols-4
              "
            >

              <HeroStat
                label="Runtime"
                value={
                  movie.runtime
                    ? `${movie.runtime} min`
                    : "--"
                }
              />

              <HeroStat
                label="Release"
                value={
                  movie.release_date?.slice(0, 4) || "--"
                }
              />

              <HeroStat
                label="Language"
                value={
                  movie.original_language?.toUpperCase() || "--"
                }
              />

              <HeroStat
                label="Votes"
                value={
                  movie.vote_count?.toLocaleString() || "0"
                }
              />

            </motion.div>

          </motion.div>

        </div>

      </div>

      {/* Bottom Fade */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-40
          bg-gradient-to-t
          from-[#070B11]
          to-transparent
        "
      />

    </section>
  );
}

function HeroStat({
  label,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.03,
      }}
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-3xl
      "
    >
      <p className="text-sm text-zinc-400">
        {label}
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        {value}
      </h3>
    </motion.div>
  );
}