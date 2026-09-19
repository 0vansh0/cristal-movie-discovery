import { motion } from "framer-motion";
import {
  Play,
  Clock3,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const movie = {
  title: "Dune: Part Two",
  runtime: "2h 46m",
  left: "58m left",
  progress: 72,
  lastWatched: "Watched yesterday",
  image:
    "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
};

export default function WatchlistContinue() {
  return (
    <section className="mt-20">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black">
            Continue Watching
          </h2>

          <p className="mt-2 text-zinc-400">
            Resume exactly where you stopped.
          </p>

        </div>

      </div>

      <motion.div
        whileHover={{
          scale: 1.01,
        }}
        className="
          group
          relative
          overflow-hidden
          rounded-[40px]
          border
          border-white/10
          bg-white/5
          backdrop-blur-3xl
        "
      >

        {/* Background */}

        <motion.img
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: .8,
          }}
          src={movie.image}
          alt=""
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#080B12] via-[#080B12]/75 to-black/20" />

        <div className="relative z-10 flex min-h-[380px] items-center justify-between p-10">

          {/* Left */}

          <div className="max-w-2xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 backdrop-blur-xl">

              <Sparkles size={16} />

              AI recommends finishing this movie first

            </div>

            <h2 className="text-6xl font-black">
              {movie.title}
            </h2>

            <div className="mt-5 flex gap-6 text-zinc-300">

              <span>{movie.runtime}</span>

              <span>{movie.left}</span>

              <span>{movie.lastWatched}</span>

            </div>

            {/* Progress */}

            <div className="mt-10 max-w-xl">

              <div className="mb-3 flex justify-between text-sm">

                <span>Progress</span>

                <span>{movie.progress}%</span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: `${movie.progress}%`,
                  }}
                  transition={{
                    duration: 1.5,
                  }}
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-[#FF5E5E]
                    via-[#FFB84D]
                    to-[#FFD464]
                  "
                />

              </div>

            </div>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-5">

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: .95,
                }}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-full
                  bg-white
                  px-8
                  py-4
                  font-bold
                  text-black
                "
              >

                <Play
                  fill="currentColor"
                  size={20}
                />

                Resume

              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/10
                  bg-white/10
                  px-8
                  py-4
                  backdrop-blur-xl
                "
              >

                Details

                <ChevronRight size={18} />

              </motion.button>

            </div>

          </div>

          {/* Right Card */}

          <motion.div
            whileHover={{
              y: -8,
            }}
            className="
              hidden
              w-[340px]
              rounded-[32px]
              border
              border-white/10
              bg-black/40
              p-7
              backdrop-blur-3xl
              xl:block
            "
          >

            <h3 className="text-2xl font-bold">
              Next Up
            </h3>

            <p className="mt-2 text-zinc-400">
              AI Suggestion
            </p>

            <div className="mt-8 rounded-2xl bg-white/5 p-5">

              <h4 className="text-xl font-bold">
                Dune Messiah
              </h4>

              <p className="mt-3 text-zinc-400">
                Continue the saga after completing Part Two.
              </p>

            </div>

            <div className="mt-8 flex items-center gap-3 text-zinc-300">

              <Clock3 size={18} />

              Estimated binge time: 5h 32m

            </div>

          </motion.div>

        </div>

      </motion.div>

    </section>
  );
}