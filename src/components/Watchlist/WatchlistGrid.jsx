import { motion } from "framer-motion";
import WatchlistCard from "./WatchlistCard";

export default function WatchlistGrid({ movies = [] }) {
  if (!movies.length) return null;

  return (
    <section className="mt-20">

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black">
            Your Movies
          </h2>

          <p className="mt-2 text-zinc-400">
            {movies.length} movies saved to your watchlist
          </p>

        </div>

      </div>

      <motion.div
        layout
        className="
          grid
          gap-8
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-5
        "
      >

        {movies.map((movie) => (

          <WatchlistCard
            key={movie.id}
            movie={movie}
          />

        ))}

      </motion.div>

    </section>
  );
}