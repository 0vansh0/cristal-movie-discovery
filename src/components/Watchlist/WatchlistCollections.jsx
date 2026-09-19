import { motion } from "framer-motion";
import {
  ChevronRight,
  Film,
  Sparkles,
} from "lucide-react";

const collections = [
  {
    title: "Christopher Nolan",
    movies: 14,
    image:
      "https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vREc0547VKqEv.jpg",
    color: "from-blue-600 to-cyan-500",
  },
  {
    title: "Marvel Universe",
    movies: 42,
    image:
      "https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
    color: "from-red-600 to-orange-500",
  },
  {
    title: "Studio Ghibli",
    movies: 24,
    image:
      "https://image.tmdb.org/t/p/original/mnpRKVSXBX6jb56nabvmGKA0Wig.jpg",
    color: "from-green-500 to-emerald-400",
  },
  {
    title: "Anime",
    movies: 73,
    image:
      "https://image.tmdb.org/t/p/original/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg",
    color: "from-violet-600 to-pink-500",
  },
  {
    title: "Oscar Winners",
    movies: 31,
    image:
      "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    color: "from-yellow-500 to-orange-400",
  },
  {
    title: "Mind Bending",
    movies: 19,
    image:
      "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    color: "from-indigo-600 to-blue-500",
  },
];

export default function WatchlistCollections() {
  return (
    <section className="mt-20">

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black">
            Collections
          </h2>

          <p className="mt-2 text-zinc-400">
            Organize your watchlist into beautiful collections.
          </p>

        </div>

        <button className="flex items-center gap-2 text-zinc-300 hover:text-white">

          View All

          <ChevronRight size={18} />

        </button>

      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {collections.map((collection, index) => (

          <motion.div
            key={collection.title}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * .08,
            }}
            whileHover={{
              y: -10,
              scale: 1.03,
            }}
            className="
              group
              relative
              h-[330px]
              overflow-hidden
              rounded-[34px]
              cursor-pointer
            "
          >

            <motion.img
              whileHover={{
                scale: 1.12,
              }}
              transition={{
                duration: .8,
              }}
              src={collection.image}
              alt={collection.title}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            <div
              className={`
                absolute
                inset-0
                bg-gradient-to-br
                ${collection.color}
                opacity-10
              `}
            />

            <div className="absolute inset-0 p-7 flex flex-col justify-between">

              <div className="flex items-center justify-between">

                <div
                  className={`
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    ${collection.color}
                  `}
                >
                  <Film
                    className="text-black"
                    size={24}
                  />
                </div>

                <Sparkles
                  className="text-yellow-400"
                  size={22}
                />

              </div>

              <div>

                <h3 className="text-3xl font-black">
                  {collection.title}
                </h3>

                <p className="mt-2 text-zinc-300">
                  {collection.movies} Movies
                </p>

                <motion.button
                  whileHover={{
                    x: 8,
                  }}
                  className="
                    mt-8
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-white/10
                    px-5
                    py-3
                    backdrop-blur-xl
                  "
                >
                  Explore Collection

                  <ChevronRight size={18} />

                </motion.button>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}