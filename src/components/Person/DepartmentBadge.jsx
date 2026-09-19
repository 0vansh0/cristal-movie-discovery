import { motion } from "framer-motion";
import {
  Clapperboard,
  PenSquare,
  Film,
  Camera,
  Music4,
  Mic2,
  Users,
  Star,
  Palette,
  Award,
  Briefcase,
} from "lucide-react";

const DEPARTMENTS = {
  Acting: {
    icon: Star,
    color: "#FFD464",
    gradient:
      "from-yellow-400 via-orange-400 to-amber-500",
    glow: "shadow-yellow-500/40",
  },

  Directing: {
    icon: Clapperboard,
    color: "#60A5FA",
    gradient:
      "from-sky-400 via-blue-500 to-indigo-600",
    glow: "shadow-blue-500/40",
  },

  Writing: {
    icon: PenSquare,
    color: "#34D399",
    gradient:
      "from-emerald-400 via-green-500 to-teal-600",
    glow: "shadow-emerald-500/40",
  },

  Production: {
    icon: Briefcase,
    color: "#F472B6",
    gradient:
      "from-pink-400 via-fuchsia-500 to-rose-500",
    glow: "shadow-pink-500/40",
  },

  Camera: {
    icon: Camera,
    color: "#A78BFA",
    gradient:
      "from-violet-400 via-purple-500 to-indigo-500",
    glow: "shadow-purple-500/40",
  },

  Sound: {
    icon: Music4,
    color: "#FB923C",
    gradient:
      "from-orange-400 via-red-500 to-rose-500",
    glow: "shadow-orange-500/40",
  },

  Editing: {
    icon: Film,
    color: "#2DD4BF",
    gradient:
      "from-cyan-400 via-teal-500 to-emerald-500",
    glow: "shadow-cyan-500/40",
  },

  Creator: {
    icon: Palette,
    color: "#C084FC",
    gradient:
      "from-fuchsia-400 via-purple-500 to-pink-500",
    glow: "shadow-fuchsia-500/40",
  },

  Crew: {
    icon: Users,
    color: "#94A3B8",
    gradient:
      "from-slate-400 via-slate-500 to-slate-700",
    glow: "shadow-slate-500/40",
  },
};

export default function DepartmentBadge({
  department,
  size = "md",
}) {
  const config =
    DEPARTMENTS[department] || {
      icon: Award,
      color: "#FFD464",
      gradient:
        "from-yellow-400 to-orange-500",
      glow: "shadow-yellow-500/40",
    };

  const Icon = config.icon;

  const sizes = {
    sm: {
      badge: "px-4 py-2",
      icon: 18,
      text: "text-sm",
    },

    md: {
      badge: "px-5 py-3",
      icon: 22,
      text: "text-base",
    },

    lg: {
      badge: "px-7 py-4",
      icon: 26,
      text: "text-lg",
    },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        scale: 1.05,
      }}
      className={`
        inline-flex
        items-center
        gap-3
        rounded-full
        bg-gradient-to-r
        ${config.gradient}
        ${sizes[size].badge}
        shadow-2xl
        ${config.glow}
      `}
    >
      <motion.div
        animate={{
          rotate: [0, 8, -8, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
      >
        <Icon
          size={sizes[size].icon}
          className="text-white"
        />
      </motion.div>

      <span
        className={`
          font-bold
          text-white
          ${sizes[size].text}
        `}
      >
        {department}
      </span>
    </motion.div>
  );
}