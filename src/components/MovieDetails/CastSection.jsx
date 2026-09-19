import { motion } from "framer-motion";
import {
  Users,
  ChevronRight,
} from "lucide-react";

import CastCard from "./CastCard";

export default function CastSection({
  cast = [],
}) {
  if (!cast.length) return null;

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
        rounded-[36px]
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-3xl
      "
    >
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
              rounded-2xl
              bg-[#FFD464]/15
              p-3
              text-[#FFD464]
            "
          >
            <Users size={26} />
          </div>

          <div>

            <h2 className="text-3xl font-black">
              Cast
            </h2>

            <p className="mt-1 text-zinc-400">
              Main Cast & Characters
            </p>

          </div>

        </div>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-black/30
            px-5
            py-3
            text-sm
            transition
            hover:border-[#FFD464]
          "
        >
          View All

          <ChevronRight size={18} />

        </button>

      </div>

      {/* Cast List */}

      <div
        className="
          flex
          gap-6
          overflow-x-auto
          pb-3
          scrollbar-thin
          scrollbar-thumb-white/10
        "
      >

        {cast
          .slice(0, 20)
          .map((actor, index) => (

            <motion.div
              key={actor.id}
              initial={{
                opacity:0,
                y:25,
              }}
              whileInView={{
                opacity:1,
                y:0,
              }}
              transition={{
                delay:index*.05,
              }}
              className="
                shrink-0
                w-[220px]
              "
            >

              <CastCard
                actor={actor}
              />

            </motion.div>

        ))}

      </div>

    </motion.section>
  );
}