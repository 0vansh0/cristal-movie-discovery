import { motion } from "framer-motion";
import { User } from "lucide-react";

const IMAGE = "https://image.tmdb.org/t/p/w300";

export default function MovieCast({ cast = [] }) {
  if (!cast.length) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-20"
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-black text-white">
          Cast
        </h2>

        <span className="text-sm text-zinc-400">
          {cast.length} Actors
        </span>
      </div>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4">

        {cast.slice(0, 20).map((actor, index) => (

          <motion.div
            key={actor.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.05,
            }}
            whileHover={{
              y: -10,
              scale: 1.05,
            }}
            className="
              group
              w-[170px]
              shrink-0
            "
          >
            <div
              className="
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
              "
            >
              {actor.profile_path ? (
                <img
                  src={`${IMAGE}${actor.profile_path}`}
                  alt={actor.name}
                  className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-[220px] items-center justify-center bg-zinc-900">
                  <User
                    size={70}
                    className="text-zinc-500"
                  />
                </div>
              )}

              <div className="p-4">

                <h3 className="truncate font-bold text-white">
                  {actor.name}
                </h3>

                <p className="mt-1 truncate text-sm text-zinc-400">
                  {actor.character}
                </p>

              </div>

            </div>
          </motion.div>

        ))}

      </div>
    </motion.section>
  );
}