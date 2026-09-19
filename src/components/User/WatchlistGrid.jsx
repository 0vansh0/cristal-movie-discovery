import { motion } from "framer-motion";
import {
  Bookmark,
  Star,
  Calendar,
  Clock3,
  Play,
  Trash2,
} from "lucide-react";

const POSTER = "https://image.tmdb.org/t/p/w500";

export default function WatchlistGrid({
  items = [],
  onMovieClick,
  onRemove,
}) {
  if (!items.length) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-black">
            Watchlist
          </h2>

          <p className="mt-2 text-zinc-400">
            Movies and shows you plan to watch.
          </p>

        </div>

        <span
          className="
            rounded-full
            bg-yellow-500/20
            px-5
            py-2
            font-semibold
            text-yellow-400
          "
        >
          {items.length} Saved
        </span>

      </div>

      {/* Grid */}

      <div
        className="
          grid
          gap-8
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >

        {items.map((item, index) => (

          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              y: 30,
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
              y: -8,
              scale: 1.02,
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
                  item.poster_path
                    ? POSTER + item.poster_path
                    : "/poster.png"
                }
                alt={item.title || item.name}
                className="
                  aspect-[2/3]
                  w-full
                  object-cover
                  duration-500
                  group-hover:scale-110
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Bookmark */}

              <div
                className="
                  absolute
                  left-4
                  top-4
                  rounded-full
                  bg-black/60
                  p-3
                  backdrop-blur-xl
                "
              >
                <Bookmark
                  fill="currentColor"
                  className="text-yellow-400"
                  size={18}
                />
              </div>

              {/* Play */}

              <button
                onClick={() =>
                  onMovieClick?.(item.id)
                }
                className="
                  absolute
                  bottom-5
                  right-5
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-[#FFD464]
                  text-black
                  opacity-0
                  transition
                  duration-300
                  group-hover:opacity-100
                "
              >
                <Play
                  fill="currentColor"
                  size={22}
                />
              </button>

            </div>

            {/* Content */}

            <div className="space-y-4 p-6">

              <h3 className="line-clamp-2 text-2xl font-black">
                {item.title || item.name}
              </h3>

              <div className="flex items-center justify-between text-sm text-zinc-400">

                <span className="flex items-center gap-2">
                  <Calendar size={15} />
                  {(item.release_date ||
                    item.first_air_date ||
                    "").slice(0, 4)}
                </span>

                <span className="flex items-center gap-2">
                  <Star
                    size={15}
                    className="text-yellow-400"
                  />
                  {item.vote_average?.toFixed(1)}
                </span>

              </div>

              <div className="flex items-center gap-2 text-zinc-400">

                <Clock3 size={15} />

                {item.runtime
                  ? `${item.runtime} min`
                  : item.number_of_episodes
                  ? `${item.number_of_episodes} Episodes`
                  : "Coming Soon"}

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    onMovieClick?.(item.id)
                  }
                  className="
                    flex-1
                    rounded-xl
                    bg-[#FFD464]
                    py-3
                    font-bold
                    text-black
                    transition
                    hover:scale-[1.02]
                  "
                >
                  Watch Now
                </button>

                <button
                  onClick={() =>
                    onRemove?.(item)
                  }
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-red-500/30
                    bg-red-500/10
                    text-red-400
                    transition
                    hover:bg-red-500/20
                  "
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}