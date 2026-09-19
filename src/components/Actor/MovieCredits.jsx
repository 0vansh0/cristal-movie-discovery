import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ArrowUpDown,
  Film,
} from "lucide-react";

import CreditCard from "./CreditCard";

const ITEMS_PER_PAGE = 12;

export default function MovieCredits({
  credits = [],
  onMovieClick,
}) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("year");
  const [visible, setVisible] = useState(ITEMS_PER_PAGE);

  const movies = useMemo(() => {
    let data = [...credits];

    data = data.filter((movie) =>
      (movie.title || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    if (sortBy === "year") {
      data.sort(
        (a, b) =>
          new Date(b.release_date || 0) -
          new Date(a.release_date || 0)
      );
    }

    if (sortBy === "rating") {
      data.sort(
        (a, b) =>
          (b.vote_average || 0) -
          (a.vote_average || 0)
      );
    }

    if (sortBy === "popularity") {
      data.sort(
        (a, b) =>
          (b.popularity || 0) -
          (a.popularity || 0)
      );
    }

    return data;
  }, [credits, search, sortBy]);

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="flex items-center gap-3 text-4xl font-black">

            <Film className="text-[#FFD464]" />

            Movie Credits

          </h2>

          <p className="mt-2 text-zinc-400">
            Complete movie filmography
          </p>

        </div>

        {/* Search */}

        <div className="flex flex-col gap-4 md:flex-row">

          <div className="relative">

            <Search
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-zinc-500
              "
              size={18}
            />

            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                rounded-full
                border
                border-white/10
                bg-white/5
                py-3
                pl-11
                pr-5
                outline-none
                backdrop-blur-xl
              "
            />

          </div>

          {/* Sort */}

          <div className="relative">

            <ArrowUpDown
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-zinc-500
              "
              size={18}
            />

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value)
              }
              className="
                rounded-full
                border
                border-white/10
                bg-white/5
                py-3
                pl-11
                pr-5
                outline-none
                backdrop-blur-xl
              "
            >
              <option value="year">
                Release Year
              </option>

              <option value="rating">
                Rating
              </option>

              <option value="popularity">
                Popularity
              </option>

            </select>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="flex flex-wrap gap-4">

        <Stat
          title="Movies"
          value={movies.length}
        />

        <Stat
          title="Average Rating"
          value={
            (
              movies.reduce(
                (a, b) =>
                  a +
                  (b.vote_average || 0),
                0
              ) / movies.length
            ).toFixed(1)
          }
        />

      </div>

      {/* Grid */}

      <motion.div
        layout
        className="
          grid
          gap-8
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >

        {movies
          .slice(0, visible)
          .map((movie) => (

            <CreditCard
              key={movie.id}
              item={movie}
              onClick={onMovieClick}
            />

          ))}

      </motion.div>

      {/* Empty */}

      {movies.length === 0 && (

        <div
          className="
            rounded-3xl
            border
            border-dashed
            border-white/10
            p-16
            text-center
          "
        >

          <Filter
            className="
              mx-auto
              mb-4
              text-zinc-500
            "
            size={45}
          />

          <h3 className="text-2xl font-bold">
            No Movies Found
          </h3>

          <p className="mt-3 text-zinc-400">
            Try another search keyword.
          </p>

        </div>

      )}

      {/* Load More */}

      {visible < movies.length && (

        <div className="flex justify-center">

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: .96,
            }}
            onClick={() =>
              setVisible(
                (prev) =>
                  prev + ITEMS_PER_PAGE
              )
            }
            className="
              rounded-full
              bg-[#FFD464]
              px-8
              py-3
              font-bold
              text-black
            "
          >
            Load More
          </motion.button>

        </div>

      )}

    </section>
  );
}

/* ------------------------- */

function Stat({
  title,
  value,
}) {
  return (
    <div
      className="
        rounded-full
        border
        border-white/10
        bg-white/5
        px-6
        py-3
        backdrop-blur-xl
      "
    >
      <p className="text-xs text-zinc-400">
        {title}
      </p>

      <h4 className="text-lg font-bold">
        {value}
      </h4>
    </div>
  );
}