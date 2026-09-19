import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock3,
  Film,
  Trophy,
  Flame,
} from "lucide-react";

const stats = [
  {
    title: "Completed",
    value: "188",
    subtitle: "Movies Finished",
    icon: CheckCircle2,
    color: "from-emerald-500 to-green-400",
  },
  {
    title: "Remaining",
    value: "88",
    subtitle: "Still Watching",
    icon: Film,
    color: "from-blue-500 to-cyan-400",
  },
  {
    title: "Watch Time",
    value: "712h",
    subtitle: "Total Hours",
    icon: Clock3,
    color: "from-orange-500 to-yellow-400",
  },
  {
    title: "Watching Streak",
    value: "31",
    subtitle: "Days",
    icon: Flame,
    color: "from-pink-500 to-red-500",
  },
];

export default function WatchlistProgress() {
  const progress = 68;

  return (
    <section className="mt-20">

      <div className="mb-10">

        <h2 className="text-3xl font-black">
          Watchlist Progress
        </h2>

        <p className="mt-2 text-zinc-400">
          Your cinematic journey at a glance.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">

        {/* Circular Progress */}

        <motion.div
          whileHover={{ y: -8 }}
          className="
            rounded-[32px]
            border
            border-white/10
            bg-white/5
            p-8
            backdrop-blur-2xl
          "
        >

          <div className="flex justify-center">

            <div className="relative h-64 w-64">

              <svg
                className="absolute inset-0 -rotate-90"
                width="256"
                height="256"
              >

                <circle
                  cx="128"
                  cy="128"
                  r="108"
                  stroke="rgba(255,255,255,.08)"
                  strokeWidth="16"
                  fill="none"
                />

                <motion.circle
                  cx="128"
                  cy="128"
                  r="108"
                  stroke="url(#gradient)"
                  strokeWidth="16"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray={678}
                  initial={{
                    strokeDashoffset: 678,
                  }}
                  whileInView={{
                    strokeDashoffset:
                      678 - (678 * progress) / 100,
                  }}
                  transition={{
                    duration: 2,
                  }}
                />

                <defs>
                  <linearGradient
                    id="gradient"
                    x1="0%"
                    x2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#FF5E5E"
                    />
                    <stop
                      offset="50%"
                      stopColor="#FFB84D"
                    />
                    <stop
                      offset="100%"
                      stopColor="#FFD464"
                    />
                  </linearGradient>
                </defs>

              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <h1 className="text-6xl font-black">
                  {progress}%
                </h1>

                <p className="mt-2 text-zinc-400">
                  Completed
                </p>

              </div>

            </div>

          </div>

          <div className="mt-10 flex items-center justify-center gap-3 rounded-2xl bg-white/5 p-4">

            <Trophy className="text-yellow-400" />

            <span>
              You're ahead of 84% of users.
            </span>

          </div>

        </motion.div>

        {/* Stats */}

        <div className="grid gap-6 sm:grid-cols-2">

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
                  scale: 1.03,
                }}
                className="
                  rounded-[28px]
                  border
                  border-white/10
                  bg-white/5
                  p-7
                  backdrop-blur-2xl
                "
              >

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
                  `}
                >
                  <Icon
                    size={28}
                    className="text-black"
                  />
                </div>

                <h3 className="mt-7 text-zinc-400">
                  {item.title}
                </h3>

                <h1 className="mt-2 text-5xl font-black">
                  {item.value}
                </h1>

                <p className="mt-2 text-zinc-500">
                  {item.subtitle}
                </p>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}