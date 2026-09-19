import { motion } from "framer-motion";
import {
  CalendarDays,
  Film,
  Clock3,
  Tv,
  Trophy,
} from "lucide-react";

export default function MovieTimeline({
  movie,
}) {
  if (!movie) return null;

  const timeline = [
    {
      title: "Production Started",
      date: movie.production_start || "Unknown",
      icon: Film,
      color: "#60A5FA",
    },
    {
      title: "Release Date",
      date: movie.release_date || "--",
      icon: CalendarDays,
      color: "#FFD464",
    },
    {
      title: "Digital Release",
      date: movie.digital_release || "Not Available",
      icon: Tv,
      color: "#34D399",
    },
    {
      title: "Runtime",
      date: movie.runtime
        ? `${movie.runtime} Minutes`
        : "--",
      icon: Clock3,
      color: "#FB923C",
    },
    {
      title: "Awards",
      date: movie.awards || "No Data",
      icon: Trophy,
      color: "#F472B6",
    },
  ];

  return (
    <motion.section
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
        duration: 0.8,
      }}
      className="
        rounded-[36px]
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-3xl
      "
    >
      {/* Header */}

      <div className="mb-12">

        <h2 className="text-3xl font-black">
          Movie Timeline
        </h2>

        <p className="mt-2 text-zinc-400">
          Important milestones throughout production
        </p>

      </div>

      {/* Timeline */}

      <div className="relative ml-4">

        {/* Vertical Line */}

        <div
          className="
            absolute
            left-6
            top-0
            h-full
            w-[2px]
            bg-gradient-to-b
            from-[#FFD464]
            via-white/20
            to-transparent
          "
        />

        {timeline.map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                x: -40,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * .12,
              }}
              className="
                relative
                mb-12
                flex
                gap-8
              "
            >

              {/* Icon */}

              <motion.div
                whileHover={{
                  scale: 1.15,
                }}
                className="
                  relative
                  z-10
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-black
                "
                style={{
                  color: item.color,
                }}
              >
                <Icon size={24} />

                <div
                  className="
                    absolute
                    inset-0
                    rounded-full
                    blur-xl
                  "
                  style={{
                    background: item.color,
                    opacity: .2,
                  }}
                />

              </motion.div>

              {/* Card */}

              <motion.div
                whileHover={{
                  x: 8,
                }}
                className="
                  flex-1
                  rounded-[28px]
                  border
                  border-white/10
                  bg-black/30
                  p-6
                  backdrop-blur-xl
                "
              >

                <h3 className="text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 text-zinc-400">
                  {item.date}
                </p>

              </motion.div>

            </motion.div>

          );

        })}

      </div>

    </motion.section>
  );
}