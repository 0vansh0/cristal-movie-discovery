import { motion } from "framer-motion";

export default function HeroIndicators({
  total,
  active,
  setActive,
}) {
  return (
    <div className="absolute bottom-10 left-1/2 z-40 flex -translate-x-1/2 gap-3">

      {Array.from({ length: total }).map((_, index) => (
        <motion.button
          key={index}
          whileHover={{
            scale: 1.15,
          }}
          whileTap={{
            scale: 0.9,
          }}
          onClick={() => setActive(index)}
          className={`overflow-hidden rounded-full transition-all duration-500 ${
            active === index
              ? "w-14 bg-[#FF5E5E]"
              : "w-3 bg-white/25"
          } h-2`}
        >
          {active === index && (
            <motion.div
              layoutId="indicator"
              className="h-full w-full bg-gradient-to-r from-[#FFD464] via-[#FF5E5E] to-[#E23C64]"
            />
          )}
        </motion.button>
      ))}

    </div>
  );
}