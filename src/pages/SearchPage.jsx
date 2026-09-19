import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, ArrowUpDown, Building2, Check, Clock3, Film, Heart, Play, Plus, Search, SlidersHorizontal, Sparkles, Star, Tv, X } from "lucide-react";
import { getMovieGenres, getMovieVideos, getTVGenres, getTVVideos, getTrendingAll, searchMulti } from "../services/tmdbService";
import "./SearchPage.css";

const words = ["Movie", "Sci-Fi Thriller", "Indie Gem", "Binge-Watch"];
const colors = ["#df6a51", "#e1b45c", "#b95782", "#9886c9"];
const WATCHLIST_KEY = "cristal-watchlist";
const FAVORITES_KEY = "cristal-favorites";
const HISTORY_KEY = "cristal-search-history";
const IMAGE_BASE = "https://image.tmdb.org/t/p/";

const services = [
  { name: "Netflix", domain: "netflix.com" }, { name: "Prime Video", domain: "primevideo.com" }, { name: "JioHotstar", domain: "hotstar.com" }, { name: "Disney+", domain: "disneyplus.com" }, { name: "Apple TV+", domain: "tv.apple.com" }, { name: "HBO Max", domain: "max.com" }, { name: "ZEE5", domain: "zee5.com" }, { name: "SonyLIV", domain: "sonyliv.com" }, { name: "MUBI", domain: "mubi.com" }, { name: "Paramount+", domain: "paramountplus.com" },
];
const studios = [
  { name: "Warner Bros.", domain: "warnerbros.com" }, { name: "Marvel Studios", domain: "marvel.com" }, { name: "A24", domain: "a24films.com" }, { name: "Universal", domain: "universalpictures.com" }, { name: "Pixar", domain: "pixar.com" }, { name: "Studio Ghibli", domain: "ghibli.jp" }, { name: "Lionsgate", domain: "lionsgate.com" }, { name: "20th Century", domain: "20thcenturystudios.com" },
];
const moodChips = ["#MindBending", "#GrittyCrime", "#SciFiDystopia", "#CozyComfort", "#EpicFantasy", "#TrueStory"];
const DECADES = [{ id: "all", label: "Any decade" }, { id: "2020", label: "2020s" }, { id: "2010", label: "2010s" }, { id: "2000", label: "2000s" }, { id: "1990", label: "1990s" }, { id: "1980", label: "1980s" }, { id: "older", label: "Before 1980" }];
const SORT_OPTIONS = [{ id: "relevance", label: "Relevance" }, { id: "rating", label: "Highest rated" }, { id: "popular", label: "Most popular" }, { id: "newest", label: "Newest" }];

