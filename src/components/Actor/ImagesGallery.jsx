import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Image as ImageIcon,
} from "lucide-react";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";
const THUMB_URL = "https://image.tmdb.org/t/p/w342";
const THUMB_LARGE = "https://image.tmdb.org/t/p/w500";

export default function ImagesGallery({
  images = [],
}) {
  const [selected, setSelected] = useState(null);

  const gallery = useMemo(
    () =>
      images.filter((img) => img.file_path),
    [images]
  );

  const openImage = (index) => {
    setSelected(index);
  };

  const closeLightbox = () => {
    setSelected(null);
  };

  const next = () => {
    setSelected((prev) =>
      prev === gallery.length - 1
        ? 0
        : prev + 1
    );
  };

  const previous = () => {
    setSelected((prev) =>
      prev === 0
        ? gallery.length - 1
        : prev - 1
    );
  };

  useEffect(() => {
    if (selected === null) return;

    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        next();
      }
      if (event.key === "ArrowLeft") {
        previous();
      }
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selected]);

  return (
    <>
      {/* Header */}

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h2 className="text-4xl font-black">
            Photo Gallery
          </h2>

          <p className="mt-2 text-zinc-400">
            {gallery.length} High Resolution Images
          </p>

        </div>

        <div
          className="
            rounded-full
            border
            border-white/10
            bg-white/5
            px-5
            py-3
            backdrop-blur-xl
          "
        >
          <ImageIcon className="inline mr-2" size={18} />

          {gallery.length}
        </div>

      </div>

      {/* Masonry */}

      <div
        className="
          columns-1
          gap-5
          sm:columns-2
          lg:columns-3
          xl:columns-4
        "
      >

        {gallery.map((image, index) => (

          <motion.div
            key={image.file_path}
            whileHover={{
              scale: 1.02,
            }}
            className="
              group
              mb-5
              cursor-pointer
              overflow-hidden
              rounded-3xl
            "
            onClick={() => openImage(index)}
          >

            <img
              src={`${THUMB_URL}${image.file_path}`}
              alt=""
              loading="lazy"
              className="
                w-full
                transition
                duration-500
                group-hover:scale-110
              "
            />

            <div
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
                bg-black/50
                opacity-0
                transition
                group-hover:opacity-100
              "
            >

              <div
                className="
                  rounded-full
                  bg-white/20
                  p-4
                  backdrop-blur-xl
                "
              >

                <Maximize2 />

              </div>

            </div>

          </motion.div>

        ))}

      </div>

      {/* Lightbox */}

      <AnimatePresence>

        {selected !== null && (

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[999]
              flex
              items-center
              justify-center
              bg-black/95
            "
          >

            {/* Close */}

            <button
              onClick={() =>
                setSelected(null)
              }
              className="
                absolute
                right-8
                top-8
                rounded-full
                bg-white/10
                p-4
              "
            >
              <X />
            </button>

            {/* Previous */}

            <button
              onClick={previous}
              className="
                absolute
                left-8
                rounded-full
                bg-white/10
                p-4
              "
            >
              <ChevronLeft />
            </button>

            {/* Next */}

            <button
              onClick={next}
              className="
                absolute
                right-8
                top-1/2
                rounded-full
                bg-white/10
                p-4
              "
            >
              <ChevronRight />
            </button>

            {/* Image */}

            <motion.img
              key={gallery[selected].file_path}
              initial={{
                scale: .9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: .9,
                opacity: 0,
              }}
              src={`${IMAGE_URL}${gallery[selected].file_path}`}
              alt=""
              className="
                max-h-[90vh]
                max-w-[90vw]
                rounded-3xl
              "
            />

            {/* Bottom */}

            <div
              className="
                absolute
                bottom-10
                flex
                items-center
                gap-5
              "
            >

              <a
                href={`${IMAGE_URL}${gallery[selected].file_path}`}
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#FFD464]
                  px-6
                  py-3
                  font-bold
                  text-black
                "
              >

                <Download size={18} />

                Open Original

              </a>

              <div
                className="
                  rounded-full
                  bg-white/10
                  px-5
                  py-3
                "
              >
                {selected + 1} / {gallery.length}
              </div>

            </div>

          </motion.div>

        )}

      </AnimatePresence>
    </>
  );
}