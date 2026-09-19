import { motion } from "framer-motion";
import {
  Layers3,
  Film,
  ArrowRight,
} from "lucide-react";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

export default function MovieCollections({
  collection,
  onOpenCollection,
}) {
  if (!collection) return null;

  const backdrop = collection.backdrop_path
    ? `${IMAGE_URL}${collection.backdrop_path}`
    : null;

  const poster = collection.poster_path
    ? `${IMAGE_URL}${collection.poster_path}`
    : null;

  return (
    <motion.section
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
        duration: .8,
      }}
      className="
        relative
        overflow-hidden
        rounded-[36px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-3xl
      "
    >
      {/* Background */}

      {backdrop && (

        <>

          <img
            src={backdrop}
            alt={collection.name}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              opacity-20
            "
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#070B11] via-[#070B11]/80 to-black/30"/>

        </>

      )}

      <div
        className="
          relative
          z-10
          grid
          gap-10
          p-8
          lg:grid-cols-[240px_1fr]
        "
      >
        {/* Poster */}

        <motion.div
          whileHover={{
            scale:1.04,
            rotate:-2,
          }}
          className="
            overflow-hidden
            rounded-[30px]
            border
            border-white/10
            bg-black/40
          "
        >

          {poster ? (

            <img
              src={poster}
              alt={collection.name}
              className="
                aspect-[2/3]
                w-full
                object-cover
              "
            />

          ) : (

            <div
              className="
                flex
                aspect-[2/3]
                items-center
                justify-center
              "
            >
              <Layers3
                size={70}
                className="text-zinc-500"
              />
            </div>

          )}

        </motion.div>

        {/* Details */}

        <div className="flex flex-col justify-center">

          <div className="flex items-center gap-3">

            <Layers3
              size={26}
              className="text-[#FFD464]"
            />

            <span className="text-[#FFD464] font-semibold uppercase tracking-wider">
              Movie Collection
            </span>

          </div>

          <h2 className="mt-5 text-5xl font-black">
            {collection.name}
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-300">
            {collection.overview ||
              "This movie belongs to a larger collection or franchise. Explore all connected movies in release order."}
          </p>

          {/* Stats */}

          <div className="mt-8 flex flex-wrap gap-5">

            <div
              className="
                rounded-2xl
                bg-white/5
                px-5
                py-4
              "
            >
              <p className="text-sm text-zinc-400">
                Collection
              </p>

              <p className="mt-2 font-bold">
                Franchise
              </p>
            </div>

            <div
              className="
                rounded-2xl
                bg-white/5
                px-5
                py-4
              "
            >
              <p className="text-sm text-zinc-400">
                Category
              </p>

              <p className="mt-2 font-bold">
                Movie Series
              </p>
            </div>

          </div>

          {/* Button */}

          <motion.button
            whileHover={{
              scale:1.04,
            }}
            whileTap={{
              scale:.96,
            }}
            onClick={() =>
              onOpenCollection?.(collection.id)
            }
            className="
              mt-10
              inline-flex
              w-fit
              items-center
              gap-3
              rounded-full
              bg-[#FFD464]
              px-7
              py-4
              font-bold
              text-black
            "
          >
            <Film size={20} />

            Explore Collection

            <ArrowRight size={18} />

          </motion.button>

        </div>

      </div>
    </motion.section>
  );
}