import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Film,
  Tv,
  User,
  Clock3,
  ArrowUpRight,
} from "lucide-react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w185";

export default function SearchSuggestions({
  suggestions = [],
  recentSearches = [],
  visible = false,
  onSelect,
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const items =
    suggestions.length > 0
      ? suggestions
      : recentSearches.map((item) => ({
          ...item,
          recent: true,
        }));

  useEffect(() => {
    if (!visible) return;

    const handleKey = (e) => {
      if (!items.length) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();

        setActiveIndex((prev) =>
          prev === items.length - 1 ? 0 : prev + 1
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();

        setActiveIndex((prev) =>
          prev === 0 ? items.length - 1 : prev - 1
        );
      }

      if (e.key === "Enter") {
        e.preventDefault();

        onSelect?.(items[activeIndex]);
      }
    };

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );
  }, [items, activeIndex, visible, onSelect]);

  const getIcon = (type) => {
    switch (type) {
      case "movie":
        return <Film size={18} />;

      case "tv":
        return <Tv size={18} />;

      case "person":
        return <User size={18} />;

      default:
        return <Search size={18} />;
    }
  };

  return (
    <AnimatePresence>
      {visible && items.length > 0 && (
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 10,
          }}
          transition={{
            duration: 0.25,
          }}
          className="
            absolute
            left-0
            right-0
            top-full
            z-50
            mt-4
            overflow-hidden
            rounded-[30px]
            border
            border-white/10
            bg-[#0E1117]/95
            shadow-[0_30px_80px_rgba(0,0,0,.45)]
            backdrop-blur-3xl
          "
        >
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-white/5
              px-6
              py-4
            "
          >
            <h3 className="font-bold">
              {suggestions.length
                ? "Suggestions"
                : "Recent Searches"}
            </h3>

            <span className="text-xs text-zinc-500">
              ↑ ↓ Enter
            </span>
          </div>

          {/* Items */}

          <div className="max-h-[420px] overflow-y-auto">
            {items.map((item, index) => {
              const title =
                item.title ||
                item.name ||
                "Unknown";

              const image =
                item.poster_path ||
                item.profile_path;

              return (
                <motion.button
                  key={`${item.id}-${index}`}
                  whileHover={{
                    x: 4,
                  }}
                  onClick={() =>
                    onSelect?.(item)
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    gap-4
                    px-6
                    py-4
                    text-left
                    transition

                    ${
                      activeIndex === index
                        ? "bg-white/10"
                        : "hover:bg-white/5"
                    }
                  `}
                >
                  {/* Image */}

                  <div
                    className="
                      h-16
                      w-12
                      overflow-hidden
                      rounded-xl
                      bg-zinc-800
                    "
                  >
                    {image ? (
                      <img
                        src={`${IMAGE_URL}${image}`}
                        alt={title}
                        className="
                          h-full
                          w-full
                          object-cover
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-full
                          items-center
                          justify-center
                        "
                      >
                        {getIcon(item.media_type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}

                  <div className="flex-1">
                    <h4 className="font-semibold">
                      {title}
                    </h4>

                    <div
                      className="
                        mt-1
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-zinc-400
                      "
                    >
                      {item.recent ? (
                        <>
                          <Clock3 size={14} />
                          Recent Search
                        </>
                      ) : (
                        <>
                          {getIcon(item.media_type)}

                          {item.media_type?.toUpperCase()}
                        </>
                      )}
                    </div>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="text-zinc-500"
                  />
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}