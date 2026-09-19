import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Trophy,
} from "lucide-react";

export default function Awards({ awards = [] }) {
  const [showAll, setShowAll] = useState(false);

  const normalizedAwards = useMemo(() => {
    if (!Array.isArray(awards)) return [];

    return awards
      .filter(Boolean)
      .map((award, index) => ({
        id:
          award.id ??
          award.award_id ??
          `${award.year ?? "unknown"}-${award.category ?? "award"}-${index}`,

        year:
          award.year ??
          award.date?.slice?.(0, 4) ??
          award.release_year ??
          null,

        name:
          award.name ??
          award.award_name ??
          award.title ??
          "Award",

        category:
          award.category ??
          award.nomination ??
          award.type ??
          "Recognition",

        result:
          award.result ??
          award.status ??
          (award.won === true ? "Won" : null),

        description:
          award.description ??
          award.note ??
          "",

        organization:
          award.organization ??
          award.issuer ??
          award.company ??
          "",

        url:
          award.url ??
          award.link ??
          null,
      }));
  }, [awards]);

  const visibleAwards = showAll
    ? normalizedAwards
    : normalizedAwards.slice(0, 6);

  /*
   * Group awards by year.
   */
  const groupedAwards = useMemo(() => {
    const groups = {};

    visibleAwards.forEach((award) => {
      const year = award.year || "Unknown";

      if (!groups[year]) {
        groups[year] = [];
      }

      groups[year].push(award);
    });

    return Object.entries(groups).sort(([a], [b]) => {
      if (a === "Unknown") return 1;
      if (b === "Unknown") return -1;

      return Number(b) - Number(a);
    });
  }, [visibleAwards]);

  if (!normalizedAwards.length) {
    return (
      <section className="person-awards-section">
        <div className="mb-6">
          <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#ffcf55]">
            Recognition
          </span>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-white">
            Awards & Nominations
          </h2>
        </div>

        <div
          className="
            rounded-3xl
            border border-white/10
            bg-white/[0.035]
            px-6 py-10
            text-center
            backdrop-blur-xl
          "
        >
          <div
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-[#ffcf55]/10
              text-[#ffcf55]
            "
          >
            <Trophy size={24} />
          </div>

          <h3 className="mt-5 text-lg font-bold text-white">
            Awards information unavailable
          </h3>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-zinc-500">
            Award and nomination information is not currently available for
            this person.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="person-awards-section">
      {/* Header */}
      <div className="mb-7 flex items-end justify-between gap-5">
        <div>
          <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#ffcf55]">
            Recognition
          </span>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-white">
            Awards & Nominations
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            Major awards and recognitions throughout the career.
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-zinc-400 sm:flex">
          <Award size={14} className="text-[#ffcf55]" />
          {normalizedAwards.length}{" "}
          {normalizedAwards.length === 1 ? "recognition" : "recognitions"}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute bottom-0 left-[19px] top-0 hidden w-px bg-white/10 sm:block" />

        <div className="space-y-5">
          {groupedAwards.map(([year, yearAwards]) => (
            <div key={year} className="relative">
              {/* Year */}
              <div className="mb-3 flex items-center gap-3">
                <div
                  className="
                    relative
                    z-10
                    flex
                    h-10
                    min-w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#ffcf55]/20
                    bg-[#ffcf55]/10
                    px-3
                    text-xs
                    font-black
                    text-[#ffcf55]
                  "
                >
                  {year}
                </div>

                <div className="h-px flex-1 bg-white/[0.06]" />
              </div>

              {/* Awards */}
              <div className="space-y-3 sm:ml-[54px]">
                <AnimatePresence mode="popLayout">
                  {yearAwards.map((award) => {
                    const isWon =
                      typeof award.result === "string" &&
                      /won|winner/i.test(award.result);

                    return (
                      <motion.article
                        key={award.id}
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
                        }}
                        className="
                          group
                          rounded-2xl
                          border
                          border-white/10
                          bg-white/[0.035]
                          p-5
                          transition-all
                          duration-300
                          hover:border-white/[0.16]
                          hover:bg-white/[0.055]
                        "
                      >
                        <div className="flex gap-4">
                          {/* Icon */}
                          <div
                            className="
                              hidden
                              h-11
                              w-11
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-[#ffcf55]/10
                              text-[#ffcf55]
                              sm:flex
                            "
                          >
                            <Award size={20} />
                          </div>

                          {/* Content */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-start justify-between gap-3">
                              <div>
                                <h3 className="text-base font-bold text-white">
                                  {award.name}
                                </h3>

                                {award.organization && (
                                  <p className="mt-1 text-xs text-zinc-500">
                                    {award.organization}
                                  </p>
                                )}
                              </div>

                              {award.result && (
                                <span
                                  className={`
                                    rounded-full
                                    px-2.5
                                    py-1
                                    text-[10px]
                                    font-black
                                    uppercase
                                    tracking-wide
                                    ${
                                      isWon
                                        ? "bg-emerald-400/10 text-emerald-400"
                                        : "bg-white/[0.06] text-zinc-400"
                                    }
                                  `}
                                >
                                  {award.result}
                                </span>
                              )}
                            </div>

                            {award.category && (
                              <p className="mt-3 text-sm font-medium text-zinc-300">
                                {award.category}
                              </p>
                            )}

                            {award.description && (
                              <p className="mt-2 text-sm leading-6 text-zinc-500">
                                {award.description}
                              </p>
                            )}

                            {award.url && (
                              <a
                                href={award.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(event) =>
                                  event.stopPropagation()
                                }
                                className="
                                  mt-4
                                  inline-flex
                                  items-center
                                  gap-1.5
                                  text-xs
                                  font-bold
                                  text-zinc-400
                                  transition
                                  hover:text-white
                                "
                              >
                                View source
                                <ExternalLink size={12} />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Show more */}
      {normalizedAwards.length > 6 && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((value) => !value)}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              px-5
              py-3
              text-xs
              font-bold
              text-zinc-300
              transition
              hover:border-white/20
              hover:bg-white/[0.08]
              hover:text-white
            "
          >
            {showAll ? (
              <>
                Show less
                <ChevronUp size={15} />
              </>
            ) : (
              <>
                Show all awards
                <ChevronDown size={15} />
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}