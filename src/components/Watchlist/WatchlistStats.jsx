import { motion } from "framer-motion";
import {
  Film,
  Clock3,
  Star,
  Trophy,
  Flame,
  Bookmark,
} from "lucide-react";

const stats = [
  {
    title: "Saved Movies",
    value: "276",
    subtitle: "+18 this month",
    icon: Film,
    color: "from-red-500 to-orange-500",
  },
  {
    title: "Watch Time",
    value: "712h",
    subtitle: "226h remaining",
    icon: Clock3,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Average Rating",
    value: "8.9",
    subtitle: "★★★★★",
    icon: Star,
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Completed",
    value: "68%",
    subtitle: "188 movies",
    icon: Trophy,
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Watching Streak",
    value: "31",
    subtitle: "Days",
    icon: Flame,
    color: "from-pink-500 to-red-500",
  },
  {
    title: "Collections",
    value: "18",
    subtitle: "Custom Lists",
    icon: Bookmark,
    color: "from-violet-500 to-fuchsia-500",
  },
];

export default function WatchlistStats() {
  return (
    <section className="mt-16">

      <div className="mb-8">

        <h2 className="text-3xl font-black">
          Watchlist Analytics
        </h2>

        <p className="mt-2 text-zinc-400">
          A quick overview of your movie collection.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {stats.map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
                bg-white/5
                p-7
                backdrop-blur-2xl
              "
            >

              {/* Hover Glow */}

              <div
                className={`
                  absolute
                  inset-0
                  bg-gradient-to-br
                  ${item.color}
                  opacity-0
                  blur-3xl
                  transition
                  duration-500
                  group-hover:opacity-20
                `}
              />

              <div className="relative">

                <div
                  className={`
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    ${item.color}
                    shadow-xl
                  `}
                >
                  <Icon
                    size={28}
                    className="text-black"
                  />
                </div>

                <h3 className="mt-8 text-zinc-400">
                  {item.title}
                </h3>

                <motion.h1
                  initial={{
                    scale: 0.8,
                  }}
                  whileInView={{
                    scale: 1,
                  }}
                  className="mt-2 text-5xl font-black"
                >
                  {item.value}
                </motion.h1>

                <p className="mt-2 text-zinc-500">
                  {item.subtitle}
                </p>

              </div>

            </motion.div>

          );

        })}

      </div>

    </section>
  );
}