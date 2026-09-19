import { motion } from "framer-motion";
import {
  Users,
  MessageCircle,
  UserPlus,
  Play,
  Trophy,
} from "lucide-react";

const friends = [
  {
    id: 1,
    name: "Alex Morgan",
    avatar: "https://i.pravatar.cc/300?img=11",
    movie: "Dune: Part Two",
    status: "Watching",
    online: true,
    score: 2840,
  },
  {
    id: 2,
    name: "Emma Watson",
    avatar: "https://i.pravatar.cc/300?img=5",
    movie: "Interstellar",
    status: "Reviewed",
    online: true,
    score: 2510,
  },
  {
    id: 3,
    name: "James Lee",
    avatar: "https://i.pravatar.cc/300?img=18",
    movie: "The Batman",
    status: "Completed",
    online: false,
    score: 2185,
  },
  {
    id: 4,
    name: "Sophia Carter",
    avatar: "https://i.pravatar.cc/300?img=32",
    movie: "Oppenheimer",
    status: "Watching",
    online: true,
    score: 1970,
  },
];

export default function ProfileFriends() {
  return (
    <section>

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-black">
            Friends Activity
          </h2>

          <p className="mt-2 text-zinc-400">
            See what your friends are watching.
          </p>

        </div>

        <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FF5E5E] to-[#FFD464] px-5 py-3 font-semibold text-black transition hover:scale-105">
          <UserPlus size={18} />
          Add Friend
        </button>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        {friends.map((friend, index) => (

          <motion.div
            key={friend.id}
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -8,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-white/5
              p-6
              backdrop-blur-2xl
            "
          >

            {/* Glow */}

            <div className="absolute inset-0 bg-gradient-to-br from-[#FF5E5E]/10 via-[#FFD464]/5 to-transparent opacity-0 blur-3xl transition group-hover:opacity-100" />

            <div className="relative flex items-center gap-5">

              {/* Avatar */}

              <div className="relative">

                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="h-20 w-20 rounded-full object-cover"
                />

                <span
                  className={`absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-[#080B12] ${
                    friend.online
                      ? "bg-green-500"
                      : "bg-zinc-500"
                  }`}
                />

              </div>

              {/* Info */}

              <div className="flex-1">

                <h3 className="text-xl font-bold">
                  {friend.name}
                </h3>

                <p className="mt-1 text-zinc-400">
                  {friend.status}
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm text-zinc-300">

                  <Play
                    size={15}
                    className="text-[#FFD464]"
                  />

                  {friend.movie}

                </div>

              </div>

              {/* Score */}

              <div className="rounded-2xl bg-white/10 px-4 py-3 text-center">

                <Trophy
                  className="mx-auto mb-2 text-yellow-400"
                  size={22}
                />

                <p className="font-bold">
                  {friend.score}
                </p>

                <p className="text-xs text-zinc-500">
                  XP
                </p>

              </div>

            </div>

            {/* Buttons */}

            <div className="mt-8 flex gap-4">

              <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-white/10 py-3 transition hover:bg-white/20">
                <MessageCircle size={18} />
                Message
              </button>

              <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FF5E5E] to-[#FFD464] py-3 font-semibold text-black transition hover:scale-105">
                <Users size={18} />
                Profile
              </button>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}