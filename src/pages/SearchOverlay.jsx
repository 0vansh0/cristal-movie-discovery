import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { api, getImageUrl } from "../utils/api";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }

    return undefined;
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
      setLoading(false);
      return;
    }

    const searchMovies = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setSearchError(null);
      setLoading(true);
      try {
        const response = await api.get("/search/movie", {
          params: { query },
        });
        setResults(response.data.results || []);
      } catch (error) {
        console.error("Search error:", error);
        setSearchError("Unable to search right now. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchMovies, 300);
    return () => clearTimeout(debounceTimer);
  }, [query, isOpen]);

  const handleSelectMovie = (movieId) => {
    onClose();
    navigate(`/movie/${movieId}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 grid place-items-center bg-black/85 backdrop-blur-2xl px-4 py-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="glass-card relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/15 bg-slate-950/90 p-5 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-3xl max-h-[86vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pointer-events-none absolute -right-24 top-10 h-56 w-56 rounded-full bg-imdb-yellow/15 blur-3xl opacity-60 animate-float-slow" />
            <div className="pointer-events-none absolute -left-24 bottom-10 h-56 w-56 rounded-full bg-netflix-red/10 blur-3xl opacity-50 animate-float" />

            <Button
              variant="ghost"
              onClick={onClose}
              className="absolute right-5 top-5 text-xl px-3 py-2"
            >
              ×
            </Button>

            <div className="mb-6 rounded-[32px] border border-white/10 bg-black/30 p-6 text-slate-200 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
              <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-xl">
                  <p className="text-[10px] uppercase tracking-[0.32em] text-imdb-yellow/80">Search center</p>
                  <h2 className="mt-2 text-3xl font-black text-white sm:text-4xl">Find your next cinematic favourite</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                </div>
              </div>
              <p className="text-sm text-slate-300">
                Type a title, keyword, or genre to open premium results in a polished glass interface.
              </p>
            </div>
            <div className="mb-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-300">
                Try “action”, “drama”, “avengers”
              </span>
              <span className="rounded-full border border-white/10 bg-imdb-yellow/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-imdb-yellow">
                Instant results
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-300">
                Trending now
              </span>
            </div>
            <div className="mb-6 grid gap-2 sm:grid-cols-4">
              {[
                "Adventure",
                "Thriller",
                "Sci-fi",
                "Mystery",
              ].map((tag) => (
                <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-300 transition duration-200 hover:border-imdb-yellow/40 hover:bg-white/10">
                  {tag}
                </span>
              ))}
            </div>

            <div className="relative mb-6">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a movie, actor, or keyword..."
                className="w-full rounded-[28px] border border-white/10 bg-black/70 px-6 py-4 text-lg text-white outline-none transition duration-200 focus:border-imdb-yellow focus:ring-4 focus:ring-imdb-yellow/20"
                autoFocus
              />
              {loading && (
                <div className="absolute right-5 top-1/2 -translate-y-1/2">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-imdb-yellow border-t-transparent" />
                </div>
              )}
            </div>

            {results.length > 0 && (
              <div className="mb-4 flex flex-wrap items-center justify-between rounded-3xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-slate-300 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                <span>{results.length} result{results.length === 1 ? "" : "s"} found</span>
                <span className="rounded-full bg-imdb-yellow/10 px-3 py-1 text-xs uppercase text-imdb-yellow">
                  Live search
                </span>
              </div>
            )}
            <div className="grid gap-4 max-h-[520px] overflow-y-auto pr-2">
              {query.length < 2 && (
                <div className="rounded-[28px] border border-white/10 bg-black/60 p-6 text-sm text-slate-300 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
                  Type 2+ characters to start searching.
                </div>
              )}

              {searchError && (
                <div className="rounded-[28px] border border-red-500/20 bg-red-500/5 p-6 text-sm text-red-200">
                  {searchError}
                </div>
              )}

              {query.length >= 2 && !loading && !searchError && results.length === 0 && (
                <div className="rounded-[28px] border border-white/10 bg-black/50 p-6 text-sm text-slate-300 shadow-[0_20px_60px_rgba(0,0,0,0.22)]">
                  No results found. Try another keyword or broaden the search.
                </div>
              )}

              {results.map((movie, index) => (
                <Button
                  key={movie.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03, duration: 0.35, ease: 'easeOut' }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectMovie(movie.id)}
                  className="group flex w-full items-center gap-4 rounded-[28px] border border-white/10 bg-white/5 p-4 text-left transition duration-300 hover:border-imdb-yellow/30 hover:bg-white/10"
                >
                  <img
                    src={getImageUrl(movie.poster_path)}
                    alt={movie.title}
                    className="h-20 w-14 flex-none rounded-xl object-cover"
                  />
                      <div className="min-w-0 flex-1 space-y-2">
                    <p className="text-base font-semibold text-white line-clamp-1">{movie.title}</p>
                    <p className="text-sm leading-5 text-slate-400 line-clamp-2">
                      {movie.overview ? `${movie.overview.slice(0, 110)}...` : "No description available."}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-slate-400">
                      <span>{movie.release_date?.slice(0, 4) || "TBA"}</span>
                      <span>{movie.vote_average?.toFixed(1) ?? "N/A"} ★</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-imdb-yellow/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-imdb-yellow">
                    View
                  </span>
                </Button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
