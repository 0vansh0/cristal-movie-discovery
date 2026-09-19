import { motion } from "framer-motion";
import {
  Star,
  Heart,
  MessageCircle,
  ThumbsUp,
  MoreHorizontal,
} from "lucide-react";

const reviews = [
  {
    id: 1,
    movie: "Interstellar",
    poster:
      "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    rating: 5,
    likes: 214,
    comments: 31,
    time: "2 days ago",
    review:
      "Christopher Nolan's masterpiece. The emotional ending, music, and visuals create one of the greatest cinematic experiences ever made.",
  },
  {
    id: 2,
    movie: "The Dark Knight",
    poster:
      "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 5,
    likes: 178,
    comments: 18,
    time: "1 week ago",
    review:
      "Heath Ledger delivers one of the greatest performances in film history. Every scene is unforgettable.",
  },
  {
    id: 3,
    movie: "Dune Part Two",
    poster:
      "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    rating: 4.5,
    likes: 95,
    comments: 12,
    time: "2 weeks ago",
    review:
      "A visual spectacle with breathtaking cinematography and incredible world building.",
  },
];

export default function ProfileReviews() {
  return (
    <section>

      <div className="mb-8">
        <h2 className="text-3xl font-black">
          My Reviews
        </h2>

        <p className="mt-2 text-zinc-400">
          Share your thoughts with the community.
        </p>
      </div>

      <div className="space-y-8">

        {reviews.map((review, index) => (

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
            transition={{
              delay: index * .1,
            }}
            whileHover={{
              y: -6,
            }}
            className="
              group
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-2xl
            "
          >

            <div className="flex flex-col md:flex-row">

              {/* Poster */}

              <img
                src={review.poster}
                alt={review.movie}
                className="h-[260px] w-full object-cover md:w-[180px]"
              />

              {/* Content */}

              <div className="flex-1 p-8">

                <div className="flex items-start justify-between">

                  <div>

                    <h3 className="text-2xl font-bold">
                      {review.movie}
                    </h3>

                    <p className="mt-1 text-zinc-500">
                      {review.time}
                    </p>

                  </div>

                  <button className="rounded-full p-2 hover:bg-white/10">
                    <MoreHorizontal />
                  </button>

                </div>

                {/* Rating */}

                <div className="mt-5 flex gap-1">

                  {[1,2,3,4,5].map((star)=>(
                    <Star
                      key={star}
                      size={20}
                      fill={
                        star <= Math.floor(review.rating)
                          ? "#FFD464"
                          : "transparent"
                      }
                      color="#FFD464"
                    />
                  ))}

                </div>

                {/* Review */}

                <p className="mt-6 leading-8 text-zinc-300">
                  {review.review}
                </p>

                {/* Actions */}

                <div className="mt-8 flex flex-wrap gap-6">

                  <motion.button
                    whileTap={{
                      scale:.9,
                    }}
                    className="flex items-center gap-2 text-zinc-400 hover:text-red-400"
                  >
                    <Heart size={18}/>
                    {review.likes}
                  </motion.button>

                  <motion.button
                    whileTap={{
                      scale:.9,
                    }}
                    className="flex items-center gap-2 text-zinc-400 hover:text-sky-400"
                  >
                    <MessageCircle size={18}/>
                    {review.comments}
                  </motion.button>

                  <motion.button
                    whileTap={{
                      scale:.9,
                    }}
                    className="flex items-center gap-2 text-zinc-400 hover:text-green-400"
                  >
                    <ThumbsUp size={18}/>
                    Helpful
                  </motion.button>

                </div>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}