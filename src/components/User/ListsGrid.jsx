import { motion } from "framer-motion";
import {
  Lock,
  Globe,
  Film,
  Calendar,
  Pencil,
  Trash2,
  ChevronRight,
} from "lucide-react";

const POSTER =
  "https://image.tmdb.org/t/p/w500";

export default function ListsGrid({
  lists = [],
  onOpen,
  onEdit,
  onDelete,
}) {
  if (!lists.length) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-black">
            Your Lists
          </h2>

          <p className="mt-2 text-zinc-400">
            Organize your favorite collections.
          </p>

        </div>

        <span
          className="
            rounded-full
            bg-cyan-500/20
            px-5
            py-2
            font-semibold
            text-cyan-400
          "
        >
          {lists.length} Lists
        </span>

      </div>

      {/* Grid */}

      <div
        className="
          grid
          gap-8
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {lists.map((list, index) => (

          <motion.div
            key={list.id}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: index * 0.05,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-3xl
            "
          >

            {/* Cover Collage */}

            <div className="grid h-60 grid-cols-2">

              {list.posters
                ?.slice(0, 4)
                .map((poster, i) => (

                  <img
                    key={i}
                    src={POSTER + poster}
                    alt=""
                    className="
                      h-full
                      w-full
                      object-cover
                    "
                  />

                ))}

            </div>

            {/* Body */}

            <div className="space-y-5 p-6">

              <div className="flex items-center justify-between">

                <h3 className="text-2xl font-black">

                  {list.name}

                </h3>

                {list.private ? (
                  <Lock
                    className="text-red-400"
                    size={18}
                  />
                ) : (
                  <Globe
                    className="text-green-400"
                    size={18}
                  />
                )}

              </div>

              <p className="line-clamp-3 text-zinc-400">

                {list.description}

              </p>

              <div className="flex items-center justify-between">

                <span className="flex items-center gap-2">

                  <Film size={16} />

                  {list.items} Movies

                </span>

                <span className="flex items-center gap-2">

                  <Calendar size={16} />

                  {list.updatedAt}

                </span>

              </div>

              {/* Actions */}

              <div className="flex gap-3">

                <button
                  onClick={() =>
                    onOpen?.(list.id)
                  }
                  className="
                    flex-1
                    rounded-xl
                    bg-[#FFD464]
                    py-3
                    font-bold
                    text-black
                  "
                >

                  Open List

                  <ChevronRight
                    className="ml-2 inline"
                    size={16}
                  />

                </button>

                <button
                  onClick={() =>
                    onEdit?.(list)
                  }
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                  "
                >

                  <Pencil size={18} />

                </button>

                <button
                  onClick={() =>
                    onDelete?.(list)
                  }
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-red-500/30
                    bg-red-500/10
                    text-red-400
                  "
                >

                  <Trash2 size={18} />

                </button>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}