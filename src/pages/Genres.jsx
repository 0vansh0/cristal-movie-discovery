import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GenreButton from "../components/GenreButton";
import MovieCard from "../components/movie/MovieCard";
import { useGenreFilter } from "../hooks/useGenreFilter";

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -24 },
};

const Genres = () => {
  const {
    genres,
    selectedGenre,
    setSelectedGenre,
    filteredMovies,
    loading,
    error,
  } = useGenreFilter("movie");

  const navigate = useNavigate();
  const [showGenres, setShowGenres] = useState(true);

  useEffect(() => {
    if (!selectedGenre && genres.length > 0) {
      setSelectedGenre(genres[0].id);
    }
  }, [genres, selectedGenre, setSelectedGenre]);

  const activeGenre = genres.find((genre) => genre.id === selectedGenre);

  const handleSelectGenre = (genreId) => {
    setSelectedGenre(genreId);
    setShowGenres(false);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(107,114,128,0.12),transparent_18%),linear-gradient(180deg,#02050d_0%,#05080f_100%)] text-white py-28 px-4 md:px-12"
    >
      {/* background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-20 h-64 w-64 rounded-full bg-imdb-yellow/15 blur-3xl opacity-60 animate-float-slow" />
        <div className="absolute right-0 top-28 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl opacity-50 animate-float" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-8">
        {/* Genre selection section */}
        <section className="rounded-[40px] border border-white/10 bg-black/50 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-3xl">
          <div className="mb-8 max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.28em] text-imdb-yellow">
              Discover
            </p>
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
              Browse curated film categories
            </h1>
            <p className="max-w-2xl text-slate-300 text-base leading-7">
              Choose a genre to surface a refined selection of films. Each
              result card links to the film details and trailer experience.
            </p>
          </div>
          {showGenres && (
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:grid-rows-4 justify-items-stretch">
              {error && (
                <div className="col-span-full rounded-3xl border border-rose-400/15 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                  {error}
                </div>
              )}

              {genres.length > 0 ? (
                genres.map((genre) => (
                  <div key={genre.id} className="w-full">
                    <GenreButton
                      genre={genre}
                      active={selectedGenre === genre.id}
                      onClick={() => handleSelectGenre(genre.id)}
                      size="sm"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
                  Loading genres...
                </div>
              )}
            </div>
          )}


        </section>

        {/* Movies in selected genre */}
        <section className="rounded-[40px] border border-white/10 bg-black/50 p-8 shadow-[0_40px_120px_rgba(0,0,0,0.55)] backdrop-blur-3xl">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                {activeGenre ? activeGenre.name : "Genre"} collection
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-white">
                {activeGenre
                  ? `Featured ${activeGenre.name} titles`
                  : "Select a genre to explore"}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {!showGenres && (
                <button
                  type="button"
                  onClick={() => setShowGenres(true)}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Refine selection
                </button>
              )}
              <p className="text-sm text-slate-400">
                {filteredMovies.length > 0
                  ? `${filteredMovies.length} titles available`
                  : showGenres
                  ? "Select a genre to reveal curated films."
                  : loading
                  ? "Loading the latest selections..."
                  : "No films match this category at the moment."}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-slate-300">
              Loading curated films for {activeGenre?.name || "the selected genre"}...
            </div>
          ) : filteredMovies.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-slate-300">
              {activeGenre ? (
                <span>
                  No films were found for {activeGenre.name}. Try another
                  category.
                </span>
              ) : (
                <span>Select a genre above to see curated results.</span>
              )}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredMovies.map((movie, index) => (
                <div key={movie.id} className="genre-card-wrapper">
                  <MovieCard
                    movie={movie}
                    rank={index + 1}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
};

export default Genres;
