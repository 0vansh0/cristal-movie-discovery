import { motion } from "framer-motion";
import {
  Heart,
  Sparkles,
  Film,
  Star,
  Clock3,
} from "lucide-react";

export default function FavoritesHero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-24">

      {/* Background Glow */}

      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-red-500/20 blur-[120px]" />
      </div>

      {/* Floating Hearts */}

      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.7, 0.2],
            rotate: [0, 12, -12, 0],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
          }}
          className="absolute text-pink-400/20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <Heart size={18} fill="currentColor" />
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-5 py-2 backdrop-blur-xl">
            <Sparkles size={16} className="text-pink-400" />
            <span className="text-sm font-medium text-pink-300">
              Your Personal Collection
            </span>
          </div>

          {/* Icon */}

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="mx-auto mt-8 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-orange-400 shadow-[0_0_60px_rgba(236,72,153,.45)]"
          >
            <Heart
              size={50}
              fill="white"
              className="text-white"
            />
          </motion.div>

          {/* Title */}

          <h1 className="mt-10 text-6xl font-black tracking-tight">
            Favorite Movies
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
            A carefully curated collection of the movies you love the most.
            Revisit unforgettable stories, iconic performances, and timeless
            cinematic moments.
          </p>

          {/* Quick Stats */}

          <div className="mt-16 grid gap-6 md:grid-cols-3">

            <HeroCard
              icon={<Film size={26} />}
              title="Favorites"
              value="128"
            />

            <HeroCard
              icon={<Star size={26} />}
              title="Average Rating"
              value="9.2"
            />

            <HeroCard
              icon={<Clock3 size={26} />}
              title="Runtime"
              value="286h"
            />

          </div>

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
        scale: 1.03,
      }}
      className="
        rounded-[28px]
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-2xl
      "
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-red-500">
        {icon}
      </div>

      <p className="text-zinc-400">
        {title}
      </p>

      <h2 className="mt-3 text-4xl font-black">
        {value}
      </h2>
    </motion.div>
  );
}