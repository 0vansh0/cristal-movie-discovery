import { motion } from "framer-motion";

export default function CircularProgress({
  value = 75,
  size = 160,
  stroke = 12,
  color = "#FFD464",
  trackColor = "rgba(255,255,255,0.08)",
  title = "Progress",
  subtitle = "Completed",
}) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  const progress = Math.min(Math.max(value, 0), 100);

  const offset =
    circumference -
    (progress / 100) * circumference;

  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-[30px]
        border
        border-white/10
        bg-white/5
        p-8
        backdrop-blur-3xl
      "
    >
      <div
        className="relative"
        style={{
          width: size,
          height: size,
        }}
      >
        <svg
          width={size}
          height={size}
          className="-rotate-90"
        >
          {/* Background */}

          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={stroke}
          />

          {/* Progress */}

          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{
              strokeDashoffset: circumference,
            }}
            whileInView={{
              strokeDashoffset: offset,
            }}
            transition={{
              duration: 1.5,
              ease: "easeOut",
            }}
          />
        </svg>

        {/* Center Text */}

        <div
          className="
            absolute
            inset-0
            flex
            flex-col
            items-center
            justify-center
          "
        >
          <motion.h2
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.3,
            }}
            className="text-4xl font-black"
          >
            {progress}%
          </motion.h2>

          <span className="mt-1 text-sm text-zinc-400">
            {subtitle}
          </span>
        </div>
      </div>

      <h3 className="mt-6 text-xl font-bold">
        {title}
      </h3>
    </motion.div>
  );
}