import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const data = [
  { month: "Jan", value: 18 },
  { month: "Feb", value: 26 },
  { month: "Mar", value: 34 },
  { month: "Apr", value: 43 },
  { month: "May", value: 57 },
  { month: "Jun", value: 69 },
  { month: "Jul", value: 82 },
  { month: "Aug", value: 96 },
  { month: "Sep", value: 118 },
  { month: "Oct", value: 135 },
  { month: "Nov", value: 156 },
  { month: "Dec", value: 182 },
];

export default function TimelineGrowth() {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <section className="mt-16">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-black">
            Collection Growth
          </h2>

          <p className="mt-2 text-zinc-400">
            Your favorites throughout the year.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2">

          <TrendingUp
            size={18}
            className="text-emerald-400"
          />

          <span className="font-semibold text-emerald-300">
            +182 Movies
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

        <div className="flex h-72 items-end justify-between gap-4">

          {data.map((item, index) => (

            <div
              key={item.month}
              className="group flex flex-1 flex-col items-center"
            >

              <div className="relative flex h-full items-end">

                {/* Tooltip */}

                <div
                  className="
                    absolute
                    -top-12
                    left-1/2
                    -translate-x-1/2
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
                  {item.value} Movies
                </div>

                <motion.div
                  initial={{
                    height: 0,
                  }}
                  whileInView={{
                    height: `${(item.value / max) * 220}px`,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="
                    w-8
                    rounded-t-full
                    bg-gradient-to-t
                    from-emerald-500
                    via-teal-400
                    to-cyan-300
                    shadow-[0_0_20px_rgba(16,185,129,.45)]
                  "
                />

              </div>

              <span className="mt-4 text-sm text-zinc-400">
                {item.month}
              </span>

            </div>

          ))}

        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl bg-white/5 p-5">
            <p className="text-zinc-400">
              First Favorite
            </p>

            <h3 className="mt-2 text-2xl font-black">
              January
            </h3>
          </div>

          <div className="rounded-2xl bg-white/5 p-5">
            <p className="text-zinc-400">
              Fastest Growth
            </p>

            <h3 className="mt-2 text-2xl font-black">
              September
            </h3>
          </div>

          <div className="rounded-2xl bg-white/5 p-5">
            <p className="text-zinc-400">
              Total Added
            </p>

            <h3 className="mt-2 text-2xl font-black">
              182 Movies
            </h3>
          </div>

        </div>

      </div>

    </section>
  );
}