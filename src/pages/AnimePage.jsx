import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  Search,
  Play,
  ChevronLeft,
  ChevronRight,
  Star,
  Plus,
  Check,
  Heart,
  X,
  SlidersHorizontal,
  Flame,
  Trophy,
  CalendarDays,
  Film,
  Tv,
  Loader2,
} from "lucide-react";

import {
  discoverAnime,
} from "../services/tmdbService";

import "./AnimePage.css";


// ======================================================
// CONFIG
// ======================================================

const HERO_INTERVAL = 6500;

const TMDB_BACKDROP =
  "https://image.tmdb.org/t/p/original";

const TMDB_POSTER =
  "https://image.tmdb.org/t/p/w500";


// ======================================================
// GENRES
// ======================================================
//
// These are TMDB genres that can actually be queried.
// Animation (16) is automatically added to every request.
//

const ANIME_GENRES = [
  {
    id: null,
    name: "All Anime",
  },

  {
    id: 28,
    name: "Action",
  },

  {
    id: 12,
    name: "Adventure",
  },

  {
    id: 35,
    name: "Comedy",
  },

  {
    id: 80,
    name: "Crime",
  },

  {
    id: 99,
    name: "Documentary",
  },

  {
    id: 18,
    name: "Drama",
  },

  {
    id: 10751,
    name: "Family",
  },

  {
    id: 14,
    name: "Fantasy",
  },

  {
    id: 36,
    name: "History",
  },

  {
    id: 27,
    name: "Horror",
  },

  {
    id: 10402,
    name: "Music",
  },

  {
    id: 9648,
    name: "Mystery",
  },

  {
    id: 10749,
    name: "Romance",
  },

  {
    id: 878,
    name: "Science Fiction",
  },

  {
    id: 53,
    name: "Thriller",
  },

  {
    id: 10752,
    name: "War",
  },

  {
    id: 37,
    name: "Western",
  },
];


// ======================================================
// SORT TABS
// ======================================================

const SORT_TABS = [
  {
    id: "popular",
    label: "Popular",
    icon: Flame,
    sort: "popularity.desc",
  },

  {
    id: "top-rated",
    label: "Top Rated",
    icon: Trophy,
    sort: "vote_average.desc",
  },

  {
    id: "airing",
    label: "Latest Anime",
    icon: CalendarDays,
    sort: "first_air_date.desc",
  },
];


// ======================================================
// HELPERS
// ======================================================

function safeArray(value) {
  return Array.isArray(value)
    ? value
    : [];
}


function getTitle(anime) {
  return (
    anime?.title ||
    anime?.name ||
    anime?.original_title ||
    anime?.original_name ||
    "Untitled Anime"
  );
}


function getYear(anime) {
  return (
    anime?.release_date ||
    anime?.first_air_date ||
    ""
  ).slice(0, 4);
}


function posterUrl(path) {
  return path
    ? `${TMDB_POSTER}${path}`
    : "/placeholder.jpg";
}


function backdropUrl(path) {
  return path
    ? `${TMDB_BACKDROP}${path}`
    : "";
}


function normalizeTitle(title = "") {
  return String(title)
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}


