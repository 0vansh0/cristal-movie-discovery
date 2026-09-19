import { motion } from "framer-motion";
import {
  Star,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";

export default function MovieRating({ movie }) {
  if (!movie) return null;

  const score = Math.round((movie.vote_average || 0) * 10);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset =
    circumference - (score / 100) * circumference;

  return (
    <>
      <motion.section
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
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
      <div className="flex flex-wrap items-center gap-10">

        {/* Circular Rating */}

        <div className="relative flex h-36 w-36 items-center justify-center">
            <motion.div
  animate={{
    scale: [1, 1.12, 1],
    opacity: [0.3, 0.6, 0.3],
  }}
  transition={{
    repeat: Infinity,
    duration: 5,
  }}
  className="
    absolute
    h-36
    w-36
    rounded-full
    bg-[#FFD464]/20
    blur-3xl
  "
/>

          <svg
            className="-rotate-90"
            width="140"
            height="140"
          >
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="rgba(255,255,255,.08)"
              strokeWidth="10"
              fill="none"
            />

            <motion.circle
              cx="70"
              cy="70"
              r={radius}
              stroke={
                score >= 80
                    ? "#22c55e"
                    : score >= 60
                    ? "#FFD464"
                    : "#ef4444"
            }
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{
                strokeDashoffset: circumference,
              }}
              whileInView={{
                strokeDashoffset: offset,
              }}
              transition={{
                duration: 1.6,
              }}
            />
          </svg>

          <div className="absolute text-center">

            <div
  className={`text-4xl font-black ${
    score >= 80
      ? "text-green-400"
      : score >= 60
      ? "text-[#FFD464]"
      : "text-red-400"
  }`}
>
              {score}%
            </div>

            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-zinc-400">
              User Score
            </p>

          </div>
          <p className="mt-2 text-sm text-zinc-500">

  {score >= 90 && "Outstanding"}
  {score >= 80 && score < 90 && "Excellent"}
  {score >= 70 && score < 80 && "Very Good"}
  {score >= 60 && score < 70 && "Good"}
  {score >= 50 && score < 60 && "Average"}
  {score < 50 && "Needs Improvement"}

</p>

        </div>

        {/* Rating Details */}

        <div className="flex-1">

          <h3 className="mb-6 text-3xl font-black">
            Ratings
          </h3>

          <div className="grid gap-5 sm:grid-cols-2">

            <StatCard
              icon={<Star size={20} />}
              title="TMDB"
              value={movie.vote_average?.toFixed(1) || "--"}
              color="text-yellow-400"
            />

            <StatCard
              icon={<TrendingUp size={20} />}
              title="Popularity"
              value={Math.round(movie.popularity || 0)}
              color="text-emerald-400"
            />

            <StatCard
              icon={<Users size={20} />}
              title="Votes"
              value={(movie.vote_count || 0).toLocaleString()}
              color="text-sky-400"
            />

            <StatCard
              icon={<Award size={20} />}
              title="Status"
              value={movie.status || "Released"}
              color="text-violet-400"
            />

          </div>

        </div>

      </div>
      </motion.section>

      {/* Rating Breakdown */}

      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.25,
        }}
        className="mt-10 grid gap-6 lg:grid-cols-3"
      >
        {/* Premium Analytics */}

<motion.div
  initial={{
    opacity: 0,
    y: 40,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    delay: 0.35,
  }}
  className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4"
>

  <AnalyticsCard
    title="Community"
    value={`${Math.round(score)}%`}
    subtitle="Positive Reviews"
    color="from-emerald-400 to-green-500"
  />

  <AnalyticsCard
    title="Critics"
    value={`${Math.min(
      100,
      Math.round((movie.vote_average || 0) * 9.5)
    )}%`}
    subtitle="Average Score"
    color="from-sky-400 to-cyan-500"
  />

  <AnalyticsCard
    title="Engagement"
    value={movie.vote_count?.toLocaleString() || "0"}
    subtitle="Total Ratings"
    color="from-yellow-400 to-orange-500"
  />

  <AnalyticsCard
    title="Popularity"
    value={Math.round(movie.popularity || 0)}
    subtitle="Current Trend"
    color="from-pink-500 to-red-500"
  />

</motion.div>

        <RatingBar
          title="IMDb"
          value={movie.vote_average || 0}
          max={10}
          color="from-yellow-400 to-yellow-500"
        />

        <RatingBar
          title="Audience Score"
          value={score}
          max={100}
          color="from-emerald-400 to-green-500"
        />

        <RatingBar
          title="Popularity"
          value={Math.min(
            Math.round(movie.popularity || 0),
            100
          )}
          max={100}
          color="from-sky-400 to-cyan-500"
        />

      </motion.div>

    </>
  );
}

function StatCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className="
        rounded-2xl
        border
        border-white/10
        bg-black/30
        p-5
        backdrop-blur-xl
      "
    >
      <div className={`mb-3 ${color}`}>
        {icon}
      </div>

      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <h4 className="mt-1 text-xl font-bold">
        {value}
      </h4>
    </motion.div>
  );
}

function AnalyticsCard({
  title,
  value,
  subtitle,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.03,
      }}
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-3xl
      "
    >
      <motion.div
        animate={{
          opacity: [0.25, 0.5, 0.25],
          scale: [1, 1.08, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className={`
          absolute
          -right-10
          -top-10
          h-36
          w-36
          rounded-full
          bg-gradient-to-r
          ${color}
          blur-3xl
        `}
      />

      <div className="relative z-10">

        <p className="text-sm text-zinc-400">{title}</p>

        <h3 className="mt-3 text-4xl font-black">{value}</h3>

        <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>

      </div>

    </motion.div>
  );
}
function RatingBar({
  title,
  value,
  max,
  color,
}) {

  const percentage = (value / max) * 100;

  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="
        rounded-3xl
        border
        border-white/10
        bg-black/30
        p-6
        backdrop-blur-xl
      "
    >

      <div className="mb-4 flex items-center justify-between">

        <h4 className="font-semibold">
          {title}
        </h4>

        <span className="font-bold text-[#FFD464]">
          {value}
          {max === 10 ? "/10" : "%"}
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-white/10">

        <motion.div
          initial={{
            width: 0,
          }}
          whileInView={{
            width: `${percentage}%`,
          }}
          transition={{
            duration: 1.2,
          }}
          className={`
            h-full
            rounded-full
            bg-gradient-to-r
            ${color}
          `}
        />

      </div>

      <p className="mt-4 text-sm text-zinc-400">
        {getRatingLabel(percentage)}
      </p>

    </motion.div>
  );
}

function getRatingLabel(score) {

  if (score >= 90) return "Outstanding";
  if (score >= 80) return "Excellent";
  if (score >= 70) return "Great";
  if (score >= 60) return "Good";
  if (score >= 50) return "Average";
  if (score >= 40) return "Below Average";

  return "Poor";

}
