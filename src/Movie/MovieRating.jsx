import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function MovieRating({ movie }) {
  if (!movie) return null;

  const rating = movie.vote_average || 0;
  const percent = (rating / 10) * 100;

  return (
    <section className="mt-24">
      <h2 className="mb-8 text-3xl font-black">
        Community Rating
      </h2>

      <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl">

        <div className="flex flex-col items-center justify-center gap-8 lg:flex-row">

          {/* Circle */}

          <div className="relative h-44 w-44">

            <svg
              className="-rotate-90"
              width="176"
              height="176"
            >
              <circle
                cx="88"
                cy="88"
                r="74"
                stroke="#222"
                strokeWidth="10"
                fill="none"
              />

              <motion.circle
                cx="88"
                cy="88"
                r="74"
                stroke="#FFD464"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={465}
                initial={{
                  strokeDashoffset: 465,
                }}
                animate={{
                  strokeDashoffset:
                    465 - (465 * percent) / 100,
                }}
                transition={{
                  duration: 1.5,
                }}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <Star
                fill="#FFD464"
                color="#FFD464"
                size={28}
              />

              <span className="mt-2 text-4xl font-black">
                {rating.toFixed(1)}
              </span>

              <span className="text-sm text-zinc-400">
                /10
              </span>

            </div>

          </div>

          {/* Stats */}

          <div className="flex-1 space-y-5">

            <div>
              <div className="mb-2 flex justify-between">
                <span>Audience Score</span>
                <span>{percent.toFixed(0)}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-zinc-800">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${percent}%`,
                  }}
                  transition={{
                    duration: 1.2,
                  }}
                  className="h-full rounded-full bg-gradient-to-r from-[#FF5E5E] to-[#FFD464]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4">

              <div className="rounded-2xl bg-white/5 p-5">
                <p className="text-zinc-400">
                  Total Votes
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {movie.vote_count?.toLocaleString()}
                </h3>
              </div>

              <div className="rounded-2xl bg-white/5 p-5">
                <p className="text-zinc-400">
                  Popularity
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {Math.round(movie.popularity)}
                </h3>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}