function dedupeAnime(items = []) {
  const seen = new Set();

  return items.filter((anime) => {
    if (!anime?.id) {
      return false;
    }

    const key =
      `${anime.media_type || "unknown"}-${anime.id}`;

    const title =
      normalizeTitle(getTitle(anime));

    const year =
      getYear(anime);

    const titleKey =
      `${title}-${year}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);

    return true;
  });
}


function getRating(anime) {
  const value =
    Number(anime?.vote_average || 0);

  return value
    ? value.toFixed(1)
    : "—";
}


function getMatch(anime) {
  const rating =
    Number(anime?.vote_average || 0);

  const popularity =
    Number(anime?.popularity || 0);

  const score =
    rating * 8 +
    Math.min(popularity / 10, 20);

  return Math.min(
    98,
    Math.max(
      55,
      Math.round(score)
    )
  );
}


function getType(anime) {
  return anime?.media_type === "movie"
    ? "MOVIE"
    : "SERIES";
}


function getRoute(anime) {
  return anime?.media_type === "movie"
    ? `/movie/${anime.id}`
    : `/tv/${anime.id}`;
}


// ======================================================
// STORAGE
// ======================================================

function getStorage(key) {
  try {
    const data =
      JSON.parse(
        localStorage.getItem(key) || "[]"
      );

    return Array.isArray(data)
      ? data
      : [];
  } catch {
    return [];
  }
}


function saveStorage(key, value) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );

  window.dispatchEvent(
    new Event(
      "cristal-storage-update"
    )
  );
}


// ======================================================
// ANIME CARD
// ======================================================

function AnimeCard({
  anime,
  onUpdate,
}) {
  const [hovered, setHovered] =
    useState(false);

  const [saved, setSaved] =
    useState(() =>
      getStorage(
        "cristal-anime-watchlist"
      ).some(
        (item) =>
          String(item.id) ===
          String(anime.id)
      )
    );

  const [favorite, setFavorite] =
    useState(() =>
      getStorage(
        "cristal-anime-favorites"
      ).some(
        (item) =>
          String(item.id) ===
          String(anime.id)
      )
    );


  function toggleWatchlist() {
    const list =
      getStorage(
        "cristal-anime-watchlist"
      );

    const exists =
      list.some(
        (item) =>
          String(item.id) ===
          String(anime.id)
      );

    const next = exists
      ? list.filter(
          (item) =>
            String(item.id) !==
            String(anime.id)
        )
      : [
          ...list,
          {
            ...anime,
            title: getTitle(anime),
          },
        ];

    saveStorage(
      "cristal-anime-watchlist",
      next
    );

    setSaved(!exists);

    onUpdate?.();
  }


  function toggleFavorite() {
    const list =
      getStorage(
        "cristal-anime-favorites"
      );

    const exists =
      list.some(
        (item) =>
          String(item.id) ===
          String(anime.id)
      );

    const next = exists
      ? list.filter(
          (item) =>
            String(item.id) !==
            String(anime.id)
        )
      : [
          ...list,
          {
            ...anime,
            title: getTitle(anime),
          },
        ];

    saveStorage(
      "cristal-anime-favorites",
      next
    );

    setFavorite(!exists);

    onUpdate?.();
  }


  return (
    <article
      aria-label={getTitle(anime)}
      className={
        hovered
          ? "anime-card is-hovered"
          : "anime-card"
      }

      onMouseEnter={() =>
        setHovered(true)
      }

      onMouseLeave={() =>
        setHovered(false)
      }
    >

      {/* POSTER */}

      <div className="anime-card-media">

        <img
          src={posterUrl(
            anime.poster_path
          )}
          alt={getTitle(anime)}
          loading="lazy"
        />


        <div className="anime-card-gradient" />


        {/* MATCH */}

        <span className="anime-match">
          {getMatch(anime)}% Match
        </span>


        {/* TYPE */}

        <span className="anime-type">
          {anime.media_type === "movie" ? (
            <Film size={10} />
          ) : (
            <Tv size={10} />
          )}

          {getType(anime)}
        </span>


        {/* RATING */}

        <span className="anime-rating">
          <Star
            size={11}
            fill="currentColor"
          />

          {getRating(anime)}
        </span>


        {/* HOVER PREVIEW */}

        {hovered && (
          <div className="anime-hover-preview">

            {backdropUrl(
              anime.backdrop_path
            ) && (
              <div
                className="anime-hover-bg"
                style={{
                  backgroundImage:
                    `url(${backdropUrl(
                      anime.backdrop_path
                    )})`,
                }}
              />
            )}

            <div className="anime-hover-content">

              <Link
                to={getRoute(anime)}
                className="anime-hover-play"
              >
                <Play
                  size={18}
                  fill="currentColor"
                />
              </Link>

              <span>
                View details
              </span>

            </div>

          </div>
        )}


        {/* ACTIONS */}

        <div className="anime-card-top-actions">

          <button
            type="button"
            className={
              favorite
                ? "anime-icon-button active"
                : "anime-icon-button"
            }
            onClick={(event) => {
              event.stopPropagation();
              toggleFavorite();
            }}
            title="Favorite"
          >
            <Heart
              size={13}
              fill={
                favorite
                  ? "currentColor"
                  : "none"
              }
            />
          </button>

        </div>


        {/* BOTTOM TECH */}

        <div className="anime-card-tech">

          <span>
            HD
          </span>

          <span>
            JP
          </span>

        </div>

      </div>


      {/* BODY */}

      <div className="anime-card-body">

        <div className="anime-card-title-row">

          <h3 title={getTitle(anime)}>
            {getTitle(anime)}
          </h3>

          <span className="anime-card-star">
            <Star
              size={11}
              fill="currentColor"
            />

            {getRating(anime)}
          </span>

        </div>


        <div className="anime-card-meta">

          <span>
            {getYear(anime) || "New"}
          </span>

          <span>
            •
          </span>

          <span>
            Japanese
          </span>

        </div>


        <p className="anime-card-overview">
          {anime.overview ||
            "Discover this anime on CRISTAL."}
        </p>


        <div className="anime-card-actions">

          <Link
            to={getRoute(anime)}
            className="anime-watch-button"
          >
            <Play size={13} />
            Watch
          </Link>


          <button
            type="button"
            className={
              saved
                ? "anime-action active"
                : "anime-action"
            }
            onClick={(event) => {
              event.stopPropagation();
              toggleWatchlist();
            }}
            title={
              saved
                ? "Remove from watchlist"
                : "Add to watchlist"
            }
          >
            {saved ? (
              <Check size={14} />
            ) : (
              <Plus size={14} />
            )}
          </button>

        </div>

      </div>

    </article>
  );
}


// ======================================================
// SKELETON
// ======================================================

function AnimeSkeletons() {
  return (
    <div className="anime-grid">

      {Array.from({
        length: 15,
      }).map((_, index) => (
        <div
          className="anime-skeleton"
          key={index}
        >

          <div className="anime-skeleton-poster" />

          <div className="anime-skeleton-line" />

          <div className="anime-skeleton-line short" />

        </div>
      ))}

    </div>
  );
}


// ======================================================
// MAIN
// ======================================================

export default function AnimePage() {

  const [anime, setAnime] =
    useState([]);

  const [heroAnime, setHeroAnime] =
    useState([]);

  const [heroIndex, setHeroIndex] =
    useState(0);

  const [activeTab, setActiveTab] =
    useState("popular");

  const [activeGenre, setActiveGenre] =
    useState(null);

  const [genreOpen, setGenreOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loading, setLoading] =
    useState(true);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [error, setError] =
    useState("");

  const [, setStorageVersion] =
    useState(0);


  // ====================================================
  // ACTIVE SORT
  // ====================================================

  const activeSort =
    SORT_TABS.find(
      (tab) =>
        tab.id === activeTab
    ) || SORT_TABS[0];


  // ====================================================
  // LOAD ANIME
  // ====================================================

  async function loadAnime({
    reset = true,
    targetPage = 1,
  } = {}) {

    if (reset) {
      setLoading(true);
      setError("");
    } else {
      setLoadingMore(true);
    }


    try {

      const data =
        await discoverAnime({
          page: targetPage,
          genreId: activeGenre,
          sortBy: activeSort.sort,
        });


      const incoming =
        safeArray(data?.results);


      if (reset) {

        const clean =
          dedupeAnime(incoming);

        setAnime(clean);

        setPage(targetPage);

        setTotalPages(
          Number(
            data?.total_pages || 1
          )
        );

      } else {

        setAnime((current) =>
          dedupeAnime([
            ...current,
            ...incoming,
          ])
        );

        setPage(targetPage);

        setTotalPages(
          Number(
            data?.total_pages || totalPages
          )
        );
      }


    } catch (err) {

      console.error(
        "Anime page error:",
        err
      );

      if (reset) {
        setAnime([]);
      }

      setError(
        "Unable to load anime from TMDB."
      );

    } finally {

      setLoading(false);

      setLoadingMore(false);
    }
  }


  // ====================================================
  // INITIAL / FILTER LOAD
  // ====================================================

  useEffect(() => {

    setHeroIndex(0);

    loadAnime({
      reset: true,
      targetPage: 1,
    });

  }, [
    activeTab,
    activeGenre,
  ]);


  // ====================================================
  // HERO
  // ====================================================

  useEffect(() => {

    if (!anime.length) {
      return;
    }

    const sorted =
      [...anime]
        .sort(
          (a, b) =>
            Number(
              b.popularity || 0
            ) -
            Number(
              a.popularity || 0
            )
        );

    setHeroAnime(
      dedupeAnime(sorted).slice(
        0,
        10
      )
    );

  }, [anime]);


  const activeHero =
    heroAnime[
      heroIndex
    ] ||
    heroAnime[0] ||
    null;


  // ====================================================
  // HERO AUTO PLAY
  // ====================================================

  useEffect(() => {

    if (
      heroAnime.length <= 1
    ) {
      return;
    }

    const timer =
      setInterval(() => {

        setHeroIndex(
          (current) =>
            (
              current + 1
            ) %
            heroAnime.length
        );

      }, HERO_INTERVAL);


    return () => {
      clearInterval(timer);
    };

  }, [
    heroAnime.length,
  ]);


  // ====================================================
  // RESET HERO
  // ====================================================

  useEffect(() => {

    if (
      heroIndex >=
      heroAnime.length
    ) {
      setHeroIndex(0);
    }

  }, [
    heroIndex,
    heroAnime.length,
  ]);


  // ====================================================
  // SEARCH
  // ====================================================

  const visibleAnime =
    useMemo(() => {

      const query =
        search
          .trim()
          .toLowerCase();


      if (!query) {
        return anime;
      }


      return anime.filter(
        (item) =>
          getTitle(item)
            .toLowerCase()
            .includes(query)
      );

    }, [
      anime,
      search,
    ]);


  // ====================================================
  // LOAD MORE
  // ====================================================

  async function handleLoadMore() {

    if (
      loadingMore ||
      page >= totalPages
    ) {
      return;
    }


    await loadAnime({
      reset: false,
      targetPage:
        page + 1,
    });
  }


  // ====================================================
  // GENRE
  // ====================================================

  function selectGenre(id) {

    setActiveGenre(id);

    setGenreOpen(false);

    setSearch("");

  }


  // ====================================================
  // STORAGE
  // ====================================================

  useEffect(() => {

    function refresh() {
      setStorageVersion(
        (value) => value + 1
      );
    }

    window.addEventListener(
      "cristal-storage-update",
      refresh
    );

    return () => {
      window.removeEventListener(
        "cristal-storage-update",
        refresh
      );
    };

  }, []);


  // ====================================================
  // RENDER
  // ====================================================

  return (
    <main className="anime-page">


      {/* =================================================
          HERO
      ================================================= */}

      {!loading &&
        activeHero && (

          <section className="anime-hero">

            <div
              key={
                activeHero.id
              }
              className="anime-hero-backdrop"
              style={{
                backgroundImage:
                  `url(${backdropUrl(
                    activeHero.backdrop_path ||
                    activeHero.poster_path
                  )})`,
              }}
            />


            <div className="anime-hero-shade" />


            {/* TOP NAV */}

            <div className="anime-hero-top">

              <span className="anime-hero-label">
                CRISTAL ANIME
              </span>

              <span className="anime-hero-count">
                TOP {heroIndex + 1}
                {" "}
                / 10
              </span>

            </div>


            {/* CONTENT */}

            <div className="anime-hero-content">

              <span className="anime-hero-eyebrow">
                #{heroIndex + 1}
                {" "}
                ANIME TO WATCH
              </span>


              <h1>
                {getTitle(
                  activeHero
                )}
              </h1>


              <div className="anime-hero-meta">

                <strong>
                  <Star
                    size={13}
                    fill="currentColor"
                  />

                  {getRating(
                    activeHero
                  )}
                </strong>

                <span>
                  {getYear(
                    activeHero
                  ) || "New"}
                </span>

                <span>
                  Japanese
                </span>

                <span>
                  {getMatch(
                    activeHero
                  )}% Match
                </span>

                <span>
                  {getType(
                    activeHero
                  )}
                </span>

              </div>


              <p className="anime-hero-overview">
                {activeHero.overview ||
                  "Discover one of the most popular anime currently available on CRISTAL."}
              </p>


              <div className="anime-hero-actions">

                <Link
                  to={getRoute(
                    activeHero
                  )}
                  className="anime-hero-watch"
                >
                  <Play
                    size={15}
                    fill="currentColor"
                  />

                  Watch now
                </Link>


                <Link
                  to={getRoute(
                    activeHero
                  )}
                  className="anime-hero-details"
                >
                  View details
                </Link>

              </div>

            </div>


            {/* HERO CONTROLS */}

            <div className="anime-hero-controls">

              <button
                type="button"
                onClick={() =>
                  setHeroIndex(
                    (current) =>
                      current === 0
                        ? heroAnime.length - 1
                        : current - 1
                  )
                }
                aria-label="Previous anime"
              >
                <ChevronLeft
                  size={17}
                />
              </button>


              <div className="anime-hero-dots">

                {heroAnime.map(
                  (item, index) => (
                    <button
                      type="button"
                      key={
                        `${item.media_type}-${item.id}`
                      }
                      className={
                        index ===
                        heroIndex
                          ? "active"
                          : ""
                      }
                      onClick={() =>
                        setHeroIndex(
                          index
                        )
                      }
                      aria-label={
                        `Go to slide ${index + 1}`
                      }
                    />
                  )
                )}

              </div>


              <button
                type="button"
                onClick={() =>
                  setHeroIndex(
                    (current) =>
                      (
                        current + 1
                      ) %
                      heroAnime.length
                  )
                }
                aria-label="Next anime"
              >
                <ChevronRight
                  size={17}
                />
              </button>

            </div>

          </section>

        )}


      {/* =================================================
          DISCOVERY HEADER
      ================================================= */}

      <section className="anime-discovery">

        <div className="anime-heading">

          <div>

            <span>
              DISCOVER ANIME
            </span>

            <h2>
              Find your next
              {" "}
              <em>
                obsession.
              </em>
            </h2>

          </div>


          <div className="anime-search">

            <Search
              size={16}
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search anime..."
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
              >
                <X size={14} />
              </button>
            )}

          </div>

        </div>


        {/* =================================================
            CATEGORY BAR
        ================================================= */}

        <div className="anime-category-bar">

          <div className="anime-sort-tabs">

            {SORT_TABS.map(
              (tab) => {

                const Icon =
                  tab.icon;

                return (
                  <button
                    type="button"
                    key={tab.id}
                    className={
                      activeTab ===
                      tab.id
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setActiveTab(
                        tab.id
                      )
                    }
                  >
                    <Icon
                      size={14}
                    />

                    {tab.label}
                  </button>
                );

              }
            )}

          </div>


          {/* GENRE BUTTON */}

          <div className="anime-genre-wrapper">

            <button
              type="button"
              className={
                genreOpen ||
                activeGenre !== null
                  ? "anime-genre-button active"
                  : "anime-genre-button"
              }
              onClick={() =>
                setGenreOpen(
                  (value) => !value
                )
              }
            >

              <SlidersHorizontal
                size={14}
              />

              {activeGenre === null
                ? "Genres"
                : ANIME_GENRES.find(
                    (genre) =>
                      genre.id ===
                      activeGenre
                  )?.name ||
                  "Genres"}

            </button>


            {genreOpen && (

              <div className="anime-genre-menu">

                <div className="anime-genre-menu-header">

                  <div>

                    <strong>
                      Genre
                    </strong>

                    <span>
                      Explore anime by category
                    </span>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setGenreOpen(
                        false
                      )
                    }
                  >
                    <X size={15} />
                  </button>

                </div>


                <div className="anime-genre-grid">

                  {ANIME_GENRES.map(
                    (genre) => (

                      <button
                        type="button"
                        key={
                          genre.id ??
                          "all"
                        }
                        className={
                          activeGenre ===
                          genre.id
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          selectGenre(
                            genre.id
                          )
                        }
                      >
                        {genre.name}
                      </button>

                    )
                  )}

                </div>

              </div>

            )}

          </div>

        </div>

      </section>


      {/* =================================================
          RESULTS
      ================================================= */}

      <section className="anime-results">

        <div className="anime-results-heading">

          <div>

            <span>
              {activeGenre === null
                ? "CURATED FOR YOU"
                : ANIME_GENRES.find(
                    (genre) =>
                      genre.id ===
                      activeGenre
                  )?.name?.toUpperCase()}
            </span>

            <h2>
              {activeTab === "popular" &&
                "Popular anime"}

              {activeTab === "top-rated" &&
                "Top rated anime"}

              {activeTab === "airing" &&
                "Latest anime"}
            </h2>

          </div>


          <strong>
            {visibleAnime.length}
            {" "}
            titles
          </strong>

        </div>


        {/* LOADING */}

        {loading && (
          <AnimeSkeletons />
        )}


        {/* ERROR */}

        {!loading &&
          error && (

            <div className="anime-state">

              <Film
                size={40}
              />

              <h2>
                Something went wrong
              </h2>

              <p>
                {error}
              </p>

              <button
                type="button"
                onClick={() =>
                  loadAnime({
                    reset: true,
                    targetPage: 1,
                  })
                }
              >
                Try again
              </button>

            </div>

          )}


        {/* EMPTY */}

        {!loading &&
          !error &&
          visibleAnime.length === 0 && (

            <div className="anime-state">

              <Search
                size={40}
              />

              <h2>
                No anime found
              </h2>

              <p>
                Try another title or genre.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setActiveGenre(null);
                }}
              >
                Reset discovery
              </button>

            </div>

          )}


        {/* GRID */}

        {!loading &&
          !error &&
          visibleAnime.length > 0 && (

            <div className="anime-grid">

              {visibleAnime.map(
                (item) => (

                  <AnimeCard
                    key={
                      `${item.media_type}-${item.id}`
                    }
                    anime={item}
                    onUpdate={() =>
                      setStorageVersion(
                        (value) =>
                          value + 1
                      )
                    }
                  />

                )
              )}

            </div>

          )}


        {/* LOAD MORE */}

        {!loading &&
          !error &&
          visibleAnime.length > 0 &&
          page < totalPages && (

            <div className="anime-load-more">

              <button
                type="button"
                onClick={
                  handleLoadMore
                }
                disabled={
                  loadingMore
                }
              >

                {loadingMore ? (
                  <>
                    <Loader2
                      size={15}
                      className="anime-spinner"
                    />

                    Loading...
                  </>
                ) : (
                  <>
                    Load more anime
                    <ChevronRight
                      size={15}
                    />
                  </>
                )}

              </button>

              <span>
                Page {page} of{" "}
                {totalPages}
              </span>

            </div>

          )}

      </section>


      {/* =================================================
          FOOTER STRIP
      ================================================= */}

      <footer className="anime-footer">

        <div>
          <Tv size={16} />
          Anime series
        </div>

        <div>
          <Film size={16} />
          Anime movies
        </div>

        <div>
          <Star size={16} />
          TMDB ratings
        </div>

        <div>
          <Flame size={16} />
          TMDB discovery
        </div>

      </footer>

    </main>
  );
}