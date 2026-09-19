import { motion } from "framer-motion";
import {
  Play,
  Info,
  Heart,
  Star,
  Share2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroButtons({ movie }) {
  const navigate = useNavigate();

  const buttons = [
    {
      title: "Play Now",
      icon: <Play size={18} fill="currentColor" />,
      className:
        "bg-white text-black hover:bg-[#FFD464] hover:text-black",
      onClick: () => navigate(`/movie/${movie.id}`),
    },

    {
      title: "More Info",
      icon: <Info size={18} />,
      className:
        "bg-white/10 border border-white/20 backdrop-blur-xl text-white hover:bg-white/20",
      onClick: () => navigate(`/movie/${movie.id}`),
    },

    {
      title: "Watchlist",
      icon: <Heart size={18} />,
      className:
        "bg-white/10 border border-white/20 backdrop-blur-xl text-white hover:bg-[#FF5E5E] hover:border-[#FF5E5E]",
      onClick: () => {},
    },

    {
      title: "Rate",
      icon: <Star size={18} />,
      className:
        "bg-white/10 border border-white/20 backdrop-blur-xl text-white hover:bg-yellow-500 hover:border-yellow-500",
      onClick: () => {},
    },

    {
      title: "Share",
      icon: <Share2 size={18} />,
      className:
        "bg-white/10 border border-white/20 backdrop-blur-xl text-white hover:bg-blue-500 hover:border-blue-500",
      onClick: () => {},
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
          },
        },
      }}
      className="mt-10 flex flex-wrap gap-4"
    >
      {buttons.map((button, index) => (
        <motion.button
          key={index}
          variants={{
            hidden: {
              opacity: 0,
              y: 20,
            },
            visible: {
              opacity: 1,
              y: 0,
            },
          }}
          whileHover={{
            scale: 1.06,
            y: -2,
          }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{
            type: "spring",
            stiffness: 350,
          }}
          onClick={button.onClick}
          className={`group relative overflow-hidden rounded-full px-6 py-3 font-semibold transition-all duration-300 ${button.className}`}
        >
          {/* Glow */}
          <span
            className="
            absolute
            inset-0
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
          "
          />

          <div className="relative flex items-center gap-3">
            {button.icon}
            <span>{button.title}</span>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}