import { motion } from "framer-motion";
import {
  Calendar,
  Clock3,
  DollarSign,
  Globe,
  Languages,
  Building2,
  Film,
  Flag,
} from "lucide-react";

export default function MovieFacts({ movie }) {
  if (!movie) return null;

  const facts = [
    {
      title: "Original Title",
      value: movie.original_title || "--",
      icon: Film,
    },
    {
      title: "Status",
      value: movie.status || "--",
      icon: Flag,
    },
    {
      title: "Runtime",
      value: movie.runtime
        ? `${movie.runtime} min`
        : "--",
      icon: Clock3,
    },
    {
      title: "Release Date",
      value: movie.release_date || "--",
      icon: Calendar,
    },
    {
      title: "Budget",
      value: movie.budget
        ? `$${movie.budget.toLocaleString()}`
        : "Unknown",
      icon: DollarSign,
    },
    {
      title: "Revenue",
      value: movie.revenue
        ? `$${movie.revenue.toLocaleString()}`
        : "Unknown",
      icon: DollarSign,
    },
    {
      title: "Language",
      value:
        movie.original_language?.toUpperCase() || "--",
      icon: Languages,
    },
    {
      title: "Homepage",
      value: movie.homepage
        ? "Available"
        : "Unavailable",
      icon: Globe,
    },
    {
      title: "Countries",
      value:
        movie.production_countries
          ?.map((c) => c.name)
          .join(", ") || "--",
      icon: Globe,
    },
    {
      title: "Companies",
      value:
        movie.production_companies
          ?.slice(0, 3)
          .map((c) => c.name)
          .join(", ") || "--",
      icon: Building2,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="
        rounded-[36px]
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-3xl
      "
    >
      <div className="mb-8 flex items-center gap-4">

        <div
          className="
            rounded-2xl
            bg-[#FFD464]/15
            p-3
            text-[#FFD464]
          "
        >
          <Film size={26} />
        </div>

        <div>

          <h2 className="text-3xl font-black">
            Movie Facts
          </h2>

          <p className="mt-1 text-zinc-400">
            Complete production details
          </p>

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {facts.map((fact, index) => {

          const Icon = fact.icon;

          return (

            <motion.div
              key={fact.title}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.05,
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
              "
            >
              <div className="flex gap-4">

                <div
                  className="
                    rounded-2xl
                    bg-[#FFD464]/10
                    p-3
                    text-[#FFD464]
                    transition
                    group-hover:bg-[#FFD464]
                    group-hover:text-black
                  "
                >
                  <Icon size={22} />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-sm text-zinc-400">
                    {fact.title}
                  </p>

                  <p className="mt-2 break-words font-semibold">
                    {fact.value}
                  </p>

                </div>

              </div>

            </motion.div>

          );

        })}

      </div>
    </motion.section>
  );
}