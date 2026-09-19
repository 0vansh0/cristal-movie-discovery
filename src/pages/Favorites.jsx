import { useMemo, useState } from "react";

import FavoritesHero from "../components/Favorites/FavoritesHero";
import FavoritesStats from "../components/Favorites/FavoritesStats";
import FavoritesToolbar from "../components/Favorites/FavoritesToolbar";
import FavoritesGrid from "../components/Favorites/FavoritesGrid";
import FavoritesCollections from "../components/Favorites/FavoritesCollections";
import FavoritesTimeline from "../components/Favorites/FavoritesTimeline";
import FavoritesGenres from "../components/Favorites/FavoritesGenres";
import FavoritesRecommendations from "../components/Favorites/FavoritesRecommendations";
import FavoritesProgress from "../components/Favorites/FavoritesProgress";
import FavoritesFloatingActions from "../components/Favorites/FavoritesFloatingActions";
import FavoritesEmpty from "../components/Favorites/FavoritesEmpty";

export default function Favorites() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Recently Added");
  const [view, setView] = useState("grid");

  // Replace this with your Redux/API/Firebase data
  const favorites = [];

  const filteredMovies = useMemo(() => {
    let data = [...favorites];

    if (search) {
      data = data.filter((movie) =>
        (movie.title || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    switch (sort) {
      case "Rating":
        data.sort(
          (a, b) =>
            (b.vote_average || 0) -
            (a.vote_average || 0)
        );
        break;

      case "Release Date":
        data.sort(
          (a, b) =>
            new Date(b.release_date || 0) -
            new Date(a.release_date || 0)
        );
        break;

      case "Title":
        data.sort((a, b) =>
          (a.title || "").localeCompare(b.title || "")
        );
        break;

      default:
        break;
    }

    return data;
  }, [favorites, search, sort]);

  return (
    <main
      className="
        relative
        min-h-screen
        bg-[#070B11]
        text-white
      "
    >
      {/* Background */}

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#FFD46410,transparent_60%)]" />

      <div className="mx-auto max-w-[1700px] space-y-20 px-6 py-10">

        <FavoritesHero />

        <FavoritesStats />

        <FavoritesToolbar
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          view={view}
          setView={setView}
        />

        {filteredMovies.length === 0 ? (
          <FavoritesEmpty />
        ) : (
          <>
            <FavoritesGrid
              movies={filteredMovies}
              view={view}
            />

            <FavoritesCollections />

            <FavoritesTimeline />

            <FavoritesGenres />

            <FavoritesRecommendations />

            <FavoritesProgress />
          </>
        )}

      </div>

      <FavoritesFloatingActions />

    </main>
  );
}