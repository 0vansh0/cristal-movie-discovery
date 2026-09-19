import { useCallback, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Image as ImageIcon,
} from "lucide-react";
import ImageWithFallback from "../UI/ImageWithFallback";
import PropTypes from "prop-types";
import { useSwipeable } from "react-swipeable";

const ORIGINAL =
  "https://image.tmdb.org/t/p/original";

const PREVIEW =
  "https://image.tmdb.org/t/p/w500";

export default function Gallery({
  images = [],
}) {
  const [selected, setSelected] =
    useState(null);
  const lightboxRef = useRef();

  const nextImage = useCallback(() =>
    setSelected((prev) =>
      prev === images.length - 1
        ? 0
        : prev + 1
    ), [images.length]);

  const prevImage = useCallback(() =>
    setSelected((prev) =>
      prev === 0
        ? images.length - 1
        : prev - 1
    ), [images.length]);

  useEffect(() => {
    if (selected === null) return;

    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [nextImage, prevImage, selected]);

  const handlers = useSwipeable({
    onSwipedLeft: () => nextImage(),
    onSwipedRight: () => prevImage(),
    trackMouse: true,
  });

  if (!images.length) {
    return (
      <section className="space-y-6">

        <div>

          <h2 className="text-4xl font-black">
            Gallery
          </h2>

          <p className="text-zinc-400 mt-2">
            No profile images available.
          </p>

        </div>

      </section>
    );
  }

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex items-center gap-4">

        <ImageIcon
          className="text-[#FFD464]"
          size={34}
        />

        <div>

          <h2 className="text-4xl font-black">
            Gallery
          </h2>

          <p className="mt-2 text-zinc-400">
            Official TMDB profile images
          </p>

        </div>

      </div>

      {/* Masonry */}

      <div className="columns-2 md:columns-3 xl:columns-4 gap-5">

        {images.map((img, index) => (
          <motion.div key={img.file_path} whileHover={{ scale: 1.03 }}>
            <ImageWithFallback
              src={PREVIEW + img.file_path}
              alt={`photo-${index}`}
              onClick={() => setSelected(index)}
              className="mb-5 cursor-pointer rounded-3xl duration-300"
            />
          </motion.div>
        ))}

      </div>

      {/* Lightbox */}

      <AnimatePresence>

        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-xl"
            {...handlers}
            ref={lightboxRef}
          >
            <button onClick={() => setSelected(null)} className="absolute right-8 top-8"> <X size={34} /> </button>

            <button onClick={prevImage} className="absolute left-8 top-1/2"> <ChevronLeft size={42} /> </button>

            <button onClick={nextImage} className="absolute right-8 top-1/2"> <ChevronRight size={42} /> </button>

            <motion.div key={selected} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="mx-auto h-full max-h-screen flex items-center justify-center">
              <ImageWithFallback src={ORIGINAL + images[selected].file_path} alt={`original-${selected}`} className="max-h-[90vh] rounded-[24px] object-contain" />
            </motion.div>

            <a href={ORIGINAL + images[selected].file_path} target="_blank" rel="noreferrer" className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-[#FFD464] px-6 py-3 font-bold text-black">
              <Download size={18} /> Open Original
            </a>
          </motion.div>
        )}

      </AnimatePresence>

    </section>
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({ file_path: PropTypes.string })
  ),
};