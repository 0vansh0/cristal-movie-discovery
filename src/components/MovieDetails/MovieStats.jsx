import { motion } from "framer-motion";
import {
  Star,
  TrendingUp,
  Users,
  Clock3,
  DollarSign,
  Award,
} from "lucide-react";

export default function MovieStats({ movie }) {
  if (!movie) return null;

  const stats = [
    {
      title: "TMDB Rating",
      value: movie.vote_average?.toFixed(1) || "--",
      icon: Star,
      color: "#FFD464",
    },
    {
      title: "Popularity",
      value: Math.round(movie.popularity || 0),
      icon: TrendingUp,
      color: "#60A5FA",
    },
    {
      title: "Votes",
      value: movie.vote_count?.toLocaleString() || "--",
      icon: Users,
      color: "#34D399",
    },
    {
      title: "Runtime",
      value: movie.runtime
        ? `${movie.runtime} min`
        : "--",
      icon: Clock3,
      color: "#FB923C",
    },
    {
      title: "Budget",
      value: movie.budget
        ? `$${(movie.budget / 1_000_000).toFixed(1)}M`
        : "--",
      icon: DollarSign,
      color: "#A78BFA",
    },
    {
      title: "Revenue",
      value: movie.revenue
        ? `$${(movie.revenue / 1_000_000).toFixed(1)}M`
        : "--",
      icon: Award,
      color: "#F472B6",
    },
  ];

  return (
    <motion.section
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
        duration: 0.8,
      }}
      className="
        rounded-[36px]
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-3xl
      "
    >
      {/* Header */}

      <div className="mb-10">

        <h2 className="text-3xl font-black">
          Movie Statistics
        </h2>

        <p className="mt-2 text-zinc-400">
          Ratings, popularity and financial insights
        </p>

      </div>

      {/* Hero Rating */}

      <motion.div
        whileHover={{
          scale: 1.02,
        }}
        className="
          mb-10
          overflow-hidden
          rounded-[32px]
          border
          border-[#FFD464]/20
          bg-gradient-to-r
          from-[#FFD464]/15
          via-orange-500/10
          to-transparent
          p-8
        "
      >
        <div className="flex flex-wrap items-center justify-between gap-8">

          <div>

            <p className="text-zinc-400">
              Community Score
            </p>

            <h1 className="mt-3 text-6xl font-black text-[#FFD464]">
              {movie.vote_average?.toFixed(1) || "--"}
            </h1>

            <p className="mt-3 text-zinc-300">
              Based on {movie.vote_count?.toLocaleString() || 0} votes
            </p>

          </div>

          <CircularRating
            value={movie.vote_average || 0}
          />

        </div>

      </motion.div>

      {/* Stats Grid */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">

        {stats.map((stat, index) => {

          const Icon = stat.icon;

          return (

            <motion.div
              key={stat.title}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.06,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="
                rounded-[28px]
                border
                border-white/10
                bg-black/30
                p-6
                backdrop-blur-xl
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-zinc-400">
                    {stat.title}
                  </p>

                  <h3 className="mt-4 text-3xl font-bold">
                    {stat.value}
                  </h3>

                </div>

                <div
                  className="rounded-2xl p-4"
                  style={{
                    background: `${stat.color}20`,
                    color: stat.color,
                  }}
                >
                  <Icon size={28} />
                </div>

              </div>

            </motion.div>

          );

        })}

      </div>
    </motion.section>
  );
}

function CircularRating({ value }) {
  const percentage = (value / 10) * 100;
  const radius = 65;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  const progress =
    circumference - (percentage / 100) * circumference;

  return (
    <div className="relative h-40 w-40">

      <svg
        width="160"
        height="160"
        className="-rotate-90"
      >

        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="rgba(255,255,255,.1)"
          strokeWidth={stroke}
          fill="transparent"
        />

        <motion.circle
          initial={{
            strokeDashoffset: circumference,
          }}
          whileInView={{
            strokeDashoffset: progress,
          }}
          transition={{
            duration: 1.5,
          }}
          cx="80"
          cy="80"
          r={radius}
          stroke="#FFD464"
          strokeWidth={stroke}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
        />

      </svg>

      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
        "
      >
        <span className="text-3xl font-black">
          {value.toFixed(1)}
        </span>
      </div>

    </div>
  );
}