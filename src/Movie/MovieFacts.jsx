import { motion } from "framer-motion";
import {
  DollarSign,
  Film,
  Calendar,
  Clock3,
  Globe2,
  Building2,
  Languages,
  Trophy,
} from "lucide-react";

export default function MovieFacts({ movie }) {
  if (!movie) return null;

  const facts = [
    {
      icon: <Calendar size={20} />,
      label: "Release Date",
      value: movie.release_date || "Unknown",
    },
    {
      icon: <Clock3 size={20} />,
      label: "Runtime",
      value: movie.runtime
        ? `${movie.runtime} min`
        : "Unknown",
    },
    {
      icon: <Globe2 size={20} />,
      label: "Country",
      value:
        movie.production_countries?.[0]?.name ||
        "Unknown",
    },
    {
      icon: <Languages size={20} />,
      label: "Language",
      value:
        movie.spoken_languages
          ?.map((l) => l.english_name)
          .join(", ") || "Unknown",
    },
    {
      icon: <DollarSign size={20} />,
      label: "Budget",
      value: movie.budget
        ? `$${movie.budget.toLocaleString()}`
        : "Unknown",
    },
    {
      icon: <Trophy size={20} />,
      label: "Revenue",
      value: movie.revenue
        ? `$${movie.revenue.toLocaleString()}`
        : "Unknown",
    },
    {
      icon: <Building2 size={20} />,
      label: "Studio",
      value:
        movie.production_companies?.[0]?.name ||
        "Unknown",
    },
    {
      icon: <Film size={20} />,
      label: "Status",
      value: movie.status || "Released",
    },
  ];

  return (
    <section className="mt-24">
      <h2 className="mb-8 text-3xl font-black">
        Movie Facts
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {facts.map((fact, index) => (
          <motion.div
            key={fact.label}
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              delay: index * 0.05,
            }}
            whileHover={{
              y: -8,
            }}
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FF5E5E] to-[#FFD464] text-black">
              {fact.icon}
            </div>

            <p className="text-sm text-zinc-400">
              {fact.label}
            </p>

            <h3 className="mt-2 font-semibold text-white">
              {fact.value}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}