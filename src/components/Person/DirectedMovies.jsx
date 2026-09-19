import { motion } from "framer-motion";
import {
  Clapperboard,
  Star,
  Calendar,
  ArrowRight,
} from "lucide-react";

const POSTER = "https://image.tmdb.org/t/p/w500";

export default function DirectedMovies({
  credits = [],
  onMovieClick,
}) {
  const directed = credits
    .filter(
      (item) =>
        item.job === "Director" &&
        item.media_type === "movie"
    )
    .sort(
      (a, b) =>
        new Date(
          b.release_date || 0
        ) -
        new Date(
          a.release_date || 0
        )
    );

  if (!directed.length) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="flex items-center gap-3 text-4xl font-black">

            <Clapperboard
              className="text-[#FFD464]"
              size={36}
            />

            Directed Movies

          </h2>

          <p className="mt-2 text-zinc-400">
            Complete directing filmography
          </p>

        </div>

        <div
          className="
            rounded-full
            bg-[#FFD464]/15
            px-5
            py-2
            text-[#FFD464]
            font-bold
          "
        >
          {directed.length} Movies
        </div>

      </div>

      {/* Carousel */}

      <div
        className="
          flex
          gap-7
          overflow-x-auto
          pb-5
          scrollbar-hide
        "
      >

        {directed.map((movie) => (

          <motion.div
            key={movie.id}
            whileHover={{
              y: -10,
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
                  via-black/20
                  to-transparent
                "
              />

              {/* Rating */}

              <div
                className="
                  absolute
                  left-4
                  top-4
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

                <span className="font-bold">

                  {movie.vote_average.toFixed(
                    1
                  )}

                </span>

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

                  {movie.release_date?.slice(
                    0,
                    4
                  )}

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