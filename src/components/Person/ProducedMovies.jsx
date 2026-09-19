import { motion } from "framer-motion";
import {
  Briefcase,
  Star,
  Calendar,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";

const POSTER = "https://image.tmdb.org/t/p/w500";

export default function ProducedMovies({
  credits = [],
  onMovieClick,
}) {
  const produced = credits
    .filter(
      (item) =>
        item.media_type === "movie" &&
        [
          "Producer",
          "Executive Producer",
          "Co-Producer",
          "Associate Producer",
        ].includes(item.job)
    )
    .sort(
      (a, b) =>
        new Date(b.release_date || 0) -
        new Date(a.release_date || 0)
    );

  if (!produced.length) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="flex items-center gap-3 text-4xl font-black">

            <Briefcase
              size={34}
              className="text-pink-400"
            />

            Produced Movies

          </h2>

          <p className="mt-2 text-zinc-400">
            Production credits throughout the career
          </p>

        </div>

        <div
          className="
            rounded-full
            bg-pink-500/15
            px-5
            py-2
            font-bold
            text-pink-400
          "
        >
          {produced.length} Productions
        </div>

      </div>

      {/* Movies */}

      <div
        className="
          flex
          gap-7
          overflow-x-auto
          pb-4
          scrollbar-hide
        "
      >

        {produced.map((movie) => (

          <motion.div
            key={movie.id}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            transition={{
              type: "spring",
              stiffness: 220,
            }}
            onClick={() =>
              onMovieClick?.(movie.id)
            }
            className="
              group
              min-w-[270px]
              cursor-pointer
            "
          >

            {/* Poster */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[28px]
              "
            >

              <img
                src={
                  movie.poster_path
                    ? POSTER +
                      movie.poster_path
                    : "/poster.png"
                }
                alt={movie.title}
                className="
                  aspect-[2/3]
                  w-full
                  object-cover
                  duration-500
                  group-hover:scale-110
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black
                  via-black/30
                  to-transparent
                "
              />

              {/* Producer Badge */}

              <div
                className="
                  absolute
                  left-4
                  top-4
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-pink-500
                  px-3
                  py-2
                  text-sm
                  font-bold
                "
              >
                <BadgeCheck size={15} />
                {movie.job}
              </div>

              {/* Rating */}

              <div
                className="
                  absolute
                  bottom-4
                  left-4
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-black/60
                  px-3
                  py-2
                  backdrop-blur-xl
                "
              >
                <Star
                  size={15}
                  className="text-yellow-400"
                />

                {movie.vote_average.toFixed(1)}
              </div>

            </div>

            {/* Info */}

            <div className="mt-5">

              <h3 className="line-clamp-1 text-2xl font-black">
                {movie.title}
              </h3>

              <div
                className="
                  mt-3
                  flex
                  items-center
                  justify-between
                "
              >

                <span
                  className="
                    flex
                    items-center
                    gap-2
                    text-zinc-400
                  "
                >
                  <Calendar size={16} />
                  {movie.release_date?.slice(0,4)}
                </span>

                <ArrowRight
                  className="
                    duration-300
                    group-hover:translate-x-2
                  "
                />

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}