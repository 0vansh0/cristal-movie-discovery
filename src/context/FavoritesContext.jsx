import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  addFavorite as addFavoriteRequest,
  addToWatchlist as addToWatchlistRequest,
  getFavorites,
  getWatchlist,
  removeFavorite as removeFavoriteRequest,
  removeFromWatchlist as removeFromWatchlistRequest,
} from "../services/movieService";

const FavoritesContext = createContext(null);

const WATCHLIST_KEY = "cristal_watchlist";
const FAVORITES_KEY = "cristal_favorites";
const WATCHED_KEY = "cristal_watched";
const COLLECTIONS_KEY = "cristal_collections";
const STREAMING_ALERT_KEY = "cristal_streaming_alerts";

/* =========================================================
   SAFE LOCAL STORAGE
========================================================= */

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    if (!value) return fallback;

    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors.
  }
}

/* =========================================================
   PROVIDER NORMALIZER
========================================================= */

function normalizeMovie(movie) {
  if (!movie || typeof movie !== "object") {
    return null;
  }

  return {
    ...movie,

    id: movie.id,

    title:
      movie.title ||
      movie.name ||
      "Untitled",

    poster_path:
      movie.poster_path ||
      movie.poster ||
      null,

    release_date:
      movie.release_date ||
      movie.first_air_date ||
      "",

    vote_average:
      Number(movie.vote_average || movie.rating || 0),

    runtime:
      Number(
        movie.runtime ||
        movie.runtime_minutes ||
        0
      ),

    genres:
      movie.genres ||
      movie.genre_ids ||
      movie.genre ||
      [],
  };
}

/* =========================================================
   PROVIDER
========================================================= */

function getProviderNames(movie) {
  const providers =
    movie?.watchProviders ||
    movie?.watch_providers ||
    movie?.providers ||
    movie?.streamingProviders ||
    [];

  if (!Array.isArray(providers)) {
    return [];
  }

  return providers
    .map((provider) => {
      if (typeof provider === "string") {
        return provider;
      }

      return (
        provider?.name ||
        provider?.provider_name ||
        provider?.providerName ||
        ""
      );
    })
    .filter(Boolean);
}

/* =========================================================
   PROVIDER
========================================================= */

