import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  Heart,
  Bookmark,
  Star,
  Share2,
  Download,
} from "lucide-react";

export default function MovieActions({ movie }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  const shareMovie = async () => {
    if (navigator.share) {
      await navigator.share({
        title: movie.title,
        text: movie.overview,
        url: window.location.href,
      });
    }
  };

  const Button = ({
    icon,
    label,
    onClick,
    active = false,
    color = "#FF5E5E",
  }) => (
    <motion.button
      whileHover={{
        scale: 1.08,
        y: -3,
      }}
      whileTap={{
        scale: 0.95,
      }}
      onClick={onClick}
      className={`
      group
      relative
      flex
      items-center
      gap-3
      rounded-2xl
      border
      px-5
      py-4
      backdrop-blur-xl
      transition-all
      duration-300
      ${
        active
          ? "border-red-500 bg-red-500/20"
          : "border-white/10 bg-white/5 hover:border-white/20"
      }
      `}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 blur-xl transition group-hover:opacity-100"
        style={{
          background: `${color}20`,
        }}
      />

      <div className="relative flex items-center gap-3">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
    </motion.button>
  );

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: .4,
      }}
      className="mt-10 flex flex-wrap gap-4"
    >
      <Button
        icon={<Play fill="currentColor" />}
        label="Play Trailer"
      />

      <Button
        active={liked}
        onClick={() => setLiked(!liked)}
        icon={
          <Heart
            fill={liked ? "currentColor" : "none"}
          />
        }
        label="Favorite"
        color="#FF5E5E"
      />

      <Button
        active={saved}
        onClick={() => setSaved(!saved)}
        icon={<Bookmark />}
        label="Watchlist"
        color="#FFD464"
      />

      <Button
        icon={<Star />}
        label="Rate"
        color="#FFD464"
      />

      <Button
        onClick={shareMovie}
        icon={<Share2 />}
        label="Share"
        color="#5EA9FF"
      />

      <Button
        icon={<Download />}
        label="Wallpaper"
        color="#9B5EFF"
      />
    </motion.div>
  );
}