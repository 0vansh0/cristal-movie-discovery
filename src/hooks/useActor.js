import { useCallback, useEffect, useState } from "react";
import actorService from "../services/actorService";

export default function useActor(actorId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [actor, setActor] = useState(null);
  const [movieCredits, setMovieCredits] = useState([]);
  const [tvCredits, setTVCredits] = useState([]);
  const [images, setImages] = useState([]);
  const [externalIds, setExternalIds] =
    useState({});
  const [similarActors, setSimilarActors] =
    useState([]);

  /* -------------------------------- */

  const loadActor = useCallback(async () => {
    if (!actorId) return;

    try {
      setLoading(true);
      setError(null);

      const data =
        await actorService.getActor(actorId);

      setActor(data);

      /* ------------------------------ */
      /* Images                         */
      /* ------------------------------ */

      setImages(data.images?.profiles || []);

      /* ------------------------------ */
      /* Social                         */
      /* ------------------------------ */

      setExternalIds(
        data.external_ids || {}
      );

      /* ------------------------------ */
      /* Credits                        */
      /* ------------------------------ */

      const cast =
        data.combined_credits?.cast || [];

      const movies = cast
        .filter(
          (item) =>
            item.media_type === "movie"
        )
        .sort(
          (a, b) =>
            new Date(
              b.release_date || 0
            ) -
            new Date(
              a.release_date || 0
            )
        );

      const tv = cast
        .filter(
          (item) =>
            item.media_type === "tv"
        )
        .sort(
          (a, b) =>
            new Date(
              b.first_air_date || 0
            ) -
            new Date(
              a.first_air_date || 0
            )
        );

      setMovieCredits(movies);
      setTVCredits(tv);

      /* -------------------------------- */
      /* Similar actors from trending/popular*/
      /* -------------------------------- */

      const trending = await actorService.getTrending();
      const popular = await actorService.getPopular();

      const combined = [
        ...(trending || []),
        ...(popular?.results || []),
      ];

      const unique = Array.from(
        new Map(
          combined.map((person) => [person.id, person])
        ).values()
      ).filter((person) => person.id !== Number(actorId));

      setSimilarActors(unique.slice(0, 12));
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data?.status_message ||
          err.message
      );
    } finally {
      setLoading(false);
    }
  }, [actorId]);

  /* -------------------------------- */

  useEffect(() => {
    loadActor();
  }, [loadActor]);

  /* -------------------------------- */

  const refresh = () => {
    loadActor();
  };

  /* -------------------------------- */

  return {
    loading,
    error,

    actor,

    movieCredits,

    tvCredits,

    images,

    externalIds,

    similarActors,

    refresh,
  };
}