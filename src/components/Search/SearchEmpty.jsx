import { motion } from "framer-motion";
import {
  Search,
  Film,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const SUGGESTIONS = [
  "Avengers",
  "Interstellar",
  "Breaking Bad",
  "Batman",
  "Spider-Man",
  "Oppenheimer",
];

export default function SearchEmpty({
  query = "",
  onSuggestionClick,
}) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-[40px]
        border
        border-white/10
        bg-white/5
        px-8
        py-20
        text-center
        backdrop-blur-3xl
      "
    >
      {/* Animated Icon */}

      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="
          mb-8
          flex
          h-32
          w-32
          items-center
          justify-center
          rounded-full
          bg-[#FFD464]/15
        "
      >
        <Search
          size={60}
          className="text-[#FFD464]"
        />
      </motion.div>

      {/* Title */}

      <motion.h2
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: .2,
        }}
        className="
          text-5xl
          font-black
        "
      >
        No Results Found
      </motion.h2>

      {/* Subtitle */}

      <p
        className="
          mt-6
          max-w-2xl
          text-lg
          leading-8
          text-zinc-400
        "
      >
        {query
          ? `We couldn't find anything matching "${query}".`
          : "Try searching for your favorite movie, TV show or actor."}
      </p>

      {/* Decorative Icons */}

      <div className="mt-10 flex items-center gap-8 text-zinc-500">

        <Film size={26} />

        <Sparkles size={26} />

        <TrendingUp size={26} />

      </div>

      {/* Suggestions */}

      <div className="mt-16">

        <h3 className="mb-6 text-xl font-bold">
          Popular Searches
        </h3>

        <div className="flex flex-wrap justify-center gap-4">

          {SUGGESTIONS.map((item) => (

            <motion.button
              key={item}
              whileHover={{
                y: -4,
                scale: 1.05,
              }}
              whileTap={{
                scale: .95,
              }}
              onClick={() =>
                onSuggestionClick?.(item)
              }
              className="
                rounded-full
                border
                border-white/10
                bg-black/20
                px-6
                py-3
                transition
                hover:border-[#FFD464]/40
                hover:bg-[#FFD464]/10
              "
            >
              {item}
            </motion.button>

          ))}

        </div>

      </div>

      {/* Bottom Hint */}

      <div
        className="
          mt-16
          rounded-full
          border
          border-white/10
          bg-black/20
          px-6
          py-3
          text-sm
          text-zinc-500
        "
      >
        💡 Tip: Try searching by movie title, actor, director, or TV show.
      </div>
    </motion.section>
  );
}