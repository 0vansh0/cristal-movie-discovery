import { motion } from "framer-motion";
import {
  Trophy,
  Crown,
  Flame,
  Star,
  Sparkles,
  Film,
  Gem,
  ShieldCheck,
} from "lucide-react";

const achievements = [
  {
    id: 1,
    title: "Movie Master",
    icon: Trophy,
    level: "Legendary",
    color: "from-yellow-400 to-orange-500",
    progress: 100,
    description: "Watched 500+ movies",
  },
  {
    id: 2,
    title: "Sci-Fi Explorer",
    icon: Sparkles,
    level: "Epic",
    color: "from-cyan-400 to-blue-500",
    progress: 82,
    description: "Completed 100 Sci-Fi movies",
  },
  {
    id: 3,
    title: "Weekend Binger",
    icon: Flame,
    level: "Rare",
    color: "from-red-500 to-orange-500",
    progress: 65,
    description: "Watch movies every weekend",
  },
  {
    id: 4,
    title: "Top Reviewer",
    icon: Star,
    level: "Epic",
    color: "from-pink-500 to-purple-500",
    progress: 90,
    description: "Received 1000+ likes",
  },
  {
    id: 5,
    title: "Collector",
    icon: Film,
    level: "Rare",
    color: "from-emerald-400 to-green-500",
    progress: 58,
    description: "Added 250 movies to watchlist",
  },
  {
    id: 6,
    title: "Premium Member",
    icon: Crown,
    level: "Legendary",
    color: "from-amber-300 to-yellow-500",
    progress: 100,
    description: "CRISTAL Premium",
  },
  {
    id: 7,
    title: "Diamond Critic",
    icon: Gem,
    level: "Mythic",
    color: "from-violet-500 to-fuchsia-500",
    progress: 42,
    description: "Elite reviewer status",
  },
  {
    id: 8,
    title: "Verified Cinephile",
    icon: ShieldCheck,
    level: "Legendary",
    color: "from-sky-400 to-indigo-500",
    progress: 100,
    description: "Verified movie enthusiast",
  },
];

export default function ProfileAchievements() {
  return (
    <section>

      <div className="mb-8">

        <h2 className="text-3xl font-black">
          Achievements
        </h2>

        <p className="mt-2 text-zinc-400">
          Unlock badges as you continue your movie journey.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {achievements.map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={item.id}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * .08,
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
                backdrop-blur-2xl
                p-6
              "
            >

              {/* Glow */}

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

              {/* Icon */}

              <div
                className={`
                  mb-6
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  ${item.color}
                  text-black
                  shadow-xl
                `}
              >
                <Icon size={30} />
              </div>

              {/* Title */}

              <h3 className="text-xl font-bold">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-zinc-400">
                {item.description}
              </p>

              {/* Level */}

              <div className="mt-5 flex items-center justify-between">

                <span className="rounded-full bg-white/10 px-3 py-1 text-xs">
                  {item.level}
                </span>

                <span className="font-semibold">
                  {item.progress}%
                </span>

              </div>

              {/* Progress */}

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  whileInView={{
                    width: `${item.progress}%`,
                  }}
                  transition={{
                    duration: 1.2,
                  }}
                  className={`
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    ${item.color}
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