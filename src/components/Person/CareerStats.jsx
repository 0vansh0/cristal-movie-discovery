import { motion } from "framer-motion";
import {
  Clapperboard,
  Film,
  PenSquare,
  Briefcase,
  Star,
  TrendingUp,
  Calendar,
  Trophy,
} from "lucide-react";

/* =========================================================
   HELPERS
========================================================= */

function getTitle(item) {
  return (
    item?.title ||
    item?.name ||
    "Untitled"
  );
}

function getReleaseDate(item) {
  return (
    item?.release_date ||
    item?.first_air_date ||
    null
  );
}

function getYear(item) {
  const date = getReleaseDate(item);

  if (!date) return null;

  const year = new Date(date).getFullYear();

  return Number.isNaN(year)
    ? null
    : year;
}

function hasValidRating(item) {
  return (
    typeof item?.vote_average === "number" &&
    item.vote_average > 0
  );
}

function isDirector(credit) {
  return (
    credit?.job === "Director" ||
    credit?.job?.toLowerCase().includes("director")
  );
}

function isWriter(credit) {
  const job = credit?.job?.toLowerCase() || "";

  return (
    job.includes("writer") ||
    job.includes("screenplay") ||
    job.includes("story") ||
    job.includes("creator")
  );
}

function isProducer(credit) {
  const job = credit?.job?.toLowerCase() || "";

  return (
    job.includes("producer") &&
    !job.includes("co-producer") &&
    !job.includes("associate")
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function CareerStats({
  person,
  credits = [],
}) {
  if (!person) {
    return null;
  }

  const safeCredits = Array.isArray(credits)
    ? credits.filter(Boolean)
    : [];

  /* =======================================================
     CREDIT GROUPS
  ======================================================= */

  const actingCredits = safeCredits.filter(
    (credit) => {
      const department =
        credit?.known_for_department;

      const character =
        credit?.character;

      return (
        department === "Acting" ||
        Boolean(character)
      );
    }
  );

  const directingCredits =
    safeCredits.filter(isDirector);

  const writingCredits =
    safeCredits.filter(isWriter);

  const producingCredits =
    safeCredits.filter(isProducer);

  /* =======================================================
     RATINGS
  ======================================================= */

  const ratedCredits =
    safeCredits.filter(hasValidRating);

  const averageRating =
    ratedCredits.length > 0
      ? (
          ratedCredits.reduce(
            (total, credit) =>
              total +
              Number(
                credit.vote_average
              ),
            0
          ) / ratedCredits.length
        ).toFixed(1)
      : "N/A";

  const highestRated =
    [...ratedCredits].sort(
      (a, b) =>
        Number(b.vote_average) -
        Number(a.vote_average)
    )[0] || null;

  /* =======================================================
     CAREER DATES
  ======================================================= */

  const datedCredits =
    safeCredits
      .map((credit) => ({
        credit,
        date: getReleaseDate(credit),
      }))
      .filter(
        ({ date }) =>
          date &&
          !Number.isNaN(
            new Date(date).getTime()
          )
      )
      .sort(
        (a, b) =>
          new Date(a.date) -
          new Date(b.date)
      );

  const firstProject =
    datedCredits[0]?.credit || null;

  const lastProject =
    datedCredits[
      datedCredits.length - 1
    ]?.credit || null;

  const firstYear =
    getYear(firstProject);

  const lastYear =
    getYear(lastProject);

  const careerYears =
    firstYear && lastYear
      ? Math.max(
          0,
          lastYear - firstYear
        )
      : null;

  /* =======================================================
     POPULARITY
  ======================================================= */

  const popularity =
    Number(person.popularity) || 0;

  /*
   * TMDB popularity is not a percentage.
   * We normalize it visually so extremely high
   * values don't break the progress bar.
   */

  const popularityProgress =
    Math.min(
      100,
      Math.max(
        4,
        Math.log10(
          popularity + 1
        ) * 38
      )
    );

  /* =======================================================
     TOP RATED TITLE
  ======================================================= */

  const topRatedTitle =
    highestRated
      ? getTitle(highestRated)
      : "N/A";

  const topRatedYear =
    highestRated
      ? getYear(highestRated)
      : null;

  /* =======================================================
     STATS
  ======================================================= */

  const stats = [
    {
      icon: <Film size={24} />,
      title: "Projects",
      value: safeCredits.length,
      description:
        "Credits across film & television",
      color: "#FFD464",
    },

    {
      icon: <Clapperboard size={24} />,
      title: "Directed",
      value: directingCredits.length,
      description:
        "Directing credits",
      color: "#60A5FA",
    },

    {
      icon: <PenSquare size={24} />,
      title: "Written",
      value: writingCredits.length,
      description:
        "Writing & screenplay credits",
      color: "#34D399",
    },

    {
      icon: <Briefcase size={24} />,
      title: "Produced",
      value: producingCredits.length,
      description:
        "Producer credits",
      color: "#EC4899",
    },

    {
      icon: <Star size={24} />,
      title: "Average Rating",
      value: averageRating,
      description:
        ratedCredits.length > 0
          ? `${ratedCredits.length} rated projects`
          : "No rated projects",
      color: "#F59E0B",
    },

    {
      icon: <TrendingUp size={24} />,
      title: "Popularity",
      value:
        popularity > 0
          ? popularity.toFixed(1)
          : "N/A",
      description:
        "TMDB popularity score",
      color: "#8B5CF6",
    },

    {
      icon: <Calendar size={24} />,
      title: "Career Span",
      value:
        careerYears !== null
          ? `${careerYears} yrs`
          : "N/A",
      description:
        firstYear && lastYear
          ? `${firstYear} — ${lastYear}`
          : "Career dates unavailable",
      color: "#22C55E",
    },

    {
      icon: <Trophy size={24} />,
      title: "Top Rated",
      value: topRatedTitle,
      description:
        highestRated
          ? `${Number(
              highestRated.vote_average
            ).toFixed(1)}/10${
              topRatedYear
                ? ` • ${topRatedYear}`
                : ""
            }`
          : "No rating available",
      color: "#F97316",
      largeValue: true,
    },
  ];

  return (
    <section className="space-y-10">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>

        <span
          className="
            text-xs
            font-bold
            uppercase
            tracking-[0.25em]
            text-[#FFD464]
          "
        >
          Career Overview
        </span>

        <h2
          className="
            mt-3
            text-4xl
            font-black
            tracking-tight
          "
        >
          Career Statistics
        </h2>

        <p className="mt-2 text-zinc-400">
          A snapshot of their professional
          career across film and television.
        </p>

      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div
        className="
          grid
          gap-5
          sm:grid-cols-2
          xl:grid-cols-4
        "
      >

        {stats.map(
          (stat, index) => (
            <motion.article
              key={stat.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.45,
                delay: index * 0.05,
              }}
              whileHover={{
                y: -7,
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/10
                bg-white/[0.045]
                p-6
                backdrop-blur-3xl
              "
            >

              {/* Glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-14
                  -top-14
                  h-40
                  w-40
                  rounded-full
                  opacity-20
                  blur-3xl
                  transition-opacity
                  duration-300
                  group-hover:opacity-35
                "
                style={{
                  background:
                    stat.color,
                }}
              />

              {/* Icon */}

              <div
                className="
                  relative
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                "
                style={{
                  background:
                    `${stat.color}18`,
                  color:
                    stat.color,
                }}
              >
                {stat.icon}
              </div>

              {/* Label */}

              <p
                className="
                  mt-6
                  text-sm
                  font-medium
                  text-zinc-400
                "
              >
                {stat.title}
              </p>

              {/* Value */}

              <h3
                className={`
                  mt-2
                  font-black
                  leading-tight
                  ${
                    stat.largeValue
                      ? "line-clamp-2 text-xl"
                      : "text-3xl"
                  }
                `}
                title={
                  typeof stat.value ===
                  "string"
                    ? stat.value
                    : undefined
                }
              >
                {stat.value}
              </h3>

              {/* Description */}

              <p
                className="
                  mt-3
                  text-xs
                  leading-5
                  text-zinc-500
                "
              >
                {stat.description}
              </p>

            </motion.article>
          )
        )}

      </div>

      {/* =====================================================
          CAREER TIMELINE
      ===================================================== */}

      {firstYear && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
            rounded-[34px]
            border
            border-white/10
            bg-white/[0.045]
            p-7
            sm:p-8
          "
        >

          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div>

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-zinc-500
                "
              >
                Career Timeline
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                {firstYear}
                {lastYear
                  ? ` — ${lastYear}`
                  : ""}
              </h3>

            </div>

            <div className="text-left sm:text-right">

              <p className="text-sm text-zinc-500">
                Active projects
              </p>

              <p className="mt-1 text-xl font-bold text-[#FFD464]">
                {safeCredits.length}
              </p>

            </div>

          </div>

          {/* Timeline */}

          <div className="mt-8">

            <div className="relative h-2 rounded-full bg-white/10">

              <motion.div
                initial={{
                  width: 0,
                }}
                whileInView={{
                  width: "100%",
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                }}
                className="
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  from-[#FFD464]
                  via-orange-400
                  to-red-500
                "
              />

            </div>

            <div
              className="
                mt-3
                flex
                justify-between
                text-xs
                text-zinc-500
              "
            >
              <span>
                {firstYear}
              </span>

              <span>
                {lastYear || "Present"}
              </span>
            </div>

          </div>

        </motion.div>
      )}

      {/* =====================================================
          POPULARITY
      ===================================================== */}

      {popularity > 0 && (
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          whileHover={{
            scale: 1.005,
          }}
          className="
            relative
            overflow-hidden
            rounded-[34px]
            border
            border-white/10
            bg-white/[0.045]
            p-7
            sm:p-8
          "
        >

          {/* Glow */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              bg-purple-500/10
              blur-[100px]
            "
          />

          <div
            className="
              relative
              mb-5
              flex
              items-center
              justify-between
              gap-4
            "
          >

            <div>

              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-zinc-500
                "
              >
                TMDB Metric
              </p>

              <h3 className="mt-2 text-2xl font-bold">
                Popularity Score
              </h3>

            </div>

            <span
              className="
                rounded-full
                border
                border-[#FFD464]/20
                bg-[#FFD464]/10
                px-4
                py-2
                font-bold
                text-[#FFD464]
              "
            >
              {popularity.toFixed(1)}
            </span>

          </div>

          {/* Progress */}

          <div
            className="
              relative
              h-3
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
                width: `${popularityProgress}%`,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.3,
                ease: "easeOut",
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

          <p className="relative mt-4 text-sm text-zinc-500">
            TMDB popularity is a dynamic score
            and should not be interpreted as a
            percentage.
          </p>

        </motion.div>
      )}

    </section>
  );
}