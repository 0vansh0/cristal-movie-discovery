import { motion } from "framer-motion";
import {
  Film,
  Tv,
  Heart,
  Bookmark,
  Star,
  MessageSquare,
  ListVideo,
  Clock3,
  Trophy,
  TrendingUp,
} from "lucide-react";

const statsConfig = [
  {
    key: "movies",
    title: "Movies Watched",
    icon: Film,
    color: "text-sky-400",
  },
  {
    key: "tvShows",
    title: "TV Shows",
    icon: Tv,
    color: "text-violet-400",
  },
  {
    key: "favorites",
    title: "Favorites",
    icon: Heart,
    color: "text-red-400",
  },
  {
    key: "watchlist",
    title: "Watchlist",
    icon: Bookmark,
    color: "text-amber-400",
  },
  {
    key: "ratings",
    title: "Ratings",
    icon: Star,
    color: "text-yellow-400",
  },
  {
    key: "reviews",
    title: "Reviews",
    icon: MessageSquare,
    color: "text-green-400",
  },
  {
    key: "lists",
    title: "Lists",
    icon: ListVideo,
    color: "text-cyan-400",
  },
  {
    key: "watchTime",
    title: "Watch Time",
    icon: Clock3,
    color: "text-orange-400",
    suffix: " hrs",
  },
  {
    key: "achievements",
    title: "Achievements",
    icon: Trophy,
    color: "text-pink-400",
  },
  {
    key: "weeklyActivity",
    title: "Weekly Activity",
    icon: TrendingUp,
    color: "text-emerald-400",
    suffix: "%",
  },
];

export default function UserStats({ stats }) {
  if (!stats) return null;

  return (
    <section className="space-y-8">

      <div>

        <h2 className="text-4xl font-black">
          Your Statistics
        </h2>

        <p className="mt-2 text-zinc-400">
          A snapshot of your movie journey.
        </p>

      </div>

      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-5
        "
      >

        {statsConfig.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.key}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="
                rounded-[28px]
                border
                border-white/10
                bg-white/5
                p-6
                backdrop-blur-3xl
              "
            >

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-white/10
                "
              >
                <Icon
                  className={item.color}
                  size={28}
                />
              </div>

              <p className="mt-5 text-zinc-400">
                {item.title}
              </p>

              <h3 className="mt-2 text-3xl font-black">

                {stats[item.key] ?? 0}

                {item.suffix || ""}

              </h3>

            </motion.div>
          );
        })}
      </div>

      {/* Weekly Progress */}

      <motion.div
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
        className="
          rounded-[32px]
          border
          border-white/10
          bg-white/5
          p-8
          backdrop-blur-3xl
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <h3 className="text-2xl font-bold">
              Weekly Goal
            </h3>

            <p className="mt-2 text-zinc-400">
              Movies watched this week
            </p>

          </div>

          <span className="text-4xl font-black">

            {stats.weeklyActivity ?? 0}%

          </span>

        </div>

        <div
          className="
            mt-8
            h-4
            overflow-hidden
            rounded-full
            bg-white/10
          "
        >

          <motion.div
            initial={{
              width: 0,
            }}
            whileInView={{
              width: `${stats.weeklyActivity || 0}%`,
            }}
            transition={{
              duration: 1,
            }}
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-yellow-400
              via-orange-400
              to-pink-500
            "
          />

        </div>

      </motion.div>

    </section>
  );
}