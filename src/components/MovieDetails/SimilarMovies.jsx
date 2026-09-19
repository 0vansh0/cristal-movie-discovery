import { motion } from "framer-motion";
import {
  Clapperboard,
  ChevronRight,
} from "lucide-react";

import SimilarMovieCard from "./SimilarMovieCard";

export default function SimilarMovies({
  movies = [],
}) {
  if (!movies.length) return null;

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
        duration: 0.8,
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
            <Clapperboard size={26} />
          </div>

          <div>

            <h2 className="text-3xl font-black">
              Similar Movies
            </h2>

            <p className="mt-1 text-zinc-400">
              You may also like these movies
            </p>

          </div>

        </div>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.95,
          }}
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
            transition
            hover:border-[#FFD464]
          "
        >
          View All

          <ChevronRight size={18} />

        </motion.button>

      </div>

      {/* Movies */}

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

        {movies.slice(0, 15).map((movie, index) => (

          <motion.div
            key={movie.id}
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.05,
            }}
            className="
              w-[230px]
              shrink-0
            "
          >

            <SimilarMovieCard
              movie={movie}
            />

          </motion.div>

        ))}

      </div>

    </motion.section>
  );
}