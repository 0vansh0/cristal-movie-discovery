import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Film,
  Tv,
  Star,
  ChevronDown,
  ChevronUp,
  Clapperboard,
  PenSquare,
  Briefcase,
  User,
} from "lucide-react";

const POSTER =
  "https://image.tmdb.org/t/p/w342";

function roleConfig(item) {
  if (item.character)
    return {
      label: "Actor",
      color:
        "bg-yellow-500/20 text-yellow-400",
      icon: User,
    };

  if (
    item.job?.includes("Director")
  )
    return {
      label: "Director",
      color:
        "bg-blue-500/20 text-blue-400",
      icon: Clapperboard,
    };

  if (
    item.job?.includes("Writer") ||
    item.job?.includes("Screenplay")
  )
    return {
      label: "Writer",
      color:
        "bg-emerald-500/20 text-emerald-400",
      icon: PenSquare,
    };

  if (
    item.job?.includes("Producer")
  )
    return {
      label: "Producer",
      color:
        "bg-pink-500/20 text-pink-400",
      icon: Briefcase,
    };

  return {
    label: item.job || "Crew",
    color:
      "bg-zinc-600/20 text-zinc-300",
    icon: Film,
  };
}

export default function CrewTimeline({
  credits = [],
  onSelect,
}) {
  const grouped = useMemo(() => {
    const sorted = [...credits].sort(
      (a, b) =>
        new Date(
          b.release_date ||
            b.first_air_date
        ) -
        new Date(
          a.release_date ||
            a.first_air_date
        )
    );

    return sorted.reduce(
      (acc, item) => {
        const year =
          (
            item.release_date ||
            item.first_air_date ||
            "Unknown"
          ).slice(0, 4) ||
          "Unknown";

        if (!acc[year])
          acc[year] = [];

        acc[year].push(item);

        return acc;
      },
      {}
    );
  }, [credits]);

  const [openYears, setOpenYears] =
    useState(
      Object.keys(grouped).slice(0, 3)
    );

  const toggleYear = (year) => {
    setOpenYears((prev) =>
      prev.includes(year)
        ? prev.filter(
            (y) => y !== year
          )
        : [...prev, year]
    );
  };

  return (
    <section className="space-y-10">

      <div>

        <h2 className="text-4xl font-black">
          Career Timeline
        </h2>

        <p className="mt-2 text-zinc-400">
          Journey through every
          credited project.
        </p>

      </div>

      <div className="relative">

        <div
          className="
            absolute
            left-7
            top-0
            bottom-0
            w-[2px]
            bg-white/10
          "
        />

        {Object.entries(grouped).map(
          ([year, items]) => (
            <div
              key={year}
              className="mb-8"
            >

              {/* Year */}

              <button
                onClick={() =>
                  toggleYear(year)
                }
                className="
                  mb-5
                  flex
                  items-center
                  gap-4
                "
              >

                <div
                  className="
                    z-10
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-full
                    bg-[#FFD464]
                    font-black
                    text-black
                  "
                >
                  {year}
                </div>

                <h3 className="text-2xl font-bold">
                  {items.length} Projects
                </h3>

                {openYears.includes(
                  year
                ) ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}

              </button>

              <AnimatePresence>

                {openYears.includes(
                  year
                ) && (

                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    className="ml-20 space-y-5"
                  >

                    {items.map(
                      (item) => {
                        const role =
                          roleConfig(
                            item
                          );

                        const Icon =
                          role.icon;

                        return (

                          <motion.div
                            key={`${item.media_type}-${item.id}`}
                            whileHover={{
                              x: 6,
                            }}
                            onClick={() =>
                              onSelect?.(
                                item.id,
                                item.media_type
                              )
                            }
                            className="
                              flex
                              cursor-pointer
                              gap-5
                              rounded-[26px]
                              border
                              border-white/10
                              bg-white/5
                              p-5
                            "
                          >

                            <img
                              src={
                                item.poster_path
                                  ? POSTER +
                                    item.poster_path
                                  : "/poster.png"
                              }
                              className="
                                h-32
                                w-24
                                rounded-xl
                                object-cover
                              "
                            />

                            <div className="flex-1">

                              <div className="flex items-center gap-3">

                                <h4 className="text-xl font-black">

                                  {item.title ||
                                    item.name}

                                </h4>

                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-bold ${role.color}`}
                                >
                                  <Icon
                                    size={
                                      14
                                    }
                                    className="mr-1 inline"
                                  />

                                  {
                                    role.label
                                  }

                                </span>

                              </div>

                              <div
                                className="
                                  mt-3
                                  flex
                                  flex-wrap
                                  gap-5
                                  text-zinc-400
                                "
                              >

                                <span className="flex items-center gap-2">
                                  <Calendar size={15} />

                                  {(
                                    item.release_date ||
                                    item.first_air_date
                                  )?.slice(
                                    0,
                                    10
                                  )}

                                </span>

                                <span className="flex items-center gap-2">
                                  <Star
                                    size={
                                      15
                                    }
                                  />

                                  {item.vote_average.toFixed(
                                    1
                                  )}

                                </span>

                                <span className="flex items-center gap-2">

                                  {item.media_type ===
                                  "movie" ? (
                                    <Film size={15} />
                                  ) : (
                                    <Tv size={15} />
                                  )}

                                  {
                                    item.media_type
                                  }

                                </span>

                              </div>

                              <p className="mt-4 line-clamp-2 text-zinc-300">

                                {item.overview ||
                                  "No overview available."}

                              </p>

                            </div>

                          </motion.div>

                        );
                      }
                    )}

                  </motion.div>

                )}

              </AnimatePresence>

            </div>
          )
        )}

      </div>

    </section>
  );
}