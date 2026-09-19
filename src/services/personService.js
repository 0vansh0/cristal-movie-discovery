import axios from "axios";

/* =========================================================
   TMDB CONFIG
========================================================= */

const TMDB_API_KEY =
  import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL ||
  "https://api.themoviedb.org/3";

const IMAGE_BASE_URL =
  "https://image.tmdb.org/t/p";

/* =========================================================
   VALIDATION
========================================================= */

if (!TMDB_API_KEY) {
  console.warn(
    "VITE_TMDB_API_KEY is not configured."
  );
}

/* =========================================================
   AXIOS INSTANCE
========================================================= */

const personApi = axios.create({
  baseURL: BASE_URL,

  params: {
    api_key: TMDB_API_KEY,
    language: "en-US",
  },

  timeout: 15000,
});

/* =========================================================
   HELPERS
========================================================= */

/**
 * Always return an array.
 */
const cleanArray = (value) => {
  return Array.isArray(value)
    ? value
    : [];
};

/**
 * Get movie release date or TV first-air date.
 */
const getReleaseDate = (item) => {
  return (
    item?.release_date ||
    item?.first_air_date ||
    ""
  );
};

/**
 * Determine whether a TMDB credit is a movie or TV credit.
 */
const getMediaType = (item) => {
  if (item?.media_type === "movie") {
    return "movie";
  }

  if (item?.media_type === "tv") {
    return "tv";
  }

  /**
   * TV credits generally have first_air_date.
   */
  if (item?.first_air_date) {
    return "tv";
  }

  return "movie";
};

/**
 * Add a media type to credits that don't already have one.
 */
const addMediaType = (items, type) => {
  return cleanArray(items).map((item) => ({
    ...item,

    media_type:
      item?.media_type || type,
  }));
};

/**
 * Normalize combined TMDB credits.
 */
const normalizeCombinedCredits = (
  items
) => {
  return cleanArray(items).map((item) => ({
    ...item,

    media_type:
      getMediaType(item),
  }));
};

/* =========================================================
   UNIQUE CREDITS
========================================================= */

/**
 * Remove duplicate titles.
 *
 * The same movie/TV show can appear in:
 * - movie credits
 * - TV credits
 * - combined credits
 * - cast
 * - crew
 *
 * We use:
 *
 * movie-123
 * tv-123
 *
 * so movie and TV IDs don't collide.
 */
const uniqueCredits = (items) => {
  const map = new Map();

  cleanArray(items).forEach((item) => {
    if (!item?.id) {
      return;
    }

    const type =
      getMediaType(item);

    const key =
      `${type}-${item.id}`;

    if (!map.has(key)) {
      map.set(key, {
        ...item,
        media_type: type,
      });
    }
  });

  return Array.from(
    map.values()
  );
};

/* =========================================================
   CREDIT ROLE HELPERS
========================================================= */

const isDirectorCredit = (credit) => {
  const job =
    String(credit?.job || "")
      .toLowerCase()
      .trim();

  return (
    job === "director" ||
    job.includes("director")
  );
};

const isProducerCredit = (credit) => {
  const job =
    String(credit?.job || "")
      .toLowerCase()
      .trim();

  return job.includes("producer");
};

const isWriterCredit = (credit) => {
  const job =
    String(credit?.job || "")
      .toLowerCase()
      .trim();

  return (
    job.includes("writer") ||
    job.includes("screenplay") ||
    job.includes("story") ||
    job.includes("teleplay") ||
    job.includes("creator") ||
    job.includes("adaptation") ||
    job.includes("characters") ||
    job.includes("novel")
  );
};

const isCinematographyCredit = (
  credit
) => {
  const department =
    String(
      credit?.department || ""
    )
      .toLowerCase()
      .trim();

  const job =
    String(credit?.job || "")
      .toLowerCase()
      .trim();

  return (
    department === "camera" ||
    job.includes(
      "cinematograph"
    ) ||
    job.includes(
      "director of photography"
    ) ||
    job.includes(
      "camera operator"
    )
  );
};

/* =========================================================
   PERSON DETAILS
========================================================= */

export async function getPersonDetails(
  id
) {
  if (!id) {
    throw new Error(
      "Person ID is required."
    );
  }

  const response =
    await personApi.get(
      `/person/${id}`,
      {
        params: {
          append_to_response:
            "combined_credits,images,external_ids",
        },
      }
    );

  return response.data;
}

/* =========================================================
   PERSON MOVIE CREDITS
========================================================= */

export async function getPersonMovieCredits(
  id
) {
  if (!id) {
    throw new Error(
      "Person ID is required."
    );
  }

  const response =
    await personApi.get(
      `/person/${id}/movie_credits`
    );

  return response.data;
}

/* =========================================================
   PERSON TV CREDITS
========================================================= */

export async function getPersonTVCredits(
  id
) {
  if (!id) {
    throw new Error(
      "Person ID is required."
    );
  }

  const response =
    await personApi.get(
      `/person/${id}/tv_credits`
    );

  return response.data;
}

/* =========================================================
   PERSON IMAGES
========================================================= */

