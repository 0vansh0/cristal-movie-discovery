import { useState } from "react";
import { motion } from "framer-motion";
import {
  ImageOff,
  Star,
  Heart,
  Bookmark,
  Share2,
  Camera,
} from "lucide-react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w780";

export default function ActorPhoto({
  actor,
  onFavorite,
  onBookmark,
  onShare,
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!actor) return null;

  const image = actor.profile_path
    ? `${IMAGE_URL}${actor.profile_path}`
    : "https://placehold.co/600x900/111827/FFFFFF?text=No+Photo";

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -80,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: .8,
      }}
      className="
        relative
        w-full
        max-w-md
      "
    >

      {/* Glow */}

      <motion.div
        animate={{
          opacity: [.3,.6,.3],
          scale:[1,1.05,1],
        }}
        transition={{
          repeat:Infinity,
          duration:5,
        }}
        className="
          absolute
          inset-0
          rounded-[40px]
          bg-[#FFD464]/20
          blur-[100px]
        "
      />

      {/* Card */}

      <motion.div
        whileHover={{
          rotateY:-6,
          rotateX:6,
          y:-10,
          scale:1.02,
        }}
        transition={{
          type:"spring",
          stiffness:220,
        }}
        style={{
          transformStyle:"preserve-3d",
          perspective:2000,
        }}
        className="
          relative
          overflow-hidden
          rounded-[40px]
          border
          border-white/10
          bg-white/5
          backdrop-blur-3xl
          shadow-[0_40px_120px_rgba(0,0,0,.45)]
        "
      >

        {/* Image */}

        <div className="relative aspect-[2/3] overflow-hidden">

          {!loaded && !error && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-800"/>
          )}

          {error ? (

            <div className="flex h-full items-center justify-center bg-zinc-900">

              <div className="text-center">

                <ImageOff
                  size={60}
                  className="mx-auto text-zinc-500"
                />

                <p className="mt-4 text-zinc-400">
                  Image unavailable
                </p>

              </div>

            </div>

          ) : (

            <motion.img
              whileHover={{
                scale:1.08,
              }}
              transition={{
                duration:.6,
              }}
              src={image}
              alt={actor.name}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
              className={`
                h-full
                w-full
                object-cover
                transition
                duration-500
                ${
                  loaded
                    ? "opacity-100"
                    : "opacity-0"
                }
              `}
            />

          )}

        </div>

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"/>

        {/* Shine */}

        <motion.div
          initial={{
            x:"-120%",
          }}
          whileHover={{
            x:"180%",
          }}
          transition={{
            duration:.8,
          }}
          className="
            absolute
            inset-y-0
            left-0
            w-28
            -skew-x-12
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
          "
        />

        {/* Popularity */}

        <div
          className="
            absolute
            left-5
            top-5
            flex
            items-center
            gap-2
            rounded-full
            bg-black/70
            px-4
            py-2
            backdrop-blur-xl
          "
        >

          <Star
            size={16}
            className="
              fill-yellow-400
              text-yellow-400
            "
          />

          <span className="font-semibold">
            {Math.round(actor.popularity || 0)}
          </span>

        </div>

        {/* Actions */}

        <div
          className="
            absolute
            right-5
            top-5
            flex
            flex-col
            gap-3
          "
        >

          <ActionButton
            icon={<Heart size={18}/>}
            onClick={onFavorite}
          />

          <ActionButton
            icon={<Bookmark size={18}/>}
            onClick={onBookmark}
          />

          <ActionButton
            icon={<Share2 size={18}/>}
            onClick={onShare}
          />

        </div>

        {/* Bottom */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0
            p-6
          "
        >

          <h2 className="text-3xl font-black">
            {actor.name}
          </h2>

          <p className="mt-2 text-zinc-300">
            {actor.known_for_department}
          </p>

          <div className="mt-4 flex items-center gap-3">

            <Camera
              size={18}
              className="text-[#FFD464]"
            />

            <span className="text-sm text-zinc-300">
              High Resolution Portrait
            </span>

          </div>

        </div>

      </motion.div>

    </motion.div>
  );
}

/* ---------------- */

function ActionButton({
  icon,
  onClick,
}) {
  return (
    <motion.button
      whileHover={{
        scale:1.08,
        x:-4,
      }}
      whileTap={{
        scale:.95,
      }}
      onClick={onClick}
      className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        bg-black/60
        backdrop-blur-xl
        transition
        hover:bg-[#FFD464]
        hover:text-black
      "
    >
      {icon}
    </motion.button>
  );
}