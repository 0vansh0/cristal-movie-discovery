import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import WatchlistSearch from "./WatchlistSearch";
import WatchlistFilters from "./WatchlistFilters";
import WatchlistSort from "./WatchlistSort";
import WatchlistViewToggle from "./WatchlistViewToggle";

export default function WatchlistToolbar({
  search = "",
  setSearch = () => {},
}) {
  const [view, setView] = useState("grid");

  const [sort, setSort] = useState("Recently Added");

  const [filters, setFilters] = useState({
    genre: "All",
    year: "All",
    rating: "All",
    language: "All",
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        sticky
        top-5
        z-40
        mt-12
        rounded-[28px]
        border
        border-white/10
        bg-black/40
        backdrop-blur-3xl
        shadow-2xl
      "
    >
      <div className="flex flex-wrap items-center gap-5 p-5">

        {/* Search */}

        <div className="min-w-[300px] flex-1">
          <WatchlistSearch
            value={search}
            onChange={setSearch}
          />
        </div>

        {/* Filters */}

        <WatchlistFilters
          filters={filters}
          setFilters={setFilters}
        />

        {/* Sort */}

        <WatchlistSort
          value={sort}
          onChange={setSort}
        />

        {/* View Toggle */}

        <WatchlistViewToggle
          view={view}
          setView={setView}
        />

        {/* AI */}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="
            ml-auto
            flex
            items-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-[#FF5E5E]
            via-[#FF9B5E]
            to-[#FFD464]
            px-6
            py-4
            font-semibold
            text-black
            shadow-lg
          "
        >
          <Sparkles size={18} />
          AI Organize
        </motion.button>

      </div>
    </motion.section>
  );
}