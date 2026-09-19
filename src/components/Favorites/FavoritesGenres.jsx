import { motion } from "framer-motion";
import {
  Clapperboard,
  Flame,
  Sparkles,
  Star,
} from "lucide-react";

const genres = [
  {
    id: 1,
    name: "Action",
    movies: 42,
    percentage: 86,
    color: "from-red-500 to-orange-500",
    icon: Flame,
  },
  {
    id: 2,
    name: "Sci-Fi",
    movies: 31,
    percentage: 72,
    color: "from-cyan-500 to-blue-500",
    icon: Sparkles,
  },
  {
    id: 3,
    name: "Drama",
    movies: 26,
    percentage: 61,
    color: "from-purple-500 to-pink-500",
    icon: Clapperboard,
  },
  {
    id: 4,
    name: "Adventure",
    movies: 18,
    percentage: 48,
    color: "from-green-500 to-emerald-500",
    icon: Star,
  },
];

export default function FavoritesGenres() {
  return (
    <section className="mt-20">

      {/* Header */}

      <div className="mb-10">

        <h2 className="text-4xl font-black">
          Genre Analytics
        </h2>

        <p className="mt-2 text-zinc-400">
          Discover your favorite movie genres.
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2">

        {genres.map((genre, index) => {

          const Icon = genre.icon;

          return (

            <motion.div
              key={genre.id}
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
                y: -8,
              }}
              className="
                rounded-[30px]
                border
                border-white/10
                bg-white/5
                p-6
                backdrop-blur-3xl
              "
            >

              {/* Top */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div
                    className={`
                      rounded-2xl
                      bg-gradient-to-r
                      ${genre.color}
                      p-4
                    `}
                  >
                    <Icon
                      size={24}
                      className="text-black"
                    />
                  </div>

                  <div>

                    <h3 className="text-xl font-bold">
                      {genre.name}
                    </h3>

                    <p className="text-zinc-400">
                      {genre.movies} Movies
                    </p>

                  </div>

                </div>

                <div className="text-2xl font-black">
                  {genre.percentage}%
                </div>

              </div>

              {/* Progress */}

              <div className="mt-8 h-3 overflow-hidden rounded-full bg-white/10">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: `${genre.percentage}%`,
                  }}
                  transition={{
                    duration: 1,
                    delay: index * 0.15,
                  }}
                  className={`
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    ${genre.color}
                  `}
                />

              </div>

              {/* Bottom */}

              <div className="mt-6 flex items-center justify-between text-sm text-zinc-400">

                <span>Popularity</span>

                <span>Top Genre</span>

              </div>

            </motion.div>

          );

        })}

      </div>

    </section>
  );
}