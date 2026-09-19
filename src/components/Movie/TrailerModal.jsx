import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaPlay, FaTimes } from "react-icons/fa";

export default function TrailerModal({
  open,
  videoKey,
  title = "Trailer",
  onClose,
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);

    if (!open) {
      return undefined;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, videoKey]);

  if (!videoKey) {
    return null;
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#090d16] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-red-600 p-2">
                  <FaPlay className="text-sm" />
                </div>
                <h2 className="font-bold text-white">{title}</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close trailer"
                className="rounded-full p-3 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <div className="relative aspect-video w-full bg-black">
              {!loaded && (
                <div className="absolute inset-0 z-20 flex items-center justify-center text-gray-400">
                  Loading trailer...
                </div>
              )}
              <iframe
                onLoad={() => setLoaded(true)}
                src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoKey)}?autoplay=1&rel=0&modestbranding=1&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`}
                title={title}
                className="absolute inset-0 z-10 h-full w-full border-0"
                allow="autoplay; encrypted-media; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
