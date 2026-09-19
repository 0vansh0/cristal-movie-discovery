import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaChevronLeft,
  FaChevronRight,
  FaFilm,
  FaPlay,
  FaBookmark,
  FaStar,
} from "react-icons/fa";

import MovieCard from "../components/Movie/MovieCard";
import TrailerModal from "../components/Movie/TrailerModal";
import {
  getMovieVideos,
  getUniverseMovies,
} from "../services/tmdbService";

import "./UniversePage.css";

const collections = {
  marvel: {
    title: "Marvel",
    subtitle:
      "Marvel Studios films, heroes, and multiverses",
    logo: "/images/universes/marvel-studios.svg",
  },

  dc: {
    title: "DC",
    subtitle:
      "DC films, legends, and alternate worlds",
    logo: "/images/universes/dc-comics.svg",
  },

  anime: {
    title: "Anime",
    subtitle:
      "Popular Japanese animated feature films",
    mark: "アニメ",
  },

  "star-wars": {
    title: "Star Wars",
    subtitle:
      "The Skywalker saga and the galaxy far, far away",
    mark: "STAR WARS",
  },

  "harry-potter": {
    title: "Harry Potter",
    subtitle:
      "The complete wizarding world film series",
    mark: "HARRY POTTER",
  },

  indian: {
    title: "Indian Cinema",
    subtitle:
      "Popular Hindi, Tamil, Telugu, Malayalam, and Kannada films",
    mark: "INDIA",
  },

  a24: {
    title: "A24",
    subtitle:
      "A24's distinctive independent cinema",
    logo: "/images/universes/a24.svg",
  },
};

const IMAGE_BASE =
  "https://image.tmdb.org/t/p/";

const image = (path, size = "original") =>
  path
    ? `${IMAGE_BASE}${size}${path}`
    : "/placeholder-movie.jpg";

function getYear(movie) {
  return (
    movie?.release_date?.slice(0, 4) ||
    movie?.first_air_date?.slice(0, 4) ||
    ""
  );
}

function getRating(movie) {
  const rating = Number(movie?.vote_average || 0);

  return rating > 0 ? rating.toFixed(1) : null;
}

function getPhase(movie) {
  const year = Number(getYear(movie));

  if (!year) return "other";

  if (year >= 2008 && year <= 2012)
    return "phase1";

  if (year >= 2013 && year <= 2015)
    return "phase2";

  if (year >= 2016 && year <= 2019)
    return "phase3";

  if (year >= 2021 && year <= 2022)
    return "phase4";

  if (year >= 2023 && year <= 2024)
    return "phase5";

  if (year >= 2025)
    return "phase6";

  return "other";
}

function getTrailerKey(videos) {
  if (!Array.isArray(videos)) return null;

  const youtube = videos.filter(
    (video) =>
      video?.site === "YouTube" &&
      video?.key
  );

  const trailer =
    youtube.find(
      (video) =>
        video.type === "Trailer" &&
        video.official === true
    ) ||
    youtube.find(
      (video) => video.type === "Trailer"
    ) ||
    youtube.find(
      (video) => video.type === "Teaser"
    );

  return trailer?.key || null;
}

