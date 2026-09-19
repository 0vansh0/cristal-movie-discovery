import api from "../services/api.js";
import tmdb from "../services/tmdbService.js";
import { getImageUrl } from "./imageUtils.js";

export { api, getImageUrl };

export async function fetchMovies(endpoint) {
  const response = await tmdb.get(endpoint);
  return response.data.results;
}
