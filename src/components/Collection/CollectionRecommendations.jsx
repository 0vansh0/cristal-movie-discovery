import { motion } from "framer-motion";
import {
  Star,
  ChevronRight,
} from "lucide-react";

const POSTER =
  "https://image.tmdb.org/t/p/w500";

export default function CollectionRecommendations({
  collections = [],
  onCollectionClick,
}) {
  if (!collections.length) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-black">
            You May Also Like
          </h2>

          <p className="mt-2 text-zinc-400">
            Similar movie collections
          </p>

        </div>

      </div>

      {/* Carousel */}

      <div
        className="
          flex
          gap-6
          overflow-x-auto
          pb-4
          scrollbar-hide
          snap-x
        "
      >

        {collections.map((collection, index) => (

          <motion.div
            key={collection.id}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.05,
            }}
            viewport={{
              once: true,
            }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            onClick={() =>
              onCollectionClick?.(
                collection.id
              )
            }
            className="
              group
              min-w-[280px]
              cursor-pointer
              overflow-hidden
              rounded-[32px]
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
                  collection.poster_path
                    ? POSTER +
                      collection.poster_path
                    : "/poster.png"
                }
                alt={collection.name}
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
                  via-black/30
                  to-transparent
                "
              />

              {/* Rating */}

              {collection.vote_average && (
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

                  {collection.vote_average.toFixed(1)}

                </div>
              )}

            </div>

            {/* Info */}

            <div className="space-y-3 p-6">

              <h3 className="line-clamp-2 text-2xl font-black">

                {collection.name}

              </h3>

              <p className="line-clamp-3 text-zinc-400">

                {collection.overview ||
                  "No description available."}

              </p>

              <div
                className="
                  mt-4
                  flex
                  items-center
                  justify-between
                  font-semibold
                  text-[#FFD464]
                "
              >

                View Collection

                <ChevronRight
                  className="
                    duration-300
                    group-hover:translate-x-2
                  "
                />

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}