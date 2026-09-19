import { motion } from "framer-motion";
import {
  BadgeCheck,
  MapPin,
  CalendarDays,
  Pencil,
  Camera,
  Settings,
} from "lucide-react";

import ProfileAvatar from "./ProfileAvatar";

export default function ProfileHero() {
  return (
    <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-3xl">

      {/* Banner */}

      <div className="relative h-[320px] overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-r from-[#ff5e5e] via-[#ff9b5e] to-[#ffd464]" />

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 2, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
          }}
          className="
            absolute
            -left-32
            top-0
            h-[500px]
            w-[500px]
            rounded-full
            bg-white/10
            blur-[120px]
          "
        />

        <motion.div
          animate={{
            x: [-60, 60, -60],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
          }}
          className="
            absolute
            right-0
            bottom-0
            h-[350px]
            w-[350px]
            rounded-full
            bg-white/10
            blur-[100px]
          "
        />

        {/* Edit Banner */}

        <button
          className="
            absolute
            right-6
            top-6
            flex
            items-center
            gap-2
            rounded-full
            bg-black/40
            px-5
            py-3
            backdrop-blur-xl
            transition
            hover:bg-black/60
          "
        >
          <Camera size={18} />
          Change Cover
        </button>
      </div>

      {/* Bottom */}

      <div className="relative px-10 pb-10">

        {/* Avatar */}

        <div className="-mt-24">
          <ProfileAvatar />
        </div>

        {/* Info */}

        <div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <div className="flex items-center gap-3">

              <h1 className="text-5xl font-black">
                Vansh Raj
              </h1>

              <BadgeCheck
                size={30}
                className="text-sky-400"
              />

            </div>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-300">
              Cinephile • UI Designer • Developer •
              Exploring stories from around the world.
              Sci-Fi addict. Marvel fan. Nolan admirer.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-zinc-400">

              <div className="flex items-center gap-2">

                <MapPin size={18} />

                India

              </div>

              <div className="flex items-center gap-2">

                <CalendarDays size={18} />

                Joined July 2026

              </div>

            </div>

            {/* Genres */}

            <div className="mt-8 flex flex-wrap gap-3">

              {[
                "Sci-Fi",
                "Action",
                "Thriller",
                "Drama",
                "Adventure",
              ].map((genre) => (
                <div
                  key={genre}
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    py-2
                    text-sm
                    backdrop-blur-xl
                  "
                >
                  {genre}
                </div>
              ))}

            </div>

          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-4">

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: .95,
              }}
              className="
                rounded-full
                bg-gradient-to-r
                from-[#ff5e5e]
                to-[#ffd464]
                px-8
                py-4
                font-semibold
                text-black
                shadow-lg
              "
            >
              Edit Profile
            </motion.button>

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
                gap-2
                rounded-full
                border
                border-white/10
                bg-white/5
                px-8
                py-4
                backdrop-blur-xl
              "
            >
              <Pencil size={18} />
              Edit Bio
            </motion.button>

            <motion.button
              whileHover={{
                rotate: 90,
              }}
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
              "
            >
              <Settings size={20} />
            </motion.button>

          </div>

        </div>

      </div>

    </section>
  );
}