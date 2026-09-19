import { motion } from "framer-motion";
import {
  Calendar,
  Edit3,
  Share2,
  CheckCircle2,
  MapPin,
  Link2,
  Star,
} from "lucide-react";

const COVER =
  "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80";

export default function UserHero({
  user,
  onEdit,
  onShare,
}) {
  if (!user) return null;

  return (
    <section className="relative overflow-hidden rounded-[40px]">

      {/* Cover */}

      <div className="relative h-[420px]">

        <img
          src={user.cover || COVER}
          alt="Cover"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/60 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      </div>

      {/* Profile */}

      <div
        className="
          relative
          -mt-24
          flex
          flex-col
          gap-8
          px-10
          pb-10
          lg:flex-row
          lg:items-end
        "
      >

        {/* Avatar */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative"
        >

          <img
            src={user.avatar}
            alt={user.name}
            className="
              h-44
              w-44
              rounded-full
              border-4
              border-white/20
              object-cover
              shadow-2xl
            "
          />

          {user.verified && (

            <div
              className="
                absolute
                bottom-2
                right-2
                rounded-full
                bg-blue-500
                p-2
              "
            >

              <CheckCircle2 size={22} />

            </div>

          )}

        </motion.div>

        {/* Info */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="flex-1"
        >

          <div className="flex flex-wrap items-center gap-4">

            <h1 className="text-5xl font-black">

              {user.name}

            </h1>

            {user.premium && (

              <span
                className="
                  rounded-full
                  bg-[#FFD464]
                  px-4
                  py-2
                  text-sm
                  font-bold
                  text-black
                "
              >
                Premium
              </span>

            )}

          </div>

          <p className="mt-5 max-w-3xl text-lg text-zinc-300">

            {user.bio}

          </p>

          <div className="mt-6 flex flex-wrap gap-6 text-zinc-400">

            <span className="flex items-center gap-2">
              <Calendar size={18} />
              Joined {user.joined}
            </span>

            {user.location && (

              <span className="flex items-center gap-2">
                <MapPin size={18} />
                {user.location}
              </span>

            )}

            {user.website && (

              <a
                href={user.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white"
              >
                <Link2 size={18} />
                Website
              </a>

            )}

          </div>

          {/* Quick Stats */}

          <div className="mt-8 flex flex-wrap gap-8">

            <div>
              <p className="text-3xl font-black">
                {user.followers}
              </p>
              <p className="text-zinc-400">
                Followers
              </p>
            </div>

            <div>
              <p className="text-3xl font-black">
                {user.following}
              </p>
              <p className="text-zinc-400">
                Following
              </p>
            </div>

            <div>
              <p className="text-3xl font-black">
                {user.movies}
              </p>
              <p className="text-zinc-400">
                Movies
              </p>
            </div>

            <div>
              <p className="text-3xl font-black">
                {user.tv}
              </p>
              <p className="text-zinc-400">
                TV Shows
              </p>
            </div>

            <div>
              <p className="text-3xl font-black">
                {user.rating}
              </p>
              <p className="text-zinc-400">
                Avg Rating
              </p>
            </div>

          </div>

        </motion.div>

        {/* Actions */}

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          className="flex gap-4"
        >

          <button
            onClick={onEdit}
            className="
              flex
              items-center
              gap-3
              rounded-full
              bg-[#FFD464]
              px-8
              py-4
              font-bold
              text-black
            "
          >

            <Edit3 size={18} />

            Edit Profile

          </button>

          <button
            onClick={onShare}
            className="
              flex
              items-center
              gap-3
              rounded-full
              border
              border-white/15
              bg-white/10
              px-8
              py-4
              backdrop-blur-xl
            "
          >

            <Share2 size={18} />

            Share

          </button>

        </motion.div>

      </div>

      {/* Floating Rating */}

      <motion.div
        initial={{
          opacity: 0,
          scale: .8,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="
          absolute
          right-10
          top-10
          hidden
          rounded-3xl
          border
          border-white/10
          bg-white/10
          p-6
          backdrop-blur-3xl
          xl:block
        "
      >

        <div className="flex items-center gap-3">

          <Star
            className="text-yellow-400"
            fill="currentColor"
          />

          <div>

            <h3 className="text-3xl font-black">
              {user.rating}
            </h3>

            <p className="text-sm text-zinc-400">
              Community Rating
            </p>

          </div>

        </div>

      </motion.div>

    </section>
  );
}