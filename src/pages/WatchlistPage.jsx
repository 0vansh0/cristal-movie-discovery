import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Bookmark,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CirclePlay,
  Clapperboard,
  Film,
  Folder,
  Heart,
  Plus,
  Search,
  Sparkles,
  Star,
  Trash2,
  Tv,
  X,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useFavorites } from "../context/FavoritesContext";
import "./WatchlistPage.css";

const TMDB_IMAGE = "https://image.tmdb.org/t/p/w500";

const QUICK_PICKS = [
  { id: 603, title: "The Matrix", year: "1999", rating: 8.2, runtime: 136, genres: ["Action", "Sci-Fi"], poster: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", tag: "Highly rated" },
  { id: 27205, title: "Inception", year: "2010", rating: 8.4, runtime: 148, genres: ["Sci-Fi", "Thriller"], poster: "/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg", tag: "A good puzzle" },
  { id: 155, title: "The Dark Knight", year: "2008", rating: 9, runtime: 152, genres: ["Action", "Crime"], poster: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg", tag: "Highly rated" },
  { id: 157336, title: "Interstellar", year: "2014", rating: 8.7, runtime: 169, genres: ["Adventure", "Drama"], poster: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", tag: "One for the evening" },
  { id: 299536, title: "Avengers: Infinity War", year: "2018", rating: 8.2, runtime: 149, genres: ["Action", "Adventure"], poster: "/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", tag: "Big and loud" },
  { id: 634649, title: "Spider-Man: No Way Home", year: "2021", rating: 8, runtime: 148, genres: ["Action", "Adventure"], poster: "/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", tag: "Popular pick" },
  { id: 569094, title: "Spider-Man: Across the Spider-Verse", year: "2023", rating: 8.6, runtime: 140, genres: ["Animation", "Action"], poster: "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg", tag: "Highly rated" },
  { id: 438631, title: "Dune", year: "2021", rating: 8, runtime: 155, genres: ["Sci-Fi", "Drama"], poster: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg", tag: "Worth the time" },
];

const GENRES = ["Action", "Adventure", "Animation", "Comedy", "Crime", "Drama", "Fantasy", "Horror", "Romance", "Sci-Fi", "Thriller", "Documentary"];
const COLLECTION_EMOJIS = ["🎬", "🍿", "👻", "❤️", "🌙", "🔥", "🚀", "🎭"];

function getPosterUrl(movie) {
  const poster = movie?.poster_path || movie?.poster || "";
  if (!poster) return null;
  return poster.startsWith("http") ? poster : `${TMDB_IMAGE}${poster}`;
}

function getYear(movie) {
  const value = movie?.release_date || movie?.first_air_date || movie?.year || "";
  return value ? String(value).slice(0, 4) : "—";
}

function getRuntime(movie) {
  return Number(movie?.runtime || movie?.runtime_minutes || 0);
}

function getGenres(movie) {
  if (Array.isArray(movie?.genres)) {
    return movie.genres.map((item) => typeof item === "string" ? item : item?.name).filter(Boolean);
  }

  if (typeof movie?.genre === "string") {
    return movie.genre.split("•").map((item) => item.trim()).filter(Boolean);
  }

  return [];
}

function getProviders(movie) {
  const value = movie?.watchProviders || movie?.watch_providers || movie?.providers || movie?.streamingProviders || [];
  if (!Array.isArray(value)) return [];

  return value.map((provider) => {
    if (typeof provider === "string") return { name: provider, logo: null };
    return { name: provider?.name || provider?.provider_name || provider?.providerName || "", logo: provider?.logo_path || provider?.logo || null };
  }).filter((provider) => provider.name);
}

function AnimatedNumber({ value, duration = 700 }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const target = Number(value) || 0;
    if (target === display) return undefined;

    let current = 0;
    const timer = window.setInterval(() => {
      current += Math.max(1, Math.ceil(target / 20));
      if (current >= target) {
        current = target;
        window.clearInterval(timer);
      }
      setDisplay(current);
    }, duration / 20);

    return () => window.clearInterval(timer);
  }, [value]);

  return display;
}

function StreamingBadges({ movie }) {
  const providers = getProviders(movie);
  if (!providers.length) return <span className="provider-unknown">Availability unavailable</span>;

  return (
    <div className="streaming-badges">
      {providers.slice(0, 3).map((provider) => (
        <span className="provider-badge" key={provider.name} title={`Available on ${provider.name}`}>
          {provider.logo ? <img src={provider.logo.startsWith("http") ? provider.logo : `https://image.tmdb.org/t/p/w92${provider.logo}`} alt="" /> : <Tv size={11} />}
          <span>{provider.name.replace("Amazon Prime Video", "Prime").replace("Netflix Standard with Ads", "Netflix").slice(0, 13)}</span>
        </span>
      ))}
    </div>
  );
}

function QuickActions({ movie, watched, favorite, onWatched, onFavorite, onRemove, onOpen, onCollection }) {
  return (
    <div className="watchlist-quick-actions">
      <button type="button" onClick={() => onWatched(movie.id)} className={watched ? "quick-action active" : "quick-action"} title={watched ? "Mark unwatched" : "Mark watched"}>{watched ? <Check size={15} /> : <CirclePlay size={15} />}</button>
      <button type="button" onClick={() => onFavorite(movie)} className={favorite ? "quick-action favorite-active" : "quick-action"} title="Favorite"><Heart size={15} fill={favorite ? "currentColor" : "none"} /></button>
      <button type="button" onClick={() => onCollection(movie)} className="quick-action" title="Add to collection"><Folder size={15} /></button>
      <button type="button" onClick={() => onOpen(movie.id)} className="quick-action" title="View movie"><ArrowRight size={15} /></button>
      <button type="button" onClick={() => onRemove(movie.id)} className="quick-action danger" title="Remove"><Trash2 size={15} /></button>
    </div>
  );
}

function WatchlistMovieCard({ movie, watched, favorite, onWatched, onFavorite, onRemove, onOpen, onCollection }) {
  const poster = getPosterUrl(movie);
  const title = movie.title || movie.name || "Untitled";

  return (
    <motion.article layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.92 }} whileHover={{ y: -5 }} className={`watchlist-movie-card ${watched ? "movie-watched" : ""}`}>
      <div className="watchlist-poster">
        {poster ? <img src={poster} alt={title} loading="lazy" /> : <div className="poster-fallback"><Film size={35} /></div>}
        <div className="poster-gradient" />
        {watched && <div className="watched-badge"><Check size={12} /> Watched</div>}
        <div className="rating-badge"><Star size={11} fill="currentColor" />{Number(movie.vote_average || movie.rating || 0).toFixed(1)}</div>
        <QuickActions movie={movie} watched={watched} favorite={favorite} onWatched={onWatched} onFavorite={onFavorite} onRemove={onRemove} onOpen={onOpen} onCollection={onCollection} />
      </div>
      <div className="watchlist-card-info">
        <div className="movie-title-row"><h3 title={title}>{title}</h3>{favorite && <Heart size={14} className="favorite-icon" fill="currentColor" />}</div>
        <div className="movie-meta"><span>{getYear(movie)}</span>{getRuntime(movie) > 0 && <><span>•</span><span>{getRuntime(movie)} min</span></>}</div>
        <div className="movie-genres">{getGenres(movie).slice(0, 2).map((item) => <span key={item}>{item}</span>)}</div>
        <StreamingBadges movie={movie} />
      </div>
    </motion.article>
  );
}

