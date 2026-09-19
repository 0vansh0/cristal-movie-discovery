import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
} from "lucide-react";

const LANGUAGES = [
  "All",
  "English",
  "Hindi",
  "Japanese",
  "Korean",
  "French",
  "Spanish",
];

const TYPES = [
  "all",
  "movie",
  "tv",
  "person",
];

export default function SearchFilters({
  genres = [],
  filters,
  onChange,
}) {
  const [open, setOpen] = useState(true);

  const update = (key, value) => {
    onChange?.({
      ...filters,
      [key]: value,
    });
  };

  const resetFilters = () => {
    onChange?.({
      type: "all",
      genre: "",
      year: "",
      rating: 0,
      language: "All",
      adult: false,
    });
  };

  return (
    <section
      className="
        rounded-[36px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-3xl
      "
    >
      {/* Header */}

      <button
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between
          p-7
        "
      >
        <div className="flex items-center gap-4">

          <div
            className="
              rounded-2xl
              bg-[#FFD464]/15
              p-3
            "
          >
            <SlidersHorizontal
              className="text-[#FFD464]"
            />
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              Search Filters
            </h2>

            <p className="text-zinc-400">
              Narrow your search results
            </p>

          </div>

        </div>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
        >
          <ChevronDown />
        </motion.div>
      </button>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            className="overflow-hidden"
          >

            <div className="grid gap-6 p-7 md:grid-cols-2 xl:grid-cols-3">

              {/* Media Type */}

              <FilterGroup title="Media Type">

                <select
                  value={filters.type}
                  onChange={(e)=>
                    update("type",e.target.value)
                  }
                  className="filter-input"
                >
                  {TYPES.map(type=>(
                    <option
                      key={type}
                      value={type}
                    >
                      {type.toUpperCase()}
                    </option>
                  ))}
                </select>

              </FilterGroup>

              {/* Genre */}

              <FilterGroup title="Genre">

                <select
                  value={filters.genre}
                  onChange={(e)=>
                    update("genre",e.target.value)
                  }
                  className="filter-input"
                >
                  <option value="">
                    All Genres
                  </option>

                  {genres.map(g=>(
                    <option
                      key={g.id}
                      value={g.id}
                    >
                      {g.name}
                    </option>
                  ))}

                </select>

              </FilterGroup>

              {/* Year */}

              <FilterGroup title="Release Year">

                <input
                  type="number"
                  value={filters.year}
                  onChange={(e)=>
                    update("year",e.target.value)
                  }
                  placeholder="2025"
                  className="filter-input"
                />

              </FilterGroup>

              {/* Rating */}

              <FilterGroup title="Minimum Rating">

                <input
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={filters.rating}
                  onChange={(e)=>
                    update(
                      "rating",
                      Number(e.target.value)
                    )
                  }
                  className="w-full accent-[#FFD464]"
                />

                <div className="mt-2 text-sm text-[#FFD464]">
                  {filters.rating} / 10
                </div>

              </FilterGroup>

              {/* Language */}

              <FilterGroup title="Language">

                <select
                  value={filters.language}
                  onChange={(e)=>
                    update(
                      "language",
                      e.target.value
                    )
                  }
                  className="filter-input"
                >
                  {LANGUAGES.map(lang=>(
                    <option
                      key={lang}
                      value={lang}
                    >
                      {lang}
                    </option>
                  ))}
                </select>

              </FilterGroup>

              {/* Adult */}

              <FilterGroup title="Adult Content">

                <label
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >
                  <input
                    type="checkbox"
                    checked={filters.adult}
                    onChange={(e)=>
                      update(
                        "adult",
                        e.target.checked
                      )
                    }
                    className="h-5 w-5 accent-[#FFD464]"
                  />

                  <span>
                    Include Adult Content
                  </span>

                </label>

              </FilterGroup>

            </div>

            {/* Footer */}

            <div
              className="
                border-t
                border-white/10
                p-6
              "
            >
              <motion.button
                whileHover={{
                  scale:1.04,
                }}
                whileTap={{
                  scale:.95,
                }}
                onClick={resetFilters}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-full
                  bg-[#FFD464]
                  px-7
                  py-3
                  font-semibold
                  text-black
                "
              >
                <RotateCcw size={18}/>
                Reset Filters
              </motion.button>
            </div>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  );
}

function FilterGroup({
  title,
  children,
}) {
  return (
    <div>

      <h3 className="mb-3 font-semibold">
        {title}
      </h3>

      {children}

    </div>
  );
}