import { motion } from "framer-motion";
import {
  Heart,
  Star,
  Clock3,
  Film,
  TrendingUp,
  Globe,
  Award,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    title: "Favorites",
    value: "428",
    subtitle: "Movies Loved",
    icon: Heart,
    gradient: "from-pink-500 via-rose-500 to-red-500",
  },
  {
    title: "Average Rating",
    value: "8.9",
    subtitle: "TMDB Average",
    icon: Star,
    gradient: "from-yellow-400 via-orange-400 to-amber-500",
  },
  {
    title: "Watch Time",
    value: "924h",
    subtitle: "Total Runtime",
    icon: Clock3,
    gradient: "from-cyan-400 via-sky-500 to-blue-500",
  },
  {
    title: "Genres",
    value: "23",
    subtitle: "Unique Genres",
    icon: Film,
    gradient: "from-violet-500 via-purple-500 to-indigo-500",
  },
  {
    title: "This Month",
    value: "+17",
    subtitle: "New Favorites",
    icon: TrendingUp,
    gradient: "from-emerald-400 via-green-500 to-lime-500",
  },
  {
    title: "Languages",
    value: "15",
    subtitle: "Across The World",
    icon: Globe,
    gradient: "from-blue-400 via-cyan-500 to-teal-500",
  },
  {
    title: "Achievements",
    value: "12",
    subtitle: "Unlocked",
    icon: Award,
    gradient: "from-orange-500 via-yellow-400 to-amber-300",
  },
  {
    title: "Collections",
    value: "31",
    subtitle: "Custom Lists",
    icon: Sparkles,
    gradient: "from-fuchsia-500 via-pink-500 to-rose-500",
  },
];

export default function StatsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.07,
              duration: 0.5,
            }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-white/5
              p-6
              backdrop-blur-3xl
            "
          >
            {/* Glow */}

            <div
              className={`
                absolute
                -right-10
                -top-10
                h-36
                w-36
                rounded-full
                bg-gradient-to-br
                ${item.gradient}
                opacity-20
                blur-3xl
                transition
                group-hover:opacity-40
              `}
            />

            {/* Icon */}

            <div
              className={`
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                ${item.gradient}
              `}
            >
              <Icon
                size={28}
                className="text-black"
              />
            </div>

            <p className="mt-6 text-zinc-400">
              {item.title}
            </p>

            <h2 className="mt-2 text-5xl font-black">
              {item.value}
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              {item.subtitle}
            </p>

            {/* Progress */}

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width: `${55 + index * 5}%`,
                }}
                transition={{
                  duration: 1,
                  delay: index * 0.1,
                }}
                className={`
                  h-full
                  rounded-full
                  bg-gradient-to-r
                  ${item.gradient}
                `}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}