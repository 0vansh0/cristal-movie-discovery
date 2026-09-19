import { motion } from "framer-motion";

const PARTICLE_COUNT = 45;

const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
  id: i,
  size: Math.random() * 6 + 2,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: Math.random() * 8 + 8,
  delay: Math.random() * 5,
  opacity: Math.random() * 0.5 + 0.2,
}));

export default function SplashParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            opacity: particle.opacity,
            filter: "blur(1px)",
            boxShadow: "0 0 12px rgba(255,255,255,.45)",
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-8, 8, -8],
            scale: [1, 1.4, 1],
            opacity: [
              particle.opacity,
              particle.opacity + 0.3,
              particle.opacity,
            ],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Coral Blob */}
      <motion.div
        animate={{
          x: [-60, 80, -60],
          y: [-30, 40, -30],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          left-[-180px]
          top-[15%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#FF5E5E]/20
          blur-[140px]
        "
      />

      {/* Pink Blob */}
      <motion.div
        animate={{
          x: [70, -80, 70],
          y: [20, -40, 20],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          absolute
          right-[-180px]
          bottom-[5%]
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#E23C64]/20
          blur-[150px]
        "
      />

      {/* Golden Light */}
      <motion.div
        animate={{
          opacity: [0.15, 0.45, 0.15],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[260px]
          w-[260px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#FFD464]/20
          blur-[90px]
        "
      />

      {/* Moving Light Sweep */}
      <motion.div
        animate={{
          x: ["-120%", "120%"],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
        className="
          absolute
          top-0
          h-full
          w-40
          -skew-x-12
          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
          blur-xl
        "
      />
    </div>
  );
}