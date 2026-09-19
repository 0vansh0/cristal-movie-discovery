import { motion } from "framer-motion";
import { CalendarDays, Flame } from "lucide-react";

const days = [
  { day: "Mon", movies: 2 },
  { day: "Tue", movies: 5 },
  { day: "Wed", movies: 3 },
  { day: "Thu", movies: 7 },
  { day: "Fri", movies: 4 },
  { day: "Sat", movies: 9 },
  { day: "Sun", movies: 6 },
];

export default function WeeklyActivity() {
  const max = Math.max(...days.map((d) => d.movies));

  return (
    <section className="mt-16">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black">
            Weekly Activity
          </h2>

          <p className="mt-2 text-zinc-400">
            Your movie watching habits this week.
          </p>

        </div>

        <div className="flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2">

          <Flame className="text-orange-400" size={18} />

          <span className="text-sm font-semibold text-orange-300">
            31 Day Streak
          </span>

        </div>

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

        <div className="flex h-72 items-end justify-between gap-5">

          {days.map((item, index) => (

            <motion.div
              key={item.day}
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
              className="flex flex-1 flex-col items-center"
            >

              <motion.div
                whileHover={{
                  scale: 1.08,
                }}
                className="group relative flex w-full justify-center"
              >

                {/* Tooltip */}

                <div
                  className="
                    absolute
                    -top-14
                    rounded-xl
                    bg-black/90
                    px-3
                    py-2
                    text-sm
                    opacity-0
                    transition
                    group-hover:opacity-100
                  "
                >
                  {item.movies} Movies
                </div>

                {/* Bar */}

                <motion.div
                  initial={{
                    height: 0,
                  }}
                  whileInView={{
                    height: `${(item.movies / max) * 220}px`,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                  }}
                  className="
                    w-12
                    rounded-t-3xl
                    bg-gradient-to-t
                    from-[#FF5E5E]
                    via-[#FFB84D]
                    to-[#FFD464]
                    shadow-[0_0_25px_rgba(255,180,77,.45)]
                  "
                />

              </motion.div>

              <span className="mt-5 font-semibold text-zinc-300">
                {item.day}
              </span>

            </motion.div>

          ))}

        </div>

        {/* Summary */}

        <div className="mt-10 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl bg-white/5 p-5">
            <p className="text-zinc-400">Movies This Week</p>
            <h3 className="mt-2 text-3xl font-black">36</h3>
          </div>

          <div className="rounded-2xl bg-white/5 p-5">
            <p className="text-zinc-400">Best Day</p>
            <h3 className="mt-2 text-3xl font-black">Saturday</h3>
          </div>

          <div className="rounded-2xl bg-white/5 p-5">
            <p className="text-zinc-400">Average / Day</p>
            <h3 className="mt-2 text-3xl font-black">5.1</h3>
          </div>

        </div>

      </div>

    </section>
  );
}