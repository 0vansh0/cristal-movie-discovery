// ============================================================
// CRISTAL - TMDB SERVICE
// Movies • TV • Anime • Search • Details • Credits
// Videos • Similar • Recommendations • Providers
// Certifications • Genres
// ============================================================

import axios from "axios";

// ============================================================
// CONFIG
// ============================================================

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!TMDB_API_KEY) {
  console.warn(
    "TMDB API key is missing. Add VITE_TMDB_API_KEY to your .env file."
  );
}

// ============================================================
// AXIOS INSTANCE
// ============================================================

const tmdb = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: "en-US",
  },
});

// ============================================================
// HELPERS
// ============================================================

const OFFLINE_MOVIES = [
  {
    id: 278,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of courage.",
    popularity: 88.1,
    vote_average: 8.7,
    poster_path: null,
    backdrop_path: null,
    release_date: "1994-09-23",
    genre_ids: [18, 80],
    media_type: "movie",
  },
  {
    id: 238,
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    popularity: 81.4,
    vote_average: 8.7,
    poster_path: null,
    backdrop_path: null,
    release_date: "1972-03-14",
    genre_ids: [18, 80],
    media_type: "movie",
  },
  {
    id: 550,
    title: "Fight Club",
    overview: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much, much more.",
    popularity: 79.4,
    vote_average: 8.4,
    poster_path: null,
    backdrop_path: null,
    release_date: "1999-10-15",
    genre_ids: [18],
    media_type: "movie",
  },
  {
    id: 680,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    popularity: 77.8,
    vote_average: 8.5,
    poster_path: null,
    backdrop_path: null,
    release_date: "1994-10-14",
    genre_ids: [53, 80],
    media_type: "movie",
  },
  {
    id: 155,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    popularity: 90.2,
    vote_average: 8.5,
    poster_path: null,
    backdrop_path: null,
    release_date: "2008-07-18",
    genre_ids: [28, 80, 18],
    media_type: "movie",
  },
  {
    id: 13,
    title: "Forrest Gump",
    overview: "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.",
    popularity: 74.2,
    vote_average: 8.5,
    poster_path: null,
    backdrop_path: null,
    release_date: "1994-07-06",
    genre_ids: [35, 18, 10749],
    media_type: "movie",
  },
  {
    id: 120,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    overview: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring.",
    popularity: 81.1,
    vote_average: 8.4,
    poster_path: null,
    backdrop_path: null,
    release_date: "2001-12-19",
    genre_ids: [12, 14, 28],
    media_type: "movie",
  },
  {
    id: 19995,
    title: "Avatar",
    overview: "A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
    popularity: 87.3,
    vote_average: 7.6,
    poster_path: null,
    backdrop_path: null,
    release_date: "2009-12-18",
    genre_ids: [28, 12, 14],
    media_type: "movie",
  },
  {
    id: 222935,
    title: "The Witcher",
    overview: "A monster hunter for hire embarks on an epic journey in a morally gray fantasy world.",
    popularity: 63.2,
    vote_average: 8.1,
    poster_path: null,
    backdrop_path: null,
    release_date: "2019-12-20",
    genre_ids: [18, 14, 10759],
    media_type: "tv",
  },
  {
    id: 1399,
    title: "Game of Thrones",
    overview: "Nine noble families fight for control over the lands of Westeros while an ancient enemy returns to the north.",
    popularity: 85.7,
    vote_average: 8.4,
    poster_path: null,
    backdrop_path: null,
    release_date: "2011-04-18",
    genre_ids: [18, 10759, 10765],
    media_type: "tv",
  },
  {
    id: 605116,
    title: "Project Power",
    overview: "A teen drug deal goes wrong, triggering a power surge in a city riddled with crime.",
    popularity: 48.8,
    vote_average: 6.6,
    poster_path: null,
    backdrop_path: null,
    release_date: "2020-08-14",
    genre_ids: [28, 53, 878],
    media_type: "movie",
  },
  {
    id: 1726,
    title: "Iron Man",
    overview: "After being held captive in an Afghan cave, an industrialist creates a powered armor suit and becomes a hero.",
    popularity: 73.3,
    vote_average: 7.6,
    poster_path: null,
    backdrop_path: null,
    release_date: "2008-04-30",
    genre_ids: [28, 878, 12],
    media_type: "movie",
  },
];

