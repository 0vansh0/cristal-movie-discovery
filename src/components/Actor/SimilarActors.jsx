import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
} from "lucide-react";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export default function SimilarActors({
  actors = [],
  onActorClick,
}) {
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollBy({
      left: direction === "left" ? -380 : 380,
      behavior: "smooth",
    });
  };

  if (!actors.length) return null;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-black">
            Similar Actors
          </h2>

          <p className="mt-2 text-zinc-400">
            Explore more talented artists
          </p>

        </div>

        <div className="flex gap-3">

          <ArrowButton
            onClick={() => scroll("left")}
          >
            <ChevronLeft />
          </ArrowButton>

          <ArrowButton
            onClick={() => scroll("right")}
          >
            <ChevronRight />
          </ArrowButton>

        </div>

      </div>

      {/* Slider */}

      <div
        ref={sliderRef}
        className="
          flex
          gap-6
          overflow-x-auto
          scroll-smooth
          pb-4
          scrollbar-hide
        "
      >

        {actors.map((actor) => (

          <ActorCard
            key={actor.id}
            actor={actor}
            onClick={() =>
              onActorClick?.(actor.id)
            }
          />

        ))}

      </div>

    </section>
  );
}

/* ----------------------------- */

function ActorCard({
  actor,
  onClick,
}) {
  const image = actor.profile_path
    ? `${IMAGE_URL}${actor.profile_path}`
    : "https://placehold.co/500x750/111827/ffffff?text=No+Photo";

  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      whileTap={{
        scale: .98,
      }}
      onClick={onClick}
      className="
        group
        relative
        min-w-[270px]
        cursor-pointer
        overflow-hidden
        rounded-[34px]
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
          bg-[#FFD464]/10
          blur-3xl
        "
      />

      {/* Avatar */}

      <motion.img
        whileHover={{
          scale: 1.08,
        }}
        src={image}
        alt={actor.name}
        className="
          mx-auto
          h-36
          w-36
          rounded-full
          border-4
          border-[#FFD464]/30
          object-cover
        "
      />

      {/* Name */}

      <h3
        className="
          mt-6
          line-clamp-2
          text-center
          text-2xl
          font-black
        "
      >
        {actor.name}
      </h3>

      {/* Department */}

      <p
        className="
          mt-2
          text-center
          text-zinc-400
        "
      >
        {actor.known_for_department}
      </p>

      {/* Popularity */}

      <div
        className="
          mt-6
          flex
          items-center
          justify-center
          gap-2
        "
      >

        <Star
          size={18}
          className="
            fill-yellow-400
            text-yellow-400
          "
        />

        <span className="font-bold">
          {Math.round(actor.popularity)}
        </span>

      </div>

      {/* Button */}

      <motion.div
        whileHover={{
          x: 4,
        }}
        className="
          mt-7
          flex
          items-center
          justify-center
          gap-2
          rounded-full
          bg-[#FFD464]
          py-3
          font-bold
          text-black
        "
      >

        View Profile

        <ArrowRight size={18} />

      </motion.div>

    </motion.div>
  );
}

/* ----------------------------- */

function ArrowButton({
  children,
  onClick,
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.08,
      }}
      whileTap={{
        scale: .95,
      }}
      onClick={onClick}
      className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        transition
        hover:bg-[#FFD464]
        hover:text-black
      "
    >
      {children}
    </motion.button>
  );
}