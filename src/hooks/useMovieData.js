import axios from "axios";
import { useState, useEffect } from "react";


// =============================
// TMDB CONFIG
// =============================


const API_KEY =
import.meta.env.VITE_TMDB_API_KEY;


const BASE_URL =
import.meta.env.VITE_TMDB_BASE_URL ||
"https://api.themoviedb.org/3";



// =============================
// AXIOS INSTANCE
// =============================


const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "en-US",
  },
  timeout: 10000,
});


// =============================
// GENERIC GET REQUEST
// =============================


export async function apiGet(endpoint, params = {}) {
  try {
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("API ERROR:", error.response?.data || error.message);
    throw error;
  }
}


// =============================
// OLD COMPATIBILITY FUNCTION
// =============================
// Used by old components
// Example: fetchMovies("/movie/popular")


export async function fetchMovies(endpoint) {
  const data = await apiGet(endpoint);
  return data.results || [];
}


// =============================
// SEARCH HELPER
// =============================


export async function searchMovies(query, page = 1) {
  const data = await apiGet("/search/multi", { query, page });
  return data.results || [];
}


export function useMovieData(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    setError(null);

    apiGet(endpoint)
      .then((response) => {
        if (canceled) return;
        setData(response?.results || response || []);
      })
      .catch((err) => {
        if (canceled) return;
        setError(err);
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, [endpoint]);

  return { data, loading, error };
}


// =============================
// IMAGE URL HELPER
// =============================


export function imageUrl(path, size = "w500") {
  if (!path) return "/placeholder.jpg";
  return `https://image.tmdb.org/t/p/${size}${path}`;
}


// =============================
// EXPORT AXIOS INSTANCE
// =============================


export default api;
