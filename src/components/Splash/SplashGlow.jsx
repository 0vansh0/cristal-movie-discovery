import { motion } from "framer-motion";

const blobs = [
  {
    color: "#FF5E5E",
    size: 520,
    top: "-10%",
    left: "-8%",
    duration: 14,
  },
  {
    color: "#E23C64",
    size: 460,
    top: "45%",
    right: "-10%",
    duration: 18,
  },
  {
    color: "#FFD464",
    size: 320,
    top: "28%",
    left: "40%",
    duration: 12,
  },
  {
    color: "#B0183D",
    size: 560,
    bottom: "-15%",
    left: "15%",
    duration: 20,
  },
];

export default function SplashGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">

      {/* Aurora Blobs */}

      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          animate={{
            x: [-80, 80, -80],
            y: [-40, 40, -40],
            scale: [1, 1.25, 1],
            opacity: [0.18, 0.45, 0.18],
          }}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full blur-[180px]"
          style={{
            width: blob.size,
            height: blob.size,
            background: blob.color,
            top: blob.top,
            left: blob.left,
            right: blob.right,
            bottom: blob.bottom,
            opacity: .25,
          }}
        />
      ))}

      {/* Center Glow */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-white/10
          blur-[140px]
        "
      />

      {/* Vignette */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,.55)_100%)]
        "
      />

      {/* Noise Layer */}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, white 1px, transparent 0)
          `,
          backgroundSize: "18px 18px",
        }}
      />

      {/* Cinematic Light */}

      <motion.div
        animate={{
          rotate: [0, 6, -6, 0],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[900px]
          w-[200px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-gradient-to-b
          from-transparent
          via-white/20
          to-transparent
          blur-[90px]
        "
      />

    </div>
  );
}