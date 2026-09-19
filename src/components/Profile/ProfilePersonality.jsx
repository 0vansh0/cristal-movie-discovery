import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  Film,
  Moon,
  Clock3,
  Heart,
  Star,
  Wand2,
} from "lucide-react";

const personality = [
  {
    title: "Movie DNA",
    value: "Visionary Explorer",
    icon: Brain,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "Favorite Director",
    value: "Christopher Nolan",
    icon: Film,
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Preferred Mood",
    value: "Mind-Bending Sci-Fi",
    icon: Sparkles,
    color: "from-pink-500 to-red-500",
  },
  {
    title: "Watching Time",
    value: "Late Night",
    icon: Moon,
    color: "from-indigo-500 to-violet-500",
  },
  {
    title: "Average Session",
    value: "2h 37m",
    icon: Clock3,
    color: "from-orange-500 to-yellow-500",
  },
  {
    title: "Favorite Genre",
    value: "Science Fiction",
    icon: Heart,
    color: "from-emerald-500 to-green-500",
  },
];

export default function ProfilePersonality() {
  return (
    <section>

      <div className="mb-10">

        <h2 className="text-3xl font-black">
          Movie Personality
        </h2>

        <p className="mt-2 text-zinc-400">
          AI generated insights based on your watching habits.
        </p>

      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">

        {/* Left */}

        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl">

          <div className="grid gap-5 md:grid-cols-2">

            {personality.map((item, index) => {

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
                    delay: index * .08,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="rounded-3xl border border-white/10 bg-black/20 p-5"
                >

                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color}`}
                  >
                    <Icon
                      size={26}
                      className="text-black"
                    />
                  </div>

                  <p className="text-sm text-zinc-400">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-lg font-bold">
                    {item.value}
                  </h3>

                </motion.div>

              );

            })}

          </div>

        </div>

        {/* Right */}

        <motion.div
          whileHover={{
            scale: 1.02,
          }}
          className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl"
        >

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-gradient-to-r from-[#FF5E5E] to-[#FFD464] p-4">
              <Wand2 className="text-black" />
            </div>

            <div>

              <h3 className="text-2xl font-bold">
                AI Summary
              </h3>

              <p className="text-zinc-400">
                Generated from your activity
              </p>

            </div>

          </div>

          <p className="mt-8 leading-8 text-zinc-300">
            You gravitate toward intelligent science-fiction,
            psychological thrillers and emotionally driven stories.
            Your ratings show a preference for strong storytelling,
            cinematic visuals and memorable soundtracks.
          </p>

          <div className="mt-10 rounded-3xl bg-gradient-to-r from-[#FF5E5E]/10 via-[#FFD464]/10 to-orange-500/10 p-6">

            <div className="flex items-center justify-between">

              <span className="font-semibold">
                Cinephile Score
              </span>

              <span className="text-2xl font-black text-[#FFD464]">
                96%
              </span>

            </div>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">

              <motion.div
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: "96%",
                }}
                transition={{
                  duration: 1.5,
                }}
                className="h-full rounded-full bg-gradient-to-r from-[#FF5E5E] via-[#FF9B5E] to-[#FFD464]"
              />

            </div>

          </div>

          <div className="mt-8 flex gap-3">

            <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm">
              Sci-Fi
            </span>

            <span className="rounded-full bg-pink-500/20 px-4 py-2 text-sm">
              Nolan Fan
            </span>

            <span className="rounded-full bg-yellow-500/20 px-4 py-2 text-sm">
              Critic
            </span>

            <span className="rounded-full bg-violet-500/20 px-4 py-2 text-sm">
              Explorer
            </span>

          </div>

        </motion.div>

      </div>

    </section>
  );
}