import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getCompletePerson,
} from "../services/personService";

/**
 * =========================================================
 * usePerson
 * =========================================================
 *
 * Fetches and caches complete TMDB person information.
 *
 * @param {number|string} personId
 */
export default function usePerson(personId) {
  const queryClient = useQueryClient();

  const enabled =
    personId !== undefined &&
    personId !== null &&
    String(personId).trim() !== "";

  const query = useQuery({
    queryKey: ["person", personId],

    queryFn: () =>
      getCompletePerson(personId),

    enabled,

    /**
     * Person information doesn't change frequently.
     */
    staleTime: 1000 * 60 * 5,

    /**
     * Keep unused person data cached for 30 minutes.
     */
    gcTime: 1000 * 60 * 30,

    /**
     * Don't repeatedly retry invalid TMDB IDs.
     */
    retry: 1,

    /**
     * Person pages don't need automatic
     * refetching every time the window focuses.
     */
    refetchOnWindowFocus: false,
  });

  /**
   * Manually refresh person information.
   */
  const refresh = async () => {
    if (!enabled) return;

    await queryClient.invalidateQueries({
      queryKey: ["person", personId],
    });
  };

  return {
    /**
     * Normalized person object.
     */
    person: query.data ?? null,

    /**
     * Initial loading state.
     */
    loading: query.isLoading,

    /**
     * Error object.
     */
    error: query.error ?? null,

    /**
     * Manually invalidate/refetch.
     */
    refresh,

    /**
     * True whenever a request is running,
     * including background requests.
     */
    isFetching: query.isFetching,

    /**
     * Error boolean.
     */
    isError: query.isError,

    /**
     * Useful if the page needs the raw React Query state.
     */
    isPending: query.isPending,

    /**
     * Useful for manually refetching.
     */
    refetch: query.refetch,
  };
}