import { motion } from "framer-motion";
import {
  Star,
  Calendar,
  Clock3,
  DollarSign,
  Bookmark,
  Heart,
} from "lucide-react";

const POSTER = "https://image.tmdb.org/t/p/w500";

function formatMoney(value) {
  if (!value) return "-";

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function CollectionGrid({
  movies = [],
  onMovieClick,
  onFavorite,
  onWatchlist,
}) {
  if (!movies.length) return null;

  const sorted = [...movies].sort(
    (a, b) =>
      new Date(a.release_date) -
      new Date(b.release_date)
  );

  return (
    <section className="space-y-10">

      <div>

        <h2 className="text-4xl font-black">
          Collection Movies
        </h2>

        <p className="mt-2 text-zinc-400">
          Browse every movie in this franchise.
        </p>

      </div>

      <div
        className="
          grid
          gap-8
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >

        {sorted.map((movie, index) => (

          <motion.div
            key={movie.id}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: index * 0.05,
            }}
            whileHover={{
              y: -10,
            }}
            className="
              group
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-3xl
            "
          >

            {/* Poster */}

            <div className="relative">

              <img
                src={
                  movie.poster_path
                    ? POSTER + movie.poster_path
                    : "/poster.png"
                }
                alt={movie.title}
                className="
                  aspect-[2/3]
                  w-full
                  object-cover
                  duration-500
                  group-hover:scale-110
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black
                  via-black/20
                  to-transparent
                "
              />

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
                  py-2
                  backdrop-blur-xl
                "
              >
                <Star
                  size={15}
                  className="text-yellow-400"
                />

                {movie.vote_average?.toFixed(1)}
              </div>

              {/* Actions */}

              <div
                className="
                  absolute
                  right-4
                  top-4
                  flex
                  flex-col
                  gap-2
                "
              >

                <button
                  onClick={() =>
                    onFavorite?.(movie)
                  }
                  className="
                    rounded-full
                    bg-black/60
                    p-2
                    backdrop-blur-xl
                  "
                >
                  <Heart size={18} />
                </button>

                <button
                  onClick={() =>
                    onWatchlist?.(movie)
                  }
                  className="
                    rounded-full
                    bg-black/60
                    p-2
                    backdrop-blur-xl
                  "
                >
                  <Bookmark size={18} />
                </button>

              </div>

            </div>

            {/* Content */}

            <div className="space-y-4 p-6">

              <h3 className="line-clamp-2 text-2xl font-black">

                {movie.title}

              </h3>

              <div className="flex items-center gap-4 text-sm text-zinc-400">

                <span className="flex items-center gap-2">

                  <Calendar size={15} />

                  {movie.release_date}

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="flex items-center gap-2">

                  <Clock3 size={15} />

                  {movie.runtime || "-"} min

                </span>

                <span className="font-semibold">

                  ⭐ {movie.vote_average?.toFixed(1)}

                </span>

              </div>

              <div className="flex items-center justify-between text-sm">

                <span className="flex items-center gap-2">

                  💰

                  {formatMoney(movie.budget)}

                </span>

                <span className="flex items-center gap-2">

                  <DollarSign size={15} />

                  {formatMoney(movie.revenue)}

                </span>

              </div>

              <button
                onClick={() =>
                  onMovieClick?.(movie.id)
                }
                className="
                  mt-4
                  w-full
                  rounded-xl
                  bg-[#FFD464]
                  py-3
                  font-bold
                  text-black
                  transition
                  hover:scale-[1.02]
                "
              >
                View Movie
              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}