import { motion } from "framer-motion";
import {
  FolderHeart,
  Plus,
  Film,
  Star,
  Clock,
} from "lucide-react";

const collections = [
  {
    id: 1,
    name: "Christopher Nolan",
    movies: 12,
    cover:
      "https://image.tmdb.org/t/p/w780/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    name: "Marvel Universe",
    movies: 34,
    cover:
      "https://image.tmdb.org/t/p/w780/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
    color: "from-red-500 to-pink-600",
  },
  {
    id: 3,
    name: "Weekend Movies",
    movies: 21,
    cover:
      "https://image.tmdb.org/t/p/w780/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
    color: "from-yellow-400 to-orange-500",
  },
];

export default function FavoritesCollections() {
  return (
    <section className="mt-20">

      {/* Header */}

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-black">
            Collections
          </h2>

          <p className="mt-2 text-zinc-400">
            Organize your favorite movies into custom collections.
          </p>

        </div>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: .97,
          }}
          className="
            flex
            items-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-[#FF5E5E]
            via-[#FFB84D]
            to-[#FFD464]
            px-6
            py-3
            font-semibold
            text-black
          "
        >
          <Plus size={18} />

          New Collection

        </motion.button>

      </div>

      {/* Cards */}

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {collections.map((collection, index) => (

          <motion.div
            key={collection.id}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * .1,
            }}
            whileHover={{
              y: -12,
            }}
            className="
              group
              overflow-hidden
              rounded-[32px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-3xl
            "
          >

            {/* Cover */}

            <div className="relative h-56 overflow-hidden">

              <motion.img
                whileHover={{
                  scale: 1.08,
                }}
                transition={{
                  duration: .6,
                }}
                src={collection.cover}
                alt={collection.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/>

              <div
                className={`
                  absolute
                  left-5
                  top-5
                  rounded-full
                  bg-gradient-to-r
                  ${collection.color}
                  p-3
                `}
              >
                <FolderHeart
                  size={22}
                  className="text-black"
                />
              </div>

            </div>

            {/* Content */}

            <div className="space-y-5 p-6">

              <h3 className="text-2xl font-bold">
                {collection.name}
              </h3>

              <div className="flex items-center justify-between text-sm text-zinc-400">

                <span className="flex items-center gap-2">

                  <Film size={16} />

                  {collection.movies} Movies

                </span>

                <span className="flex items-center gap-2">

                  <Star
                    size={16}
                    className="fill-yellow-400 text-yellow-400"
                  />

                  Featured

                </span>

              </div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: .98,
                }}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  py-3
                "
              >
                <Clock size={18} />

                Open Collection

              </motion.button>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}