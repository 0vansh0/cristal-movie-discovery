import { motion } from "framer-motion";
import {
  User,
  Cake,
  Calendar,
  MapPin,
  Globe,
  Star,
  BadgeCheck,
  Users,
  Tag,
  Heart,
} from "lucide-react";

export default function PersonalInfo({
  person,
}) {
  if (!person) return null;

  const age = person.birthday
    ? Math.floor(
        (Date.now() -
          new Date(person.birthday)) /
          (1000 * 60 * 60 * 24 * 365.25)
      )
    : "--";

  const gender =
    person.gender === 1
      ? "Female"
      : person.gender === 2
      ? "Male"
      : "Unknown";

  const info = [
    {
      icon: <User size={22} />,
      label: "Full Name",
      value: person.name,
      color: "#FFD464",
    },
    {
      icon: <Cake size={22} />,
      label: "Birthday",
      value:
        person.birthday ||
        "Unknown",
      color: "#34D399",
    },
    {
      icon: <Calendar size={22} />,
      label: "Age",
      value: age,
      color: "#60A5FA",
    },
    {
      icon: <MapPin size={22} />,
      label: "Birth Place",
      value:
        person.place_of_birth ||
        "Unknown",
      color: "#F472B6",
    },
    {
      icon: <Users size={22} />,
      label: "Gender",
      value: gender,
      color: "#A78BFA",
    },
    {
      icon: <BadgeCheck size={22} />,
      label: "Department",
      value:
        person.known_for_department,
      color: "#FB923C",
    },
    {
      icon: <Star size={22} />,
      label: "Popularity",
      value: Math.round(
        person.popularity || 0
      ),
      color: "#22C55E",
    },
    {
      icon: <Heart size={22} />,
      label: "Adult",
      value: person.adult
        ? "Yes"
        : "No",
      color: "#EF4444",
    },
  ];

  return (
    <section className="space-y-10">

      {/* Header */}

      <div>

        <h2 className="text-4xl font-black">
          Personal Information
        </h2>

        <p className="mt-2 text-zinc-400">
          Official details from TMDB
        </p>

      </div>

      {/* Cards */}

      <div
        className="
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-4
        "
      >

        {info.map((item) => (

          <motion.div
            key={item.label}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="
              relative
              overflow-hidden
              rounded-[30px]
              border
              border-white/10
              bg-white/5
              p-7
              backdrop-blur-3xl
            "
          >

            {/* Glow */}

            <div
              className="
                absolute
                -right-10
                -top-10
                h-40
                w-40
                rounded-full
                blur-3xl
                opacity-20
              "
              style={{
                background:
                  item.color,
              }}
            />

            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
              "
              style={{
                background:
                  `${item.color}20`,
                color:
                  item.color,
              }}
            >
              {item.icon}
            </div>

            <p className="mt-6 text-sm text-zinc-400">
              {item.label}
            </p>

            <h3 className="mt-2 text-xl font-black break-words">
              {item.value}
            </h3>

          </motion.div>

        ))}

      </div>

      {/* Homepage */}

      {person.homepage && (

        <motion.a
          whileHover={{
            scale: 1.02,
          }}
          href={person.homepage}
          target="_blank"
          rel="noreferrer"
          className="
            flex
            items-center
            gap-5
            rounded-[30px]
            border
            border-[#FFD464]/20
            bg-[#FFD464]/10
            p-7
          "
        >

          <Globe
            className="
              text-[#FFD464]
            "
            size={28}
          />

          <div>

            <p className="text-sm text-zinc-400">
              Official Website
            </p>

            <h3 className="font-bold text-xl">
              Visit Homepage
            </h3>

          </div>

        </motion.a>

      )}

      {/* Also Known As */}

      {person.also_known_as?.length >
        0 && (

        <div>

          <div className="mb-6 flex items-center gap-3">

            <Tag className="text-[#FFD464]" />

            <h3 className="text-2xl font-black">
              Also Known As
            </h3>

          </div>

          <div className="flex flex-wrap gap-3">

            {person.also_known_as.map(
              (name, index) => (

                <motion.div
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
                    py-3
                    backdrop-blur-xl
                  "
                >
                  {name}
                </motion.div>

              )
            )}

          </div>

        </div>

      )}

    </section>
  );
}