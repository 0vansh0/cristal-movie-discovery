import { motion } from "framer-motion";
import {
  CheckCircle2,
  Star,
  Calendar,
  MapPin,
  Briefcase,
  TrendingUp,
} from "lucide-react";

import ActorBackdrop from "./ActorBackdrop";
import ActorPhoto from "./ActorPhoto";
import ActorInfo from "./ActorInfo";

export default function ActorHero({
  actor,
  children,
}) {
  if (!actor) return null;

  const age = actor.birthday
    ? new Date().getFullYear() -
      new Date(actor.birthday).getFullYear()
    : "--";

  return (
    <section className="relative overflow-hidden">

      {/* Backdrop */}

      <ActorBackdrop actor={actor} />

      {/* Gradient */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#09090B]
          via-[#09090bcc]
          to-[#09090B22]
        "
      />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-7xl
          flex-col
          gap-10
          px-6
          py-20
          lg:flex-row
          lg:items-end
        "
      >

        {/* Poster */}

        <ActorPhoto actor={actor} />

        {/* Right */}

        <motion.div
          initial={{
            opacity:0,
            y:40,
          }}
          animate={{
            opacity:1,
            y:0,
          }}
          transition={{
            delay:.2,
          }}
          className="flex-1"
        >

          {/* Badge */}

          <div className="mb-5 flex flex-wrap gap-3">

            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-[#FFD464]
                px-4
                py-2
                text-black
                font-semibold
              "
            >
              <CheckCircle2 size={18}/>
              Verified
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-white/10
                px-4
                py-2
                backdrop-blur-xl
              "
            >
              <TrendingUp
                size={18}
                className="text-[#FFD464]"
              />

              Popularity

              <strong>
                {Math.round(
                  actor.popularity || 0
                )}
              </strong>

            </div>

          </div>

          {/* Name */}

          <motion.h1
            initial={{
              opacity:0,
              y:20,
            }}
            animate={{
              opacity:1,
              y:0,
            }}
            transition={{
              delay:.3,
            }}
            className="
              text-5xl
              font-black
              lg:text-7xl
            "
          >
            {actor.name}
          </motion.h1>

          {/* Department */}

          <div
            className="
              mt-5
              flex
              flex-wrap
              gap-6
              text-zinc-300
            "
          >

            <Info
              icon={<Briefcase size={18}/>}
              value={
                actor.known_for_department
              }
            />

            <Info
              icon={<Calendar size={18}/>}
              value={
                actor.birthday
                  ? `${actor.birthday} (${age} yrs)`
                  : "--"
              }
            />

            <Info
              icon={<MapPin size={18}/>}
              value={
                actor.place_of_birth ||
                "--"
              }
            />

          </div>

          {/* Short Bio */}

          <p
            className="
              mt-8
              max-w-4xl
              text-lg
              leading-8
              text-zinc-300
            "
          >
            {actor.biography
              ?.slice(0,250)}
            ...
          </p>

          {/* Statistics */}

          <div
            className="
              mt-10
              grid
              grid-cols-2
              gap-5
              md:grid-cols-4
            "
          >

            <Stat
              title="Popularity"
              value={Math.round(
                actor.popularity || 0
              )}
            />

            <Stat
              title="Known For"
              value={
                actor.known_for_department
              }
            />

            <Stat
              title="Age"
              value={age}
            />

            <Stat
              title="Gender"
              value={
                actor.gender === 1
                  ? "Female"
                  : "Male"
              }
            />

          </div>

          {/* Bottom */}

          <ActorInfo actor={actor} />

        </motion.div>

      </div>

      {children}

    </section>
  );
}

/* ------------------------ */

function Info({
  icon,
  value,
}) {
  return (
    <div className="flex items-center gap-2">

      <span className="text-[#FFD464]">
        {icon}
      </span>

      <span>{value}</span>

    </div>
  );
}

/* ------------------------ */

function Stat({
  title,
  value,
}) {
  return (
    <motion.div
      whileHover={{
        y:-5,
      }}
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-5
        backdrop-blur-3xl
      "
    >

      <p className="text-sm text-zinc-400">
        {title}
      </p>

      <h3
        className="
          mt-2
          text-2xl
          font-black
        "
      >
        {value}
      </h3>

    </motion.div>
  );
}