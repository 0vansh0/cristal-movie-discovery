import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../../context/FavoritesContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Sparkles,
  Shuffle,
  ArrowUp,
  Dice5,
} from "lucide-react";

export default function FavoritesFloatingActions() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { favorites } = useFavorites();

  const openRandomFavorite = () => {
    if (!favorites.length) {
      navigate("/movies");
      return;
    }

    const movie = favorites[Math.floor(Math.random() * favorites.length)];
    navigate(`/movie/${movie.id}`);
  };

  const actions = [
    {
      icon: Plus,
      label: "Add Movie",
      color: "from-[#FF5E5E] to-[#FF8A5E]",
      onClick: () => navigate("/movies"),
    },
    {
      icon: Sparkles,
      label: "AI Picks",
      color: "from-[#FFD464] to-[#FFB84D]",
      onClick: () => navigate("/ai"),
    },
    {
      icon: Shuffle,
      label: "Shuffle",
      color: "from-cyan-500 to-blue-500",
      onClick: openRandomFavorite,
    },
    {
      icon: Dice5,
      label: "Random",
      color: "from-purple-500 to-pink-500",
      onClick: openRandomFavorite,
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[999]">

      <div className="flex flex-col items-end gap-4">

        <AnimatePresence>

          {open &&
            actions.map((action, index) => {
              const Icon = action.icon;

              return (
                <motion.button
                  key={action.label}
                  initial={{
                    opacity: 0,
                    x: 50,
                    scale: 0.5,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: 50,
                    scale: 0.5,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  onClick={action.onClick}
                  whileHover={{
                    scale: 1.08,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className={`
                    flex
                    items-center
                    gap-3
                    rounded-full
                    bg-gradient-to-r
                    ${action.color}
                    px-5
                    py-3
                    font-semibold
                    text-black
                    shadow-xl
                  `}
                >
                  <Icon size={20} />
                  {action.label}
                </motion.button>
              );
            })}

        </AnimatePresence>

        {/* Scroll To Top */}

        <motion.button
          whileHover={{
            scale: 1.1,
            rotate: 8,
          }}
          whileTap={{
            scale: 0.95,
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
            border
            border-white/10
            bg-white/10
            backdrop-blur-3xl
          "
        >
          <ArrowUp size={22} />
        </motion.button>

        {/* Main FAB */}

        <motion.button
          whileHover={{
            rotate: 90,
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => setOpen(!open)}
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-gradient-to-r
            from-[#FF5E5E]
            via-[#FFB84D]
            to-[#FFD464]
            text-black
            shadow-2xl
          "
        >
          <Plus size={28} />
        </motion.button>

      </div>

    </div>
  );
}