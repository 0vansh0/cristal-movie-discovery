import { motion } from "framer-motion";
import {
  ArrowUp,
  Shuffle,
  Plus,
  Grid3X3,
  Filter,
  BookmarkPlus,
  Sparkles,
} from "lucide-react";

const actions = [
  {
    icon: ArrowUp,
    label: "Top",
    onClick: () =>
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      }),
  },
  {
    icon: Shuffle,
    label: "Shuffle",
  },
  {
    icon: Plus,
    label: "Add",
  },
  {
    icon: BookmarkPlus,
    label: "Collection",
  },
  {
    icon: Grid3X3,
    label: "Grid",
  },
  {
    icon: Filter,
    label: "Filters",
  },
];

export default function WatchlistFloatingActions() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 80,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.5,
      }}
      className="
        fixed
        bottom-8
        left-1/2
        z-[999]
        -translate-x-1/2
      "
    >
      <div
        className="
          flex
          items-center
          gap-3
          rounded-full
          border
          border-white/10
          bg-black/40
          px-4
          py-3
          backdrop-blur-3xl
          shadow-[0_20px_80px_rgba(0,0,0,.45)]
        "
      >
        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.button
              key={item.label}
              whileHover={{
                scale: 1.18,
                y: -8,
              }}
              whileTap={{
                scale: 0.92,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              onClick={item.onClick}
              className="
                group
                relative
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-white/5
                transition
                hover:bg-gradient-to-br
                hover:from-[#FF5E5E]
                hover:via-[#FF9B5E]
                hover:to-[#FFD464]
                hover:text-black
              "
            >
              <Icon size={22} />

              {/* Tooltip */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -top-11
                  whitespace-nowrap
                  rounded-lg
                  bg-black/90
                  px-3
                  py-1
                  text-xs
                  opacity-0
                  transition
                  group-hover:opacity-100
                "
              >
                {item.label}
              </div>
            </motion.button>
          );
        })}

        {/* AI Button */}

        <motion.button
          whileHover={{
            scale: 1.12,
          }}
          whileTap={{
            scale: 0.95,
          }}
          className="
            ml-2
            flex
            items-center
            gap-2
            rounded-full
            bg-gradient-to-r
            from-[#FF5E5E]
            via-[#FF9B5E]
            to-[#FFD464]
            px-6
            py-4
            font-semibold
            text-black
          "
        >
          <Sparkles size={18} />

          AI Organize
        </motion.button>
      </div>
    </motion.div>
  );
}