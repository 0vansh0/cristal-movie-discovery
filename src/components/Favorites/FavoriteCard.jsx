import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Bookmark,
  Play,
  Calendar,
  Clock,
  Star,
  Eye,
  MoreHorizontal,
} from "lucide-react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function FavoriteCard({
  movie,
  view = "grid",
}) {
  const [liked, setLiked] = useState(true);
  const [saved, setSaved] = useState(false);

  if (!movie) return null;

  const poster = movie.poster_path
    ? `${IMAGE_URL}${movie.poster_path}`
    : "https://placehold.co/500x750/111827/ffffff?text=No+Poster";

  const title = movie.title || movie.name;

  const year = movie.release_date
    ? movie.release_date.slice(0, 4)
    : "N/A";

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "--";

  const runtime = movie.runtime
    ? `${movie.runtime} min`
    : "--";

  if (view === "list") {
    return (
      <motion.div
        whileHover={{ y: -5 }}
        className="flex gap-6 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-2xl"
      >
        <img
          src={poster}
          alt={title}
          className="h-52 w-36 rounded-2xl object-cover"
        />

        <div className="flex flex-1 flex-col justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              {title}
            </h2>

            <p className="mt-3 line-clamp-3 text-zinc-400">
              {movie.overview}
            </p>

          </div>

          <div className="mt-5 flex items-center gap-6 text-sm">

            <div className="flex items-center gap-2">
              <Calendar size={16}/>
              {year}
            </div>

            <div className="flex items-center gap-2">
              <Star
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
              {rating}
            </div>

            <button
              onClick={() => setLiked(!liked)}
              className="ml-auto"
            >
              <Heart
                className={
                  liked
                    ? "fill-red-500 text-red-500"
                    : ""
                }
              />
            </button>

          </div>

        </div>

      </motion.div>
    );
  }

  return (

    <motion.article
      whileHover={{
        y: -12,
        rotateX: 3,
        rotateY: -3,
      }}
      transition={{
        type: "spring",
        stiffness: 220,
      }}
      className="
        group
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
          src={poster}
          alt={title}
          loading="lazy"
          whileHover={{
            scale: 1.08,
          }}
          transition={{
            duration: .5,
          }}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"/>

        {/* Rating */}

        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 backdrop-blur-xl">

          <Star
            size={15}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm font-bold">
            {rating}
          </span>

        </div>

        {/* Actions */}

        <motion.div
          initial={{
            opacity:0,
            y:20,
          }}
          whileHover={{
            opacity:1,
            y:0,
          }}
          className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-3"
        >

          <CircleButton>
            <Play size={18}/>
          </CircleButton>

          <CircleButton
            onClick={() => setLiked(!liked)}
          >
            <Heart
              size={18}
              className={
                liked
                  ? "fill-red-500 text-red-500"
                  : ""
              }
            />
          </CircleButton>

          <CircleButton
            onClick={() => setSaved(!saved)}
          >
            <Bookmark
              size={18}
              className={
                saved
                  ? "fill-[#FFD464] text-[#FFD464]"
                  : ""
              }
            />
          </CircleButton>

          <CircleButton>
            <Eye size={18}/>
          </CircleButton>

          <CircleButton>
            <MoreHorizontal size={18}/>
          </CircleButton>

        </motion.div>

      </div>

      {/* Movie Content */}

      <div className="space-y-5 p-6">

              {/* Title */}

        <div>

          <h2 className="line-clamp-1 text-2xl font-black">
            {title}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm leading-7 text-zinc-400">
            {movie.overview || "No overview available."}
          </p>

        </div>

        {/* Genres */}

        <div className="flex flex-wrap gap-2">

          {(movie.genres || []).slice(0, 3).map((genre) => (

            <span
              key={genre.id}
              className="
                rounded-full
                border
                border-white/10
                bg-white/5
                px-3
                py-1
                text-xs
              "
            >
              {genre.name}
            </span>

          ))}

        </div>

        {/* Stats */}

        <div className="grid grid-cols-3 gap-3">

          <MetaCard
            icon={<Calendar size={16} />}
            title="Year"
            value={year}
          />

          <MetaCard
            icon={<Clock size={16} />}
            title="Runtime"
            value={runtime}
          />

          <MetaCard
            icon={
              <Star
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
            }
            title="TMDB"
            value={rating}
          />

        </div>

        {/* Streaming */}

        <div>

          <p className="mb-3 text-xs uppercase tracking-widest text-zinc-500">
            Available On
          </p>

          <div className="flex flex-wrap gap-2">

            <StreamingBadge
              text="Netflix"
              color="bg-red-600"
            />

            <StreamingBadge
              text="Disney+"
              color="bg-blue-600"
            />

            <StreamingBadge
              text="Prime"
              color="bg-sky-500"
            />

          </div>

        </div>

        {/* Footer */}

        <div className="flex gap-3 pt-2">

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: .97 }}
            className="
              flex-1
              rounded-2xl
              bg-gradient-to-r
              from-[#FF5E5E]
              via-[#FF9B5E]
              to-[#FFD464]
              py-3
              font-semibold
              text-black
            "
          >
            View Details
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: .97 }}
            className="
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-5
              backdrop-blur-xl
            "
          >
            Trailer
          </motion.button>

        </div>

      </div>

    </motion.article>

  );
}

function CircleButton({
  children,
  onClick,
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.1,
      }}
      whileTap={{
        scale: .92,
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
        bg-black/60
        backdrop-blur-xl
        transition
        hover:bg-[#FFD464]
        hover:text-black
      "
    >
      {children}
    </motion.button>
  );
}

function MetaCard({
  icon,
  title,
  value,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-3
      "
    >
      <div className="mb-2 flex items-center gap-2 text-zinc-400">
        {icon}
        <span className="text-xs">
          {title}
        </span>
      </div>

      <p className="font-semibold">
        {value}
      </p>
    </div>
  );
}

function StreamingBadge({
  text,
  color,
}) {
  return (
    <span
      className={`
        ${color}
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        text-white
      `}
    >
      {text}
    </span>
  );
}
      