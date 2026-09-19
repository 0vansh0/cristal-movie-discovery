import { motion } from "framer-motion";
import {
  Star,
  Calendar,
  Pencil,
  Trash2,
} from "lucide-react";

const POSTER =
  "https://image.tmdb.org/t/p/w500";

export default function RatingsGrid({
  items = [],
  onEdit,
  onDelete,
  onMovieClick,
}) {
  if (!items.length) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-black">
            Your Ratings
          </h2>

          <p className="mt-2 text-zinc-400">
            Every movie and TV show you've rated.
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
          {items.length} Ratings
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
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-3xl
            "
          >

            {/* Poster */}

            <img
              src={
                item.poster_path
                  ? POSTER + item.poster_path
                  : "/poster.png"
              }
              alt={item.title || item.name}
              onClick={() =>
                onMovieClick?.(item.id)
              }
              className="
                aspect-[2/3]
                w-full
                cursor-pointer
                object-cover
              "
            />

            {/* Body */}

            <div className="space-y-5 p-6">

              <h3 className="line-clamp-2 text-2xl font-black">

                {item.title || item.name}

              </h3>

              {/* User Rating */}

              <div>

                <p className="mb-2 text-sm text-zinc-400">
                  Your Rating
                </p>

                <div className="flex gap-1">

                  {[1,2,3,4,5,6,7,8,9,10].map((star)=>(

                    <Star
                      key={star}
                      size={18}
                      fill={
                        star <= item.userRating
                          ? "currentColor"
                          : "none"
                      }
                      className={
                        star <= item.userRating
                          ? "text-yellow-400"
                          : "text-zinc-600"
                      }
                    />

                  ))}

                </div>

              </div>

              {/* TMDB */}

              <div className="flex items-center justify-between">

                <span className="text-zinc-400">
                  TMDB
                </span>

                <span className="font-bold">

                  ⭐ {item.vote_average?.toFixed(1)}

                </span>

              </div>

              {/* Date */}

              <div className="flex items-center gap-2 text-zinc-400">

                <Calendar size={16} />

                {item.ratedAt}

              </div>

              {/* Actions */}

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    onEdit?.(item)
                  }
                  className="
                    flex-1
                    rounded-xl
                    bg-[#FFD464]
                    py-3
                    font-bold
                    text-black
                  "
                >

                  <Pencil
                    className="mr-2 inline"
                    size={16}
                  />

                  Edit

                </button>

                <button
                  onClick={() =>
                    onDelete?.(item)
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