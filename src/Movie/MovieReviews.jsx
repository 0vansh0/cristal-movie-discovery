import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
  User,
} from "lucide-react";

export default function MovieReviews({ reviews = [] }) {
  const [expanded, setExpanded] = useState({});

  if (!reviews.length) return null;

  return (
    <section className="mt-24">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-3xl font-black text-white">
          Reviews
        </h2>

        <span className="text-zinc-400">
          {reviews.length} Reviews
        </span>
      </div>

      <div className="space-y-6">

        {reviews.slice(0, 8).map((review, index) => {

          const open = expanded[index];

          return (
            <motion.div
              key={review.id}
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
                delay: index * .08,
              }}
              className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                p-6
                backdrop-blur-xl
              "
            >

              {/* Header */}

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FF5E5E]/20">
                    <User />
                  </div>

                  <div>

                    <h3 className="font-bold text-white">
                      {review.author}
                    </h3>

                    <p className="text-sm text-zinc-400">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-2 rounded-full bg-[#FFD464]/10 px-3 py-2">

                  <Star
                    size={16}
                    fill="#FFD464"
                    color="#FFD464"
                  />

                  <span>
                    {review.author_details?.rating || "--"}
                  </span>

                </div>

              </div>

              {/* Review */}

              <p className="mt-6 leading-8 text-zinc-300">

                {open
                  ? review.content
                  : review.content.slice(0, 260)}

                {review.content.length > 260 && (
                  <>
                    {!open && "..."}
                  </>
                )}

              </p>

              {/* Footer */}

              <div className="mt-6 flex items-center justify-between">

                <button
                  onClick={() =>
                    setExpanded({
                      ...expanded,
                      [index]: !open,
                    })
                  }
                  className="flex items-center gap-2 text-sm text-[#FFD464]"
                >

                  {open ? (
                    <>
                      Show Less
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      Read More
                      <ChevronDown size={16} />
                    </>
                  )}

                </button>

                <button
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-full
                    bg-white/5
                    px-4
                    py-2
                    hover:bg-white/10
                  "
                >

                  <ThumbsUp size={16} />

                  Helpful

                </button>

              </div>

            </motion.div>
          );
        })}

      </div>
    </section>
  );
}