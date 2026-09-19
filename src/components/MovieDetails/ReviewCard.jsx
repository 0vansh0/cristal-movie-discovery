import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Star,
  ThumbsUp,
  Calendar,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ReviewCard({
  review,
}) {
  const [expanded, setExpanded] = useState(false);

  const author = review?.author || "Anonymous";

  const avatar =
    review?.author_details?.avatar_path;

  const rating =
    review?.author_details?.rating ?? null;

  const content = review?.content || "";

  const shouldCollapse =
    content.length > 320;

  const preview = shouldCollapse
    ? `${content.slice(0, 320)}...`
    : content;

  const avatarUrl = useMemo(() => {
    if (!avatar) return null;

    if (avatar.startsWith("/http")) {
      return avatar.substring(1);
    }

    return `https://image.tmdb.org/t/p/w185${avatar}`;
  }, [avatar]);

  if (!review) return null;

  return (
    <motion.article
      whileHover={{
        y: -6,
      }}
      className="
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-3xl
      "
    >
      {/* Header */}

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-between
          gap-5
          border-b
          border-white/10
          p-6
        "
      >

        <div className="flex items-center gap-4">

          {avatarUrl ? (

            <img
              src={avatarUrl}
              alt={author}
              className="
                h-16
                w-16
                rounded-full
                object-cover
              "
            />

          ) : (

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                bg-[#FFD464]/15
              "
            >
              <User
                className="text-[#FFD464]"
                size={28}
              />
            </div>

          )}

          <div>

            <h3 className="text-xl font-bold">
              {author}
            </h3>

            <div className="mt-2 flex flex-wrap gap-4 text-sm text-zinc-400">

              <span className="flex items-center gap-2">

                <Calendar size={15} />

                {review.created_at
                  ?.slice(0, 10)}

              </span>

              {rating && (

                <span className="flex items-center gap-2">

                  <Star
                    size={15}
                    className="
                      fill-yellow-400
                      text-yellow-400
                    "
                  />

                  {rating}/10

                </span>

              )}

            </div>

          </div>

        </div>

        <div
          className="
            rounded-full
            bg-[#FFD464]
            px-5
            py-2
            font-bold
            text-black
          "
        >
          Verified
        </div>

      </div>

      {/* Content */}

      <div className="p-6">

        <motion.p
          layout
          className="
            whitespace-pre-line
            leading-8
            text-zinc-300
          "
        >
          {expanded ? content : preview}
        </motion.p>

        {shouldCollapse && (

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: .95,
            }}
            onClick={() =>
              setExpanded(!expanded)
            }
            className="
              mt-5
              flex
              items-center
              gap-2
              font-semibold
              text-[#FFD464]
            "
          >
            {expanded ? (
              <>
                Show Less
                <ChevronUp size={18}/>
              </>
            ) : (
              <>
                Read More
                <ChevronDown size={18}/>
              </>
            )}
          </motion.button>

        )}

      </div>

      {/* Footer */}

      <div
        className="
          flex
          items-center
          justify-between
          border-t
          border-white/10
          p-6
        "
      >

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: .95,
          }}
          className="
            flex
            items-center
            gap-2
            rounded-full
            bg-white/5
            px-5
            py-3
          "
        >
          <ThumbsUp size={18} />

          Helpful

        </motion.button>

        <p className="text-sm text-zinc-500">
          TMDB Community Review
        </p>

      </div>

    </motion.article>
  );
}