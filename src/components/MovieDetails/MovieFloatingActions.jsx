import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Heart,
  Bookmark,
  Star,
  Share2,
  Play,
  ArrowUp,
  Download,
} from "lucide-react";

export default function MovieFloatingActions({
  onFavorite,
  onBookmark,
  onRate,
  onShare,
  onTrailer,
  onDownload,
}) {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      icon: Heart,
      label: "Favorite",
      color: "text-red-400",
      onClick: onFavorite,
    },
    {
      icon: Bookmark,
      label: "Watchlist",
      color: "text-yellow-400",
      onClick: onBookmark,
    },
    {
      icon: Star,
      label: "Rate",
      color: "text-amber-400",
      onClick: onRate,
    },
    {
      icon: Share2,
      label: "Share",
      color: "text-sky-400",
      onClick: onShare,
    },
    {
      icon: Download,
      label: "Poster",
      color: "text-green-400",
      onClick: onDownload,
    },
    {
      icon: Play,
      label: "Trailer",
      color: "text-purple-400",
      onClick: onTrailer,
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 20,
            }}
            className="flex flex-col items-end gap-3"
          >

            {actions.map((action, index) => {

              const Icon = action.icon;

              return (

                <motion.button
                  key={action.label}
                  initial={{
                    opacity: 0,
                    x: 40,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 40,
                  }}
                  transition={{
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    scale: 1.08,
                    x: -5,
                  }}
                  whileTap={{
                    scale: 0.94,
                  }}
                  onClick={action.onClick}
                  className="
                    group
                    flex
                    items-center
                    gap-4
                  "
                >

                  <span
                    className="
                      rounded-full
                      border
                      border-white/10
                      bg-black/70
                      px-4
                      py-2
                      text-sm
                      opacity-0
                      transition
                      duration-300
                      group-hover:opacity-100
                    "
                  >
                    {action.label}
                  </span>

                  <div
                    className="
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-white/10
                      bg-white/10
                      backdrop-blur-3xl
                    "
                  >
                    <Icon
                      size={22}
                      className={action.color}
                    />
                  </div>

                </motion.button>

              );

            })}

            {/* Scroll To Top */}

            <motion.button
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.94,
              }}
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-[#FFD464]
                text-black
                shadow-xl
              "
            >
              <ArrowUp size={22} />
            </motion.button>

          </motion.div>

        )}

      </AnimatePresence>

      {/* Main FAB */}

      <motion.button
        whileHover={{
          rotate: 90,
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.92,
        }}
        onClick={() => setOpen(!open)}
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[#FFD464]
          text-black
          shadow-[0_15px_40px_rgba(255,212,100,.45)]
        "
      >
        <Plus
          size={30}
          className={open ? "rotate-45 transition" : "transition"}
        />
      </motion.button>

    </div>
  );
}