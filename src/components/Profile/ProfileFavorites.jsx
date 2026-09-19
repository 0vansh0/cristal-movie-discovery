import { motion } from "framer-motion";
import { Star, Heart, Play, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const favorites = [
  {
    id: 157336,
    title: "Interstellar",
    year: "2014",
    rating: 9.8,
    image:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 27205,
    title: "Inception",
    year: "2010",
    rating: 9.6,
    image:
      "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  },
  {
    id: 155,
    title: "The Dark Knight",
    year: "2008",
    rating: 9.9,
    image:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
  },
  {
    id: 603,
    title: "The Matrix",
    year: "1999",
    rating: 9.5,
    image:
      "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
  },
];

export default function ProfileFavorites() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-black">
            Favorite Movies
          </h2>

          <p className="mt-2 text-zinc-400">
            Movies that define your taste.
          </p>
        </div>

        <button className="flex items-center gap-2 text-[#FFD464] hover:gap-3 transition-all">
          View All
          <ArrowRight size={18} />
        </button>

      </div>

      <div className="flex gap-7 overflow-x-auto pb-4 scrollbar-hide">

        {favorites.map((movie, index) => (

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
              delay: index * .08,
            }}
            whileHover={{
              y: -15,
              rotateY: 8,
              scale: 1.04,
            }}
            className="group relative w-[250px] shrink-0"
          >

            <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-[#FF5E5E]/20 via-[#FFD464]/10 to-transparent opacity-0 blur-3xl transition group-hover:opacity-100" />

            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl">

              <img
                src={movie.image}
                alt={movie.title}
                className="h-[360px] w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 backdrop-blur-xl flex items-center gap-2">

                <Star
                  size={14}
                  fill="#FFD464"
                  color="#FFD464"
                />

                <span className="text-sm">
                  {movie.rating}
                </span>

              </div>

              <div className="absolute right-4 top-4 rounded-full bg-red-500 p-2">

                <Heart
                  size={16}
                  fill="white"
                  color="white"
                />

              </div>

              <motion.div
                initial={{
                  opacity: 0,
                }}
                whileHover={{
                  opacity: 1,
                }}
                className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black via-black/50 to-transparent"
              >

                <h3 className="text-xl font-bold">
                  {movie.title}
                </h3>

                <p className="text-zinc-400">
                  {movie.year}
                </p>

                <button
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="mt-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black"
                >

                  <Play
                    fill="currentColor"
                    size={20}
                  />

                </button>

              </motion.div>

            </div>

          </motion.div>

        ))}

      </div>
    </section>
  );
}