export function FavoritesProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() =>
    readStorage(WATCHLIST_KEY, [])
  );

  const [favorites, setFavorites] = useState(() =>
    readStorage(FAVORITES_KEY, [])
  );

  const [watched, setWatched] = useState(() =>
    readStorage(WATCHED_KEY, [])
  );

  const [collections, setCollections] = useState(() =>
    readStorage(COLLECTIONS_KEY, [])
  );

  const [streamingAlerts, setStreamingAlerts] =
    useState(() =>
      readStorage(STREAMING_ALERT_KEY, false)
    );

  useEffect(() => {
    if (!localStorage.getItem("token")) return undefined;

    let active = true;

    async function hydrateRemoteLists() {
      const [remoteFavorites, remoteWatchlist] =
        await Promise.allSettled([
          getFavorites(),
          getWatchlist(),
        ]);

      if (!active) return;

      if (
        remoteFavorites.status === "fulfilled" &&
        Array.isArray(remoteFavorites.value)
      ) {
        setFavorites(
          remoteFavorites.value
            .map(normalizeMovie)
            .filter(Boolean)
        );
      }

      if (
        remoteWatchlist.status === "fulfilled" &&
        Array.isArray(remoteWatchlist.value)
      ) {
        setWatchlist(
          remoteWatchlist.value
            .map(normalizeMovie)
            .filter(Boolean)
        );
      }
    }

    hydrateRemoteLists();

    return () => {
      active = false;
    };
  }, []);

  /* =======================================================
     PERSIST
  ======================================================= */

  useEffect(() => {
    writeStorage(WATCHLIST_KEY, watchlist);
  }, [watchlist]);

  useEffect(() => {
    writeStorage(FAVORITES_KEY, favorites);
  }, [favorites]);

  useEffect(() => {
    writeStorage(WATCHED_KEY, watched);
  }, [watched]);

  useEffect(() => {
    writeStorage(COLLECTIONS_KEY, collections);
  }, [collections]);

  useEffect(() => {
    writeStorage(
      STREAMING_ALERT_KEY,
      streamingAlerts
    );
  }, [streamingAlerts]);

  /* =======================================================
     WATCHLIST
  ======================================================= */

  function isInWatchlist(id) {
    return watchlist.some(
      (movie) => movie.id === id
    );
  }

  function addToWatchlist(movie) {
    const normalized = normalizeMovie(movie);

    if (!normalized?.id) return;

    addToWatchlistRequest(normalized).catch(() => {});

    setWatchlist((previous) => {
      if (
        previous.some(
          (item) => item.id === normalized.id
        )
      ) {
        return previous;
      }

      return [
        ...previous,
        {
          ...normalized,
          addedAt: Date.now(),
        },
      ];
    });
  }

  function removeFromWatchlist(id) {
    removeFromWatchlistRequest(id).catch(() => {});

    setWatchlist((previous) =>
      previous.filter(
        (movie) => movie.id !== id
      )
    );

    setWatched((previous) =>
      previous.filter(
        (movieId) => movieId !== id
      )
    );

    setCollections((previous) =>
      previous.map((collection) => ({
        ...collection,

        movieIds:
          collection.movieIds?.filter(
            (movieId) => movieId !== id
          ) || [],
      }))
    );
  }

  function toggleWatchlist(movie) {
    if (!movie?.id) return;

    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  /* =======================================================
     FAVORITES
  ======================================================= */

  function isFavorite(id) {
    return favorites.some(
      (movie) => movie.id === id
    );
  }

  function toggleFavorite(movieOrId) {
    const id =
      typeof movieOrId === "object"
        ? movieOrId?.id
        : movieOrId;

    if (!id) return;

    if (isFavorite(id)) {
      removeFavoriteRequest(id).catch(() => {});

      setFavorites((previous) =>
        previous.filter(
          (movie) => movie.id !== id
        )
      );

      return;
    }

    let movie =
      typeof movieOrId === "object"
        ? movieOrId
        : watchlist.find(
            (item) => item.id === id
          );

    if (!movie) return;

    addFavoriteRequest(movie).catch(() => {});

    setFavorites((previous) => [
      ...previous,
      normalizeMovie(movie),
    ]);
  }

  /* =======================================================
     WATCHED
  ======================================================= */

  function isWatched(id) {
    return watched.includes(id);
  }

  function toggleWatched(id) {
    if (!id) return;

    setWatched((previous) => {
      if (previous.includes(id)) {
        return previous.filter(
          (movieId) => movieId !== id
        );
      }

      return [...previous, id];
    });
  }

  function markWatched(id) {
    if (!id) return;

    setWatched((previous) => {
      if (previous.includes(id)) {
        return previous;
      }

      return [...previous, id];
    });
  }

  function markUnwatched(id) {
    setWatched((previous) =>
      previous.filter(
        (movieId) => movieId !== id
      )
    );
  }

  /* =======================================================
     COLLECTIONS
  ======================================================= */

  function createCollection(name, emoji = "🎬") {
    const cleanName = name?.trim();

    if (!cleanName) return null;

    const existing = collections.find(
      (collection) =>
        collection.name.toLowerCase() ===
        cleanName.toLowerCase()
    );

    if (existing) {
      return existing.id;
    }

    const collection = {
      id: `collection-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`,

      name: cleanName,

      emoji,

      movieIds: [],

      createdAt: Date.now(),
    };

    setCollections((previous) => [
      ...previous,
      collection,
    ]);

    return collection.id;
  }

  function deleteCollection(collectionId) {
    setCollections((previous) =>
      previous.filter(
        (collection) =>
          collection.id !== collectionId
      )
    );
  }

  function addToCollection(
    collectionId,
    movieId
  ) {
    setCollections((previous) =>
      previous.map((collection) => {
        if (collection.id !== collectionId) {
          return collection;
        }

        if (
          collection.movieIds?.includes(movieId)
        ) {
          return collection;
        }

        return {
          ...collection,

          movieIds: [
            ...(collection.movieIds || []),
            movieId,
          ],
        };
      })
    );
  }

  function removeFromCollection(
    collectionId,
    movieId
  ) {
    setCollections((previous) =>
      previous.map((collection) => {
        if (collection.id !== collectionId) {
          return collection;
        }

        return {
          ...collection,

          movieIds:
            collection.movieIds?.filter(
              (id) => id !== movieId
            ) || [],
        };
      })
    );
  }

  function isMovieInCollection(
    collectionId,
    movieId
  ) {
    const collection = collections.find(
      (item) => item.id === collectionId
    );

    return (
      collection?.movieIds?.includes(movieId) ||
      false
    );
  }

  /* =======================================================
     STREAMING ALERTS
  ======================================================= */

  async function toggleStreamingAlerts() {
    if (!streamingAlerts) {
      if (
        "Notification" in window &&
        Notification.permission === "default"
      ) {
        try {
          await Notification.requestPermission();
        } catch {
          // Browser denied / unsupported.
        }
      }
    }

    setStreamingAlerts(
      (previous) => !previous
    );
  }

  /* =======================================================
     HELPERS
  ======================================================= */

  const stats = useMemo(() => {
    const watchedCount = watchlist.filter(
      (movie) =>
        watched.includes(movie.id)
    ).length;

    const progress =
      watchlist.length > 0
        ? Math.round(
            (watchedCount /
              watchlist.length) *
              100
          )
        : 0;

    return {
      total: watchlist.length,

      favorites: favorites.filter((movie) =>
        watchlist.some(
          (item) => item.id === movie.id
        )
      ).length,

      watched: watchedCount,

      remaining:
        watchlist.length - watchedCount,

      progress,
    };
  }, [watchlist, favorites, watched]);

  const value = {
    watchlist,
    favorites,

    watched,
    collections,

    streamingAlerts,

    stats,

    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,

    isInWatchlist,

    toggleFavorite,
    isFavorite,

    toggleWatched,
    markWatched,
    markUnwatched,
    isWatched,

    createCollection,
    deleteCollection,
    addToCollection,
    removeFromCollection,
    isMovieInCollection,

    toggleStreamingAlerts,

    getProviderNames,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

/* =========================================================
   HOOK
========================================================= */

export function useFavorites() {
  const context =
    useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
}