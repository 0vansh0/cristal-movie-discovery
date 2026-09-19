import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Briefcase,
  Globe,
  Users,
  Star,
  Heart,
  Cake,
  ExternalLink,
} from "lucide-react";

export default function ActorInfo({ actor }) {
  if (!actor) return null;

  const age = actor.birthday
    ? new Date().getFullYear() -
      new Date(actor.birthday).getFullYear()
    : "--";

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.4,
      }}
      className="
        mt-10
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

        <div>

          <h2 className="text-3xl font-black">
            Personal Information
          </h2>

          <p className="mt-2 text-zinc-400">
            Official TMDB profile information
          </p>

        </div>

      </div>

      {/* Grid */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <InfoCard
          icon={<Briefcase size={22} />}
          title="Known For"
          value={actor.known_for_department}
        />

        <InfoCard
          icon={<Cake size={22} />}
          title="Birthday"
          value={
            actor.birthday
              ? `${actor.birthday} (${age} Years)`
              : "Unknown"
          }
        />

        <InfoCard
          icon={<MapPin size={22} />}
          title="Place of Birth"
          value={
            actor.place_of_birth ||
            "Unknown"
          }
        />

        <InfoCard
          icon={<Users size={22} />}
          title="Gender"
          value={
            actor.gender === 1
              ? "Female"
              : actor.gender === 2
              ? "Male"
              : "Not Specified"
          }
        />

        <InfoCard
          icon={<Star size={22} />}
          title="Popularity"
          value={Math.round(actor.popularity)}
        />

        <InfoCard
          icon={<Heart size={22} />}
          title="Known Credits"
          value={
            actor.combined_credits?.cast
              ?.length || "--"
          }
        />

      </div>

      {/* Also Known As */}

      {actor.also_known_as?.length > 0 && (

        <div className="mt-10">

          <h3 className="mb-5 text-xl font-bold">
            Also Known As
          </h3>

          <div className="flex flex-wrap gap-3">

            {actor.also_known_as.map(
              (name, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    y: -4,
                  }}
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-black/20
                    px-5
                    py-2
                  "
                >
                  {name}
                </motion.div>

              )
            )}

          </div>

        </div>

      )}

      {/* Homepage */}

      {actor.homepage && (

        <motion.a
          whileHover={{
            x: 5,
          }}
          href={actor.homepage}
          target="_blank"
          rel="noreferrer"
          className="
            mt-10
            inline-flex
            items-center
            gap-3
            rounded-full
            bg-[#FFD464]
            px-6
            py-3
            font-semibold
            text-black
          "
        >
          <Globe size={18} />

          Official Website

          <ExternalLink size={16} />

        </motion.a>

      )}

    </motion.section>
  );
}

/* -------------------------------- */

function InfoCard({
  icon,
  title,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className="
        rounded-3xl
        border
        border-white/10
        bg-black/20
        p-6
        transition
      "
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFD464]/15 text-[#FFD464]">
        {icon}
      </div>

      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <h3 className="mt-2 text-lg font-bold break-words">
        {value}
      </h3>
    </motion.div>
  );
}