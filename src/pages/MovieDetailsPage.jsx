import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaBookmark,
  FaCalendar,
  FaCheck,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaClock,
  FaExternalLinkAlt,
  FaFilm,
  FaLanguage,
  FaLightbulb,
  FaPlay,
  FaPlus,
  FaStar,
  FaTv,
} from "react-icons/fa";

import {
  getMovieCertification,
  getMovieCredits,
  getMovieDetails,
  getMovieVideos,
  getMovieWatchProviders,
  getSimilarMovies,
  getSimilarTVShows,
  getTVCertification,
  getTVCredits,
  getTVDetails,
  getTVSeason,
  getTVVideos,
  getTVWatchProviders,
  getTrailer,
} from "../services/tmdbService";

import TrailerModal from "../components/Movie/TrailerModal";
import WatchProviders from "../components/Movie/WatchProviders";
import "./MovieDetailsTheme.css";

const TMDB_IMAGE = "https://image.tmdb.org/t/p";

function image(path, size = "original") {
  return path
    ? `${TMDB_IMAGE}/${size}${path}`
    : "/placeholder.jpg";
}

function youtubeThumbnail(key) {
  return key
    ? `https://img.youtube.com/vi/${key}/hqdefault.jpg`
    : "/placeholder.jpg";
}

function getTitle(data) {
  return data?.title || data?.name || "Untitled";
}

function getOriginalTitle(data) {
  return data?.original_title || data?.original_name || getTitle(data);
}

function getReleaseDate(data) {
  return data?.release_date || data?.first_air_date || "";
}

function getYear(data) {
  return getReleaseDate(data).slice(0, 4) || "—";
}

function getRuntime(data, isTV) {
  if (isTV) {
    const runtime = data?.episode_run_time?.[0];
    return runtime ? `${runtime} min/episode` : null;
  }

  if (!data?.runtime) return null;

  const hours = Math.floor(data.runtime / 60);
  const minutes = data.runtime % 60;
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
}

function getLanguage(data) {
  return data?.original_language?.toUpperCase() || null;
}

function getRating(data) {
  return typeof data?.vote_average === "number" && data.vote_average > 0
    ? data.vote_average.toFixed(1)
    : null;
}

function getMediaType(item, fallback = "movie") {
  return item?.media_type || fallback;
}

