import { useEffect, useMemo, useState } from "react";
import { FaPlay, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import {
  getTrendingMovies,
  getMovieVideos,
} from "../../services/tmdbService";

import "./LatestTrailer.css";

const TMDB_IMAGE = "https://image.tmdb.org/t/p/w780";

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function getTitle(movie) {
  return movie?.title || movie?.name || "Untitled";
}

function getYear(movie) {
  return (
    movie?.release_date ||
    movie?.first_air_date ||
    ""
  ).slice(0, 4);
}

function getTrailer(videos) {
  const results = safeArray(
    videos?.results ?? videos
  );

  return (
    results.find(
      (video) =>
        video?.site === "YouTube" &&
        video?.type === "Trailer" &&
        video?.official
    ) ||
    results.find(
      (video) =>
        video?.site === "YouTube" &&
        video?.type === "Trailer"
    ) ||
    results.find(
      (video) =>
        video?.site === "YouTube" &&
        video?.type === "Teaser"
    ) ||
    results.find(
      (video) =>
        video?.site === "YouTube"
    ) ||
    null
  );
}

export default function LatestTrailer() {
  const [movies, setMovies] = useState([]);
  const [trailers, setTrailers] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadTrailers() {
      try {
        setLoading(true);

        const data = await getTrendingMovies();

        const results = safeArray(
          data?.results ?? data
        );

        const uniqueMovies = [];
        const seen = new Set();

        for (const movie of results) {
          if (!movie?.id || seen.has(movie.id)) {
            continue;
          }

          if (!movie.backdrop_path) {
            continue;
          }

          seen.add(movie.id);
          uniqueMovies.push(movie);
        }

        const selectedMovies = uniqueMovies.slice(0, 8);

        if (cancelled) {
          return;
        }

        setMovies(selectedMovies);

        const trailerEntries = await Promise.all(
          selectedMovies.map(async (movie) => {
            try {
              const videos = await getMovieVideos(movie.id);

              const trailer = getTrailer(videos);

              return [
                movie.id,
                trailer,
              ];
            } catch (error) {
              console.warn(
                `Unable to load trailer for ${getTitle(movie)}`,
                error
              );

              return [
                movie.id,
                null,
              ];
            }
          })
        );

        if (cancelled) {
          return;
        }

        setTrailers(
          Object.fromEntries(
            trailerEntries
          )
        );
      } catch (error) {
        console.error(
          "Latest trailers error:",
          error
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadTrailers();

    return () => {
      cancelled = true;
    };
  }, []);

  const trailerMovies = useMemo(() => {
    return movies.filter(
      (movie) =>
        trailers[movie.id]?.key
    );
  }, [movies, trailers]);

  useEffect(() => {
    if (
      trailerMovies.length &&
      activeIndex >= trailerMovies.length
    ) {
      setActiveIndex(0);
    }
  }, [
    activeIndex,
    trailerMovies.length,
  ]);

  function previous() {
    if (!trailerMovies.length) {
      return;
    }

    setActiveIndex((current) =>
      current === 0
        ? trailerMovies.length - 1
        : current - 1
    );
  }

  function next() {
    if (!trailerMovies.length) {
      return;
    }

    setActiveIndex(
      (current) =>
        (current + 1) %
        trailerMovies.length
    );
  }

  function openTrailer(movie) {
    const trailer = trailers[movie.id];

    if (!trailer?.key) {
      return;
    }

    window.open(
      `https://www.youtube.com/watch?v=${trailer.key}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  if (
    !loading &&
    !trailerMovies.length
  ) {
    return null;
  }

  return (
    <section className="latest-trailer-section">
      <div className="latest-trailer-container">

        {/* HEADER */}
        <div className="latest-trailer-header">
          <div className="latest-trailer-title-group">
            <span className="latest-trailer-eyebrow">
              CRISTAL PREMIERE
            </span>

            <h2>
              Latest Trailers
            </h2>

            <p>
              The newest trailers from your movie universe.
            </p>
          </div>

          <div className="latest-trailer-controls">
            <button
              type="button"
              onClick={previous}
              disabled={
                trailerMovies.length <= 1
              }
              aria-label="Previous trailers"
            >
              <FaChevronLeft />
            </button>

            <button
              type="button"
              onClick={next}
              disabled={
                trailerMovies.length <= 1
              }
              aria-label="Next trailers"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        {/* TRAILER ROW */}
        {loading ? (
          <div className="latest-trailer-loading">
            <div className="trailer-skeleton" />
            <div className="trailer-skeleton" />
            <div className="trailer-skeleton" />
            <div className="trailer-skeleton" />
          </div>
        ) : (
          <div className="latest-trailer-grid">
            {trailerMovies
              .slice(activeIndex, activeIndex + 4)
              .concat(
                trailerMovies.slice(
                  0,
                  Math.max(
                    0,
                    activeIndex + 4 -
                      trailerMovies.length
                  )
                )
              )
              .map((movie) => {
                const trailer =
                  trailers[movie.id];

                const image = movie.backdrop_path
                  ? `${TMDB_IMAGE}${movie.backdrop_path}`
                  : "";

                return (
                  <article
                    key={movie.id}
                    className="latest-trailer-card"
                  >
                    {/* IMAGE */}
                    <button
                      type="button"
                      className="latest-trailer-thumbnail"
                      onClick={() =>
                        openTrailer(movie)
                      }
                      aria-label={`Play trailer for ${getTitle(
                        movie
                      )}`}
                    >
                      <img
                        src={image}
                        alt={`${getTitle(
                          movie
                        )} trailer`}
                        loading="lazy"
                      />

                      <span className="latest-trailer-image-overlay" />

                      <span className="latest-trailer-new">
                        NEW
                      </span>

                      <span className="latest-trailer-play">
                        <FaPlay />
                      </span>
                    </button>

                    {/* INFO */}
                    <div className="latest-trailer-info">
                      <h3>
                        {getTitle(movie)}
                      </h3>

                      <p>
                        {trailer?.name ||
                          "Official Trailer"}
                      </p>

                      <span className="latest-trailer-meta">
                        {getYear(movie)
                          ? `${getYear(movie)} • `
                          : ""}
                        Official
                      </span>
                    </div>
                  </article>
                );
              })}
          </div>
        )}

        {/* PROGRESS */}
        {trailerMovies.length > 1 && (
          <div className="latest-trailer-progress">
            <div className="latest-trailer-progress-track">
              <span
                style={{
                  width: `${Math.max(
                    18,
                    ((activeIndex + 1) /
                      trailerMovies.length) *
                      100
                  )}%`,
                }}
              />
            </div>

            <span className="latest-trailer-counter">
              {Math.min(
                activeIndex + 1,
                trailerMovies.length
              )}{" "}
              / {trailerMovies.length}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}