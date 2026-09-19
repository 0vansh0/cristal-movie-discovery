import { motion } from "framer-motion";
import { Star, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IMAGE = "https://image.tmdb.org/t/p/w500";

export default function MovieRecommendations({ movies = [] }) {
  const navigate = useNavigate();

  if (!movies.length) return null;

  return (
    <section className="mt-24">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black">
            You May Also Like
          </h2>

          <p className="mt-2 text-zinc-400">
            Similar movies picked for you
          </p>

        </div>

      </div>

      <div className="flex gap-7 overflow-x-auto pb-6 scrollbar-hide">

        {movies.slice(0, 15).map((movie, index) => {

          const poster = movie.poster_path
            ? `${IMAGE}${movie.poster_path}`
            : "https://placehold.co/500x750";

          return (

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
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * .04,
              }}
              whileHover={{
                y: -15,
                scale: 1.05,
                rotateY: 8,
              }}
              className="group relative w-[220px] shrink-0 cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >

              {/* Glow */}

              <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-[#FF5E5E]/20 via-[#FFD464]/10 to-transparent opacity-0 blur-3xl transition duration-500 group-hover:opacity-100" />

              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-xl">

                <img
                  src={poster}
                  alt={movie.title}
                  className="h-[320px] w-full object-cover transition duration-700 group-hover:scale-110"
                />

                {/* Gradient */}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                {/* Rating */}

                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/60 px-3 py-1 backdrop-blur-xl">

                  <Star
                    size={14}
                    fill="#FFD464"
                    color="#FFD464"
                  />

                  <span className="text-sm">
                    {movie.vote_average?.toFixed(1)}
                  </span>

                </div>

                {/* Hover */}

                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  whileHover={{
                    opacity: 1,
                  }}
                  className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent p-5"
                >

                  <h3 className="font-bold">
                    {movie.title}
                  </h3>

                  <button
                    className="
                      mt-4
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-black
                    "
                  >

                    <Play
                      fill="currentColor"
                      size={20}
                    />

                  </button>

                </motion.div>

              </div>

            </motion.div>

          );
        })}

      </div>

    </section>
  );
}