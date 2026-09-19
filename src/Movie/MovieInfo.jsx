import { motion } from "framer-motion";
import {
  Star,
  Calendar,
  Clock3,
  Globe2,
  Film,
  Users,
  DollarSign,
} from "lucide-react";

export default function MovieInfo({ movie }) {
  if (!movie) return null;

  const year =
    movie.release_date?.slice(0, 4) ||
    movie.first_air_date?.slice(0, 4) ||
    "----";

  const runtime = movie.runtime || "--";
  const language = movie.original_language?.toUpperCase() || "EN";

  const genres =
    movie.genres?.map((g) => g.name).join(" • ") ||
    "Action • Adventure";

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: .8 }}
      className="max-w-3xl"
    >
      {/* Logo */}

      <p className="mb-3 text-sm font-semibold tracking-[0.35em] text-[#FFD464] uppercase">
        CRISTAL ORIGINAL
      </p>

      {/* Title */}

      <h1 className="text-5xl md:text-7xl font-black leading-none text-white">
        {movie.title || movie.name}
      </h1>

      {/* Meta */}

      <div className="mt-6 flex flex-wrap items-center gap-5 text-zinc-300">

        <div className="flex items-center gap-2">
          <Star
            fill="#FFD464"
            color="#FFD464"
            size={18}
          />
          <span>{movie.vote_average?.toFixed(1) || "8.5"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar size={18} />
          <span>{year}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock3 size={18} />
          <span>{runtime} min</span>
        </div>

        <div className="flex items-center gap-2">
          <Globe2 size={18} />
          <span>{language}</span>
        </div>

      </div>

      {/* Genres */}

      <div className="mt-7 flex flex-wrap gap-3">

        {genres.split(" • ").map((genre) => (

          <div
            key={genre}
            className="
              rounded-full
              border
              border-white/10
              bg-white/5
              px-5
              py-2
              backdrop-blur-xl
              transition
              hover:border-[#FF5E5E]
              hover:bg-[#FF5E5E]/10
            "
          >
            {genre}
          </div>

        ))}

      </div>

      {/* Overview */}

      <p className="mt-8 text-lg leading-8 text-zinc-300">
        {movie.overview}
      </p>

      {/* Stats */}

      <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

          <Film className="mb-3 text-[#FFD464]" />

          <p className="text-sm text-zinc-400">
            Status
          </p>

          <h3 className="mt-2 font-semibold">
            {movie.status || "Released"}
          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

          <Users className="mb-3 text-[#FFD464]" />

          <p className="text-sm text-zinc-400">
            Votes
          </p>

          <h3 className="mt-2 font-semibold">
            {movie.vote_count || "12.4K"}
          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

          <DollarSign className="mb-3 text-[#FFD464]" />

          <p className="text-sm text-zinc-400">
            Budget
          </p>

          <h3 className="mt-2 font-semibold">
            {movie.budget
              ? `$${movie.budget.toLocaleString()}`
              : "Unknown"}
          </h3>

        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

          <DollarSign className="mb-3 text-[#FF5E5E]" />

          <p className="text-sm text-zinc-400">
            Revenue
          </p>

          <h3 className="mt-2 font-semibold">
            {movie.revenue
              ? `$${movie.revenue.toLocaleString()}`
              : "Unknown"}
          </h3>

        </div>

      </div>

    </motion.div>
  );
}