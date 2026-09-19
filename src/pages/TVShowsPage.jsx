import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Flame,
  Play,
  Plus,
  Search,
  Star,
  Tv,
  Users,
  X,
} from "lucide-react";

import {
  getAiringTodayTV,
  getPopularTVShows,
  getTopRatedTVShows,
  getTVWatchProviders,
} from "../services/tmdbService";

import "./TVShowsPage.css";

const TMDB_IMAGE = "https://image.tmdb.org/t/p/";
const HERO_INTERVAL = 6500;

const posterUrl = (path) =>
  path ? `${TMDB_IMAGE}w500${path}` : "/placeholder-poster.png";

const backdropUrl = (path) =>
  path ? `${TMDB_IMAGE}original${path}` : "";

const tabs = [
  {
    id: "popular",
    label: "Popular",
    icon: Flame,
    load: getPopularTVShows,
  },
  {
    id: "top",
    label: "Top rated",
    icon: Star,
    load: getTopRatedTVShows,
  },
  {
    id: "airing",
    label: "Airing today",
    icon: Calendar,
    load: getAiringTodayTV,
  },
];

const moods = [
  {
    id: "all",
    label: "Everything",
    genres: [],
  },
  {
    id: "comfort",
    label: "Comfort watch",
    genres: [35, 18, 10751],
  },
  {
    id: "mind",
    label: "Keep me guessing",
    genres: [9648, 878, 10765],
  },
  {
    id: "thriller",
    label: "Late-night thriller",
    genres: [80, 9648, 53],
  },
];

