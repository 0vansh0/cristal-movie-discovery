import { motion } from "framer-motion";
import {
  Clapperboard,
  Sword,
  Ghost,
  Heart,
  Rocket,
  Laugh,
  Music,
  Shield,
  Drama,
  Sparkles,
} from "lucide-react";

const genreIcons = {
  Action: Sword,
  Adventure: Rocket,
  Animation: Sparkles,
  Comedy: Laugh,
  Crime: Shield,
  Documentary: Clapperboard,
  Drama: Drama,
  Family: Heart,
  Fantasy: Sparkles,
  History: Shield,
  Horror: Ghost,
  Music: Music,
  Mystery: Ghost,
  Romance: Heart,
  "Science Fiction": Rocket,
  "Sci-Fi": Rocket,
  Thriller: Sword,
  War: Shield,
  Western: Clapperboard,
};

const genreColors = {
  Action: "from-red-500 to-orange-500",
  Adventure: "from-cyan-500 to-blue-500",
  Animation: "from-pink-500 to-purple-500",
  Comedy: "from-yellow-400 to-orange-400",
  Crime: "from-zinc-600 to-zinc-800",
  Documentary: "from-slate-500 to-slate-700",
  Drama: "from-indigo-500 to-violet-500",
  Family: "from-green-400 to-emerald-500",
  Fantasy: "from-fuchsia-500 to-violet-500",
  History: "from-amber-600 to-orange-600",
  Horror: "from-red-700 to-black",
  Music: "from-pink-400 to-rose-500",
  Mystery: "from-purple-700 to-indigo-700",
  Romance: "from-pink-500 to-red-500",
  "Science Fiction": "from-cyan-500 to-indigo-500",
  "Sci-Fi": "from-cyan-500 to-indigo-500",
  Thriller: "from-red-600 to-zinc-900",
  War: "from-gray-600 to-gray-900",
  Western: "from-orange-600 to-yellow-700",
};

export default function MovieGenres({ genres = [] }) {
  if (!genres.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="
        rounded-[32px]
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-3xl
      "
    >
      <h2 className="mb-8 text-3xl font-black">
        Genres
      </h2>

      <div className="flex flex-wrap gap-5">

        {genres.map((genre, index) => {

          const name =
            typeof genre === "string"
              ? genre
              : genre.name;

          const Icon =
            genreIcons[name] || Clapperboard;

          const color =
            genreColors[name] ||
            "from-zinc-700 to-zinc-900";

          return (

            <motion.div
              key={name}
              initial={{
                opacity: 0,
                scale: .8,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              whileHover={{
                y: -8,
                scale: 1.08,
              }}
              transition={{
                delay: index * .05,
                type: "spring",
              }}
              className="
                group
                relative
              "
            >

              <div
                className={`
                  absolute
                  inset-0
                  rounded-2xl
                  bg-gradient-to-r
                  ${color}
                  opacity-25
                  blur-xl
                  transition
                  group-hover:opacity-60
                `}
              />

              <div
                className="
                  relative
                  flex
                  items-center
                  gap-3
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/10
                  bg-black/40
                  px-6
                  py-4
                  backdrop-blur-2xl
                "
              >

                <Icon
                  size={20}
                  className="text-[#FFD464]"
                />

                <span className="font-semibold">
                  {name}
                </span>

              </div>

            </motion.div>

          );

        })}

      </div>
    </motion.section>
  );
}