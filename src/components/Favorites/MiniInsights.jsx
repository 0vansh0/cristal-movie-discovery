import { motion } from "framer-motion";
import {
  Clock3,
  Star,
  Globe,
  CalendarDays,
  Film,
  Award,
} from "lucide-react";

const insights = [
  {
    title: "Longest Movie",
    value: "3h 42m",
    subtitle: "The Irishman",
    icon: Clock3,
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    title: "Highest Rated",
    value: "10.0",
    subtitle: "The Godfather",
    icon: Star,
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    title: "Most Language",
    value: "English",
    subtitle: "64 Movies",
    icon: Globe,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Favorite Decade",
    value: "2010s",
    subtitle: "145 Movies",
    icon: CalendarDays,
    gradient: "from-pink-500 to-rose-500",
  },
  {
    title: "Top Genre",
    value: "Drama",
    subtitle: "92 Favorites",
    icon: Film,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Top Collection",
    value: "Christopher Nolan",
    subtitle: "12 Movies",
    icon: Award,
    gradient: "from-orange-500 to-red-500",
  },
];

export default function MiniInsights() {
  return (
    <section className="mt-16">

      <div className="mb-8">

        <h2 className="text-3xl font-black">
          Quick Insights
        </h2>

        <p className="mt-2 text-zinc-400">
          Interesting facts about your favorites.
        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {insights.map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={item.title}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.08,
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
                  -right-8
                  -top-8
                  h-28
                  w-28
                  rounded-full
                  bg-gradient-to-br
                  ${item.gradient}
                  opacity-20
                  blur-3xl
                `}
              />

              {/* Icon */}

              <div
                className={`
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  ${item.gradient}
                `}
              >
                <Icon
                  size={24}
                  className="text-black"
                />
              </div>

              <p className="mt-6 text-zinc-400">
                {item.title}
              </p>

              <h3 className="mt-2 text-3xl font-black">
                {item.value}
              </h3>

              <p className="mt-2 text-sm text-zinc-500">
                {item.subtitle}
              </p>

            </motion.div>

          );

        })}

      </div>

    </section>
  );
}
