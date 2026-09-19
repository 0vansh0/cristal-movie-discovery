import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Play,
} from "lucide-react";

const POSTER =
  "https://image.tmdb.org/t/p/w500";

export default function CollectionCarousel({
  movies = [],
  onMovieClick,
}) {
  const slider = useRef(null);

  if (!movies.length) return null;

  const scroll = (direction) => {
    if (!slider.current) return;

    slider.current.scrollBy({
      left: direction * 420,
      behavior: "smooth",
    });
  };

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-black">
            Featured Movies
          </h2>

          <p className="mt-2 text-zinc-400">
            Browse the collection in a cinematic carousel.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => scroll(-1)}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-white/10
              backdrop-blur-xl
              transition
              hover:bg-white/20
            "
          >
            <ChevronLeft />
          </button>

          <button
            onClick={() => scroll(1)}
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-white/10
              backdrop-blur-xl
              transition
              hover:bg-white/20
            "
          >
            <ChevronRight />
          </button>

        </div>

      </div>

      {/* Carousel */}

      <div
        ref={slider}
        className="
          flex
          snap-x
          gap-6
          overflow-x-auto
          scroll-smooth
          pb-5
          scrollbar-hide
        "
      >

        {movies.map((movie, index) => (

          <motion.div
            key={movie.id}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * .06,
            }}
            viewport={{
              once: true,
            }}
            whileHover={{
              scale: 1.03,
            }}
            className="
              group
              min-w-[280px]
              snap-start
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-3xl
            "
          >

            {/* Poster */}

            <div className="relative">

              <img
                src={
                  movie.poster_path
                    ? POSTER + movie.poster_path
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
                  bg-black/70
                  px-3
                  py-2
                  backdrop-blur-xl
                "
              >

                <Star
                  size={15}
                  className="text-yellow-400"
                />

                {movie.vote_average?.toFixed(1)}

              </div>

              {/* Play */}

              <button
                onClick={() =>
                  onMovieClick?.(movie.id)
                }
                className="
                  absolute
                  bottom-5
                  right-5
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-[#FFD464]
                  text-black
                  opacity-0
                  transition
                  duration-300
                  group-hover:opacity-100
                "
              >
                <Play
                  fill="currentColor"
                  size={22}
                />
              </button>

            </div>

            {/* Content */}

            <div className="space-y-3 p-6">

              <h3 className="line-clamp-2 text-2xl font-black">

                {movie.title}

              </h3>

              <p className="text-zinc-400">

                {movie.release_date?.slice(0, 4)}

              </p>

              <button
                onClick={() =>
                  onMovieClick?.(movie.id)
                }
                className="
                  mt-3
                  w-full
                  rounded-xl
                  border
                  border-white/10
                  bg-white/10
                  py-3
                  font-semibold
                  transition
                  hover:bg-white/20
                "
              >
                View Details
              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}