function getOfflineMovieSearchResults(query = "", page = 1) {
  const trimmed = String(query || "").trim().toLowerCase();
  let items = [...OFFLINE_MOVIES];

  if (trimmed) {
    items = items.filter((movie) => {
      const haystack = `${movie.title || ""} ${movie.overview || ""}`.toLowerCase();
      return haystack.includes(trimmed);
    });
  }

  const start = (page - 1) * 20;
  const results = items.slice(start, start + 20);

  return {
    page,
    total_pages: Math.max(1, Math.ceil(items.length / 20) || 1),
    total_results: items.length,
    results,
  };
}

function getOfflineMovieById(movieId) {
  return OFFLINE_MOVIES.find((movie) => Number(movie.id) === Number(movieId));
}

function getOfflineMovieVideos() {
  return {
    id: 1,
    results: [
      {
        site: "YouTube",
        key: "ScMzIvxBSi4",
        type: "Trailer",
        official: true,
        published_at: new Date().toISOString(),
      },
    ],
  };
}

function results(response) {
  if (response && Array.isArray(response)) {
    return response;
  }

  return response?.data?.results || [];
}

async function request(url, params = {}) {
  try {
    const response = await tmdb.get(url, { params });
    return response.data;
  } catch (error) {
    const match = String(url).match(/\/(movie|tv)\/(\d+)(?:\/|$)/);
    const mediaType = match?.[1] || "movie";
    const id = match?.[2];

    if (id) {
      const movie = getOfflineMovieById(id);
      if (movie) {
        return {
          ...movie,
          videos: getOfflineMovieVideos(),
          credits: { cast: [], crew: [] },
          images: { posters: [], backdrops: [] },
          recommendations: { results: OFFLINE_MOVIES.filter((item) => item.id !== Number(id)).slice(0, 5) },
          similar: { results: OFFLINE_MOVIES.filter((item) => item.id !== Number(id)).slice(0, 5) },
          reviews: { results: [], total_results: 0 },
          runtime: 120,
          media_type: mediaType,
        };
      }
    }

    if (String(url).includes("/search/")) {
      return getOfflineMovieSearchResults(params?.query || "", params?.page || 1);
    }

    if (String(url).includes("/movie/") && String(url).includes("/videos")) {
      return getOfflineMovieVideos();
    }

    return getOfflineMovieSearchResults("", params?.page || 1);
  }
}
// ============================================================
// MOVIES
// ============================================================

export async function getMovies(page = 1) {
  try {
    const response = await tmdb.get("/discover/movie", {
      params: {
        page,
        sort_by: "popularity.desc",
        include_adult: false,
        include_video: true,
      },
    });

    return results(response);
  } catch (error) {
    console.warn("TMDB discover fetch failed. Using offline movie catalog.", error);
    return getOfflineMovieSearchResults("", page).results;
  }
}

export async function getPopularMovies(page = 1) {
  try {
    const response = await tmdb.get("/movie/popular", {
      params: { page },
    });

    return response.data;
  } catch (error) {
    console.warn("TMDB popular movies request failed. Using offline fallback.", error);
    return getOfflineMovieSearchResults("", page);
  }
}

export async function getTopRatedMovies(page = 1) {
  try {
    const response = await tmdb.get("/movie/top_rated", {
      params: { page },
    });

    return response.data;
  } catch (error) {
    console.warn("TMDB top-rated movies request failed. Using offline fallback.", error);
    return getOfflineMovieSearchResults("", page);
  }
}

export async function getNowPlayingMovies(page = 1) {
  try {
    const response = await tmdb.get("/movie/now_playing", {
      params: { page },
    });

    return response.data;
  } catch (error) {
    console.warn("TMDB now playing movies request failed. Using offline fallback.", error);
    return getOfflineMovieSearchResults("", page);
  }
}

export async function getUpcomingMovies(page = 1) {
  try {
    const response = await tmdb.get("/movie/upcoming", {
      params: { page },
    });

    return response.data;
  } catch (error) {
    console.warn("TMDB upcoming movies request failed. Using offline fallback.", error);
    return getOfflineMovieSearchResults("", page);
  }
}

// ============================================================
// MOVIE DETAILS
// ============================================================

