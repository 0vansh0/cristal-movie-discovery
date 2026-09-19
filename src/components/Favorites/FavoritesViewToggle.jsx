import { motion } from "framer-motion";
import {
  LayoutGrid,
  Rows3,
  Grid3X3,
} from "lucide-react";

const views = [
  {
    id: "grid",
    label: "Grid",
    icon: LayoutGrid,
  },
  {
    id: "list",
    label: "List",
    icon: Rows3,
  },
  {
    id: "masonry",
    label: "Masonry",
    icon: Grid3X3,
  },
];

export default function FavoritesViewToggle({
  view = "grid",
  onChange = () => {},
}) {
  return (
    <div
      className="
        relative
        flex
        items-center
        rounded-2xl
        border
        border-white/10
        bg-white/5
        p-1
        backdrop-blur-3xl
      "
    >
      {views.map((item) => {
        const Icon = item.icon;
        const active = view === item.id;

        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className="
              relative
              z-10
              flex
              items-center
              gap-2
              rounded-xl
              px-5
              py-3
              font-medium
              transition
            "
          >
            {active && (
              <motion.div
                layoutId="favorites-view-indicator"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 28,
                }}
                className="
                  absolute
                  inset-0
                  rounded-xl
                  bg-gradient-to-r
                  from-[#FF5E5E]
                  via-[#FFB84D]
                  to-[#FFD464]
                "
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              <Icon
                size={18}
                className={
                  active
                    ? "text-black"
                    : "text-zinc-400"
                }
              />

              <span
                className={
                  active
                    ? "text-black"
                    : "text-white"
                }
              >
                {item.label}
              </span>
            </span>

          </button>
        );
      })}
    </div>
  );
}