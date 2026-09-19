import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpDown,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Check,
} from "lucide-react";

const SORT_OPTIONS = [
  {
    id: "popularity.desc",
    label: "Popularity",
  },
  {
    id: "vote_average.desc",
    label: "Highest Rated",
  },
  {
    id: "release_date.desc",
    label: "Newest",
  },
  {
    id: "release_date.asc",
    label: "Oldest",
  },
  {
    id: "vote_count.desc",
    label: "Most Votes",
  },
  {
    id: "title.asc",
    label: "A → Z",
  },
  {
    id: "title.desc",
    label: "Z → A",
  },
];

export default function SearchSort({
  value = "popularity.desc",
  ascending = false,
  onChange,
  onDirectionChange,
}) {
  const [open, setOpen] = useState(false);

  const selected =
    SORT_OPTIONS.find(
      (item) => item.id === value
    ) || SORT_OPTIONS[0];

  return (
    <div className="relative">

      <div className="flex items-center gap-4">

        {/* Sort Button */}

        <motion.button
          whileHover={{
            scale: 1.02,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={() => setOpen(!open)}
          className="
            flex
            items-center
            gap-3
            rounded-full
            border
            border-white/10
            bg-white/5
            px-6
            py-3
            backdrop-blur-3xl
          "
        >
          <ArrowUpDown
            className="text-[#FFD464]"
            size={20}
          />

          <span>
            {selected.label}
          </span>

          <motion.div
            animate={{
              rotate: open ? 180 : 0,
            }}
          >
            <ChevronDown size={18}/>
          </motion.div>

        </motion.button>

        {/* Direction */}

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: .95,
          }}
          onClick={() =>
            onDirectionChange?.(
              !ascending
            )
          }
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/5
            backdrop-blur-3xl
          "
        >
          {ascending ? (
            <ArrowUp
              className="text-[#FFD464]"
            />
          ) : (
            <ArrowDown
              className="text-[#FFD464]"
            />
          )}
        </motion.button>

      </div>

      {/* Dropdown */}

      <AnimatePresence>

        {open && (

          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: .96,
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
              left-0
              top-full
              z-40
              mt-4
              w-72
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-[#0E1117]/95
              backdrop-blur-3xl
            "
          >

            {SORT_OPTIONS.map((item)=>(

              <motion.button
                key={item.id}
                whileHover={{
                  x:6,
                }}
                onClick={()=>{
                  onChange?.(item.id);
                  setOpen(false);
                }}
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  px-6
                  py-4
                  transition

                  ${
                    value===item.id
                    ? "bg-[#FFD464]/10"
                    : "hover:bg-white/5"
                  }
                `}
              >

                <span>
                  {item.label}
                </span>

                {value===item.id && (

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