export async function getMovieDetails(id) {
  if (!id) {
    throw new Error("Movie ID is required");
  }

  try {
    return await request(`/movie/${id}`, {
      append_to_response: "credits,videos,similar,recommendations,images,reviews",
    });
  } catch (error) {
    console.warn("Movie details request failed. Using offline fallback.", error);
    return getOfflineMovieById(id) || OFFLINE_MOVIES[0];
  }
}

// ============================================================
// MOVIE CREDITS
// ============================================================

export async function getMovieCredits(id) {
  if (!id) {
    throw new Error("Movie ID is required");
  }

  return request(`/movie/${id}/credits`);
}

// ============================================================
// MOVIE VIDEOS
// ============================================================

export async function getMovieVideos(id) {
  if (!id) {
    throw new Error("Movie ID is required");
  }

  try {
    return await request(`/movie/${id}/videos`);
  } catch (error) {
    console.warn("Movie video request failed. Using offline trailer fallback.", error);
    return getOfflineMovieVideos();
  }
}

// ============================================================
// MOVIE SIMILAR
// ============================================================

export async function getSimilarMovies(id) {
  if (!id) {
    throw new Error("Movie ID is required");
  }

  return request(`/movie/${id}/similar`);
}

// ============================================================
// MOVIE RECOMMENDATIONS
// ============================================================

export async function getMovieRecommendations(id) {
  if (!id) {
    throw new Error("Movie ID is required");
  }

  return request(`/movie/${id}/recommendations`);
}

// ============================================================
// MOVIE WATCH PROVIDERS
// ============================================================

export async function getMovieWatchProviders(id) {
  if (!id) {
    throw new Error("Movie ID is required");
  }

  return request(`/movie/${id}/watch/providers`);
}

// ============================================================
// MOVIE IMAGES
// ============================================================

export async function getMovieImages(id) {
  if (!id) {
    throw new Error("Movie ID is required");
  }

  return request(`/movie/${id}/images`);
}

// ============================================================
// MOVIE CERTIFICATION
// ============================================================

export async function getMovieCertification(movieId) {
  if (!movieId) {
    return null;
  }

  try {
    const response = await tmdb.get(
      `/movie/${movieId}/release_dates`
    );

    const countryResults = response?.data?.results || [];

    // Prefer India
    const india = countryResults.find(
      (country) => country.iso_3166_1 === "IN"
    );

    // Then United States
    const usa = countryResults.find(
      (country) => country.iso_3166_1 === "US"
    );

    // Then first available country
    const selectedCountry = india || usa || countryResults[0];

    const releases = selectedCountry?.release_dates || [];

    if (!releases.length) return null;

    // Prefer release with certification
    const certifiedRelease = releases.find(
      (release) => release.certification && release.certification.trim()
    );

    return certifiedRelease?.certification || null;
  } catch (error) {
    console.warn(
      "Movie certification request failed:",
      error
    );

    return null;
  }
}

// ============================================================
// TV SHOWS
// ============================================================

export async function getTVShows(page = 1) {
  try {
    const response = await tmdb.get("/discover/tv", {
      params: {
        page,
        sort_by: "popularity.desc",
        include_adult: false,
        include_null_first_air_dates: false,
      },
    });

    return results(response);
  } catch (error) {
    console.warn("TMDB TV discover request failed. Using offline fallback.", error);
    return getOfflineMovieSearchResults("", page).results.filter((item) => item.media_type === "tv");
  }
}

