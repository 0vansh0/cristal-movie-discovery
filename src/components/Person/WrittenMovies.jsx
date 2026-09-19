import { motion } from "framer-motion";
import {
  PenSquare,
  Star,
  Calendar,
  ArrowRight,
  FileText,
} from "lucide-react";

const POSTER =
  "https://image.tmdb.org/t/p/w500";

const WRITER_JOBS = [
  "Writer",
  "Screenplay",
  "Story",
  "Novel",
  "Characters",
  "Creator",
  "Original Story",
  "Original Film Writer",
  "Adaptation",
  "Comic Book",
];

export default function WrittenMovies({
  credits = [],
  onMovieClick,
}) {
  const written = credits
    .filter(
      (item) =>
        item.media_type === "movie" &&
        WRITER_JOBS.includes(item.job)
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

  if (!written.length) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="flex items-center gap-3 text-4xl font-black">

            <PenSquare
              size={34}
              className="text-emerald-400"
            />

            Written Movies

          </h2>

          <p className="mt-2 text-zinc-400">
            Screenplays, stories and writing credits
          </p>

        </div>

        <div
          className="
            rounded-full
            bg-emerald-500/15
            px-5
            py-2
            font-bold
            text-emerald-400
          "
        >
          {written.length} Credits
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

        {written.map((movie) => (

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

              {/* Writing Badge */}

              <div
                className="
                  absolute
                  left-4
                  top-4
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-emerald-500
                  px-3
                  py-2
                  text-sm
                  font-bold
                "
              >
                <FileText size={15} />

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

                {movie.vote_average.toFixed(
                  1
                )}

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