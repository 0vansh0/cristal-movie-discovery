import { motion } from "framer-motion";
import {
  Play,
  Clock3,
  Tv,
  Film,
} from "lucide-react";

const BACKDROP =
  "https://image.tmdb.org/t/p/w780";

export default function ContinueWatching({
  items = [],
  onResume,
}) {
  if (!items.length) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div>

        <h2 className="text-4xl font-black">
          Continue Watching
        </h2>

        <p className="mt-2 text-zinc-400">
          Pick up where you left off.
        </p>

      </div>

      {/* Carousel */}

      <div
        className="
          flex
          gap-8
          overflow-x-auto
          pb-4
          scrollbar-hide
          snap-x
        "
      >

        {items.map((item, index) => (

          <motion.div
            key={item.id}
            initial={{
              opacity: 0,
              x: 50,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.05,
            }}
            viewport={{
              once: true,
            }}
            whileHover={{
              y: -8,
            }}
            className="
              group
              relative
              min-w-[420px]
              overflow-hidden
              rounded-[34px]
              border
              border-white/10
            "
          >

            {/* Background */}

            <img
              src={
                item.backdrop_path
                  ? BACKDROP +
                    item.backdrop_path
                  : "/backdrop.jpg"
              }
              alt={item.title}
              className="
                h-72
                w-full
                object-cover
                duration-500
                group-hover:scale-110
              "
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Content */}

            <div
              className="
                absolute
                inset-0
                flex
                flex-col
                justify-end
                p-8
              "
            >

              <span
                className="
                  mb-3
                  inline-flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  bg-white/10
                  px-4
                  py-2
                  text-sm
                  backdrop-blur-xl
                "
              >

                {item.media_type === "tv" ? (
                  <>
                    <Tv size={16} />
                    TV Show
                  </>
                ) : (
                  <>
                    <Film size={16} />
                    Movie
                  </>
                )}

              </span>

              <h3 className="text-3xl font-black">

                {item.title || item.name}

              </h3>

              {item.episode && (

                <p className="mt-2 text-zinc-300">

                  {item.episode}

                </p>

              )}

              {/* Progress */}

              <div className="mt-6">

                <div className="mb-2 flex justify-between text-sm">

                  <span>
                    {item.progress}% Watched
                  </span>

                  <span>

                    {item.remaining}

                  </span>

                </div>

                <div
                  className="
                    h-3
                    overflow-hidden
                    rounded-full
                    bg-white/10
                  "
                >

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: `${item.progress}%`,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-red-500
                      via-orange-400
                      to-yellow-400
                    "
                  />

                </div>

              </div>

              {/* Footer */}

              <div
                className="
                  mt-8
                  flex
                  items-center
                  justify-between
                "
              >

                <div className="flex items-center gap-2 text-zinc-300">

                  <Clock3 size={16} />

                  {item.lastWatched}

                </div>

                <button
                  onClick={() =>
                    onResume?.(item)
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-full
                    bg-[#FFD464]
                    px-6
                    py-3
                    font-bold
                    text-black
                  "
                >

                  <Play
                    fill="currentColor"
                    size={18}
                  />

                  Resume

                </button>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}