function CollectionModal({ movie, collections, onClose, onCreate, onAdd, onRemove, isInCollection }) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("🎬");
  if (!movie) return null;

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="collection-modal">
        <div className="modal-header"><div><span className="modal-eyebrow">ORGANIZE</span><h2>Add to collection</h2></div><button type="button" onClick={onClose} className="modal-close" aria-label="Close"><X size={18} /></button></div>
        <div className="modal-movie">{getPosterUrl(movie) ? <img src={getPosterUrl(movie)} alt="" /> : <Film size={22} />}<div><strong>{movie.title || movie.name}</strong><span>{getYear(movie)}</span></div></div>
        <div className="collection-list">{collections.length === 0 ? <div className="collection-empty"><Folder size={25} /><p>No collections yet.</p></div> : collections.map((collection) => { const selected = isInCollection(collection.id, movie.id); return <button key={collection.id} type="button" onClick={() => selected ? onRemove(collection.id, movie.id) : onAdd(collection.id, movie.id)} className={`collection-row ${selected ? "selected" : ""}`}><span className="collection-emoji">{collection.emoji}</span><span className="collection-name">{collection.name}</span>{selected && <Check size={17} />}</button>; })}</div>
        <div className="create-collection"><div className="create-title"><Plus size={15} /> New collection</div><div className="emoji-picker">{COLLECTION_EMOJIS.map((item) => <button key={item} type="button" onClick={() => setEmoji(item)} className={emoji === item ? "emoji-selected" : ""}>{item}</button>)}</div><div className="create-row"><input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. Date night" onKeyDown={(event) => { if (event.key === "Enter" && name.trim()) { onCreate(name.trim(), emoji); setName(""); } }} /><button type="button" disabled={!name.trim()} onClick={() => { onCreate(name.trim(), emoji); setName(""); }}>Create</button></div></div>
      </motion.div>
    </div>
  );
}

