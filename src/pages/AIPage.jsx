import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaBookmark,
  FaFilm,
  FaLightbulb,
  FaPlay,
  FaStar,
} from "react-icons/fa";

import {
  discoverMovies,
  getMovieDetails,
} from "../services/tmdbService";

import "./AIPage.css";

const moods = [
  {
    id: "happy",
    label: "Something fun",
    genre: 35,
    hint: "Something light and easy to watch.",
  },
  {
    id: "emotional",
    label: "Something real",
    genre: 18,
    hint: "A story with a little weight to it.",
  },
  {
    id: "mind",
    label: "Keep me guessing",
    genre: 9648,
    hint: "Twists, questions, and ideas to think about.",
  },
  {
    id: "scary",
    label: "A proper scare",
    genre: 27,
    hint: "Something for a late-night watch.",
  },
  {
    id: "adrenaline",
    label: "Some excitement",
    genre: 28,
    hint: "Fast, bold, and hard to pause.",
  },
  {
    id: "romantic",
    label: "A love story",
    genre: 10749,
    hint: "A little chemistry never hurts.",
  },
];

const services = [
  { id: "all", label: "Any service" },
  { id: "netflix", label: "Netflix", providerId: 8 },
  { id: "prime", label: "Prime Video", providerId: 119 },
  { id: "hotstar", label: "JioHotstar", providerId: 122 },
];

const image = (path) =>
  path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : "/images/poster-placeholder.webp";

function getMovieTitle(movie) {
  return movie?.title || movie?.name || "Untitled";
}

export default function AIPage() {
  const [searchParams] = useSearchParams();
  const [mood, setMood] = useState(moods[0]);
  const [time, setTime] = useState(100);
  const [service, setService] = useState(services[0]);
  const [note, setNote] = useState(() => searchParams.get("prompt") || "");
  const [movie, setMovie] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWhy, setShowWhy] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function findMovie() {
      setLoading(true);
      setShowWhy(false);
      setSaved(false);

      try {
        const data = await discoverMovies({
          genre: mood.genre,
          region: "IN",
          maxRuntime: time,
          providerId: service.providerId,
        });

        const results = Array.isArray(data)
          ? data
          : data?.results || [];

        const pick =
          results.find((item) => item?.poster_path) ||
          results[0] ||
          null;

        if (cancelled) return;

        setMovie(pick);
        setDetails(null);

        if (pick?.id) {
          const movieDetails = await getMovieDetails(pick.id);
          if (!cancelled) setDetails(movieDetails);
        }
      } catch (error) {
        console.error("Movie recommendation error:", error);

        if (!cancelled) {
          setMovie(null);
          setDetails(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    const timer = window.setTimeout(findMovie, 180);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [mood, time, service]);

  const title = getMovieTitle(movie);

  const genres = useMemo(() => {
    return (
      details?.genres
        ?.slice(0, 2)
        .map((item) => item.name)
        .join(" · ") || mood.label
    );
  }, [details, mood]);

  const reason = note.trim()
    ? `You mentioned “${note.trim()}”. This choice matches that request and your ${time}-minute window.`
    : `${mood.hint} It also fits your ${time}-minute window.`;

  function saveMovie() {
    if (!movie?.id) return;

    try {
      const current = JSON.parse(
        localStorage.getItem("cristal-watchlist") || "[]"
      );

      const list = Array.isArray(current) ? current : [];
      const exists = list.some((item) => item.id === movie.id);
      const next = exists
        ? list.filter((item) => item.id !== movie.id)
        : [...list, movie];

      localStorage.setItem(
        "cristal-watchlist",
        JSON.stringify(next)
      );
      window.dispatchEvent(new Event("cristal-storage-update"));
      setSaved(!exists);
    } catch (error) {
      console.warn("Could not save movie:", error);
    }
  }

  return (
    <main className="ai-match-page">
      <section className="ai-match-shell">
        <header className="ai-match-hero">
          <div className="ai-match-copy">
            <p>Movie picker</p>
            <h1>
              What do you feel like
              <span>watching tonight?</span>
            </h1>
            <span>
              Give me a mood, a rough amount of time, and I will find a place to start.
            </span>
          </div>

          <div className="ai-spotlight" aria-hidden="true">
            <FaFilm />
          </div>
        </header>

        <section className="ai-preferences">
          <p className="ai-conversation">
            Tonight I have
            <select
              aria-label="Time available"
              value={time}
              onChange={(event) => setTime(Number(event.target.value))}
            >
              {[60, 90, 120, 150, 180].map((minutes) => (
                <option key={minutes} value={minutes}>
                  {minutes} minutes
                </option>
              ))}
            </select>
            to watch
            <select
              aria-label="Mood"
              value={mood.id}
              onChange={(event) =>
                setMood(moods.find((item) => item.id === event.target.value) || moods[0])
              }
            >
              {moods.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label.toLowerCase()}
                </option>
              ))}
            </select>
            on
            <select
              aria-label="Streaming service"
              value={service.id}
              onChange={(event) =>
                setService(
                  services.find((item) => item.id === event.target.value) || services[0]
                )
              }
            >
              {services.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
            .
          </p>

          <label className="ai-note">
            <span>Anything else on your mind? <small>optional</small></span>
            <input
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="something funny, but not silly"
            />
          </label>
        </section>

        <section className="ai-result" aria-live="polite">
          {loading ? (
            <div className="ai-loading">
              <span />
              Looking for something that fits...
            </div>
          ) : movie ? (
            <>
              <div className="ai-result-poster-wrap">
                <img src={image(movie.poster_path)} alt={title} />
              </div>

              <div className="ai-result-copy">
                <h2>{title}</h2>

                <p className="ai-result-meta">
                  <FaStar />
                  {Number(movie.vote_average || 0).toFixed(1)}/10
                  <i />
                  {details?.runtime || "—"} min
                  <i />
                  {genres}
                </p>

                <p>
                  {details?.overview ||
                    movie.overview ||
                    "No description available."}
                </p>

                <blockquote className="ai-curation-note">
                  “A thoughtful pick for an evening when you want a story with a little staying power.”
                  <cite>— The Cristal editors</cite>
                </blockquote>

                {showWhy && (
                  <div className="ai-reason">
                    <FaLightbulb />
                    <span>
                      <strong>Why this one?</strong>
                      {reason}
                    </span>
                  </div>
                )}
              </div>

              <div className="ai-result-actions">
                <Link to={`/movie/${movie.id}`}>
                  <FaPlay />
                  View movie
                </Link>

                <button
                  type="button"
                  onClick={() => setShowWhy((value) => !value)}
                  aria-label="Show recommendation reason"
                  className={showWhy ? "active" : ""}
                >
                  <FaLightbulb />
                </button>

                <button
                  type="button"
                  onClick={saveMovie}
                  aria-label={
                    saved
                      ? "Remove from watchlist"
                      : "Save to watchlist"
                  }
                  className={saved ? "active" : ""}
                >
                  <FaBookmark />
                </button>
              </div>
            </>
          ) : (
            <div className="ai-empty">
              Nothing matched those choices. Try another mood or give yourself a little more time.
            </div>
          )}
        </section>
      </section>
    </main>
  );
}