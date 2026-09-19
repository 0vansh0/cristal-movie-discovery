import { motion } from "framer-motion";
import {
  MessageSquare,
  ChevronRight,
  Star,
} from "lucide-react";

import ReviewCard from "./ReviewCard";

export default function ReviewsSection({
  reviews = [],
}) {
  if (!reviews.length) return null;

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

      <div className="mb-8 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div
            className="
              rounded-2xl
              bg-[#FFD464]/15
              p-3
              text-[#FFD464]
            "
          >
            <MessageSquare size={26} />
          </div>

          <div>

            <h2 className="text-3xl font-black">
              Reviews
            </h2>

            <p className="mt-1 text-zinc-400">
              Community Opinions
            </p>

          </div>

        </div>

        <button
          className="
            flex
            items-center
            gap-2
            rounded-full
            border
            border-white/10
            bg-black/30
            px-5
            py-3
            transition
            hover:border-[#FFD464]
          "
        >
          View All

          <ChevronRight size={18} />

        </button>

      </div>

      {/* Stats */}

      <div className="mb-8 grid gap-5 md:grid-cols-3">

        <StatCard
          title="Total Reviews"
          value={reviews.length}
        />

        <StatCard
          title="Community Score"
          value="9.2"
        />

        <StatCard
          title="Average Rating"
          value={
            <div className="flex items-center gap-2">
              <Star
                size={18}
                className="fill-yellow-400 text-yellow-400"
              />
              4.8 / 5
            </div>
          }
        />

      </div>

      {/* Review Cards */}

      <div className="space-y-6">

        {reviews.slice(0, 6).map((review, index) => (

          <motion.div
            key={review.id}
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
          >
            <ReviewCard review={review} />
          </motion.div>

        ))}

      </div>

    </motion.section>
  );
}

function StatCard({
  title,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="
        rounded-3xl
        border
        border-white/10
        bg-black/30
        p-6
        backdrop-blur-xl
      "
    >
      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <div className="mt-3 text-2xl font-bold">
        {value}
      </div>

    </motion.div>
  );
}