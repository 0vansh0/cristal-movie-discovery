import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  Film,
  TrendingUp,
  Calendar,
  Clock3,
  Award,
  Clapperboard,
} from "lucide-react";

export default function ActorFacts({
  actor,
  movieCredits = [],
  tvCredits = [],
}) {
  if (!actor) return null;

  const movies = [...movieCredits];
  const tv = [...tvCredits];

  const highestRated = [...movies]
    .sort(
      (a, b) =>
        (b.vote_average || 0) -
        (a.vote_average || 0)
    )[0];

  const mostPopular = [...movies, ...tv]
    .sort(
      (a, b) =>
        (b.popularity || 0) -
        (a.popularity || 0)
    )[0];

  const firstMovie = [...movies]
    .sort(
      (a, b) =>
        new Date(a.release_date || 0) -
        new Date(b.release_date || 0)
    )[0];

  const latestMovie = [...movies]
    .sort(
      (a, b) =>
        new Date(b.release_date || 0) -
        new Date(a.release_date || 0)
    )[0];

  const totalProjects =
    movies.length + tv.length;

  const careerLength =
    firstMovie?.release_date
      ? new Date().getFullYear() -
        new Date(
          firstMovie.release_date
        ).getFullYear()
      : "--";

  const facts = [
    {
      title: "Highest Rated Movie",
      value:
        highestRated?.title ||
        "Unavailable",
      subtitle: highestRated
        ? `⭐ ${highestRated.vote_average.toFixed(
            1
          )}`
        : "",
      icon: <Star size={24} />,
      color: "#FFD464",
    },
    {
      title: "Most Popular Project",
      value:
        mostPopular?.title ||
        mostPopular?.name ||
        "Unavailable",
      subtitle: mostPopular
        ? `${Math.round(
            mostPopular.popularity
          )} popularity`
        : "",
      icon: <TrendingUp size={24} />,
      color: "#3B82F6",
    },
    {
      title: "First Movie",
      value:
        firstMovie?.title ||
        "Unavailable",
      subtitle:
        firstMovie?.release_date ||
        "",
      icon: <Film size={24} />,
      color: "#10B981",
    },
    {
      title: "Latest Movie",
      value:
        latestMovie?.title ||
        "Unavailable",
      subtitle:
        latestMovie?.release_date ||
        "",
      icon: <Clock3 size={24} />,
      color: "#EC4899",
    },
    {
      title: "Career Length",
      value: `${careerLength} Years`,
      subtitle:
        "Based on first release",
      icon: <Calendar size={24} />,
      color: "#8B5CF6",
    },
    {
      title: "Total Projects",
      value: totalProjects,
      subtitle:
        `${movies.length} Movies • ${tv.length} TV`,
      icon: <Clapperboard size={24} />,
      color: "#06B6D4",
    },
  ];

  return (
    <section className="space-y-8">

      {/* Header */}

      <div>

        <h2 className="flex items-center gap-3 text-4xl font-black">

          <Sparkles className="text-[#FFD464]" />

          Did You Know?

        </h2>

        <p className="mt-2 text-zinc-400">
          Interesting facts generated
          from TMDB data
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

        {facts.map(
          (fact, index) => (

            <motion.div
              key={fact.title}
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
                delay:
                  index * 0.08,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
              className="
                relative
                overflow-hidden
                rounded-[30px]
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
                  opacity-20
                  blur-3xl
                "
                style={{
                  background:
                    fact.color,
                }}
              />

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
                    `${fact.color}20`,
                  color:
                    fact.color,
                }}
              >
                {fact.icon}
              </div>

              <p className="mt-6 text-sm text-zinc-400">
                {fact.title}
              </p>

              <h3
                className="
                  mt-2
                  line-clamp-2
                  text-2xl
                  font-black
                "
              >
                {fact.value}
              </h3>

              <p className="mt-3 text-zinc-500">
                {fact.subtitle}
              </p>

            </motion.div>

          )
        )}

      </div>

      {/* Highlight */}

      <motion.div
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
        className="
          rounded-[36px]
          border
          border-[#FFD464]/20
          bg-gradient-to-r
          from-[#FFD464]/10
          to-yellow-400/5
          p-8
        "
      >

        <div className="flex items-center gap-5">

          <div
            className="
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-full
              bg-[#FFD464]/20
            "
          >

            <Award className="text-[#FFD464]" />

          </div>

          <div>

            <h3 className="text-2xl font-bold">
              Career Highlight
            </h3>

            <p className="mt-2 text-zinc-300 leading-7">
              {actor.name} has appeared
              in{" "}
              <span className="font-bold text-[#FFD464]">
                {totalProjects}
              </span>{" "}
              projects with a career
              spanning approximately{" "}
              <span className="font-bold text-[#FFD464]">
                {careerLength}
              </span>{" "}
              years.
            </p>

          </div>

        </div>

      </motion.div>

    </section>
  );
}