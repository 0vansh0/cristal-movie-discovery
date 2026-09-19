import { motion } from "framer-motion";
import {
  LayoutGrid,
  Rows3,
} from "lucide-react";

export default function WatchlistViewToggle({
  view,
  setView,
}) {
  return (
    <div
      className="
        flex
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
      "
    >
      {/* Grid */}

      <motion.button
        whileTap={{
          scale: .95,
        }}
        whileHover={{
          scale: 1.05,
        }}
        onClick={() => setView("grid")}
        className={`
          relative
          flex
          h-14
          w-14
          items-center
          justify-center
          transition-all
          ${
            view === "grid"
              ? "text-black"
              : "text-white"
          }
        `}
      >
        {view === "grid" && (

          <motion.div
            layoutId="view-toggle"
            className="
              absolute
              inset-1
              rounded-xl
              bg-gradient-to-r
              from-[#FF5E5E]
              via-[#FFB84D]
              to-[#FFD464]
            "
          />

        )}

        <LayoutGrid
          size={20}
          className="relative z-10"
        />
      </motion.button>

      {/* List */}

      <motion.button
        whileTap={{
          scale: .95,
        }}
        whileHover={{
          scale: 1.05,
        }}
        onClick={() => setView("list")}
        className={`
          relative
          flex
          h-14
          w-14
          items-center
          justify-center
          transition-all
          ${
            view === "list"
              ? "text-black"
              : "text-white"
          }
        `}
      >
        {view === "list" && (

          <motion.div
            layoutId="view-toggle"
            className="
              absolute
              inset-1
              rounded-xl
              bg-gradient-to-r
              from-[#FF5E5E]
              via-[#FFB84D]
              to-[#FFD464]
            "
          />

        )}

        <Rows3
          size={20}
          className="relative z-10"
        />
      </motion.button>
    </div>
  );
}