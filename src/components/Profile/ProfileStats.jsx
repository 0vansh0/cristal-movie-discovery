import {
  Film,
  Clock3,
  Heart,
  Star,
  MessageSquare,
  Trophy,
  Flame,
  Bookmark,
} from "lucide-react";

import StatsCard from "./StatsCard";

export default function ProfileStats() {
  const stats = [
    {
      title: "Movies Watched",
      value: 548,
      icon: <Film />,
      color: "from-[#FF5E5E] to-[#FF9966]",
    },
    {
      title: "Hours Watched",
      value: 1420,
      icon: <Clock3 />,
      color: "from-[#FFD464] to-[#FFA94D]",
    },
    {
      title: "Watchlist",
      value: 86,
      icon: <Bookmark />,
      color: "from-[#7C5CFC] to-[#4D8BFF]",
    },
    {
      title: "Favorites",
      value: 43,
      icon: <Heart />,
      color: "from-[#FF5E5E] to-[#FF4D8B]",
    },
    {
      title: "Ratings",
      value: 388,
      icon: <Star />,
      color: "from-[#FFD464] to-[#FFE97A]",
    },
    {
      title: "Reviews",
      value: 91,
      icon: <MessageSquare />,
      color: "from-[#00D4FF] to-[#5EEAD4]",
    },
    {
      title: "Achievements",
      value: 17,
      icon: <Trophy />,
      color: "from-[#FACC15] to-[#FB923C]",
    },
    {
      title: "Watch Streak",
      value: 31,
      suffix: "d",
      icon: <Flame />,
      color: "from-[#FF6B6B] to-[#FFD166]",
    },
  ];

  return (
    <section>

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black">
            Your Statistics
          </h2>

          <p className="mt-2 text-zinc-400">
            Your movie journey at a glance.
          </p>

        </div>

      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            {...stat}
          />
        ))}
      </div>

    </section>
  );
}