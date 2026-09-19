import { useEffect, useState } from 'react';
import { api } from '../utils/api';

const FALLBACK_GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];

const FALLBACK_MOVIES = [
  {
    id: 101,
    title: 'DISCLOSURE DAY',
    release_date: '2026-05-15',
    vote_average: 7.4,
    overview:
      'A cybersecurity expert becomes a whistleblower after uncovering secrets about aliens, putting him on the run from a corporation. Meanwhile, a meteorologist experiencing strange phenomena joins forces with him to prove there is life beyond our understanding.',
    poster_path:
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 102,
    title: 'SPIDER-MAN: BRAND NEW DAY',
    release_date: '2026-07-01',
    vote_average: 8.2,
    overview:
      "Fighting crime full-time as Spider-Man in a world that doesn't remember him—and the pressure of seeing his old friends move on without him—sparks a change in Peter Parker he may not have the power to control.",
    poster_path:
      'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 103,
    title: 'PHANTOM SKYLINE',
    release_date: '2025-11-20',
    vote_average: 8.0,
    overview:
      'In a futuristic metropolis where memories are traded like currency, a rogue detective uncovers a conspiracy that reaches the highest towers.',
    poster_path:
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
  },
];

export const useGenreFilter = (type = 'movie') => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/genre/${type}/list`);
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
        setError('Unable to load genres from TMDB. Showing fallback selections.');
        setGenres(FALLBACK_GENRES);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, [type]);

  useEffect(() => {
    const fetchFiltered = async () => {
      if (!selectedGenre) {
        setFilteredMovies([]);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const endpoint = type === 'movie' ? '/discover/movie' : '/discover/tv';
        const response = await api.get(endpoint, {
          params: {
            with_genres: selectedGenre,
            sort_by: 'popularity.desc',
          },
        });
        setFilteredMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching filtered movies:', error);
        setError('Unable to load movies from TMDB. Showing fallback picks.');
        setFilteredMovies(FALLBACK_MOVIES);
      } finally {
        setLoading(false);
      }
    };

    fetchFiltered();
  }, [selectedGenre, type]);

  return {
    genres,
    selectedGenre,
    setSelectedGenre,
    filteredMovies,
    loading,
    error,
  };
};