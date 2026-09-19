import { motion } from "framer-motion";
import {
  Clock3,
  Film,
  Tv,
  Star,
  ArrowRight,
} from "lucide-react";

const BACKDROP =
  "https://image.tmdb.org/t/p/w780";

export default function RecentlyViewed({
  items = [],
  onOpen,
}) {
  if (!items.length) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-black">
            Recently Viewed
          </h2>

          <p className="mt-2 text-zinc-400">
            Your latest watched movies and TV shows.
          </p>

        </div>

        <span className="text-zinc-500">

          {items.length} Items

        </span>

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
              x: 40,
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
              scale: 1.02,
            }}
            className="
              group
              relative
              min-w-[360px]
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
            "
          >

            {/* Backdrop */}

            <img
              src={
                item.backdrop_path
                  ? BACKDROP + item.backdrop_path
                  : "/backdrop.jpg"
              }
              alt={item.title || item.name}
              className="
                h-56
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
                p-6
              "
            >

              {/* Media Type */}

              <div
                className="
                  mb-4
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

              </div>

              <h3 className="text-2xl font-black">

                {item.title || item.name}

              </h3>

              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-between
                  text-sm
                "
              >

                <span className="flex items-center gap-2">

                  <Clock3 size={15} />

                  {item.viewedAt}

                </span>

                <span className="flex items-center gap-2">

                  <Star
                    className="text-yellow-400"
                    size={15}
                  />

                  {item.vote_average?.toFixed(1)}

                </span>

              </div>

              {/* Button */}

              <button
                onClick={() => onOpen?.(item.id)}
                className="
                  mt-6
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-[#FFD464]
                  py-3
                  font-bold
                  text-black
                  transition
                  hover:scale-[1.02]
                "
              >

                View Details

                <ArrowRight size={18} />

              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}