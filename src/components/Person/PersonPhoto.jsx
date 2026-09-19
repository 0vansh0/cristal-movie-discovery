import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ZoomIn,
  BadgeCheck,
  Camera,
} from "lucide-react";

const ORIGINAL =
  "https://image.tmdb.org/t/p/original";

const PROFILE =
  "https://image.tmdb.org/t/p/w780";

export default function PersonPhoto({
  person,
}) {
  const [open, setOpen] =
    useState(false);

  if (!person) return null;

  const image = person.profile_path
    ? PROFILE + person.profile_path
    : "/placeholder.jpg";

  const original = person.profile_path
    ? ORIGINAL + person.profile_path
    : "/placeholder.jpg";

  return (
    <>
      <motion.div
        whileHover={{
          rotateX: 5,
          rotateY: -6,
          scale: 1.02,
        }}
        transition={{
          type: "spring",
          stiffness: 220,
        }}
        className="
          group
          relative
          mx-auto
          w-full
          max-w-[390px]
          perspective-[1200px]
        "
      >
        {/* Glow */}

        <div
          className="
            absolute
            -inset-5
            rounded-[40px]
            bg-gradient-to-r
            from-yellow-400/20
            via-orange-400/20
            to-red-500/20
            opacity-0
            blur-3xl
            transition
            duration-500
            group-hover:opacity-100
          "
        />

        {/* Border */}

        <div
          className="
            relative
            overflow-hidden
            rounded-[36px]
            border
            border-white/10
            bg-white/5
            p-3
            backdrop-blur-3xl
          "
        >
          {/* Image */}

          <img
            src={image}
            alt={person.name}
            className="
              aspect-[2/3]
              w-full
              rounded-[28px]
              object-cover
            "
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/placeholder.jpg';
            }}
          />

          {/* Overlay */}

          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-black/40
              opacity-0
              transition
              group-hover:opacity-100
            "
          >
            <motion.button
              whileTap={{
                scale: 0.9,
              }}
              whileHover={{
                scale: 1.1,
              }}
              onClick={() =>
                setOpen(true)
              }
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-white/15
                backdrop-blur-xl
              "
            >
              <ZoomIn size={28} />
            </motion.button>
          </div>

          {/* Badge */}

          <div
            className="
              absolute
              left-5
              top-5
              flex
              items-center
              gap-2
              rounded-full
              bg-[#FFD464]
              px-4
              py-2
              text-sm
              font-bold
              text-black
            "
          >
            <BadgeCheck size={16} />

            {person.known_for_department}
          </div>

          {/* Camera */}

          <div
            className="
              absolute
              bottom-5
              right-5
              flex
              items-center
              gap-2
              rounded-full
              bg-black/60
              px-4
              py-2
              backdrop-blur-xl
            "
          >
            <Camera size={16} />

            HD
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[999]
              flex
              items-center
              justify-center
              bg-black/95
              p-8
            "
          >
            {/* Close */}

            <button
              onClick={() =>
                setOpen(false)
              }
              className="
                absolute
                right-10
                top-10
                rounded-full
                bg-white/10
                p-4
                backdrop-blur-xl
              "
            >
              <X />
            </button>

            {/* Image */}

            <motion.img
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.8,
                opacity: 0,
              }}
              src={original}
              alt={person.name}
              className="
                max-h-[90vh]
                rounded-[24px]
                object-contain
              "
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}