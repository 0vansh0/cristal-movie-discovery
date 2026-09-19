import { motion } from "framer-motion";
import {
  Film,
  Calendar,
  Clock3,
  Star,
  TrendingUp,
  Play,
} from "lucide-react";

const BACKDROP = "https://image.tmdb.org/t/p/original";
const POSTER = "https://image.tmdb.org/t/p/w500";

export default function CollectionHero({
  collection,
  movies = [],
}) {
  if (!collection) return null;

  const sorted = [...movies].sort(
    (a, b) =>
      new Date(a.release_date) -
      new Date(b.release_date)
  );

  const runtime = movies.reduce(
    (sum, movie) => sum + (movie.runtime || 0),
    0
  );

  const avgRating =
    movies.length
      ? (
          movies.reduce(
            (sum, movie) =>
              sum + movie.vote_average,
            0
          ) / movies.length
        ).toFixed(1)
      : 0;

  const years = sorted.filter(
    (m) => m.release_date
  );

  const span =
    years.length > 1
      ? `${years[0].release_date.slice(
          0,
          4
        )} - ${
          years[
            years.length - 1
          ].release_date.slice(0, 4)
        }`
      : years[0]?.release_date?.slice(0, 4);

  const backdrop =
    collection.backdrop_path ||
    movies[0]?.backdrop_path;

  return (
    <section className="relative h-[95vh] overflow-hidden">

      {/* Background */}

      <img
        src={BACKDROP + backdrop}
        alt={collection.name}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/70 to-black/30" />

      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

      {/* Content */}

      <div className="relative z-20 mx-auto flex h-full max-w-7xl items-end gap-12 px-8 pb-16">

        {/* Poster */}

        <motion.img
          initial={{
            opacity: 0,
            x: -50,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: .6,
          }}
          src={POSTER + collection.poster_path}
          className="
            hidden
            w-80
            rounded-[36px]
            shadow-2xl
            lg:block
          "
        />

        {/* Text */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="max-w-4xl"
        >

          <span
            className="
              rounded-full
              bg-yellow-400/20
              px-5
              py-2
              text-yellow-300
              font-semibold
            "
          >
            Movie Collection
          </span>

          <h1 className="mt-6 text-6xl font-black leading-tight xl:text-7xl">
            {collection.name}
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-zinc-300">
            {collection.overview}
          </p>

          {/* Stats */}

          <div className="mt-10 flex flex-wrap gap-4">

            <div className="rounded-full bg-white/10 px-5 py-3 backdrop-blur-xl">
              <Film className="mr-2 inline" size={18} />
              {movies.length} Movies
            </div>

            <div className="rounded-full bg-white/10 px-5 py-3 backdrop-blur-xl">
              <Clock3 className="mr-2 inline" size={18} />
              {runtime} min
            </div>

            <div className="rounded-full bg-white/10 px-5 py-3 backdrop-blur-xl">
              <Calendar className="mr-2 inline" size={18} />
              {span}
            </div>

            <div className="rounded-full bg-white/10 px-5 py-3 backdrop-blur-xl">
              <Star className="mr-2 inline text-yellow-400" size={18} />
              {avgRating}
            </div>

          </div>

          {/* Buttons */}

          <div className="mt-10 flex gap-5">

            <button
              className="
                flex
                items-center
                gap-3
                rounded-full
                bg-[#FFD464]
                px-8
                py-4
                font-bold
                text-black
              "
            >
              <Play size={20} />
              Explore Collection
            </button>

            <button
              className="
                flex
                items-center
                gap-3
                rounded-full
                border
                border-white/20
                bg-white/10
                px-8
                py-4
                backdrop-blur-xl
              "
            >
              <TrendingUp size={20} />
              Statistics
            </button>

          </div>

        </motion.div>

      </div>

    </section>
  );
}