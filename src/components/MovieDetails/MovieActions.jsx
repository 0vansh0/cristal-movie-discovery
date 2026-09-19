import { motion } from "framer-motion";
import {
  Play,
  Heart,
  Bookmark,
  Plus,
  Share2,
  Star,
} from "lucide-react";

const actions = [
  {
    id: "trailer",
    label: "Watch Trailer",
    icon: Play,
    gradient: "from-red-500 via-orange-500 to-yellow-400",
    primary: true,
  },
  {
    id: "favorite",
    label: "Favorite",
    icon: Heart,
  },
  {
    id: "watchlist",
    label: "Watchlist",
    icon: Plus,
  },
  {
    id: "bookmark",
    label: "Bookmark",
    icon: Bookmark,
  },
  {
    id: "share",
    label: "Share",
    icon: Share2,
  },
  {
    id: "rate",
    label: "Rate",
    icon: Star,
  },
];

export default function MovieActions({
  onAction,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="
        rounded-[32px]
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-3xl
      "
    >
      <div className="flex flex-wrap items-center gap-4">

        {actions.map((action) => {

          const Icon = action.icon;

          if (action.primary) {
            return (
              <motion.button
                key={action.id}
                whileHover={{
                  scale: 1.05,
                  y: -4,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={() => onAction?.(action.id)}
                className={`
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  bg-gradient-to-r
                  ${action.gradient}
                  px-7
                  py-4
                  font-semibold
                  text-black
                  shadow-xl
                `}
              >
                <Icon size={20} />
                {action.label}
              </motion.button>
            );
          }

          return (
            <motion.button
              key={action.id}
              whileHover={{
                y: -4,
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.94,
              }}
              onClick={() => onAction?.(action.id)}
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-black/40
                text-white
                backdrop-blur-xl
                transition-all
                hover:border-[#FFD464]
                hover:bg-[#FFD464]
                hover:text-black
              "
              aria-label={action.label}
              title={action.label}
            >
              <Icon size={20} />
            </motion.button>
          );

        })}

      </div>
    </motion.section>
  );
}