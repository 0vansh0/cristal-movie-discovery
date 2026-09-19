import { motion } from "framer-motion";
import { CalendarDays, Clock3, Star } from "lucide-react";

const history = [
  {
    id: 1,
    title: "Oppenheimer",
    date: "Yesterday",
    duration: "3h 00m",
    rating: 9.5,
    image:
      "https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg",
  },
  {
    id: 2,
    title: "Interstellar",
    date: "3 Days Ago",
    duration: "2h 49m",
    rating: 9.8,
    image:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  },
  {
    id: 3,
    title: "Inception",
    date: "Last Week",
    duration: "2h 28m",
    rating: 9.6,
    image:
      "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
  },
];

export default function ProfileHistory() {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-black">
          Watch History
        </h2>

        <p className="mt-2 text-zinc-400">
          Your recent movie activity.
        </p>
      </div>

      <div className="relative">

        {/* Timeline */}
        <div className="absolute left-10 top-0 h-full w-[2px] bg-gradient-to-b from-[#FF5E5E] via-[#FFD464] to-transparent" />

        <div className="space-y-8">

          {history.map((movie, index) => (

            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ x: 10 }}
              className="relative flex gap-6"
            >
              {/* Timeline Dot */}
              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-[#FF5E5E] to-[#FFD464] shadow-2xl">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </div>

              {/* Card */}
              <div className="flex-1 rounded-[28px] border border-white/10 bg-white/5 p-6 backdrop-blur-2xl transition hover:border-[#FFD464]/40 hover:bg-white/10">

                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

                  <div>
                    <h3 className="text-2xl font-bold">
                      {movie.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-5 text-zinc-400">

                      <span className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        {movie.date}
                      </span>

                      <span className="flex items-center gap-2">
                        <Clock3 size={16} />
                        {movie.duration}
                      </span>

                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 backdrop-blur-xl">

                    <Star
                      size={18}
                      fill="#FFD464"
                      color="#FFD464"
                    />

                    <span className="font-semibold">
                      {movie.rating}
                    </span>

                  </div>

                </div>

              </div>

            </motion.div>

          ))}

        </div>
      </div>
    </section>
  );
}