import { motion } from "framer-motion";
import {
  Flame,
  TrendingUp,
  Film,
  Tv,
  User,
  ArrowUpRight,
} from "lucide-react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w185";

export default function TrendingSearches({
  trending = [],
  onSelect,
}) {
  if (!trending.length) return null;

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        rounded-[34px]
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-3xl
      "
    >
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
              rounded-2xl
              bg-orange-500/20
              p-3
            "
          >
            <Flame
              size={24}
              className="text-orange-400"
            />
          </div>

          <div>

            <h2 className="text-2xl font-black">
              Trending Today
            </h2>

            <p className="text-zinc-400">
              Most searched on TMDB
            </p>

          </div>

        </div>

        <TrendingUp
          className="text-[#FFD464]"
          size={24}
        />

      </div>

      {/* Grid */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {trending.map((item, index) => {

          const title =
            item.title ||
            item.name;

          const poster =
            item.poster_path
              ? `${IMAGE_URL}${item.poster_path}`
              : null;

          return (

            <motion.button
              key={item.id}
              whileHover={{
                y: -8,
              }}
              whileTap={{
                scale: .98,
              }}
              onClick={() =>
                onSelect?.(item)
              }
              className="
                group
                flex
                items-center
                gap-4
                rounded-[24px]
                border
                border-white/10
                bg-black/20
                p-4
                text-left
                transition
                hover:border-[#FFD464]/30
              "
            >

              {/* Rank */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-[#FFD464]
                  font-black
                  text-black
                "
              >
                {index + 1}
              </div>

              {/* Poster */}

              <div
                className="
                  h-24
                  w-16
                  overflow-hidden
                  rounded-xl
                  bg-zinc-800
                "
              >
                {poster ? (

                  <img
                    src={poster}
                    alt={title}
                    loading="lazy"
                    className="
                      h-full
                      w-full
                      object-cover
                      transition
                      duration-500
                      group-hover:scale-110
                    "
                  />

                ) : (

                  <div className="flex h-full items-center justify-center">

                    {item.media_type === "tv" ? (
                      <Tv />
                    ) : item.media_type === "person" ? (
                      <User />
                    ) : (
                      <Film />
                    )}

                  </div>

                )}
              </div>

              {/* Info */}

              <div className="flex-1">

                <h3 className="line-clamp-1 font-bold">
                  {title}
                </h3>

                <p className="mt-2 text-sm text-zinc-400">
                  {(item.media_type || "movie").toUpperCase()}
                </p>

                <div className="mt-3 flex items-center gap-2">

                  <span
                    className="
                      rounded-full
                      bg-orange-500/15
                      px-3
                      py-1
                      text-xs
                      text-orange-400
                    "
                  >
                    Trending
                  </span>

                </div>

              </div>

              <ArrowUpRight
                className="
                  text-zinc-500
                  transition
                  group-hover:text-[#FFD464]
                "
              />

            </motion.button>

          );

        })}

      </div>

    </motion.section>
  );
}