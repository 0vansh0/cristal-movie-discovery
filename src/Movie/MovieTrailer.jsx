import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

export default function MovieTrailer({ trailerKey }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-20"
    >
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-black text-white">
          Official Trailer
        </h2>

        <div className="flex items-center gap-2 text-[#FFD464]">
          <PlayCircle size={20} />
          <span className="text-sm font-medium">
            Watch in HD
          </span>
        </div>
      </div>

      <div
        className="
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-white/5
          shadow-2xl
          backdrop-blur-xl
        "
      >
        {trailerKey ? (
          <iframe
            className="aspect-video w-full"
            src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(trailerKey)}?autoplay=0&rel=0&modestbranding=1&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <div className="flex aspect-video items-center justify-center text-zinc-400">
            Trailer not available.
          </div>
        )}
      </div>
    </motion.section>
  );
}