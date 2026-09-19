import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaCompass,
  FaFilm,
  FaFire,
  FaPlay,
  FaPlus,
  FaRandom,
  FaStar,
  FaUsers,
  FaTimes,
  FaVolumeMute,
  FaVolumeUp,
} from "react-icons/fa";

import MovieCard from "../components/Movie/MovieCard";

import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
  getUpcomingMovies,
  getMoviesByGenre,
  getMovieVideos,
} from "../services/tmdbService";

import "./MoviesPage.css";

/* =========================================================
   CONFIG
========================================================= */

const HERO_INTERVAL = 6500;

const TMDB_BACKDROP =
  "https://image.tmdb.org/t/p/original";

const TMDB_POSTER =
  "https://image.tmdb.org/t/p/w342";

const YOUTUBE_THUMBNAIL =
  "https://img.youtube.com/vi/";

/* =========================================================
   MOODS
========================================================= */

const moods = [
  {
    id: "feel-good",
    title: "Something light",
    subtitle: "Funny, warm, easy to watch",
    emoji: "☀️",
    genre: 35,
  },
  {
    id: "thrill",
    title: "A good thriller",
    subtitle: "Mysteries and unexpected turns",
    emoji: "🧩",
    genre: 53,
  },
  {
    id: "emotional",
    title: "Something serious",
    subtitle: "Stories with a little weight",
    emoji: "🌙",
    genre: 18,
  },
  {
    id: "action",
    title: "Something exciting",
    subtitle: "Fast, loud, and fun",
    emoji: "⚡",
    genre: 28,
  },
  {
    id: "romance",
    title: "A love story",
    subtitle: "Romance and chemistry",
    emoji: "❤️",
    genre: 10749,
  },
];

/* =========================================================
   CINEMATIC UNIVERSES
========================================================= */

const universes = [
  {
    id: "marvel",
    title: "Marvel",
    subtitle: "Heroes & multiverses",
    logo: "/images/universes/marvel-studios.svg",
  },
  {
    id: "dc",
    title: "DC",
    subtitle: "Dark legends",
    logo: "/images/universes/dc-comics.svg",
  },
  {
    id: "anime",
    title: "Anime",
    subtitle: "Animated worlds",
    mark: "アニメ",
  },
  {
    id: "star-wars",
    title: "Star Wars",
    subtitle: "A galaxy far, far away",
    mark: "STAR WARS",
  },
  {
    id: "harry-potter",
    title: "Harry Potter",
    subtitle: "The wizarding world",
    mark: "HARRY POTTER",
  },
  {
    id: "indian",
    title: "Indian Cinema",
    subtitle: "Bollywood & beyond",
    mark: "INDIA",
  },
  {
    id: "a24",
    title: "A24",
    subtitle: "Different stories",
    logo: "/images/universes/a24.svg",
  },
];

/* =========================================================
   QUICK LINKS
========================================================= */

const quickLinks = [
  {
    id: "watchlist",
    title: "Your Watchlist",
    subtitle: "Films you’ve saved",
    icon: <FaStar />,
    to: "/watchlist",
  },
  {
    id: "progress",
    title: "Continue Watching",
    subtitle: "Pick up where you left off",
    icon: <FaFilm />,
    to: "/watchlist",
  },
  {
    id: "trending",
    title: "Trending Now",
    subtitle: "What people are watching",
    icon: <FaFire />,
    to: "/trending",
  },
  {
    id: "collections",
    title: "Collections",
    subtitle: "Handpicked lists",
    icon: <FaCompass />,
    to: "/explore",
  },
];

/* =========================================================
   TRAILER TABS
========================================================= */

const trailerTabs = [
  {
    id: "popular",
    label: "Popular",
  },
  {
    id: "streaming",
    label: "Streaming",
  },
  {
    id: "tv",
    label: "On TV",
  },
  {
    id: "rent",
    label: "For Rent",
  },
  {
    id: "theatres",
    label: "In Theatres",
  },
];

/* =========================================================
   WEEKLY SPOTLIGHT THEMES
========================================================= */

