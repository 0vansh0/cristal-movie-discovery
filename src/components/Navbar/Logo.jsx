import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3 group">

      <motion.div
        whileHover={{
          rotate: 15,
          scale: 1.08,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
        }}
        className="
        relative
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-2xl
        overflow-hidden
        bg-gradient-to-br
        from-[#FF5E5E]
        via-[#E23C64]
        to-[#B0183D]
        shadow-lg
        shadow-[#FF5E5E]/30
        "
      >
        {/* Glow */}
        <div
          className="
          absolute
          inset-0
          bg-white/10
          backdrop-blur-xl
          "
        />

        {/* Crystal Shape */}
        <svg
          viewBox="0 0 24 24"
          className="relative h-6 w-6 text-white"
          fill="currentColor"
        >
          <path d="M12 2L4.5 8.5L12 22L19.5 8.5L12 2ZM12 5.2L16.8 9H7.2L12 5.2ZM8.4 10.5H15.6L12 17.5L8.4 10.5Z" />
        </svg>

      </motion.div>

      <div className="flex flex-col">

        <motion.h1
          whileHover={{
            letterSpacing: "0.18em",
          }}
          className="
          text-xl
          font-black
          uppercase
          tracking-widest
          text-white
          "
        >
          CRISTAL
        </motion.h1>

        <span
          className="
          -mt-1
          text-[10px]
          uppercase
          tracking-[0.35em]
          text-zinc-400
          "
        >
          Cinema Universe
        </span>

      </div>

    </Link>
  );
};

export default Logo;