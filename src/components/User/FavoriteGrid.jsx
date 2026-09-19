import { motion } from "framer-motion";
import {
  Star,
  Heart,
  Play,
  Calendar,
} from "lucide-react";

const POSTER =
  "https://image.tmdb.org/t/p/w500";

export default function FavoriteGrid({
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
            Favorites
          </h2>

          <p className="mt-2 text-zinc-400">
            Movies and TV shows you love.
          </p>

        </div>

        <span
          className="
            rounded-full
            bg-red-500/20
            px-5
            py-2
            font-semibold
            text-red-400
          "
        >
          {items.length} Items
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
              delay: index * .05,
            }}
            whileHover={{
              y: -8,
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
                    ? POSTER +
                      item.poster_path
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

              {/* Favorite */}

              <button
                onClick={() =>
                  onRemove?.(item)
                }
                className="
                  absolute
                  right-4
                  top-4
                  rounded-full
                  bg-black/60
                  p-3
                  backdrop-blur-xl
                "
              >

                <Heart
                  fill="currentColor"
                  className="text-red-500"
                  size={18}
                />

              </button>

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

              <div className="flex items-center justify-between">

                <span className="flex items-center gap-2">

                  <Calendar size={15} />

                  {(item.release_date ||
                    item.first_air_date ||
                    "")
                    .slice(0, 4)}

                </span>

                <span className="flex items-center gap-2">

                  <Star
                    size={15}
                    className="text-yellow-400"
                  />

                  {item.vote_average?.toFixed(1)}

                </span>

              </div>

              {/* Genres */}

              <div className="flex flex-wrap gap-2">

                {(item.genre_names || [])
                  .slice(0, 3)
                  .map((genre) => (

                    <span
                      key={genre}
                      className="
                        rounded-full
                        bg-white/10
                        px-3
                        py-1
                        text-xs
                      "
                    >

                      {genre}

                    </span>

                  ))}

              </div>

              <button
                onClick={() =>
                  onMovieClick?.(item.id)
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/10
                  py-3
                  font-semibold
                  transition
                  hover:bg-white/20
                "
              >

                View Details

              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}