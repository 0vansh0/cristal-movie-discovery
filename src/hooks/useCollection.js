import { useEffect, useRef, useState } from "react";
import { getCompleteCollection } from "../services/collectionService";

const cache = new Map();

export default function useCollection(collectionId) {
  const mounted = useRef(true);

  const [collection, setCollection] = useState(null);
  const [movies, setMovies] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    mounted.current = true;

    async function loadCollection() {
      if (!collectionId) return;

      /* Cache */

      if (cache.has(collectionId)) {
        const data = cache.get(collectionId);

        setCollection(data.collection);
        setMovies(data.movies);
        setGallery(data.gallery);
        setStats(data.stats);

        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await getCompleteCollection(collectionId);

        cache.set(collectionId, data);

        if (!mounted.current) return;

        setCollection(data.collection);
        setMovies(data.movies);
        setGallery(data.gallery);
        setStats(data.stats);
      } catch (err) {
        if (mounted.current) {
          setError(err);
        }
      } finally {
        if (mounted.current) {
          setLoading(false);
        }
      }
    }

    loadCollection();

    return () => {
      mounted.current = false;
    };
  }, [collectionId]);

  const refresh = async () => {
    if (!collectionId) return;

    cache.delete(collectionId);

    setLoading(true);

    try {
      const data = await getCompleteCollection(collectionId);

      cache.set(collectionId, data);

      setCollection(data.collection);
      setMovies(data.movies);
      setGallery(data.gallery);
      setStats(data.stats);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    collection,
    movies,
    gallery,
    stats,
    loading,
    error,
    refresh,
  };
}