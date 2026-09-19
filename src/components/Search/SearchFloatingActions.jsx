import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Mic,
  Shuffle,
  Search,
  SlidersHorizontal,
  Plus,
} from "lucide-react";

export default function SearchFloatingActions({
  onVoiceSearch,
  onRandomMovie,
  onFocusSearch,
  onOpenFilters,
}) {
  const [open, setOpen] = useState(false);

  const actions = [
    {
      icon: <ArrowUp size={20} />,
      label: "Top",
      color: "bg-sky-500",
      action: () =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        }),
    },
    {
      icon: <Mic size={20} />,
      label: "Voice",
      color: "bg-red-500",
      action: onVoiceSearch,
    },
    {
      icon: <Shuffle size={20} />,
      label: "Random",
      color: "bg-green-500",
      action: onRandomMovie,
    },
    {
      icon: <Search size={20} />,
      label: "Search",
      color: "bg-purple-500",
      action: onFocusSearch,
    },
    {
      icon: <SlidersHorizontal size={20} />,
      label: "Filters",
      color: "bg-orange-500",
      action: onOpenFilters,
    },
  ];

  return (
    <div
      className="
        fixed
        bottom-8
        right-8
        z-[90]
        flex
        flex-col
        items-end
        gap-4
      "
    >
      {/* Floating Actions */}

      <AnimatePresence>

        {open &&
          actions.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{
                opacity: 0,
                scale: .6,
                x: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                scale: .6,
                x: 30,
              }}
              transition={{
                delay: index * 0.05,
              }}
              whileHover={{
                scale: 1.08,
                x: -6,
              }}
              whileTap={{
                scale: .95,
              }}
              onClick={() => {
                item.action?.();
                setOpen(false);
              }}
              className="
                group
                flex
                items-center
                gap-4
              "
            >
              {/* Label */}

              <span
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-black/60
                  px-4
                  py-2
                  text-sm
                  text-white
                  opacity-0
                  backdrop-blur-xl
                  transition
                  group-hover:opacity-100
                "
              >
                {item.label}
              </span>

              {/* Icon */}

              <div
                className={`
                  ${item.color}
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  text-white
                  shadow-xl
                `}
              >
                {item.icon}
              </div>
            </motion.button>
          ))}

      </AnimatePresence>

      {/* Main FAB */}

      <motion.button
        whileHover={{
          scale: 1.08,
          rotate: 90,
        }}
        whileTap={{
          scale: .92,
        }}
        onClick={() =>
          setOpen(!open)
        }
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[#FFD464]
          text-black
          shadow-[0_15px_40px_rgba(255,212,100,.4)]
        "
      >
        <motion.div
          animate={{
            rotate: open ? 45 : 0,
          }}
        >
          <Plus size={28} />
        </motion.div>
      </motion.button>

    </div>
  );
}