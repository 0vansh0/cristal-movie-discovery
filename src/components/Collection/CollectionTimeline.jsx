import { motion } from "framer-motion";
import {
  Calendar,
  Clock3,
  Star,
  DollarSign,
  Wallet,
  ArrowRight,
} from "lucide-react";

const POSTER =
  "https://image.tmdb.org/t/p/w342";

function formatMoney(value) {
  if (!value) return "-";

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function CollectionTimeline({
  movies = [],
  onMovieClick,
}) {
  if (!movies.length) return null;

  const sorted = [...movies].sort(
    (a, b) =>
      new Date(a.release_date) -
      new Date(b.release_date)
  );

  return (
    <section className="space-y-10">

      {/* Header */}

      <div>

        <h2 className="text-4xl font-black">
          Franchise Timeline
        </h2>

        <p className="mt-2 text-zinc-400">
          Explore every movie in chronological release order.
        </p>

      </div>

      {/* Timeline */}

      <div
        className="
          relative
          overflow-x-auto
          pb-6
        "
      >

        {/* Line */}

        <div
          className="
            absolute
            left-0
            right-0
            top-28
            h-[4px]
            bg-white/10
          "
        />

        <div className="flex gap-12 min-w-max">

          {sorted.map((movie, index) => (

            <motion.div
              key={movie.id}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * .08,
              }}
              viewport={{
                once: true,
              }}
              whileHover={{
                y: -10,
              }}
              className="w-72"
            >

              {/* Year */}

              <div className="mb-4 flex items-center gap-4">

                <div
                  className="
                    h-5
                    w-5
                    rounded-full
                    bg-[#FFD464]
                    shadow-lg
                  "
                />

                <span className="text-xl font-black">
                  {movie.release_date?.slice(0, 4)}
                </span>

              </div>

              {/* Card */}

              <div
                onClick={() =>
                  onMovieClick?.(movie.id)
                }
                className="
                  cursor-pointer
                  overflow-hidden
                  rounded-[30px]
                  border
                  border-white/10
                  bg-white/5
                  backdrop-blur-3xl
                "
              >

                <img
                  src={
                    movie.poster_path
                      ? POSTER + movie.poster_path
                      : "/poster.png"
                  }
                  className="
                    aspect-[2/3]
                    w-full
                    object-cover
                    duration-500
                    hover:scale-105
                  "
                />

                <div className="space-y-4 p-6">

                  <h3 className="line-clamp-2 text-xl font-black">
                    {movie.title}
                  </h3>

                  <div className="flex items-center justify-between text-sm text-zinc-400">

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

                    <span className="flex items-center gap-2">

                      <Star
                        size={15}
                        className="text-yellow-400"
                      />

                      {movie.vote_average?.toFixed(1)}

                    </span>

                  </div>

                  <div className="flex items-center justify-between text-sm">

                    <span className="flex items-center gap-2">

                      <Wallet size={15} />

                      {formatMoney(movie.budget)}

                    </span>

                    <span className="flex items-center gap-2">

                      <DollarSign size={15} />

                      {formatMoney(movie.revenue)}

                    </span>

                  </div>

                  <button
                    className="
                      mt-3
                      flex
                      items-center
                      gap-2
                      font-semibold
                      text-[#FFD464]
                    "
                  >

                    View Details

                    <ArrowRight size={16} />

                  </button>

                </div>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}