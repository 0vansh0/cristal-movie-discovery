import { motion } from "framer-motion";
import {
  Trophy,
  Star,
  Medal,
  Crown,
  CheckCircle2,
  Lock,
} from "lucide-react";

const achievements = [
  {
    title: "Movie Lover",
    description: "Add 100 movies to favorites",
    progress: 100,
    reward: "Bronze",
    unlocked: true,
    icon: Medal,
    gradient: "from-amber-600 to-orange-500",
  },
  {
    title: "Cinephile",
    description: "Maintain 8.5+ average rating",
    progress: 100,
    reward: "Gold",
    unlocked: true,
    icon: Trophy,
    gradient: "from-yellow-400 to-orange-400",
  },
  {
    title: "Genre Explorer",
    description: "Watch 20 different genres",
    progress: 85,
    reward: "Platinum",
    unlocked: false,
    icon: Star,
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    title: "Ultimate Collector",
    description: "Favorite 500 movies",
    progress: 62,
    reward: "Diamond",
    unlocked: false,
    icon: Crown,
    gradient: "from-pink-500 to-purple-600",
  },
];

export default function AchievementCard() {
  return (
    <section className="mt-16">

      <div className="mb-8">

        <h2 className="text-3xl font-black">
          Achievements
        </h2>

        <p className="mt-2 text-zinc-400">
          Unlock milestones as your collection grows.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {achievements.map((item, index) => {

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
                delay: index * 0.1,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
                bg-white/5
                p-6
                backdrop-blur-3xl
              "
            >
              {/* Glow */}

              <div
                className={`
                  absolute
                  -top-10
                  -right-10
                  h-36
                  w-36
                  rounded-full
                  bg-gradient-to-br
                  ${item.gradient}
                  opacity-20
                  blur-3xl
                `}
              />

              {/* Icon */}

              <div
                className={`
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  ${item.gradient}
                `}
              >
                <Icon
                  size={30}
                  className="text-black"
                />
              </div>

              <div className="mt-6">

                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-zinc-400">
                  {item.description}
                </p>

              </div>

              {/* Progress */}

              <div className="mt-6">

                <div className="mb-2 flex justify-between text-sm">

                  <span>Progress</span>

                  <span>{item.progress}%</span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: `${item.progress}%`,
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.15,
                    }}
                    className={`
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      ${item.gradient}
                    `}
                  />

                </div>

              </div>

              {/* Footer */}

              <div className="mt-6 flex items-center justify-between">

                <span
                  className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    ${
                      item.unlocked
                        ? "bg-green-500/20 text-green-300"
                        : "bg-zinc-700/40 text-zinc-400"
                    }
                  `}
                >
                  {item.reward}
                </span>

                {item.unlocked ? (
                  <CheckCircle2
                    className="text-green-400"
                    size={22}
                  />
                ) : (
                  <Lock
                    className="text-zinc-500"
                    size={20}
                  />
                )}

              </div>

            </motion.div>

          );

        })}

      </div>

    </section>
  );
}