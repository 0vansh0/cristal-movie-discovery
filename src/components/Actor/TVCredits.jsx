import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Tv,
  Search,
  ArrowUpDown,
  Filter,
} from "lucide-react";

import CreditCard from "./CreditCard";

const ITEMS_PER_PAGE = 12;

export default function TVCredits({
  credits = [],
  onTVClick,
}) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("year");
  const [visible, setVisible] = useState(ITEMS_PER_PAGE);

  const shows = useMemo(() => {
    let data = [...credits];

    data = data.filter((show) =>
      (show.name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    switch (sortBy) {
      case "rating":
        data.sort(
          (a, b) =>
            (b.vote_average || 0) -
            (a.vote_average || 0)
        );
        break;

      case "popularity":
        data.sort(
          (a, b) =>
            (b.popularity || 0) -
            (a.popularity || 0)
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.first_air_date || 0) -
            new Date(a.first_air_date || 0)
        );
    }

    return data;
  }, [credits, search, sortBy]);

  const average =
    shows.length > 0
      ? (
          shows.reduce(
            (sum, item) =>
              sum +
              (item.vote_average || 0),
            0
          ) / shows.length
        ).toFixed(1)
      : "--";

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h2 className="flex items-center gap-3 text-4xl font-black">

            <Tv className="text-[#FFD464]" />

            TV Credits

          </h2>

          <p className="mt-2 text-zinc-400">
            Complete television appearances
          </p>

        </div>

        <div className="flex flex-col gap-4 md:flex-row">

          {/* Search */}

          <div className="relative">

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-zinc-500
              "
            />

            <input
              type="text"
              placeholder="Search TV shows..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                rounded-full
                border
                border-white/10
                bg-white/5
                py-3
                pl-11
                pr-5
                backdrop-blur-xl
                outline-none
              "
            />

          </div>

          {/* Sort */}

          <div className="relative">

            <ArrowUpDown
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-zinc-500
              "
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
                backdrop-blur-xl
                outline-none
              "
            >
              <option value="year">
                First Air Date
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
          title="TV Shows"
          value={shows.length}
        />

        <Stat
          title="Average Rating"
          value={average}
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

        {shows
          .slice(0, visible)
          .map((show) => (

            <CreditCard
              key={show.id}
              item={{
                ...show,
                media_type: "tv",
              }}
              onClick={onTVClick}
            />

          ))}

      </motion.div>

      {/* Empty */}

      {shows.length === 0 && (

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
            size={48}
            className="
              mx-auto
              mb-5
              text-zinc-500
            "
          />

          <h3 className="text-2xl font-bold">
            No TV Shows Found
          </h3>

          <p className="mt-2 text-zinc-400">
            Try a different search term.
          </p>

        </div>

      )}

      {/* Load More */}

      {visible < shows.length && (

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

/* -------------------------- */

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