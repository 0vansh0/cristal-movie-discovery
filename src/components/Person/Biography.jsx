import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

export default function Biography({ person }) {
  const [expanded, setExpanded] = useState(false);

  /* =========================================================
     EMPTY STATE
  ========================================================= */

  /* =========================================================
     BIOGRAPHY
  ========================================================= */

  const biography =
    typeof person?.biography === "string" &&
    person.biography.trim()
      ? person.biography.trim()
      : "No biography available for this person.";

  /* =========================================================
     COLLAPSE
  ========================================================= */

  const MAX_LENGTH = 900;

  const shouldCollapse =
    biography.length > MAX_LENGTH;

  const displayText =
    expanded || !shouldCollapse
      ? biography
      : `${biography.slice(0, MAX_LENGTH).trim()}...`;

  /* =========================================================
     WORD COUNT
  ========================================================= */

  const wordCount = useMemo(() => {
    return biography
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .length;
  }, [biography]);

  /* =========================================================
     PARAGRAPHS
  ========================================================= */

  const paragraphs = useMemo(() => {
    return displayText
      .split(/\n+/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }, [displayText]);

  if (!person) {
    return null;
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section className="space-y-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center gap-4">

        <div
          className="
            flex
            h-16
            w-16
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-[#FFD464]/20
            bg-[#FFD464]/10
            text-[#FFD464]
          "
        >
          <BookOpen size={28} />
        </div>

        <div>
          <h2 className="text-4xl font-black tracking-tight">
            Biography
          </h2>

          <p className="mt-2 text-zinc-400">
            Learn more about their life,
            career, and journey.
          </p>
        </div>

      </div>

      {/* =====================================================
          BIOGRAPHY CARD
      ===================================================== */}

      <motion.div
        layout
        className="
          relative
          overflow-hidden
          rounded-[34px]
          border
          border-white/10
          bg-white/[0.045]
          p-7
          sm:p-10
          backdrop-blur-3xl
        "
      >

        {/* Background glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-[#FFD464]/10
            blur-[120px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -left-20
            h-64
            w-64
            rounded-full
            bg-purple-500/5
            blur-[110px]
          "
        />

        {/* Decorative quote */}

        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            left-6
            top-[-8px]
            select-none
            text-[120px]
            font-black
            leading-none
            text-white/[0.035]
          "
        >
          "
        </span>

        {/* Biography */}

        <AnimatePresence mode="wait">
          <motion.div
            key={expanded ? "expanded" : "collapsed"}
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            className="relative"
          >

            <div
              className="
                space-y-5
                text-base
                leading-8
                text-zinc-300
                sm:text-lg
                sm:leading-9
              "
            >
              {paragraphs.map(
                (paragraph, index) => (
                  <p key={index}>
                    {paragraph}
                  </p>
                )
              )}
            </div>

          </motion.div>
        </AnimatePresence>

        {/* Read More */}

        {shouldCollapse && (
          <motion.button
            type="button"
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() =>
              setExpanded(
                (current) => !current
              )
            }
            className="
              mt-10
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-[#FFD464]
              px-6
              py-3
              font-bold
              text-black
              transition
              hover:bg-[#ffe08a]
            "
          >
            <span>
              {expanded
                ? "Read Less"
                : "Read More"}
            </span>

            {expanded ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </motion.button>
        )}

      </motion.div>

      {/* =====================================================
          QUICK INSIGHT
      ===================================================== */}

      <motion.div
        whileHover={{
          y: -4,
        }}
        transition={{
          duration: 0.2,
        }}
        className="
          relative
          overflow-hidden
          rounded-[28px]
          border
          border-[#FFD464]/15
          bg-[#FFD464]/[0.06]
          p-6
        "
      >

        {/* Glow */}

        <div
          className="
            pointer-events-none
            absolute
            -right-16
            -top-16
            h-40
            w-40
            rounded-full
            bg-[#FFD464]/10
            blur-[70px]
          "
        />

        <div className="relative flex items-start gap-4">

          <div
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#FFD464]/10
              text-[#FFD464]
            "
          >
            <Sparkles size={20} />
          </div>

          <div>

            <h3 className="font-bold">
              Quick Insight
            </h3>

            <p className="mt-2 leading-7 text-zinc-300">

              This biography contains{" "}

              <span className="font-bold text-[#FFD464]">
                {wordCount}
              </span>{" "}

              words and provides an overview
              of the person's life, career,
              achievements, and background.

            </p>

          </div>

        </div>

      </motion.div>

    </section>
  );
}