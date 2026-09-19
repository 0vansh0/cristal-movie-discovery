import { motion } from "framer-motion";
import {
  Filter,
  Check,
  Star,
  Globe,
  Calendar,
} from "lucide-react";
import { useState } from "react";

const genres = [
  "All",
  "Action",
  "Drama",
  "Comedy",
  "Sci-Fi",
  "Thriller",
  "Animation",
  "Fantasy",
  "Adventure",
  "Crime",
];

const ratings = [
  "All",
  "9+",
  "8+",
  "7+",
  "6+",
];

const languages = [
  "All",
  "English",
  "Hindi",
  "Japanese",
  "Korean",
  "French",
];

export default function FavoritesFilters() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [rating, setRating] = useState("All");
  const [language, setLanguage] = useState("All");
  const [year, setYear] = useState("2025");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="
        rounded-[30px]
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-3xl
      "
    >
      {/* Header */}

      <div className="mb-8 flex items-center gap-3">

        <div className="rounded-xl bg-white/10 p-3">
          <Filter size={20} />
        </div>

        <h2 className="text-xl font-bold">
          Filters
        </h2>

      </div>

      {/* Genres */}

      <div>

        <h3 className="mb-4 font-semibold">
          Genres
        </h3>

        <div className="flex flex-wrap gap-3">

          {genres.map((genre) => (

            <motion.button
              key={genre}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: .95 }}
              onClick={() => setSelectedGenre(genre)}
              className={`
                rounded-full
                px-5
                py-3
                transition-all
                ${
                  selectedGenre === genre
                    ? "bg-gradient-to-r from-[#FF5E5E] to-[#FFD464] text-black"
                    : "bg-white/5 hover:bg-white/10"
                }
              `}
            >
              {genre}
            </motion.button>

          ))}

        </div>

      </div>

      {/* Rating */}

      <div className="mt-8">

        <h3 className="mb-4 flex items-center gap-2 font-semibold">

          <Star size={18} />

          Rating

        </h3>

        <div className="grid grid-cols-5 gap-3">

          {ratings.map((item) => (

            <button
              key={item}
              onClick={() => setRating(item)}
              className={`
                rounded-xl
                py-3
                transition
                ${
                  rating === item
                    ? "bg-[#FFD464] text-black"
                    : "bg-white/5"
                }
              `}
            >
              {item}
            </button>

          ))}

        </div>

      </div>

      {/* Language */}

      <div className="mt-8">

        <h3 className="mb-4 flex items-center gap-2 font-semibold">

          <Globe size={18} />

          Language

        </h3>

        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="
            w-full
            rounded-2xl
            bg-white/5
            p-4
            outline-none
          "
        >
          {languages.map((lang) => (
            <option
              key={lang}
              className="bg-[#080B12]"
            >
              {lang}
            </option>
          ))}
        </select>

      </div>

      {/* Year */}

      <div className="mt-8">

        <h3 className="mb-4 flex items-center gap-2 font-semibold">

          <Calendar size={18} />

          Release Year

        </h3>

        <input
          type="range"
          min="1980"
          max="2025"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full"
        />

        <div className="mt-3 flex justify-between text-sm text-zinc-400">

          <span>1980</span>

          <span className="font-bold text-white">
            {year}
          </span>

          <span>2025</span>

        </div>

      </div>

      {/* Apply */}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: .98 }}
        className="
          mt-10
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
          font-semibold
          text-black
        "
      >
        <Check size={18} />

        Apply Filters

      </motion.button>

    </motion.div>
  );
}