export async function getPersonImages(
  id
) {
  if (!id) {
    throw new Error(
      "Person ID is required."
    );
  }

  const response =
    await personApi.get(
      `/person/${id}/images`
    );

  return response.data;
}

/* =========================================================
   PERSON EXTERNAL IDS
========================================================= */

export async function getPersonExternalIds(
  id
) {
  if (!id) {
    throw new Error(
      "Person ID is required."
    );
  }

  const response =
    await personApi.get(
      `/person/${id}/external_ids`
    );

  return response.data;
}

/* =========================================================
   COMBINED CREDITS
========================================================= */

export async function getPersonCombinedCredits(
  id
) {
  if (!id) {
    throw new Error(
      "Person ID is required."
    );
  }

  const response =
    await personApi.get(
      `/person/${id}/combined_credits`
    );

  return response.data;
}

/* =========================================================
   COMPLETE PERSON
========================================================= */

export async function getCompletePerson(
  id
) {
  if (!id) {
    throw new Error(
      "Person ID is required."
    );
  }

  try {
    /* =====================================================
       MAIN PERSON REQUEST

       We request:
       - person details
       - combined credits
       - images
       - external IDs
    ===================================================== */

    const detailsResponse =
      await personApi.get(
        `/person/${id}`,
        {
          params: {
            append_to_response:
              "combined_credits,images,external_ids",
          },
        }
      );

    const details =
      detailsResponse.data;

    if (!details?.id) {
      throw new Error(
        "Person was not found."
      );
    }

    /* =====================================================
       DEDICATED MOVIE + TV CREDITS

       These provide cleaner movie/TV-specific
       cast and crew information.
    ===================================================== */

    const [
      movieCreditsResponse,
      tvCreditsResponse,
    ] = await Promise.all([
      personApi
        .get(
          `/person/${id}/movie_credits`
        )
        .catch((error) => {
          console.warn(
            "Movie credits request failed:",
            error
          );

          return {
            data: {
              cast: [],
              crew: [],
            },
          };
        }),

      personApi
        .get(
          `/person/${id}/tv_credits`
        )
        .catch((error) => {
          console.warn(
            "TV credits request failed:",
            error
          );

          return {
            data: {
              cast: [],
              crew: [],
            },
          };
        }),
    ]);

    const movieCredits =
      movieCreditsResponse?.data || {};

    const tvCredits =
      tvCreditsResponse?.data || {};

    /* =====================================================
       MOVIE CAST
    ===================================================== */

    const movieCast =
      addMediaType(
        movieCredits.cast,
        "movie"
      );

    /* =====================================================
       TV CAST
    ===================================================== */

    const tvCast =
      addMediaType(
        tvCredits.cast,
        "tv"
      );

    /* =====================================================
       COMBINED CAST
    ===================================================== */

    const cast =
      uniqueCredits([
        ...movieCast,
        ...tvCast,
      ]);

    /* =====================================================
       MOVIE CREW
    ===================================================== */

    const movieCrew =
      addMediaType(
        movieCredits.crew,
        "movie"
      );

    /* =====================================================
       TV CREW
    ===================================================== */

    const tvCrew =
      addMediaType(
        tvCredits.crew,
        "tv"
      );

    /* =====================================================
       COMBINED CREW
    ===================================================== */

    const crew =
      uniqueCredits([
        ...movieCrew,
        ...tvCrew,
      ]);

    /* =====================================================
       TMDB COMBINED CREDITS
    ===================================================== */

    const combinedCredits =
      details?.combined_credits || {};

    const normalizedCombinedCast =
      normalizeCombinedCredits(
        combinedCredits.cast
      );

    const normalizedCombinedCrew =
      normalizeCombinedCredits(
        combinedCredits.crew
      );

    /* =====================================================
       IMAGES
    ===================================================== */

    const images = {
      profiles: cleanArray(
        details?.images?.profiles
      ).map((item) => ({
        ...item,
        image_type: "profile",
      })),
    };

    /* =====================================================
       EXTERNAL IDS
    ===================================================== */

    const externalIds =
      details?.external_ids || {};

    /* =====================================================
       MOVIES

       Only ACTING movie credits.
    ===================================================== */

    const movies = cast
      .filter(
        (item) =>
          item?.media_type ===
            "movie" &&
          Boolean(item?.character)
      )
      .sort((a, b) =>
        getReleaseDate(b).localeCompare(
          getReleaseDate(a)
        )
      );

    /* =====================================================
       TV SHOWS

       Only ACTING TV credits.
    ===================================================== */

    const tvShows = cast
      .filter(
        (item) =>
          item?.media_type ===
            "tv" &&
          Boolean(item?.character)
      )
      .sort((a, b) =>
        getReleaseDate(b).localeCompare(
          getReleaseDate(a)
        )
      );

    /* =====================================================
       TODAY
    ===================================================== */

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    /* =====================================================
       UPCOMING MOVIES
    ===================================================== */

    const upcomingMovies =
      movies
        .filter((item) => {
          const date =
            item?.release_date;

          return (
            Boolean(date) &&
            date > today
          );
        })
        .sort((a, b) =>
          a.release_date.localeCompare(
            b.release_date
          )
        );

    /* =====================================================
       UPCOMING TV
    ===================================================== */

    const upcomingTV =
      tvShows
        .filter((item) => {
          const date =
            item?.first_air_date;

          return (
            Boolean(date) &&
            date > today
          );
        })
        .sort((a, b) =>
          a.first_air_date.localeCompare(
            b.first_air_date
          )
        );

    /* =====================================================
       RELEASED MOVIES
    ===================================================== */

    const releasedMovies =
      movies.filter((item) => {
        const date =
          item?.release_date;

        return (
          !date ||
          date <= today
        );
      });

    /* =====================================================
       RELEASED TV
    ===================================================== */

    const releasedTV =
      tvShows.filter((item) => {
        const date =
          item?.first_air_date;

        return (
          !date ||
          date <= today
        );
      });

    /* =====================================================
       DIRECTING
    ===================================================== */

    const directed =
      crew.filter(
        isDirectorCredit
      );

    /* =====================================================
       PRODUCING
    ===================================================== */

    const produced =
      crew.filter(
        isProducerCredit
      );

    /* =====================================================
       WRITING
    ===================================================== */

    const written =
      crew.filter(
        isWriterCredit
      );

    /* =====================================================
       CINEMATOGRAPHY
    ===================================================== */

    const cinematography =
      crew.filter(
        isCinematographyCredit
      );

    /* =====================================================
       ALL UNIQUE PROJECTS
    ===================================================== */

    const allCredits =
      uniqueCredits([
        ...cast,
        ...crew,
        ...normalizedCombinedCast,
        ...normalizedCombinedCrew,
      ]);

    /* =====================================================
       KNOWN FOR
    ===================================================== */

    const knownFor =
      [...allCredits]
        .filter(
          (item) =>
            item?.poster_path ||
            item?.backdrop_path
        )
        .sort(
          (a, b) =>
            Number(
              b?.popularity || 0
            ) -
            Number(
              a?.popularity || 0
            )
        )
        .slice(0, 10);

    /* =====================================================
       CAREER STATISTICS
    ===================================================== */

    const careerStats = {
      /**
       * Unique film/TV titles.
       */
      totalCredits:
        allCredits.length,

      /**
       * Unique acting titles.
       */
      actingCredits:
        cast.length,

      /**
       * Unique crew titles.
       */
      crewCredits:
        crew.length,

      /**
       * Acting movie titles.
       */
      movieCredits:
        movies.length,

      /**
       * Acting TV titles.
       */
      tvCredits:
        tvShows.length,

      /**
       * Directing credits.
       */
      directedCredits:
        directed.length,

      /**
       * Producer credits.
       */
      producedCredits:
        produced.length,

      /**
       * Writing credits.
       */
      writtenCredits:
        written.length,

      /**
       * Cinematography credits.
       */
      cinematographyCredits:
        cinematography.length,
    };

    /* =====================================================
       AWARDS

       TMDB person endpoints don't provide
       a complete awards database.
    ===================================================== */

    const awards = [];

    /* =====================================================
       RETURN NORMALIZED PERSON
    ===================================================== */

    return {
      /* Main information */
      details,

      /* Credit objects */
      credits: {
        cast,
        crew,

        combined: {
          cast:
            normalizedCombinedCast,

          crew:
            normalizedCombinedCrew,
        },
      },

      /* Convenient arrays */
      cast,
      crew,

      movies,
      tvShows,

      releasedMovies,
      releasedTV,

      upcomingMovies,
      upcomingTV,

      knownFor,

      directed,
      produced,
      written,
      cinematography,

      allCredits,

      careerStats,

      images,

      externalIds,

      awards,
    };
  } catch (error) {
    console.error(
      "Failed to load complete person:",
      error
    );

    throw error;
  }
}

/* =========================================================
   SEARCH PEOPLE
========================================================= */

export async function searchPeople(
  query
) {
  if (!query?.trim()) {
    return [];
  }

  const response =
    await personApi.get(
      "/search/person",
      {
        params: {
          query:
            query.trim(),
        },
      }
    );

  return cleanArray(
    response.data?.results
  );
}

/* =========================================================
   POPULAR PEOPLE
========================================================= */

export async function getPopularPeople() {
  const response =
    await personApi.get(
      "/person/popular"
    );

  return cleanArray(
    response.data?.results
  );
}

/* =========================================================
   PROFILE IMAGE HELPER
========================================================= */

export function getProfileImage(
  path,
  size = "w500"
) {
  if (!path) {
    return "/avatar-placeholder.png";
  }

  return `${IMAGE_BASE_URL}/${size}${path}`;
}

/* =========================================================
   PERSON IMAGE HELPER
========================================================= */

export function getPersonImage(
  path,
  size = "original"
) {
  if (!path) {
    return "/placeholder.jpg";
  }

  return `${IMAGE_BASE_URL}/${size}${path}`;
}

/* =========================================================
   DEFAULT EXPORT
========================================================= */

export default personApi;