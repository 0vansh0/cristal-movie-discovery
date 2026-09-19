import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpDown,
  ChevronDown,
  Check,
} from "lucide-react";
import { useState } from "react";

const options = [
  "Recently Added",
  "Recently Updated",
  "Highest Rated",
  "Lowest Rated",
  "A → Z",
  "Z → A",
  "Release Date",
  "Runtime",
  "Popularity",
  "TMDB Rating",
];

export default function FavoritesSort({
  value = "Recently Added",
  onChange = () => {},
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: .98 }}
        onClick={() => setOpen(!open)}
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-white/10
          bg-white/5
          px-5
          py-4
          backdrop-blur-3xl
        "
      >
        <ArrowUpDown size={18} />

        <span className="font-medium">
          {value}
        </span>

        <motion.div
          animate={{
            rotate: open ? 180 : 0,
          }}
        >
          <ChevronDown size={18} />
        </motion.div>

      </motion.button>

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: .98,
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
            className="
              absolute
              right-0
              z-50
              mt-3
              w-72
              overflow-hidden
              rounded-[24px]
              border
              border-white/10
              bg-[#0E1320]/95
              backdrop-blur-3xl
              shadow-2xl
            "
          >

            {options.map((option) => (

              <motion.button
                key={option}
                whileHover={{
                  x: 6,
                }}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  px-5
                  py-4
                  transition
                  hover:bg-white/5
                "
              >

                <span>{option}</span>

                {value === option && (
                  <Check
                    size={18}
                    className="text-[#FFD464]"
                  />
                )}

              </motion.button>

            ))}

          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );
}