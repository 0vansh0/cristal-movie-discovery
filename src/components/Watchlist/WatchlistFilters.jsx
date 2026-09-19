import { motion, AnimatePresence } from "framer-motion";
import {
  Filter,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

const genres = [
  "All",
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

const years = [
  "All",
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
];

const ratings = [
  "All",
  "9+",
  "8+",
  "7+",
  "6+",
  "5+",
];

const languages = [
  "All",
  "English",
  "Hindi",
  "Japanese",
  "Korean",
  "French",
  "Spanish",
];

export default function WatchlistFilters({
  filters,
  setFilters,
}) {
  const [open, setOpen] = useState(false);

  const update = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      genre: "All",
      year: "All",
      rating: "All",
      language: "All",
    });
  };

  return (
    <div className="relative">

      {/* Toggle Button */}

      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: .96 }}
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-5
          py-4
          backdrop-blur-xl
        "
      >
        <Filter size={18} />

        Filters

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
        >
          <ChevronDown size={16} />
        </motion.div>

      </motion.button>

      {/* Panel */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
              scale: .98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 15,
            }}
            className="
              absolute
              right-0
              mt-4
              w-[360px]
              rounded-[28px]
              border
              border-white/10
              bg-[#10131D]/95
              p-6
              backdrop-blur-3xl
              shadow-2xl
              z-50
            "
          >

            <h3 className="mb-6 text-xl font-bold">
              Filter Movies
            </h3>

            <FilterSelect
              label="Genre"
              value={filters.genre}
              options={genres}
              onChange={(v) => update("genre", v)}
            />

            <FilterSelect
              label="Year"
              value={filters.year}
              options={years}
              onChange={(v) => update("year", v)}
            />

            <FilterSelect
              label="Rating"
              value={filters.rating}
              options={ratings}
              onChange={(v) => update("rating", v)}
            />

            <FilterSelect
              label="Language"
              value={filters.language}
              options={languages}
              onChange={(v) => update("language", v)}
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: .96 }}
              onClick={resetFilters}
              className="
                mt-6
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-2xl
                bg-gradient-to-r
                from-[#FF5E5E]
                via-[#FF9B5E]
                to-[#FFD464]
                py-4
                font-bold
                text-black
              "
            >
              <RotateCcw size={18} />

              Reset Filters

            </motion.button>

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <div className="mb-5">

      <label className="mb-2 block text-sm text-zinc-400">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-white/10
          bg-white/5
          px-4
          py-3
          outline-none
          focus:border-[#FFD464]
        "
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-[#10131D]"
          >
            {option}
          </option>
        ))}
      </select>

    </div>
  );
}