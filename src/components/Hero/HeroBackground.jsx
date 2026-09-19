import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

export default function HeroBackground({ movie }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, {
    stiffness: 40,
    damping: 20,
  });

  const smoothY = useSpring(y, {
    stiffness: 40,
    damping: 20,
  });

  useEffect(() => {
    const handleMove = (e) => {
      const { innerWidth, innerHeight } = window;

      const moveX = (e.clientX - innerWidth / 2) / 35;
      const moveY = (e.clientY - innerHeight / 2) / 35;

      x.set(moveX);
      y.set(moveY);
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, [x, y]);

  if (!movie) return null;

  const backdrop = movie.backdrop_path
    ? `${IMAGE_BASE}${movie.backdrop_path}`
    : "/fallback.jpg";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={movie.id}
        className="absolute inset-0 overflow-hidden"
        initial={{
          opacity: 0,
          scale: 1.15,
          filter: "blur(15px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          scale: 1.08,
          filter: "blur(12px)",
        }}
        transition={{
          duration: 1.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {/* Background Image */}

        <motion.img
          src={backdrop}
          alt={movie.title}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            x: smoothX,
            y: smoothY,
          }}
          animate={{
            scale: [1.06, 1.12, 1.06],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Cinematic Glow */}

        <motion.div
          animate={{
            opacity: [0.25, 0.45, 0.25],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[600px]
            w-[600px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#FF5E5E]/20
            blur-[180px]
          "
        />

        {/* Film Grain */}

        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />

        {/* Left Gradient */}

        <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-[#09090B] via-[#09090bcc] to-transparent" />

        {/* Bottom Gradient */}

        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-[#09090B] via-[#09090B80] to-transparent" />

        {/* Top Gradient */}

        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />

        {/* Soft Vignette */}

        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,.45)_100%)]" />
      </motion.div>
    </AnimatePresence>
  );
}