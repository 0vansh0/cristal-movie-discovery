import { motion } from "framer-motion";
import {
  CalendarDays,
  Heart,
  Film,
  Star,
} from "lucide-react";

const timeline = [
  {
    month: "January",
    year: 2026,
    movies: [
      {
        title: "Interstellar",
        date: "Jan 4",
        rating: "9.6",
      },
      {
        title: "Oppenheimer",
        date: "Jan 12",
        rating: "9.1",
      },
    ],
  },
  {
    month: "February",
    year: 2026,
    movies: [
      {
        title: "Dune Part Two",
        date: "Feb 8",
        rating: "9.3",
      },
      {
        title: "The Batman",
        date: "Feb 21",
        rating: "8.9",
      },
    ],
  },
  {
    month: "March",
    year: 2026,
    movies: [
      {
        title: "Spider-Man: Across the Spider-Verse",
        date: "Mar 9",
        rating: "9.5",
      },
    ],
  },
];

export default function FavoritesTimeline() {
  return (
    <section className="mt-20">

      {/* Header */}

      <div className="mb-10">

        <h2 className="text-4xl font-black">
          Favorites Timeline
        </h2>

        <p className="mt-2 text-zinc-400">
          A journey through the movies you've loved over time.
        </p>

      </div>

      <div className="relative">

        {/* Vertical Line */}

        <div className="absolute left-7 top-0 h-full w-px bg-gradient-to-b from-[#FFD464] via-white/20 to-transparent" />

        {timeline.map((group, index) => (

          <motion.div
            key={group.month}
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.15,
            }}
            className="relative mb-14 pl-20"
          >

            {/* Timeline Dot */}

            <div className="absolute left-0 top-1 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#FF5E5E] via-[#FFB84D] to-[#FFD464] shadow-xl">

              <CalendarDays
                size={24}
                className="text-black"
              />

            </div>

            {/* Month */}

            <div className="mb-5">

              <h3 className="text-2xl font-bold">
                {group.month}
              </h3>

              <p className="text-zinc-400">
                {group.year}
              </p>

            </div>

            {/* Movies */}

            <div className="space-y-4">

              {group.movies.map((movie) => (

                <motion.div
                  key={movie.title}
                  whileHover={{
                    x: 10,
                  }}
                  className="
                    flex
                    items-center
                    justify-between
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    p-5
                    backdrop-blur-3xl
                  "
                >

                  <div>

                    <h4 className="font-semibold">
                      {movie.title}
                    </h4>

                    <div className="mt-2 flex items-center gap-5 text-sm text-zinc-400">

                      <span className="flex items-center gap-2">
                        <Film size={15} />
                        Added {movie.date}
                      </span>

                      <span className="flex items-center gap-2">
                        <Heart
                          size={15}
                          className="fill-red-500 text-red-500"
                        />
                        Favorite
                      </span>

                    </div>

                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-[#FFD464] px-4 py-2 font-semibold text-black">

                    <Star
                      size={16}
                      className="fill-black"
                    />

                    {movie.rating}

                  </div>

                </motion.div>

              ))}

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}