function loadList(key) {
  try {
    const value = JSON.parse(window.localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function image(path, size = "w780") {
  return path ? `${IMAGE_BASE}${size}${path}` : "/images/poster-placeholder.webp";
}

function detailsPath(item) {
  return item.media_type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`;
}

function titleOf(item) {
  return item.title || item.name || "Untitled";
}

function yearOf(item) {
  return (item.release_date || item.first_air_date || "").slice(0, 4) || "New";
}

function mediaBadge(item) {
  const anime = item.original_language === "ja" && item.genre_ids?.includes(16);
  if (anime) return "Anime";
  return item.media_type === "tv" ? "TV show" : "Movie";
}

function Ticker({ target }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let frame;
    const startValue = value;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / 420, 1);
      setValue(Math.round(startValue + (target - startValue) * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return value;
}

function TrendCard({ item, rank }) {
  const title = titleOf(item);
  return <Link to={detailsPath(item)} className={`trend-card trend-card-${Math.min(rank, 4)}`} style={{ "--glow": colors[(rank - 1) % colors.length] }}><span className="trend-rank">{rank}</span><img src={image(item.poster_path, "w500")} alt={title} loading="lazy" /><div className="trend-copy"><small>{item.media_type === "tv" ? "TV SERIES" : "MOVIE"}</small><h3>{title}</h3><p><Star size={13} fill="currentColor" /> {Number(item.vote_average || 0).toFixed(1)} <i /> {yearOf(item)}</p></div><div className="trend-peek" style={{ backgroundImage: `linear-gradient(90deg, rgba(16,16,16,.96), rgba(16,16,16,.25)), url(${image(item.backdrop_path || item.poster_path)})` }}><span>QUICK PEEK</span><strong>{title}</strong><p>{item.overview || "A title worth adding to your list."}</p><b><Star size={13} fill="currentColor" /> {Number(item.vote_average || 0).toFixed(1)} rating</b></div></Link>;
}

function PartnerRail({ title, items, kind, onSelect }) {
  return <section className="partner-group"><div className="partner-heading"><div><p>{kind === "services" ? "STREAMING DIRECTORY" : "CREATOR DIRECTORY"}</p><h2>{title}</h2></div><span>{items.length} partners</span></div><div className="partner-rail">{items.map((item, index) => <button type="button" key={item.name} onClick={() => onSelect(item.name)} className={`partner-card ${kind}`} style={{ "--partner": colors[index % colors.length] }}><img src={`https://logo.clearbit.com/${item.domain}`} alt="" onError={(event) => { event.currentTarget.style.display = "none"; }} /><i>{kind === "services" ? <Tv size={20} /> : <Building2 size={20} />}</i><strong>{item.name}</strong><small>{kind === "services" ? "Find available titles" : "Explore studio films"}</small></button>)}</div></section>;
}

function FilterSelect({ icon, value, onChange, options }) {
  return <label className="results-filter-select">{icon}<select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></label>;
}

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("q") || "");
  const [trending, setTrending] = useState([]);
  const [results, setResults] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [word, setWord] = useState(0);
  const [filters, setFilters] = useState({ type: "all", genre: "", minRating: 0, decade: "all" });
  const [sortBy, setSortBy] = useState("relevance");
  const [watchlist, setWatchlist] = useState(() => loadList(WATCHLIST_KEY));
  const [favorites, setFavorites] = useState(() => loadList(FAVORITES_KEY));
  const [searchHistory, setSearchHistory] = useState(() => loadList(HISTORY_KEY));
  const [trailer, setTrailer] = useState(null);
  const isActiveSearch = query.trim().length > 0;
  const count = <Ticker target={results.length} />;

  useEffect(() => {
    if (isActiveSearch) return undefined;
    const timer = window.setInterval(() => setWord((value) => (value + 1) % words.length), 2700);
    return () => window.clearInterval(timer);
  }, [isActiveSearch]);

  useEffect(() => {
    getTrendingAll().then((data) => setTrending((data || []).filter((item) => item.poster_path).slice(0, 12))).catch(() => setError("Trending titles are unavailable right now."));
    Promise.all([getMovieGenres(), getTVGenres()]).then(([movieGenres, tvGenres]) => { const merged = new Map(); [...(movieGenres || []), ...(tvGenres || [])].forEach((genre) => merged.set(genre.id, genre)); setGenres([...merged.values()].sort((a, b) => a.name.localeCompare(b.name))); }).catch(() => setGenres([]));
  }, []);

  useEffect(() => {
    const incoming = params.get("q") || "";
    if (incoming !== query) setQuery(incoming);
  }, [params]);

  useEffect(() => {
    const term = query.trim();
    if (!term) { setResults([]); return undefined; }
    const timer = window.setTimeout(async () => { setLoading(true); setError(""); try { const data = await searchMulti(term); setResults((data?.results || data || []).filter((item) => item.media_type !== "person").slice(0, 18)); } catch { setResults([]); setError("We could not search right now. Please try again."); } finally { setLoading(false); } }, 360);
    return () => window.clearTimeout(timer);
  }, [query]);

  const heroSource = isActiveSearch ? results : trending;
  const ribbon = useMemo(() => { const slice = heroSource.slice(0, 7); return slice.length ? [...slice, ...slice] : []; }, [heroSource]);
  const filteredResults = useMemo(() => {
    let list = results.filter((item) => {
      const badge = mediaBadge(item);
      if (filters.type === "movie" && (item.media_type !== "movie" || badge === "Anime")) return false;
      if (filters.type === "tv" && (item.media_type !== "tv" || badge === "Anime")) return false;
      if (filters.type === "anime" && badge !== "Anime") return false;
      if (filters.genre && !(item.genre_ids || []).includes(Number(filters.genre))) return false;
      if (Number(item.vote_average || 0) < filters.minRating) return false;
      if (filters.decade !== "all") { const year = Number(yearOf(item)); if (!year) return false; if (filters.decade === "older" ? year >= 1980 : year < Number(filters.decade) || year >= Number(filters.decade) + 10) return false; }
      return true;
    });
    list = [...list];
    if (sortBy === "rating") list.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    if (sortBy === "popular") list.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    if (sortBy === "newest") list.sort((a, b) => new Date(b.release_date || b.first_air_date || 0) - new Date(a.release_date || a.first_air_date || 0));
    return list;
  }, [results, filters, sortBy]);

  function runSearch(term) { const next = term.trim(); setQuery(next); setParams(next ? { q: next } : {}); if (next) { const history = [next, ...loadList(HISTORY_KEY).filter((item) => item.toLowerCase() !== next.toLowerCase())].slice(0, 8); localStorage.setItem(HISTORY_KEY, JSON.stringify(history)); setSearchHistory(history); } }
  function applyMoodChip(chip) { runSearch(chip.replace("#", "").replace(/([a-z])([A-Z])/g, "$1 $2")); }
  function updateFilter(key, value) { setFilters((current) => ({ ...current, [key]: value })); }
  function resetFilters() { setFilters({ type: "all", genre: "", minRating: 0, decade: "all" }); setSortBy("relevance"); }
  function clear() { setQuery(""); setParams({}); }
  function toggleStored(item, event, key, setter) { event.preventDefault(); event.stopPropagation(); setter((current) => { const next = current.some((entry) => entry.id === item.id) ? current.filter((entry) => entry.id !== item.id) : [...current, item]; localStorage.setItem(key, JSON.stringify(next)); return next; }); }
  async function openTrailer(item, event) { event.preventDefault(); event.stopPropagation(); try { const data = item.media_type === "tv" ? await getTVVideos(item.id) : await getMovieVideos(item.id); const best = (data?.results || []).find((video) => video.site === "YouTube" && video.type === "Trailer") || (data?.results || []).find((video) => video.site === "YouTube"); if (best) setTrailer({ key: best.key, title: titleOf(item) }); else window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(`${titleOf(item)} official trailer`)}`, "_blank", "noopener,noreferrer"); } catch { /* Trailer preview is optional. */ } }

  return <main className="explore-page"><div className="explore-ambient" aria-hidden="true" /><section className={`explore-hero ${isActiveSearch ? "explore-hero-active" : ""}`}><div className="explore-ribbon" aria-hidden="true">{ribbon.map((item, index) => <img key={`${item.id}-${index}`} src={image(item.backdrop_path || item.poster_path)} alt="" />)}</div><div className="explore-hero-shade" /><div className="explore-hero-content">{isActiveSearch ? <div className="explore-hero-active-content"><p><Search size={14} /> Searching CRISTAL</p><h1>“{query}”</h1></div> : <><p><Sparkles size={15} /> Discover something great</p><h1>Discover your next favorite <span key={words[word]}>{words[word]}</span>.</h1><p className="explore-hero-hint">Search for movies, shows, people, moods, or genres.</p><div className="mood-chip-row">{moodChips.map((chip) => <button type="button" key={chip} onClick={() => applyMoodChip(chip)} className="mood-chip">{chip}</button>)}</div>{searchHistory.length > 0 && <div className="recent-search-row"><span className="recent-search-label"><Clock3 size={13} /> Recent</span>{searchHistory.slice(0, 6).map((term) => <button type="button" key={term} onClick={() => runSearch(term)} className="recent-search-chip">{term}</button>)}</div>}</>}</div></section><section className="explore-stats"><div><Search /><span>Start searching</span><b>Type a title, mood, or genre</b></div><div><Sparkles /><span>Results found</span><b className="ticker">{count}</b></div><div><Tv /><span>Powered by TMDB</span><b>Movies, series & people</b></div></section>{isActiveSearch ? <section className="explore-section"><div className="explore-heading"><div><p>Search results</p><h2>{loading ? "Finding your next favorite…" : `Results for “${query}”`}</h2></div><button type="button" onClick={clear}>Clear search</button></div>{!loading && !error && results.length > 0 && <div className="results-toolbar"><div className="results-toolbar-filters"><FilterSelect icon={<SlidersHorizontal size={14} />} value={filters.type} onChange={(value) => updateFilter("type", value)} options={[{ id: "all", label: "All types" }, { id: "movie", label: "Movies" }, { id: "tv", label: "TV shows" }, { id: "anime", label: "Anime" }]} /><FilterSelect value={filters.genre} onChange={(value) => updateFilter("genre", value)} options={[{ id: "", label: "All genres" }, ...genres.map((genre) => ({ id: String(genre.id), label: genre.name }))]} /><FilterSelect value={filters.decade} onChange={(value) => updateFilter("decade", value)} options={DECADES} /><label className="results-rating-filter"><span>Min rating {filters.minRating}+</span><input type="range" min="0" max="9" step="1" value={filters.minRating} onChange={(event) => updateFilter("minRating", Number(event.target.value))} /></label><button type="button" className="results-toolbar-reset" onClick={resetFilters}>Reset</button></div><div className="results-toolbar-sort"><ArrowUpDown size={15} /><select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>{SORT_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></div></div>}{error ? <div className="explore-message">{error}</div> : loading ? <div className="explore-loader"><span /> Searching CRISTAL…</div> : filteredResults.length ? <div className="result-grid">{filteredResults.map((item) => { const badge = mediaBadge(item); const isWatchlisted = watchlist.some((entry) => entry.id === item.id); const isFavorite = favorites.some((entry) => entry.id === item.id); return <Link to={detailsPath(item)} key={`${item.media_type}-${item.id}`} className="result-card"><div className="result-card-media"><img src={image(item.poster_path, "w500")} alt={titleOf(item)} loading="lazy" /><span className={`result-badge result-badge-${badge.toLowerCase().replace(" ", "-")}`}>{badge}</span><div className="result-quick-actions"><button type="button" className={isWatchlisted ? "is-active" : ""} onClick={(event) => toggleStored(item, event, WATCHLIST_KEY, setWatchlist)} aria-label={isWatchlisted ? "Remove from watchlist" : "Add to watchlist"}>{isWatchlisted ? <Check size={15} /> : <Plus size={15} />}</button><button type="button" className={isFavorite ? "is-active" : ""} onClick={(event) => toggleStored(item, event, FAVORITES_KEY, setFavorites)} aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}><Heart size={15} fill={isFavorite ? "currentColor" : "none"} /></button><button type="button" onClick={(event) => openTrailer(item, event)} aria-label="Preview trailer"><Play size={15} /></button></div></div><div><h3>{titleOf(item)}</h3><p><Star size={13} fill="currentColor" /> {Number(item.vote_average || 0).toFixed(1)} <i /> {yearOf(item)}</p></div></Link>; })}</div> : <div className="explore-message">{results.length ? "No titles match your filters. Try loosening them." : "No titles found. Try a different search."}</div>}</section> : <><section className="explore-section"><div className="explore-heading"><div><p>Trending this week</p><h2>What everyone is watching</h2></div><Link to="/ai">Let CRISTAL AI choose <ArrowRight size={16} /></Link></div><div className="trend-grid">{trending.map((item, index) => <TrendCard key={`${item.media_type}-${item.id}`} item={item} rank={index + 1} />)}</div></section><section className="partners-section"><PartnerRail title="Where to watch" items={services} kind="services" onSelect={runSearch} /><PartnerRail title="Studios to explore" items={studios} kind="studios" onSelect={runSearch} /></section></>} {trailer && <div className="search-trailer-modal" role="dialog" aria-modal="true" aria-label="Trailer player" onClick={() => setTrailer(null)}><div className="search-trailer-modal-inner" onClick={(event) => event.stopPropagation()}><button type="button" className="search-trailer-modal-close" onClick={() => setTrailer(null)} aria-label="Close trailer"><X size={18} /></button><div className="search-trailer-video-wrap"><iframe src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1&autoplay=1`} title={trailer.title || "Trailer"} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div></div></div>}</main>;
}
