import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaBrain, FaHeart, FaPlay, FaStar, FaStopwatch, FaBolt } from "react-icons/fa";
import { discoverMovies, getMovieDetails, getMovieWatchProviders } from "../../services/tmdbService";
import "./VibeRoulette.css";

const region = "IN";
const vibes = [
  { id: "fast", label: "Fast-Paced", icon: FaBolt, genre: 28, color: "#ff596a" },
  { id: "mind", label: "Mind-Bending", icon: FaBrain, genre: 9648, color: "#9e7cff" },
  { id: "date", label: "Date Night", icon: FaHeart, genre: 10749, color: "#ff779f" },
  { id: "chill", label: "90-Minute Chill", icon: FaStopwatch, genre: 35, color: "#ffd000" },
];

const image = (path, size = "w780") => path ? `https://image.tmdb.org/t/p/${size}${path}` : "/images/poster-placeholder.webp";
const providerNames = { netflix: "Netflix", prime: "Prime Video", hotstar: "JioHotstar" };

function providersFor(data) {
  const country = data?.results?.[region];
  return [...(country?.flatrate || []), ...(country?.rent || []), ...(country?.buy || [])]
    .filter((item, index, list) => list.findIndex((match) => match.provider_id === item.provider_id) === index)
    .slice(0, 3);
}

function Recommendation({ movie }) {
  const title = movie.title || "Untitled";
  return <Link to={`/movie/${movie.id}`} className="vibe-rec-card"><img src={image(movie.poster_path, "w500")} alt={title} /><div><strong>{title}</strong><span><FaStar /> {Number(movie.vote_average || 0).toFixed(1)} · {movie.runtime || "—"} min</span><p>{movie.providers?.length ? movie.providers.map((provider) => provider.provider_name).join(" · ") : "Availability unavailable"}</p></div></Link>;
}

function ContextRow({ title, caption, movies }) {
  if (!movies.length) return null;
  return <section className="context-row"><div className="context-heading"><div><h3>{title}</h3><p>{caption}</p></div><span>Live picks</span></div><div className="context-cards">{movies.slice(0, 5).map((movie) => <Recommendation key={movie.id} movie={movie} />)}</div></section>;
}

export default function VibeRoulette() {
  const [vibe, setVibe] = useState(vibes[0]);
  const [time, setTime] = useState(120);
  const [tone, setTone] = useState("light");
  const [platform, setPlatform] = useState("all");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVibe() {
      setLoading(true);
      try {
        const results = await discoverMovies({ genre: vibe.genre, region });
        const enriched = await Promise.all((results || []).slice(0, 8).map(async (movie) => {
          try {
            const [details, availability] = await Promise.all([getMovieDetails(movie.id), getMovieWatchProviders(movie.id)]);
            return { ...movie, runtime: details.runtime, providers: providersFor(availability) };
          } catch { return { ...movie, runtime: null, providers: [] }; }
        }));
        setMovies(enriched);
      } catch (error) { console.error("Vibe recommendations error:", error); setMovies([]); }
      finally { setLoading(false); }
    }
    loadVibe();
  }, [vibe]);

  const matches = useMemo(() => {
    const platformMatch = (movie) => platform === "all" || movie.providers?.some((item) => item.provider_name.toLowerCase().includes(providerNames[platform].replace("JioHotstar", "Hotstar").toLowerCase().split(" ")[0]));
    const toneMatch = (movie) => tone === "dark" ? [27, 53, 80, 9648].some((id) => movie.genre_ids?.includes(id)) : ![27, 53, 80].some((id) => movie.genre_ids?.includes(id));
    return movies.filter((movie) => (!movie.runtime || movie.runtime <= time) && platformMatch(movie) && toneMatch(movie)).slice(0, 3);
  }, [movies, platform, time, tone]);
  const results = matches.length ? matches : movies.slice(0, 3);
  const heroMovie = results[0] || movies[0];

  return <div className="vibe-home">
    <section className="vibe-hero">
      <AnimatePresence mode="wait">{heroMovie && <motion.div key={`${vibe.id}-${heroMovie.id}`} initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: .55 }} className="vibe-backdrop" style={{ backgroundImage: `url(${image(heroMovie.backdrop_path || heroMovie.poster_path, "original")})` }} />}</AnimatePresence>
      <div className="vibe-shade" />
      <div className="vibe-copy"><p>FIND A MOVIE FOR THIS MOMENT</p><h1>What’s your <span>vibe tonight?</span></h1><div className="vibe-pills">{vibes.map((item) => { const Icon = item.icon; return <button key={item.id} type="button" onClick={() => setVibe(item)} className={vibe.id === item.id ? "is-active" : ""} style={{ "--vibe": item.color }}><Icon /> {item.label}</button>; })}</div><p className="vibe-description">Pick a mood. We’ll refresh your picks with movies that match it.</p></div>
    </section>

    <section className="decision-engine"><div className="decision-title"><p>WATCH TONIGHT</p><h2>Make the decision in seconds.</h2></div><div className="decision-controls"><label><span>Time available <b>{time} min</b></span><input type="range" min="80" max="180" step="10" value={time} onChange={(event) => setTime(Number(event.target.value))} /></label><div className="platform-pills">{["all", "netflix", "prime", "hotstar"].map((item) => <button type="button" key={item} onClick={() => setPlatform(item)} className={platform === item ? "is-active" : ""}>{item === "all" ? "Any service" : providerNames[item]}</button>)}</div><div className="tone-switch"><span>Light</span><button type="button" onClick={() => setTone((current) => current === "light" ? "dark" : "light")} className={tone === "dark" ? "is-dark" : ""} aria-label="Toggle light or dark tone"><i /></button><span>Dark</span></div></div><div className="decision-results">{loading ? <p className="vibe-loading">Finding your picks…</p> : results.map((movie) => <Recommendation key={movie.id} movie={movie} />)}</div></section>

    {!loading && <div className="context-rows"><ContextRow title="Under 90 Minutes" caption="Quick films for a weeknight." movies={movies.filter((movie) => movie.runtime && movie.runtime <= 90)} /><ContextRow title="High Visual Impact" caption="Big images, bigger atmosphere." movies={[...movies].sort((a, b) => (b.popularity || 0) - (a.popularity || 0))} /><ContextRow title="Fan Favorites" caption="The stories people keep returning to." movies={[...movies].sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0))} /></div>}
  </div>;
}
