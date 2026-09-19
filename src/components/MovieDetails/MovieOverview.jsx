import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock3,
} from "lucide-react";

export default function MovieOverview({ movie }) {
  const [expanded, setExpanded] = useState(false);

  const overview = movie?.overview || "";

  const shouldCollapse = overview.length > 260;

  const preview = shouldCollapse
    ? overview.slice(0, 260) + "..."
    : overview;

  const readTime = useMemo(() => {
    const words = overview.split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 180));
  }, [overview]);

  if (!overview) return null;

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
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
      }}
      className="
        relative
        overflow-hidden
        rounded-[36px]
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
          opacity: [0.2, 0.45, 0.2],
          scale: [1, 1.08, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="
          absolute
          -right-16
          -top-16
          h-56
          w-56
          rounded-full
          bg-[#FFD464]/10
          blur-3xl
        "
      />

      {/* Header */}

      <div className="relative mb-8 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
              rounded-2xl
              bg-[#FFD464]/15
              p-3
              text-[#FFD464]
            "
          >
            <FileText size={24} />
          </div>

          <div>

            <h2 className="text-3xl font-black">
              Overview
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              Story • Synopsis • Plot
            </p>

          </div>

        </div>

        <div
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-black/30
            px-4
            py-2
            text-sm
            text-zinc-300
          "
        >
          <Clock3 size={16} />
          {readTime} min read
        </div>

      </div>

      {/* Content */}

      <AnimatePresence mode="wait">

        <motion.p
          key={expanded ? "full" : "preview"}
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            y: -15,
          }}
          transition={{
            duration: 0.3,
          }}
          className="
            relative
            text-lg
            leading-9
            text-zinc-300
          "
        >
          {expanded ? overview : preview}
        </motion.p>

      </AnimatePresence>

      {/* Footer */}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-5">

        <div className="flex items-center gap-3 text-sm text-zinc-500">

          <BookOpen size={18} />

          Movie description from TMDB.

        </div>

        {shouldCollapse && (

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={() => setExpanded((prev) => !prev)}
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-[#FFD464]
              px-6
              py-3
              font-semibold
              text-black
            "
          >
            {expanded ? (
              <>
                Show Less
                <ChevronUp size={18} />
              </>
            ) : (
              <>
                Read More
                <ChevronDown size={18} />
              </>
            )}
          </motion.button>

        )}

      </div>
    </motion.section>
  );
}