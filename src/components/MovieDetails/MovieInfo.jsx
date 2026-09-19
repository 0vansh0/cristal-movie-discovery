import { motion } from "framer-motion";
import {
  Calendar,
  Clock3,
  Globe,
  Building2,
  DollarSign,
  Languages,
  Film,
  MapPin,
} from "lucide-react";

export default function MovieInfo({ movie }) {
  if (!movie) return null;

  const info = [
    {
      icon: Calendar,
      title: "Release Date",
      value: movie.release_date || "Unknown",
    },
    {
      icon: Clock3,
      title: "Runtime",
      value: movie.runtime
        ? `${movie.runtime} min`
        : "Unknown",
    },
    {
      icon: Globe,
      title: "Original Language",
      value: movie.original_language?.toUpperCase() || "--",
    },
    {
      icon: Languages,
      title: "Spoken Languages",
      value:
        movie.spoken_languages
          ?.map((l) => l.english_name)
          .join(", ") || "--",
    },
    {
      icon: DollarSign,
      title: "Budget",
      value:
        movie.budget
          ? `$${movie.budget.toLocaleString()}`
          : "Not Available",
    },
    {
      icon: DollarSign,
      title: "Revenue",
      value:
        movie.revenue
          ? `$${movie.revenue.toLocaleString()}`
          : "Not Available",
    },
    {
      icon: Building2,
      title: "Production",
      value:
        movie.production_companies
          ?.map((c) => c.name)
          .join(", ") || "--",
    },
    {
      icon: MapPin,
      title: "Countries",
      value:
        movie.production_countries
          ?.map((c) => c.name)
          .join(", ") || "--",
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
      viewport={{ once: true }}
      transition={{
        duration: 0.7,
      }}
      className="
        rounded-[32px]
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-3xl
      "
    >
      {/* Header */}

      <div className="mb-8 flex items-center gap-3">

        <Film
          className="text-[#FFD464]"
          size={28}
        />

        <h2 className="text-3xl font-black">
          Movie Information
        </h2>

      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2">

        {info.map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.06,
              }}
              whileHover={{
                y: -6,
                scale: 1.02,
              }}
              className="
                group
                rounded-3xl
                border
                border-white/10
                bg-black/30
                p-5
                backdrop-blur-xl
                transition-all
              "
            >
              <div className="flex items-start gap-4">

                <div
                  className="
                    rounded-2xl
                    bg-[#FFD464]/15
                    p-3
                    text-[#FFD464]
                    transition
                    group-hover:bg-[#FFD464]
                    group-hover:text-black
                  "
                >
                  <Icon size={22} />
                </div>

                <div className="flex-1">

                  <p className="text-sm text-zinc-400">
                    {item.title}
                  </p>

                  <h3 className="mt-2 break-words text-lg font-semibold">
                    {item.value}
                  </h3>

                </div>

              </div>

            </motion.div>

          );

        })}

      </div>

    </motion.section>
  );
}