function SurpriseModal({ movie, onClose, onAdd, onOpen }) {
  if (!movie) return null;
  return <div className="modal-backdrop"><motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} className="surprise-modal"><button type="button" onClick={onClose} className="modal-close surprise-close" aria-label="Close"><X size={18} /></button><div className="surprise-icon"><Zap size={28} /></div><span className="modal-eyebrow">A SMALL SUGGESTION</span><h2>Maybe watch this.</h2>{getPosterUrl(movie) && <img src={getPosterUrl(movie)} alt={movie.title} className="surprise-poster" />}<h3>{movie.title || movie.name}</h3><div className="surprise-rating"><Star size={14} fill="currentColor" />{Number(movie.vote_average || movie.rating || 0).toFixed(1)}<span>•</span>{getYear(movie)}</div><div className="surprise-actions"><button type="button" onClick={() => onAdd(movie)} className="primary-button"><Bookmark size={16} /> Save it</button><button type="button" onClick={() => onOpen(movie.id)} className="secondary-button">View movie <ArrowRight size={15} /></button></div></motion.div></div>;
}

function GenreQuiz({ onComplete }) {
  const [selected, setSelected] = useState([]);
  function toggleGenre(genre) {
    setSelected((current) => current.includes(genre) ? current.filter((item) => item !== genre) : current.length >= 3 ? current : [...current, genre]);
  }
  return <div className="genre-quiz"><div className="quiz-icon"><Sparkles size={19} /></div><div className="quiz-content"><span className="quiz-eyebrow">A QUICK QUESTION</span><h3>What are you in the mood for?</h3><p>Pick up to three genres.</p><div className="genre-options">{GENRES.map((item) => <button key={item} type="button" onClick={() => toggleGenre(item)} className={selected.includes(item) ? "genre-option active" : "genre-option"}>{selected.includes(item) && <Check size={12} />}{item}</button>)}</div><button type="button" disabled={!selected.length} onClick={() => onComplete(selected)} className="quiz-button">Show picks <ArrowRight size={15} /></button></div></div>;
}

function QuickPickCard({ movie, onOpen, onAdd }) {
  return <motion.article whileHover={{ y: -5 }} className="quick-pick-card"><div className="quick-pick-poster"><img src={getPosterUrl(movie)} alt={movie.title} loading="lazy" /><div className="quick-pick-gradient" /><span className="quick-pick-tag">{movie.tag}</span><div className="quick-pick-rating"><Star size={10} fill="currentColor" />{movie.rating.toFixed(1)}</div><button type="button" className="quick-pick-play" onClick={() => onOpen(movie.id)} aria-label={`Open ${movie.title}`}><CirclePlay size={18} fill="currentColor" /></button></div><div className="quick-pick-info"><h4>{movie.title}</h4><p>{movie.year} • {movie.genres.join(" • ")}</p><button type="button" onClick={() => onAdd(movie)} className="quick-add-button"><Plus size={14} /> Save</button></div></motion.article>;
}

