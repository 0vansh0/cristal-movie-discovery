import { motion } from "framer-motion";
import {
  Drama,
  Clapperboard,
  Laugh,
  Ghost,
  Rocket,
  Heart,
} from "lucide-react";

const genres = [
  {
    name: "Drama",
    percent: 92,
    color: "from-pink-500 to-rose-500",
    icon: Drama,
  },
  {
    name: "Sci-Fi",
    percent: 81,
    color: "from-cyan-500 to-blue-500",
    icon: Rocket,
  },
  {
    name: "Action",
    percent: 74,
    color: "from-orange-500 to-yellow-400",
    icon: Clapperboard,
  },
  {
    name: "Comedy",
    percent: 63,
    color: "from-emerald-500 to-lime-500",
    icon: Laugh,
  },
  {
    name: "Romance",
    percent: 48,
    color: "from-fuchsia-500 to-pink-500",
    icon: Heart,
  },
  {
    name: "Horror",
    percent: 39,
    color: "from-violet-600 to-purple-600",
    icon: Ghost,
  },
];

export default function GenreChart() {
  return (
    <section className="mt-16">

      <div className="mb-8">
        <h2 className="text-3xl font-black">
          Favorite Genres
        </h2>

        <p className="mt-2 text-zinc-400">
          Distribution of your movie collection.
        </p>
      </div>

      <div
        className="
          rounded-[34px]
          border
          border-white/10
          bg-white/5
          p-8
          backdrop-blur-3xl
        "
      >
        {genres.map((genre, index) => {
          const Icon = genre.icon;

          return (
            <motion.div
              key={genre.name}
              initial={{
                opacity: 0,
                x: -30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              className="mb-8 last:mb-0"
            >
              <div className="mb-3 flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div
                    className={`
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-gradient-to-br
                      ${genre.color}
                    `}
                  >
                    <Icon
                      size={20}
                      className="text-black"
                    />
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {genre.name}
                    </h3>

                    <p className="text-sm text-zinc-500">
                      {genre.percent}% of collection
                    </p>

                  </div>

                </div>

                <span className="font-bold text-xl">
                  {genre.percent}%
                </span>

              </div>

              <div className="h-3 overflow-hidden rounded-full bg-white/10">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: `${genre.percent}%`,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.12,
                  }}
                  className={`
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    ${genre.color}
                  `}
                />

              </div>

            </motion.div>
          );
        })}
      </div>
    </section>
  );
}