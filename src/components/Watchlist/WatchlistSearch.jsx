import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Mic,
  Sparkles,
} from "lucide-react";

export default function WatchlistSearch({
  value,
  onChange,
}) {
  return (
    <div className="relative flex-1">

      {/* Search Icon */}

      <Search
        size={18}
        className="
          absolute
          left-5
          top-1/2
          -translate-y-1/2
          text-zinc-400
        "
      />

      {/* Input */}

      <motion.input
        whileFocus={{
          scale: 1.01,
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search movies, actors, genres..."
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-white/5
          py-4
          pl-14
          pr-28
          outline-none
          backdrop-blur-xl
          transition
          focus:border-[#FFD464]
          focus:bg-white/10
        "
      />

      {/* Right Icons */}

      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="
            rounded-full
            bg-white/5
            p-2
            hover:bg-white/10
          "
        >
          <Mic size={16} />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="
            rounded-full
            bg-gradient-to-r
            from-[#FF5E5E]
            via-[#FF9B5E]
            to-[#FFD464]
            p-2
            text-black
          "
        >
          <Sparkles size={16} />
        </motion.button>

        <AnimatePresence>

          {value && (

            <motion.button
              initial={{
                opacity: 0,
                scale: .5,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: .5,
              }}
              whileHover={{
                rotate: 90,
              }}
              onClick={() => onChange("")}
              className="
                rounded-full
                bg-white/5
                p-2
                hover:bg-red-500
              "
            >
              <X size={16} />
            </motion.button>

          )}

        </AnimatePresence>

      </div>

    </div>
  );
}