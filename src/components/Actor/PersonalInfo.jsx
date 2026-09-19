import { motion } from "framer-motion";
import {
  User,
  Cake,
  MapPin,
  Calendar,
  Briefcase,
  Globe,
  Users,
  Star,
  BadgeCheck,
  Tag,
} from "lucide-react";

export default function PersonalInfo({
  actor,
}) {
  if (!actor) return null;

  const age = actor.birthday
    ? Math.floor(
        (Date.now() -
          new Date(actor.birthday)) /
          (1000 * 60 * 60 * 24 * 365.25)
      )
    : "--";

  const gender =
    actor.gender === 1
      ? "Female"
      : actor.gender === 2
      ? "Male"
      : "Unknown";

  const items = [
    {
      icon: <User size={20} />,
      label: "Full Name",
      value: actor.name,
    },
    {
      icon: <Cake size={20} />,
      label: "Birthday",
      value: actor.birthday || "Unknown",
    },
    {
      icon: <Calendar size={20} />,
      label: "Age",
      value: age,
    },
    {
      icon: <MapPin size={20} />,
      label: "Place of Birth",
      value:
        actor.place_of_birth ||
        "Unknown",
    },
    {
      icon: <Users size={20} />,
      label: "Gender",
      value: gender,
    },
    {
      icon: <Briefcase size={20} />,
      label: "Department",
      value:
        actor.known_for_department,
    },
    {
      icon: <Star size={20} />,
      label: "Popularity",
      value: Math.round(
        actor.popularity || 0
      ),
    },
    {
      icon: <BadgeCheck size={20} />,
      label: "Adult Content",
      value: actor.adult
        ? "Yes"
        : "No",
    },
  ];

  return (
    <section className="space-y-8">

      {/* Header */}

      <div>

        <h2 className="text-4xl font-black">
          Personal Information
        </h2>

        <p className="mt-2 text-zinc-400">
          Official information from TMDB
        </p>

      </div>

      {/* Grid */}

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
        "
      >

        {items.map((item) => (

          <motion.div
            key={item.label}
            whileHover={{
              y: -5,
            }}
            className="
              rounded-[30px]
              border
              border-white/10
              bg-white/5
              p-6
              backdrop-blur-3xl
            "
          >

            <div
              className="
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-[#FFD464]/15
                text-[#FFD464]
              "
            >
              {item.icon}
            </div>

            <p className="text-sm text-zinc-500">
              {item.label}
            </p>

            <h3 className="mt-2 text-xl font-bold break-words">
              {item.value}
            </h3>

          </motion.div>

        ))}

      </div>

      {/* Homepage */}

      {actor.homepage && (

        <motion.a
          whileHover={{
            scale: 1.02,
          }}
          href={actor.homepage}
          target="_blank"
          rel="noreferrer"
          className="
            flex
            items-center
            gap-4
            rounded-[28px]
            border
            border-[#FFD464]/20
            bg-[#FFD464]/10
            p-6
          "
        >

          <Globe
            className="text-[#FFD464]"
          />

          <div>

            <p className="text-sm text-zinc-400">
              Official Website
            </p>

            <h3 className="font-bold">
              Visit Homepage
            </h3>

          </div>

        </motion.a>

      )}

      {/* Aliases */}

      {actor.also_known_as?.length >
        0 && (

        <div>

          <div className="mb-5 flex items-center gap-3">

            <Tag className="text-[#FFD464]" />

            <h3 className="text-2xl font-bold">
              Also Known As
            </h3>

          </div>

          <div className="flex flex-wrap gap-3">

            {actor.also_known_as.map(
              (name, index) => (

                <motion.span
                  key={index}
                  whileHover={{
                    scale: 1.05,
                  }}
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-5
                    py-2
                  "
                >
                  {name}
                </motion.span>

              )
            )}

          </div>

        </div>

      )}

    </section>
  );
}