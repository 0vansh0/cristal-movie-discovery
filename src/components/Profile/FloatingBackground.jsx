import { motion } from "framer-motion";

const particles = [...Array(25)];

export default function FloatingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">

      {/* Aurora Glow 1 */}
      <motion.div
        animate={{
          x: [-120, 120, -120],
          y: [-40, 60, -40],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          -top-60
          -left-60
          h-[700px]
          w-[700px]
          rounded-full
          bg-[#FF5E5E]/12
          blur-[180px]
        "
      />

      {/* Aurora Glow 2 */}
      <motion.div
        animate={{
          x: [80, -120, 80],
          y: [50, -60, 50],
          scale: [1.1, 1, 1.15],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[-250px]
          top-[150px]
          h-[650px]
          w-[650px]
          rounded-full
          bg-[#FFD464]/10
          blur-[180px]
        "
      />

      {/* Red Glow */}
      <motion.div
        animate={{
          opacity: [.2, .5, .2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
        }}
        className="
          absolute
          bottom-[-250px]
          left-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-red-500/10
          blur-[170px]
        "
      />

      {/* Floating Particles */}

      {particles.map((_, i) => {

        const size = Math.random() * 8 + 4;

        return (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: .2,
            }}
            animate={{
              y: [
                Math.random() * window.innerHeight,
                -100,
              ],
              opacity: [.2, .7, .2],
            }}
            transition={{
              duration: Math.random() * 18 + 12,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
            className="absolute rounded-full bg-white/30"
            style={{
              width: size,
              height: size,
            }}
          />
        );

      })}

      {/* Grid */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
        "
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
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
            "radial-gradient(circle, rgba(255,255,255,.2) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      />

    </div>
  );
}