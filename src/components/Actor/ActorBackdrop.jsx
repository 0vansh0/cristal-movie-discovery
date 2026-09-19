import { motion } from "framer-motion";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

export default function ActorBackdrop({ actor }) {
  if (!actor) return null;

  const image =
    actor.profile_path
      ? `${IMAGE_URL}${actor.profile_path}`
      : "https://placehold.co/1920x1080/111827/FFFFFF?text=Actor";

  return (
    <div className="absolute inset-0 overflow-hidden">

      {/* Background */}

      <motion.img
        initial={{
          scale: 1.2,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 1.6,
        }}
        src={image}
        alt={actor.name}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      {/* Blur */}

      <div
        className="
          absolute
          inset-0
          backdrop-blur-[12px]
        "
      />

      {/* Dark Overlay */}

      <div
        className="
          absolute
          inset-0
          bg-black/70
        "
      />

      {/* Bottom Gradient */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#09090B]
          via-[#09090Bcc]
          to-transparent
        "
      />

      {/* Left Gradient */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#09090B]
          via-[#09090B80]
          to-transparent
        "
      />

      {/* Animated Glow */}

      <motion.div
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[700px]
          w-[700px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#FFD464]/10
          blur-[150px]
        "
      />

      {/* Floating Circles */}

      {[...Array(15)].map((_, index) => (
        <motion.div
          key={index}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.15, 0.35, 0.15],
          }}
          transition={{
            repeat: Infinity,
            duration: 5 + index,
            delay: index * 0.2,
          }}
          className="
            absolute
            rounded-full
            bg-[#FFD464]/20
            blur-xl
          "
          style={{
            width: `${20 + index * 4}px`,
            height: `${20 + index * 4}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Vignette */}

      <div
        className="
          absolute
          inset-0
          shadow-[inset_0_0_250px_rgba(0,0,0,.95)]
        "
      />

      {/* Noise */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          mix-blend-overlay
        "
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

    </div>
  );
}