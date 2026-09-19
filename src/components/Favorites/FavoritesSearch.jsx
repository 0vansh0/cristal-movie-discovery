import { motion } from "framer-motion";
import {
  Search,
  Mic,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";

export default function FavoritesSearch({
  value = "",
  onChange = () => {},
}) {
  const [focused, setFocused] = useState(false);

  const recentSearches = [
    "Interstellar",
    "Christopher Nolan",
    "Sci-Fi",
    "Marvel",
    "Animation",
  ];

  return (
    <div className="relative w-full">

      {/* Search */}

      <motion.div
        animate={{
          scale: focused ? 1.01 : 1,
        }}
        className={`
          relative
          flex
          items-center
          overflow-hidden
          rounded-[22px]
          border
          transition-all
          duration-300
          ${
            focused
              ? "border-[#FFD464] bg-white/10 shadow-[0_0_35px_rgba(255,212,100,.15)]"
              : "border-white/10 bg-white/5"
          }
          backdrop-blur-3xl
        `}
      >

        {/* Search Icon */}

        <Search
          size={20}
          className="ml-5 text-zinc-400"
        />

        {/* Input */}

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() =>
            setTimeout(() => setFocused(false), 150)
          }
          placeholder="Search favorites..."
          className="
            h-16
            flex-1
            bg-transparent
            px-4
            outline-none
            placeholder:text-zinc-500
          "
        />

        {/* Shortcut */}

        <div
          className="
            hidden
            rounded-xl
            bg-white/5
            px-3
            py-1
            text-xs
            text-zinc-400
            md:block
          "
        >
          Ctrl + K
        </div>

        {/* Voice */}

        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            mx-2
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-white/5
          "
        >
          <Mic size={18} />
        </motion.button>

        {/* AI */}

        <motion.button
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            mr-3
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-r
            from-[#FF5E5E]
            via-[#FFB84D]
            to-[#FFD464]
            text-black
          "
        >
          <Sparkles size={18} />
        </motion.button>

      </motion.div>

      {/* Recent Searches */}

      {focused && (
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            absolute
            left-0
            right-0
            top-[72px]
            z-50
            rounded-[24px]
            border
            border-white/10
            bg-[#111827]/95
            p-5
            backdrop-blur-3xl
          "
        >
          <div className="mb-4 flex items-center justify-between">

            <h3 className="font-semibold">
              Recent Searches
            </h3>

            <button className="text-sm text-zinc-400 hover:text-white">
              Clear
            </button>

          </div>

          <div className="space-y-2">

            {recentSearches.map((item) => (

              <motion.button
                key={item}
                whileHover={{
                  x: 6,
                }}
                onClick={() => onChange(item)}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  px-4
                  py-3
                  transition
                  hover:bg-white/5
                "
              >

                <div className="flex items-center gap-3">

                  <Search
                    size={16}
                    className="text-zinc-500"
                  />

                  <span>{item}</span>

                </div>

                <X
                  size={16}
                  className="text-zinc-500"
                />

              </motion.button>

            ))}

          </div>

        </motion.div>
      )}

    </div>
  );
}