export async function getPopularTVShows(page = 1) {
  try {
    const response = await tmdb.get("/tv/popular", {
      params: {
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.warn("TMDB popular TV request failed. Using offline fallback.", error);
    return getOfflineMovieSearchResults("", page);
  }
}

export async function getTopRatedTVShows(page = 1) {
  try {
    const response = await tmdb.get("/tv/top_rated", {
      params: {
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.warn("TMDB TV request failed. Using offline fallback.", error);
    return getOfflineMovieSearchResults("", page);
  }
}

export async function getAiringTodayTV(page = 1) {
  try {
    const response = await tmdb.get("/tv/airing_today", {
      params: {
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.warn("TMDB airing today TV request failed. Using offline fallback.", error);
    return getOfflineMovieSearchResults("", page);
  }
}

export async function getOnTheAirTV(page = 1) {
  try {
    const response = await tmdb.get("/tv/on_the_air", {
      params: {
        page,
      },
    });

    return results(response);
  } catch (error) {
    console.warn("TMDB on-the-air TV request failed. Using offline fallback.", error);
    return getOfflineMovieSearchResults("", page).results.filter((item) => item.media_type === "tv");
  }
}

// ============================================================
// TV DETAILS
// ============================================================
//
// IMPORTANT:
//
// TV:
// /tv/{id}
//
// NOT:
// /movie/{id}
//
// This is especially important for Anime TV.
// ============================================================

export async function getTVDetails(id) {
  if (!id) {
    throw new Error("TV ID is required");
  }

  try {
    return await request(`/tv/${id}`, {
      append_to_response: "credits,videos,similar,recommendations,images,reviews",
    });
  } catch (error) {
    console.warn("TV details request failed. Using offline fallback.", error);
    return getOfflineMovieById(id) || OFFLINE_MOVIES.find((movie) => movie.media_type === "tv") || OFFLINE_MOVIES[0];
  }
}

// ============================================================
// TV CREDITS
// ============================================================

export async function getTVCredits(id) {
  if (!id) {
    throw new Error("TV ID is required");
  }

  return request(`/tv/${id}/credits`);
}

// ============================================================
// TV VIDEOS
// ============================================================

export async function getTVVideos(id) {
  if (!id) {
    throw new Error("TV ID is required");
  }

  return request(`/tv/${id}/videos`);
}

// ============================================================
// TV SIMILAR
// ============================================================

export async function getSimilarTVShows(id) {
  if (!id) {
    throw new Error("TV ID is required");
  }

  return request(`/tv/${id}/similar`);
}

// ============================================================
// TV RECOMMENDATIONS
// ============================================================

export async function getTVRecommendations(id) {
  if (!id) {
    throw new Error("TV ID is required");
  }

  return request(`/tv/${id}/recommendations`);
}

// ============================================================
// TV WATCH PROVIDERS
// ============================================================

export async function getTVWatchProviders(id) {
  if (!id) {
    throw new Error("TV ID is required");
  }

  return request(`/tv/${id}/watch/providers`);
}

// ============================================================
// TV IMAGES
// ============================================================

export async function getTVImages(id) {
  if (!id) {
    throw new Error("TV ID is required");
  }

  return request(`/tv/${id}/images`);
}

// ============================================================
// TV CERTIFICATION
// ============================================================

export async function getTVCertification(tvId) {
  if (!tvId) {
    return null;
  }

  try {
    const response = await tmdb.get(
      `/tv/${tvId}/content_ratings`
    );

    const countryResults =
      response?.data?.results || [];

    if (!countryResults.length) {
      return null;
    }

    // Prefer India
    const india = countryResults.find(
      (country) =>
        country.iso_3166_1 === "IN"
    );

    // Then USA
    const usa = countryResults.find(
      (country) =>
        country.iso_3166_1 === "US"
    );

    // Then first available rating
    const selected =
      india ||
      usa ||
      countryResults[0];

    return selected?.rating || null;
  } catch (error) {
    console.warn(
      "TV certification request failed:",
      error
    );

    return null;
  }
}

// ============================================================
// ANIME CONFIG
// ============================================================
//
// TMDB does not have a dedicated Anime API.
//
// Anime is discovered using:
// Genre 16 = Animation
// Original language = Japanese
//
// We keep Anime queries separate from normal Movies/TV.
// ============================================================

const ANIME_MOVIE_PARAMS = {
  with_genres: "16",
  with_original_language: "ja",
  sort_by: "popularity.desc",
  include_adult: false,
  include_video: true,
};

const ANIME_TV_PARAMS = {
  with_genres: "16",
  with_original_language: "ja",
  sort_by: "popularity.desc",
  include_adult: false,
  include_null_first_air_dates: false,
};

// ============================================================
// POPULAR ANIME
// ============================================================

export async function getPopularAnime(page = 1) {
  const response = await tmdb.get(
    "/discover/tv",
    {
      params: {
        ...ANIME_TV_PARAMS,
        page,
      },
    }
  );

  return results(response);
}

// ============================================================
// TOP RATED ANIME
// ============================================================

export async function getTopRatedAnime(page = 1) {
  const response = await tmdb.get(
    "/discover/tv",
    {
      params: {
        ...ANIME_TV_PARAMS,
        sort_by: "vote_average.desc",
        "vote_count.gte": 200,
        page,
      },
    }
  );

  return results(response);
}

// ============================================================
// AIRING ANIME
// ============================================================

export async function getAnimeAiring(page = 1) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const response = await tmdb.get(
    "/discover/tv",
    {
      params: {
        ...ANIME_TV_PARAMS,
        sort_by: "first_air_date.desc",
        "first_air_date.lte": today,
        page,
      },
    }
  );

  return results(response);
}

// ============================================================
// ANIME MOVIES
// ============================================================

export async function getAnimeMovies(page = 1) {
  const response = await tmdb.get(
    "/discover/movie",
    {
      params: {
        ...ANIME_MOVIE_PARAMS,
        page,
      },
    }
  );

  return results(response);
}

// ============================================================
// ANIME TV SERIES
// ============================================================

export async function getAnimeTVShows(page = 1) {
  const response = await tmdb.get(
    "/discover/tv",
    {
      params: {
        ...ANIME_TV_PARAMS,
        page,
      },
    }
  );

  return results(response);
}

// ============================================================
// ANIME MOVIE + TV
// ============================================================

export async function getAllAnime(page = 1) {
  const [
    tvAnime,
    movieAnime,
  ] = await Promise.all([
    getAnimeTVShows(page),
    getAnimeMovies(page),
  ]);

  return [
    ...tvAnime.map((item) => ({
      ...item,
      media_type: "tv",
    })),

    ...movieAnime.map((item) => ({
      ...item,
      media_type: "movie",
    })),
  ];
}

// ============================================================
// ANIME SEARCH
// ============================================================

export async function searchAnime(
  query,
  page = 1
) {
  if (!query?.trim()) {
    return [];
  }

  const response = await tmdb.get(
    "/search/multi",
    {
      params: {
        query: query.trim(),
        page,
        include_adult: false,
      },
    }
  );

  const items = results(response);

  return items.filter((item) => {
    const isMedia =
      item.media_type === "movie" ||
      item.media_type === "tv";

    const isAnimation =
      item.genre_ids?.includes(16);

    const isJapanese =
      item.original_language === "ja";

    return (
      isMedia &&
      (isAnimation || isJapanese)
    );
  });
}

// ============================================================
// TRENDING
// ============================================================

export async function getTrendingMovies(page = 1) {
  try {
    const response = await tmdb.get(
      "/trending/movie/week",
      { params: { page } }
    );

    return response.data;
  } catch (error) {
    console.warn("TMDB trending request failed. Using offline fallback.", error);
    return getOfflineMovieSearchResults("", page);
  }
}

export async function getTrailerCandidates(page = 1) {
  const response = await tmdb.get("/discover/movie", {
    params: {
      page,
      sort_by: "popularity.desc",
      include_adult: false,
      include_video: true,
      "primary_release_date.lte": new Date().toISOString().slice(0, 10),
    },
  });
  return results(response);
}

export async function getTrendingTVShows() {
  const response = await tmdb.get(
    "/trending/tv/week"
  );

  return results(response);
}

export async function getTrendingAll() {
  const response = await tmdb.get(
    "/trending/all/week"
  );

  return results(response);
}

// Backward-compatible wrapper used by some pages:
export async function getTrending(timeWindow = "week", page = 1) {
  // returns the full response data (with results, page, total_pages)
  return request(`/trending/all/${timeWindow}`, { page });
}

// ============================================================
// SEARCH MOVIES
// ============================================================

export async function searchMovies(
  query,
  page = 1
) {
  if (!query?.trim()) {
    return [];
  }

  try {
    const response = await tmdb.get(
      "/search/movie",
      {
        params: {
          query: query.trim(),
          page,
          include_adult: false,
        },
      }
    );

    return results(response);
  } catch (error) {
    console.warn("TMDB movie search failed. Using offline fallback.", error);
    return getOfflineMovieSearchResults(query, page).results;
  }
}

// ============================================================
// SEARCH TV
// ============================================================

export async function searchTVShows(
  query,
  page = 1
) {
  if (!query?.trim()) {
    return [];
  }

  try {
    const response = await tmdb.get(
      "/search/tv",
      {
        params: {
          query: query.trim(),
          page,
          include_adult: false,
        },
      }
    );

    return results(response);
  } catch (error) {
    console.warn("TMDB TV search failed. Using offline fallback.", error);
    return getOfflineMovieSearchResults(query, page).results.filter((item) => item.media_type === "tv");
  }
}

// ============================================================
// SEARCH MULTI
// ============================================================

export async function searchMulti(
  query,
  page = 1
) {
  if (!query?.trim()) {
    return [];
  }

  try {
    const response = await tmdb.get(
      "/search/multi",
      {
        params: {
          query: query.trim(),
          page,
          include_adult: false,
        },
      }
    );

    return results(response);
  } catch (error) {
    console.warn("TMDB multi search failed. Using offline fallback.", error);
    const matches = getOfflineMovieSearchResults(query, page).results;
    return matches.map((item) => ({ ...item, media_type: item.media_type || "movie" }));
  }
}

// ============================================================
// GENRES
// ============================================================

export async function getMovieGenres() {
  const response = await tmdb.get(
    "/genre/movie/list"
  );

  return results(response);
}

export async function getTVGenres() {
  const response = await tmdb.get(
    "/genre/tv/list"
  );

  return results(response);
}

// ============================================================
// DISCOVER MOVIES BY GENRE
// ============================================================

export async function getMoviesByGenre(
  genreId,
  page = 1
) {
  if (!genreId) {
    return [];
  }

  try {
    const response = await tmdb.get(
      "/discover/movie",
      {
        params: {
          with_genres: genreId,
          sort_by: "popularity.desc",
          include_adult: false,
          page,
        },
      }
    );

    return results(response);
  } catch (error) {
    console.warn("TMDB genre query failed. Using offline fallback.", error);
    return getOfflineMovieSearchResults("", page).results;
  }
}

// ============================================================
// DISCOVER MOVIES (Advanced filters)
// ============================================================
// Used for AI Page - supports genre, region, maxRuntime, providerId

export async function discoverMovies({
  genre,
  region = "IN",
  maxRuntime = 200,
  providerId = null,
  page = 1,
} = {}) {
  const params = {
    sort_by: "popularity.desc",
    include_adult: false,
    page,
  };

  if (region) {
    params.region = region;
  }

  if (genre) {
    params.with_genres = genre;
  }

  if (maxRuntime) {
    params.with_runtime_gte = 0;
    params.with_runtime_lte = maxRuntime;
  }

  if (providerId) {
    params.with_watch_providers = providerId;
    params.watch_region = region || "IN";
  }

  const response = await tmdb.get(
    "/discover/movie",
    {
      params,
    }
  );

  return results(response);
}

// ============================================================
// DISCOVER BY PROVIDER
// ============================================================
// Used for Explore Page - discover movies/tv by watch provider

export async function discoverByProvider({
  providerId,
  region = "IN",
  mediaType = "movie",
  page = 1,
} = {}) {
  if (!providerId) {
    return [];
  }

  const endpoint =
    mediaType === "tv" ? "/discover/tv" : "/discover/movie";

  const response = await tmdb.get(endpoint, {
    params: {
      with_watch_providers: providerId,
      watch_region: region,
      sort_by: "popularity.desc",
      include_adult: false,
      page,
    },
  });

  return results(response);
}

// ============================================================
// DISCOVER TV BY GENRE
// ============================================================

export async function getTVShowsByGenre(
  genreId,
  page = 1
) {
  if (!genreId) {
    return [];
  }

  const response = await tmdb.get(
    "/discover/tv",
    {
      params: {
        with_genres: genreId,
        sort_by: "popularity.desc",
        include_adult: false,
        page,
      },
    }
  );

  return results(response);
}

// ============================================================
// ANIME BY GENRE
// ============================================================

export async function getAnimeByGenre(
  genreId = 16,
  page = 1
) {
  const response = await tmdb.get(
    "/discover/tv",
    {
      params: {
        with_genres: genreId,
        with_original_language: "ja",
        sort_by: "popularity.desc",
        include_adult: false,
        page,
      },
    }
  );

  return results(response);
}
// ======================================================
// ANIME DISCOVERY / PAGINATION
// ======================================================

export async function discoverAnime({
  page = 1,
  genreId = null,
  sortBy = "popularity.desc",
} = {}) {
  const baseParams = {
    with_genres: genreId
      ? `16,${genreId}`
      : "16",

    with_origin_country: "JP",

    sort_by: sortBy,

    include_adult: "false",

    page: String(page),

    "vote_count.gte":
      sortBy === "vote_average.desc"
        ? "50"
        : "5",
  };

  const [tvResponse, movieResponse] =
    await Promise.all([
      request("/discover/tv", baseParams),
      request("/discover/movie", baseParams),
    ]);

  const tvResults =
    (tvResponse.results || []).map((item) => ({
      ...item,
      media_type: "tv",
    }));

  const movieResults =
    (movieResponse.results || []).map((item) => ({
      ...item,
      media_type: "movie",
    }));

  const combined = [
    ...tvResults,
    ...movieResults,
  ];

  const unique = [
    ...new Map(
      combined.map((item) => [
        `${item.media_type}-${item.id}`,
        item,
      ])
    ).values(),
  ];

  unique.sort((a, b) => {
    if (sortBy === "vote_average.desc") {
      return (
        Number(b.vote_average || 0) -
        Number(a.vote_average || 0)
      );
    }

    return (
      Number(b.popularity || 0) -
      Number(a.popularity || 0)
    );
  });

  return {
    results: unique,
    page,
    total_pages: Math.max(
      Number(tvResponse.total_pages || 1),
      Number(movieResponse.total_pages || 1)
    ),
  };
}
// ============================================================
// TRAILER HELPER
// ============================================================

export function getTrailer(videoData) {
  const videos = Array.isArray(videoData)
    ? videoData
    : videoData?.results || [];

  if (!videos.length) {
    return null;
  }

  // ----------------------------------------------------------
  // 1. Official YouTube Trailer
  // ----------------------------------------------------------

  const officialTrailer = videos.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official === true
  );

  if (officialTrailer?.key) {
    return officialTrailer.key;
  }

  // ----------------------------------------------------------
  // 2. Any YouTube Trailer
  // ----------------------------------------------------------

  const trailer = videos.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  if (trailer?.key) {
    return trailer.key;
  }

  // ----------------------------------------------------------
  // 3. Teaser
  // ----------------------------------------------------------

  const teaser = videos.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Teaser"
  );

  if (teaser?.key) {
    return teaser.key;
  }

  // ----------------------------------------------------------
  // 4. Any YouTube video
  // ----------------------------------------------------------

  const youtubeVideo = videos.find(
    (video) =>
      video.site === "YouTube" &&
      video.key
  );

  return youtubeVideo?.key || null;
}

// ============================================================
// EPISODES
// ============================================================
//
// Useful for your Anime / TV details page.
// ============================================================

export async function getTVSeason(
  tvId,
  seasonNumber
) {
  if (!tvId) {
    throw new Error("TV ID is required");
  }

  if (
    seasonNumber === undefined ||
    seasonNumber === null
  ) {
    throw new Error(
      "Season number is required"
    );
  }

  return request(
    `/tv/${tvId}/season/${seasonNumber}`
  );
}

// ============================================================
// SINGLE EPISODE
// ============================================================

export async function getTVEpisode(
  tvId,
  seasonNumber,
  episodeNumber
) {
  if (!tvId) {
    throw new Error("TV ID is required");
  }

  return request(
    `/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}`
  );
}

// ============================================================
// TV EPISODES HELPER
// ============================================================

export async function getAllTVEpisodes(
  tvData
) {
  if (!tvData?.id) {
    return [];
  }

  const seasons =
    tvData.seasons || [];

  if (!seasons.length) {
    return [];
  }

  try {
    const seasonData =
      await Promise.all(
        seasons
          .filter(
            (season) =>
              season.season_number > 0
          )
          .map((season) =>
            getTVSeason(
              tvData.id,
              season.season_number
            )
          )
      );

    return seasonData.flatMap(
      (season) =>
        season?.episodes || []
    );
  } catch (error) {
    console.warn(
      "Failed to load TV episodes:",
      error
    );

    return [];
  }
}

// ============================================================
// IMAGE URL HELPER
// ============================================================

export function getImageUrl(
  path,
  size = "w500"
) {
  if (!path) return "";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

// ============================================================
// WATCH PROVIDERS
// ============================================================

export async function getWatchProviders(
  region = "IN"
) {
  try {
    const response = await tmdb.get(
      "/watch/providers/movie",
      {
        params: {
          region,
        },
      }
    );

    return response?.data?.results || [];
  } catch (error) {
    console.warn(
      "Watch providers request failed:",
      error
    );

    return [];
  }
}

// ============================================================
// COMPANY DETAILS
// ============================================================

export async function getCompanyDetails(
  companyId
) {
  if (!companyId) {
    throw new Error("Company ID is required");
  }

  return request(`/company/${companyId}`);
}

// ============================================================
// COMPANY TITLES
// ============================================================

export async function getCompanyTitles({
  companyId,
  mediaType = "movie",
  page = 1,
} = {}) {
  if (!companyId) {
    return [];
  }

  const endpoint =
    mediaType === "tv"
      ? `/discover/tv`
      : `/discover/movie`;

  const response = await tmdb.get(
    endpoint,
    {
      params: {
        with_companies: companyId,
        sort_by: "popularity.desc",
        include_adult: false,
        page,
      },
    }
  );

  return results(response);
}

// ============================================================
// MOVIES BY REGION
// ============================================================

export async function getMoviesByRegion(
  region = "IN",
  page = 1
) {
  const response = await tmdb.get(
    "/discover/movie",
    {
      params: {
        region,
        sort_by: "popularity.desc",
        include_adult: false,
        page,
      },
    }
  );

  return results(response);
}

// Universe collections used by the Cinematic Universes cards.
// TMDB company IDs: Marvel Studios 420, DC Entertainment 9993, A24 41077.
export async function getUniverseMovies(universe, page = 1) {
  const common = { page, sort_by: "popularity.desc", include_adult: false };

  if (["marvel", "dc", "a24"].includes(universe)) {
    const companyId = { marvel: 420, dc: 9993, a24: 41077 }[universe];
    const response = await tmdb.get("/discover/movie", { params: { ...common, with_companies: companyId } });
    return response.data;
  }

  if (universe === "anime") {
    const response = await tmdb.get("/discover/movie", {
      params: { ...common, with_genres: 16, with_original_language: "ja" },
    });
    return response.data;
  }

  if (universe === "indian") {
    const languages = ["hi", "ta", "te", "ml", "kn"];
    const responses = await Promise.all(languages.map((with_original_language) =>
      tmdb.get("/discover/movie", { params: { ...common, with_original_language } })
    ));
    const unique = new Map();
    responses.flatMap((response) => response.data?.results || []).forEach((movie) => unique.set(movie.id, movie));
    return { page, total_pages: Math.max(...responses.map((response) => response.data?.total_pages || 1)), results: [...unique.values()].sort((a, b) => (b.popularity || 0) - (a.popularity || 0)) };
  }

  // Star Wars and Harry Potter aren't studios/companies in TMDB, they're
  // official "collections" — fetched via /collection/{id} instead of
  // /discover/movie, then paginated client-side to match the shape the
  // rest of the app (page/total_pages/results) expects.
  if (["star-wars", "harry-potter"].includes(universe)) {
    const collectionId = {
      "star-wars": 10,
      "harry-potter": 1241,
    }[universe];

    const response = await tmdb.get(`/collection/${collectionId}`);
    const parts = (response.data?.parts || [])
      .filter((movie) => movie?.poster_path)
      .sort((a, b) => new Date(a.release_date || 0) - new Date(b.release_date || 0));

    const perPage = 20;
    const start = (page - 1) * perPage;

    return {
      page,
      total_pages: Math.max(1, Math.ceil(parts.length / perPage)),
      results: parts.slice(start, start + perPage),
    };
  }

  throw new Error("Unknown cinematic universe");
}
/* =========================================================
   PERSON / CAST
========================================================= */

export const getPersonDetails = async (personId) => {
  const response = await tmdb.get(
    `/person/${personId}`,
    {
      params: {
        append_to_response:
          "combined_credits,external_ids,images",
      },
    }
  );

  return response.data;
};


/* =========================================================
   PERSON MOVIE CREDITS
========================================================= */

export const getPersonMovieCredits = async (personId) => {
  const response = await tmdb.get(
    `/person/${personId}/movie_credits`
  );

  return response.data;
};


/* =========================================================
   PERSON TV CREDITS
========================================================= */

export const getPersonTVCredits = async (personId) => {
  const response = await tmdb.get(
    `/person/${personId}/tv_credits`
  );

  return response.data;
};


/* =========================================================
   PERSON EXTERNAL IDS
========================================================= */

export const getPersonExternalIds = async (personId) => {
  const response = await tmdb.get(
    `/person/${personId}/external_ids`
  );

  return response.data;
};
// ============================================================
// DEFAULT EXPORT
// ============================================================

export default tmdb;