function Carousel({
  title,
  subtitle,
  movies,
  onTrailer,
}) {
  const [position, setPosition] = useState(0);

  const visible = 5;

  const maxPosition = Math.max(
    0,
    movies.length - visible
  );

  if (!movies.length) return null;

  const next = () =>
    setPosition((value) =>
      Math.min(value + 1, maxPosition)
    );

  const previous = () =>
    setPosition((value) =>
      Math.max(value - 1, 0)
    );

  return (
    <section className="universe-section">

      <div className="universe-section-heading">

        <div>
          <span className="universe-section-kicker">
            CURATED COLLECTION
          </span>

          <h2>{title}</h2>

          {subtitle && (
            <p>{subtitle}</p>
          )}
        </div>

        <div className="universe-carousel-controls">

          <button
            type="button"
            onClick={previous}
            disabled={position === 0}
            aria-label="Previous"
          >
            <FaChevronLeft />
          </button>

          <button
            type="button"
            onClick={next}
            disabled={
              position >= maxPosition
            }
            aria-label="Next"
          >
            <FaChevronRight />
          </button>

        </div>

      </div>

      <div className="universe-carousel">

        <div
          className="universe-carousel-track"
          style={{
            transform: `translateX(-${
              position * 20.5
            }%)`,
          }}
        >

          {movies.map((movie) => (
            <div
              className="universe-carousel-item"
              key={movie.id}
            >
              <MovieCard
                movie={movie}
                getMovieVideos={
                  getMovieVideos
                }
              />
            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default function UniversePage() {

  const { universe } = useParams();

  const collection =
    collections[universe];

  const [movies, setMovies] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [hasMore, setHasMore] =
    useState(true);

  const [status, setStatus] =
    useState("loading");

  const [sort, setSort] =
    useState("popularity");

  const [phase, setPhase] =
    useState("all");

  const [heroTrailer, setHeroTrailer] =
    useState(null);

  const [showTrailer, setShowTrailer] =
    useState(false);

  useEffect(() => {

    let cancelled = false;

    async function load() {

      setMovies([]);
      setPage(1);
      setHasMore(true);
      setStatus("loading");

      if (!collection) {
        setStatus("error");
        return;
      }

      try {

        const data =
          await getUniverseMovies(
            universe,
            1
          );

        if (cancelled) return;

        const results =
          Array.isArray(data?.results)
            ? data.results
            : [];

        setMovies(results);

        setHasMore(
          (data?.page || 1) <
            (data?.total_pages || 1)
        );

        setStatus(
          results.length
            ? "ready"
            : "empty"
        );

      } catch (error) {

        console.error(
          "Universe loading error:",
          error
        );

        if (!cancelled)
          setStatus("error");
      }
    }

    load();

    return () => {
      cancelled = true;
    };

  }, [universe]);

  async function loadMore() {

    if (!hasMore) return;

    const nextPage = page + 1;

    setStatus("loading-more");

    try {

      const data =
        await getUniverseMovies(
          universe,
          nextPage
        );

      const more =
        Array.isArray(data?.results)
          ? data.results
          : [];

      setMovies((current) => {

        const map = new Map();

        [
          ...current,
          ...more,
        ].forEach((movie) => {
          map.set(movie.id, movie);
        });

        return [...map.values()];
      });

      setPage(nextPage);

      setHasMore(
        (data?.page || nextPage) <
          (data?.total_pages ||
            nextPage)
      );

      setStatus("ready");

    } catch (error) {

      console.error(
        "Load more error:",
        error
      );

      setStatus("ready");
    }
  }

  const filteredMovies =
    useMemo(() => {

      let result = [...movies];

      if (phase !== "all") {

        result = result.filter(
          (movie) =>
            getPhase(movie) === phase
        );
      }

      if (sort === "rating") {

        result.sort(
          (a, b) =>
            (b.vote_average || 0) -
            (a.vote_average || 0)
        );
      }

      if (sort === "release") {

        result.sort(
          (a, b) =>
            new Date(
              b.release_date || 0
            ) -
            new Date(
              a.release_date || 0
            )
        );
      }

      if (sort === "alphabetical") {

        result.sort((a, b) =>
          (
            a.title ||
            a.name ||
            ""
          ).localeCompare(
            b.title ||
              b.name ||
              ""
          )
        );
      }

      if (sort === "popularity") {

        result.sort(
          (a, b) =>
            (b.popularity || 0) -
            (a.popularity || 0)
        );
      }

      return result;

    }, [movies, phase, sort]);

  const heroMovie =
    movies.find(
      (movie) =>
        movie.backdrop_path
    ) || movies[0];

  const trending =
    [...movies]
      .sort(
        (a, b) =>
          (b.popularity || 0) -
          (a.popularity || 0)
      )
      .slice(0, 10);

  const spiderMan =
    movies.filter((movie) =>
      (
        movie.title ||
        ""
      )
        .toLowerCase()
        .includes("spider-man")
    );

  const upcoming =
    movies
      .filter(
        (movie) =>
          movie.release_date &&
          new Date(movie.release_date) >
            new Date()
      )
      .sort(
        (a, b) =>
          new Date(
            a.release_date
          ) -
          new Date(
            b.release_date
          )
      )
      .slice(0, 10);

  async function openHeroTrailer() {

    if (!heroMovie?.id) return;

    try {

      const response =
        await getMovieVideos(
          heroMovie.id
        );

      const videos =
        Array.isArray(response)
          ? response
          : response?.results || [];

      const key =
        getTrailerKey(videos);

      if (!key) {
        alert(
          "Trailer is not available for this title."
        );
        return;
      }

      setHeroTrailer(key);
      setShowTrailer(true);

    } catch (error) {

      console.error(
        "Trailer error:",
        error
      );
    }
  }

  if (!collection) {

    return (
      <main className="universe-page">

        <div className="universe-state">
          <h2>
            Collection not found.
          </h2>
        </div>

      </main>
    );
  }

  return (

    <main className="universe-page">

      <Link
        className="universe-back"
        to="/movies"
      >
        <FaArrowLeft />
        Back to Movies
      </Link>

      {/* ================= HERO ================= */}

      {heroMovie && (

        <section
          className="universe-featured"
          style={{
            backgroundImage: `
              linear-gradient(
                90deg,
                rgba(5,7,10,.98) 0%,
                rgba(5,7,10,.86) 38%,
                rgba(5,7,10,.35) 72%,
                rgba(5,7,10,.15) 100%
              ),
              url(${image(
                heroMovie.backdrop_path,
                "original"
              )})
            `,
          }}
        >

          <div className="universe-featured-content">

            <span className="universe-featured-kicker">
              FEATURED IN {collection.title.toUpperCase()}
            </span>

            <h1>
              {heroMovie.title ||
                heroMovie.name}
            </h1>

            <div className="universe-featured-meta">

              {getRating(heroMovie) ? (
                <span>
                  <FaStar />
                  {getRating(heroMovie)}
                </span>
              ) : (
                <span className="upcoming-pill">
                  UPCOMING
                </span>
              )}

              {getYear(heroMovie) && (
                <span>
                  {getYear(heroMovie)}
                </span>
              )}

              <span>MOVIE</span>

            </div>

            <p>
              {heroMovie.overview ||
                `Explore the ${collection.title} cinematic universe.`}
            </p>

            <div className="universe-featured-actions">

              <button
                type="button"
                className="universe-primary-button"
                onClick={openHeroTrailer}
              >
                <FaPlay />
                Watch Trailer
              </button>

              <Link
                to={`/movie/${heroMovie.id}`}
                className="universe-secondary-button"
              >
                View Details
              </Link>

              <button
                type="button"
                className="universe-watchlist-button"
              >
                <FaBookmark />
                Watchlist
              </button>

            </div>

          </div>

        </section>
      )}

      {/* ================= COLLECTION TITLE ================= */}

      <header className="universe-hero">

        {collection.logo ? (
          <img
            src={collection.logo}
            alt={`${collection.title} logo`}
          />
        ) : (
          <span>
            {collection.mark}
          </span>
        )}

        <div>

          <p>CINEMATIC UNIVERSE</p>

          <h2>
            {collection.title}
          </h2>

          <span>
            {collection.subtitle}
          </span>

        </div>

      </header>

      {/* ================= FILTERS ================= */}

      <section className="universe-filters">

        <div>

          <span className="filter-label">
            SORT BY
          </span>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
          >
            <option value="popularity">
              Popularity
            </option>

            <option value="release">
              Release Date
            </option>

            <option value="rating">
              Rating
            </option>

            <option value="alphabetical">
              A–Z
            </option>
          </select>

        </div>

        <div>

          <span className="filter-label">
            PHASE / ERA
          </span>

          <div className="phase-pills">

            {[
              ["all", "All"],
              ["phase1", "Phase 1"],
              ["phase2", "Phase 2"],
              ["phase3", "Phase 3"],
              ["phase4", "Phase 4"],
              ["phase5", "Phase 5"],
              ["phase6", "Phase 6"],
            ].map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={
                    phase === value
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setPhase(value)
                  }
                >
                  {label}
                </button>
              )
            )}

          </div>

        </div>

      </section>

      {/* ================= CURATED CAROUSELS ================= */}

      <Carousel
        title="🔥 Trending in MCU"
        subtitle="The most popular titles right now"
        movies={trending}
      />

      {spiderMan.length > 0 && (
        <Carousel
          title="🕷️ Spider-Man Collection"
          subtitle="Web-slingers across the multiverse"
          movies={spiderMan}
        />
      )}

      {upcoming.length > 0 && (
        <Carousel
          title="🍿 Upcoming Releases"
          subtitle="Titles to keep on your radar"
          movies={upcoming}
        />
      )}

      {/* ================= ALL MOVIES ================= */}

      <section className="universe-library">

        <div className="universe-library-heading">

          <div>

            <span>
              COMPLETE LIBRARY
            </span>

            <h2>
              {collection.title} Collection
            </h2>

          </div>

          <strong>
            {filteredMovies.length} titles
          </strong>

        </div>

        {status === "loading" ? (

          <div className="universe-state">
            Loading films…
          </div>

        ) : status === "error" ? (

          <div className="universe-state">
            We could not load this collection.
          </div>

        ) : status === "empty" ? (

          <div className="universe-state">
            <FaFilm />
            No films found.
          </div>

        ) : (

          <div className="universe-grid">

            {filteredMovies.map(
              (movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  getMovieVideos={
                    getMovieVideos
                  }
                />
              )
            )}

          </div>
        )}

      </section>

      {hasMore && (
        <div className="universe-more">

          <button
            disabled={
              status === "loading-more"
            }
            onClick={loadMore}
          >
            {status === "loading-more"
              ? "Loading…"
              : "Load more films"}
          </button>

        </div>
      )}

      {/* ================= TRAILER ================= */}

      <TrailerModal
        open={showTrailer}
        videoKey={heroTrailer}
        title={
          heroMovie
            ? `${heroMovie.title || heroMovie.name} Trailer`
            : "Trailer"
        }
        onClose={() =>
          setShowTrailer(false)
        }
      />

    </main>
  );
}