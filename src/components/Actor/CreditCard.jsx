import { motion } from "framer-motion";
import {
  Star,
  Calendar,
  Clock3,
  Play,
} from "lucide-react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function CreditCard({
  item,
  onClick,
}) {
  if (!item) return null;

  const poster = item.poster_path
    ? `${IMAGE_URL}${item.poster_path}`
    : "https://placehold.co/500x750/111827/ffffff?text=No+Poster";

  const title = item.title || item.name;

  const year = (
    item.release_date ||
    item.first_air_date ||
    ""
  ).slice(0, 4);

  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
      }}
      onClick={() => onClick?.(item)}
      className="
        group
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-3xl
        cursor-pointer
      "
    >

      {/* Poster */}

      <div className="relative aspect-[2/3] overflow-hidden">

        <motion.img
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: .5,
          }}
          src={poster}
          alt={title}
          loading="lazy"
          className="
            h-full
            w-full
            object-cover
          "
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"/>

        {/* Hover Overlay */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileHover={{
            opacity: 1,
          }}
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/35
            backdrop-blur-[2px]
          "
        >

          <motion.div
            whileHover={{
              scale:1.08,
            }}
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-white/20
              backdrop-blur-xl
            "
          >
            <Play
              size={30}
              fill="white"
            />
          </motion.div>

        </motion.div>

        {/* Rating */}

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
            className="
              fill-yellow-400
              text-yellow-400
            "
          />

          <span>
            {item.vote_average
              ? item.vote_average.toFixed(1)
              : "--"}
          </span>

        </div>

      </div>

      {/* Info */}

      <div className="p-5">

        <h3
          className="
            line-clamp-2
            text-xl
            font-black
          "
        >
          {title}
        </h3>

        <div
          className="
            mt-4
            flex
            items-center
            gap-4
            text-sm
            text-zinc-400
          "
        >

          <div className="flex items-center gap-1">

            <Calendar size={15} />

            {year || "----"}

          </div>

          <div className="flex items-center gap-1">

            <Clock3 size={15} />

            {item.media_type === "tv"
              ? "TV Show"
              : "Movie"}

          </div>

        </div>

        {item.character && (

          <div className="mt-5">

            <p className="text-xs text-zinc-500">
              Character
            </p>

            <h4 className="mt-1 font-semibold">
              {item.character}
            </h4>

          </div>

        )}

        {item.job && (

          <div className="mt-5">

            <p className="text-xs text-zinc-500">
              Job
            </p>

            <h4 className="mt-1 font-semibold">
              {item.job}
            </h4>

          </div>

        )}

      </div>

      {/* Shine */}

      <motion.div
        initial={{
          x: "-120%",
        }}
        whileHover={{
          x: "180%",
        }}
        transition={{
          duration: .8,
        }}
        className="
          absolute
          inset-y-0
          left-0
          w-24
          -skew-x-12
          bg-gradient-to-r
          from-transparent
          via-white/20
          to-transparent
        "
      />

    </motion.div>
  );
}