import { motion } from "framer-motion";
import {
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function SearchHero({
  totalResults = 0,
  query = "",
}) {
  return (
    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-black p-10 shadow-2xl">

      {/* Animated Background */}

      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
        className="
          absolute
          -right-24
          -top-24
          h-80
          w-80
          rounded-full
          bg-[#FFD464]
          blur-[140px]
        "
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          repeat: Infinity,
          duration: 10,
        }}
        className="
          absolute
          -bottom-32
          -left-32
          h-96
          w-96
          rounded-full
          bg-blue-500
          blur-[160px]
        "
      />

      <div className="relative z-10">

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-[#FFD464]/20 bg-[#FFD464]/10 px-5 py-2 text-[#FFD464]">

            <Sparkles size={18} />

            <span className="font-semibold">
              AI Powered Search
            </span>

          </div>

          <h1 className="max-w-4xl text-5xl font-black leading-tight md:text-7xl">
            Discover Your
            <span className="block text-[#FFD464]">
              Next Favorite Movie
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
            Search millions of movies, TV shows and celebrities
            with lightning-fast results powered by TMDB.
          </p>

        </motion.div>

        {/* Stats */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="mt-12 grid gap-6 md:grid-cols-3"
        >

          <HeroCard
            icon={<Search size={28} />}
            title="Search Query"
            value={query || "Start Searching"}
          />

          <HeroCard
            icon={<TrendingUp size={28} />}
            title="Results Found"
            value={totalResults.toLocaleString()}
          />

          <HeroCard
            icon={<Sparkles size={28} />}
            title="Powered By"
            value="TMDB API"
          />

        </motion.div>

      </div>

    </section>
  );
}

function HeroCard({
  icon,
  title,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      className="
        rounded-[28px]
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-3xl
      "
    >
      <div className="mb-4 text-[#FFD464]">
        {icon}
      </div>

      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <h3 className="mt-2 text-2xl font-bold">
        {value}
      </h3>
    </motion.div>
  );
}