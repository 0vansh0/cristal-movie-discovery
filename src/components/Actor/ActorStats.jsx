import { motion } from "framer-motion";
import {
  Star,
  Film,
  Tv,
  TrendingUp,
  Calendar,
  Award,
} from "lucide-react";

export default function ActorStats({
  actor,
  movieCredits = [],
  tvCredits = [],
}) {
  if (!actor) return null;

  const totalMovies = movieCredits.length;
  const totalTV = tvCredits.length;

  const avgMovieRating =
    totalMovies > 0
      ? (
          movieCredits.reduce(
            (sum, movie) =>
              sum + (movie.vote_average || 0),
            0
          ) / totalMovies
        ).toFixed(1)
      : "0.0";

  const currentYear = new Date().getFullYear();

  const allCredits = [
    ...movieCredits,
    ...tvCredits,
  ];

  const earliestCreditYear = allCredits
    .map((item) =>
      item.release_date || item.first_air_date
    )
    .filter(Boolean)
    .map((date) => new Date(date).getFullYear())
    .reduce(
      (min, year) => Math.min(min, year),
      Infinity
    );

  const careerYears =
    earliestCreditYear !== Infinity
      ? Math.max(1, currentYear - earliestCreditYear)
      : "--";

  const careerSpan =
    careerYears === "--"
      ? "--"
      : `${careerYears} yr${careerYears === 1 ? "" : "s"}`;

  const stats = [
    {
      title: "Popularity",
      value: Math.round(actor.popularity || 0),
      icon: <TrendingUp size={26} />,
      color: "#FFD464",
    },
    {
      title: "Movies",
      value: totalMovies,
      icon: <Film size={26} />,
      color: "#38BDF8",
    },
    {
      title: "TV Shows",
      value: totalTV,
      icon: <Tv size={26} />,
      color: "#A855F7",
    },
    {
      title: "Average Rating",
      value: avgMovieRating,
      icon: <Star size={26} />,
      color: "#FACC15",
    },
    {
      title: "Career Span",
      value: careerSpan,
      icon: <Calendar size={26} />,
      color: "#22C55E",
    },
    {
      title: "Known For",
      value: actor.known_for_department,
      icon: <Award size={26} />,
      color: "#F97316",
    },
  ];

  return (
    <section className="space-y-8">

      {/* Header */}

      <div>

        <h2 className="text-4xl font-black">
          Career Statistics
        </h2>

        <p className="mt-2 text-zinc-400">
          Performance overview and career insights
        </p>

      </div>

      {/* Grid */}

      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
          xl:grid-cols-3
        "
      >

        {stats.map((stat, index) => (

          <motion.div
            key={stat.title}
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
              delay: index * 0.08,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="
              relative
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-white/5
              p-7
              backdrop-blur-3xl
            "
          >

            {/* Glow */}

            <div
              className="
                absolute
                -right-10
                -top-10
                h-40
                w-40
                rounded-full
                blur-3xl
                opacity-20
              "
              style={{
                background: stat.color,
              }}
            />

            {/* Icon */}

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
              "
              style={{
                background:
                  `${stat.color}20`,
                color: stat.color,
              }}
            >
              {stat.icon}
            </div>

            {/* Title */}

            <p className="mt-6 text-sm text-zinc-400">
              {stat.title}
            </p>

            {/* Value */}

            <motion.h3
              initial={{
                scale: 0.9,
              }}
              whileInView={{
                scale: 1,
              }}
              transition={{
                duration: 0.4,
              }}
              className="
                mt-2
                break-words
                text-4xl
                font-black
              "
            >
              {stat.value}
            </motion.h3>

          </motion.div>

        ))}

      </div>

      {/* Popularity Progress */}

      <motion.div
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
        className="
          rounded-[36px]
          border
          border-white/10
          bg-white/5
          p-8
          backdrop-blur-3xl
        "
      >

        <div className="mb-6 flex items-center justify-between">

          <h3 className="text-2xl font-bold">
            Popularity Score
          </h3>

          <span className="text-[#FFD464] font-bold">
            {Math.round(actor.popularity || 0)}
          </span>

        </div>

        <div
          className="
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
              width: `${Math.min(
                actor.popularity || 0,
                100
              )}%`,
            }}
            transition={{
              duration: 1.5,
            }}
            className="
              h-full
              rounded-full
              bg-gradient-to-r
              from-yellow-400
              via-orange-400
              to-red-500
            "
          />

        </div>

      </motion.div>

    </section>
  );
}