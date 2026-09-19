import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  ArrowRight,
  Star,
  Play,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const IMAGE = "https://image.tmdb.org/t/p/w500";

const recommendations = [
  {
    id: 1,
    title: "Blade Runner 2049",
    match: 98,
    rating: 8.6,
    image: "/demo/bladerunner.jpg",
    reason: "Because you loved Dune & Interstellar",
  },
  {
    id: 2,
    title: "Arrival",
    match: 96,
    rating: 8.4,
    image: "/demo/arrival.jpg",
    reason: "Mind-bending Sci-Fi",
  },
  {
    id: 3,
    title: "The Prestige",
    match: 95,
    rating: 8.5,
    image: "/demo/prestige.jpg",
    reason: "Christopher Nolan Collection",
  },
];

export default function WatchlistRecommendations() {
  const navigate = useNavigate();

  return (
    <section className="mt-24">

      <div className="mb-10 flex items-center justify-between">

        <div>

          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5E5E]/20 to-[#FFD464]/20 px-4 py-2 backdrop-blur-xl">
            <Brain size={16} />
            AI Powered
          </div>

          <h2 className="mt-5 text-4xl font-black">
            Recommended For You
          </h2>

          <p className="mt-3 max-w-2xl text-zinc-400">
            Personalized recommendations based on your watch history,
            favorite genres and viewing habits.
          </p>

        </div>

        <button className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl hover:bg-white/10">
          Explore All
          <ArrowRight size={18} />
        </button>

      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        {recommendations.map((movie, index) => (

          <motion.div
            key={movie.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * .08 }}
            whileHover={{ y: -12 }}
            className="
              group
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-2xl
            "
          >

            <div className="relative">

              <img
                src={movie.image}
                alt={movie.title}
                className="h-[280px] w-full object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/>

              <div className="absolute left-5 top-5 rounded-full bg-[#FFD464] px-4 py-2 font-bold text-black">
                {movie.match}% Match
              </div>

            </div>

            <div className="p-6">

              <h3 className="text-2xl font-black">
                {movie.title}
              </h3>

              <div className="mt-4 flex items-center gap-4 text-sm">

                <span className="flex items-center gap-1">

                  <Star
                    fill="#FFD464"
                    color="#FFD464"
                    size={15}
                  />

                  {movie.rating}

                </span>

                <span className="text-emerald-400">
                  AI Pick
                </span>

              </div>

              <p className="mt-5 text-zinc-400">
                {movie.reason}
              </p>

              <div className="mt-7 flex gap-3">

                <button
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-white
                    px-6
                    py-3
                    font-semibold
                    text-black
                  "
                >

                  <Play
                    fill="currentColor"
                    size={18}
                  />

                  View

                </button>

                <button
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-white/10
                    px-6
                    py-3
                    backdrop-blur-xl
                  "
                >

                  <Sparkles size={18} />

                  Why?

                </button>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}