import TMDB from "./api";

class ActorService {
  /* ----------------------------- */
  /* Get Complete Actor Profile */
  /* ----------------------------- */

  async getActor(id) {
    const { data } = await TMDB.get(`/person/${id}`, {
      params: {
        append_to_response:
          "combined_credits,images,external_ids",
      },
    });

    return data;
  }

  /* ----------------------------- */
  /* Details Only */
  /* ----------------------------- */

  async getDetails(id) {
    const { data } = await TMDB.get(
      `/person/${id}`
    );

    return data;
  }

  /* ----------------------------- */
  /* Combined Credits */
  /* ----------------------------- */

  async getCombinedCredits(id) {
    const { data } = await TMDB.get(
      `/person/${id}/combined_credits`
    );

    return data;
  }

  /* ----------------------------- */
  /* Movie Credits */
  /* ----------------------------- */

  async getMovieCredits(id) {
    const { data } = await TMDB.get(
      `/person/${id}/movie_credits`
    );

    return data;
  }

  /* ----------------------------- */
  /* TV Credits */
  /* ----------------------------- */

  async getTVCredits(id) {
    const { data } = await TMDB.get(
      `/person/${id}/tv_credits`
    );

    return data;
  }

  /* ----------------------------- */
  /* Images */
  /* ----------------------------- */

  async getImages(id) {
    const { data } = await TMDB.get(
      `/person/${id}/images`
    );

    return data;
  }

  /* ----------------------------- */
  /* Social Links */
  /* ----------------------------- */

  async getExternalIds(id) {
    const { data } = await TMDB.get(
      `/person/${id}/external_ids`
    );

    return data;
  }

  /* ----------------------------- */
  /* Latest Trending Actors */
  /* ----------------------------- */

  async getTrending() {
    const { data } = await TMDB.get(
      "/trending/person/week"
    );

    return data.results;
  }

  /* ----------------------------- */
  /* Popular Actors */
  /* ----------------------------- */

  async getPopular(page = 1) {
    const { data } = await TMDB.get(
      "/person/popular",
      {
        params: { page },
      }
    );

    return data;
  }

  /* ----------------------------- */
  /* Search */
  /* ----------------------------- */

  async search(query, page = 1) {
    const { data } = await TMDB.get(
      "/search/person",
      {
        params: {
          query,
          page,
        },
      }
    );

    return data;
  }
}

export default new ActorService();