const GENRES = {
  16: "Animation",
  18: "Drama",
  35: "Comedy",
  37: "Western",
  80: "Crime",
  99: "Documentary",
  9648: "Mystery",
  10751: "Family",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

function normalizeShows(data) {
  const list = Array.isArray(data)
    ? data
    : data?.results;

  if (!Array.isArray(list)) {
    return [];
  }

  const ids = new Set();
  const titles = new Set();

  return list.filter((show) => {
    if (!show?.id) {
      return false;
    }

    const id = String(show.id);

    const title = String(
      show.name ||
        show.original_name ||
        ""
    )
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

    if (ids.has(id)) {
      return false;
    }

    if (title && titles.has(title)) {
      return false;
    }

    ids.add(id);

    if (title) {
      titles.add(title);
    }

    return true;
  });
}

function getTitle(show) {
  return (
    show?.name ||
    show?.original_name ||
    "Untitled"
  );
}

function getYear(show) {
  const date =
    show?.first_air_date ||
    show?.release_date ||
    "";

  return date.slice(0, 4) || "New";
}

function getLanguage(show) {
  return String(
    show?.original_language ||
      "unknown"
  ).toLowerCase();
}

function getLanguageName(code) {
  const names = {
    en: "English",
    hi: "Hindi",
    ko: "Korean",
    ja: "Japanese",
    es: "Spanish",
    fr: "French",
    de: "German",
    zh: "Chinese",
    it: "Italian",
    pt: "Portuguese",
    tr: "Turkish",
    ru: "Russian",
    ar: "Arabic",
  };

  if (names[code]) {
    return names[code];
  }

  if (code === "unknown") {
    return "Unknown";
  }

  return code.toUpperCase();
}

function storageArray(key) {
  try {
    const value = JSON.parse(
      localStorage.getItem(key) || "[]"
    );

    return Array.isArray(value)
      ? value
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
    new Event("cristal-storage-update")
  );
}

function hasStoredItem(key, id) {
  return storageArray(key).some(
    (item) =>
      String(item.id) === String(id)
  );
}

function getProgress(id) {
  return storageArray(
    "cristal-tv-progress"
  ).find(
    (item) =>
      String(item.id) === String(id)
  );
}

function getMatchScore(show) {
  const rating = Number(
    show?.vote_average || 0
  );

  const popularity = Number(
    show?.popularity || 0
  );

  const score =
    rating * 8 +
    Math.min(popularity / 10, 20);

  return Math.min(
    98,
    Math.max(55, Math.round(score))
  );
}

function TVShowCard({
  show,
  providers = [],
  onRefresh,
}) {
  const title = getTitle(show);
  const progress = getProgress(show.id);

  const [watched, setWatched] =
    useState(() =>
      hasStoredItem(
        "cristal-tv-watched",
        show.id
      )
    );

  const [queued, setQueued] =
    useState(() =>
      hasStoredItem(
        "cristal-tv-queue",
        show.id
      )
    );

  function toggleStoredItem(
    event,
    storageKey,
    setter
  ) {
    event.preventDefault();
    event.stopPropagation();

    const list = storageArray(storageKey);

    const exists = list.some(
      (item) =>
        String(item.id) ===
        String(show.id)
    );

    const next = exists
      ? list.filter(
          (item) =>
            String(item.id) !==
            String(show.id)
        )
      : [
          ...list,
          {
            id: show.id,
            title,
          },
        ];

    saveStorage(storageKey, next);
    setter(!exists);
    onRefresh?.();
  }

  return (
    <article className="tv-card">
      <Link
        to={`/tv/${show.id}`}
        className="tv-card-media"
      >
        <img
          src={posterUrl(show.poster_path)}
          alt={title}
          loading="lazy"
        />

        <span className="tv-card-rating">
          <Star
            size={12}
            fill="currentColor"
          />
          {Number(
            show.vote_average || 0
          ).toFixed(1)}
        </span>

        {progress && !watched && (
          <span
            className="tv-card-progress"
            style={{
              width: `${Math.min(
                100,
                Math.max(
                  0,
                  progress.percent || 0
                )
              )}%`,
            }}
          />
        )}
      </Link>

      <div className="tv-card-body">
        <div className="tv-card-title-row">
          <h3 title={title}>
            {title}
          </h3>

          <span className="tv-card-match">
            {getMatchScore(show)}%
          </span>
        </div>

        <p className="tv-card-meta">
          {getYear(show)}
          <span />
          {getLanguageName(
            getLanguage(show)
          )}
        </p>

        <p className="tv-card-status">
          {watched
            ? "Watched"
            : progress
              ? `S${progress.season || 1} E${
                  progress.episode || 1
                } · ${
                  progress.minutesLeft || 0
                }m left`
              : "Ready to watch"}
        </p>

        {providers.length > 0 && (
          <p
            className="tv-card-provider"
            title={providers
              .map(
                (item) =>
                  item.provider_name
              )
              .join(", ")}
          >
            On{" "}
            {providers
              .slice(0, 2)
              .map(
                (item) =>
                  item.provider_name
              )
              .join(" · ")}
          </p>
        )}

        <div className="tv-card-actions">
          <Link
            to={`/tv/${show.id}`}
            className="tv-watch-button"
          >
            <Play
              size={13}
              fill="currentColor"
            />
            Watch
          </Link>

          <button
            type="button"
            className={`tv-action ${
              watched ? "active" : ""
            }`}
            onClick={(event) =>
              toggleStoredItem(
                event,
                "cristal-tv-watched",
                setWatched
              )
            }
            aria-label={
              watched
                ? "Mark unwatched"
                : "Mark watched"
            }
          >
            <Check size={14} />
          </button>

          <button
            type="button"
            className={`tv-action ${
              queued ? "active" : ""
            }`}
            onClick={(event) =>
              toggleStoredItem(
                event,
                "cristal-tv-queue",
                setQueued
              )
            }
            aria-label={
              queued
                ? "Remove from list"
                : "Add to list"
            }
          >
            {queued ? (
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

function TVSkeletons() {
  return (
    <div className="tv-grid">
      {Array.from(
        { length: 10 },
        (_, index) => (
          <div
            className="tv-skeleton"
            key={index}
          >
            <div className="tv-skeleton-poster" />
            <div className="tv-skeleton-line" />
            <div className="tv-skeleton-line short" />
          </div>
        )
      )}
    </div>
  );
}
export default function TVShowsPage() {
  const [category, setCategory] =
    useState("popular");

  const [shows, setShows] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [providers, setProviders] =
    useState({});

  const [filters, setFilters] =
    useState({
      search: "",
      genre: "all",
      platform: "all",
      year: "all",
      rating: "all",
      language: "all",
      mood: "all",
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [heroIndex, setHeroIndex] =
    useState(0);

  const [partyCopied, setPartyCopied] =
    useState(false);

  const [, refresh] =
    useState(0);

  async function loadShows(
    selectedCategory = category,
    selectedPage = 1,
    append = false
  ) {
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const selectedTab =
        tabs.find(
          (tab) =>
            tab.id ===
            selectedCategory
        ) || tabs[0];

      const data = await selectedTab.load(
        selectedPage
      );
      const nextShows = normalizeShows(data);

      setShows((current) => {
        if (!append) {
          return nextShows;
        }

        return normalizeShows([
          ...current,
          ...nextShows,
        ]);
      });

      setPage(data?.page || selectedPage);
      setTotalPages(
        data?.total_pages || selectedPage
      );

      if (!append) {
        setHeroIndex(0);
      }
    } catch (loadError) {
      console.error(
        "CRISTAL TV Shows error:",
        loadError
      );

      if (!append) {
        setShows([]);
        setError(
          "Unable to load TV shows right now."
        );
      }
    } finally {
      setLoading(false);
    setLoadingMore(false);
    }
  }

  useEffect(() => {
    setPage(1);
    setTotalPages(1);
    loadShows(category, 1, false);
  }, [category]);

  useEffect(() => {
    function handleStorageUpdate() {
      refresh(
        (value) => value + 1
      );
    }

    window.addEventListener(
      "cristal-storage-update",
      handleStorageUpdate
    );

    return () => {
      window.removeEventListener(
        "cristal-storage-update",
        handleStorageUpdate
      );
    };
  }, []);

  useEffect(() => {
    let active = true;

    async function loadProviders() {
      const entries =
        await Promise.all(
          shows
            .slice(0, 20)
            .map(async (show) => {
              try {
                const data =
                  await getTVWatchProviders(
                    show.id
                  );

                const region =
                  data?.results?.IN ||
                  data?.results?.US;

                const providerList = [
                  ...(region?.flatrate || []),
                  ...(region?.rent || []),
                  ...(region?.buy || []),
                ];

                const uniqueProviders = [
                  ...new Map(
                    providerList.map(
                      (provider) => [
                        provider.provider_id,
                        provider,
                      ]
                    )
                  ).values(),
                ];

                return [
                  show.id,
                  uniqueProviders.slice(0, 3),
                ];
              } catch {
                return [show.id, []];
              }
            })
        );

      if (active) {
        setProviders(
          Object.fromEntries(entries)
        );
      }
    }

    if (shows.length) {
      loadProviders();
    } else {
      setProviders({});
    }

    return () => {
      active = false;
    };
  }, [shows]);

  const heroShows = useMemo(() => {
    return shows
      .filter(
        (show) =>
          show.backdrop_path ||
          show.poster_path
      )
      .slice(0, 6);
  }, [shows]);

  useEffect(() => {
    if (heroShows.length <= 1) {
      return undefined;
    }

    const timer = setInterval(() => {
      setHeroIndex(
        (current) =>
          (current + 1) %
          heroShows.length
      );
    }, HERO_INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, [heroShows.length]);

  useEffect(() => {
    if (
      heroShows.length &&
      heroIndex >= heroShows.length
    ) {
      setHeroIndex(0);
    }
  }, [
    heroIndex,
    heroShows.length,
  ]);

  const featured =
    heroShows[heroIndex] ||
    shows[0] ||
    null;

  const availableGenres = useMemo(() => {
    return [
      ...new Set(
        shows.flatMap(
          (show) =>
            show.genre_ids || []
        )
      ),
    ]
      .filter(
        (id) => GENRES[id]
      )
      .sort((a, b) =>
        GENRES[a].localeCompare(
          GENRES[b]
        )
      );
  }, [shows]);

  const availablePlatforms =
    useMemo(() => {
      return [
        ...new Set(
          Object.values(providers)
            .flat()
            .map(
              (provider) =>
                provider.provider_name
            )
            .filter(Boolean)
        ),
      ].sort();
    }, [providers]);

  const availableLanguages =
    useMemo(() => {
      return [
        ...new Set(
          shows.map((show) =>
            getLanguage(show)
          )
        ),
      ]
        .filter(
          (item) =>
            item !== "unknown"
        )
        .sort();
    }, [shows]);

  const activeMood =
    moods.find(
      (item) =>
        item.id === filters.mood
    ) || moods[0];

  const visibleShows = useMemo(() => {
    const query =
      filters.search
        .trim()
        .toLowerCase();

    return shows.filter((show) => {
      const title =
        getTitle(show).toLowerCase();

      const showProviders =
        providers[show.id] || [];

      const searchMatch =
        !query ||
        title.includes(query);

      const genreMatch =
        filters.genre === "all" ||
        show.genre_ids?.includes(
          Number(filters.genre)
        );

      const platformMatch =
        filters.platform === "all" ||
        showProviders.some(
          (provider) =>
            provider.provider_name ===
            filters.platform
        );

      const yearMatch =
        filters.year === "all" ||
        Number(getYear(show)) >=
          Number(filters.year);

      const ratingMatch =
        filters.rating === "all" ||
        Number(
          show.vote_average || 0
        ) >= Number(filters.rating);

      const languageMatch =
        filters.language === "all" ||
        getLanguage(show) ===
          filters.language;

      const moodMatch =
        filters.mood === "all" ||
        show.genre_ids?.some(
          (id) =>
            activeMood.genres.includes(id)
        );

      return (
        searchMatch &&
        genreMatch &&
        platformMatch &&
        yearMatch &&
        ratingMatch &&
        languageMatch &&
        moodMatch
      );
    });
  }, [
    shows,
    providers,
    filters,
    activeMood,
  ]);

  const gridShows =
    visibleShows.filter(
      (show) =>
        !featured ||
        show.id !== featured.id
    );

  function updateFilter(
    name,
    value
  ) {
    setFilters((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function clearFilters() {
    setFilters({
      search: "",
      genre: "all",
      platform: "all",
      year: "all",
      rating: "all",
      language: "all",
      mood: "all",
    });
  }

  const hasFilters =
    Object.entries(filters).some(
      ([key, value]) => {
        if (key === "search") {
          return value.trim();
        }

        return value !== "all";
      }
    );

  async function loadMoreShows() {
    if (
      loading ||
      loadingMore ||
      page >= totalPages
    ) {
      return;
    }

    await loadShows(
      category,
      page + 1,
      true
    );
  }

  async function createParty() {
    if (!featured) {
      return;
    }

    const code =
      Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase();

    const url =
      `${window.location.origin}/tv` +
      `?party=${code}` +
      `&show=${featured.id}`;

    try {
      await navigator.clipboard?.writeText(
        url
      );
    } catch {
      // Clipboard can be unavailable on insecure pages.
    }

    setPartyCopied(true);

    window.setTimeout(() => {
      setPartyCopied(false);
    }, 2200);
  }

  function previousHero() {
    setHeroIndex((current) => {
      if (!heroShows.length) {
        return 0;
      }

      return current === 0
        ? heroShows.length - 1
        : current - 1;
    });
  }

  function nextHero() {
    setHeroIndex((current) => {
      if (!heroShows.length) {
        return 0;
      }

      return (
        (current + 1) %
        heroShows.length
      );
    });
  }

  return (
    <main className="tv-page">
      <section className="tv-discovery-header">
        <div className="tv-discovery-copy">
          <span className="tv-eyebrow">
            <Tv size={13} />
            TV DISCOVERY
          </span>

          <h1>
            Find something good
            to watch.
          </h1>

          <p>
            Popular series, old
            favourites, and a few shows
            you may have missed.
          </p>
        </div>

        <div className="tv-page-search">
          <Search size={16} />

          <input
            value={filters.search}
            onChange={(event) =>
              updateFilter(
                "search",
                event.target.value
              )
            }
            placeholder="Search shows..."
            aria-label="Search TV shows"
          />

          {filters.search && (
            <button
              type="button"
              onClick={() =>
                updateFilter(
                  "search",
                  ""
                )
              }
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </section>

      <section className="tv-filter-shell">
        <div className="tv-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                type="button"
                className={
                  category === tab.id
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setCategory(tab.id)
                }
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="tv-filter-divider" />

        <div className="tv-vibes">
          <span>Looking for</span>

          {moods.map((item) => (
            <button
              key={item.id}
              type="button"
              className={
                filters.mood === item.id
                  ? "active"
                  : ""
              }
              onClick={() =>
                updateFilter(
                  "mood",
                  item.id
                )
              }
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="tv-selects">
          <label>
            Genre

            <select
              value={filters.genre}
              onChange={(event) =>
                updateFilter(
                  "genre",
                  event.target.value
                )
              }
            >
              <option value="all">
                All genres
              </option>

              {availableGenres.map(
                (id) => (
                  <option
                    key={id}
                    value={id}
                  >
                    {GENRES[id]}
                  </option>
                )
              )}
            </select>
          </label>

          <label>
            Platform

            <select
              value={filters.platform}
              onChange={(event) =>
                updateFilter(
                  "platform",
                  event.target.value
                )
              }
            >
              <option value="all">
                Any platform
              </option>

              {availablePlatforms.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </label>
                    <label>
            Language

            <select
              value={filters.language}
              onChange={(event) =>
                updateFilter(
                  "language",
                  event.target.value
                )
              }
            >
              <option value="all">
                Any language
              </option>

              {availableLanguages.map(
                (code) => (
                  <option
                    key={code}
                    value={code}
                  >
                    {getLanguageName(code)}
                  </option>
                )
              )}
            </select>
          </label>

          <label>
            Year

            <select
              value={filters.year}
              onChange={(event) =>
                updateFilter(
                  "year",
                  event.target.value
                )
              }
            >
              <option value="all">
                Any year
              </option>

              <option value="2025">
                2025+
              </option>

              <option value="2022">
                2022+
              </option>

              <option value="2020">
                2020+
              </option>
            </select>
          </label>

          <label>
            Rating

            <select
              value={filters.rating}
              onChange={(event) =>
                updateFilter(
                  "rating",
                  event.target.value
                )
              }
            >
              <option value="all">
                Any rating
              </option>

              <option value="8">
                8+
              </option>

              <option value="7">
                7+
              </option>

              <option value="6">
                6+
              </option>
            </select>
          </label>

          {hasFilters && (
            <button
              type="button"
              className="tv-clear"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {!loading &&
        !error &&
        featured && (
          <section className="tv-hero">
            <div
              className="tv-hero-background"
              style={{
                backgroundImage: `url(${
                  backdropUrl(
                    featured.backdrop_path
                  ) ||
                  posterUrl(
                    featured.poster_path
                  )
                })`,
              }}
            />

            <div className="tv-hero-gradient" />

            <div className="tv-hero-content">
              <span className="tv-hero-kicker">
                A SERIES TO START WITH
              </span>

              <h2>
                {getTitle(featured)}
              </h2>

              <p>
                {featured.overview ||
                  "A series worth adding to your list."}
              </p>

              <div className="tv-hero-meta">
                <span>
                  <Star
                    size={14}
                    fill="currentColor"
                  />
                  {Number(
                    featured.vote_average || 0
                  ).toFixed(1)}
                </span>

                <span>
                  {getYear(featured)}
                </span>

                <span>
                  {getLanguageName(
                    getLanguage(featured)
                  )}
                </span>
              </div>

              <div className="tv-hero-actions">
                <Link
                  to={`/tv/${featured.id}`}
                  className="hero-primary"
                >
                  <Play
                    size={15}
                    fill="currentColor"
                  />
                  Open series
                </Link>

                <button
                  type="button"
                  className="hero-secondary"
                  onClick={createParty}
                >
                  <Users size={15} />

                  {partyCopied
                    ? "Invite copied"
                    : "Watch together"}
                </button>
              </div>
            </div>

            {heroShows.length > 1 && (
              <>
                <button
                  type="button"
                  className="tv-hero-arrow prev"
                  onClick={previousHero}
                  aria-label="Previous series"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  type="button"
                  className="tv-hero-arrow next"
                  onClick={nextHero}
                  aria-label="Next series"
                >
                  <ChevronRight size={20} />
                </button>

                <div className="tv-hero-dots">
                  {heroShows.map(
                    (show, index) => (
                      <button
                        key={show.id}
                        type="button"
                        className={
                          index === heroIndex
                            ? "active"
                            : ""
                        }
                        onClick={() =>
                          setHeroIndex(index)
                        }
                        aria-label={`Show ${
                          index + 1
                        }`}
                      />
                    )
                  )}
                </div>
              </>
            )}
          </section>
        )}

      <section className="tv-results">
        <div className="tv-results-heading">
          <div>
            <span>
              {filters.mood === "all"
                ? "BROWSE"
                : activeMood.label.toUpperCase()}
            </span>

            <h2>
              {category === "popular"
                ? "Popular right now"
                : category === "top"
                  ? "Top rated series"
                  : "Airing today"}
            </h2>
          </div>

          <strong>
            {gridShows.length} titles
          </strong>
        </div>

        {loading && <TVSkeletons />}

        {!loading && error && (
          <div className="tv-empty">
            <Tv size={40} />

            <h2>
              Something went wrong
            </h2>

            <p>{error}</p>

            <button
              type="button"
              onClick={() =>
                loadShows(category)
              }
            >
              Try again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          !gridShows.length && (
            <div className="tv-empty">
              <Search size={40} />

              <h2>
                No shows found
              </h2>

              <p>
                Try changing your filters.
              </p>

              <button
                type="button"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          )}

        {!loading &&
          !error &&
          gridShows.length > 0 && (
            <>
              <div className="tv-grid">
                {gridShows.map((show) => (
                  <TVShowCard
                    key={show.id}
                    show={show}
                    providers={
                      providers[show.id] || []
                    }
                    onRefresh={() =>
                      refresh(
                        (value) =>
                          value + 1
                      )
                    }
                  />
                ))}
              </div>

              {!loadingMore &&
                page >= totalPages && (
                  <p className="tv-end-message">
                    You have reached the end of this list.
                  </p>
                )}

              <div className="tv-load-more-wrap">
                <button
                  type="button"
                  className="tv-load-more"
                  onClick={loadMoreShows}
                  disabled={
                    loadingMore ||
                    page >= totalPages
                  }
                >
                  {loadingMore
                    ? "Loading more..."
                    : page >= totalPages
                      ? "No more shows"
                      : "Load more shows"}
                </button>

                <span>
                  Page {page} of {totalPages}
                </span>
              </div>
            </>
          )}
      </section>

      <footer className="tv-discovery-footer">
        <span>
          Browse at your own pace.
        </span>

        <span>
          Save what looks interesting.
        </span>

        <span>
          Come back when you need a show.
        </span>
      </footer>
    </main>
  );
}