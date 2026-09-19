import { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  ThumbsUp,
  Pencil,
  Trash2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const POSTER =
  "https://image.tmdb.org/t/p/w500";

export default function ReviewsGrid({
  reviews = [],
  onEdit,
  onDelete,
  onMovieClick,
}) {
  if (!reviews.length) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-black">
            Your Reviews
          </h2>

          <p className="mt-2 text-zinc-400">
            Reviews you've shared with the community.
          </p>

        </div>

        <span
          className="
            rounded-full
            bg-green-500/20
            px-5
            py-2
            font-semibold
            text-green-400
          "
        >
          {reviews.length} Reviews
        </span>

      </div>

      <div className="space-y-8">

        {reviews.map((review) => (

          <ReviewCard
            key={review.id}
            review={review}
            onEdit={onEdit}
            onDelete={onDelete}
            onMovieClick={onMovieClick}
          />

        ))}

      </div>

    </section>
  );
}

function ReviewCard({
  review,
  onEdit,
  onDelete,
  onMovieClick,
}) {
  const [expanded, setExpanded] =
    useState(false);

  const LIMIT = 280;

  const isLong =
    review.content.length > LIMIT;

  const text =
    expanded || !isLong
      ? review.content
      : review.content.slice(0, LIMIT) + "...";

  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className="
        overflow-hidden
        rounded-[30px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-3xl
      "
    >

      <div className="flex flex-col lg:flex-row">

        {/* Poster */}

        <img
          src={
            review.poster_path
              ? POSTER +
                review.poster_path
              : "/poster.png"
          }
          alt={review.title}
          onClick={() =>
            onMovieClick?.(review.id)
          }
          className="
            h-72
            w-full
            cursor-pointer
            object-cover
            lg:w-52
          "
        />

        {/* Content */}

        <div className="flex-1 p-8">

          <div className="flex items-start justify-between">

            <div>

              <h3 className="text-3xl font-black">

                {review.title}

              </h3>

              <div className="mt-4 flex gap-1">

                {[...Array(10)].map((_, i) => (

                  <Star
                    key={i}
                    size={18}
                    fill={
                      i <
                      review.rating
                        ? "currentColor"
                        : "none"
                    }
                    className={
                      i <
                      review.rating
                        ? "text-yellow-400"
                        : "text-zinc-600"
                    }
                  />

                ))}

              </div>

            </div>

            {review.spoiler && (

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-red-500/15
                  px-4
                  py-2
                  text-red-400
                "
              >

                <AlertTriangle size={16} />

                Spoiler

              </div>

            )}

          </div>

          <p
            className="
              mt-8
              whitespace-pre-line
              leading-8
              text-zinc-300
            "
          >
            {text}
          </p>

          {isLong && (

            <button
              onClick={() =>
                setExpanded(!expanded)
              }
              className="
                mt-5
                flex
                items-center
                gap-2
                text-[#FFD464]
              "
            >

              {expanded
                ? "Show Less"
                : "Read More"}

              {expanded
                ? <ChevronUp size={18}/>
                : <ChevronDown size={18}/>
              }

            </button>

          )}

          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              justify-between
              gap-4
            "
          >

            <div className="flex gap-6">

              <span className="flex items-center gap-2">

                <ThumbsUp size={18} />

                {review.likes}

              </span>

              <span className="text-zinc-400">

                {review.createdAt}

              </span>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  onEdit?.(review)
                }
                className="
                  rounded-xl
                  bg-[#FFD464]
                  px-5
                  py-3
                  font-bold
                  text-black
                "
              >

                <Pencil
                  className="mr-2 inline"
                  size={16}
                />

                Edit

              </button>

              <button
                onClick={() =>
                  onDelete?.(review)
                }
                className="
                  rounded-xl
                  border
                  border-red-500/30
                  bg-red-500/10
                  px-5
                  py-3
                  text-red-400
                "
              >

                <Trash2
                  className="mr-2 inline"
                  size={16}
                />

                Delete

              </button>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}