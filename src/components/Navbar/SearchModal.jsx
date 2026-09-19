import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  X,
  Clock3,
  TrendingUp,
} from "lucide-react";
import { useEffect } from "react";

const recentSearches = [
  "Interstellar",
  "Batman",
  "Dune",
  "Loki",
];

const trending = [
  "Superman",
  "Wednesday",
  "Stranger Things",
  "Avatar",
];

const SearchModal = ({ open, onClose }) => {

  useEffect(() => {

    const handleKey = (e) => {

      if (e.key === "Escape") {

        onClose();

      }

    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);

  }, [onClose]);

  if (!open) return null;

  return (

    <AnimatePresence>

      <motion.div

        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}

        className="fixed inset-0 z-[100] flex items-start justify-center pt-24"

      >

        {/* Overlay */}

        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-xl"
          onClick={onClose}
        />

        {/* Animated blobs */}

        <motion.div
          animate={{
            x: [-50, 60, -50],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
          }}
          className="
          absolute
          top-20
          left-20
          h-72
          w-72
          rounded-full
          bg-[#FF5E5E]/30
          blur-[140px]"
        />

        <motion.div
          animate={{
            x: [50, -70, 50],
            y: [0, -40, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
          }}
          className="
          absolute
          bottom-20
          right-20
          h-72
          w-72
          rounded-full
          bg-[#E23C64]/30
          blur-[160px]"
        />

        {/* Card */}

        <motion.div

          initial={{
            opacity:0,
            y:-20,
            scale:.96,
          }}

          animate={{
            opacity:1,
            y:0,
            scale:1,
          }}

          exit={{
            opacity:0,
            scale:.95,
          }}

          className="
          relative
          w-full
          max-w-2xl
          rounded-3xl
          border
          border-white/10
          bg-[#141418]/80
          backdrop-blur-2xl
          shadow-2xl
          overflow-hidden
          "

        >

          {/* Header */}

          <div className="flex items-center justify-between border-b border-white/10 p-6">

            <h2 className="text-2xl font-bold">
              Search
            </h2>

            <button
              onClick={onClose}
              className="rounded-xl p-2 hover:bg-white/10"
            >
              <X size={20}/>
            </button>

          </div>

          {/* Search */}

          <div className="p-6">

            <div
              className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-black/30
              px-4
              py-4"
            >

              <Search size={20}/>

              <input

                autoFocus

                placeholder="Search movies, TV shows, actors..."

                className="
                w-full
                bg-transparent
                outline-none
                placeholder:text-zinc-500
                "

              />

            </div>

          </div>

          {/* Recent */}

          <div className="px-6 pb-4">

            <div className="mb-3 flex items-center gap-2 text-zinc-400">

              <Clock3 size={16}/>

              Recent Searches

            </div>

            <div className="space-y-2">

              {recentSearches.map(movie=>(

                <button

                  key={movie}

                  className="
                  flex
                  w-full
                  items-center
                  rounded-xl
                  px-3
                  py-2
                  text-left
                  hover:bg-white/5"

                >

                  {movie}

                </button>

              ))}

            </div>

          </div>

          {/* Trending */}

          <div className="border-t border-white/10 px-6 py-5">

            <div className="mb-3 flex items-center gap-2 text-[#FFD464]">

              <TrendingUp size={16}/>

              Trending

            </div>

            <div className="flex flex-wrap gap-2">

              {trending.map(item=>(

                <button

                  key={item}

                  className="
                  rounded-full
                  bg-white/5
                  px-4
                  py-2
                  text-sm
                  hover:bg-[#FF5E5E]/20
                  hover:text-[#FF5E5E]
                  transition"

                >

                  {item}

                </button>

              ))}

            </div>

          </div>

        </motion.div>

      </motion.div>

    </AnimatePresence>

  );

};

export default SearchModal;