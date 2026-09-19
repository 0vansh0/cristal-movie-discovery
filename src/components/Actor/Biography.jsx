import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

export default function Biography({ actor }) {
  const [expanded, setExpanded] = useState(false);

  if (!actor) return null;

  const biography =
    actor.biography?.trim() ||
    "Biography is currently unavailable for this actor.";

  const shouldCollapse =
    biography.length > 600;

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
        duration: 0.6,
      }}
      className="
        relative
        overflow-hidden
        rounded-[40px]
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-3xl
      "
    >
      {/* Glow */}

      <motion.div
        animate={{
          opacity: [0.15, 0.3, 0.15],
          scale: [1, 1.05, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="
          absolute
          right-0
          top-0
          h-72
          w-72
          rounded-full
          bg-[#FFD464]/10
          blur-[120px]
        "
      />

      {/* Header */}

      <div className="relative z-10 flex items-center gap-4">

        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-[#FFD464]/15
          "
        >
          <BookOpen
            size={28}
            className="text-[#FFD464]"
          />
        </div>

        <div>

          <h2 className="text-3xl font-black">
            Biography
          </h2>

          <p className="mt-1 text-zinc-400">
            Career journey & life story
          </p>

        </div>

      </div>

      {/* Biography */}

      <div className="relative mt-10">

        <AnimatePresence mode="wait">

          <motion.div
            key={expanded ? "full" : "short"}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: .3,
            }}
          >
            <p
              className="
                whitespace-pre-line
                text-lg
                leading-9
                text-zinc-300
              "
            >
              {expanded
                ? biography
                : biography.slice(0, 600)}
            </p>
          </motion.div>

        </AnimatePresence>

        {!expanded &&
          shouldCollapse && (
            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                h-28
                bg-gradient-to-t
                from-[#111827]
                to-transparent
              "
            />
          )}

      </div>

      {/* Read More */}

      {shouldCollapse && (

        <div className="mt-10 flex justify-center">

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: .96,
            }}
            onClick={() =>
              setExpanded(
                !expanded
              )
            }
            className="
              flex
              items-center
              gap-3
              rounded-full
              border
              border-[#FFD464]/30
              bg-[#FFD464]/10
              px-8
              py-3
              font-semibold
              text-[#FFD464]
              transition
              hover:bg-[#FFD464]
              hover:text-black
            "
          >
            <Sparkles size={18} />

            {expanded
              ? "Read Less"
              : "Read Full Biography"}

            {expanded ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}

          </motion.button>

        </div>

      )}

      {/* Footer */}

      <div
        className="
          mt-12
          flex
          flex-wrap
          items-center
          justify-between
          gap-4
          rounded-3xl
          border
          border-white/10
          bg-black/20
          px-6
          py-5
        "
      >
        <div>

          <p className="text-sm text-zinc-500">
            Biography Length
          </p>

          <h4 className="mt-1 font-bold">
            {biography.length.toLocaleString()} Characters
          </h4>

        </div>

        <div>

          <p className="text-sm text-zinc-500">
            Source
          </p>

          <h4 className="mt-1 font-bold">
            TMDB Database
          </h4>

        </div>

      </div>

    </motion.section>
  );
}