const spotlightThemes = [
  {
    id: "nolan",
    title: "The Christopher Nolan Collection",
    subtitle: "Mind-bending, large-format epics",
  },
  {
    id: "taylor-joy",
    title: "Anya Taylor-Joy Highlights",
    subtitle: "Fierce, unforgettable performances",
  },
  {
    id: "villeneuve",
    title: "Denis Villeneuve Spotlight",
    subtitle: "Cinematic, slow-burn sci-fi",
  },
  {
    id: "waititi",
    title: "Taika Waititi Picks",
    subtitle: "Offbeat, heartfelt storytelling",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function safeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeTitle(title = "") {
  return String(title)
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function dedupeMovies(items = []) {
  const seenIds = new Set();
  const seenTitleYear = new Set();

  return items.filter((movie) => {
    if (!movie?.id) {
      return false;
    }

    const title =
      movie.title ||
      movie.name ||
      "";

    const year =
      movie.release_date?.slice(0, 4) ||
      movie.first_air_date?.slice(0, 4) ||
      "";

    const normalizedTitle =
      normalizeTitle(title);

    const titleYearKey =
      `${normalizedTitle}-${year}`;

    if (seenIds.has(movie.id)) {
      return false;
    }

    if (
      normalizedTitle &&
      seenTitleYear.has(titleYearKey)
    ) {
      return false;
    }

    seenIds.add(movie.id);

    if (normalizedTitle) {
      seenTitleYear.add(titleYearKey);
    }

    return true;
  });
}

function pickRandom(items) {
  if (!items.length) {
    return null;
  }

  return items[
    Math.floor(Math.random() * items.length)
  ];
}

function findBestTrailer(videos) {
  const results = safeArray(
    videos?.results ?? videos
  );

  const validVideoTypes = new Set([
    "Trailer",
    "Teaser",
    "Clip",
    "Featurette",
    "Behind the Scenes",
    "Bloopers",
  ]);

  const trailers = results.filter(
    (video) =>
      video?.site === "YouTube" &&
      video?.key &&
      (
        validVideoTypes.has(video?.type) ||
        !video?.type ||
        video?.type === "Official Trailer"
      )
  );

  if (!trailers.length) {
    return null;
  }

  const official =
    trailers.filter(
      (video) =>
        video.official === true
    );

  const source =
    official.length
      ? official
      : trailers;

  return [...source].sort(
    (a, b) =>
      new Date(
        b.published_at || 0
      ).getTime() -
      new Date(
        a.published_at || 0
      ).getTime()
  )[0];
}

// Deterministic "random" number in [min, max], seeded off a movie id so
// the same movie always renders the same progress/day-count without a
// backend field for it yet.
function hashToRange(id, min, max) {
  const seed = Math.abs(Number(id) || 0);
  const range = Math.max(1, max - min + 1);
  return min + (seed % range);
}

function getWeekIndex() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - start.getTime();
  const oneWeek = 7 * 24 * 60 * 60 * 1000;
  return Math.floor(diff / oneWeek);
}

/* =========================================================
   COMPONENT
========================================================= */

export default function MoviesPage() {
  const navigate = useNavigate();

  /* =======================================================
     MOVIES
  ======================================================= */

  const [trending, setTrending] =
    useState([]);

  const [popular, setPopular] =
    useState([]);

  const [topRated, setTopRated] =
    useState([]);

  const [nowPlaying, setNowPlaying] =
    useState([]);

  const [upcoming, setUpcoming] =
    useState([]);

  const [categoryData, setCategoryData] =
    useState({
      popular: [],
      trending: [],
      "top-rated": [],
      "now-playing": [],
      upcoming: [],
    });

  const [categoryPages, setCategoryPages] =
    useState({
      popular: 1,
      trending: 1,
      "top-rated": 1,
      "now-playing": 1,
      upcoming: 1,
    });

  const [categoryHasMore, setCategoryHasMore] =
    useState({
      popular: true,
      trending: true,
      "top-rated": true,
      "now-playing": true,
      upcoming: true,
    });

  /* =======================================================
     UI
  ======================================================= */

  const [activeCategory, setActiveCategory] =
    useState("popular");

  const [activeHubTab, setActiveHubTab] =
    useState("mood");

  const [activeMoods, setActiveMoods] =
    useState([]);

  const [heroIndex, setHeroIndex] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [
    discoverLoadingMore,
    setDiscoverLoadingMore,
  ] = useState(false);

  /* =======================================================
     SAVED
  ======================================================= */

  const [favorites, setFavorites] =
    useState([]);

  const [watchlist, setWatchlist] =
    useState([]);

  /* =======================================================
     AI
  ======================================================= */

  const [aiPrompt, setAiPrompt] =
    useState("");

  const [aiLoading, setAiLoading] =
    useState(false);

  /* =======================================================
     HERO
  ======================================================= */

  const [ambientColor, setAmbientColor] =
    useState(
      "rgba(255, 60, 80, 0.18)"
    );

  const [partyCreated, setPartyCreated] =
    useState(false);

  const partyTimerRef =
    useRef(null);

  const [heroTrailerKey, setHeroTrailerKey] =
    useState(null);

  const [heroVideoReady, setHeroVideoReady] =
    useState(false);

  const [heroMuted, setHeroMuted] =
    useState(true);

  /* =======================================================
     TRAILERS
  ======================================================= */

  const [latestTrailers, setLatestTrailers] =
    useState([]);

  const [trailerLoading, setTrailerLoading] =
    useState(false);

  const [trailerError, setTrailerError] =
    useState("");

  const [trailerPage, setTrailerPage] =
    useState(0);

  const [activeTrailerTab, setActiveTrailerTab] =
    useState("popular");

  const [
    trailerPlayerOpen,
    setTrailerPlayerOpen,
  ] = useState(false);

  const [
    trailerPlayerKey,
    setTrailerPlayerKey,
  ] = useState(null);

  /* =======================================================
     PERSONALIZATION: CONTINUE WATCHING /
     BECAUSE YOU WATCHED / DAILY BLIND PICK
  ======================================================= */

  const [continueWatching, setContinueWatching] =
    useState([]);

  const [becauseYouWatched, setBecauseYouWatched] =
    useState({ source: null, movies: [] });

  const [
    becauseYouWatchedLoading,
    setBecauseYouWatchedLoading,
  ] = useState(false);

  const [blindPick, setBlindPick] =
    useState(null);

  const [blindPickRevealed, setBlindPickRevealed] =
    useState(false);

  /* =======================================================
     LOAD MOVIES
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadHome() {
      try {
        setLoading(true);
        setError("");

        const results = await Promise.allSettled([
          getTrendingMovies(),
          getPopularMovies(),
          getTopRatedMovies(),
          getNowPlayingMovies(),
          getUpcomingMovies(),
        ]);

        if (cancelled) {
          return;
        }

        const [
          trendingData,
          popularData,
          topRatedData,
          nowPlayingData,
          upcomingData,
        ] = results.map((result) =>
          result.status === "fulfilled"
            ? result.value
            : null
        );

        const nextTrending = dedupeMovies(
          safeArray(trendingData?.results ?? trendingData)
        );

        const nextPopular = dedupeMovies(
          safeArray(popularData?.results ?? popularData)
        );

        const nextTopRated = dedupeMovies(
          safeArray(topRatedData?.results ?? topRatedData)
        );

        const nextNowPlaying = dedupeMovies(
          safeArray(nowPlayingData?.results ?? nowPlayingData)
        );

        const nextUpcoming = dedupeMovies(
          safeArray(upcomingData?.results ?? upcomingData)
        );

        setTrending(nextTrending);
        setPopular(nextPopular);
        setTopRated(nextTopRated);
        setNowPlaying(nextNowPlaying);
        setUpcoming(nextUpcoming);

        setCategoryData({
          popular: nextPopular,
          trending: nextTrending,
          "top-rated": nextTopRated,
          "now-playing": nextNowPlaying,
          upcoming: nextUpcoming,
        });

        setCategoryPages({
          popular: 1,
          trending: 1,
          "top-rated": 1,
          "now-playing": 1,
          upcoming: 1,
        });

        setCategoryHasMore({
          popular: true,
          trending: true,
          "top-rated": true,
          "now-playing": true,
          upcoming: true,
        });

        const hasAnyMovies =
          nextTrending.length ||
          nextPopular.length ||
          nextTopRated.length ||
          nextNowPlaying.length ||
          nextUpcoming.length;

        if (!hasAnyMovies) {
          setError(
            "Unable to load movies right now."
          );
        }
      } catch (err) {
        console.error(
          "CRISTAL MoviesPage error:",
          err
        );

        if (!cancelled) {
          setError(
            "Unable to load movies right now."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadHome();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =======================================================
     RESTORE SAVED DATA
  ======================================================= */

  useEffect(() => {
    try {
      const savedFavorites =
        JSON.parse(
          localStorage.getItem(
            "cristal-favorites"
          ) || "[]"
        );

      const savedWatchlist =
        JSON.parse(
          localStorage.getItem(
            "cristal-watchlist"
          ) || "[]"
        );

      setFavorites(
        Array.isArray(savedFavorites)
          ? savedFavorites
          : []
      );

      setWatchlist(
        Array.isArray(savedWatchlist)
          ? savedWatchlist
          : []
      );
    } catch (err) {
      console.warn(
        "Could not restore saved movies:",
        err
      );
    }
  }, []);

  /* =======================================================
     HERO MOVIES
  ======================================================= */

  const heroMovies = useMemo(() => {
    return dedupeMovies([
      ...trending,
      ...popular,
      ...topRated,
    ]).slice(0, 8);
  }, [
    trending,
    popular,
    topRated,
  ]);

  const activeHero =
    heroMovies[heroIndex] ||
    heroMovies[0] ||
    null;

  /* =======================================================
     HERO AUTO ROTATION
  ======================================================= */

  useEffect(() => {
    if (heroMovies.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setHeroIndex(
        (current) =>
          (current + 1) %
          heroMovies.length
      );
    }, HERO_INTERVAL);

    return () => {
      clearInterval(timer);
    };
  }, [heroMovies.length]);

  /* =======================================================
     RESET HERO
  ======================================================= */

  useEffect(() => {
    if (
      heroMovies.length &&
      heroIndex >= heroMovies.length
    ) {
      setHeroIndex(0);
    }
  }, [
    heroIndex,
    heroMovies.length,
  ]);

  /* =======================================================
     HERO AMBIENT COLOR
  ======================================================= */

  useEffect(() => {
    if (!activeHero) {
      return;
    }

    setAmbientColor(
      activeHero.vote_average >= 8
        ? "rgba(255, 55, 75, 0.20)"
        : "rgba(125, 90, 255, 0.16)"
    );
  }, [activeHero]);

  /* =======================================================
     HERO TRAILER (silent autoplay + unmute toggle)
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadHeroTrailer() {
      if (!activeHero?.id) {
        setHeroTrailerKey(null);
        setHeroVideoReady(false);
        return;
      }

      try {
        const videos = await getMovieVideos(
          activeHero.id
        );

        const trailer = findBestTrailer(videos);

        if (!cancelled) {
          setHeroTrailerKey(trailer?.key || null);
          setHeroVideoReady(Boolean(trailer?.key));
        }
      } catch (err) {
        console.warn(
          "Hero trailer error:",
          err
        );

        if (!cancelled) {
          setHeroTrailerKey(null);
          setHeroVideoReady(false);
        }
      }
    }

    setHeroVideoReady(false);
    setHeroMuted(true);
    loadHeroTrailer();

    return () => {
      cancelled = true;
    };
  }, [activeHero?.id]);

  function toggleHeroMute() {
    setHeroMuted((current) => !current);
  }

  /* =======================================================
     LATEST TRAILERS
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadLatestTrailers() {
      const pool = dedupeMovies([
          ...trending,
          ...popular,
          ...topRated,
          ...nowPlaying,
          ...upcoming,
        ]).slice(0, 12);

      if (!pool.length) {
        setLatestTrailers([]);
        setTrailerError("Movie data is still loading. Please try again in a moment.");
        return;
      }

      setTrailerLoading(true);
      setTrailerError("");

      try {
        const results =
          await Promise.allSettled(
            pool.map(async (movie) => {
              try {
                const videos =
                  await getMovieVideos(
                    movie.id
                  );

                const trailer =
                  findBestTrailer(videos);

                return {
                  ...(trailer || {}),
                  movie,
                  // Always keep a card. If TMDB has no usable YouTube item,
                  // openTrailer falls back to a YouTube search for this title.
                  fallback: !trailer?.key,
                };
              } catch (err) {
                console.warn(
                  "Trailer error:",
                  movie.id,
                  err
                );

                return { movie, fallback: true };
              }
            })
          );

        if (cancelled) {
          return;
        }

        const valid = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value)
          .filter(Boolean)
          .sort(
            (a, b) =>
              new Date(
                b.published_at || 0
              ).getTime() -
              new Date(
                a.published_at || 0
              ).getTime()
          );

        setLatestTrailers(valid.slice(0, 12));
        if (!valid.length) {
          setTrailerError("No trailers are available right now.");
        }

        setTrailerPage(0);
      } catch (err) {
        console.error(
          "Trailer loading error:",
          err
        );

        if (!cancelled) {
          setLatestTrailers([]);
          setTrailerError("Unable to load trailers right now. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setTrailerLoading(false);
        }
      }
    }

    loadLatestTrailers();

    return () => {
      cancelled = true;
    };
  }, [
    trending,
    popular,
    topRated,
    nowPlaying,
    upcoming,
  ]);

  /* =======================================================
     CONTINUE WATCHING
     Derived from the watchlist. Progress is a deterministic
     stand-in stored in localStorage until the backend tracks
     real playback position — swap hashToRange() for the real
     value once that endpoint exists.
  ======================================================= */

  useEffect(() => {
    if (!watchlist.length) {
      setContinueWatching([]);
      return;
    }

    try {
      const storedProgress =
        JSON.parse(
          localStorage.getItem(
            "cristal-progress"
          ) || "{}"
        );

      const progressMap = { ...storedProgress };
      let progressChanged = false;

      const items = watchlist
        .slice(0, 8)
        .map((movie) => {
          if (progressMap[movie.id] === undefined) {
            progressMap[movie.id] = hashToRange(
              movie.id,
              8,
              92
            );
            progressChanged = true;
          }

          return {
            movie,
            progress: progressMap[movie.id],
          };
        })
        .filter((item) => item.progress < 96);

      if (progressChanged) {
        localStorage.setItem(
          "cristal-progress",
          JSON.stringify(progressMap)
        );
      }

      setContinueWatching(items);
    } catch (err) {
      console.warn(
        "Continue watching error:",
        err
      );

      setContinueWatching([]);
    }
  }, [watchlist]);

  /* =======================================================
     BECAUSE YOU WATCHED
     Uses the most recently saved favorite/watchlist title as
     the seed and pulls same-genre titles as a stand-in for a
     real similarity endpoint.
  ======================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadBecauseYouWatched() {
      const source =
        favorites[favorites.length - 1] ||
        watchlist[watchlist.length - 1] ||
        null;

      const genreId = source?.genre_ids?.[0];

      if (!source || !genreId) {
        setBecauseYouWatched({
          source: null,
          movies: [],
        });
        return;
      }

      setBecauseYouWatchedLoading(true);

      try {
        const data = await getMoviesByGenre(
          genreId
        );

        const results = dedupeMovies(
          safeArray(data?.results ?? data)
        ).filter(
          (movie) => movie.id !== source.id
        );

        if (!cancelled) {
          setBecauseYouWatched({
            source,
            movies: results.slice(0, 12),
          });
        }
      } catch (err) {
        console.error(
          "Because you watched error:",
          err
        );

        if (!cancelled) {
          setBecauseYouWatched({
            source: null,
            movies: [],
          });
        }
      } finally {
        if (!cancelled) {
          setBecauseYouWatchedLoading(false);
        }
      }
    }

    loadBecauseYouWatched();

    return () => {
      cancelled = true;
    };
  }, [favorites, watchlist]);

  /* =======================================================
     DAILY BLIND PICK
     One deterministic pick per calendar day, persisted so a
     refresh doesn't change today's mystery movie.
  ======================================================= */

  useEffect(() => {
    const pool = dedupeMovies([
      ...trending,
      ...popular,
      ...topRated,
    ]);

    if (!pool.length) {
      return;
    }

    try {
      const todayKey = new Date()
        .toISOString()
        .slice(0, 10);

      const stored = JSON.parse(
        localStorage.getItem(
          "cristal-blind-pick"
        ) || "null"
      );

      if (
        stored?.date === todayKey &&
        stored?.movieId
      ) {
        const match = pool.find(
          (movie) =>
            movie.id === stored.movieId
        );

        if (match) {
          setBlindPick(match);
          setBlindPickRevealed(
            Boolean(stored.revealed)
          );
          return;
        }
      }

      const picked = pickRandom(pool);

      if (picked) {
        setBlindPick(picked);
        setBlindPickRevealed(false);

        localStorage.setItem(
          "cristal-blind-pick",
          JSON.stringify({
            date: todayKey,
            movieId: picked.id,
            revealed: false,
          })
        );
      }
    } catch (err) {
      console.warn(
        "Blind pick error:",
        err
      );
    }
  }, [trending, popular, topRated]);

  function revealBlindPick() {
    if (!blindPick) {
      return;
    }

    setBlindPickRevealed(true);

    try {
      const todayKey = new Date()
        .toISOString()
        .slice(0, 10);

      localStorage.setItem(
        "cristal-blind-pick",
        JSON.stringify({
          date: todayKey,
          movieId: blindPick.id,
          revealed: true,
        })
      );
    } catch (err) {
      console.warn(
        "Blind pick save error:",
        err
      );
    }
  }

  /* =======================================================
     WEEKLY SPOTLIGHT
     Rotates by ISO week. The movie pool is a same-page stand-in
     until a real person/credits lookup is available on the
     backend (e.g. getMoviesByPerson(personId)).
  ======================================================= */

  const weeklySpotlight = useMemo(() => {
    const pool = dedupeMovies([
      ...topRated,
      ...popular,
    ]).slice(0, 10);

    if (!pool.length) {
      return null;
    }

    const theme =
      spotlightThemes[
        getWeekIndex() % spotlightThemes.length
      ];

    return {
      ...theme,
      movies: pool,
    };
  }, [topRated, popular]);

  /* =======================================================
     LEAVING SOON
     "Days left" is a deterministic placeholder until the
     backend exposes real licensing-window data.
  ======================================================= */

  const leavingSoon = useMemo(() => {
    const pool = dedupeMovies([
      ...nowPlaying,
      ...topRated,
    ]).filter(
      (movie) => (movie.vote_average || 0) >= 7
    );

    return pool.slice(0, 8).map((movie) => ({
      movie,
      daysLeft: hashToRange(movie.id, 2, 14),
    }));
  }, [nowPlaying, topRated]);

  /* =======================================================
     CATEGORY
  ======================================================= */

  const categoryMovies = useMemo(() => {
    return dedupeMovies(
      categoryData[activeCategory] || []
    );
  }, [
    activeCategory,
    categoryData,
  ]);

  // Do not cap this list: Load More appends a new TMDB page here.
  const visibleCategoryMovies = categoryMovies;

  /* =======================================================
     HELPERS
  ======================================================= */

  function getTitle(movie) {
    return (
      movie?.title ||
      movie?.name ||
      "Untitled"
    );
  }

  function getYear(movie) {
    return (
      movie?.release_date ||
      movie?.first_air_date ||
      ""
    ).slice(0, 4);
  }

  function getBackdrop(movie) {
    if (!movie?.backdrop_path) {
      return "";
    }

    return `${TMDB_BACKDROP}${movie.backdrop_path}`;
  }

  function getPoster(movie) {
    if (!movie?.poster_path) {
      return getBackdrop(movie);
    }

    return `${TMDB_POSTER}${movie.poster_path}`;
  }

  function isFavorite(movie) {
    return favorites.some(
      (item) =>
        item.id === movie?.id
    );
  }

  function isWatchlisted(movie) {
    return watchlist.some(
      (item) =>
        item.id === movie?.id
    );
  }

  /* =======================================================
     FAVORITE
  ======================================================= */

  function handleFavorite(
    movie,
    shouldSave = true
  ) {
    if (!movie?.id) {
      return;
    }

    setFavorites((current) => {
      let next;

      if (shouldSave) {
        next = [
          ...current.filter(
            (item) =>
              item.id !== movie.id
          ),
          movie,
        ];
      } else {
        next =
          current.filter(
            (item) =>
              item.id !== movie.id
          );
      }

      localStorage.setItem(
        "cristal-favorites",
        JSON.stringify(next)
      );

      return next;
    });
  }

  /* =======================================================
     WATCHLIST
  ======================================================= */

  function handleWatchlist(
    movie,
    shouldSave = true
  ) {
    if (!movie?.id) {
      return;
    }

    setWatchlist((current) => {
      const exists =
        current.some(
          (item) =>
            item.id === movie.id
        );

      let next;

      if (
        shouldSave &&
        !exists
      ) {
        next = [
          ...current,
          movie,
        ];
      } else {
        next =
          current.filter(
            (item) =>
              item.id !== movie.id
          );
      }

      localStorage.setItem(
        "cristal-watchlist",
        JSON.stringify(next)
      );

      return next;
    });
  }

  /* =======================================================
     HERO WATCHLIST
  ======================================================= */

  function toggleHeroWatchlist() {
    if (!activeHero) {
      return;
    }

    handleWatchlist(
      activeHero,
      !isWatchlisted(activeHero)
    );
  }

  /* =======================================================
     MOOD
  ======================================================= */

  async function handleMood(mood) {
    setActiveMoods((current) => {
      if (current.includes(mood.id)) {
        return current.filter(
          (id) =>
            id !== mood.id
        );
      }

      return [
        ...current,
        mood.id,
      ];
    });

    try {
      const data =
        await getMoviesByGenre(
          mood.genre
        );

      const results =
        dedupeMovies(
          safeArray(
            data?.results ?? data
          )
        );

      if (!results.length) {
        return;
      }

      setPopular((current) =>
        dedupeMovies([
          ...results,
          ...current,
        ]).slice(0, 40)
      );

      setCategoryData(
        (current) => ({
          ...current,
          popular:
            dedupeMovies([
              ...results,
              ...(current.popular ||
                []),
            ]).slice(0, 40),
        })
      );

      setCategoryPages(
        (current) => ({
          ...current,
          popular: 1,
        })
      );

      setActiveCategory(
        "popular"
      );
    } catch (err) {
      console.error(
        "Mood loading error:",
        err
      );
    }
  }

  /* =======================================================
     CATEGORY SWITCH
  ======================================================= */

  function changeCategory(category) {
    setActiveCategory(category);
    setActiveMoods([]);
  }

  /* =======================================================
     LOAD MORE
  ======================================================= */

  async function loadMoreCategoryMovies() {
    if (
      discoverLoadingMore ||
      !categoryHasMore[
        activeCategory
      ]
    ) {
      return;
    }

    const nextPage =
      (categoryPages[
        activeCategory
      ] || 1) + 1;

    setDiscoverLoadingMore(true);

    try {
      let payload;

      switch (activeCategory) {
        case "trending":
          payload =
            await getTrendingMovies(
              nextPage
            );
          break;

        case "top-rated":
          payload =
            await getTopRatedMovies(
              nextPage
            );
          break;

        case "now-playing":
          payload =
            await getNowPlayingMovies(
              nextPage
            );
          break;

        case "upcoming":
          payload =
            await getUpcomingMovies(
              nextPage
            );
          break;

        case "popular":
        default:
          payload =
            await getPopularMovies(
              nextPage
            );
          break;
      }

      const nextResults =
        dedupeMovies(
          safeArray(
            payload?.results ??
              payload
          )
        );

      if (!nextResults.length) {
        setCategoryHasMore(
          (current) => ({
            ...current,
            [activeCategory]:
              false,
          })
        );

        return;
      }

      setCategoryData(
        (current) => ({
          ...current,
          [activeCategory]:
            dedupeMovies([
              ...(current[
                activeCategory
              ] || []),
              ...nextResults,
            ]),
        })
      );

      setCategoryPages(
        (current) => ({
          ...current,
          [activeCategory]:
            nextPage,
        })
      );

      setCategoryHasMore(
        (current) => ({
          ...current,
          [activeCategory]:
            (payload?.page ||
              nextPage) <
            (payload?.total_pages ||
              nextPage),
        })
      );
    } catch (err) {
      console.error(
        "Pagination error:",
        err
      );
    } finally {
      setDiscoverLoadingMore(
        false
      );
    }
  }

  /* =======================================================
     SURPRISE ME
  ======================================================= */

  function surpriseMe() {
    const pool =
      dedupeMovies([
        ...trending,
        ...popular,
        ...topRated,
        ...nowPlaying,
        ...upcoming,
      ]);

    const movie =
      pickRandom(pool);

    if (!movie?.id) {
      return;
    }

    navigate(
      `/movie/${movie.id}`
    );
  }

  /* =======================================================
     WATCH PARTY
  ======================================================= */

  function createWatchParty(movie) {
    if (!movie?.id) {
      return;
    }

    const partyId =
      `${movie.id}-${Date.now().toString(36)}`;

    const partyUrl =
      `${window.location.origin}/watch-party/${partyId}?movie=${movie.id}`;

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {
      navigator.clipboard
        .writeText(partyUrl)
        .catch((err) =>
          console.warn(
            "Clipboard failed:",
            err
          )
        );
    }

    setPartyCreated(true);

    clearTimeout(
      partyTimerRef.current
    );

    partyTimerRef.current =
      setTimeout(() => {
        setPartyCreated(false);
      }, 2500);
  }

  useEffect(() => {
    return () => {
      clearTimeout(
        partyTimerRef.current
      );
    };
  }, []);

  /* =======================================================
     AI
  ======================================================= */

  function handleAIRecommendation(
    event
  ) {
    event.preventDefault();

    const prompt =
      aiPrompt.trim();

    if (!prompt) {
      return;
    }

    setAiLoading(true);

    navigate(
      `/ai?prompt=${encodeURIComponent(
        prompt
      )}`
    );
  }

  function handleAIPrompt(prompt) {
    setAiPrompt(prompt);

    requestAnimationFrame(() => {
      document
        .querySelector(
          ".home-ai-prompt input"
        )
        ?.focus();
    });
  }

  /* =======================================================
     HERO
  ======================================================= */

  function previousHero() {
    setHeroIndex((current) => {
      if (!heroMovies.length) {
        return 0;
      }

      return current === 0
        ? heroMovies.length - 1
        : current - 1;
    });
  }

  function nextHero() {
    setHeroIndex((current) => {
      if (!heroMovies.length) {
        return 0;
      }

      return (
        (current + 1) %
        heroMovies.length
      );
    });
  }

  /* =======================================================
     TRAILER
  ======================================================= */

  const trailersPerPage = 4;

  const trailerPages =
    Math.max(
      1,
      Math.ceil(
        latestTrailers.length /
          trailersPerPage
      )
    );

  const visibleTrailers =
    latestTrailers.slice(
      trailerPage *
        trailersPerPage,
      trailerPage *
        trailersPerPage +
        trailersPerPage
    );

  function previousTrailerPage() {
    setTrailerPage(
      (current) =>
        current === 0
          ? trailerPages - 1
          : current - 1
    );
  }

  function nextTrailerPage() {
    setTrailerPage(
      (current) =>
        current ===
        trailerPages - 1
          ? 0
          : current + 1
    );
  }

  function openTrailer(trailer) {
    if (!trailer?.key) {
      const title = getTitle(trailer?.movie || trailer);
      const searchQuery = encodeURIComponent(
        `${title} official trailer`
      );

      window.open(
        `https://www.youtube.com/results?search_query=${searchQuery}`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    setTrailerPlayerKey(
      trailer.key
    );

    setTrailerPlayerOpen(true);
  }

  function closeTrailer() {
    setTrailerPlayerOpen(false);
    setTrailerPlayerKey(null);
  }

  /* =======================================================
     KEYBOARD ESC FOR TRAILER
  ======================================================= */

  useEffect(() => {
    function handleKeyDown(event) {
      if (
        event.key === "Escape" &&
        trailerPlayerOpen
      ) {
        closeTrailer();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [trailerPlayerOpen]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (
    loading &&
    !heroMovies.length
  ) {
    return (
      <main className="cristal-page">
        <section className="movie-status loading-state">
          <div className="loading-spinner" />

          <p>
            Loading films...
          </p>
        </section>
      </main>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (
    error &&
    !heroMovies.length
  ) {
    return (
      <main className="cristal-page">
        <section className="movie-status error-state">
          <FaCompass />

          <p>{error}</p>

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
          >
            Try Again
          </button>
        </section>
      </main>
    );
  }

  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <main
      className="cristal-page"
      style={{
        "--ambient-glow":
          ambientColor,
      }}
    >
      {/* =================================================
          HERO
      ================================================= */}

      {activeHero && (
        <section className="top-ten-hero">
          <div
            className="hero-ambient"
            style={{
              backgroundImage:
                `url("${getBackdrop(
                  activeHero
                )}")`,
            }}
          />

          <div
            key={activeHero.id}
            className="top-ten-hero-backdrop"
            style={{
              backgroundImage: `url("${getBackdrop(
                  activeHero
                )}")`,
            }}
          />

          <div className="top-ten-hero-shade" />

          {heroVideoReady && (
            <button
              type="button"
              className="hero-mute-toggle"
              onClick={toggleHeroMute}
              aria-label={
                heroMuted
                  ? "Unmute trailer"
                  : "Mute trailer"
              }
            >
              {heroMuted ? (
                <FaVolumeMute />
              ) : (
                <FaVolumeUp />
              )}
              {heroMuted ? "Unmute" : "Mute"}
            </button>
          )}

          <div className="top-ten-hero-content">
            <div className="hero-content-inner">
              <p className="top-ten-hero-eyebrow">
                Featured film
              </p>

              <h1>
                {getTitle(activeHero)}
              </h1>

              <div className="top-ten-hero-meta">
                <span className="hero-rating-pill">
                  <FaStar />

                  {Number(
                    activeHero.vote_average ||
                      0
                  ).toFixed(1)}
                </span>

                <span>
                  {getYear(
                    activeHero
                  ) || "N/A"}
                </span>

                <span>
                  {activeHero.media_type ===
                  "tv"
                    ? "TV"
                    : "MOVIE"}
                </span>
              </div>

              {activeHero.overview && (
                <p className="top-ten-hero-overview">
                  {activeHero.overview}
                </p>
              )}

              {/* CLEAN HERO ACTIONS */}
              <div className="top-ten-hero-actions">
                <Link
                  to={`/movie/${activeHero.id}`}
                  className="top-ten-watch"
                >
                  <FaPlay />
                  See film
                </Link>

                <Link
                  to={`/movie/${activeHero.id}`}
                  className="top-ten-details"
                >
                  More about this film
                  <FaArrowRight />
                </Link>

                {/* WATCHLIST */}
                <button
                  type="button"
                  className={`hero-watchlist-button ${
                    isWatchlisted(
                      activeHero
                    )
                      ? "is-saved"
                      : ""
                  }`}
                  onClick={
                    toggleHeroWatchlist
                  }
                  aria-label={
                    isWatchlisted(
                      activeHero
                    )
                      ? "Remove from watchlist"
                      : "Add to watchlist"
                  }
                >
                  {isWatchlisted(
                    activeHero
                  ) ? (
                    <FaCheck />
                  ) : (
                    <FaPlus />
                  )}

                  <span>
                    {isWatchlisted(
                      activeHero
                    )
                      ? "Saved"
                      : "Watchlist"}
                  </span>
                </button>

                <button
                  type="button"
                  className="watch-party-button"
                  onClick={() =>
                    createWatchParty(
                      activeHero
                    )
                  }
                >
                  {partyCreated ? (
                    <>
                      <FaCheck />
                      Link Copied
                    </>
                  ) : (
                    <>
                      <FaUsers />
                      Watch Party
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* HERO CONTROLS */}
          <div className="top-ten-hero-controls">
            <button
              type="button"
              onClick={
                previousHero
              }
              aria-label="Previous featured movie"
            >
              <FaChevronLeft />
            </button>

            <div className="top-ten-hero-dots">
              {heroMovies.map(
                (
                  movie,
                  index
                ) => (
                  <button
                    key={movie.id}
                    type="button"
                    className={
                      index ===
                      heroIndex
                        ? "is-active"
                        : ""
                    }
                    onClick={() =>
                      setHeroIndex(
                        index
                      )
                    }
                    aria-label={`Show ${getTitle(
                      movie
                    )}`}
                  />
                )
              )}
            </div>

            <button
              type="button"
              onClick={
                nextHero
              }
              aria-label="Next featured movie"
            >
              <FaChevronRight />
            </button>
          </div>
        </section>
      )}

      {/* =================================================
          CONTINUE WATCHING
      ================================================= */}

      {continueWatching.length > 0 && (
        <section className="continue-watching-section">
          <div className="continue-watching-header">
            <h2>Continue Watching</h2>
            <p>Pick up right where you left off</p>
          </div>

          <div className="continue-watching-row">
            {continueWatching.map(
              ({ movie, progress }) => (
                <Link
                  key={movie.id}
                  to={`/movie/${movie.id}`}
                  className="continue-watching-card"
                >
                  <div className="continue-watching-poster">
                    <img
                      src={getPoster(movie)}
                      alt={getTitle(movie)}
                      loading="lazy"
                    />

                    <span className="continue-watching-play">
                      <FaPlay />
                    </span>
                  </div>

                  <div className="continue-watching-progress-track">
                    <div
                      className="continue-watching-progress-fill"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <div className="continue-watching-caption">
                    <strong>
                      {getTitle(movie)}
                    </strong>
                    <small>
                      {progress}% watched
                    </small>
                  </div>
                </Link>
              )
            )}
          </div>
        </section>
      )}

      {/* =================================================
          BECAUSE YOU WATCHED
      ================================================= */}

      {becauseYouWatched.source &&
        becauseYouWatched.movies.length > 0 && (
          <section className="because-you-watched-section">
            <div className="because-you-watched-header">
              <div>
                <span className="because-eyebrow">
                  Based on your watchlist
                </span>

                <h2>
                  Because you watched "
                  {getTitle(
                    becauseYouWatched.source
                  )}
                  "
                </h2>
              </div>
            </div>

            <div className="because-you-watched-row">
              {becauseYouWatched.movies
                .slice(0, 8)
                .map((movie) => (
                  <Link
                    key={movie.id}
                    to={`/movie/${movie.id}`}
                    className="because-you-watched-card"
                  >
                    <img
                      src={getPoster(movie)}
                      alt={getTitle(movie)}
                      loading="lazy"
                    />

                    <div className="because-you-watched-caption">
                      <strong>
                        {getTitle(movie)}
                      </strong>

                      <span>
                        <FaStar />
                        {Number(
                          movie.vote_average ||
                            0
                        ).toFixed(1)}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}

      {becauseYouWatchedLoading &&
        !becauseYouWatched.movies.length && (
          <section className="because-you-watched-section because-you-watched-loading">
            <div className="loading-spinner" />

            <span>
              Finding titles based on
              what you love...
            </span>
          </section>
        )}

      {/* =================================================
          UNIFIED DISCOVERY HUB
      ================================================= */}

      <section className="discovery-hub">
        <div className="discovery-hub-header">
          <div>
            <span className="section-kicker">
              Not sure what to pick?
            </span>

            <h2>
              Tell us what you feel like watching.
            </h2>
          </div>

          <div className="discovery-hub-tabs">
            <button
              type="button"
              className={
                activeHubTab ===
                "mood"
                  ? "is-active"
                  : ""
              }
              onClick={() =>
                setActiveHubTab(
                  "mood"
                )
              }
            >
              Browse by mood
            </button>

            <button
              type="button"
              className={
                activeHubTab ===
                "ai"
                  ? "is-active"
                  : ""
              }
              onClick={() => navigate("/ai")}
            >
              Cristal AI
            </button>

            <button
              type="button"
              className={
                activeHubTab ===
                "surprise"
                  ? "is-active"
                  : ""
              }
              onClick={() =>
                setActiveHubTab(
                  "surprise"
                )
              }
            >
              Pick for me
            </button>
          </div>
        </div>

        {/* MOOD */}
        {activeHubTab === "mood" && (
          <div className="discovery-panel mood-panel">
            <div className="mood-panel-intro">
              <strong>
                What are you in the
                mood for?
              </strong>

              <span>
                Mix multiple moods
              </span>
            </div>

            <div className="mood-picker">
              {moods.map(
                (mood) => {
                  const active =
                    activeMoods.includes(
                      mood.id
                    );

                  return (
                    <button
                      key={mood.id}
                      type="button"
                      className={
                        active
                          ? "is-active"
                          : ""
                      }
                      aria-pressed={
                        active
                      }
                      onClick={() =>
                        handleMood(
                          mood
                        )
                      }
                    >
                      <span className="mood-icon">
                        {
                          mood.emoji
                        }
                      </span>

                      <span className="mood-copy">
                        <strong>
                          {
                            mood.title
                          }
                        </strong>

                        <small>
                          {
                            mood.subtitle
                          }
                        </small>
                      </span>

                      {active && (
                        <FaCheck />
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* AI */}
        {activeHubTab === "ai" && (
          <div className="discovery-panel ai-panel">
            <div className="ai-panel-content">
              <strong>
                Have a film in mind?
              </strong>

              <p>
                Describe the kind of story you want to watch.
              </p>

              <form
                className="home-ai-prompt"
                onSubmit={
                  handleAIRecommendation
                }
              >
                <input
                  value={aiPrompt}
                  onChange={(event) =>
                    setAiPrompt(
                      event.target
                        .value
                    )
                  }
                  placeholder="A quiet sci‑fi film with a big idea..."
                  aria-label="Describe a movie"
                />

                <button
                  type="submit"
                  disabled={
                    aiLoading
                  }
                >
                  {aiLoading
                    ? "Finding..."
                    : "Search"}
                </button>
              </form>

              <div className="ai-prompt-chips">
                {aiPrompts.map(
                  (prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() =>
                        handleAIPrompt(
                          prompt
                        )
                      }
                    >
                      {prompt}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        )}

        {/* SURPRISE */}
        {activeHubTab ===
          "surprise" && (
          <div className="discovery-panel surprise-panel">
            <div className="surprise-icon">
              <FaRandom />
            </div>

            <div>
              <strong>
                Can't decide?
              </strong>

              <h3>
                Let us choose
                tonight's film.
              </h3>

              <p>
                One random recommendation
                from the catalogue.
              </p>
            </div>

            <button
              type="button"
              onClick={
                surpriseMe
              }
            >
              <FaRandom />
              Surprise Me
            </button>
          </div>
        )}
      </section>

      {/* =================================================
          QUICK CATEGORIES
      ================================================= */}

      <section className="quick-categories">
        <button
          type="button"
          className={
            activeCategory ===
            "popular"
              ? "is-active"
              : ""
          }
          onClick={() =>
            changeCategory(
              "popular"
            )
          }
        >
          <span className="quick-icon">
            <FaFire />
          </span>

          <span className="quick-text">
            <strong>
              Popular
            </strong>

            <small>
              What people are
              watching
            </small>
          </span>
        </button>

        <button
          type="button"
          className={
            activeCategory ===
            "top-rated"
              ? "is-active"
              : ""
          }
          onClick={() =>
            changeCategory(
              "top-rated"
            )
          }
        >
          <span className="quick-icon">
            <FaStar />
          </span>

          <span className="quick-text">
            <strong>
              Top Rated
            </strong>

            <small>
              Highest rated
              films
            </small>
          </span>
        </button>

        <button
          type="button"
          className={
            activeCategory ===
            "now-playing"
              ? "is-active"
              : ""
          }
          onClick={() =>
            changeCategory(
              "now-playing"
            )
          }
        >
          <span className="quick-icon">
            <FaPlay />
          </span>

          <span className="quick-text">
            <strong>
              Now Playing
            </strong>

            <small>
              In cinemas
              right now
            </small>
          </span>
        </button>

        <button
          type="button"
          className={
            activeCategory ===
            "upcoming"
              ? "is-active"
              : ""
          }
          onClick={() =>
            changeCategory(
              "upcoming"
            )
          }
        >
          <span className="quick-icon">
            <FaCalendarAlt />
          </span>

          <span className="quick-text">
            <strong>
              Upcoming
            </strong>

            <small>
              Coming soon
            </small>
          </span>
        </button>
      </section>

      {/* =================================================
          DAILY BLIND PICK
      ================================================= */}

      {blindPick && (
        <section className="daily-blind-pick-section">
          <div className="daily-blind-pick-inner">
            <div className="daily-blind-pick-copy">
              <span className="blind-pick-eyebrow">
                TODAY'S PICK
              </span>

              <h2>
                One film, picked just for today.
              </h2>

              <p>
                Tap to reveal your daily surprise. A new
                pick lands every day.
              </p>
            </div>

            <button
              type="button"
              className={`blind-pick-card ${
                blindPickRevealed
                  ? "is-revealed"
                  : ""
              }`}
              onClick={() =>
                blindPickRevealed
                  ? navigate(
                      `/movie/${blindPick.id}`
                    )
                  : revealBlindPick()
              }
            >
              <img
                src={getPoster(blindPick)}
                alt={
                  blindPickRevealed
                    ? getTitle(blindPick)
                    : "Mystery pick"
                }
              />

              {!blindPickRevealed && (
                <div className="blind-pick-overlay">
                  <FaCompass />
                  <strong>
                    Tap to reveal
                  </strong>
                </div>
              )}

              {blindPickRevealed && (
                <div className="blind-pick-reveal-caption">
                  <strong>
                    {getTitle(blindPick)}
                  </strong>

                  <span>
                    <FaStar />
                    {Number(
                      blindPick.vote_average ||
                        0
                    ).toFixed(1)}
                  </span>
                </div>
              )}
            </button>
          </div>
        </section>
      )}

      {/* =================================================
          DISCOVER MOVIES
      ================================================= */}

      <section className="discover-section">
        <div className="discover-heading">
          <div>
            <p>
              MOVIES
            </p>

            <h2>
              {activeCategory ===
              "top-rated"
                ? "Top Rated"
                : activeCategory ===
                  "now-playing"
                ? "Now Playing"
                : activeCategory ===
                  "upcoming"
                ? "Coming Soon"
                : activeMoods.length
                ? "Your Mood Picks"
                : "Popular Right Now"}
            </h2>
          </div>

          <div className="movie-tabs">
            {[
              [
                "popular",
                "Popular",
              ],
              [
                "trending",
                "Trending",
              ],
              [
                "top-rated",
                "Top Rated",
              ],
              [
                "now-playing",
                "Now Playing",
              ],
              [
                "upcoming",
                "Upcoming",
              ],
            ].map(
              ([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={
                    activeCategory ===
                    value
                      ? "is-active"
                      : ""
                  }
                  onClick={() =>
                    changeCategory(
                      value
                    )
                  }
                >
                  {label}
                </button>
              )
            )}
          </div>
        </div>

        {categoryMovies.length >
        0 ? (
          <>
            <div className="cristal-movie-grid">
              {visibleCategoryMovies.map(
                (movie) => (
                  <MovieCard
                    key={`${movie.id}-${getYear(
                      movie
                    )}`}
                    movie={movie}
                    isFavorite={isFavorite(
                      movie
                    )}
                    isWatchlisted={isWatchlisted(
                      movie
                    )}
                    onFavorite={
                      handleFavorite
                    }
                    onWatchlist={
                      handleWatchlist
                    }
                    getMovieVideos={
                      getMovieVideos
                    }
                    enableHoverPreview
                  />
                )
              )}
            </div>

            {categoryHasMore[
              activeCategory
            ] && (
              <div className="discover-load-more">
                <button
                  type="button"
                  onClick={
                    loadMoreCategoryMovies
                  }
                  disabled={
                    discoverLoadingMore
                  }
                >
                  {discoverLoadingMore
                    ? "Loading..."
                    : "Load More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="movie-status">
            <FaCompass />

            <p>
              No movies found for
              this selection.
            </p>
          </div>
        )}
      </section>

      {/* =================================================
          LATEST TRAILERS
      ================================================= */}

      <section className="latest-trailers-section">
        <div className="latest-trailers-inner">
          <div className="latest-trailers-header">
            <div>
              <h2>
                Latest Trailers
              </h2>

              <p>
                New trailers and first looks
              </p>
            </div>

            <div className="latest-trailer-tabs">
              {trailerTabs.map(
                (tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={
                      activeTrailerTab ===
                      tab.id
                        ? "is-active"
                        : ""
                    }
                    onClick={() => {
                      setActiveTrailerTab(
                        tab.id
                      );
                      setTrailerPage(0);
                    }}
                  >
                    {tab.label}
                  </button>
                )
              )}
            </div>
          </div>

          {trailerLoading ? (
            <div className="latest-trailers-loading">
              <div className="loading-spinner" />

              <span>
                Finding the latest
                trailers...
              </span>
            </div>
          ) : latestTrailers.length >
            0 ? (
            <>
              <div className="latest-trailers-carousel">
                <button
                  type="button"
                  className="latest-trailer-arrow"
                  onClick={
                    previousTrailerPage
                  }
                  aria-label="Previous trailers"
                >
                  <FaChevronLeft />
                </button>

                <div className="latest-trailers-grid">
                  {visibleTrailers.map(
                    (trailer) => {
                      const movie =
                        trailer.movie;

                      const thumbnail = trailer.key
                        ? `${YOUTUBE_THUMBNAIL}${trailer.key}/hqdefault.jpg`
                        : getBackdrop(movie) ||
                          `https://image.tmdb.org/t/p/w780${movie.poster_path || ""}`;

                      return (
                        <article
                          key={`${movie.id}-${trailer.key}`}
                          className="latest-trailer-item"
                        >
                          <button
                            type="button"
                            className="latest-trailer-thumbnail"
                            onClick={() =>
                              openTrailer(
                                trailer
                              )
                            }
                          >
                            <img
                              src={
                                thumbnail
                              }
                              alt={`${getTitle(
                                movie
                              )} trailer`}
                              loading="lazy"
                            />

                            <span className="latest-trailer-gradient" />

                            <span className="latest-trailer-play">
                              <FaPlay />
                            </span>

                            <span className="trailer-watch-label">
                              Watch trailer
                            </span>
                          </button>

                          <div className="latest-trailer-caption">
                            <h3>
                              {getTitle(
                                movie
                              )}
                            </h3>

                            <p>
                              {trailer.name ||
                                "Official Trailer"}
                            </p>
                          </div>
                        </article>
                      );
                    }
                  )}
                </div>

                <button
                  type="button"
                  className="latest-trailer-arrow"
                  onClick={
                    nextTrailerPage
                  }
                  aria-label="Next trailers"
                >
                  <FaChevronRight />
                </button>
              </div>

              <div className="latest-trailer-progress">
                {Array.from({
                  length: trailerPages,
                }).map(
                  (_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={
                        index ===
                        trailerPage
                          ? "is-active"
                          : ""
                      }
                      onClick={() =>
                        setTrailerPage(
                          index
                        )
                      }
                      aria-label={`Trailer page ${
                        index + 1
                      }`}
                    />
                  )
                )}
              </div>
            </>
          ) : (
            <div className="latest-trailer-empty">
              <FaFilm />

              <p>
                {trailerError || "No trailers are available right now."}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =================================================
          CINEMATIC UNIVERSES
      ================================================= */}

      <section className="cinematic-universes">
        <div className="universe-heading">
          <div>
            <p>
              EXPLORE DEEPER
            </p>

            <h2>
              Enter a cinematic
              universe
            </h2>
          </div>

          <Link to="/explore">
            Explore
            <span>→</span>
          </Link>
        </div>

        <div className="universe-grid">
          {universes.map(
            (universe) => (
              <Link
                key={
                  universe.id
                }
                to={`/universe/${universe.id}`}
                className={`universe-card universe-${universe.id}`}
              >
                <span className="universe-mark">
                  {universe.logo ? <img src={universe.logo} alt={`${universe.title} logo`} /> : universe.mark}
                </span>

                <div className="universe-copy">
                  <strong>
                    {
                      universe.title
                    }
                  </strong>

                  <small>
                    {
                      universe.subtitle
                    }
                  </small>
                </div>

                <b>→</b>
              </Link>
            )
          )}
        </div>
      </section>

      {/* =================================================
          QUICK LINKS
      ================================================= */}

      <section className="quick-links">
        {quickLinks.map((link) => (
          <Link
            key={link.id}
            to={link.to}
            className={`quick-link quick-link-${link.id}`}
          >
            <span className="quick-link-icon">
              {link.icon}
            </span>

            <span className="quick-link-copy">
              <strong>{link.title}</strong>
              <small>{link.subtitle}</small>
            </span>
          </Link>
        ))}
      </section>

      {/* =================================================
          TRAILER MODAL
      ================================================= */}

      {trailerPlayerOpen &&
        trailerPlayerKey && (
          <div
            className="trailer-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Trailer player"
            onClick={
              closeTrailer
            }
          >
            <div
              className="trailer-modal-inner"
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <button
                type="button"
                className="trailer-modal-close"
                onClick={
                  closeTrailer
                }
                aria-label="Close trailer"
              >
                <FaTimes />
              </button>

              <div className="trailer-video-wrap">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailerPlayerKey)}?autoplay=1&rel=0&modestbranding=1&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`}
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
    </main>
  );
}