export default function WatchlistPage() {
  const navigate = useNavigate();
  const { watchlist, favorites, watched, collections, streamingAlerts, stats, removeFromWatchlist, toggleFavorite, toggleWatchlist, toggleWatched, isWatched, createCollection, deleteCollection, addToCollection, removeFromCollection, isMovieInCollection, toggleStreamingAlerts } = useFavorites();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [genre, setGenre] = useState("all");
  const [runtime, setRuntime] = useState("all");
  const [rating, setRating] = useState("all");
  const [selectedCollection, setSelectedCollection] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [collectionMovie, setCollectionMovie] = useState(null);
  const [surpriseMovie, setSurpriseMovie] = useState(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizGenres, setQuizGenres] = useState([]);
  const [quickPickIndex, setQuickPickIndex] = useState(0);
  const [showCollections, setShowCollections] = useState(false);

  const favoriteIds = useMemo(() => favorites.map((movie) => movie.id), [favorites]);

  const filteredMovies = useMemo(() => {
    let movies = [...watchlist];
    const query = search.trim().toLowerCase();
    if (query) movies = movies.filter((movie) => (movie.title || movie.name || "").toLowerCase().includes(query) || getGenres(movie).join(" ").toLowerCase().includes(query));
    if (genre !== "all") movies = movies.filter((movie) => getGenres(movie).some((item) => item.toLowerCase() === genre.toLowerCase()));
    if (runtime !== "all") movies = movies.filter((movie) => { const value = getRuntime(movie); return runtime === "under90" ? value > 0 && value < 90 : runtime === "90to120" ? value >= 90 && value <= 120 : runtime === "120plus" ? value > 120 : true; });
    if (rating !== "all") movies = movies.filter((movie) => Number(movie.vote_average || movie.rating || 0) >= Number(rating));
    if (selectedCollection !== "all") { const selected = collections.find((item) => item.id === selectedCollection); const ids = selected?.movieIds || []; movies = movies.filter((movie) => ids.includes(movie.id)); }

    movies.sort((a, b) => {
      if (sortBy === "rating") return Number(b.vote_average || b.rating || 0) - Number(a.vote_average || a.rating || 0);
      if (sortBy === "newest") return String(b.release_date || b.first_air_date || b.year || "").localeCompare(String(a.release_date || a.first_air_date || a.year || ""));
      if (sortBy === "runtime") return getRuntime(b) - getRuntime(a);
      if (sortBy === "watched") return Number(isWatched(b.id)) - Number(isWatched(a.id));
      return (a.title || a.name || "").localeCompare(b.title || b.name || "");
    });
    return movies;
  }, [watchlist, favorites, search, genre, runtime, rating, selectedCollection, collections, sortBy, watched]);

  const personalizedPicks = useMemo(() => {
    if (!quizGenres.length) return QUICK_PICKS;
    const matches = QUICK_PICKS.filter((movie) => movie.genres.some((item) => quizGenres.includes(item)));
    return matches.length ? matches : QUICK_PICKS;
  }, [quizGenres]);

  const visibleQuickPicks = useMemo(() => Array.from({ length: Math.min(4, personalizedPicks.length) }, (_, index) => personalizedPicks[(quickPickIndex + index) % personalizedPicks.length]), [personalizedPicks, quickPickIndex]);

  function surpriseMe() {
    const pool = personalizedPicks.filter((movie) => !watchlist.some((item) => item.id === movie.id));
    const source = pool.length ? pool : personalizedPicks;
    setSurpriseMovie(source[Math.floor(Math.random() * source.length)]);
  }

  function handleEmptySearch(event) {
    event.preventDefault();
    const query = search.trim();
    navigate(query ? `/movies?search=${encodeURIComponent(query)}` : "/movies");
  }

  function clearFilters() {
    setSearch("");
    setGenre("all");
    setRuntime("all");
    setRating("all");
    setSelectedCollection("all");
  }

  const filterCount = Number(genre !== "all") + Number(runtime !== "all") + Number(rating !== "all") + Number(selectedCollection !== "all");

  return (
    <main className="watchlist-page">
      <div className="watchlist-background"><div className="bg-orb orb-one" /><div className="bg-orb orb-two" /><div className="bg-grid" /></div>

      <section className="watchlist-hero"><div className="watchlist-container"><div className="hero-top"><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}><div className="hero-eyebrow"><Sparkles size={13} /> YOUR WATCHLIST</div><h1>Things to watch <span>later.</span></h1><p>A simple place for the movies you do not want to forget.</p></motion.div><div className="hero-actions"><button type="button" onClick={surpriseMe} className="surprise-button"><Zap size={16} /> Surprise me</button><button type="button" onClick={() => setShowCollections((value) => !value)} className="collection-button"><Folder size={16} /> Collections</button></div></div>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="progress-panel"><div className="progress-header"><div><span className="progress-label">WATCH PROGRESS</span><strong>{stats.watched} of {stats.total} watched</strong></div><div className="progress-percent">{stats.progress}%</div></div><div className="progress-track"><motion.div initial={{ width: 0 }} animate={{ width: `${stats.progress}%` }} transition={{ duration: 0.8 }} className="progress-fill" /></div><div className="progress-footer"><span>{stats.remaining} movies remaining</span><span>{stats.progress === 100 ? <><Check size={13} /> Collection complete</> : "One film at a time."}</span></div></motion.div>
        <div className="watchlist-stats">{[[Film, stats.total, "Saved", "yellow"], [Heart, stats.favorites, "Favorites", "red"], [Check, stats.watched, "Watched", "green"], [Folder, collections.length, "Collections", "purple"]].map(([Icon, value, label, color]) => <motion.div whileHover={{ y: -3 }} className="watch-stat" key={label}><div className={`watch-stat-icon ${color}`}><Icon size={18} /></div><div><strong><AnimatedNumber value={value} /></strong><span>{label}</span></div></motion.div>)}</div>
      </div></section>

      <AnimatePresence>{showCollections && <motion.section initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="collection-drawer"><div className="watchlist-container"><div className="collection-drawer-header"><div><span>ORGANIZE YOUR MOVIES</span><h2>Your collections</h2></div><button type="button" onClick={() => { const name = window.prompt("Collection name"); if (name?.trim()) createCollection(name.trim()); }} className="new-collection-button"><Plus size={15} /> New collection</button></div><div className="collection-chips"><button type="button" onClick={() => setSelectedCollection("all")} className={selectedCollection === "all" ? "collection-chip active" : "collection-chip"}>All movies</button>{collections.map((collection) => <div key={collection.id} className="collection-chip-wrapper"><button type="button" onClick={() => setSelectedCollection(collection.id)} className={selectedCollection === collection.id ? "collection-chip active" : "collection-chip"}><span>{collection.emoji}</span>{collection.name}<small>{collection.movieIds?.length || 0}</small></button><button type="button" className="delete-collection" title="Delete collection" onClick={() => { if (window.confirm(`Delete "${collection.name}"?`)) { deleteCollection(collection.id); if (selectedCollection === collection.id) setSelectedCollection("all"); } }}><Trash2 size={12} /></button></div>)}</div></div></motion.section>}</AnimatePresence>

      <section className="watchlist-toolbar-section"><div className="watchlist-container"><div className="watchlist-toolbar"><div className="watch-search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search your watchlist..." />{search && <button type="button" onClick={() => setSearch("")} aria-label="Clear search"><X size={15} /></button>}</div><button type="button" onClick={() => setShowFilters((value) => !value)} className={`filter-button ${showFilters ? "active" : ""}`}><Sparkles size={15} /> Filters{filterCount > 0 && <span>{filterCount}</span>}</button><div className="sort-control"><span>Sort</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value)}><option value="title">A → Z</option><option value="rating">Highest rated</option><option value="newest">Newest</option><option value="runtime">Longest</option><option value="watched">Watched first</option></select><ChevronDown size={14} /></div></div>
        <AnimatePresence>{showFilters && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="advanced-filters"><div className="filter-field"><label>Genre</label><select value={genre} onChange={(event) => setGenre(event.target.value)}><option value="all">All genres</option>{GENRES.map((item) => <option key={item} value={item}>{item}</option>)}</select></div><div className="filter-field"><label>Runtime</label><select value={runtime} onChange={(event) => setRuntime(event.target.value)}><option value="all">Any runtime</option><option value="under90">Under 90 min</option><option value="90to120">90–120 min</option><option value="120plus">120+ min</option></select></div><div className="filter-field"><label>Rating</label><select value={rating} onChange={(event) => setRating(event.target.value)}><option value="all">Any rating</option><option value="7">7.0+</option><option value="8">8.0+</option><option value="8.5">8.5+</option><option value="9">9.0+</option></select></div><div className="filter-field"><label>Collection</label><select value={selectedCollection} onChange={(event) => setSelectedCollection(event.target.value)}><option value="all">All movies</option>{collections.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select></div>{filterCount > 0 && <button type="button" onClick={clearFilters} className="clear-filters"><X size={14} /> Clear</button>}</motion.div>}</AnimatePresence>
      </div></section>

      <section className="notification-section"><div className="watchlist-container"><div className="notification-card"><div className="notification-icon"><Bell size={18} /></div><div className="notification-copy"><strong>Availability alerts</strong><span>Get a reminder when saved titles change streaming availability.</span></div><button type="button" onClick={toggleStreamingAlerts} className={streamingAlerts ? "notification-toggle enabled" : "notification-toggle"}><span />{streamingAlerts ? "Enabled" : "Enable alerts"}</button></div></div></section>

      <section className="watchlist-content"><div className="watchlist-container">{filteredMovies.length > 0 ? <><div className="section-heading"><div><span>YOUR COLLECTION</span><h2>{selectedCollection !== "all" ? collections.find((item) => item.id === selectedCollection)?.name || "Watchlist" : "Saved movies"}</h2></div><p>Showing <strong>{filteredMovies.length}</strong> of <strong>{watchlist.length}</strong></p></div><motion.div layout className="watchlist-grid"><AnimatePresence>{filteredMovies.map((movie) => <WatchlistMovieCard key={movie.id} movie={movie} watched={isWatched(movie.id)} favorite={favoriteIds.includes(movie.id)} onWatched={toggleWatched} onFavorite={toggleFavorite} onRemove={removeFromWatchlist} onOpen={(id) => navigate(`/movie/${id}`)} onCollection={setCollectionMovie} />)}</AnimatePresence></motion.div></> : <div className="empty-watchlist"><div className="empty-card"><div className="empty-icon"><Clapperboard size={40} /></div><span className="empty-eyebrow">{watchlist.length === 0 ? "A BLANK CANVAS" : "NOTHING MATCHED"}</span><h2>{watchlist.length === 0 ? "Your watchlist is empty." : "No movies found."}</h2><p>{watchlist.length === 0 ? "Find something you will enjoy, or let CRISTAL choose for you." : "Try changing your filters."}</p>{watchlist.length === 0 ? <><form className="empty-search" onSubmit={handleEmptySearch}><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search for a movie..." /><button type="submit">Search <ArrowRight size={15} /></button></form><div className="empty-actions"><button type="button" onClick={() => setShowQuiz((value) => !value)} className="quiz-launch"><Sparkles size={15} /> Find something</button><button type="button" onClick={surpriseMe} className="empty-surprise"><Zap size={15} /> Surprise me</button></div><AnimatePresence>{showQuiz && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><GenreQuiz onComplete={(selected) => { setQuizGenres(selected); setShowQuiz(false); }} /></motion.div>}</AnimatePresence></> : <button type="button" onClick={clearFilters} className="clear-empty"><X size={15} /> Clear filters</button>}</div></div>}</div></section>

      {watchlist.length === 0 && <section className="quick-picks-section"><div className="watchlist-container"><div className="quick-picks-heading"><div><span><Sparkles size={12} /> {quizGenres.length ? "PERSONALIZED FOR YOU" : "A FEW IDEAS"}</span><h2>Quick picks</h2><p>{quizGenres.length ? `Based on ${quizGenres.join(", ")}` : "A few good films to get started."}</p></div><div className="carousel-controls"><button type="button" onClick={() => setQuickPickIndex((current) => (current - 1 + personalizedPicks.length) % personalizedPicks.length)} aria-label="Previous picks"><ChevronLeft size={17} /></button><button type="button" onClick={() => setQuickPickIndex((current) => (current + 1) % personalizedPicks.length)} aria-label="Next picks"><ChevronRight size={17} /></button></div></div><div className="quick-picks-grid">{visibleQuickPicks.map((movie) => <QuickPickCard key={movie.id} movie={movie} onOpen={(id) => navigate(`/movie/${id}`)} onAdd={toggleWatchlist} />)}</div></div></section>}

      {watchlist.length > 0 && <section className="recent-section"><div className="watchlist-container"><div className="section-heading"><div><span>YOUR LATEST</span><h2>Recently added</h2></div><span className="recent-count">{Math.min(watchlist.length, 4)} recent</span></div><div className="recent-grid">{watchlist.slice(-4).reverse().map((movie) => <motion.button type="button" key={movie.id} whileHover={{ y: -4 }} onClick={() => navigate(`/movie/${movie.id}`)} className="recent-card"><div className="recent-image">{getPosterUrl(movie) ? <img src={getPosterUrl(movie)} alt="" /> : <Film size={28} />}<div className="recent-overlay" /></div><div className="recent-info"><strong>{movie.title || movie.name}</strong><span>{getYear(movie)} • {Number(movie.vote_average || movie.rating || 0).toFixed(1)}</span></div></motion.button>)}</div></div></section>}

      <AnimatePresence>{collectionMovie && <CollectionModal movie={collectionMovie} collections={collections} onClose={() => setCollectionMovie(null)} onCreate={(name, emoji) => createCollection(name, emoji)} onAdd={addToCollection} onRemove={removeFromCollection} isInCollection={isMovieInCollection} />}</AnimatePresence>
      <AnimatePresence>{surpriseMovie && <SurpriseModal movie={surpriseMovie} onClose={() => setSurpriseMovie(null)} onAdd={(movie) => { toggleWatchlist(movie); setSurpriseMovie(null); }} onOpen={(id) => navigate(`/movie/${id}`)} />}</AnimatePresence>
    </main>
  );
}