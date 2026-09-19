import { motion } from "framer-motion";
import {
  Trophy,
  Star,
  Award,
  Medal,
  Crown,
  Flame,
  Lock,
  CheckCircle2,
} from "lucide-react";

const ICONS = {
  trophy: Trophy,
  star: Star,
  award: Award,
  medal: Medal,
  crown: Crown,
  streak: Flame,
};

const RARITY = {
  common: "border-zinc-600 text-zinc-300",
  rare: "border-sky-500 text-sky-400",
  epic: "border-violet-500 text-violet-400",
  legendary: "border-yellow-400 text-yellow-300",
};

export default function AchievementCards({
  achievements = [],
  onAchievementClick,
}) {
  if (!achievements.length) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-4xl font-black">
            Achievements
          </h2>

          <p className="mt-2 text-zinc-400">
            Unlock badges as you explore movies and TV.
          </p>
        </div>

        <span className="rounded-full bg-yellow-500/20 px-5 py-2 font-semibold text-yellow-400">
          {achievements.filter(a => a.unlocked).length} / {achievements.length}
        </span>

      </div>

      {/* Grid */}

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {achievements.map((achievement, index) => {

          const Icon =
            ICONS[achievement.icon] || Trophy;

          return (

            <motion.div
              key={achievement.id}
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
                delay: index * 0.05,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              onClick={() =>
                onAchievementClick?.(achievement)
              }
              className={`
                cursor-pointer
                overflow-hidden
                rounded-[30px]
                border
                bg-white/5
                backdrop-blur-3xl
                ${
                  RARITY[
                    achievement.rarity
                  ] || RARITY.common
                }
              `}
            >

              {/* Top */}

              <div className="relative p-8">

                <div className="flex items-center justify-between">

                  <div
                    className="
                      flex
                      h-20
                      w-20
                      items-center
                      justify-center
                      rounded-full
                      bg-white/10
                    "
                  >

                    <Icon size={40} />

                  </div>

                  {achievement.unlocked ? (
                    <CheckCircle2
                      size={28}
                      className="text-green-400"
                    />
                  ) : (
                    <Lock
                      size={26}
                      className="text-zinc-500"
                    />
                  )}

                </div>

                <h3 className="mt-8 text-2xl font-black">

                  {achievement.title}

                </h3>

                <p className="mt-3 text-zinc-400">

                  {achievement.description}

                </p>

              </div>

              {/* Progress */}

              <div className="px-8">

                <div className="mb-2 flex justify-between text-sm">

                  <span>
                    {achievement.progress}
                  </span>

                  <span>
                    {achievement.target}
                  </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/10">

                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    whileInView={{
                      width: `${
                        Math.min(
                          (achievement.progress /
                            achievement.target) *
                            100,
                          100
                        )
                      }%`,
                    }}
                    transition={{
                      duration: 1,
                    }}
                    className="h-full rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-500"
                  />

                </div>

              </div>

              {/* Footer */}

              <div className="mt-8 flex items-center justify-between border-t border-white/10 p-6">

                <span className="capitalize font-semibold">
                  {achievement.rarity}
                </span>

                {achievement.unlocked && (
                  <span className="rounded-full bg-green-500/20 px-4 py-2 text-sm text-green-400">
                    Unlocked
                  </span>
                )}

              </div>

            </motion.div>

          );

        })}

      </div>

    </section>
  );
}