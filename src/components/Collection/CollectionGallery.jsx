import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
} from "lucide-react";

const IMAGE = "https://image.tmdb.org/t/p/w780";
const ORIGINAL = "https://image.tmdb.org/t/p/original";

export default function CollectionGallery({
  images = [],
}) {
  const [selected, setSelected] = useState(null);

  const next = () => {
    if (selected === null) return;
    setSelected((selected + 1) % images.length);
  };

  const prev = () => {
    if (selected === null) return;
    setSelected(
      (selected - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    function handleKey(e) {
      if (selected === null) return;

      if (e.key === "Escape") {
        setSelected(null);
      }

      if (e.key === "ArrowRight") {
        next();
      }

      if (e.key === "ArrowLeft") {
        prev();
      }
    }

    window.addEventListener("keydown", handleKey);

    return () =>
      window.removeEventListener(
        "keydown",
        handleKey
      );
  }, [selected]);

  if (!images.length) return null;

  return (
    <section className="space-y-10">

      {/* Header */}

      <div>

        <h2 className="text-4xl font-black">
          Gallery
        </h2>

        <p className="mt-2 text-zinc-400">
          Official posters and backdrops
        </p>

      </div>

      {/* Grid */}

      <div
        className="
          columns-2
          gap-5
          md:columns-3
          xl:columns-4
        "
      >

        {images.map((img, index) => (

          <motion.div
            key={index}
            whileHover={{
              scale: 1.02,
            }}
            className="
              group
              relative
              mb-5
              cursor-pointer
              overflow-hidden
              rounded-[26px]
            "
            onClick={() =>
              setSelected(index)
            }
          >

            <img
              src={IMAGE + img.file_path}
              className="
                w-full
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
                duration-300
                group-hover:opacity-100
              "
            >

              <Maximize2 size={34} />

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

            <img
              src={
                ORIGINAL +
                images[selected].file_path
              }
              className="
                max-h-[90vh]
                max-w-[90vw]
                rounded-3xl
              "
            />

            {/* Close */}

            <button
              onClick={() =>
                setSelected(null)
              }
              className="
                absolute
                right-6
                top-6
                rounded-full
                bg-white/10
                p-4
              "
            >
              <X />
            </button>

            {/* Prev */}

            <button
              onClick={prev}
              className="
                absolute
                left-6
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
                right-6
                rounded-full
                bg-white/10
                p-4
            "
              >
              <ChevronRight />
            </button>

            {/* Original */}

            <a
              href={
                ORIGINAL +
                images[selected].file_path
              }
              target="_blank"
              rel="noreferrer"
              className="
                absolute
                bottom-8
                rounded-full
                bg-[#FFD464]
                px-6
                py-3
                font-bold
                text-black
              "
            >

              <Download
                className="mr-2 inline"
                size={18}
              />

              Original Size

            </a>

          </motion.div>

        )}

      </AnimatePresence>

    </section>
  );
}