function readWatchlist() {
  try {
    const value = JSON.parse(localStorage.getItem("cristal-watchlist") || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function writeWatchlist(list) {
  localStorage.setItem("cristal-watchlist", JSON.stringify(list));
  window.dispatchEvent(new Event("cristal-storage-update"));
}

function RailControls({ onPrev, onNext }) {
  return (
    <div className="movie-rail-controls">
      <button type="button" onClick={onPrev} aria-label="Previous">
        <FaChevronLeft />
      </button>
      <button type="button" onClick={onNext} aria-label="Next">
        <FaChevronRight />
      </button>
    </div>
  );
}

function Facts({ movie, isTV, certification }) {
  const facts = [
    getYear(movie) !== "—" && [<FaCalendar />, "Release", getYear(movie)],
    getRuntime(movie, isTV) && [<FaClock />, isTV ? "Episode runtime" : "Runtime", getRuntime(movie, isTV)],
    getLanguage(movie) && [<FaLanguage />, "Language", getLanguage(movie)],
    certification && [<FaFilm />, "Rating", certification],
    movie?.status && [<FaTv />, "Status", movie.status],
  ].filter(Boolean);

  if (!facts.length) return null;

  return (
    <div className="movie-facts-rail">
      {facts.map(([icon, label, value]) => (
        <div className="movie-fact" key={label}>
          <span>{icon}{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </div>
  );
}

function RatingCard({ movie }) {
  const score = getRating(movie);
  const percentage = score ? Math.round(Number(score) * 10) : 0;

  return (
    <section className="movie-aside-card movie-score-card">
      <div className="score-card-top">
        <div>
          <span className="aside-eyebrow">AUDIENCE SCORE</span>
          <h2>Community rating</h2>
        </div>
        <div className="score-ring" style={{ "--score-progress": `${percentage}%` }}>
          <div><strong>{score || "—"}</strong><span>/10</span></div>
        </div>
      </div>
      <div className="score-divider" />
      <div className="score-foot">
        <span><FaStar /> Audience rating</span>
        <strong>{movie?.vote_count ? movie.vote_count.toLocaleString() : 0} votes</strong>
      </div>
    </section>
  );
}

function DetailCard({ movie, isTV }) {
  const [expanded, setExpanded] = useState(false);
  const production = isTV
    ? movie?.networks?.slice(0, 2).map((item) => item.name).join(", ")
    : movie?.production_companies?.slice(0, 2).map((item) => item.name).join(", ");
  const countries = movie?.production_countries?.map((item) => item.name).join(", ");

  const mainRows = [
    ["Original title", getOriginalTitle(movie)],
    production && [isTV ? "Network" : "Production", production],
    countries && ["Countries", countries],
    isTV && movie?.number_of_seasons && ["Seasons", movie.number_of_seasons],
    isTV && movie?.number_of_episodes && ["Episodes", movie.number_of_episodes],
  ].filter(Boolean);

  const extraRows = [
    !isTV && movie?.budget > 0 && ["Budget", `$${movie.budget.toLocaleString()}`],
    !isTV && movie?.revenue > 0 && ["Revenue", `$${movie.revenue.toLocaleString()}`],
  ].filter(Boolean);

  if (!mainRows.length && !extraRows.length) return null;

  return (
    <section className="movie-aside-card movie-detail-card">
      <div className="aside-card-heading"><div><span className="aside-eyebrow">INFORMATION</span><h2>Details</h2></div></div>
      <dl>
        {mainRows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        {expanded && extraRows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
      {extraRows.length > 0 && (
        <button type="button" className="details-toggle" onClick={() => setExpanded((value) => !value)}>
          {expanded ? "Show less" : "See more details"}
          {expanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      )}
    </section>
  );
}

function CastRail({ cast }) {
  const navigate = useNavigate();
  const railRef = useRef(null);

  if (!cast?.length) return null;

  function scroll(direction) {
    railRef.current?.scrollBy({ left: direction === "next" ? 760 : -760, behavior: "smooth" });
  }

  return (
    <section className="movie-section movie-cast-section">
      <div className="movie-section-heading">
        <div><span>CAST & CHARACTERS</span><h2>Cast</h2><p>The people who bring it to life.</p></div>
        <RailControls onPrev={() => scroll("prev")} onNext={() => scroll("next")} />
      </div>
      <div className="movie-cast-rail" ref={railRef}>
        {cast.slice(0, 15).map((person) => (
          <article className="cast-card" key={person.credit_id || person.id} role="button" tabIndex={0} onClick={() => navigate(`/person/${person.id}`)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") navigate(`/person/${person.id}`); }}>
            <div className="cast-image"><img src={image(person.profile_path, "w500")} alt={`${person.name} portrait`} loading="lazy" /></div>
            <div className="cast-info"><h3>{person.name}</h3><p>{person.character || "Cast member"}</p></div>
          </article>
        ))}
      </div>
    </section>
  );
}

function ReviewsSection({ movie }) {
  const [reviews, setReviews] = useState([
    { id: 1, name: "Alex Morgan", avatar: "A", rating: 4.5, text: "A really enjoyable experience. The story, visuals and performances worked surprisingly well together.", date: "2 days ago", helpful: 24, liked: false },
    { id: 2, name: "Jordan Lee", avatar: "J", rating: 5, text: "One of those movies that stays with you after watching it. Definitely worth seeing.", date: "5 days ago", helpful: 17, liked: false },
  ]);
  const [reviewText, setReviewText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  function submitReview() {
    if (!reviewText.trim() || !userRating) return;
    setReviews((current) => [{ id: Date.now(), name: "You", avatar: "Y", rating: userRating, text: reviewText.trim(), date: "Just now", helpful: 0, liked: false }, ...current]);
    setReviewText("");
    setUserRating(0);
    setHoverRating(0);
  }

  return (
    <section className="movie-reviews-section">
      <div className="movie-section-heading reviews-heading"><div><span>COMMUNITY</span><h2>Reviews</h2><p>What people thought about {getTitle(movie)}.</p></div><div className="reviews-count"><strong>{reviews.length}</strong><span>{reviews.length === 1 ? "review" : "reviews"}</span></div></div>
      <div className="review-composer">
        <div className="review-composer-top"><div className="review-user-avatar">Y</div><div className="review-composer-info"><strong>Share your thoughts</strong><span>How would you rate this title?</span></div></div>
        <div className="review-rating-picker"><div className="review-stars">{[1, 2, 3, 4, 5].map((star) => <button key={star} type="button" className={star <= (hoverRating || userRating) ? "active" : ""} onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)} onClick={() => setUserRating(star)} aria-label={`Rate ${star} out of 5`}><FaStar /></button>)}</div><span>{userRating ? `${userRating}/5` : "Select rating"}</span></div>
        <div className="review-input-wrap"><textarea value={reviewText} onChange={(event) => setReviewText(event.target.value.slice(0, 500))} placeholder="Write a review... What did you think?" rows={4} maxLength={500} /><div className="review-input-footer"><span>{reviewText.length}/500</span><button type="button" className="review-submit-button" onClick={submitReview} disabled={!reviewText.trim() || !userRating}>Post review</button></div></div>
      </div>
      <div className="reviews-list">{reviews.map((review) => <article className="review-card" key={review.id}><div className="review-card-top"><div className="review-author"><div className="review-avatar">{review.avatar}</div><div><strong>{review.name}</strong><span>{review.date}</span></div></div><div className="review-score"><FaStar /><strong>{review.rating}</strong><span>/5</span></div></div><p className="review-text">{review.text}</p><div className="review-card-footer"><button type="button" className={review.liked ? "review-helpful active" : "review-helpful"} onClick={() => setReviews((current) => current.map((item) => item.id === review.id ? { ...item, liked: !item.liked, helpful: item.liked ? Math.max(0, item.helpful - 1) : item.helpful + 1 } : item))}><FaCheck /><span>Helpful</span>{review.helpful > 0 && <strong>{review.helpful}</strong>}</button><button type="button" className="review-reply-button">Reply</button></div></article>)}</div>
    </section>
  );
}

function RecommendationRail({ items, isTV }) {
  const navigate = useNavigate();
  const railRef = useRef(null);
  if (!items?.length) return null;

  function scroll(direction) {
    railRef.current?.scrollBy({ left: direction === "next" ? 900 : -900, behavior: "smooth" });
  }

  return (
    <section className="movie-section movie-recommendations-section">
      <div className="movie-section-heading"><div><span>MORE LIKE THIS</span><h2>You may also like</h2><p>Other titles worth a look.</p></div><RailControls onPrev={() => scroll("prev")} onNext={() => scroll("next")} /></div>
      <div className="movie-recommendation-rail" ref={railRef}>{items.slice(0, 20).map((item) => { const type = getMediaType(item, isTV ? "tv" : "movie"); return <article className="recommendation-card" key={`${type}-${item.id}`} role="button" tabIndex={0} onClick={() => navigate(type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") navigate(type === "tv" ? `/tv/${item.id}` : `/movie/${item.id}`); }}><div className="recommendation-poster"><img src={image(item.poster_path, "w500")} alt={getTitle(item)} loading="lazy" /><div className="recommendation-overlay"><FaPlay /></div></div><div className="recommendation-info"><h3>{getTitle(item)}</h3><div><span>{getYear(item)}</span><span className="dot">•</span><span>{item.vote_average ? item.vote_average.toFixed(1) : "—"}</span><FaStar /></div></div></article>; })}</div>
    </section>
  );
}

function MediaRail({ videos, movie, onPlay }) {
  const railRef = useRef(null);
  const media = [];
  const trailers = Array.isArray(videos) ? videos.filter((video) => video?.site === "YouTube" && video?.key) : [];
  trailers.slice(0, 5).forEach((video) => media.push({ type: "video", key: video.key, id: video.id, title: video.name || "Watch trailer" }));
  if (movie?.backdrop_path) media.push({ type: "image", path: movie.backdrop_path, id: "backdrop", title: "Backdrop" });
  if (movie?.poster_path) media.push({ type: "image", path: movie.poster_path, id: "poster", title: "Poster" });
  if (!media.length) return null;

  function scroll(direction) {
    railRef.current?.scrollBy({ left: direction === "next" ? 900 : -900, behavior: "smooth" });
  }

  return (
    <section className="movie-section movie-media-section">
      <div className="movie-section-heading"><div><span>MEDIA</span><h2>Gallery & trailers</h2><p>Videos and visuals from the title.</p></div><RailControls onPrev={() => scroll("prev")} onNext={() => scroll("next")} /></div>
      <div className="movie-media-rail" ref={railRef}>{media.map((item) => item.type === "video" ? <button type="button" className="media-card media-video-card" key={item.id} onClick={() => onPlay(item.key)}><img src={youtubeThumbnail(item.key)} alt={item.title} loading="lazy" /><div className="media-card-overlay" /><span className="media-play-button"><FaPlay /></span><strong>{item.title}</strong></button> : <div className="media-card media-image-card" key={item.id}><img src={image(item.path, "w780")} alt={item.title} loading="lazy" /></div>)}</div>
    </section>
  );
}

function EpisodeGuide({ movie, seasons, onLoadSeason }) {
  const availableSeasons = useMemo(() => Array.isArray(seasons) ? seasons.filter((season) => season?.season_number !== 0 && season?.episode_count > 0) : [], [seasons]);
  const [selectedSeason, setSelectedSeason] = useState(availableSeasons[0]?.season_number || 1);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEpisode, setOpenEpisode] = useState(null);

  useEffect(() => {
    if (availableSeasons.length && !availableSeasons.some((season) => season.season_number === selectedSeason)) setSelectedSeason(availableSeasons[0].season_number);
  }, [availableSeasons, selectedSeason]);

  useEffect(() => {
    let cancelled = false;
    async function loadEpisodes() {
      if (!movie?.id || !selectedSeason) return;
      setLoading(true);
      try {
        const data = await onLoadSeason(movie.id, selectedSeason);
        if (!cancelled) setEpisodes(Array.isArray(data?.episodes) ? data.episodes : []);
      } catch (error) {
        console.error("Episode loading error:", error);
        if (!cancelled) setEpisodes([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadEpisodes();
    return () => { cancelled = true; };
  }, [movie?.id, selectedSeason, onLoadSeason]);

  if (!availableSeasons.length) return null;

  return (
    <section className="movie-section movie-episodes-section">
      <div className="movie-section-heading"><div><span>WATCH GUIDE</span><h2>Episodes</h2><p>Browse episodes by season.</p></div><label className="episode-season-select"><span>Season</span><select value={selectedSeason} onChange={(event) => setSelectedSeason(Number(event.target.value))}>{availableSeasons.map((season) => <option key={season.id} value={season.season_number}>{season.name || `Season ${season.season_number}`}</option>)}</select></label></div>
      {loading ? <div className="episode-loading">Loading episodes...</div> : episodes.length ? <div className="episode-list">{episodes.map((episode) => { const open = openEpisode === episode.id; return <article className="episode-card" key={episode.id}><div className="episode-image">{episode.still_path ? <img src={image(episode.still_path, "w500")} alt={episode.name} loading="lazy" /> : <div className="episode-placeholder"><FaTv /></div>}<span className="episode-number">E{episode.episode_number}</span></div><div className="episode-content"><div className="episode-title-row"><div><span>Episode {episode.episode_number}</span><h3>{episode.name || `Episode ${episode.episode_number}`}</h3></div><button type="button" onClick={() => setOpenEpisode(open ? null : episode.id)}>{open ? <FaChevronDown /> : <FaChevronRight />}</button></div><div className="episode-meta">{episode.air_date && <span>{episode.air_date}</span>}{episode.runtime && <span>{episode.runtime} min</span>}{episode.vote_average > 0 && <span><FaStar />{episode.vote_average.toFixed(1)}</span>}</div>{open && <p>{episode.overview || "Episode description is not available."}</p>}</div></article>; })}</div> : <div className="episode-loading">Episode information is not available.</div>}
    </section>
  );
}

export default function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isTV = location.pathname.startsWith("/tv/");
  const labels = isTV ? { singular: "series", uppercase: "TV SERIES", story: "THE SERIES" } : { singular: "movie", uppercase: "MOVIE", story: "THE STORY" };
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [providers, setProviders] = useState(null);
  const [videos, setVideos] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [playingTrailerKey, setPlayingTrailerKey] = useState(null);
  const [certification, setCertification] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showTrailer, setShowTrailer] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSaved(readWatchlist().some((item) => String(item.id) === String(id)));
  }, [id]);

  function toggleSaved() {
    if (!movie?.id) return;
    const current = readWatchlist();
    const exists = current.some((item) => String(item.id) === String(movie.id));
    const next = exists ? current.filter((item) => String(item.id) !== String(movie.id)) : [...current, movie];
    try {
      writeWatchlist(next);
      setSaved(!exists);
    } catch (storageError) {
      console.warn("Could not save title:", storageError);
    }
  }

  useEffect(() => {
    let cancelled = false;
    async function loadDetails() {
      if (!id) return;
      setLoading(true);
      setError("");
      setMovie(null);
      setCredits(null);
      setSimilar([]);
      setProviders(null);
      setVideos([]);
      setTrailerKey(null);
      setPlayingTrailerKey(null);
      setCertification("");
      setShowTrailer(false);

      try {
        const details = isTV ? await getTVDetails(id) : await getMovieDetails(id);
        if (cancelled) return;
        setMovie(details);

        const [creditsData, videosData, similarData, providerData, certificationData] = await Promise.all([
          (isTV ? getTVCredits(id) : getMovieCredits(id)).catch(() => null),
          (isTV ? getTVVideos(id) : getMovieVideos(id)).catch(() => []),
          (isTV ? getSimilarTVShows(id) : getSimilarMovies(id)).catch(() => []),
          (isTV ? getTVWatchProviders(id) : getMovieWatchProviders(id)).catch(() => null),
          (isTV ? getTVCertification(id) : getMovieCertification(id)).catch(() => ""),
        ]);

        if (cancelled) return;
        const cleanVideos = Array.isArray(videosData) ? videosData : videosData?.results || [];
        const cleanSimilar = Array.isArray(similarData) ? similarData : similarData?.results || [];
        setCredits(creditsData?.credits || creditsData || null);
        setVideos(cleanVideos);
        setSimilar(cleanSimilar);
        setProviders(providerData);
        setCertification(certificationData || "");
        setTrailerKey(getTrailer(cleanVideos));
      } catch (loadError) {
        console.error("Movie details error:", loadError);
        if (!cancelled) setError(`Failed to load ${isTV ? "series" : "movie"} details.`);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadDetails();
    return () => { cancelled = true; };
  }, [id, isTV]);

  async function loadSeason(tvId, seasonNumber) {
    return getTVSeason(tvId, seasonNumber);
  }

  if (loading) return <div className="movie-page-state"><div className="movie-loading-spinner" /><p>Loading {labels.singular}...</p></div>;

  if (error || !movie) return <div className="movie-page-state"><h2>{isTV ? "Series not found" : "Movie not found"}</h2><p>We could not load this title from TMDB.</p><button type="button" onClick={() => navigate(-1)}>Go back</button></div>;

  const title = getTitle(movie);
  const score = getRating(movie);

  return (
    <div className="movie-detail-theme movie-page">
      <section className="movie-spotlight">
        <div className="movie-spotlight-image" style={{ backgroundImage: `url(${image(movie.backdrop_path)})` }} />
        <div className="movie-spotlight-color" />
        <div className="movie-spotlight-shade" />
        <div className="movie-spotlight-content">
          <button type="button" className="movie-back-button" onClick={() => navigate(-1)} aria-label="Go back"><FaArrowLeft /></button>
          <div className="movie-hero-grid">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="movie-poster-wrap"><img className="movie-hero-poster" src={image(movie.poster_path, "w500")} alt={`${title} poster`} /></motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.55 }} className="movie-hero-copy">
              <div className="movie-kicker"><span>{getYear(movie)}</span><i>•</i><span>{labels.uppercase}</span>{getRuntime(movie, isTV) && <><i>•</i><span>{getRuntime(movie, isTV)}</span></>}{certification && <><i>•</i><span>{certification}</span></>}</div>
              <h1>{title}</h1>
              {movie.tagline && <p className="movie-tagline">{movie.tagline}</p>}
              {movie.genres?.length > 0 && <div className="movie-genre-pills">{movie.genres.slice(0, 4).map((genre) => <span key={genre.id}>{genre.name}</span>)}</div>}
              {score && <div className="hero-rating"><div className="hero-rating-star"><FaStar /></div><div><strong>{score}</strong><span>/ 10</span></div><small>{movie.vote_count ? `${movie.vote_count.toLocaleString()} ratings` : "Community score"}</small></div>}
              <div className="movie-hero-actions">
                {trailerKey && <button type="button" className="movie-trailer-button" onClick={() => { setPlayingTrailerKey(trailerKey); setShowTrailer(true); }}><FaPlay /> Watch trailer</button>}
                {isTV && movie.number_of_episodes > 0 && <button type="button" className="movie-secondary-action" onClick={() => document.getElementById("episodes")?.scrollIntoView({ behavior: "smooth" })}><FaTv /> Episodes</button>}
                <button type="button" className={`movie-save-button ${saved ? "saved" : ""}`} onClick={toggleSaved}>{saved ? <FaCheck /> : <FaPlus />}{saved ? "In watchlist" : "Add to watchlist"}</button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <main className="movie-page-content">
        <Facts movie={movie} isTV={isTV} certification={certification} />
        <div className="movie-content-grid">
          <div className="movie-main-column">
            <section className="movie-overview-block"><span className="section-label">{labels.story}</span><h2>{movie.tagline || `Everything you need to know about ${title}.`}</h2><p>{movie.overview || `Explore ${title}, its story, characters and complete details.`}</p></section>
            {credits?.cast?.length > 0 && <CastRail cast={credits.cast} />}
            {isTV && <div id="episodes"><EpisodeGuide movie={movie} seasons={movie.seasons || []} onLoadSeason={loadSeason} /></div>}
            <MediaRail movie={movie} videos={videos} onPlay={(key) => { setPlayingTrailerKey(key); setShowTrailer(true); }} />
            <ReviewsSection movie={movie} />
          </div>

          <aside className="movie-sidebar">
            <RatingCard movie={movie} />
            {providers && <section className="movie-aside-card movie-watch-card"><div className="aside-card-heading"><div><span className="aside-eyebrow">WHERE TO WATCH</span><h2>Available on</h2></div><FaExternalLinkAlt /></div><WatchProviders providers={providers} /></section>}
            <DetailCard movie={movie} isTV={isTV} />
            <button type="button" className={`movie-collection-button ${saved ? "saved" : ""}`} onClick={toggleSaved}>{saved ? <FaCheck /> : <FaBookmark />}<span>{saved ? "Saved to collection" : "Save to collection"}</span></button>
          </aside>
        </div>
        <RecommendationRail items={similar} isTV={isTV} />
      </main>

      <TrailerModal open={showTrailer} videoKey={playingTrailerKey} title={`${title} Trailer`} onClose={() => { setShowTrailer(false); setPlayingTrailerKey(null); }} />
    </div>
  );
}