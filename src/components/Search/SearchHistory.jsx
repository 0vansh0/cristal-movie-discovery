import { motion, AnimatePresence } from "framer-motion";
import {
  History,
  Search,
  Trash2,
  X,
} from "lucide-react";

export default function SearchHistory({
  history = [],
  onSelect,
  onDelete,
  onClear,
}) {
  if (!history.length) return null;

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        rounded-[32px]
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-3xl
      "
    >
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div
            className="
              rounded-2xl
              bg-[#FFD464]/15
              p-3
            "
          >
            <History
              className="text-[#FFD464]"
              size={22}
            />
          </div>

          <div>

            <h2 className="text-2xl font-black">
              Recent Searches
            </h2>

            <p className="text-zinc-400">
              Continue where you left off
            </p>

          </div>

        </div>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: .95,
          }}
          onClick={onClear}
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-red-500/10
            px-5
            py-3
            text-red-400
            transition
            hover:bg-red-500/20
          "
        >
          <Trash2 size={18}/>
          Clear All
        </motion.button>

      </div>

      {/* Search Chips */}

      <div className="flex flex-wrap gap-4">

        <AnimatePresence>

          {history.map((item,index)=>(

            <motion.div
              key={`${item}-${index}`}
              layout
              initial={{
                opacity:0,
                scale:.8,
              }}
              animate={{
                opacity:1,
                scale:1,
              }}
              exit={{
                opacity:0,
                scale:.8,
              }}
              whileHover={{
                y:-3,
              }}
              className="
                group
                flex
                items-center
                overflow-hidden
                rounded-full
                border
                border-white/10
                bg-black/20
                backdrop-blur-xl
              "
            >

              {/* Search */}

              <button
                onClick={()=>
                  onSelect?.(item)
                }
                className="
                  flex
                  items-center
                  gap-3
                  px-5
                  py-3
                  transition
                  hover:bg-white/5
                "
              >

                <Search
                  size={16}
                  className="text-[#FFD464]"
                />

                <span>
                  {item}
                </span>

              </button>

              {/* Delete */}

              <button
                onClick={()=>
                  onDelete?.(item)
                }
                className="
                  border-l
                  border-white/10
                  px-4
                  py-3
                  text-zinc-500
                  transition
                  hover:bg-red-500/10
                  hover:text-red-400
                "
              >
                <X size={16}/>
              </button>

            </motion.div>

          ))}

        </AnimatePresence>

      </div>

      {/* Footer */}

      <div
        className="
          mt-8
          border-t
          border-white/10
          pt-6
          text-sm
          text-zinc-500
        "
      >
        {history.length} recent search
        {history.length > 1 ? "es" : ""} saved locally.
      </div>

    </motion.section>
  );
}