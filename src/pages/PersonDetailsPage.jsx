import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaStar,
  FaCalendar,
  FaFilm,
  FaTv,
  FaTrophy,
  FaPlay,
} from "react-icons/fa";

import {
  getPersonDetails,
} from "../services/tmdbService";

import "./PersonDetailsPage.css";

const TMDB_IMAGE =
  "https://image.tmdb.org/t/p";

const image = (
  path,
  size = "original"
) => {
  if (!path) {
    return "/placeholder.jpg";
  }

  return `${TMDB_IMAGE}/${size}${path}`;
};

const getYear = (date) => {
  if (!date) return "—";

  return date.slice(0, 4);
};

const getTitle = (item) => {
  return (
    item?.title ||
    item?.name ||
    "Untitled"
  );
};

export default function PersonDetailsPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [person, setPerson] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [activeTab, setActiveTab] =
    useState("all");

  useEffect(() => {

    let cancelled = false;

    const loadPerson = async () => {

      if (!id) {
        setError("Person ID is missing.");
        setLoading(false);
        return;
      }

      try {

        setLoading(true);
        setError("");

        const data =
          await getPersonDetails(id);

        if (cancelled) return;

        setPerson(data);

      } catch (err) {

        console.error(
          "Person loading error:",
          err
        );

        if (!cancelled) {
          setError(
            "Unable to load this person's profile."
          );
        }

      } finally {

        if (!cancelled) {
          setLoading(false);
        }

      }
    };

    loadPerson();

    return () => {
      cancelled = true;
    };

  }, [id]);

  /*
   * ==============================
   * LOADING
   * ==============================
   */

  if (loading) {

    return (
      <div className="person-page-state">

        <div className="person-spinner" />

        <p>
          Loading profile...
        </p>

      </div>
    );
  }

  /*
   * ==============================
   * ERROR
   * ==============================
   */

  if (error || !person) {

    return (
      <div className="person-page-state">

        <h2>
          Person not found
        </h2>

        <p>
          {error ||
            "This profile could not be loaded."}
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Go back
        </button>

      </div>
    );
  }

  /*
   * ==============================
   * CREDITS
   * ==============================
   */

  const credits =
    person?.combined_credits;

  const allCredits = (() => {

    if (!credits) {
      return [];
    }

    const cast = Array.isArray(
      credits.cast
    )
      ? credits.cast
      : [];

    const crew = Array.isArray(
      credits.crew
    )
      ? credits.crew
      : [];

    const merged = [
      ...cast,
      ...crew,
    ];

    const unique =
      new Map();

    merged.forEach((item) => {

      if (!item?.id) return;

      const key = `${
        item.media_type || "unknown"
      }-${item.id}`;

      if (!unique.has(key)) {
        unique.set(key, item);
      }

    });

    return Array.from(
      unique.values()
    );

  })();

  /*
   * ==============================
   * MOVIES
   * ==============================
   */

  const movies = (() => {

    return allCredits
      .filter(
        (item) =>
          item.media_type === "movie"
      )
      .sort((a, b) => {

        const dateA =
          a.release_date || "";

        const dateB =
          b.release_date || "";

        return dateB.localeCompare(
          dateA
        );
      });

  })();

  /*
   * ==============================
   * TV
   * ==============================
   */

  const tvShows = (() => {

    return allCredits
      .filter(
        (item) =>
          item.media_type === "tv"
      )
      .sort((a, b) => {

        const dateA =
          a.first_air_date || "";

        const dateB =
          b.first_air_date || "";

        return dateB.localeCompare(
          dateA
        );
      });

  })();

  /*
   * ==============================
   * DISPLAY CREDITS
   * ==============================
   */

  const visibleCredits =
    activeTab === "movies"
      ? movies
      : activeTab === "tv"
      ? tvShows
      : allCredits;

  /*
   * ==============================
   * AGE
   * ==============================
   */

  const birthday =
    person.birthday
      ? new Date(person.birthday)
      : null;

  let age = null;

  if (birthday) {

    const today =
      new Date();

    age =
      today.getFullYear() -
      birthday.getFullYear();

    const month =
      today.getMonth() -
      birthday.getMonth();

    if (
      month < 0 ||
      (
        month === 0 &&
        today.getDate() <
          birthday.getDate()
      )
    ) {
      age--;
    }
  }

  /*
   * ==============================
   * NAVIGATION
   * ==============================
   */

  const openMovie = (item) => {

    if (!item?.id) return;

    if (
      item.media_type === "tv"
    ) {
      navigate(`/tv/${item.id}`);
    } else {
      navigate(`/movie/${item.id}`);
    }

  };

  /*
   * ==============================
   * RENDER
   * ==============================
   */

  return (
    <div className="person-page">

      {/* =========================
          HERO
      ========================== */}

      <section className="person-hero">

        <div
          className="person-backdrop"
          style={{
            backgroundImage:
              person.profile_path
                ? `url(${image(
                    person.profile_path,
                    "original"
                  )})`
                : "none",
          }}
        />

        <div className="person-backdrop-overlay" />

        <div className="person-hero-content">

          <button
            type="button"
            className="person-back-button"
            onClick={() =>
              navigate(-1)
            }
          >
            <FaArrowLeft />
          </button>

          <div className="person-hero-grid">

            {/* PROFILE IMAGE */}

            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="person-profile-wrapper"
            >

              <img
                src={image(
                  person.profile_path,
                  "w500"
                )}
                alt={person.name}
                className="person-profile-image"
              />

            </motion.div>

            {/* INFORMATION */}

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: 0.1,
                duration: 0.5,
              }}
              className="person-info"
            >

              <span className="person-kicker">
                CRISTAL PEOPLE
              </span>

              <h1>
                {person.name}
              </h1>

              {person.known_for_department && (
                <p className="person-profession">
                  {person.known_for_department}
                </p>
              )}

              <div className="person-meta">

                {person.birthday && (
                  <span>
                    <FaCalendar />
                    {person.birthday}
                    {age !== null &&
                      ` · ${age} years`}
                  </span>
                )}

                {person.place_of_birth && (
                  <span>
                    {person.place_of_birth}
                  </span>
                )}

              </div>

              {person.biography && (
                <p className="person-biography">
                  {person.biography}
                </p>
              )}

            </motion.div>

          </div>

        </div>

      </section>

      {/* =========================
          CONTENT
      ========================== */}

      <main className="person-content">

        {/* STATS */}

        <section className="person-stats">

          <div>
            <FaFilm />

            <strong>
              {movies.length}
            </strong>

            <span>
              Movies
            </span>
          </div>

          <div>
            <FaTv />

            <strong>
              {tvShows.length}
            </strong>

            <span>
              TV Shows
            </span>
          </div>

          <div>
            <FaStar />

            <strong>
              {allCredits.length}
            </strong>

            <span>
              Credits
            </span>
          </div>

          <div>
            <FaTrophy />

            <strong>
              {person.award_count ||
                "—"}
            </strong>

            <span>
              Awards
            </span>
          </div>

        </section>

        {/* =====================
            KNOWN FOR
        ====================== */}

        {allCredits.length > 0 && (
          <section className="person-section">

            <div className="person-section-heading">

              <div>
                <span>
                  CAREER HIGHLIGHTS
                </span>

                <h2>
                  Known for
                </h2>
              </div>

            </div>

            <div className="person-known-grid">

              {allCredits
                .filter(
                  (item) =>
                    item.poster_path
                )
                .sort(
                  (a, b) =>
                    (b.popularity || 0) -
                    (a.popularity || 0)
                )
                .slice(0, 6)
                .map((item) => (

                  <button
                    type="button"
                    key={`${item.media_type}-${item.id}`}
                    className="person-known-card"
                    onClick={() =>
                      openMovie(item)
                    }
                  >

                    <img
                      src={image(
                        item.poster_path,
                        "w500"
                      )}
                      alt={getTitle(item)}
                    />

                    <div>

                      <h3>
                        {getTitle(item)}
                      </h3>

                      <span>
                        {getYear(
                          item.release_date ||
                          item.first_air_date
                        )}

                        {" · "}

                        <FaStar />

                        {" "}

                        {item.vote_average
                          ? item.vote_average.toFixed(
                              1
                            )
                          : "—"}
                      </span>

                    </div>

                  </button>

                ))}

            </div>

          </section>
        )}

        {/* =====================
            WORKS
        ====================== */}

        <section className="person-section">

          <div className="person-section-heading">

            <div>
              <span>
                FILMOGRAPHY
              </span>

              <h2>
                Works
              </h2>
            </div>

            <strong>
              {allCredits.length} credits
            </strong>

          </div>

          {/* TABS */}

          <div className="person-tabs">

            <button
              type="button"
              className={
                activeTab === "all"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("all")
              }
            >
              All
            </button>

            <button
              type="button"
              className={
                activeTab === "movies"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("movies")
              }
            >
              Movies
              <span>
                {movies.length}
              </span>
            </button>

            <button
              type="button"
              className={
                activeTab === "tv"
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveTab("tv")
              }
            >
              TV
              <span>
                {tvShows.length}
              </span>
            </button>

          </div>

          {/* WORK GRID */}

          <div className="person-work-grid">

            {visibleCredits
              .filter(
                (item) =>
                  item.poster_path
              )
              .map((item) => (

                <button
                  type="button"
                  key={`${item.media_type}-${item.id}`}
                  className="person-work-card"
                  onClick={() =>
                    openMovie(item)
                  }
                >

                  <div className="person-work-image">

                    <img
                      src={image(
                        item.poster_path,
                        "w500"
                      )}
                      alt={getTitle(item)}
                      loading="lazy"
                    />

                    <span>
                      <FaPlay />
                    </span>

                  </div>

                  <div className="person-work-info">

                    <h3>
                      {getTitle(item)}
                    </h3>

                    <p>
                      {item.character ||
                        item.job ||
                        item.department ||
                        "Cast"}
                    </p>

                    <span>
                      {getYear(
                        item.release_date ||
                        item.first_air_date
                      )}

                      {" · "}

                      <FaStar />

                      {" "}

                      {item.vote_average
                        ? item.vote_average.toFixed(
                            1
                          )
                        : "—"}
                    </span>

                  </div>

                </button>

              ))}

          </div>

        </section>

        {/* =====================
            BIOGRAPHY
        ====================== */}

        {person.biography && (
          <section className="person-biography-section">

            <div>
              <span>
                PROFILE
              </span>

              <h2>
                About {person.name}
              </h2>
            </div>

            <p>
              {person.biography}
            </p>

          </section>
        )}

        {/* =====================
            AWARDS
        ====================== */}

        <section className="person-awards">

          <div className="person-section-heading">

            <div>
              <span>
                RECOGNITION
              </span>

              <h2>
                Awards & achievements
              </h2>
            </div>

          </div>

          <div className="person-awards-empty">

            <FaTrophy />

            <h3>
              Awards information
            </h3>

            <p>
              Award information is not
              provided directly by the
              TMDB person credits endpoint.
              You can add an awards data
              source later to show wins,
              nominations and award history.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}