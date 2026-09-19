import { motion } from "framer-motion";
import {
  Film,
  Sparkles,
  Sword,
  Ghost,
  Laugh,
  HeartHandshake,
} from "lucide-react";

const genres = [
  {
    name: "Sci-Fi",
    percent: 92,
    icon: <Sparkles size={22} />,
    color: "from-cyan-400 to-blue-500",
  },
  {
    name: "Action",
    percent: 85,
    icon: <Sword size={22} />,
    color: "from-red-500 to-orange-500",
  },
  {
    name: "Drama",
    percent: 74,
    icon: <Film size={22} />,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    name: "Comedy",
    percent: 63,
    icon: <Laugh size={22} />,
    color: "from-yellow-400 to-orange-400",
  },
  {
    name: "Horror",
    percent: 51,
    icon: <Ghost size={22} />,
    color: "from-purple-500 to-indigo-600",
  },
  {
    name: "Romance",
    percent: 38,
    icon: <HeartHandshake size={22} />,
    color: "from-pink-500 to-rose-500",
  },
];

export default function ProfileGenres() {
  return (
    <section>

      <div className="mb-10">
        <h2 className="text-3xl font-black">
          Movie Analytics
        </h2>

        <p className="mt-2 text-zinc-400">
          Your favorite genres and viewing habits.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr]">

        {/* Left Card */}
        <div className="rounded-[30px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

          <h3 className="mb-8 text-xl font-bold">
            Genre Distribution
          </h3>

          <div className="space-y-7">

            {genres.map((genre, index) => (

              <motion.div
                key={genre.name}
                initial={{
                  opacity: 0,
                  x: -40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * .08,
                }}
              >

                <div className="mb-3 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${genre.color}`}
                    >
                      {genre.icon}
                    </div>

                    <span className="font-semibold">
                      {genre.name}
                    </span>

                  </div>

                  <span className="text-zinc-400">
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
                      duration: 1,
                    }}
                    className={`h-full rounded-full bg-gradient-to-r ${genre.color}`}
                  />

                </div>

              </motion.div>

            ))}

          </div>

        </div>

        {/* Right Card */}

        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          className="rounded-[30px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
        >

          <h3 className="text-xl font-bold">
            This Month
          </h3>

          <div className="mt-10 flex items-center justify-center">

            <div className="relative flex h-60 w-60 items-center justify-center rounded-full border-[14px] border-cyan-500/20">

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  repeat: Infinity,
                  duration: 20,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border-t-[14px] border-[#FFD464]"
              />

              <div className="text-center">

                <h1 className="text-6xl font-black">
                  42
                </h1>

                <p className="mt-2 text-zinc-400">
                  Movies Watched
                </p>

              </div>

            </div>

          </div>

          <div className="mt-10 space-y-5">

            <div className="flex justify-between">
              <span className="text-zinc-400">Hours Watched</span>
              <span className="font-bold">98 hrs</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">Average Rating</span>
              <span className="font-bold">8.9 ★</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">Favorite Genre</span>
              <span className="font-bold text-cyan-400">
                Sci-Fi
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">Longest Streak</span>
              <span className="font-bold text-orange-400">
                31 Days 🔥
              </span>
            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}