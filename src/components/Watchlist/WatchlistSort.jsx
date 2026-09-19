import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpDown,
  ChevronDown,
  Check,
} from "lucide-react";

const SORT_OPTIONS = [
  "Recently Added",
  "Newest Release",
  "Oldest Release",
  "Highest Rated",
  "Lowest Rated",
  "Most Popular",
  "Runtime",
  "A → Z",
  "Z → A",
];

export default function WatchlistSort({
  value,
  onChange,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: .97 }}
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
          backdrop-blur-xl
        "
      >

        <ArrowUpDown size={18} />

        <span>{value}</span>

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
              mt-4
              w-72
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-[#10131D]/95
              backdrop-blur-3xl
              shadow-2xl
              z-50
            "
          >

            {SORT_OPTIONS.map((option) => (

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
                  px-6
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