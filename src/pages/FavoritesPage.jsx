import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Eye,
  EyeOff,
  Film,
  Heart,
  LogIn,
  Play,
  Plus,
  Search,
  Share2,
  Shuffle,
  Sparkles,
  Star,
  Tv,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "./FavoritePage.css";

const TMDB_IMAGE = "https://image.tmdb.org/t/p/w500";
const WATCHED_STORAGE_KEY = "cristal_watched_movies";

const STAFF_PICKS = [
  { id: 603, title: "The Matrix", year: "1999", rating: 8.2, poster: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", genre: "Action", media_type: "movie", tags: ["Trending"] },
  { id: 27205, title: "Inception", year: "2010", rating: 8.4, poster: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", genre: "Sci-Fi", media_type: "movie", tags: ["Highly rated"] },
  { id: 155, title: "The Dark Knight", year: "2008", rating: 9, poster: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", genre: "Crime", media_type: "movie", tags: ["Fan favorite"] },
  { id: 157336, title: "Interstellar", year: "2014", rating: 8.7, poster: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", genre: "Drama", media_type: "movie", tags: ["Trending"] },
  { id: 299536, title: "Avengers: Infinity War", year: "2018", rating: 8.2, poster: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", genre: "Action", media_type: "movie", tags: ["Popular"] },
  { id: 634649, title: "Spider-Man: No Way Home", year: "2021", rating: 8, poster: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", genre: "Action", media_type: "movie", tags: ["Trending"] },
  { id: 569094, title: "Spider-Man: Across the Spider-Verse", year: "2023", rating: 8.6, poster: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg", genre: "Animation", media_type: "movie", tags: ["Highly rated"] },
  { id: 438631, title: "Dune", year: "2021", rating: 8, poster: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", genre: "Sci-Fi", media_type: "movie", tags: ["Staff pick"] },
];

const GENRES = ["All", "Action", "Adventure", "Animation", "Comedy", "Crime", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller"];

function getPosterUrl(movie) {
  const poster = movie?.poster_path || movie?.poster || "";
  if (!poster) return null;
  return poster.startsWith("http") ? poster : `${TMDB_IMAGE}${poster}`;
}

function getYear(movie) {
  const date = movie?.release_date || movie?.first_air_date || movie?.year || "";
  return date ? String(date).slice(0, 4) : "—";
}

function getTitle(movie) {
  return movie?.title || movie?.name || "Untitled";
}

function getMediaType(movie) {
  if (movie?.media_type === "tv") return "tv";
  if (movie?.isAnime || movie?.media_type === "anime") return "anime";
  return "movie";
}

function getGenreNames(movie) {
  if (Array.isArray(movie?.genres)) {
    return movie.genres.map((item) => typeof item === "string" ? item : item?.name).filter(Boolean);
  }
  if (typeof movie?.genre === "string") return movie.genre.split("•").map((item) => item.trim()).filter(Boolean);
  return [];
}

function getRating(movie) {
  return Number(movie?.vote_average ?? movie?.rating ?? 0);
}

function readWatchedIds() {
  if (typeof window === "undefined") return [];
  try {
    const value = JSON.parse(window.localStorage.getItem(WATCHED_STORAGE_KEY) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function StreamingBadges({ movie }) {
  const streaming = movie?.streaming;
  if (!streaming) return null;
  const providers = [
    streaming.netflix && { name: "Netflix", className: "provider-netflix", short: "N" },
    streaming.prime && { name: "Prime", className: "provider-prime", short: "P" },
    streaming.hulu && { name: "Hulu", className: "provider-hulu", short: "H" },
  ].filter(Boolean);
  if (!providers.length) return null;

  return <div className="provider-row">{providers.map((provider) => <span key={provider.name} title={`Available on ${provider.name}`} className={`provider-badge ${provider.className}`}>{provider.short}</span>)}</div>;
}

function EmptyCinemaIllustration() {
  return <motion.div className="empty-cinema" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}><motion.div className="empty-orbit" animate={{ rotate: 360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} /><motion.div className="empty-reel" animate={{ rotate: [0, 8, -8, 0], y: [0, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}><Clapperboard size={55} /></motion.div><div className="empty-spark spark-one">✦</div><div className="empty-spark spark-two">✦</div><div className="empty-spark spark-three">•</div></motion.div>;
}

function RecommendationCard({ movie, onOpen, onAdd }) {
  return <motion.article className="recommendation-card" whileHover={{ y: -7 }}><button type="button" className="recommendation-poster" onClick={() => onOpen(movie)}><img src={getPosterUrl(movie)} alt={movie.title} loading="lazy" /><div className="recommendation-overlay" /><div className="recommendation-rating"><Star size={11} fill="currentColor" />{getRating(movie).toFixed(1)}</div><div className="recommendation-play"><Play size={15} fill="currentColor" /></div></button><div className="recommendation-info"><div className="recommendation-tag">{movie.tags?.[0] || "Staff pick"}</div><h3>{movie.title}</h3><p>{movie.year} · {movie.genre}</p><button type="button" className="recommendation-add" onClick={() => onAdd(movie)}><Plus size={14} /> Add to favorites</button></div></motion.article>;
}

function FavoriteCard({ movie, isWatched, onToggleWatched, onRemove, onOpen }) {
  const title = getTitle(movie);
  const poster = getPosterUrl(movie);
  const rating = getRating(movie);
  const mediaType = getMediaType(movie);
  const genres = getGenreNames(movie);

  return <motion.article className={`favorite-card ${isWatched ? "favorite-card-watched" : ""}`} layout whileHover={{ y: -6 }}><div className="favorite-poster"><button type="button" className="favorite-poster-button" onClick={() => onOpen(movie)} aria-label={`Open ${title}`}>{poster ? <img src={poster} alt={title} loading="lazy" /> : <div className="favorite-poster-fallback"><Film size={35} /></div>}<div className="favorite-poster-gradient" /><div className="favorite-rating"><Star size={11} fill="currentColor" />{rating ? rating.toFixed(1) : "N/A"}</div>{isWatched && <div className="watched-badge"><Check size={12} /> Watched</div>}<div className="favorite-play"><Play size={15} fill="currentColor" /></div></button><div className="favorite-hover-actions"><button type="button" title={isWatched ? "Mark as unwatched" : "Mark as watched"} className={`quick-action ${isWatched ? "quick-action-active" : ""}`} onClick={() => onToggleWatched(movie.id)}>{isWatched ? <EyeOff size={17} /> : <Eye size={17} />}</button><button type="button" title="Remove from favorites" className="quick-action quick-action-danger" onClick={() => onRemove(movie.id)}><Heart size={17} fill="currentColor" /></button></div></div><div className="favorite-card-content"><div className="favorite-card-top"><div className="favorite-title-wrap"><h3 title={title}>{title}</h3><p>{getYear(movie)} · {mediaType === "tv" ? "TV" : mediaType === "anime" ? "Anime" : "Movie"}</p></div><div className="favorite-heart"><Heart size={15} fill="currentColor" /></div></div><div className="favorite-meta"><span>{genres[0] || movie?.genre || "Movie"}</span><StreamingBadges movie={movie} /></div></div></motion.article>;
}

export default function FavoritePage() {
  const navigate = useNavigate();
  const { favorites = [], toggleFavorite } = useFavorites();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [activeGenre, setActiveGenre] = useState("All");
  const [activeTab, setActiveTab] = useState("all");
  const [watchedIds, setWatchedIds] = useState(readWatchedIds);
  const [recommendationIndex, setRecommendationIndex] = useState(0);

  useEffect(() => {
    window.localStorage.setItem(WATCHED_STORAGE_KEY, JSON.stringify(watchedIds));
  }, [watchedIds]);

  function toggleWatched(id) {
    setWatchedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  const filteredFavorites = useMemo(() => {
    let movies = [...favorites];
    const query = search.trim().toLowerCase();
    if (query) movies = movies.filter((movie) => getTitle(movie).toLowerCase().includes(query) || getGenreNames(movie).join(" ").toLowerCase().includes(query));
    if (activeTab !== "all") movies = movies.filter((movie) => getMediaType(movie) === activeTab);
    if (activeGenre !== "All") movies = movies.filter((movie) => getGenreNames(movie).some((item) => item.toLowerCase().includes(activeGenre.toLowerCase())) || String(movie?.genre || "").toLowerCase().includes(activeGenre.toLowerCase()));

    if (sortBy === "alphabetical") movies.sort((a, b) => getTitle(a).localeCompare(getTitle(b)));
    if (sortBy === "year") movies.sort((a, b) => Number(getYear(b)) - Number(getYear(a)));
    if (sortBy === "rating") movies.sort((a, b) => getRating(b) - getRating(a));
    return movies;
  }, [favorites, search, activeGenre, activeTab, sortBy]);

  const watchedFavoriteCount = favorites.filter((movie) => watchedIds.includes(movie.id)).length;
  const progress = favorites.length ? Math.round((watchedFavoriteCount / favorites.length) * 100) : 0;
  const visibleRecommendations = useMemo(() => Array.from({ length: Math.min(4, STAFF_PICKS.length) }, (_, index) => STAFF_PICKS[(recommendationIndex + index) % STAFF_PICKS.length]), [recommendationIndex]);
  const isEmpty = favorites.length === 0;

  function openMovie(movie) {
    navigate(`/movie/${movie.id}`);
  }

  function addRecommendation(movie) {
    toggleFavorite({ ...movie, poster_path: movie.poster_path || movie.poster, vote_average: movie.vote_average || movie.rating, release_date: movie.release_date || `${movie.year}-01-01` });
  }

  function surpriseMe() {
    const unwatched = favorites.filter((movie) => !watchedIds.includes(movie.id));
    const source = unwatched.length ? unwatched : favorites.length ? favorites : STAFF_PICKS;
    openMovie(source[Math.floor(Math.random() * source.length)]);
  }

  async function shareFavorites() {
    if (!favorites.length) return;
    const ids = favorites.map((movie) => movie.id).join(",");
    const shareUrl = `${window.location.origin}/favorites?shared=${encodeURIComponent(ids)}`;
    const shareData = { title: "My CRISTAL Favorites", text: "Check out my CRISTAL favorite movies 🎬", url: shareUrl };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      window.alert("Favorites link copied!");
    } catch {
      window.prompt("Copy your favorites link:", shareUrl);
    }
  }

  function clearFilters() {
    setSearch("");
    setActiveGenre("All");
    setActiveTab("all");
  }

  return <main className="favorite-page"><div className="favorite-background"><div className="favorite-glow favorite-glow-one" /><div className="favorite-glow favorite-glow-two" /><div className="favorite-grid-bg" /></div><section className="favorite-header"><div className="favorite-container"><div className="favorite-header-row"><div><div className="favorite-eyebrow"><Sparkles size={13} /> Your cinematic collection</div><h1>My <span>Favorites.</span></h1><p>Keep the movies and shows you never want to forget.</p></div>{!isEmpty && <div className="favorite-header-actions"><button type="button" className="share-favorites-btn" onClick={shareFavorites}><Share2 size={16} /> Share my favorites</button><button type="button" className="surprise-btn" onClick={surpriseMe}><Shuffle size={16} /> Surprise me</button></div>}</div><div className="favorite-stats"><motion.div className="favorite-stat" whileHover={{ y: -3 }}><Heart size={20} className="stat-heart" fill="currentColor" /><strong>{favorites.length}</strong><span>Favorite movies</span></motion.div><motion.div className="favorite-stat" whileHover={{ y: -3 }}><Eye size={20} className="stat-eye" /><strong>{watchedFavoriteCount}</strong><span>Watched</span></motion.div><motion.div className="favorite-stat" whileHover={{ y: -3 }}><Sparkles size={20} className="stat-spark" /><strong>{progress}%</strong><span>Collection progress</span></motion.div></div>{!isEmpty && <div className="watch-progress"><div className="watch-progress-top"><span>Your viewing progress</span><strong>{watchedFavoriteCount} / {favorites.length} watched</strong></div><div className="watch-progress-track"><motion.div className="watch-progress-fill" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, ease: "easeOut" }} /></div></div>}</div></section>{isEmpty ? <section className="favorite-empty-section"><motion.div className="favorite-empty-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}><EmptyCinemaIllustration /><div className="empty-eyebrow">Your collection is waiting</div><h2>No favorite movies <span>yet.</span></h2><p>Your favorite movies will appear here. Start building a collection of stories you never want to lose.</p><div className="login-sync-card"><div className="login-sync-icon"><LogIn size={18} /></div><div><strong>Save your collection</strong><span>Log in to save and sync your favorites across all devices.</span></div><button type="button" onClick={() => navigate("/login")}>Log in <ArrowRight size={14} /></button></div><motion.button type="button" className="empty-browse-btn" onClick={() => navigate("/movies")} animate={{ boxShadow: ["0 0 0 rgba(255,207,85,0)", "0 0 35px rgba(255,207,85,.16)", "0 0 0 rgba(255,207,85,0)"] }} transition={{ duration: 2.5, repeat: Infinity }} whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}><Film size={17} /> Browse movies <ArrowRight size={16} /></motion.button></motion.div><div className="favorite-recommendations"><div className="recommendations-header"><div><div className="favorite-eyebrow"><Sparkles size={12} /> Trending now</div><h3>Start with something great.</h3><p>Hand-picked recommendations to begin your collection.</p></div><div className="recommendation-controls"><button type="button" onClick={() => setRecommendationIndex((value) => (value - 1 + STAFF_PICKS.length) % STAFF_PICKS.length)} aria-label="Previous"><ChevronLeft size={18} /></button><button type="button" onClick={() => setRecommendationIndex((value) => (value + 1) % STAFF_PICKS.length)} aria-label="Next"><ChevronRight size={18} /></button></div></div><div className="recommendation-grid"><AnimatePresence mode="popLayout">{visibleRecommendations.map((movie, index) => <motion.div key={`${movie.id}-${recommendationIndex}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ delay: index * 0.04 }}><RecommendationCard movie={movie} onOpen={openMovie} onAdd={addRecommendation} /></motion.div>)}</AnimatePresence></div></div></section> : <section className="favorite-content"><div className="favorite-container"><div className="favorite-toolbar"><div className="favorite-search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search favorites..." />{search && <button type="button" onClick={() => setSearch("")} aria-label="Clear search"><X size={14} /></button>}</div><select value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="recent">Recently added</option><option value="alphabetical">Alphabetical</option><option value="year">Release year</option><option value="rating">Highest rated</option></select></div><div className="media-tabs">{[{ id: "all", label: "All", icon: Sparkles }, { id: "movie", label: "Movies", icon: Film }, { id: "tv", label: "TV shows", icon: Tv }, { id: "anime", label: "Anime", icon: Sparkles }].map((tab) => { const Icon = tab.icon; return <button key={tab.id} type="button" className={activeTab === tab.id ? "media-tab active" : "media-tab"} onClick={() => setActiveTab(tab.id)}><Icon size={14} />{tab.label}</button>; })}</div><div className="genre-filter"><span>Genre</span><div className="genre-pills">{GENRES.map((item) => <button key={item} type="button" className={activeGenre === item ? "genre-pill active" : "genre-pill"} onClick={() => setActiveGenre(item)}>{item}</button>)}</div></div><div className="results-header"><div><span>Your collection</span><h2>{filteredFavorites.length} {filteredFavorites.length === 1 ? "favorite" : "favorites"}</h2></div><button type="button" className="results-share" onClick={shareFavorites}><Share2 size={15} /> Share</button></div>{filteredFavorites.length ? <motion.div layout className="favorites-grid"><AnimatePresence>{filteredFavorites.map((movie) => <FavoriteCard key={movie.id} movie={movie} isWatched={watchedIds.includes(movie.id)} onToggleWatched={toggleWatched} onRemove={toggleFavorite} onOpen={openMovie} />)}</AnimatePresence></motion.div> : <div className="no-results"><Search size={30} /><h3>Nothing found</h3><p>Try changing your search or filters.</p><button type="button" onClick={clearFilters}>Clear filters</button></div>}</div></section>}<footer className="favorite-footer"><Bookmark size={14} /><span>CRISTAL · Your stories, your collection.</span></footer></main>;
}