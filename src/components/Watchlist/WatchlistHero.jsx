import { motion } from "framer-motion";
import {
  Play,
  Clock3,
  Bookmark,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const backdrop =
  "https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vREc0547VKqEv.jpg";

export default function WatchlistHero() {
  return (
    <section className="relative h-[78vh] min-h-[700px] overflow-hidden rounded-[40px]">

      {/* Background */}

      <motion.img
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 12 }}
        src={backdrop}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Animated Gradient */}

      <motion.div
        animate={{
          opacity: [.45, .7, .45],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#080B12]
          via-[#080B12]/60
          to-transparent
        "
      />

      {/* Bottom Fade */}

      <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-transparent to-transparent" />

      {/* Floating Lights */}

      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            opacity: [.15, .6, .15],
          }}
          transition={{
            repeat: Infinity,
            duration: 5 + i,
          }}
          className="absolute h-2 w-2 rounded-full bg-white"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Content */}

      <div className="relative z-10 flex h-full items-center">

        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-8">

          {/* Left */}

          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: .8,
            }}
            className="max-w-3xl"
          >

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2 backdrop-blur-xl">

              <Sparkles size={16} />

              AI Powered Collection

            </div>

            <h1 className="text-7xl font-black tracking-tight">

              Your

              <span className="bg-gradient-to-r from-[#FF5E5E] via-[#FFB84D] to-[#FFD464] bg-clip-text text-transparent">

                {" "}Watchlist

              </span>

            </h1>

            <p className="mt-8 max-w-2xl text-xl leading-9 text-zinc-300">

              Every movie you've saved in one beautiful cinematic collection.
              Discover hidden gems, organize collections and continue watching
              with AI powered recommendations.

            </p>

            {/* Stats */}

            <div className="mt-12 flex flex-wrap gap-8">

              <div>

                <h2 className="text-5xl font-black">
                  276
                </h2>

                <p className="mt-2 text-zinc-400">
                  Saved Movies
                </p>

              </div>

              <div>

                <h2 className="text-5xl font-black">
                  712h
                </h2>

                <p className="mt-2 text-zinc-400">
                  Total Runtime
                </p>

              </div>

              <div>

                <h2 className="text-5xl font-black">
                  18
                </h2>

                <p className="mt-2 text-zinc-400">
                  Collections
                </p>

              </div>

            </div>

            {/* Buttons */}

            <div className="mt-12 flex gap-5">

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: .95,
                }}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-full
                  bg-white
                  px-8
                  py-4
                  text-lg
                  font-bold
                  text-black
                "
              >

                <Play fill="currentColor" />

                Continue Watching

              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-white/10
                  bg-white/10
                  px-8
                  py-4
                  backdrop-blur-xl
                "
              >

                View Collections

                <ArrowRight size={20} />

              </motion.button>

            </div>

          </motion.div>

          {/* Right Glass Card */}

          <motion.div
            initial={{
              opacity: 0,
              x: 100,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: .3,
            }}
            className="
              hidden
              w-[390px]
              rounded-[40px]
              border
              border-white/10
              bg-white/5
              p-8
              backdrop-blur-3xl
              xl:block
            "
          >

            <div className="mb-8 flex items-center justify-between">

              <h3 className="text-2xl font-bold">
                Progress
              </h3>

              <Bookmark className="text-[#FFD464]" />
            </div>

            <div className="relative mx-auto flex h-52 w-52 items-center justify-center">

              <svg className="absolute h-full w-full -rotate-90">

                <circle
                  cx="104"
                  cy="104"
                  r="90"
                  stroke="rgba(255,255,255,.08)"
                  strokeWidth="10"
                  fill="none"
                />

                <motion.circle
                  cx="104"
                  cy="104"
                  r="90"
                  stroke="url(#gradient)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="565"
                  initial={{
                    strokeDashoffset: 565,
                  }}
                  animate={{
                    strokeDashoffset: 565 * 0.32,
                  }}
                  transition={{
                    duration: 2,
                  }}
                />

                <defs>

                  <linearGradient
                    id="gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >

                    <stop offset="0%" stopColor="#FF5E5E" />

                    <stop offset="50%" stopColor="#FFB84D" />

                    <stop offset="100%" stopColor="#FFD464" />

                  </linearGradient>

                </defs>

              </svg>

              <div className="text-center">

                <h2 className="text-6xl font-black">
                  68%
                </h2>

                <p className="text-zinc-400">
                  Completed
                </p>

              </div>

            </div>

            <div className="mt-10 space-y-5">

              <div className="flex justify-between">

                <span className="flex items-center gap-2 text-zinc-400">

                  <Clock3 size={18} />

                  Remaining

                </span>

                <span>226 Hours</span>

              </div>

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  Next Movie
                </span>

                <span className="font-semibold">
                  Dune Part Two
                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-zinc-400">
                  AI Score
                </span>

                <span className="font-bold text-[#FFD464]">
                  97%
                </span>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}