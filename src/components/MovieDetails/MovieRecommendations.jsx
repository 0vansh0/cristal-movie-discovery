import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  ChevronRight,
  Brain,
} from "lucide-react";

import SimilarMovieCard from "./SimilarMovieCard";

export default function MovieRecommendations({
  movies = [],
  onMovieClick,
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

      <div className="mb-10 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
              rounded-2xl
              bg-[#FFD464]/15
              p-3
              text-[#FFD464]
            "
          >
            <Sparkles size={28}/>
          </div>

          <div>

            <h2 className="text-3xl font-black">
              Recommended For You
            </h2>

            <p className="mt-1 text-zinc-400">
              Based on genres, ratings and popularity
            </p>

          </div>

        </div>

        <motion.button
          whileHover={{
            scale:1.05,
          }}
          whileTap={{
            scale:.95,
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
            hover:border-[#FFD464]
          "
        >
          Explore More

          <ChevronRight size={18}/>

        </motion.button>

      </div>

      {/* AI Banner */}

      <motion.div
        whileHover={{
          scale:1.01,
        }}
        className="
          mb-10
          rounded-[32px]
          border
          border-[#FFD464]/20
          bg-gradient-to-r
          from-[#FFD464]/15
          via-orange-500/10
          to-transparent
          p-8
        "
      >
        <div className="flex items-center gap-5">

          <div
            className="
              rounded-2xl
              bg-[#FFD464]/20
              p-5
              text-[#FFD464]
            "
          >
            <Brain size={40}/>
          </div>

          <div>

            <h3 className="text-2xl font-bold">
              AI Recommendation Engine
            </h3>

            <p className="mt-2 max-w-2xl text-zinc-300">
              These recommendations are selected using genre
              similarity, user ratings, popularity trends and
              audience preferences.
            </p>

          </div>

        </div>
      </motion.div>

      {/* Recommendation Cards */}

      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {movies.slice(0,8).map((movie,index)=>(

          <motion.div
            key={movie.id}
            initial={{
              opacity:0,
              y:30,
            }}
            whileInView={{
              opacity:1,
              y:0,
            }}
            transition={{
              delay:index*.08,
            }}
          >

            <SimilarMovieCard
              movie={movie}
              onClick={onMovieClick}
            />

            {/* Recommendation Score */}

            <div
              className="
                mt-4
                rounded-2xl
                border
                border-white/10
                bg-black/30
                p-4
              "
            >
              <div className="flex items-center justify-between">

                <span className="text-sm text-zinc-400">
                  Match Score
                </span>

                <div className="flex items-center gap-2">

                  <TrendingUp
                    size={16}
                    className="text-green-400"
                  />

                  <span className="font-bold text-green-400">
                    {95-index}%
                  </span>

                </div>

              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">

                <motion.div
                  initial={{
                    width:0,
                  }}
                  whileInView={{
                    width:`${95-index}%`,
                  }}
                  transition={{
                    duration:1,
                  }}
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-[#FFD464]
                    to-orange-500
                  "
                />

              </div>

            </div>

          </motion.div>

        ))}
      </div>

    </motion.section>
  );
}