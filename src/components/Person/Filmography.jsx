import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  Star,
  Film,
  Tv,
  ArrowUpDown,
  X,
  ChevronDown,
  ChevronUp,
  Mic2,
  UserRound,
  Sparkles,
  Clapperboard,
} from "lucide-react";

const POSTER_BASE = "https://image.tmdb.org/t/p/w342";
const FALLBACK_POSTER = "/poster.png";

/* ============================================================
   HELPERS
============================================================ */

const getTitle = (item) =>
  item?.title ||
  item?.name ||
  item?.original_title ||
  item?.original_name ||
  "Untitled";

const getDate = (item) =>
  item?.release_date ||
  item?.first_air_date ||
  item?.air_date ||
  "";

const getYear = (item) => {
  const date = getDate(item);
  return date ? date.slice(0, 4) : "—";
};

const getRatingValue = (item) => {
  const rating = Number(item?.vote_average);

  return Number.isFinite(rating) ? rating : 0;
};

const getRating = (item) => {
  const rating = getRatingValue(item);

  return rating > 0 ? rating.toFixed(1) : "—";
};

const getPopularity = (item) => {
  const popularity = Number(item?.popularity);

  return Number.isFinite(popularity) ? popularity : 0;
};

const getVoteCount = (item) => {
  const count = Number(item?.vote_count);

  return Number.isFinite(count) ? count : 0;
};

const getRole = (item) =>
  item?.character ||
  item?.role ||
  item?.job ||
  item?.department ||
  "Cast member";

const getMediaType = (item) => {
  if (item?.media_type === "tv") return "tv";
  if (item?.media_type === "movie") return "movie";

  if (
    item?.first_air_date ||
    item?.original_name ||
    item?.name
  ) {
    return "tv";
  }

  return "movie";
};

/* ============================================================
   ROLE CLASSIFICATION
============================================================ */

const normalizeText = (value) =>
  String(value || "")
    .trim()
    .toLowerCase();

const getRoleType = (item) => {
  const character = normalizeText(
    item?.character ||
      item?.role ||
      item?.job ||
      ""
  );

  const department = normalizeText(
    item?.department || ""
  );

  const job = normalizeText(item?.job || "");

  /* ----------------------------------------------------------
     Voice roles
  ---------------------------------------------------------- */

  const voiceKeywords = [
    "voice",
    "voice of",
    "voiced",
    "narrator",
    "narration",
  ];

  if (
    voiceKeywords.some(
      (keyword) =>
        character.includes(keyword) ||
        job.includes(keyword)
    )
  ) {
    return "voice";
  }

  /* ----------------------------------------------------------
     Cameos
  ---------------------------------------------------------- */

  const cameoKeywords = [
    "cameo",
    "self",
    "himself",
    "herself",
    "himself as",
    "herself as",
  ];

  if (
    cameoKeywords.some(
      (keyword) =>
        character === keyword ||
        character.includes(keyword)
    )
  ) {
    return "cameo";
  }

  /* ----------------------------------------------------------
     Crew jobs
  ---------------------------------------------------------- */

  if (
    department &&
    department !== "acting" &&
    !item?.character
  ) {
    return "supporting";
  }

  /* ----------------------------------------------------------
     TMDB billing/order
  ---------------------------------------------------------- */

  const order = Number(item?.order);

  if (Number.isFinite(order)) {
    if (order <= 2) return "lead";
    if (order <= 8) return "supporting";
  }

  /* ----------------------------------------------------------
     Additional billing hints
  ---------------------------------------------------------- */

  const billing = normalizeText(
    item?.billing ||
      item?.billing_type ||
      item?.credit_type ||
      ""
  );

  if (
    billing.includes("lead") ||
    billing.includes("main")
  ) {
    return "lead";
  }

  if (
    billing.includes("support") ||
    billing.includes("supporting")
  ) {
    return "supporting";
  }

  /* ----------------------------------------------------------
     Character exists but no reliable billing information
  ---------------------------------------------------------- */

  if (item?.character) {
    return "supporting";
  }

  return "supporting";
};

