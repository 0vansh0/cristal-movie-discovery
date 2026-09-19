import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Play,
} from "lucide-react";
import { useRef } from "react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function KnownForSection({
  credits = [],
  onMovieClick,
}) {
  const sliderRef = useRef(null);

  const movies = [...credits]
    .sort(
      (a, b) =>
        (b.popularity || 0) -
        (a.popularity || 0)
    )
    .slice(0, 15);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left:
        direction === "left"
          ? -420
          : 420,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative">

      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black">
            Known For
          </h2>

          <p className="mt-2 text-zinc-400">
            Most popular movies & TV shows
          </p>

        </div>

        <div className="flex gap-3">

          <ArrowButton
            icon={<ChevronLeft />}
            onClick={() =>
              scroll("left")
            }
          />

          <ArrowButton
            icon={<ChevronRight />}
            onClick={() =>
              scroll("right")
            }
          />

        </div>

      </div>

      {/* Slider */}

      <div
        ref={sliderRef}
        className="
          flex
          gap-6
          overflow-x-auto
          scroll-smooth
          pb-4
          scrollbar-hide
        "
      >

        {movies.map((movie) => (

          <MovieCard
            key={movie.id}
            movie={movie}
            onClick={() =>
              onMovieClick?.(movie)
            }
          />

        ))}

      </div>

    </section>
  );
}

/* -------------------------------- */

function MovieCard({
  movie,
  onClick,
}) {
  const image = movie.poster_path
    ? `${IMAGE_URL}${movie.poster_path}`
    : "https://placehold.co/500x750/111827/FFFFFF?text=No+Poster";

  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
      }}
      onClick={onClick}
      className="
        group
        relative
        min-w-[240px]
        cursor-pointer
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-3xl
      "
    >

      {/* Poster */}

      <div className="relative aspect-[2/3] overflow-hidden">

        <motion.img
          whileHover={{
            scale: 1.08,
          }}
          src={image}
          alt={movie.title}
          className="
            h-full
            w-full
            object-cover
          "
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"/>

        {/* Play */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileHover={{
            opacity: 1,
          }}
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/30
          "
        >

          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-white/20
              backdrop-blur-xl
            "
          >
            <Play
              size={30}
              fill="white"
            />
          </div>

        </motion.div>

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
            bg-black/70
            px-3
            py-2
          "
        >
          <Star
            size={14}
            className="
              fill-yellow-400
              text-yellow-400
            "
          />

          <span className="text-sm">
            {movie.vote_average?.toFixed(1)}
          </span>

        </div>

      </div>

      {/* Content */}

      <div className="p-5">

        <h3 className="line-clamp-1 text-xl font-black">
          {movie.title || movie.name}
        </h3>

        <div className="mt-3 flex items-center gap-2 text-zinc-400">

          <Calendar size={15} />

          <span>
            {(
              movie.release_date ||
              movie.first_air_date ||
              ""
            ).slice(0, 4)}
          </span>

        </div>

        {movie.character && (

          <div className="mt-4">

            <p className="text-sm text-zinc-500">
              Character
            </p>

            <h4 className="mt-1 font-semibold">
              {movie.character}
            </h4>

          </div>

        )}

      </div>

    </motion.div>
  );
}

/* -------------------------------- */

function ArrowButton({
  icon,
  onClick,
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: .95,
      }}
      onClick={onClick}
      className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        transition
        hover:bg-[#FFD464]
        hover:text-black
      "
    >
      {icon}
    </motion.button>
  );
}