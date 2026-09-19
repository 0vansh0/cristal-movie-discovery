import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Star,
  Clapperboard,
} from "lucide-react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function CastCard({
  actor,
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!actor) return null;

  const image = actor.profile_path
    ? `${IMAGE_URL}${actor.profile_path}`
    : null;

  return (
    <motion.article
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-3xl
      "
    >
      {/* Glow */}

      <motion.div
        animate={{
          opacity: [.2, .45, .2],
          scale: [1, 1.05, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-[#FFD464]/10
          to-orange-500/10
          blur-3xl
        "
      />

      {/* Image */}

      <div className="relative aspect-[3/4] overflow-hidden">

        {!loaded && image && !error && (
          <div
            className="
              absolute
              inset-0
              animate-pulse
              bg-gradient-to-br
              from-zinc-800
              via-zinc-700
              to-zinc-800
            "
          />
        )}

        {image && !error ? (

          <motion.img
            src={image}
            alt={actor.name}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
            whileHover={{
              scale: 1.08,
            }}
            transition={{
              duration: .5,
            }}
            className={`
              h-full
              w-full
              object-cover
              transition
              duration-500
              ${loaded ? "opacity-100" : "opacity-0"}
            `}
          />

        ) : (

          <div
            className="
              flex
              h-full
              items-center
              justify-center
              bg-zinc-900
            "
          >
            <User
              size={70}
              className="text-zinc-500"
            />
          </div>

        )}

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"/>

        {/* Popularity */}

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
            py-1.5
            backdrop-blur-xl
          "
        >
          <Star
            size={14}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-xs font-semibold">
            {Math.round(actor.popularity || 0)}
          </span>

        </div>

      </div>

      {/* Content */}

      <div className="relative p-5">

        <h3 className="line-clamp-1 text-lg font-bold">
          {actor.name}
        </h3>

        <p className="mt-2 line-clamp-1 text-sm text-[#FFD464]">
          {actor.character || "Unknown Character"}
        </p>

        <div className="mt-4 flex items-center gap-2 text-sm text-zinc-400">

          <Clapperboard size={15} />

          {actor.known_for_department || "Acting"}

        </div>

      </div>

      {/* Glass Border */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[28px]
          ring-1
          ring-white/10
        "
      />

    </motion.article>
  );
}