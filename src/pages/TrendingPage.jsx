import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bookmark,
  Flame,
  Globe2,
  MapPin,
  Play,
  SlidersHorizontal,
  Star,
} from "lucide-react";

import {
  getMoviesByRegion,
  getTrending,
  getTrendingMovies,
} from "../services/tmdbService";
import MovieCard from "../components/Movie/MovieCard";
import Loader from "../components/common/Loader";
import "./TrendingPage.css";

const GENRES = [
  { id: "all", name: "Everything" },
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Horror" },
  { id: 878, name: "Sci-fi" },
  { id: 53, name: "Thriller" },
  { id: 10749, name: "Romance" },
  { id: 16, name: "Animation" },
];

function titleOf(movie) {
  return movie?.title || movie?.name || "Untitled";
}

function yearOf(movie) {
  return (
    movie?.release_date?.slice(0, 4) ||
    movie?.first_air_date?.slice(0, 4) ||
    "—"
  );
}

function rankKey(movie) {
  return `${movie.media_type || (movie.first_air_date ? "tv" : "movie")}-${movie.id}`;
}

function imageUrl(path, size = "w1280") {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : "";
}

function readWatchlist() {
  try {
    const value = JSON.parse(localStorage.getItem("cristal-watchlist") || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function TrendingHero({ movie }) {
  const [saved, setSaved] = useState(() =>
    readWatchlist().some((item) => item.id === movie?.id)
  );

  useEffect(() => {
    setSaved(readWatchlist().some((item) => item.id === movie?.id));
  }, [movie?.id]);

  if (!movie) return null;

  function toggleWatchlist() {
    const current = readWatchlist();
    const exists = current.some((item) => item.id === movie.id);
    const next = exists
      ? current.filter((item) => item.id !== movie.id)
      : [...current, movie];

    try {
      localStorage.setItem("cristal-watchlist", JSON.stringify(next));
      window.dispatchEvent(new Event("cristal-storage-update"));
      setSaved(!exists);
    } catch (error) {
      console.warn("Could not update watchlist:", error);
    }
  }

  return (
    <section className="trend-hero">
      <div
        className="trend-hero-image"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url("${imageUrl(movie.backdrop_path)}")`
            : undefined,
        }}
      />
      <div className="trend-hero-overlay" />

      <div className="trend-container trend-hero-inner">
        <motion.div
          className="trend-hero-content"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="trend-kicker">
            <Flame size={13} /> People are watching
          </p>

          <h1>{titleOf(movie)}</h1>

          <div className="trend-hero-meta">
            <span>{yearOf(movie)}</span>
            <span>•</span>
            <span className="trend-rating">
              <Star size={13} fill="currentColor" />
              {Number(movie.vote_average || 0).toFixed(1)}
            </span>
            <span>•</span>
            <span>{movie.media_type === "tv" ? "Series" : "Film"}</span>
          </div>

          <p className="trend-hero-description">
            {movie.overview || "A title that has caught people’s attention."}
          </p>

          <div className="trend-hero-buttons">
            <Link to={`/movie/${movie.id}`} className="trend-primary-button">
              <Play size={15} fill="currentColor" /> Open title
            </Link>

            <button
              type="button"
              onClick={toggleWatchlist}
              className={`trend-secondary-button ${saved ? "saved" : ""}`}
            >
              <Bookmark size={15} fill={saved ? "currentColor" : "none"} />
              {saved ? "Saved" : "Save for later"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function TopTenRail({ title, caption, icon: Icon, movies, accent }) {
  const [start, setStart] = useState(0);
  const visibleMovies = movies.slice(start, start + 10);

  function move(direction) {
    setStart((current) => {
      const next = current + direction * 5;
      return Math.max(0, Math.min(next, Math.max(0, movies.length - 10)));
    });
  }

  if (!movies.length) return null;

  return (
    <section className="trend-rail-section">
      <div className="trend-rail-header">
        <div className="trend-rail-heading">
          <div className={`trend-section-icon ${accent}`}>
            <Icon size={16} />
          </div>
          <div>
            <h2>{title}</h2>
            <p>{caption}</p>
          </div>
        </div>

        <div className="trend-rail-controls">
          <button type="button" onClick={() => move(-1)} disabled={start === 0} aria-label={`Previous ${title}`} className="trend-arrow">
            ‹
          </button>
          <button type="button" onClick={() => move(1)} disabled={start + 10 >= movies.length} aria-label={`Next ${title}`} className="trend-arrow">
            ›
          </button>
        </div>
      </div>

      <div className="trend-movie-rail">
        {visibleMovies.map((movie, index) => (
          <motion.div
            key={rankKey(movie)}
            className="trend-rail-card"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.3, delay: index * 0.025 }}
          >
            <span className="trend-rank-badge">
              {String(start + index + 1).padStart(2, "0")}
            </span>
            <MovieCard movie={movie} />
            <div className="trend-minimal-info">
              <Link to={`/movie/${movie.id}`} title={titleOf(movie)} className="trend-movie-title">
                {titleOf(movie)}
              </Link>
              <div className="trend-movie-meta">
                <span>{yearOf(movie)}</span>
                <span>·</span>
                <span className="trend-movie-rating">
                  <Star size={10} fill="currentColor" />
                  {Number(movie.vote_average || 0).toFixed(1)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FilterBar({ genre, setGenre, year, setYear, minimumRating, setMinimumRating }) {
  return (
    <div className="trend-filter-bar">
      <div className="trend-filter-label">
        <SlidersHorizontal size={15} /> Filter
      </div>

      <div className="trend-filter-scroll">
        {GENRES.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setGenre(String(item.id))}
            className={`trend-filter ${genre === String(item.id) ? "active" : ""}`}
          >
            {item.name}
          </button>
        ))}

        <select value={year} onChange={(event) => setYear(event.target.value)} className="trend-select" aria-label="Filter by year">
          <option value="all">Any year</option>
          <option value="2026">2026+</option>
          <option value="2024">2024+</option>
          <option value="2020">2020+</option>
        </select>

        <select value={minimumRating} onChange={(event) => setMinimumRating(Number(event.target.value))} className="trend-select" aria-label="Filter by rating">
          <option value="0">Any rating</option>
          <option value="6">6+</option>
          <option value="7">7+</option>
          <option value="7.5">7.5+</option>
          <option value="8">8+</option>
        </select>
      </div>
    </div>
  );
}

export default function TrendingPage() {
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [movies, setMovies] = useState([]);
  const [worldTopTen, setWorldTopTen] = useState([]);
  const [indiaTopTen, setIndiaTopTen] = useState([]);
  const [timeWindow, setTimeWindow] = useState("day");
  const [genre, setGenre] = useState("all");
  const [year, setYear] = useState("all");
  const [minimumRating, setMinimumRating] = useState(0);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadTrending() {
      setLoading(true);
      setError(false);
      setPage(1);

      try {
        const [trending, world, india] = await Promise.all([
          getTrending(timeWindow, 1),
          getTrendingMovies(),
          getMoviesByRegion("IN"),
        ]);

        if (!active) return;

        const trendingResults = Array.isArray(trending) ? trending : trending?.results || [];
        const worldResults = Array.isArray(world) ? world : world?.results || [];
        const indiaResults = Array.isArray(india) ? india : india?.results || [];

        setMovies(trendingResults);
        setWorldTopTen(worldResults);
        setIndiaTopTen(indiaResults);
        setHasMore((trending?.page || 1) < (trending?.total_pages || 1));
      } catch (requestError) {
        console.error("Trending page error:", requestError);
        if (active) setError(true);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadTrending();
    return () => {
      active = false;
    };
  }, [timeWindow]);

  const heroMovie = worldTopTen[0] || movies[0];

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const genreMatch = genre === "all" || movie.genre_ids?.includes(Number(genre));
      const yearMatch = year === "all" || Number(yearOf(movie)) >= Number(year);
      const ratingMatch = Number(movie.vote_average || 0) >= minimumRating;
      return genreMatch && yearMatch && ratingMatch;
    });
  }, [movies, genre, year, minimumRating]);

  async function loadMore() {
    if (loadingMore || !hasMore) return;

    const nextPage = page + 1;
    setLoadingMore(true);

    try {
      const result = await getTrending(timeWindow, nextPage);
      const next = Array.isArray(result) ? result : result?.results || [];

      setMovies((current) => {
        const existing = new Set(current.map(rankKey));
        return [...current, ...next.filter((movie) => !existing.has(rankKey(movie)))];
      });

      setPage(nextPage);
      setHasMore((result?.page || nextPage) < (result?.total_pages || nextPage));
    } catch (requestError) {
      console.error("Could not load more trending titles:", requestError);
    } finally {
      setLoadingMore(false);
    }
  }

  if (loading) {
    return (
      <main className="trending-page">
        <div className="trend-loading">
          <div className="trend-loading-hero" />
          <div className="trend-loading-row">
            {Array.from({ length: 7 }, (_, index) => (
              <div key={index} className="trend-loading-card" />
            ))}
          </div>
          <Loader text="Loading trending movies…" fullScreen={false} />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="trending-page">
        <section className="trend-error">
          <Flame size={38} />
          <h2>Trending is taking a moment</h2>
          <p>We could not load the latest titles. Please try again.</p>
          <button type="button" onClick={() => setTimeWindow((value) => (value === "day" ? "week" : "day"))} className="trend-primary-button">
            Try again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="trending-page">
      {heroMovie && <TrendingHero movie={heroMovie} />}

      <div className="trend-container trend-main">
        <section className="trend-heading-row">
          <div>
            <span className="trend-eyebrow">DISCOVER WHAT PEOPLE ARE WATCHING</span>
            <h2>Trending right now</h2>
          </div>

          <div className="trend-time-toggle">
            <button type="button" onClick={() => setTimeWindow("day")} className={timeWindow === "day" ? "active" : ""}>Today</button>
            <button type="button" onClick={() => setTimeWindow("week")} className={timeWindow === "week" ? "active" : ""}>This week</button>
          </div>
        </section>

        <TopTenRail title="Top 10 around the world" caption="What is getting attention everywhere." icon={Globe2} movies={worldTopTen} accent="red" />
        <TopTenRail title="Top 10 in India" caption="Popular films and series closer to home." icon={MapPin} movies={indiaTopTen} accent="purple" />

        {movies.length > 0 && (
          <section className="trend-all">
            <div className="trend-all-heading">
              <div>
                <span className="trend-eyebrow">{timeWindow === "day" ? "TODAY" : "THIS WEEK"}</span>
                <h2>Everything trending</h2>
              </div>
              <span className="trend-count">{filteredMovies.length} titles</span>
            </div>

            <FilterBar genre={genre} setGenre={setGenre} year={year} setYear={setYear} minimumRating={minimumRating} setMinimumRating={setMinimumRating} />

            {filteredMovies.length ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="trend-grid">
                {filteredMovies.map((movie, index) => (
                  <motion.div key={rankKey(movie)} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(index * 0.02, 0.25) }} className="trend-grid-card">
                    <MovieCard movie={movie} />
                    <div className="trend-grid-info">
                      <Link to={`/movie/${movie.id}`} title={titleOf(movie)} className="trend-grid-title">{titleOf(movie)}</Link>
                      <div className="trend-grid-meta">
                        <span>{yearOf(movie)}</span>
                        <span>·</span>
                        <span className="trend-grid-rating"><Star size={10} fill="currentColor" />{Number(movie.vote_average || 0).toFixed(1)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="trend-empty">Nothing matches these filters. Try widening the search.</div>
            )}

            {hasMore && (
              <div className="trend-load-more">
                <button type="button" disabled={loadingMore} onClick={loadMore} className="trend-secondary-button">
                  {loadingMore ? "Loading…" : "Load more titles"}
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}