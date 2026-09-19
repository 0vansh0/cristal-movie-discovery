import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Search,
  Heart,
  Trash2,
  ArrowUpRight,
  Film,
  Tv,
  User,
} from "lucide-react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w300";

export default function RecentSearches({
  items = [],
  onSelect,
  onDelete,
  onFavorite,
}) {
  if (!items.length) return null;

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
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
              bg-sky-500/15
              p-3
            "
          >
            <Clock
              size={24}
              className="text-sky-400"
            />
          </div>

          <div>

            <h2 className="text-2xl font-black">
              Continue Searching
            </h2>

            <p className="text-zinc-400">
              Your recently viewed titles
            </p>

          </div>

        </div>

        <span className="rounded-full bg-[#FFD464]/10 px-4 py-2 text-sm text-[#FFD464]">
          {items.length} Items
        </span>

      </div>

      {/* Grid */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        <AnimatePresence>

          {items.map((item) => {

            const title =
              item.title ||
              item.name;

            const poster =
              item.poster_path
                ? `${IMAGE_URL}${item.poster_path}`
                : null;

            return (

              <motion.div
                key={item.id}
                layout
                whileHover={{
                  y: -8,
                }}
                className="
                  overflow-hidden
                  rounded-[26px]
                  border
                  border-white/10
                  bg-black/20
                "
              >

                {/* Poster */}

                <div className="relative aspect-[16/9]">

                  {poster ? (

                    <img
                      src={poster}
                      alt={title}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition
                        duration-500
                        hover:scale-110
                      "
                    />

                  ) : (

                    <div className="flex h-full items-center justify-center bg-zinc-900">

                      {item.media_type === "tv" ? (
                        <Tv size={40}/>
                      ) : item.media_type === "person" ? (
                        <User size={40}/>
                      ) : (
                        <Film size={40}/>
                      )}

                    </div>

                  )}

                  {/* Overlay */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"/>

                  {/* Search Again */}

                  <motion.button
                    whileHover={{
                      scale: 1.08,
                    }}
                    whileTap={{
                      scale: .95,
                    }}
                    onClick={() =>
                      onSelect?.(item)
                    }
                    className="
                      absolute
                      bottom-4
                      left-4
                      flex
                      items-center
                      gap-2
                      rounded-full
                      bg-[#FFD464]
                      px-4
                      py-2
                      text-black
                    "
                  >
                    <Search size={16}/>
                    Search
                  </motion.button>

                </div>

                {/* Content */}

                <div className="space-y-4 p-5">

                  <div>

                    <h3 className="line-clamp-1 text-lg font-bold">
                      {title}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-400">
                      {(item.media_type || "movie").toUpperCase()}
                    </p>

                  </div>

                  {/* Footer */}

                  <div className="flex items-center justify-between">

                    <div className="text-xs text-zinc-500">
                      {item.lastViewed || "Recently"}
                    </div>

                    <div className="flex gap-2">

                      <IconButton
                        onClick={() =>
                          onFavorite?.(item)
                        }
                      >
                        <Heart size={16}/>
                      </IconButton>

                      <IconButton
                        onClick={() =>
                          onDelete?.(item)
                        }
                      >
                        <Trash2 size={16}/>
                      </IconButton>

                      <IconButton
                        onClick={() =>
                          onSelect?.(item)
                        }
                      >
                        <ArrowUpRight size={16}/>
                      </IconButton>

                    </div>

                  </div>

                </div>

              </motion.div>

            );

          })}

        </AnimatePresence>

      </div>

    </motion.section>
  );
}

/* ---------------------- */

function IconButton({
  children,
  onClick,
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: .95,
      }}
      onClick={onClick}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        bg-white/5
        transition
        hover:bg-[#FFD464]
        hover:text-black
      "
    >
      {children}
    </motion.button>
  );
}