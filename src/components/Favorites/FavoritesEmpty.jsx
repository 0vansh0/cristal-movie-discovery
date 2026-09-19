import { motion } from "framer-motion";
import {
  Heart,
  Search,
  Sparkles,
  Plus,
} from "lucide-react";

export default function FavoritesEmpty({
  title = "No Favorites Yet",
  description = "Start building your personal movie collection by adding your favorite films.",
  onExplore = () => {},
  onAdd = () => {},
}) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        flex
        min-h-[70vh]
        flex-col
        items-center
        justify-center
        rounded-[40px]
        border
        border-white/10
        bg-gradient-to-br
        from-white/5
        to-white/[0.02]
        p-12
        text-center
        backdrop-blur-3xl
      "
    >
      {/* Animated Icon */}

      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
        }}
        className="
          mb-10
          flex
          h-36
          w-36
          items-center
          justify-center
          rounded-full
          bg-gradient-to-br
          from-[#FF5E5E]
          via-[#FFB84D]
          to-[#FFD464]
          shadow-[0_0_80px_rgba(255,212,100,.35)]
        "
      >
        <Heart
          size={70}
          className="fill-black text-black"
        />
      </motion.div>

      <h2 className="text-5xl font-black">
        {title}
      </h2>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
        {description}
      </p>

      {/* Buttons */}

      <div className="mt-12 flex flex-wrap justify-center gap-5">

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={onExplore}
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-[#FF5E5E]
            via-[#FFB84D]
            to-[#FFD464]
            px-8
            py-4
            font-semibold
            text-black
          "
        >
          <Search size={20} />
          Explore Movies
        </motion.button>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.97,
          }}
          onClick={onAdd}
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-8
            py-4
            backdrop-blur-xl
          "
        >
          <Plus size={20} />
          Add Favorite
        </motion.button>

      </div>

      {/* AI Suggestion */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.8,
        }}
        className="
          mt-12
          flex
          items-center
          gap-3
          rounded-full
          border
          border-yellow-500/20
          bg-yellow-500/10
          px-6
          py-3
          text-yellow-300
        "
      >
        <Sparkles size={18} />

        AI can recommend movies based on your watch history.

      </motion.div>
    </motion.section>
  );
}