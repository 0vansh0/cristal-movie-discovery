import { motion } from "framer-motion";
import {
  Play,
  Clock3,
  ArrowRight,
} from "lucide-react";

const watching = [
  {
    id: 157336,
    title: "Interstellar",
    episode: "1h 48m watched",
    progress: 72,
    image:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 603,
    title: "The Matrix",
    episode: "58m watched",
    progress: 36,
    image:
      "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
  {
    id: 155,
    title: "The Dark Knight",
    episode: "2h 02m watched",
    progress: 91,
    image:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
];

export default function ProfileWatchlist() {
  return (
    <section>

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black">
            Continue Watching
          </h2>

          <p className="mt-2 text-zinc-400">
            Resume where you left off.
          </p>

        </div>

        <button className="flex items-center gap-2 text-[#FFD464] transition hover:gap-3">
          View All
          <ArrowRight size={18} />
        </button>

      </div>

      <div className="grid gap-7 lg:grid-cols-3">

        {watching.map((movie, index) => (

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
              delay: index * .1,
            }}
            whileHover={{
              y: -10,
            }}
            className="
              group
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-2xl
            "
          >

            <div className="relative">

              <img
                src={movie.image}
                alt={movie.title}
                className="h-[220px] w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-transparent to-transparent" />

              <button
                className="
                  absolute
                  bottom-5
                  right-5
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-r
                  from-[#FF5E5E]
                  to-[#FFD464]
                  shadow-xl
                "
              >
                <Play
                  size={22}
                  fill="currentColor"
                  className="text-black"
                />
              </button>

            </div>

            <div className="p-6">

              <h3 className="text-2xl font-bold">
                {movie.title}
              </h3>

              <div className="mt-3 flex items-center gap-2 text-zinc-400">

                <Clock3 size={16} />

                {movie.episode}

              </div>

              {/* Progress */}

              <div className="mt-6">

                <div className="mb-2 flex justify-between text-sm">

                  <span>Progress</span>

                  <span>{movie.progress}%</span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: `${movie.progress}%`,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-[#FF5E5E] to-[#FFD464]"
                  />

                </div>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}