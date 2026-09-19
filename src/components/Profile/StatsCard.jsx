import { motion } from "framer-motion";

export default function StatsCard({
  title,
  value,
  icon,
  color = "from-[#FF5E5E] to-[#FFD464]",
  suffix = "",
}) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-white/10
        bg-white/5
        p-6
        backdrop-blur-2xl
      "
    >
      {/* Glow */}
      <div
        className={`
          absolute
          inset-0
          bg-gradient-to-br
          ${color}
          opacity-0
          blur-3xl
          transition
          duration-500
          group-hover:opacity-20
        `}
      />

      <div
        className={`
          mb-6
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          ${color}
          text-black
        `}
      >
        {icon}
      </div>

      <h2 className="text-4xl font-black">
        {value}
        {suffix}
      </h2>

      <p className="mt-2 text-zinc-400">
        {title}
      </p>
    </motion.div>
  );
}