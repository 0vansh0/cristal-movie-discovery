import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Grid2X2,
  List,
  LayoutGrid,
} from "lucide-react";

const VIEWS = [
  {
    id: "grid",
    label: "Grid",
    icon: Grid2X2,
  },
  {
    id: "list",
    label: "List",
    icon: List,
  },
  {
    id: "compact",
    label: "Compact",
    icon: LayoutGrid,
  },
];

export default function SearchViewToggle({
  view = "grid",
  onChange,
}) {
  const activeIndex = useMemo(
    () =>
      VIEWS.findIndex(
        (item) => item.id === view
      ),
    [view]
  );

  return (
    <div
      className="
        inline-flex
        items-center
        rounded-full
        border
        border-white/10
        bg-white/5
        p-1
        backdrop-blur-3xl
      "
    >
      <div className="relative flex">

        {/* Sliding Indicator */}

        <motion.div
          layout
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 28,
          }}
          className="
            absolute
            left-1
            top-1
            h-[52px]
            rounded-full
            bg-[#FFD464]
          "
          style={{
            width: "110px",
            x: activeIndex * 110,
          }}
        />

        {VIEWS.map((item) => {
          const Icon = item.icon;

          const active =
            view === item.id;

          return (
            <motion.button
              key={item.id}
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={() =>
                onChange?.(item.id)
              }
              className={`
                relative
                z-10
                flex
                h-[54px]
                w-[110px]
                items-center
                justify-center
                gap-2
                rounded-full
                font-semibold
                transition

                ${
                  active
                    ? "text-black"
                    : "text-zinc-300 hover:text-white"
                }
              `}
            >
              <Icon size={18} />

              <span>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}