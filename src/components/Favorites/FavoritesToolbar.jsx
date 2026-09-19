import { motion } from "framer-motion";
import FavoritesSearch from "./FavoritesSearch";
import FavoritesFilters from "./FavoritesFilters";
import FavoritesSort from "./FavoritesSort";
import FavoritesViewToggle from "./FavoritesViewToggle";

export default function FavoritesToolbar({
  search,
  setSearch,
  sort,
  setSort,
  view,
  setView,
}) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      className="
        sticky
        top-5
        z-40
        mt-12
        rounded-[34px]
        border
        border-white/10
        bg-black/40
        p-6
        backdrop-blur-3xl
        shadow-[0_20px_80px_rgba(0,0,0,.35)]
      "
    >
      {/* Top Row */}

      <div className="flex flex-col gap-5 xl:flex-row">

        <div className="flex-1">

          <FavoritesSearch
            value={search}
            onChange={setSearch}
          />

        </div>

        <div className="flex flex-wrap items-center gap-4">

          <FavoritesSort
            value={sort}
            onChange={setSort}
          />

          <FavoritesViewToggle
            view={view}
            onChange={setView}
          />

        </div>

      </div>

      {/* Filters */}

      <div className="mt-8">

        <FavoritesFilters />

      </div>

    </motion.section>
  );
}