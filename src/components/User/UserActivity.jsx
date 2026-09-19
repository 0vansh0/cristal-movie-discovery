import { motion } from "framer-motion";
import {
  Film,
  Tv,
  Star,
  Heart,
  Bookmark,
  MessageSquare,
  ListVideo,
  Clock3,
} from "lucide-react";

const icons = {
  watched: Film,
  tv: Tv,
  rating: Star,
  favorite: Heart,
  watchlist: Bookmark,
  review: MessageSquare,
  list: ListVideo,
};

const colors = {
  watched: "text-sky-400",
  tv: "text-violet-400",
  rating: "text-yellow-400",
  favorite: "text-red-400",
  watchlist: "text-orange-400",
  review: "text-green-400",
  list: "text-cyan-400",
};

export default function UserActivity({
  activities = [],
}) {
  if (!activities.length) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div>

        <h2 className="text-4xl font-black">
          Recent Activity
        </h2>

        <p className="mt-2 text-zinc-400">
          Everything you've done recently.
        </p>

      </div>

      <div className="relative">

        {/* Timeline Line */}

        <div
          className="
            absolute
            left-8
            top-0
            bottom-0
            w-[2px]
            bg-white/10
          "
        />

        <div className="space-y-8">

          {activities.map((activity, index) => {

            const Icon =
              icons[activity.type] || Clock3;

            return (

              <motion.div
                key={activity.id}
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                className="
                  relative
                  flex
                  gap-6
                "
              >

                {/* Timeline Node */}

                <div
                  className="
                    relative
                    z-10
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-[#0B0B0B]
                  "
                >

                  <Icon
                    size={26}
                    className={
                      colors[activity.type]
                    }
                  />

                </div>

                {/* Card */}

                <motion.div
                  whileHover={{
                    y: -4,
                  }}
                  className="
                    flex-1
                    rounded-[28px]
                    border
                    border-white/10
                    bg-white/5
                    p-6
                    backdrop-blur-3xl
                  "
                >

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-6
                    "
                  >

                    <div>

                      <h3 className="text-xl font-bold">

                        {activity.title}

                      </h3>

                      <p className="mt-2 text-zinc-400">

                        {activity.description}

                      </p>

                    </div>

                    {activity.poster && (

                      <img
                        src={activity.poster}
                        alt={activity.title}
                        className="
                          h-28
                          w-20
                          rounded-xl
                          object-cover
                        "
                      />

                    )}

                  </div>

                  <div
                    className="
                      mt-6
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <span
                      className="
                        rounded-full
                        bg-white/10
                        px-4
                        py-2
                        text-sm
                        text-zinc-300
                      "
                    >

                      {activity.type}

                    </span>

                    <span className="text-sm text-zinc-500">

                      {activity.time}

                    </span>

                  </div>

                </motion.div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}