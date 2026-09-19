import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  ArrowRight,
} from "lucide-react";

const recommendations = [
  {
    id: 1,
    title: "Blade Runner 2049",
    year: 2017,
    rating: 8.3,
    match: 98,
    reason: "Because you loved Interstellar",
    poster:
      "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg",
  },
  {
    id: 2,
    title: "Arrival",
    year: 2016,
    rating: 8.1,
    match: 95,
    reason: "Based on your Sci-Fi favorites",
    poster:
      "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg",
  },
  {
    id: 3,
    title: "The Prestige",
    year: 2006,
    rating: 8.5,
    match: 93,
    reason: "Directed by Christopher Nolan",
    poster:
      "https://image.tmdb.org/t/p/w500/5MXyQfz8xUP3dIFPTubhTsbFY6N.jpg",
  },
];

export default function FavoritesRecommendations() {
  return (
    <section className="mt-20">

      {/* Header */}

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-black">
            AI Recommendations
          </h2>

          <p className="mt-2 text-zinc-400">
            Personalized picks based on your favorites.
          </p>

        </div>

        <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5E5E] via-[#FFB84D] to-[#FFD464] px-5 py-3 font-semibold text-black">
          <Sparkles size={18} />
          AI Powered
        </div>

      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {recommendations.map((movie, index) => (

          <motion.div
            key={movie.id}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.12,
            }}
            whileHover={{
              y: -10,
            }}
            className="
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-3xl
            "
          >

            <div className="relative h-72 overflow-hidden">

              <motion.img
                whileHover={{
                  scale: 1.08,
                }}
                transition={{
                  duration: .5,
                }}
                src={movie.poster}
                alt={movie.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"/>

              <div className="absolute left-4 top-4 rounded-full bg-[#FFD464] px-4 py-2 font-bold text-black">
                {movie.match}% Match
              </div>

            </div>

            <div className="space-y-5 p-6">

              <div>

                <h3 className="text-2xl font-bold">
                  {movie.title}
                </h3>

                <p className="mt-1 text-zinc-400">
                  {movie.year}
                </p>

              </div>

              <div className="flex items-center justify-between">

                <span className="flex items-center gap-2">

                  <Star
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  {movie.rating}

                </span>

                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300">
                  Recommended
                </span>

              </div>

              <div className="rounded-2xl bg-white/5 p-4 text-sm text-zinc-300">
                ✨ {movie.reason}
              </div>

              <motion.button
                whileHover={{
                  scale: 1.03,
                }}
                whileTap={{
                  scale: .98,
                }}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-[#FF5E5E]
                  via-[#FFB84D]
                  to-[#FFD464]
                  py-3
                  font-semibold
                  text-black
                "
              >
                View Movie
                <ArrowRight size={18} />
              </motion.button>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}