/* ============================================================
   ROLE CONFIG
============================================================ */

const ROLE_CONFIG = {
  all: {
    label: "All roles",
    icon: UserRound,
  },

  lead: {
    label: "Lead",
    icon: Sparkles,
  },

  supporting: {
    label: "Supporting",
    icon: UserRound,
  },

  voice: {
    label: "Voice",
    icon: Mic2,
  },

  cameo: {
    label: "Cameo",
    icon: Clapperboard,
  },
};

/* ============================================================
   BOX OFFICE
============================================================ */

const getBoxOffice = (item) => {
  const possibleValues = [
    item?.revenue,
    item?.box_office,
    item?.boxOffice,
    item?.gross,
    item?.worldwide_gross,
    item?.worldwideGross,
  ];

  for (const value of possibleValues) {
    const numericValue = Number(value);

    if (
      Number.isFinite(numericValue) &&
      numericValue > 0
    ) {
      return numericValue;
    }
  }

  return 0;
};

const formatBoxOffice = (value) => {
  if (!value || value <= 0) {
    return "Box office N/A";
  }

  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }

  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`;
  }

  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }

  return `$${value.toLocaleString()}`;
};

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function Filmography({
  credits = [],
  onSelect,
  onMovieClick,
}) {
  const [search, setSearch] = useState("");
  const [media, setMedia] = useState("all");
  const [sort, setSort] = useState("newest");
  const [roleType, setRoleType] = useState("all");
  const [expanded, setExpanded] = useState(null);

  /* ----------------------------------------------------------
     Safe credits array
  ---------------------------------------------------------- */

  const safeCredits = useMemo(
    () => (Array.isArray(credits) ? credits : []),
    [credits]
  );

  /* ==========================================================
     NAVIGATION
  ========================================================== */

  const handleSelect = (id, type) => {
    if (!id) return;

    if (typeof onSelect === "function") {
      onSelect(id, type);
      return;
    }

    if (typeof onMovieClick === "function") {
      onMovieClick(id, type);
    }
  };

  /* ==========================================================
     FILTER + SORT
  ========================================================== */

  const filtered = useMemo(() => {
    let data = [...safeCredits];

    /* --------------------------------------------------------
       Search
    -------------------------------------------------------- */

    const query = search.trim().toLowerCase();

    if (query) {
      data = data.filter((item) => {
        const title = getTitle(item).toLowerCase();

        const role = getRole(item).toLowerCase();

        const originalTitle = String(
          item?.original_title ||
            item?.original_name ||
            ""
        ).toLowerCase();

        return (
          title.includes(query) ||
          role.includes(query) ||
          originalTitle.includes(query)
        );
      });
    }

    /* --------------------------------------------------------
       Media type
    -------------------------------------------------------- */

    if (media !== "all") {
      data = data.filter(
        (item) => getMediaType(item) === media
      );
    }

    /* --------------------------------------------------------
       Role type
    -------------------------------------------------------- */

    if (roleType !== "all") {
      data = data.filter(
        (item) => getRoleType(item) === roleType
      );
    }

    /* --------------------------------------------------------
       Sort
    -------------------------------------------------------- */

    data.sort((a, b) => {
      const dateA = getDate(a);
      const dateB = getDate(b);

      switch (sort) {
        case "rating":
          return (
            getRatingValue(b) -
            getRatingValue(a)
          );

        case "boxOffice":
          return (
            getBoxOffice(b) -
            getBoxOffice(a)
          );

        case "popularity":
          return (
            getPopularity(b) -
            getPopularity(a)
          );

        case "oldest":
          if (!dateA && !dateB) return 0;
          if (!dateA) return 1;
          if (!dateB) return -1;

          return dateA.localeCompare(dateB);

        case "newest":
        default:
          if (!dateA && !dateB) return 0;
          if (!dateA) return 1;
          if (!dateB) return -1;

          return dateB.localeCompare(dateA);
      }
    });

    return data;
  }, [
    safeCredits,
    search,
    media,
    sort,
    roleType,
  ]);

  /* ==========================================================
     COUNTS
  ========================================================== */

  const movieCount = useMemo(
    () =>
      safeCredits.filter(
        (item) => getMediaType(item) === "movie"
      ).length,
    [safeCredits]
  );

  const tvCount = useMemo(
    () =>
      safeCredits.filter(
        (item) => getMediaType(item) === "tv"
      ).length,
    [safeCredits]
  );

  const roleCounts = useMemo(() => {
    const counts = {
      lead: 0,
      supporting: 0,
      voice: 0,
      cameo: 0,
    };

    safeCredits.forEach((item) => {
      const type = getRoleType(item);

      if (counts[type] !== undefined) {
        counts[type] += 1;
      }
    });

    return counts;
  }, [safeCredits]);

  /* ==========================================================
     CLEAR FILTERS
  ========================================================== */

  const clearFilters = () => {
    setSearch("");
    setMedia("all");
    setSort("newest");
    setRoleType("all");
    setExpanded(null);
  };

  const hasFilters =
    Boolean(search) ||
    media !== "all" ||
    sort !== "newest" ||
    roleType !== "all";

  /* ==========================================================
     IMAGE
  ========================================================== */

  const getPoster = (item) => {
    if (item?.poster_path) {
      return `${POSTER_BASE}${item.poster_path}`;
    }

    if (item?.profile_path) {
      return `${POSTER_BASE}${item.profile_path}`;
    }

    return FALLBACK_POSTER;
  };

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <section className="space-y-8">
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FFD464]">
            CAREER
          </span>

          <h2 className="mt-2 text-4xl font-black tracking-tight text-white md:text-5xl">
            Filmography
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-400">
            Explore every movie and TV appearance,
            filter by role type, and discover the
            strongest performances across the career.
          </p>
        </div>

        {/* Counts */}

        <div className="flex flex-wrap items-center gap-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3">
            <div className="flex items-center gap-2">
              <Film
                size={15}
                className="text-[#FFD464]"
              />

              <span className="text-sm font-bold text-white">
                {movieCount}
              </span>

              <span className="text-xs text-zinc-500">
                Movies
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3">
            <div className="flex items-center gap-2">
              <Tv
                size={15}
                className="text-[#FFD464]"
              />

              <span className="text-sm font-bold text-white">
                {tvCount}
              </span>

              <span className="text-xs text-zinc-500">
                TV
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ======================================================
          ROLE CHIPS
      ====================================================== */}

      <div className="flex flex-wrap gap-2">
        {Object.entries(ROLE_CONFIG).map(
          ([key, config]) => {
            const Icon = config.icon;

            const active = roleType === key;

            const count =
              key === "all"
                ? safeCredits.length
                : roleCounts[key];

            return (
              <button
                key={key}
                type="button"
                onClick={() => setRoleType(key)}
                className={`
                  group
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  px-3.5
                  py-2
                  text-xs
                  font-bold
                  transition-all
                  ${
                    active
                      ? "border-[#FFD464]/40 bg-[#FFD464]/10 text-[#FFD464]"
                      : "border-white/10 bg-white/[0.025] text-zinc-500 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                  }
                `}
              >
                <Icon size={13} />

                <span>{config.label}</span>

                <span
                  className={`
                    rounded-full
                    px-1.5
                    py-0.5
                    text-[9px]
                    ${
                      active
                        ? "bg-[#FFD464]/10 text-[#FFD464]"
                        : "bg-white/5 text-zinc-600"
                    }
                  `}
                >
                  {count}
                </span>
              </button>
            );
          }
        )}
      </div>

      {/* ======================================================
          FILTER BAR
      ====================================================== */}

      <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-3">
        <div className="flex flex-col gap-3 xl:flex-row">
          {/* Search */}

          <div className="flex min-h-[48px] flex-1 items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4">
            <Search
              size={18}
              className="shrink-0 text-zinc-500"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search movies, shows or roles..."
              className="
                w-full
                bg-transparent
                text-sm
                text-white
                outline-none
                placeholder:text-zinc-600
              "
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-zinc-500 transition hover:text-white"
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Media */}

          <div className="relative">
            <select
              value={media}
              onChange={(event) =>
                setMedia(event.target.value)
              }
              className="
                h-12
                min-w-[145px]
                appearance-none
                rounded-xl
                border
                border-white/10
                bg-black/20
                px-4
                pr-10
                text-sm
                font-semibold
                text-white
                outline-none
              "
            >
              <option
                value="all"
                className="bg-[#111217]"
              >
                All titles
              </option>

              <option
                value="movie"
                className="bg-[#111217]"
              >
                Movies
              </option>

              <option
                value="tv"
                className="bg-[#111217]"
              >
                TV Shows
              </option>
            </select>

            <ChevronDown
              size={15}
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-zinc-500
              "
            />
          </div>

          {/* Sort */}

          <div className="relative">
            <ArrowUpDown
              size={15}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-zinc-500
              "
            />

            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value)
              }
              className="
                h-12
                min-w-[185px]
                appearance-none
                rounded-xl
                border
                border-white/10
                bg-black/20
                pl-10
                pr-9
                text-sm
                font-semibold
                text-white
                outline-none
              "
            >
              <option
                value="newest"
                className="bg-[#111217]"
              >
                Chronological · Newest
              </option>

              <option
                value="oldest"
                className="bg-[#111217]"
              >
                Chronological · Oldest
              </option>

              <option
                value="rating"
                className="bg-[#111217]"
              >
                Highest Rated
              </option>

              <option
                value="boxOffice"
                className="bg-[#111217]"
              >
                Box Office
              </option>

              <option
                value="popularity"
                className="bg-[#111217]"
              >
                Most Popular
              </option>
            </select>

            <ChevronDown
              size={15}
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-zinc-500
              "
            />
          </div>
        </div>

        {/* Active filters */}

        {hasFilters && (
          <div className="mt-3 flex flex-col gap-2 border-t border-white/5 pt-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-zinc-500">
              Showing{" "}
              <strong className="text-zinc-300">
                {filtered.length}
              </strong>{" "}
              of{" "}
              <strong className="text-zinc-300">
                {safeCredits.length}
              </strong>{" "}
              titles
            </span>

            <button
              type="button"
              onClick={clearFilters}
              className="
                self-start
                text-xs
                font-semibold
                text-[#FFD464]
                transition
                hover:text-white
                sm:self-auto
              "
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* ======================================================
          RESULTS
      ====================================================== */}

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5">
            <Search
              size={20}
              className="text-zinc-500"
            />
          </div>

          <h3 className="mt-4 text-lg font-bold text-white">
            No titles found
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500">
            Try another search, media type, or role
            filter.
          </p>

          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="
                mt-5
                rounded-lg
                bg-white
                px-4
                py-2
                text-xs
                font-bold
                text-black
                transition
                hover:bg-[#FFD464]
              "
            >
              Reset filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => {
              const title = getTitle(item);
              const year = getYear(item);
              const rating = getRating(item);
              const role = getRole(item);
              const type = getMediaType(item);
              const roleCategory = getRoleType(item);
              const boxOffice = getBoxOffice(item);

              const isMovie = type === "movie";

              const key = `${type}-${item?.id ?? index}`;

              const isExpanded = expanded === key;

              const roleLabel =
                ROLE_CONFIG[roleCategory]?.label ||
                "Supporting";

              return (
                <motion.article
                  key={key}
                  layout
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -10,
                  }}
                  transition={{
                    duration: 0.25,
                    delay: Math.min(
                      index * 0.025,
                      0.2
                    ),
                  }}
                  className="
                    group
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.025]
                    transition-colors
                    hover:border-white/15
                    hover:bg-white/[0.04]
                  "
                >
                  {/* ==================================================
                      MAIN CARD
                  ================================================== */}

                  <div className="flex gap-4 p-3">
                    {/* Poster */}

                    <button
                      type="button"
                      onClick={() =>
                        handleSelect(item?.id, type)
                      }
                      className="
                        relative
                        h-[150px]
                        w-[100px]
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        bg-zinc-900
                      "
                      aria-label={`Open ${title}`}
                    >
                      <img
                        src={getPoster(item)}
                        alt={title}
                        loading="lazy"
                        className="
                          h-full
                          w-full
                          object-cover
                          transition
                          duration-500
                          group-hover:scale-105
                        "
                        onError={(event) => {
                          if (
                            event.currentTarget.src.endsWith(
                              FALLBACK_POSTER
                            )
                          ) {
                            return;
                          }

                          event.currentTarget.src =
                            FALLBACK_POSTER;
                        }}
                      />

                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/70
                          via-transparent
                          to-transparent
                          opacity-0
                          transition
                          group-hover:opacity-100
                        "
                      />

                      {/* Role badge */}

                      <span
                        className="
                          absolute
                          bottom-2
                          left-2
                          rounded-full
                          border
                          border-white/10
                          bg-black/70
                          px-2
                          py-1
                          text-[8px]
                          font-black
                          uppercase
                          tracking-wider
                          text-white
                          backdrop-blur-md
                        "
                      >
                        {roleLabel}
                      </span>
                    </button>

                    {/* Info */}

                    <div className="min-w-0 flex-1 py-1">
                      <div className="flex items-start justify-between gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleSelect(item?.id, type)
                          }
                          className="min-w-0 text-left"
                        >
                          <h3
                            className="
                              line-clamp-2
                              text-base
                              font-bold
                              leading-6
                              text-white
                              transition
                              hover:text-[#FFD464]
                            "
                          >
                            {title}
                          </h3>
                        </button>

                        <span
                          className="
                            shrink-0
                            rounded-full
                            border
                            border-white/10
                            bg-white/5
                            px-2
                            py-1
                            text-[9px]
                            font-black
                            uppercase
                            tracking-wider
                            text-zinc-400
                          "
                        >
                          {isMovie ? "Movie" : "TV"}
                        </span>
                      </div>

                      {/* Meta */}

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-zinc-500">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          {year}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <Star
                            size={13}
                            className="text-[#FFD464]"
                            fill="currentColor"
                          />

                          <span className="text-zinc-300">
                            {rating}
                          </span>
                        </span>

                        {boxOffice > 0 && (
                          <span className="text-zinc-500">
                            {formatBoxOffice(boxOffice)}
                          </span>
                        )}
                      </div>

                      {/* Role */}

                      <div className="mt-3 flex items-start gap-2">
                        {isMovie ? (
                          <Film
                            size={14}
                            className="mt-0.5 shrink-0 text-zinc-600"
                          />
                        ) : (
                          <Tv
                            size={14}
                            className="mt-0.5 shrink-0 text-zinc-600"
                          />
                        )}

                        <div className="min-w-0">
                          <p className="line-clamp-2 text-xs text-zinc-400">
                            {role}
                          </p>

                          <span className="mt-1 inline-block text-[9px] font-bold uppercase tracking-wider text-zinc-600">
                            {roleLabel} role
                          </span>
                        </div>
                      </div>

                      {/* Expand */}

                      <button
                        type="button"
                        onClick={() =>
                          setExpanded(
                            isExpanded ? null : key
                          )
                        }
                        className="
                          mt-4
                          flex
                          items-center
                          gap-1.5
                          text-[11px]
                          font-bold
                          text-zinc-500
                          transition
                          hover:text-white
                        "
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? "Less" : "More"}

                        {isExpanded ? (
                          <ChevronUp size={13} />
                        ) : (
                          <ChevronDown size={13} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* ==================================================
                      EXPANDED INFO
                  ================================================== */}

                  <AnimatePresence>
                    {isExpanded && (
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
                        <div className="border-t border-white/5 px-4 pb-4 pt-3">
                          {/* Overview */}

                          <p className="text-sm leading-6 text-zinc-400">
                            {item?.overview ||
                              "No overview available for this title."}
                          </p>

                          {/* Details */}

                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="rounded-lg bg-white/5 px-2.5 py-1.5 text-[10px] text-zinc-500">
                              Role:{" "}
                              <strong className="text-zinc-300">
                                {role}
                              </strong>
                            </span>

                            <span className="rounded-lg bg-white/5 px-2.5 py-1.5 text-[10px] text-zinc-500">
                              Type:{" "}
                              <strong className="text-zinc-300">
                                {roleLabel}
                              </strong>
                            </span>

                            {item?.original_title &&
                              item.original_title !==
                                title && (
                                <span className="rounded-lg bg-white/5 px-2.5 py-1.5 text-[10px] text-zinc-500">
                                  Original:{" "}
                                  <strong className="text-zinc-300">
                                    {item.original_title}
                                  </strong>
                                </span>
                              )}

                            {item?.original_name &&
                              item.original_name !==
                                title && (
                                <span className="rounded-lg bg-white/5 px-2.5 py-1.5 text-[10px] text-zinc-500">
                                  Original:{" "}
                                  <strong className="text-zinc-300">
                                    {item.original_name}
                                  </strong>
                                </span>
                              )}

                            {getVoteCount(item) > 0 && (
                              <span className="rounded-lg bg-white/5 px-2.5 py-1.5 text-[10px] text-zinc-500">
                                {getVoteCount(
                                  item
                                ).toLocaleString()}{" "}
                                votes
                              </span>
                            )}

                            {getPopularity(item) > 0 && (
                              <span className="rounded-lg bg-white/5 px-2.5 py-1.5 text-[10px] text-zinc-500">
                                Popularity{" "}
                                <strong className="text-zinc-300">
                                  {getPopularity(
                                    item
                                  ).toFixed(1)}
                                </strong>
                              </span>
                            )}

                            {boxOffice > 0 && (
                              <span className="rounded-lg bg-[#FFD464]/10 px-2.5 py-1.5 text-[10px] text-[#FFD464]">
                                {formatBoxOffice(
                                  boxOffice
                                )}
                              </span>
                            )}
                          </div>

                          {/* Actions */}

                          <div className="mt-4 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handleSelect(
                                  item?.id,
                                  type
                                )
                              }
                              className="
                                rounded-lg
                                bg-white
                                px-3
                                py-2
                                text-xs
                                font-bold
                                text-black
                                transition
                                hover:bg-[#FFD464]
                              "
                            >
                              View title
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                setRoleType(roleCategory)
                              }
                              className="
                                rounded-lg
                                border
                                border-white/10
                                bg-white/5
                                px-3
                                py-2
                                text-xs
                                font-bold
                                text-zinc-300
                                transition
                                hover:border-[#FFD464]/30
                                hover:text-[#FFD464]
                              "
                            >
                              Show similar roles
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* ======================================================
          FOOTER
      ====================================================== */}

      {filtered.length > 0 && (
        <div className="flex flex-col items-center justify-center gap-1 pt-2">
          <span className="text-xs text-zinc-600">
            Showing {filtered.length}{" "}
            {filtered.length === 1
              ? "title"
              : "titles"}
          </span>

          {sort === "boxOffice" && (
            <span className="text-[10px] text-zinc-700">
              Box-office sorting uses revenue data when
              available.
            </span>
          )}
        </div>
      )}
    </section>
  );
}