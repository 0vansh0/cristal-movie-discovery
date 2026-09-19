import { motion } from "framer-motion";
import {
  PlayCircle,
  Heart,
  MessageSquare,
  Bookmark,
  Star,
} from "lucide-react";

const timeline = [
  {
    id: 1,
    type: "Watched",
    icon: PlayCircle,
    color: "from-red-500 to-orange-500",
    title: "Finished watching Dune: Part Two",
    time: "Today • 8:42 PM",
  },
  {
    id: 2,
    type: "Reviewed",
    icon: MessageSquare,
    color: "from-cyan-500 to-blue-500",
    title: "Posted a review for Interstellar",
    time: "Yesterday • 10:10 PM",
  },
  {
    id: 3,
    type: "Liked",
    icon: Heart,
    color: "from-pink-500 to-red-500",
    title: "Liked The Dark Knight",
    time: "2 Days Ago",
  },
  {
    id: 4,
    type: "Watchlist",
    icon: Bookmark,
    color: "from-yellow-400 to-orange-500",
    title: "Added Oppenheimer to Watchlist",
    time: "Last Week",
  },
  {
    id: 5,
    type: "Rated",
    icon: Star,
    color: "from-amber-400 to-yellow-500",
    title: "Rated Inception 5 Stars",
    time: "Last Week",
  },
];

export default function ProfileTimeline() {
  return (
    <section>

      <div className="mb-10">

        <h2 className="text-3xl font-black">
          Activity Timeline
        </h2>

        <p className="mt-2 text-zinc-400">
          Everything you've done recently.
        </p>

      </div>

      <div className="relative">

        {/* Vertical Line */}

        <div className="absolute left-8 top-0 h-full w-[3px] rounded-full bg-gradient-to-b from-[#FFD464] via-[#FF5E5E] to-transparent" />

        <div className="space-y-8">

          {timeline.map((item, index) => {

            const Icon = item.icon;

            return (

              <motion.div
                key={item.id}
                initial={{
                  opacity: 0,
                  x: -40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  x: 8,
                }}
                className="relative flex gap-6"
              >

                {/* Icon */}

                <div
                  className={`
                    relative
                    z-10
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-gradient-to-br
                    ${item.color}
                    shadow-2xl
                  `}
                >
                  <Icon
                    size={28}
                    className="text-black"
                  />
                </div>

                {/* Card */}

                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  className="
                    flex-1
                    rounded-[28px]
                    border
                    border-white/10
                    bg-white/5
                    p-6
                    backdrop-blur-2xl
                  "
                >

                  <div className="flex items-center justify-between">

                    <span
                      className={`
                        rounded-full
                        bg-gradient-to-r
                        ${item.color}
                        px-3
                        py-1
                        text-xs
                        font-bold
                        text-black
                      `}
                    >
                      {item.type}
                    </span>

                    <span className="text-sm text-zinc-500">
                      {item.time}
                    </span>

                  </div>

                  <h3 className="mt-5 text-xl font-semibold">
                    {item.title}
                  </h3>

                </motion.div>

              </motion.div>

            );

          })}

        </div>

      </div>

    </section>
  );
}