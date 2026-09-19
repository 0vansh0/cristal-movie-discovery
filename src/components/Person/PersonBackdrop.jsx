import { motion } from "framer-motion";

const PROFILE = "https://image.tmdb.org/t/p/original";

export default function PersonBackdrop({
  person,
}) {
  if (!person) return null;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      {/* Background Image */}

      <motion.img
        initial={{
          scale: 1,
        }}
        animate={{
          scale: 1.15,
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
        src={
          person.profile_path
            ? PROFILE +
              person.profile_path
            : "/placeholder.jpg"
        }
        alt=""
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          blur-[4px]
          brightness-[0.35]
        "
      />

      {/* Gradient */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-b
          from-black/20
          via-black/60
          to-[#070707]
        "
      />

      {/* Aurora 1 */}

      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -40, 0],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
        }}
        className="
          absolute
          left-[-250px]
          top-[-180px]
          h-[650px]
          w-[650px]
          rounded-full
          bg-yellow-400/15
          blur-[160px]
        "
      />

      {/* Aurora 2 */}

      <motion.div
        animate={{
          x: [0, -60, 0],
          y: [0, 80, 0],
          rotate: [0, -20, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
        }}
        className="
          absolute
          right-[-250px]
          bottom-[-220px]
          h-[700px]
          w-[700px]
          rounded-full
          bg-sky-500/15
          blur-[170px]
        "
      />

      {/* Aurora 3 */}

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-1/3
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-purple-500/10
          blur-[150px]
        "
      />

      {/* Noise */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          mix-blend-soft-light
        "
        style={{
          backgroundImage:
            "radial-gradient(circle,white 1px,transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Vignette */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle,transparent_45%,rgba(0,0,0,.8))]
        "
      />

      {/* Floating Particles */}

      {Array.from({ length: 30 }).map(
        (_, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              y: 120,
            }}
            animate={{
              opacity: [
                0,
                0.7,
                0,
              ],
              y: -900,
            }}
            transition={{
              duration:
                10 +
                Math.random() * 12,
              repeat: Infinity,
              delay:
                Math.random() * 10,
            }}
            className="
              absolute
              rounded-full
              bg-white
            "
            style={{
              width:
                2 +
                Math.random() * 5,
              height:
                2 +
                Math.random() * 5,
              left: `${
                Math.random() * 100
              }%`,
              bottom: "-20px",
            }}
          />
        )
      )}

    </div>
  );
}