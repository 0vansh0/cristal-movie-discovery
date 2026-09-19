import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, getImageUrl } from "../utils/api";
import { motion } from "framer-motion";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchMovies = async () => {
      if (query.length < 3) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await api.get("/search/movie", {
          params: { query },
        });
        setResults(response.data.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(searchMovies, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(245,197,24,0.12),transparent_18%),linear-gradient(180deg,#02050d_0%,#02030a_100%)] text-white pt-24 px-4 md:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-24 h-64 w-64 rounded-full bg-imdb-yellow/15 blur-3xl opacity-70 animate-float-slow" />
        <div className="absolute right-0 top-40 h-72 w-72 rounded-full bg-netflix-red/10 blur-3xl opacity-55 animate-float" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl pb-12 space-y-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass-card border border-white/10 p-8 mb-12"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-imdb-yellow">Premium search</p>
              <h1 className="mt-3 text-5xl font-black tracking-tight text-white">Find your next favorite movie</h1>
              <p className="mt-4 max-w-2xl text-slate-300 text-lg">
                Browse casts, trailers, ratings, and release details with one intelligent query.
              </p>
            </div>
            <div className="rounded-3xl bg-black/50 border border-white/10 px-5 py-4 text-sm text-slate-300">
              <p className="font-semibold text-white">Tip</p>
              <p className="mt-2">Search by title, genre, or keyword — try “dark knight” or “space adventure”.</p>
            </div>
          </div>

          <div className="relative mt-10">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies..."
              className="w-full rounded-[32px] border border-white/10 bg-black/70 px-6 py-5 text-lg text-white outline-none transition duration-200 focus:border-imdb-yellow focus:ring-4 focus:ring-imdb-yellow/20"
              autoFocus
            />
            {loading && (
              <div className="absolute right-5 top-1/2 -translate-y-1/2">
                <div className="w-6 h-6 border-2 border-imdb-yellow border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </motion.div>

        {query.length < 3 ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="glass-card border border-white/10 p-12 text-center text-slate-400"
          >
            Type at least 3 characters to start searching best-in-class movie results.
          </motion.div>
        ) : loading ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="glass-card border border-white/10 p-12 text-center text-slate-300"
          >
            Searching for movies...
          </motion.div>
        ) : results.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="glass-card border border-white/10 p-12 text-center text-slate-300"
          >
            No movies found for “{query}”. Try a different term.
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="glass-card border border-white/10 p-8"
          >
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-imdb-yellow">Search results</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{results.length} matches for “{query}”</h2>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((movie, index) => (
                <motion.button
                  key={movie.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.35, ease: 'easeOut' }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/movie/${movie.id}`)}
                  className="group overflow-hidden rounded-[28px] border border-white/10 bg-black/60 text-left transition duration-300 hover:border-imdb-yellow/30 hover:bg-white/5"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={getImageUrl(movie.poster_path)}
                      alt={movie.title}
                      className="h-72 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-5">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-imdb-yellow/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-imdb-yellow">
                        ★ {movie.vote_average?.toFixed(1) ?? "N/A"}
                      </span>
                      <span className="text-xs uppercase tracking-[0.12em] text-slate-500">
                        {movie.release_date?.split("-")[0] || "TBA"}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">{movie.title}</h3>
                    <p className="text-sm leading-6 text-slate-400 line-clamp-3">
                      {movie.overview || "No description available."}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;
