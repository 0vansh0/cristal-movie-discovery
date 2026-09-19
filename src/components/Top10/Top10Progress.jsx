import { motion } from "framer-motion";

export default function Top10Progress({
  popularity = 50,
}) {
  const progress = Math.min(popularity / 10, 100);

  return (
    <div className="mt-4 w-full">

      <div className="mb-2 flex items-center justify-between">

        <span className="text-xs uppercase tracking-wider text-zinc-400">
          Popularity
        </span>

        <span className="text-xs font-semibold text-white">
          {Math.floor(progress)}%
        </span>

      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/10">

        <motion.div
          initial={{ width: 0 }}
          whileInView={{
            width: `${progress}%`,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
          }}
          className="
            h-full
            rounded-full
            bg-gradient-to-r
            from-[#FFD464]
            via-[#FF5E5E]
            to-[#E23C64]
          "
        />

      </div>

    </div>
  );
}