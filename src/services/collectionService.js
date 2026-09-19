import api from "./TMDB";

/* ----------------------------- */
/* Collection Details */
/* ----------------------------- */

export async function getCollectionDetails(id) {
  const { data } = await api.get(`/collection/${id}`);
  return data;
}

/* ----------------------------- */
/* Collection Images */
/* TMDB doesn't expose a dedicated
   collection images endpoint.
   We'll build a gallery from movie
   posters and backdrops.
*/
/* ----------------------------- */

function buildGallery(parts = []) {
  const posters = [];
  const backdrops = [];

  parts.forEach((movie) => {
    if (movie.poster_path) {
      posters.push({
        file_path: movie.poster_path,
        type: "poster",
      });
    }

    if (movie.backdrop_path) {
      backdrops.push({
        file_path: movie.backdrop_path,
        type: "backdrop",
      });
    }
  });

  return [...backdrops, ...posters];
}

/* ----------------------------- */
/* Collection Statistics */
/* ----------------------------- */

function calculateStats(parts = []) {
  const runtime = parts.reduce(
    (sum, movie) => sum + (movie.runtime || 0),
    0
  );

  const revenue = parts.reduce(
    (sum, movie) => sum + (movie.revenue || 0),
    0
  );

  const budget = parts.reduce(
    (sum, movie) => sum + (movie.budget || 0),
    0
  );

  const votes = parts.reduce(
    (sum, movie) => sum + (movie.vote_count || 0),
    0
  );

  const popularity =
    parts.length
      ? parts.reduce(
          (sum, movie) =>
            sum + (movie.popularity || 0),
          0
        ) / parts.length
      : 0;

  const rating =
    parts.length
      ? parts.reduce(
          (sum, movie) =>
            sum + (movie.vote_average || 0),
          0
        ) / parts.length
      : 0;

  return {
    movies: parts.length,
    runtime,
    revenue,
    budget,
    votes,
    popularity,
    rating,
  };
}

/* ----------------------------- */
/* Main Loader */
/* ----------------------------- */

export async function getCompleteCollection(id) {
  const collection =
    await getCollectionDetails(id);

  const movies = [...collection.parts].sort(
    (a, b) =>
      new Date(a.release_date || 0) -
      new Date(b.release_date || 0)
  );

  return {
    collection,

    movies,

    gallery: buildGallery(movies),

    stats: calculateStats(movies),
  };
}