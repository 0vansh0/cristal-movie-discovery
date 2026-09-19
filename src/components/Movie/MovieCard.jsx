import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import {
  FaBookmark,
  FaCheck,
  FaPlay,
  FaPlus,
  FaStar,
  FaVolumeMute,
} from "react-icons/fa";

import "./MovieCard.css";

const TMDB_IMAGE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({
  movie,
  onFavorite,
  onWatchlist,
  isFavorite = false,
  isWatchlisted = false,
  getMovieVideos,
}) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const mountedRef = useRef(true);

  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [trailerError, setTrailerError] = useState(false);

  /*
  =========================================================
  MOVIE DATA
  =========================================================
  */

  const hasMovie = Boolean(movie?.id);

  const poster = movie?.poster_path
    ? `${TMDB_IMAGE}${movie.poster_path}`
    : "/placeholder-movie.svg";

  const title =
    movie?.title ||
    movie?.name ||
    "Untitled";

  const year =
    movie?.release_date?.slice(0, 4) ||
    movie?.first_air_date?.slice(0, 4) ||
    "—";

  const rawRating = Number(movie?.vote_average || 0);

  const rating =
    rawRating > 0
      ? rawRating.toFixed(1)
      : null;

  const mediaType =
    movie?.media_type === "tv" ||
    movie?.first_air_date
      ? "TV"
      : "MOVIE";

  /*
  Optional extra metadata.
  These safely fall back when TMDB data is missing.
  */

  const runtime =
    movie?.runtime ||
    movie?.episode_run_time?.[0] ||
    null;

  const genres =
    movie?.genres?.slice?.(0, 2) ||
    [];

  const genreNames = genres
    .map((genre) => genre?.name)
    .filter(Boolean);

  /*
  =========================================================
  TRAILER
  =========================================================
  */

  const findTrailer = useCallback(async () => {
    if (!getMovieVideos || !movie?.id) {
      return "";
    }

    try {
      setTrailerLoading(true);
      setTrailerError(false);

      const response =
        await getMovieVideos(movie.id);

      const videos = Array.isArray(response)
        ? response
        : response?.results;

      if (!Array.isArray(videos)) {
        return "";
      }

      /*
      Priority:
      1. Official YouTube Trailer
      2. Normal YouTube Trailer
      3. YouTube Teaser
      4. YouTube Clip
      */

      const trailer =
        videos.find(
          (video) =>
            video?.site === "YouTube" &&
            video?.type === "Trailer" &&
            video?.official === true
        ) ||
        videos.find(
          (video) =>
            video?.site === "YouTube" &&
            video?.type === "Trailer"
        ) ||
        videos.find(
          (video) =>
            video?.site === "YouTube" &&
            video?.type === "Teaser"
        ) ||
        videos.find(
          (video) =>
            video?.site === "YouTube" &&
            video?.type === "Clip"
        );

      if (!trailer?.key) {
        return "";
      }

      return (
        `https://www.youtube.com/embed/${trailer.key}` +
        `?autoplay=1` +
        `&mute=1` +
        `&controls=0` +
        `&loop=1` +
        `&playlist=${trailer.key}` +
        `&playsinline=1` +
        `&rel=0` +
        `&modestbranding=1`
      );
    } catch (error) {
      console.error(
        "CRISTAL trailer error:",
        error
      );

      if (mountedRef.current) {
        setTrailerError(true);
      }

      return "";
    } finally {
      if (mountedRef.current) {
        setTrailerLoading(false);
      }
    }
  }, [getMovieVideos, movie?.id]);

  /*
  =========================================================
  START TRAILER PREVIEW
  =========================================================
  */

  const startTrailerPreview = useCallback(async () => {
    if (!mountedRef.current) {
      return;
    }

    /*
    Trailer already loaded.
    */

    if (trailerUrl) {
      setShowTrailer(true);
      return;
    }

    /*
    Don't send multiple requests.
    */

    if (trailerLoading) {
      return;
    }

    const url = await findTrailer();

    if (!mountedRef.current) {
      return;
    }

    if (!url) {
      setTrailerError(true);
      return;
    }

    setTrailerUrl(url);
    setShowTrailer(true);
  }, [
    trailerUrl,
    trailerLoading,
    findTrailer,
  ]);

  /*
  =========================================================
  MOUSE ENTER
  =========================================================
  */

  const handleMouseEnter = () => {
    setHovered(true);

    clearTimeout(
      hoverTimerRef.current
    );

    /*
    Wait before loading trailer.
    This prevents API calls when quickly
    moving across many cards.
    */

    hoverTimerRef.current = setTimeout(() => {
      startTrailerPreview();
    }, 900);
  };

  /*
  =========================================================
  MOUSE LEAVE
  =========================================================
  */

  const handleMouseLeave = () => {
    clearTimeout(
      hoverTimerRef.current
    );

    setHovered(false);
    setShowTrailer(false);

    /*
    Stop YouTube preview.
    */

    if (videoRef.current) {
      try {
        videoRef.current.contentWindow?.postMessage(
          JSON.stringify({
            event: "command",
            func: "pauseVideo",
            args: [],
          }),
          "*"
        );
      } catch {
        // Ignore iframe communication errors.
      }
    }

    /*
    Reset card tilt.
    */

    if (cardRef.current) {
      cardRef.current.style.transform = "";
    }
  };

  /*
  =========================================================
  3D CARD TILT
  =========================================================
  */

  const handleMouseMove = (event) => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    if (
      window.matchMedia(
        "(hover: none), (pointer: coarse)"
      ).matches
    ) {
      return;
    }

    const rect =
      card.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) /
      rect.width;

    const y =
      (event.clientY - rect.top) /
      rect.height;

    const rotateY =
      (x - 0.5) * 6;

    const rotateX =
      (0.5 - y) * 6;

    card.style.setProperty(
      "--mouse-x",
      `${x * 100}%`
    );

    card.style.setProperty(
      "--mouse-y",
      `${y * 100}%`
    );

    card.style.transform = `
      perspective(1100px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-6px)
      scale(1.015)
    `;
  };

  /*
  =========================================================
  FAVORITE
  =========================================================
  */

  const handleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!onFavorite || !movie) {
      return;
    }

    onFavorite(
      movie,
      !isFavorite
    );
  };

  /*
  =========================================================
  WATCHLIST
  =========================================================
  */

  const handleWatchlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!onWatchlist || !movie) {
      return;
    }

    onWatchlist(
      movie,
      !isWatchlisted
    );
  };

  /*
  =========================================================
  IMAGE ERROR
  =========================================================
  */

  const handleImageError = (event) => {
    const fallback =
      "/placeholder-movie.jpg";

    if (
      !event.currentTarget.src.includes(
        "placeholder-movie.jpg"
      )
    ) {
      event.currentTarget.src =
        fallback;
    }

    setLoaded(true);
  };

  /*
  =========================================================
  CLEANUP
  =========================================================
  */

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;

      clearTimeout(
        hoverTimerRef.current
      );
    };
  }, []);

  /*
  =========================================================
  IMPORTANT
  =========================================================

  Validation happens AFTER all hooks.

  This prevents the React error:

  "Rendered more hooks than during the previous render."
  */

  if (!hasMovie) {
    return null;
  }

  /*
  =========================================================
  RENDER
  =========================================================
  */

  return (
    <article
      ref={cardRef}
      className={`
        movie-card
        ${hovered ? "is-hovered" : ""}
        ${showTrailer ? "has-trailer" : ""}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* =====================================================
          POSTER
      ===================================================== */}

      <Link
        to={`/movie/${movie.id}`}
        className="movie-card-poster"
        aria-label={`Open ${title}`}
      >
        {/* ===================================================
            SKELETON
        =================================================== */}

        {!loaded && (
          <div
            className="movie-card-skeleton"
            aria-hidden="true"
          />
        )}

        {/* ===================================================
            POSTER IMAGE
        =================================================== */}

        <img
          src={poster}
          alt={title}
          loading="lazy"
          draggable="false"
          onLoad={() =>
            setLoaded(true)
          }
          onError={handleImageError}
          className={
            loaded
              ? "movie-poster-loaded"
              : ""
          }
        />

        {/* ===================================================
            TRAILER PREVIEW
        =================================================== */}

        {trailerUrl && (
          <div
            className={`
              movie-trailer-preview
              ${showTrailer ? "is-visible" : ""}
            `}
            aria-hidden="true"
          >
            <iframe
              ref={videoRef}
              src={trailerUrl}
              title={`${title} trailer preview`}
              allow="
                autoplay;
                encrypted-media;
                picture-in-picture
              "
              allowFullScreen={false}
              tabIndex="-1"
            />

            <div className="movie-trailer-shade" />

            <span className="movie-trailer-muted">
              <FaVolumeMute />
              Preview
            </span>
          </div>
        )}

        {/* ===================================================
            TRAILER LOADING
        =================================================== */}

        {trailerLoading &&
          hovered &&
          !showTrailer && (
            <div
              className="movie-trailer-loading"
              aria-hidden="true"
            >
              <span />
              <small>
                Loading preview...
              </small>
            </div>
          )}

        {/* ===================================================
            TRAILER ERROR
        =================================================== */}

        {trailerError &&
          hovered &&
          !showTrailer && (
            <div
              className="movie-trailer-error"
              aria-hidden="true"
            >
              <small>
                Preview unavailable
              </small>
            </div>
          )}

        {/* ===================================================
            IMAGE GRADIENT
        =================================================== */}

        <div
          className="movie-card-gradient"
          aria-hidden="true"
        />

        {/* ===================================================
            CURSOR SPOTLIGHT
        =================================================== */}

        <div
          className="movie-card-spotlight"
          aria-hidden="true"
        />

        {/* ===================================================
            TOP RATING
        =================================================== */}

        <div className="movie-card-top-meta">
          {rating ? (
            <span className="movie-rating">
              <FaStar />
              {rating}
            </span>
          ) : (
            <span className="movie-upcoming-badge">
              UPCOMING
            </span>
          )}

          {/* HD BADGE */}

          <span className="movie-quality-badge">
            HD
          </span>
        </div>

        {/* ===================================================
            HOVER OVERLAY
        =================================================== */}

        <div
          className={`
            movie-hover-overlay
            ${hovered ? "is-visible" : ""}
          `}
          aria-hidden={!hovered}
        >
          <span className="movie-play">
            <FaPlay />
          </span>

          <span className="movie-preview-label">
            {showTrailer
              ? "Trailer Preview"
              : "View Details"}
          </span>
        </div>

        {/* ===================================================
            QUICK WATCHLIST
        =================================================== */}

        <button
          type="button"
          className={`
            movie-poster-watchlist
            ${isWatchlisted ? "is-active" : ""}
          `}
          onClick={handleWatchlist}
          aria-label={
            isWatchlisted
              ? `Remove ${title} from watchlist`
              : `Add ${title} to watchlist`
          }
          aria-pressed={isWatchlisted}
        >
          {isWatchlisted ? (
            <FaCheck />
          ) : (
            <FaPlus />
          )}
        </button>
      </Link>

      {/* =====================================================
          CARD INFORMATION
      ===================================================== */}

      <div className="movie-card-info">
        {/* TITLE */}

        <Link
          to={`/movie/${movie.id}`}
          className="movie-title"
          title={title}
        >
          {title}
        </Link>

        {/* META */}

        <div className="movie-card-meta-row">
          <span>
            {year}
          </span>

          <span className="meta-dot">
            •
          </span>

          <span>
            {mediaType}
          </span>

          {runtime && (
            <>
              <span className="meta-dot">
                •
              </span>

              <span>
                {runtime}m
              </span>
            </>
          )}
        </div>

        {/* GENRES */}

        {genreNames.length > 0 && (
          <div className="movie-genres">
            {genreNames.map(
              (genre) => (
                <span
                  key={genre}
                  className="movie-genre"
                >
                  {genre}
                </span>
              )
            )}
          </div>
        )}

        {/* ===================================================
            BOTTOM ACTIONS
        =================================================== */}

        <div className="movie-card-bottom">
          <div className="movie-card-actions">
            {/* FAVORITE */}

            {onFavorite && (
              <button
                type="button"
                className={`
                  card-icon
                  ${isFavorite ? "is-active" : ""}
                `}
                aria-label={
                  isFavorite
                    ? `Remove ${title} from favorites`
                    : `Add ${title} to favorites`
                }
                aria-pressed={isFavorite}
                onClick={handleFavorite}
              >
                <FaStar />
              </button>
            )}

            {/* WATCHLIST */}

            <button
              type="button"
              className={`
                card-icon
                ${isWatchlisted ? "is-active" : ""}
              `}
              aria-label={
                isWatchlisted
                  ? `Remove ${title} from watchlist`
                  : `Add ${title} to watchlist`
              }
              aria-pressed={isWatchlisted}
              onClick={handleWatchlist}
            >
              {isWatchlisted ? (
                <FaCheck />
              ) : (
                <FaBookmark />
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}